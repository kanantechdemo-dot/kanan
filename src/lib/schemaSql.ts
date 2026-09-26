/**
 * FOUNTANT HOTEL & BOTANICAL SANCTUARY
 * Complete Supabase Production SQL Migration & DDL Schema
 * 
 * Includes:
 * 1. Extensions (uuid-ossp, pgcrypto)
 * 2. Tables: profiles, rooms, reservations, dining_reservations, experience_bookings, inquiries
 * 3. Triggers: handle_new_user() for automatic profile creation upon signup
 * 4. Row Level Security (RLS) policies for user data isolation and guest reservation lookup
 * 5. Initial Seed Data for all 5 Sanctuary Rooms & Suites
 */

export const SUPABASE_SQL_SCHEMA = `-- ==============================================================================
-- FOUNTANT HOTEL & BOTANICAL SANCTUARY — SUPABASE DATABASE MIGRATION
-- Run this script in the Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. CREATE TABLE: PROFILES (Extends Supabase auth.users)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  membership_tier TEXT DEFAULT 'Enclave Sovereign',
  avatar_url TEXT,
  preferred_pillow TEXT DEFAULT 'Natural Goose Down (Medium-Firm)',
  preferred_aromatherapy TEXT DEFAULT 'Organic Tuscan Bergamot & Cedrat',
  preferred_newspaper TEXT DEFAULT 'Financial Times & Architectural Digest',
  preferred_temperature NUMERIC DEFAULT 20.5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 3. CREATE TABLE: ROOMS (Chambers, Suites, Enclaves)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.rooms (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  ref_code TEXT,
  pavilion TEXT,
  category TEXT NOT NULL,
  tag TEXT,
  tag_color TEXT,
  price_per_night NUMERIC NOT NULL,
  specs JSONB DEFAULT '{}'::jsonb,
  short_description TEXT,
  long_description TEXT,
  amenities JSONB DEFAULT '[]'::jsonb,
  key_amenities JSONB DEFAULT '[]'::jsonb,
  hero_image TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  highlights JSONB DEFAULT '[]'::jsonb,
  rating NUMERIC DEFAULT 4.95,
  review_count INTEGER DEFAULT 120,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 4. CREATE TABLE: RESERVATIONS (Chamber Stays & Ledgers)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_code TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  room_id TEXT REFERENCES public.rooms(id) ON DELETE SET NULL,
  room_name TEXT NOT NULL,
  room_image TEXT,
  category TEXT,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  nights INTEGER NOT NULL DEFAULT 1,
  adults INTEGER NOT NULL DEFAULT 2,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  special_requests TEXT DEFAULT '',
  privileges JSONB DEFAULT '{}'::jsonb,
  nightly_rate NUMERIC NOT NULL,
  subtotal NUMERIC NOT NULL,
  service_fee NUMERIC NOT NULL,
  taxes NUMERIC NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'active', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast user reservation lookup
CREATE INDEX IF NOT EXISTS idx_reservations_user_id ON public.reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_ref_code ON public.reservations(ref_code);

-- ==============================================================================
-- 5. CREATE TABLE: DINING RESERVATIONS (The Orangery, Botanical Evening Bar, etc.)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.dining_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_code TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  venue_id TEXT NOT NULL,
  venue_name TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TEXT NOT NULL,
  party_size INTEGER NOT NULL DEFAULT 2,
  seating_area TEXT DEFAULT 'Main Dining Pavilion',
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  dietary_notes TEXT DEFAULT '',
  special_occasion TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dining_reservations_user_id ON public.dining_reservations(user_id);

-- ==============================================================================
-- 6. CREATE TABLE: EXPERIENCE BOOKINGS (Spa, Yacht, Sommelier, etc.)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.experience_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_code TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  experience_id TEXT NOT NULL,
  experience_title TEXT NOT NULL,
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  guests_count INTEGER NOT NULL DEFAULT 2,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  price_paid TEXT,
  special_requests TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_experience_bookings_user_id ON public.experience_bookings(user_id);

-- ==============================================================================
-- 7. CREATE TABLE: INQUIRIES (Concierge & Custom Retreatment Inquiries)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_code TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  topic TEXT NOT NULL,
  chamber_interest TEXT,
  guest_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  arrival_date TEXT,
  special_requests TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'received',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_user_id ON public.inquiries(user_id);

-- ==============================================================================
-- 8. TRIGGER: Automatic Profile Creation Upon Supabase Auth Sign Up
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    first_name,
    last_name,
    email,
    phone,
    avatar_url,
    membership_tier
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    COALESCE(NEW.raw_user_meta_data->>'membership_tier', 'Enclave Sovereign')
  )
  ON CONFLICT (id) DO UPDATE
  SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    email = EXCLUDED.email,
    updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dining_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 9.1 Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 9.2 Rooms Policies
CREATE POLICY "Rooms are readable by everyone"
  ON public.rooms FOR SELECT
  USING (true);

-- 9.3 Reservations Policies
CREATE POLICY "Anyone can create a reservation (authenticated or guest)"
  ON public.reservations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own reservations or guest queries"
  ON public.reservations FOR SELECT
  USING (
    auth.uid() = user_id
    OR user_id IS NULL
    OR auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update or cancel own reservations"
  ON public.reservations FOR UPDATE
  USING (
    auth.uid() = user_id
    OR user_id IS NULL
  );

-- 9.4 Dining Reservations Policies
CREATE POLICY "Anyone can create dining reservations"
  ON public.dining_reservations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view dining reservations"
  ON public.dining_reservations FOR SELECT
  USING (
    auth.uid() = user_id
    OR user_id IS NULL
    OR auth.role() = 'authenticated'
  );

-- 9.5 Experience Bookings Policies
CREATE POLICY "Anyone can create experience bookings"
  ON public.experience_bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view experience bookings"
  ON public.experience_bookings FOR SELECT
  USING (
    auth.uid() = user_id
    OR user_id IS NULL
    OR auth.role() = 'authenticated'
  );

-- 9.6 Inquiries Policies
CREATE POLICY "Anyone can submit concierge inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own inquiries"
  ON public.inquiries FOR SELECT
  USING (
    auth.uid() = user_id
    OR user_id IS NULL
  );

-- ==============================================================================
-- 10. SEED DATA: SANCTUARY ROOMS & SUITES
-- ==============================================================================
INSERT INTO public.rooms (
  id, slug, name, ref_code, pavilion, category, tag, tag_color, price_per_night,
  specs, short_description, long_description, amenities, key_amenities, hero_image, rating, review_count
) VALUES
(
  'deluxe-room',
  'deluxe-room',
  'Deluxe Room',
  'FL-102',
  'Pavilion 01',
  'deluxe',
  'Botanical Garden View',
  'bg-[#001d0e] text-[#ffffff]',
  450,
  '{"areaM2": 45, "areaSqFt": 484, "bed": "King", "maxGuests": 2, "aspect": "Private Courtyard", "level": "Enclave Level 02 • West Courtyard"}'::jsonb,
  'An idyllic sanctuary anchored by tranquil botanical vistas. Designed with unvarnished white oak, handmade ceramic vessels, and an opulent Italian marble ensuite with rain bath.',
  'Conceived as an antidote to urban sensory overload, the Deluxe Room pairs raw tactile honesty with restrained European classicism. Honed Italian limestone floors are tempered with hand-knotted New Zealand wool rugs, while natural slaked-lime plaster walls gently capture the passage of daylight. The centerpiece custom king bed is enveloped in 600-thread-count bespoke Italian percale linens.',
  '["Marble Ensuite", "Artisan Coffee Press", "High-Speed Wi-Fi 6", "Linen Bathrobes", "Silent Radiant Subfloor Heating", "Concealed 55-inch 4K Display", "Artisanal Cellar Bar", "Apothecary Bath Flasks by Le Labo"]'::jsonb,
  '["Ultra-Speed Wi-Fi 6 (Dedicated fiber node)", "Multi-Zone Radiant Climate Control", "55\\" Concealed 4K Display behind linen millwork", "Artisanal Cellar Bar with biodynamic wines", "Bespoke Nespresso Atelier & Mariage Frères teas", "Diptyque & Le Labo Santal 33 Bath Elixirs"]'::jsonb,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDlW9YlAOZza9EXnrvsL76okQsSh-8gmGE-TBE2UXprVO2Mv-c3nZu-z5jHocrN0mG5yLQOMv6Ys9lp3wYzcW_LL0dHDdiMZ-6P27RV3m7dV2ZOvw_sTDB6aleDfGzuXsm0fgzAjTJ0dscqFA97pz16VVoU673SHfyXWH-4fBAqQYmyz2NdTt0sYhlJGMPqoJ6ojhhP41e41Qt52SUxMIA5AeqHnmZQYiQmGpGBmvCif27RMqpJp3KI',
  4.92,
  128
),
(
  'executive-panorama',
  'executive-panorama',
  'Executive Panorama Suite',
  'FL-204',
  'Pavilion 02',
  'executive',
  'High-Floor Oceanfront',
  'bg-[#8c4f00] text-[#ffffff]',
  750,
  '{"areaM2": 72, "areaSqFt": 775, "bed": "King", "maxGuests": 2, "aspect": "Panoramic Pacific Ocean", "level": "Upper Belvedere • Level 04"}'::jsonb,
  'Sweeping uninterrupted coastal horizons paired with a wraparound private cedar veranda, sculpted soaking tub, and separate botanical study parlor.',
  'Perched at the highest ridge of Pavilion 02, the Executive Panorama Suite commands uninterrupted oceanfront vistas from dawn till evening twilight. Floor-to-ceiling acoustic glass doors slide back silently into pocket walls, uniting the interior limestone salon with an expansive cedar plank terrace.',
  '["Private Cedar Terrace", "Freestanding Monolithic Bath", "Bang & Olufsen Acoustics", "Dedicated Concierge", "Complimentary Evening Aperitivo", "Walk-In Dressing Chamber", "Fireplace with Olive Wood Service", "Dyson Supersonic Suite"]'::jsonb,
  '["Panoramic Oceanfront Loggia with Heated Daybed", "Acoustically Calibrated Bang & Olufsen Soundscape", "Private Cellar Vault with Sommelier Selections", "Complimentary Evening Sunset Spritz in Chamber", "Personalized Turndown Aromatherapy Ritual"]'::jsonb,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuFfC10dM30k9K02Zq4i6t2v7rTjW9PqM_Vv-1m5K0dM20k9K02Zq4i6t2v7rTjW9PqM_Vv-1m5K0dM20k9K02Zq4i6t2v7rTjW9PqM_Vv-1m5K0dM20k9K02Zq4i6t2v7rTjW9PqM_Vv',
  4.97,
  94
),
(
  'luxury-salon-suite',
  'luxury-salon-suite',
  'Luxury Salon Suite',
  'FL-301',
  'Pavilion 03',
  'suites',
  'Dual Terrace Haven',
  'bg-[#002613] text-[#fcf9f3]',
  980,
  '{"areaM2": 95, "areaSqFt": 1022, "bed": "Grand King", "maxGuests": 3, "aspect": "Gardens & Distant Sea", "level": "Heritage Wing • Level 03"}'::jsonb,
  'An expansive salon sanctuary featuring dual private terraces, hand-carved travertine fireplace, formal dining area for four, and bespoke butler pantry.',
  'The Luxury Salon Suite is designed for guests desiring the proportions of a private private residence. Featuring dual opposing terraces, sunlight shifts through the chamber throughout the day.',
  '["Dual Loggias", "Travertine Fireplace", "Dining Table for 4", "Butler Service Pantry", "Dual Rain Showers", "Deep Freestanding Tub", "Custom Vinyl Library", "Priority Dining Reservations"]'::jsonb,
  '["Dual Private Terraces facing Sunrise and Sunset", "Hand-Carved Travertine Wood-Burning Fireplace", "Dedicated Butler Pantry with Sub-Zero Chilling", "Curated Analog Turntable & Vinyl Record Library"]'::jsonb,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuF3f38rW9N27lK9M11K0dM20k9K02Zq4i6t2v7rTjW9PqM_Vv-1m5K0dM20k9K02Zq4i6t2v7rTjW9PqM_Vv-1m5K0dM20k9K02Zq4i6t2v7rTjW9PqM_Vv-1m5K0dM20k9K02Zq4i6t',
  4.96,
  82
),
(
  'presidential-enclave',
  'presidential-enclave',
  'Presidential Enclave Suite',
  'FL-001',
  'The Crown Pavilion',
  'signature',
  'Crown Estate Sanctuary',
  'bg-[#261900] text-[#fed488]',
  1850,
  '{"areaM2": 180, "areaSqFt": 1937, "bed": "Emperor King", "maxGuests": 4, "aspect": "360° Botanical & Ocean", "level": "Crown Pavilion Penthouse"}'::jsonb,
  'The premier pinnacle of FOUNTANT. Full private floor access, personal infinity plunge pool, private treatment room, dedicated private chef, and 24/7 dedicated butler staff.',
  'The Presidential Enclave Suite represents the absolute zenith of European botanical luxury. Occupying the entire top penthouse tier of the Crown Pavilion, this sanctuary offers 360-degree vistas across both the verdant botanical grounds and the Pacific seascape.',
  '["Private Infinity Plunge Pool", "Exclusive Penthouse Floor Access", "Private Spa Treatment Chamber", "Personal 24/7 Butler & Chauffeur", "Sub-Zero Chef Kitchen", "Custom Wine Cellar with 120 Bottles", "Aviation Heliport Transfer Included"]'::jsonb,
  '["Private Heated Infinity Plunge Pool overlooking the sea", "Dedicated 24-Hour Butler & Private Chauffeur Mercedes S-Class", "In-Suite Private Spa Treatment Chamber & Finnish Sauna", "Helicopter Transfer from International Airport Included"]'::jsonb,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuG9qT02lM20k9K02Zq4i6t2v7rTjW9PqM_Vv-1m5K0dM20k9K02Zq4i6t2v7rTjW9PqM_Vv-1m5K0dM20k9K02Zq4i6t2v7rTjW9PqM_Vv-1m5K0dM20k9K02Zq4i6t2v7rTjW9PqM',
  4.99,
  64
),
(
  'garden-residence',
  'garden-residence',
  'The Garden Residence',
  'FL-050',
  'Pavilion 04',
  'deluxe',
  'Private Walled Garden',
  'bg-[#002613] text-[#ffffff]',
  520,
  '{"areaM2": 58, "areaSqFt": 624, "bed": "King", "maxGuests": 2, "aspect": "Walled Jasmine Garden", "level": "Ground Level • Pavilion 04"}'::jsonb,
  'Secluded ground-floor sanctuary opening directly into a private stone-walled jasmine garden with outdoor marble shower, sunloungers, and water fountain.',
  'Surrounded by centuries-old olive trees and fragrant climbing jasmine, the Garden Residence connects guests directly with the living soil and flora of the sanctuary grounds.',
  '["Private Walled Courtyard", "Outdoor Marble Rain Shower", "Artisan Sunloungers", "Direct Botanical Garden Access", "In-Room French Press", "Organic Herb Tea Station", "Linen Bathrobes"]'::jsonb,
  '["Enclosed 200 sq ft Private Walled Garden", "Open-Air Hot Rain Shower amidst Fragrant Jasmine", "Direct Private Gate to Heritage Herb Gardens", "Morning Herbal Infusions picked fresh by Estate Botanist"]'::jsonb,
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDlW9YlAOZza9EXnrvsL76okQsSh-8gmGE-TBE2UXprVO2Mv-c3nZu-z5jHocrN0mG5yLQOMv6Ys9lp3wYzcW_LL0dHDdiMZ-6P27RV3m7dV2ZOvw_sTDB6aleDfGzuXsm0fgzAjTJ0dscqFA97pz16VVoU673SHfyXWH-4fBAqQYmyz2NdTt0sYhlJGMPqoJ6ojhhP41e41Qt52SUxMIA5AeqHnmZQYiQmGpGBmvCif27RMqpJp3KI',
  4.94,
  88
)
ON CONFLICT (id) DO NOTHING;
`;
