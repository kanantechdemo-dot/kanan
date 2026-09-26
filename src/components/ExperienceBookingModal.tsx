import React, { useState, useEffect } from 'react';
import { SanctuaryExperience } from '../types/hotel';
import { useAuth } from '../context/AuthContext';
import { createExperienceBooking } from '../services/experienceService';
import { Database, Sparkles, CheckCircle2 } from 'lucide-react';

interface ExperienceBookingModalProps {
  experience: SanctuaryExperience | null;
  onClose: () => void;
}

export const ExperienceBookingModal: React.FC<ExperienceBookingModalProps> = ({
  experience,
  onClose,
}) => {
  const { user, profile, isConfigured } = useAuth();

  const [date, setDate] = useState('2024-10-16');
  const [time, setTime] = useState('10:00');
  const [guests, setGuests] = useState('2');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [issuedCode, setIssuedCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (experience) {
      if (profile?.first_name) {
        setGuestName(`${profile.first_name} ${profile.last_name || ''}`.trim());
      }
      if (user?.email) {
        setGuestEmail(user.email);
      }
    }
  }, [experience, profile, user]);

  if (!experience) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await createExperienceBooking({
      experienceId: experience.id,
      experienceTitle: experience.title,
      bookingDate: date,
      timeSlot: time,
      guestsCount: parseInt(guests, 10) || 2,
      guestName: guestName || 'Sanctuary Resident',
      guestEmail: guestEmail || 'resident@fountanthotel.com',
      pricePaid: experience.price,
      specialRequests: notes,
      userId: user?.id,
    });

    setIssuedCode(result.refCode);
    setSubmitting(false);
    setConfirmed(true);
  };

  const handleClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#001d0e]/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#fcf9f3] max-w-lg w-full p-8 border border-[#e5e2dc] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#414843] hover:text-[#001d0e] cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {confirmed ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 mx-auto bg-[#c3ecd0]/40 text-[#416650] flex items-center justify-center rounded-full">
              <span className="material-symbols-outlined text-3xl">spa</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="font-label-caps text-xs text-[#775a19] uppercase tracking-widest font-semibold">
                Experience Confirmed
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <Database className="w-2.5 h-2.5" />
                {isConfigured ? 'Supabase Synchronized' : 'Sanctuary Ledger'}
              </span>
            </div>
            <h3 className="font-serif text-2xl text-[#001d0e]">{experience.title}</h3>
            <p className="font-sans text-xs text-[#414843] leading-relaxed">
              Reserved for <strong className="text-[#001d0e]">{guestName}</strong> on{' '}
              <strong className="text-[#001d0e]">{date}</strong> at{' '}
              <strong className="text-[#001d0e]">{time}</strong> ({guests} guests). Direct departure
              details sent to {guestEmail}.
            </p>
            <div className="bg-[#f6f3ed] p-3 text-xs font-sans text-left space-y-1">
              <div className="flex justify-between">
                <span>Sanctuary Voucher Ref:</span>
                <span className="font-mono font-bold text-[#001d0e]">#{issuedCode}</span>
              </div>
              <div className="flex justify-between">
                <span>Tariff:</span>
                <span className="text-[#775a19] font-medium">{experience.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Concierge Briefing:</span>
                <span className="text-[#727972]">Arrive 15 minutes prior at East Gate Portico</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-3 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#1b1714] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-[#e5e2dc] pb-3 mb-4">
              <span className="font-label-caps text-[11px] text-[#775a19] uppercase tracking-widest block">
                {experience.category} Excursion
              </span>
              <h3 className="font-serif text-2xl text-[#001d0e]">{experience.title}</h3>
              <p className="text-xs text-[#727972] mt-1">
                Duration: {experience.duration} · {experience.price}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                  Excursion Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#f6f3ed] p-2 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                  Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#f6f3ed] p-2 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                >
                  <option value="08:00">08:00 Dawn</option>
                  <option value="10:00">10:00 Morning</option>
                  <option value="14:00">14:00 Afternoon</option>
                  <option value="17:00">17:00 Sunset Sail</option>
                </select>
              </div>

              <div>
                <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                  Participants
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-[#f6f3ed] p-2 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                  Resident Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Julian Sterling"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-[#f6f3ed] p-2 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="resident@estate.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full bg-[#f6f3ed] p-2 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                Special Requests or Sommelier Guidance
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Celebrating anniversary, requested French champagne pairing."
                className="w-full bg-[#f6f3ed] p-2 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#775a19] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#fed488] hover:text-[#785a1a] transition-all duration-300 shadow-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : null}
              <span>{submitting ? 'CONFIRMING...' : 'CONFIRM EXPERIENCE RESERVATION'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
