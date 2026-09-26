import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { Database } from '../lib/database.types';

export type SanctuaryInquiry = Database['public']['Tables']['inquiries']['Row'];

export async function createSanctuaryInquiry(params: {
  topic: string;
  chamberInterest?: string;
  guestName: string;
  email: string;
  phone?: string;
  arrivalDate?: string;
  specialRequests?: string;
  userId?: string;
}): Promise<{ success: boolean; refCode: string; error?: string }> {
  const refCode = `INQ-${Math.floor(10000 + Math.random() * 90000)}`;
  const cleanUserId = params.userId && !params.userId.startsWith('demo-') ? params.userId : null;

  const supabase = getSupabase();
  if (supabase && isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from('inquiries').insert({
        ref_code: refCode,
        user_id: cleanUserId,
        topic: params.topic,
        chamber_interest: params.chamberInterest || null,
        guest_name: params.guestName,
        email: params.email,
        phone: params.phone || '',
        arrival_date: params.arrivalDate || null,
        special_requests: params.specialRequests || '',
        status: 'received',
      });

      if (error) {
        console.warn('Supabase inquiry insert note:', error.message);
      }
    } catch (e) {
      console.warn('Supabase inquiry error', e);
    }
  }

  return { success: true, refCode };
}
