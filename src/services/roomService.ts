import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { Room } from '../types/hotel';
import { ROOMS_DATA } from '../data/hotelData';

export async function fetchRooms(): Promise<Room[]> {
  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) {
    return ROOMS_DATA;
  }

  try {
    const { data, error } = await supabase.from('rooms').select('*');
    if (!error && data && data.length > 0) {
      return data.map((r) => ({
        id: r.id,
        slug: r.slug,
        name: r.name,
        refCode: r.ref_code,
        pavilion: r.pavilion,
        category: r.category as any,
        tag: r.tag,
        tagColor: r.tag_color || undefined,
        pricePerNight: Number(r.price_per_night),
        specs: r.specs as any,
        shortDescription: r.short_description,
        longDescription: r.long_description,
        amenities: (r.amenities as any) || [],
        keyAmenities: (r.key_amenities as any) || [],
        heroImage: r.hero_image,
        galleryImages: (r.gallery_images as any) || [],
        highlights: (r.highlights as any) || [],
        rating: Number(r.rating) || 4.95,
        reviewCount: r.review_count || 100,
      }));
    }
  } catch (e) {
    console.warn('Could not load rooms from Supabase, using local catalog', e);
  }

  return ROOMS_DATA;
}

export async function seedRoomsToSupabase(): Promise<{ success: boolean; count: number; message: string }> {
  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) {
    return { success: false, count: 0, message: 'Supabase client is not configured.' };
  }

  try {
    const records = ROOMS_DATA.map((r) => ({
      id: r.id,
      slug: r.slug,
      name: r.name,
      ref_code: r.refCode,
      pavilion: r.pavilion,
      category: r.category,
      tag: r.tag,
      tag_color: r.tagColor || null,
      price_per_night: r.pricePerNight,
      specs: r.specs as any,
      short_description: r.shortDescription,
      long_description: r.longDescription,
      amenities: r.amenities as any,
      key_amenities: r.keyAmenities as any,
      hero_image: r.heroImage,
      gallery_images: r.galleryImages as any,
      highlights: r.highlights as any,
      rating: r.rating,
      review_count: r.reviewCount,
    }));

    const { error } = await supabase.from('rooms').upsert(records, { onConflict: 'id' });
    if (error) {
      return { success: false, count: 0, message: error.message };
    }

    return { success: true, count: records.length, message: `Successfully seeded ${records.length} chambers into Supabase.` };
  } catch (e: any) {
    return { success: false, count: 0, message: e.message || 'Seeding failed' };
  }
}
