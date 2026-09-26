import React, { useState, useMemo, useEffect } from 'react';
import { PageId } from '../components/Header';
import { ROOMS_DATA } from '../data/hotelData';
import { Room, Reservation } from '../types/hotel';
import { useAuth } from '../context/AuthContext';
import { createReservation } from '../services/reservationService';
import { Database, ShieldCheck } from 'lucide-react';

interface ReservationPageProps {
  selectedRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  onNavigate: (page: PageId, roomId?: string) => void;
  onSaveReservation: (reservation: Reservation) => void;
}

export const ReservationPage: React.FC<ReservationPageProps> = ({
  selectedRoomId = 'deluxe-room',
  initialCheckIn = '2024-10-14',
  initialCheckOut = '2024-10-17',
  initialGuests = 2,
  onNavigate,
  onSaveReservation
}) => {
  const { user, profile, isConfigured } = useAuth();

  // Current room
  const [roomId, setRoomId] = useState(selectedRoomId);
  const room: Room = useMemo(() => {
    return ROOMS_DATA.find((r) => r.id === roomId) || ROOMS_DATA[0];
  }, [roomId]);

  // Dates & Occupancy
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [adults, setAdults] = useState(initialGuests);
  const [isEditingDates, setIsEditingDates] = useState(false);

  // Guest Details
  const [firstName, setFirstName] = useState(profile?.first_name || 'Lord Julian');
  const [lastName, setLastName] = useState(profile?.last_name || 'Vane-Tempest');
  const [email, setEmail] = useState(user?.email || profile?.email || 'julian.vane@curzon-estate.co.uk');
  const [phone, setPhone] = useState(profile?.phone || '+44 7911 123456');

  // Sync user profile when auth loads
  useEffect(() => {
    if (profile?.first_name) setFirstName(profile.first_name);
    if (profile?.last_name) setLastName(profile.last_name);
    if (user?.email) setEmail(user.email);
    if (profile?.phone) setPhone(profile.phone);
  }, [profile, user]);

  // Privileges Add-ons
  const [airportTransfer, setAirportTransfer] = useState(true);
  const [earlyArrival, setEarlyArrival] = useState(true);
  const [featherFree, setFeatherFree] = useState(false);
  const [specialRequests, setSpecialRequests] = useState(
    'Vegetarian breakfast preference, late arrival after 19:30.'
  );

  // Payment State
  const [cardHolder, setCardHolder] = useState('JULIAN VANE TEMPEST');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 8842');
  const [cardExpiry, setCardExpiry] = useState('09/27');
  const [cardCvv, setCardCvv] = useState('884');

  // Confirmation Overlay State
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSource, setSaveSource] = useState<'supabase' | 'local'>('local');

  // Calculate nights
  const nights = useMemo(() => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 3;
  }, [checkIn, checkOut]);

  // Calculate pricing breakdown
  const nightlySubtotal = room.pricePerNight * nights;
  const transferCost = airportTransfer ? 180 : 0;
  const earlyArrivalCost = earlyArrival ? 180 : 0;
  const additionsTotal = transferCost + earlyArrivalCost;
  const luxuryTax = Math.round(nightlySubtotal * 0.08);
  const sanctuaryLevy = Math.round(nightlySubtotal * 0.04);
  const grandTotal = nightlySubtotal + luxuryTax + sanctuaryLevy;

  const handleConfirmReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newRes: Reservation = {
      id: `res-${Date.now()}`,
      refCode: `FT-${Math.floor(10000 + Math.random() * 90000)}`,
      roomId: room.id,
      roomName: room.name,
      roomImage: room.heroImage,
      category: room.category,
      checkIn,
      checkOut,
      nights,
      adults,
      firstName,
      lastName,
      email,
      phone,
      specialRequests,
      privileges: {
        airportTransfer,
        earlyArrival,
        featherFree,
      },
      nightlyRate: room.pricePerNight,
      subtotal: nightlySubtotal,
      serviceFee: luxuryTax,
      taxes: sanctuaryLevy,
      total: grandTotal,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    // Save to Supabase and local storage
    const result = await createReservation(newRes, user?.id);
    setSaveSource(result.source);
    onSaveReservation(newRes);
    setConfirmedReservation(newRes);
    setIsSubmitting(false);
  };

  const formatDateDisplay = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#fcf9f3]">
      {/* Sub-Header / Page Intent Banner */}
      <section className="w-full bg-[#f6f3ed] py-8 px-5 lg:px-16 border-b border-[#e5e2dc]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#775a19] font-label-caps text-[11px] uppercase tracking-widest mb-1">
              <span>Sanctuary Reservations</span>
              <span>•</span>
              <span>Bespoke Concierge</span>
            </div>
            <h1 className="font-display-hero text-3xl sm:text-4xl text-[#001d0e] tracking-tight">
              Your Private Retreatment
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-[#ffffff] px-4 py-2 border border-[#e5e2dc] shadow-sm">
            <span className="material-symbols-outlined text-[#775a19] text-lg">
              verified
            </span>
            <span className="font-label-caps text-[11px] uppercase tracking-wider text-[#414843]">
              Guaranteed Direct Booking Privileges
            </span>
          </div>
        </div>
      </section>

      {/* Multi-Step Progress Tracker Ribbon (Exact matching Image 5) */}
      <section className="w-full bg-[#ffffff] px-5 lg:px-16 py-4 border-b border-[#e5e2dc]">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Booking steps" className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Step 1: Completed */}
            <button
              onClick={() => setIsEditingDates(true)}
              className="text-left flex items-center gap-3 p-3 bg-[#f0eee8] hover:bg-[#e5e2dc] transition-all cursor-pointer border border-[#e5e2dc]"
            >
              <span className="w-7 h-7 flex items-center justify-center font-label-caps text-xs bg-[#001d0e] text-[#ffffff]">
                <span className="material-symbols-outlined text-sm">check</span>
              </span>
              <div className="min-w-0">
                <span className="block font-label-caps text-[10px] text-[#775a19] uppercase">
                  Step 01
                </span>
                <span className="block font-sans text-xs font-semibold text-[#001d0e] truncate">
                  Search Dates
                </span>
              </div>
            </button>

            {/* Step 2: Completed */}
            <button
              onClick={() => onNavigate('rooms-and-suites')}
              className="text-left flex items-center gap-3 p-3 bg-[#f0eee8] hover:bg-[#e5e2dc] transition-all cursor-pointer border border-[#e5e2dc]"
            >
              <span className="w-7 h-7 flex items-center justify-center font-label-caps text-xs bg-[#001d0e] text-[#ffffff]">
                <span className="material-symbols-outlined text-sm">check</span>
              </span>
              <div className="min-w-0">
                <span className="block font-label-caps text-[10px] text-[#775a19] uppercase">
                  Step 02
                </span>
                <span className="block font-sans text-xs font-semibold text-[#001d0e] truncate">
                  {room.name}
                </span>
              </div>
            </button>

            {/* Step 3: Current Active */}
            <div className="flex items-center gap-3 p-3 bg-[#001d0e] text-[#ffffff] shadow-sm">
              <span className="w-7 h-7 flex items-center justify-center font-label-caps text-xs bg-[#775a19] text-[#ffffff] font-bold">
                03
              </span>
              <div className="min-w-0">
                <span className="block font-label-caps text-[10px] text-[#ffdea5] uppercase font-semibold">
                  Active Stage
                </span>
                <span className="block font-sans text-xs font-semibold text-[#ffffff] truncate">
                  Guest &amp; Payment
                </span>
              </div>
            </div>

            {/* Step 4: Summary state */}
            <div className="flex items-center gap-3 p-3 bg-[#f6f3ed] opacity-80 border border-[#e5e2dc]">
              <span className="w-7 h-7 flex items-center justify-center font-label-caps text-xs bg-[#e5e2dc] text-[#414843]">
                04
              </span>
              <div className="min-w-0">
                <span className="block font-label-caps text-[10px] text-[#727972] uppercase">
                  Review
                </span>
                <span className="block font-sans text-xs font-semibold text-[#727972] truncate">
                  Confirmation
                </span>
              </div>
            </div>
          </nav>
        </div>
      </section>

      {/* Main Booking Canvas */}
      <section className="w-full px-5 lg:px-16 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Data Entry (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* STEP 1 SUMMARY BOX: Dates & Travelers */}
            <div className="bg-[#f6f3ed] p-6 border border-[#e5e2dc]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e5e2dc]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#775a19] text-lg">
                    calendar_month
                  </span>
                  <span className="font-label-caps text-[11px] text-[#001d0e] uppercase tracking-widest font-semibold">
                    Step 1 · Schedule &amp; Capacity
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingDates(!isEditingDates)}
                  className="font-label-caps text-[11px] uppercase text-[#775a19] hover:text-[#001d0e] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{isEditingDates ? 'Done' : 'Modify'}</span>
                  <span className="material-symbols-outlined text-sm">
                    {isEditingDates ? 'check' : 'edit'}
                  </span>
                </button>
              </div>

              {isEditingDates ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#ffffff] p-4 border border-[#e5e2dc]">
                  <div>
                    <label className="font-label-caps text-[10px] text-[#727972] uppercase block mb-1">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-[#f0eee8] px-3 py-2 font-sans text-xs text-[#001d0e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-[10px] text-[#727972] uppercase block mb-1">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-[#f0eee8] px-3 py-2 font-sans text-xs text-[#001d0e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-[10px] text-[#727972] uppercase block mb-1">
                      Travelers
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(parseInt(e.target.value, 10))}
                      className="w-full bg-[#f0eee8] px-3 py-2 font-sans text-xs text-[#001d0e] focus:outline-none cursor-pointer"
                    >
                      <option value="1">1 Adult</option>
                      <option value="2">2 Adults</option>
                      <option value="3">3 Adults</option>
                      <option value="4">4 Adults</option>
                      <option value="6">6 Adults</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#ffffff] p-5 border border-[#e5e2dc]">
                  <div>
                    <span className="font-label-caps text-[10px] text-[#727972] uppercase block mb-1">
                      Check-in
                    </span>
                    <span className="font-sans text-sm font-semibold text-[#001d0e] block">
                      {formatDateDisplay(checkIn)}
                    </span>
                    <span className="font-sans text-xs text-[#727972]">
                      From 15:00
                    </span>
                  </div>

                  <div>
                    <span className="font-label-caps text-[10px] text-[#727972] uppercase block mb-1">
                      Check-out
                    </span>
                    <span className="font-sans text-sm font-semibold text-[#001d0e] block">
                      {formatDateDisplay(checkOut)}
                    </span>
                    <span className="font-sans text-xs text-[#727972]">
                      Until 12:00
                    </span>
                  </div>

                  <div>
                    <span className="font-label-caps text-[10px] text-[#727972] uppercase block mb-1">
                      Duration
                    </span>
                    <span className="font-sans text-sm font-semibold text-[#001d0e] block">
                      {nights} Night{nights > 1 ? 's' : ''}
                    </span>
                    <span className="font-sans text-xs text-[#775a19]">
                      Autumn Sanctuary Season
                    </span>
                  </div>

                  <div>
                    <span className="font-label-caps text-[10px] text-[#727972] uppercase block mb-1">
                      Travelers
                    </span>
                    <span className="font-sans text-sm font-semibold text-[#001d0e] block">
                      {adults} Adults
                    </span>
                    <span className="font-sans text-xs text-[#727972]">
                      1 Suite • Non-Smoking
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2 SELECTED ROOM CARD */}
            <div className="bg-[#f6f3ed] p-6 border border-[#e5e2dc]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e5e2dc]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#775a19] text-lg">
                    hotel
                  </span>
                  <span className="font-label-caps text-[11px] text-[#001d0e] uppercase tracking-widest font-semibold">
                    Step 2 · Selected Suite Selection
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('rooms-and-suites')}
                  className="font-label-caps text-[11px] uppercase text-[#775a19] hover:text-[#001d0e] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Change Room</span>
                  <span className="material-symbols-outlined text-sm">
                    swap_horiz
                  </span>
                </button>
              </div>

              <div className="bg-[#ffffff] grid grid-cols-1 md:grid-cols-12 overflow-hidden border border-[#e5e2dc]">
                <div className="md:col-span-5 relative min-h-[220px]">
                  <img
                    src={room.heroImage}
                    alt={room.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#001d0e]/85 backdrop-blur-sm text-[#ffffff] px-3 py-1 font-label-caps text-[10px] uppercase tracking-widest">
                    Included in Reservation
                  </div>
                </div>

                <div className="md:col-span-7 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <span className="font-label-caps text-[10px] text-[#775a19] uppercase font-semibold">
                          {room.pavilion} • Level 3
                        </span>
                        <h3 className="font-serif text-xl text-[#001d0e]">
                          {room.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="font-sans text-base font-semibold text-[#001d0e]">
                          ₹{room.pricePerNight}
                        </span>
                        <span className="block font-sans text-xs text-[#727972]">
                          / night
                        </span>
                      </div>
                    </div>

                    <p className="font-sans text-xs text-[#414843] line-clamp-2 mb-4 leading-relaxed">
                      {room.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="bg-[#f0eee8] px-2.5 py-1 font-label-caps text-[10px] uppercase text-[#414843]">
                        {room.specs.bed}
                      </span>
                      <span className="bg-[#f0eee8] px-2.5 py-1 font-label-caps text-[10px] uppercase text-[#414843]">
                        {room.specs.areaM2} sq.m / {room.specs.areaSqFt} sq.ft
                      </span>
                      <span className="bg-[#f0eee8] px-2.5 py-1 font-label-caps text-[10px] uppercase text-[#414843]">
                        {room.specs.aspect}
                      </span>
                      <span className="bg-[#f0eee8] px-2.5 py-1 font-label-caps text-[10px] uppercase text-[#414843]">
                        Nespresso Atelier
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between pt-3 bg-[#f6f3ed] px-3 py-2 border-t border-[#e5e2dc]">
                    <div className="flex items-center gap-1.5 text-[#416650]">
                      <span className="material-symbols-outlined text-base">
                        check_circle
                      </span>
                      <span className="font-label-caps text-[10px] uppercase font-semibold">
                        Free Cancellation Until Oct 12, 18:00
                      </span>
                    </div>
                    <span className="font-label-caps text-[10px] uppercase text-[#775a19] font-semibold">
                      Breakfast Included
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: GUEST & PAYMENT DETAILS FORM */}
            <div className="bg-[#f6f3ed] p-6 lg:p-8 border border-[#e5e2dc]">
              <div className="flex items-center gap-2 pb-3 mb-6 border-b border-[#e5e2dc]">
                <span className="material-symbols-outlined text-[#775a19] text-lg">
                  person_add
                </span>
                <span className="font-label-caps text-[11px] text-[#001d0e] uppercase tracking-widest font-semibold">
                  Step 3 · Primary Guest &amp; Bespoke Preferences
                </span>
              </div>

              <form onSubmit={handleConfirmReservation} className="space-y-6">
                {/* Guest Names Grid */}
                <div>
                  <h4 className="font-sans text-sm font-semibold text-[#001d0e] mb-3">
                    Primary Resident
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-label-caps text-[10px] uppercase text-[#727972]">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-[#ffffff] px-4 py-3 font-sans text-xs text-[#001d0e] focus:outline-none focus:border-[#775a19] border border-[#e5e2dc]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-label-caps text-[10px] uppercase text-[#727972]">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-[#ffffff] px-4 py-3 font-sans text-xs text-[#001d0e] focus:outline-none focus:border-[#775a19] border border-[#e5e2dc]"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-caps text-[10px] uppercase text-[#727972]">
                      Email Address (for Itinerary &amp; Confirmation) *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#ffffff] px-4 py-3 font-sans text-xs text-[#001d0e] focus:outline-none focus:border-[#775a19] border border-[#e5e2dc]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-caps text-[10px] uppercase text-[#727972]">
                      Direct Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#ffffff] px-4 py-3 font-sans text-xs text-[#001d0e] focus:outline-none focus:border-[#775a19] border border-[#e5e2dc]"
                    />
                  </div>
                </div>

                {/* Bespoke Sanctuary Preferences */}
                <div className="pt-2">
                  <h4 className="font-sans text-sm font-semibold text-[#001d0e] mb-1">
                    Tailored Stay Privileges
                  </h4>
                  <p className="font-sans text-xs text-[#727972] mb-3">
                    Our head concierge ensures your suite is prepared to exact specifications prior to portico arrival.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label
                      className={`flex items-start gap-3 p-3 bg-[#ffffff] cursor-pointer transition-colors border ${
                        airportTransfer ? 'border-[#775a19] bg-[#fed488]/10' : 'border-[#e5e2dc]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={airportTransfer}
                        onChange={(e) => setAirportTransfer(e.target.checked)}
                        className="mt-1 accent-[#775a19] w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <span className="font-label-caps text-[10px] uppercase text-[#001d0e] block font-semibold">
                          Private Airport Transfer
                        </span>
                        <span className="font-sans text-[11px] text-[#727972]">
                          Chauffeured Mercedes-Maybach (+₹180)
                        </span>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-3 p-3 bg-[#ffffff] cursor-pointer transition-colors border ${
                        earlyArrival ? 'border-[#775a19] bg-[#fed488]/10' : 'border-[#e5e2dc]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={earlyArrival}
                        onChange={(e) => setEarlyArrival(e.target.checked)}
                        className="mt-1 accent-[#775a19] w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <span className="font-label-caps text-[10px] uppercase text-[#001d0e] block font-semibold">
                          Guaranteed Early Arrival
                        </span>
                        <span className="font-sans text-[11px] text-[#727972]">
                          Guaranteed Chamber Ready at 10:00 (+₹180)
                        </span>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-3 p-3 bg-[#ffffff] cursor-pointer transition-colors border ${
                        featherFree ? 'border-[#775a19] bg-[#fed488]/10' : 'border-[#e5e2dc]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={featherFree}
                        onChange={(e) => setFeatherFree(e.target.checked)}
                        className="mt-1 accent-[#775a19] w-4 h-4 cursor-pointer"
                      />
                      <div>
                        <span className="font-label-caps text-[10px] uppercase text-[#001d0e] block font-semibold">
                          Feather-Free Bedding
                        </span>
                        <span className="font-sans text-[11px] text-[#727972]">
                          Hypoallergenic Organic Silk Bedding
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Dietary & Special Wishes */}
                <div className="space-y-1">
                  <label className="font-label-caps text-[10px] uppercase text-[#727972]">
                    Special Requests &amp; Dietary Requirements
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Vegetarian breakfast preference, late arrival after 20:00, or anniversary champagne on ice."
                    className="w-full bg-[#ffffff] px-4 py-3 font-sans text-xs text-[#001d0e] focus:outline-none focus:border-[#775a19] border border-[#e5e2dc]"
                  />
                </div>

                {/* Secure Vault Payment Module (Exact matching Image 5) */}
                <div className="pt-4 bg-[#ffffff] p-6 border border-[#e5e2dc] shadow-sm">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#f0eee8]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#775a19] text-lg">
                        lock
                      </span>
                      <span className="font-sans text-sm font-semibold text-[#001d0e]">
                        Encrypted Payment Guarantee
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-[#f0eee8] font-label-caps text-[9px] uppercase text-[#414843]">
                        Visa
                      </span>
                      <span className="px-2 py-0.5 bg-[#f0eee8] font-label-caps text-[9px] uppercase text-[#414843]">
                        MasterCard
                      </span>
                      <span className="px-2 py-0.5 bg-[#f0eee8] font-label-caps text-[9px] uppercase text-[#414843]">
                        Amex Centurion
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="font-label-caps text-[10px] uppercase text-[#727972]">
                        Cardholder Name (as on card)
                      </label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        className="w-full bg-[#f6f3ed] px-4 py-3 font-sans text-xs text-[#001d0e] focus:outline-none focus:border-[#775a19] border border-[#e5e2dc]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-label-caps text-[10px] uppercase text-[#727972]">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-[#f6f3ed] px-4 py-3 font-mono text-xs text-[#001d0e] focus:outline-none focus:border-[#775a19] tracking-wider border border-[#e5e2dc]"
                        />
                        <span className="absolute right-4 top-3 text-[#775a19] material-symbols-outlined text-lg">
                          credit_card
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-label-caps text-[10px] uppercase text-[#727972]">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-[#f6f3ed] px-4 py-3 font-mono text-xs text-[#001d0e] focus:outline-none focus:border-[#775a19] border border-[#e5e2dc]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-label-caps text-[10px] uppercase text-[#727972]">
                          CVV / Security Code
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full bg-[#f6f3ed] px-4 py-3 font-mono text-xs text-[#001d0e] focus:outline-none focus:border-[#775a19] border border-[#e5e2dc]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-[#f0eee8] flex items-start gap-3 border border-[#e5e2dc]">
                    <span className="material-symbols-outlined text-[#775a19] text-lg mt-0.5">
                      verified_user
                    </span>
                    <p className="font-sans text-[11px] text-[#414843] leading-relaxed">
                      Your payment method will be authorized for holding purposes. Zero charge will clear until check-in. Non-refundable only within 48 hours of scheduled arrival.
                    </p>
                  </div>
                </div>

                {/* Confirmation Action Ribbon */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#e5e2dc]">
                  <div className="flex items-center gap-2 text-[#727972] font-sans text-xs">
                    <span className="material-symbols-outlined text-base text-[#416650]">
                      lock
                    </span>
                    <span>Protected by 256-bit TLS Cryptographic Protocol</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#775a19] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#fed488] hover:text-[#785a1a] transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : null}
                    <span>{isSubmitting ? 'ENCRYPTING & RECORDING...' : 'CONFIRM RESERVATION'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: STEP 4 Summary & Receipt Ledger (4 cols) */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-[#f6f3ed] p-6 shadow-sm border border-[#e5e2dc]">
              <div className="flex items-baseline justify-between pb-3 mb-3 border-b border-[#e5e2dc]">
                <span className="font-label-caps text-[11px] uppercase text-[#775a19] tracking-widest font-semibold">
                  Step 04 · Ledger
                </span>
                <span className="font-label-caps text-[10px] uppercase bg-[#001d0e] text-[#ffffff] px-2 py-0.5">
                  Ref: #FT-89240
                </span>
              </div>

              <h3 className="font-serif text-xl text-[#001d0e] mb-1">
                Reservation Statement
              </h3>
              <p className="font-sans text-xs text-[#727972] mb-4">
                Fountant Hotel &amp; Botanical Sanctuary
              </p>

              {/* Suite Micro Preview */}
              <div className="flex gap-3 bg-[#ffffff] p-2.5 mb-4 border border-[#e5e2dc]">
                <img
                  src={room.heroImage}
                  alt={room.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-cover shrink-0"
                />
                <div className="min-w-0 flex flex-col justify-center">
                  <h5 className="font-sans text-xs font-semibold text-[#001d0e] truncate">
                    {room.name}
                  </h5>
                  <span className="font-sans text-[11px] text-[#727972]">
                    {room.specs.bed} • {adults} Adults
                  </span>
                  <span className="font-label-caps text-[9px] text-[#416650] uppercase font-bold">
                    Best Rate Guaranteed
                  </span>
                </div>
              </div>

              {/* Chronology */}
              <div className="space-y-2 py-3 bg-[#ffffff] px-3 mb-4 font-sans text-xs border border-[#e5e2dc]">
                <div className="flex justify-between text-[#414843]">
                  <span>Arrival</span>
                  <span className="font-semibold text-[#001d0e]">
                    {formatDateDisplay(checkIn)}
                  </span>
                </div>
                <div className="flex justify-between text-[#414843]">
                  <span>Departure</span>
                  <span className="font-semibold text-[#001d0e]">
                    {formatDateDisplay(checkOut)}
                  </span>
                </div>
                <div className="flex justify-between text-[#414843]">
                  <span>Stay Duration</span>
                  <span className="font-semibold text-[#001d0e]">
                    {nights} Consecutive Nights
                  </span>
                </div>
              </div>

              {/* Price Ledger Breakdown */}
              <div className="space-y-2 py-2 mb-4 font-sans text-xs">
                <div className="flex justify-between text-[#414843]">
                  <span>
                    Nightly Rate (₹{room.pricePerNight} × {nights})
                  </span>
                  <span className="text-[#001d0e] font-semibold">
                    ₹{nightlySubtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-[#414843]">
                  <span>Bespoke Concierge &amp; Butler</span>
                  <span className="text-[#416650] font-label-caps text-[10px] uppercase font-bold">
                    COMPLIMENTARY
                  </span>
                </div>

                <div className="flex justify-between text-[#414843]">
                  <span>Courtyard Breakfast ({nights} Days × {adults})</span>
                  <span className="text-[#416650] font-label-caps text-[10px] uppercase font-bold">
                    INCLUDED
                  </span>
                </div>

                <div className="flex justify-between text-[#414843]">
                  <span>Luxury Tourism Tax (8%)</span>
                  <span className="text-[#001d0e] font-semibold">
                    ₹{luxuryTax.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-[#414843]">
                  <span>Sanctuary Restoration Levy (4%)</span>
                  <span className="text-[#001d0e] font-semibold">
                    ₹{sanctuaryLevy.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Total Calculation (Exact from Image 5) */}
              <div className="bg-[#001d0e] p-4 text-[#ffffff]">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="font-label-caps text-[10px] uppercase text-[#ffdea5] block">
                      Total Payable
                    </span>
                    <span className="font-sans text-[11px] text-[#769d83]">
                      All government dues inclusive
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-2xl font-semibold text-[#ffffff] tracking-tight">
                      ₹{grandTotal.toLocaleString()}.00
                    </span>
                  </div>
                </div>
              </div>

              {/* Guarantee micro-points */}
              <div className="mt-4 space-y-2 pt-2 border-t border-[#e5e2dc]">
                <div className="flex items-center gap-2 text-[#414843] font-sans text-xs">
                  <span className="material-symbols-outlined text-base text-[#775a19]">
                    verified
                  </span>
                  <span>Direct Booking Rate Promise</span>
                </div>
                <div className="flex items-center gap-2 text-[#414843] font-sans text-xs">
                  <span className="material-symbols-outlined text-base text-[#775a19]">
                    security
                  </span>
                  <span>256-Bit Financial Encryption</span>
                </div>
                <div className="flex items-center gap-2 text-[#414843] font-sans text-xs">
                  <span className="material-symbols-outlined text-base text-[#775a19]">
                    support_agent
                  </span>
                  <span>24/7 Dedicated Palace Concierge</span>
                </div>
              </div>

              {/* Help Desk Link */}
              <div className="mt-4 pt-3 bg-[#ffffff] p-3 text-center border border-[#e5e2dc]">
                <span className="font-sans text-[11px] text-[#414843] block">
                  Require personalized arrangements?
                </span>
                <a
                  href="tel:+18008433686"
                  className="block font-label-caps text-[11px] uppercase text-[#775a19] hover:text-[#001d0e] mt-1 font-semibold"
                >
                  Call Head Butler Desk (+1 800 843 3686)
                </a>
              </div>
            </div>

            {/* Ambient Reviewer Testimony */}
            <div className="bg-[#f0eee8] p-5 border border-[#e5e2dc]">
              <div className="flex text-[#775a19] mb-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="font-serif italic text-sm text-[#001d0e] leading-relaxed mb-2">
                “An extraordinary haven of architectural serenity. The courtyard suite experience remains unmatched in hospitality.”
              </p>
              <span className="font-label-caps text-[10px] uppercase text-[#727972] tracking-wider block">
                — The Architectural Traveler, 2024
              </span>
            </div>
          </aside>
        </div>
      </section>

      {/* Confirmation Dialog / Step 4 Result View Overlay (Exact matching Image 5) */}
      {confirmedReservation && (
        <div className="fixed inset-0 z-50 bg-[#001d0e]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fcf9f3] max-w-lg w-full p-8 lg:p-10 border border-[#e5e2dc] shadow-2xl relative">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#c3ecd0]/40 flex items-center justify-center rounded-full text-[#001d0e]">
                <span className="material-symbols-outlined text-3xl">check</span>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="font-label-caps text-xs uppercase tracking-widest text-[#775a19] font-semibold">
                  Reservation Confirmed
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold flex items-center gap-1 ${
                    saveSource === 'supabase'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  <Database className="w-2.5 h-2.5" />
                  {saveSource === 'supabase' ? 'Supabase Cloud Sync' : 'Local Sanctuary Ledger'}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#001d0e]">
                Welcome to Fountant Sanctuary
              </h3>

              <p className="font-sans text-xs text-[#414843] leading-relaxed">
                Booking voucher{' '}
                <strong className="text-[#001d0e] font-mono">
                  #{confirmedReservation.refCode}
                </strong>{' '}
                has been safely issued to{' '}
                <span className="text-[#001d0e] font-semibold">
                  {confirmedReservation.email}
                </span>
                . Your personal butler has noted your arrival schedule at East Gate Portico.
              </p>

              <div className="bg-[#f6f3ed] p-4 text-left space-y-2 font-sans text-xs border border-[#e5e2dc]">
                <div className="flex justify-between">
                  <span className="text-[#727972]">Suite:</span>
                  <span className="font-semibold text-[#001d0e]">
                    {confirmedReservation.roomName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#727972]">Dates:</span>
                  <span className="font-semibold text-[#001d0e]">
                    {formatDateDisplay(confirmedReservation.checkIn)} –{' '}
                    {formatDateDisplay(confirmedReservation.checkOut)} ({confirmedReservation.nights} Nights)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#727972]">Primary Resident:</span>
                  <span className="font-semibold text-[#001d0e]">
                    {confirmedReservation.firstName} {confirmedReservation.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#727972]">Amount Settled:</span>
                  <span className="font-semibold text-[#775a19]">
                    ₹{confirmedReservation.total.toLocaleString()}.00 INR
                  </span>
                </div>
              </div>

              <div className="pt-3 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                  }}
                  className="w-full py-3 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#1b1714] transition-colors cursor-pointer"
                >
                  PRINT SANCTUARY DOSSIER
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmedReservation(null);
                    onNavigate('guest-account');
                  }}
                  className="w-full py-2.5 bg-[#f0eee8] font-label-caps text-xs uppercase text-[#414843] hover:text-[#001d0e] hover:bg-[#e5e2dc] transition-colors cursor-pointer"
                >
                  VIEW IN RESIDENT PORTAL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
