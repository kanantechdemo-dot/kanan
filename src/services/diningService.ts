import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { Database } from '../lib/database.types';

export type DiningReservation = Database['public']['Tables']['dining_reservations']['Row'];

const LOCAL_DINING_KEY = 'fountant_dining_reservations';

export async function createDiningReservation(params: {
  venueId: string;
  venueName: string;
  reservationDate: string;
  reservationTime: string;
  partySize: number;
  seatingArea?: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  dietaryNotes?: string;
  specialOccasion?: string;
  userId?: string;
}): Promise<{ success: boolean; data?: DiningReservation; refCode: string; error?: string }> {
  const refCode = `DIN-${Math.floor(10000 + Math.random() * 90000)}`;

  const cleanUserId = params.userId && !params.userId.startsWith('demo-') ? params.userId : null;

  const newRecord: DiningReservation = {
    id: `local-din-${Date.now()}`,
    ref_code: refCode,
    user_id: cleanUserId,
    venue_id: params.venueId,
    venue_name: params.venueName,
    reservation_date: params.reservationDate,
    reservation_time: params.reservationTime,
    party_size: params.partySize,
    seating_area: params.seatingArea || 'Main Dining Pavilion',
    guest_name: params.guestName,
    guest_email: params.guestEmail,
    guest_phone: params.guestPhone || '',
    dietary_notes: params.dietaryNotes || '',
    special_occasion: params.specialOccasion || '',
    status: 'confirmed',
    created_at: new Date().toISOString(),
  };

  // Local backup
  try {
    const raw = localStorage.getItem(LOCAL_DINING_KEY);
    const list = raw ? JSON.parse(raw) : [];
    localStorage.setItem(LOCAL_DINING_KEY, JSON.stringify([newRecord, ...list]));
  } catch (e) {
    console.warn('Local dining save warning', e);
  }

  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) {
    return { success: true, data: newRecord, refCode };
  }

  try {
    const { data, error } = await supabase
      .from('dining_reservations')
      .insert({
        ref_code: refCode,
        user_id: cleanUserId,
        venue_id: params.venueId,
        venue_name: params.venueName,
        reservation_date: params.reservationDate,
        reservation_time: params.reservationTime,
        party_size: params.partySize,
        seating_area: params.seatingArea || 'Main Dining Pavilion',
        guest_name: params.guestName,
        guest_email: params.guestEmail,
        guest_phone: params.guestPhone || '',
        dietary_notes: params.dietaryNotes || '',
        special_occasion: params.specialOccasion || '',
        status: 'confirmed',
      })
      .select()
      .single();

    if (error) {
      console.warn('Supabase dining reservation warning:', error.message);
      return { success: true, data: newRecord, refCode, error: error.message };
    }

    return { success: true, data: data as DiningReservation, refCode };
  } catch (e: any) {
    return { success: true, data: newRecord, refCode, error: e.message };
  }
}

export async function fetchDiningReservations(userId?: string): Promise<DiningReservation[]> {
  let localData: DiningReservation[] = [];
  try {
    const raw = localStorage.getItem(LOCAL_DINING_KEY);
    localData = raw ? JSON.parse(raw) : [];
  } catch {
    localData = [];
  }

  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) {
    return localData;
  }

  try {
    let query = supabase.from('dining_reservations').select('*').order('created_at', { ascending: false });
    if (userId && !userId.startsWith('demo-')) {
      query = query.eq('user_id', userId);
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as DiningReservation[];
    }
    return localData;
  } catch {
    return localData;
  }
}
