import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { Reservation } from '../types/hotel';
import { INITIAL_RESERVATIONS } from '../data/hotelData';

const LOCAL_STORAGE_KEY = 'fountant_reservations';

export async function fetchReservations(userId?: string): Promise<Reservation[]> {
  // Load local backup
  let localData: Reservation[] = [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    localData = raw ? JSON.parse(raw) : INITIAL_RESERVATIONS;
  } catch {
    localData = INITIAL_RESERVATIONS;
  }

  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) {
    return localData;
  }

  try {
    let query = supabase.from('reservations').select('*').order('created_at', { ascending: false });
    if (userId && !userId.startsWith('demo-')) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('Supabase fetchReservations failed, using local storage:', error.message);
      return localData;
    }

    if (data && data.length > 0) {
      // Map Supabase rows to client Reservation model
      const mapped: Reservation[] = data.map((row) => ({
        id: row.id,
        refCode: row.ref_code,
        roomId: row.room_id || '',
        roomName: row.room_name,
        roomImage: row.room_image,
        category: row.category,
        checkIn: row.check_in,
        checkOut: row.check_out,
        nights: row.nights,
        adults: row.adults,
        firstName: row.first_name,
        lastName: row.last_name,
        email: row.email,
        phone: row.phone,
        specialRequests: row.special_requests,
        privileges: (row.privileges as any) || {
          airportTransfer: false,
          earlyArrival: false,
          featherFree: false,
        },
        nightlyRate: Number(row.nightly_rate),
        subtotal: Number(row.subtotal),
        serviceFee: Number(row.service_fee),
        taxes: Number(row.taxes),
        total: Number(row.total),
        status: row.status as 'confirmed' | 'active' | 'completed' | 'cancelled',
        createdAt: row.created_at,
      }));

      // Merge unique entries into local storage for offline resilience
      return mapped;
    }

    return localData;
  } catch (err) {
    console.error('Failed reading reservations from Supabase:', err);
    return localData;
  }
}

export async function createReservation(
  reservation: Reservation,
  userId?: string
): Promise<{ success: boolean; data?: Reservation; error?: string; source: 'supabase' | 'local' }> {
  // Always update local storage first
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list: Reservation[] = raw ? JSON.parse(raw) : INITIAL_RESERVATIONS;
    const exists = list.some((r) => r.id === reservation.id || r.refCode === reservation.refCode);
    const updated = exists ? list : [reservation, ...list];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Local storage write warning', e);
  }

  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) {
    return { success: true, data: reservation, source: 'local' };
  }

  try {
    const cleanUserId = userId && !userId.startsWith('demo-') ? userId : null;

    const { data, error } = await supabase
      .from('reservations')
      .insert({
        ref_code: reservation.refCode,
        user_id: cleanUserId,
        room_id: reservation.roomId,
        room_name: reservation.roomName,
        room_image: reservation.roomImage,
        category: reservation.category,
        check_in: reservation.checkIn,
        check_out: reservation.checkOut,
        nights: reservation.nights,
        adults: reservation.adults,
        first_name: reservation.firstName,
        last_name: reservation.lastName,
        email: reservation.email,
        phone: reservation.phone,
        special_requests: reservation.specialRequests,
        privileges: reservation.privileges,
        nightly_rate: reservation.nightlyRate,
        subtotal: reservation.subtotal,
        service_fee: reservation.serviceFee,
        taxes: reservation.taxes,
        total: reservation.total,
        status: reservation.status,
      })
      .select()
      .single();

    if (error) {
      console.warn('Supabase insert reservation notice:', error.message);
      return { success: true, data: reservation, source: 'local', error: error.message };
    }

    return { success: true, data: reservation, source: 'supabase' };
  } catch (err: any) {
    console.error('Supabase create reservation failed:', err);
    return { success: true, data: reservation, source: 'local', error: err.message };
  }
}

export async function cancelReservation(
  reservationId: string,
  refCode?: string
): Promise<{ success: boolean; error?: string }> {
  // Update local storage
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const list: Reservation[] = JSON.parse(raw);
      const updated = list.map((r) =>
        r.id === reservationId || (refCode && r.refCode === refCode)
          ? { ...r, status: 'cancelled' as const }
          : r
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.warn('Local storage cancel error', e);
  }

  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) {
    return { success: true };
  }

  try {
    let query = supabase.from('reservations').update({ status: 'cancelled' });
    if (refCode) {
      query = query.eq('ref_code', refCode);
    } else {
      query = query.eq('id', reservationId);
    }

    const { error } = await query;
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function lookupReservation(
  refCode: string,
  email: string
): Promise<Reservation | null> {
  const supabase = getSupabase();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('ref_code', refCode.trim().toUpperCase())
        .ilike('email', email.trim())
        .single();

      if (!error && data) {
        return {
          id: data.id,
          refCode: data.ref_code,
          roomId: data.room_id || '',
          roomName: data.room_name,
          roomImage: data.room_image,
          category: data.category,
          checkIn: data.check_in,
          checkOut: data.check_out,
          nights: data.nights,
          adults: data.adults,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          phone: data.phone,
          specialRequests: data.special_requests,
          privileges: (data.privileges as any) || {},
          nightlyRate: Number(data.nightly_rate),
          subtotal: Number(data.subtotal),
          serviceFee: Number(data.service_fee),
          taxes: Number(data.taxes),
          total: Number(data.total),
          status: data.status as 'confirmed' | 'active' | 'completed' | 'cancelled',
          createdAt: data.created_at,
        };
      }
    } catch (e) {
      console.warn('Supabase lookup error', e);
    }
  }

  // Fallback to local
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list: Reservation[] = raw ? JSON.parse(raw) : INITIAL_RESERVATIONS;
    const found = list.find(
      (r) =>
        r.refCode.toUpperCase() === refCode.trim().toUpperCase() &&
        r.email.toLowerCase() === email.trim().toLowerCase()
    );
    return found || null;
  } catch {
    return null;
  }
}
