import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { createDiningReservation } from '../services/diningService';
import { Utensils, CheckCircle2, ShieldCheck, Database } from 'lucide-react';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultVenue?: string;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
  defaultVenue = 'The Orangery',
}) => {
  const { user, profile, isConfigured } = useAuth();

  const [venue, setVenue] = useState(defaultVenue);
  const [date, setDate] = useState('2024-10-15');
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState('2');
  const [seatingArea, setSeatingArea] = useState('Courtyard Conservatory');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [issuedCode, setIssuedCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVenue(defaultVenue);
      if (profile?.first_name) {
        setName(`${profile.first_name} ${profile.last_name || ''}`.trim());
      }
      if (user?.email) {
        setEmail(user.email);
      }
    }
  }, [isOpen, defaultVenue, profile, user]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const venueId = venue.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const result = await createDiningReservation({
      venueId,
      venueName: venue,
      reservationDate: date,
      reservationTime: time,
      partySize: parseInt(guests, 10) || 2,
      seatingArea,
      guestName: name || 'Sanctuary Resident',
      guestEmail: email || 'resident@fountanthotel.com',
      dietaryNotes: notes,
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
              <span className="material-symbols-outlined text-3xl">restaurant</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="font-label-caps text-xs text-[#775a19] uppercase tracking-widest font-semibold">
                Table Confirmed
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <Database className="w-2.5 h-2.5" />
                {isConfigured ? 'Supabase Synchronized' : 'Sanctuary Ledger'}
              </span>
            </div>
            <h3 className="font-serif text-2xl text-[#001d0e]">Table Reserved at {venue}</h3>
            <p className="font-sans text-xs text-[#414843] leading-relaxed">
              We look forward to welcoming {name || 'you'} on{' '}
              <strong className="text-[#001d0e]">{date}</strong> at{' '}
              <strong className="text-[#001d0e]">{time}</strong> for {guests} guests ({seatingArea}
              ). A confirmation invitation has been dispatched to {email}.
            </p>
            <div className="bg-[#f6f3ed] p-3 text-xs font-sans text-left space-y-1">
              <div className="flex justify-between">
                <span>Confirmation Code:</span>
                <span className="font-mono font-bold text-[#001d0e]">#{issuedCode}</span>
              </div>
              <div className="flex justify-between">
                <span>Dress Code:</span>
                <span className="text-[#775a19]">Smart Casual &amp; Sophisticated Leisure</span>
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
                Sanctuary Gastronomy
              </span>
              <h3 className="font-serif text-2xl text-[#001d0e]">Reserve a Table</h3>
              <p className="text-[11px] text-[#727972] mt-0.5">
                Saved to your resident dossier in Supabase.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                  Venue
                </label>
                <select
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full bg-[#f6f3ed] p-2.5 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                >
                  <option value="The Orangery">The Orangery</option>
                  <option value="Botanical Evening Bar">Botanical Evening Bar</option>
                  <option value="The Library Salon">The Library Salon</option>
                  <option value="Chef's Atrium & Cellar">Chef's Atrium &amp; Cellar</option>
                </select>
              </div>

              <div>
                <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                  Seating Ambience
                </label>
                <select
                  value={seatingArea}
                  onChange={(e) => setSeatingArea(e.target.value)}
                  className="w-full bg-[#f6f3ed] p-2.5 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                >
                  <option value="Courtyard Conservatory">Courtyard Conservatory</option>
                  <option value="Fountain Terrace (Al Fresco)">Fountain Terrace (Al Fresco)</option>
                  <option value="Private Sommelier Vault">Private Sommelier Vault</option>
                  <option value="Fireplace Alcove">Fireplace Alcove</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                  Date
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
                  Service Time
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#f6f3ed] p-2 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                >
                  <option value="12:30">12:30 Luncheon</option>
                  <option value="13:30">13:30 Luncheon</option>
                  <option value="18:30">18:30 Twilight</option>
                  <option value="19:30">19:30 Dinner</option>
                  <option value="20:30">20:30 Dinner</option>
                  <option value="21:30">21:30 Evening</option>
                </select>
              </div>

              <div>
                <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-[#f6f3ed] p-2 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                >
                  <option value="1">1 Resident</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="6">6 Guests (Salon Table)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                  Primary Guest Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Lord Julian Sterling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#f6f3ed] p-2 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                  Sanctuary Contact Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="resident@estate.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f6f3ed] p-2 text-xs text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-label-caps text-[10px] uppercase text-[#727972] block mb-1">
                Dietary Requirements &amp; Special Occasions
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Vegetarian, celebrating 10th anniversary, prefer quiet corner away from kitchen."
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
              <span>{submitting ? 'RESERVIING TABLE...' : 'CONFIRM TABLE RESERVATION'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
