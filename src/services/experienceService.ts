import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { Database } from '../lib/database.types';

export type ExperienceBooking = Database['public']['Tables']['experience_bookings']['Row'];

const LOCAL_EXP_KEY = 'fountant_experience_bookings';

export async function createExperienceBooking(params: {
  experienceId: string;
  experienceTitle: string;
  bookingDate: string;
  timeSlot: string;
  guestsCount: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  pricePaid?: string;
  specialRequests?: string;
  userId?: string;
}): Promise<{ success: boolean; data?: ExperienceBooking; refCode: string; error?: string }> {
  const refCode = `EXP-${Math.floor(10000 + Math.random() * 90000)}`;
  const cleanUserId = params.userId && !params.userId.startsWith('demo-') ? params.userId : null;

  const newRecord: ExperienceBooking = {
    id: `local-exp-${Date.now()}`,
    ref_code: refCode,
    user_id: cleanUserId,
    experience_id: params.experienceId,
    experience_title: params.experienceTitle,
    booking_date: params.bookingDate,
    time_slot: params.timeSlot,
    guests_count: params.guestsCount,
    guest_name: params.guestName,
    guest_email: params.guestEmail,
    guest_phone: params.guestPhone || '',
    price_paid: params.pricePaid || 'Complimentary with Suite',
    special_requests: params.specialRequests || '',
    status: 'confirmed',
    created_at: new Date().toISOString(),
  };

  // Local backup
  try {
    const raw = localStorage.getItem(LOCAL_EXP_KEY);
    const list = raw ? JSON.parse(raw) : [];
    localStorage.setItem(LOCAL_EXP_KEY, JSON.stringify([newRecord, ...list]));
  } catch (e) {
    console.warn('Local experience save warning', e);
  }

  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) {
    return { success: true, data: newRecord, refCode };
  }

  try {
    const { data, error } = await supabase
      .from('experience_bookings')
      .insert({
        ref_code: refCode,
        user_id: cleanUserId,
        experience_id: params.experienceId,
        experience_title: params.experienceTitle,
        booking_date: params.bookingDate,
        time_slot: params.timeSlot,
        guests_count: params.guestsCount,
        guest_name: params.guestName,
        guest_email: params.guestEmail,
        guest_phone: params.guestPhone || '',
        price_paid: params.pricePaid || 'Complimentary with Suite',
        special_requests: params.specialRequests || '',
        status: 'confirmed',
      })
      .select()
      .single();

    if (error) {
      console.warn('Supabase experience booking warning:', error.message);
      return { success: true, data: newRecord, refCode, error: error.message };
    }

    return { success: true, data: data as ExperienceBooking, refCode };
  } catch (e: any) {
    return { success: true, data: newRecord, refCode, error: e.message };
  }
}

export async function fetchExperienceBookings(userId?: string): Promise<ExperienceBooking[]> {
  let localData: ExperienceBooking[] = [];
  try {
    const raw = localStorage.getItem(LOCAL_EXP_KEY);
    localData = raw ? JSON.parse(raw) : [];
  } catch {
    localData = [];
  }

  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) {
    return localData;
  }

  try {
    let query = supabase.from('experience_bookings').select('*').order('created_at', { ascending: false });
    if (userId && !userId.startsWith('demo-')) {
      query = query.eq('user_id', userId);
    }
    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as ExperienceBooking[];
    }
    return localData;
  } catch {
    return localData;
  }
}
