import React, { useState, useEffect } from 'react';
import { PageId } from '../components/Header';
import { Reservation } from '../types/hotel';
import { useAuth } from '../context/AuthContext';
import { fetchDiningReservations, DiningReservation } from '../services/diningService';
import { fetchExperienceBookings, ExperienceBooking } from '../services/experienceService';
import { lookupReservation } from '../services/reservationService';
import {
  User as UserIcon,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Utensils,
  Compass,
  Search,
  Sparkles,
  Database,
  ExternalLink,
} from 'lucide-react';

interface GuestAccountPageProps {
  reservations: Reservation[];
  onNavigate: (page: PageId, roomId?: string) => void;
  onCancelReservation: (resId: string, refCode?: string) => void;
  onOpenAuth?: (mode?: 'signin' | 'signup') => void;
}

export const GuestAccountPage: React.FC<GuestAccountPageProps> = ({
  reservations,
  onNavigate,
  onCancelReservation,
  onOpenAuth,
}) => {
  const { user, profile, updatePreferences, isConfigured } = useAuth();

  const [activeTab, setActiveTab] = useState<'rooms' | 'dining' | 'experiences' | 'lookup'>('rooms');
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(reservations[0] || null);

  // Preference Form
  const [pillowPref, setPillowPref] = useState('Dual-Density Goose Down');
  const [aromaPref, setAromaPref] = useState('Estate Cypress & Bergamot');
  const [newsPref, setNewsPref] = useState('The Financial Times');
  const [tempPref, setTempPref] = useState(20.5);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [savingPrefs, setSavingPrefs] = useState(false);

  // Additional bookings
  const [diningList, setDiningList] = useState<DiningReservation[]>([]);
  const [expList, setExpList] = useState<ExperienceBooking[]>([]);

  // Lookup state
  const [lookupRef, setLookupRef] = useState('');
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupResult, setLookupResult] = useState<Reservation | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Load preferences from profile
  useEffect(() => {
    if (profile) {
      if (profile.preferred_pillow) setPillowPref(profile.preferred_pillow);
      if (profile.preferred_aromatherapy) setAromaPref(profile.preferred_aromatherapy);
      if (profile.preferred_newspaper) setNewsPref(profile.preferred_newspaper);
      if (profile.preferred_temperature) setTempPref(profile.preferred_temperature);
    }
  }, [profile]);

  // Load dining and experiences
  useEffect(() => {
    fetchDiningReservations(user?.id).then(setDiningList);
    fetchExperienceBookings(user?.id).then(setExpList);
  }, [user]);

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPrefs(true);
    await updatePreferences({
      preferredPillow: pillowPref,
      preferredAromatherapy: aromaPref,
      preferredNewspaper: newsPref,
      preferredTemperature: Number(tempPref),
    });
    setSavingPrefs(false);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3500);
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError(null);
    setLookupResult(null);
    setIsSearching(true);

    const found = await lookupReservation(lookupRef, lookupEmail);
    setIsSearching(false);
    if (found) {
      setLookupResult(found);
    } else {
      setLookupError('No sanctuary ledger found matching this reference code and email.');
    }
  };

  const displayName = profile?.first_name
    ? `${profile.first_name} ${profile.last_name || ''}`
    : user?.email
    ? user.email.split('@')[0]
    : 'Lord Julian Sterling';

  return (
    <div className="w-full flex flex-col bg-[#fcf9f3]">
      {/* Editorial Header */}
      <section className="relative -mt-20 pt-36 pb-20 w-full bg-[#0d3320] text-[#ffffff] overflow-hidden">
        <div className="relative w-full px-5 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffffff]/10 backdrop-blur-md rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffdea5]"></span>
            <span className="font-label-caps text-[11px] text-[#ffdea5] uppercase tracking-widest">
              Resident Enclave Portal
            </span>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-6xl text-[#ffffff] tracking-tight max-w-3xl mb-4 font-normal">
            Resident Profile &amp; Dossier
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-[#c3ecd0] max-w-2xl font-normal opacity-90 mb-4">
            “Managing your sanctuary reservations and bespoke stay preferences.”
          </p>

          {!user && (
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenAuth?.('signin')}
                className="px-5 py-2 bg-[#fed488] text-[#261900] text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-[#fff0d4] transition-colors"
              >
                Sign In to Enclave Account
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth?.('signup')}
                className="px-5 py-2 bg-transparent border border-white/40 text-white text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-white/10 transition-colors"
              >
                Register Membership
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Resident Canvas */}
      <section className="w-full py-16 px-5 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Member Card & Preferences (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Resident Sovereign Card */}
            <div className="bg-[#001d0e] text-[#ffffff] p-8 shadow-xl border border-[#c5a059]/30 relative overflow-hidden">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={
                    profile?.avatar_url ||
                    'https://lh3.googleusercontent.com/aida/AEtjO1W73mYvv44lZok1oc9jaitEdFnqRZ-ecnx3bEqPMo-i_O66DyQR7CGyabALMgEF7vOR1yZUzXnP9KztJrZu94RjwLvrVw4RGy0_epfaXS2k3NDri7MpZuybrXNIzuCMQfwKin6n8X0xYQrFEg97R_o867uHF9wZlu_b9FGZEVOONAwFBGLX7eZlyj5SfODIIJTijmLY0rzKGarGFnpNTfx_ExhlwnlW6BIx2H8mRp3wvj-bHBuyI2NRbTsVDNnZrOzmP7RxjmW3'
                  }
                  alt={displayName}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[#c5a059]"
                />
                <div>
                  <span className="font-label-caps text-[10px] text-[#ffdea5] uppercase tracking-widest block">
                    Tier: {profile?.membership_tier || 'Sovereign Resident'}
                  </span>
                  <h3 className="font-serif text-2xl text-[#ffffff]">{displayName}</h3>
                  <span className="font-sans text-xs text-[#769d83]">
                    {user?.email || 'j.sterling@sterling-holdings.co.uk'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#769d83]/20 font-sans text-xs">
                <div>
                  <span className="text-[#769d83] block">Sanctuary Nights:</span>
                  <span className="font-semibold text-[#ffffff] text-sm">
                    {reservations.reduce((acc, r) => acc + (r.nights || 0), 0) || 18} Nights
                  </span>
                </div>
                <div>
                  <span className="text-[#769d83] block">Preferred Wing:</span>
                  <span className="font-semibold text-[#ffffff] text-sm">Fountain Courtyard</span>
                </div>
              </div>

              <div className="mt-4 pt-2 flex items-center justify-between text-xs text-[#c3ecd0]">
                <div className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#fed488]" />
                  <span>
                    Backend: {isConfigured ? 'Supabase Synchronized' : 'Local Sanctuary Ledger'}
                  </span>
                </div>
                <span className="material-symbols-outlined text-sm text-[#ffdea5]">verified</span>
              </div>
            </div>

            {/* Custom Stay Preferences Form (Syncs to Supabase profiles) */}
            <div className="bg-[#ffffff] p-6 lg:p-8 border border-[#e5e2dc] shadow-sm">
              <div className="border-b border-[#e5e2dc] pb-3 mb-4">
                <span className="font-label-caps text-[10px] text-[#775a19] uppercase tracking-widest block">
                  Bespoke Calibration
                </span>
                <h4 className="font-serif text-xl text-[#001d0e]">Chamber Comfort Preferences</h4>
                <p className="text-[11px] text-[#727972] mt-0.5">
                  Persisted to your Supabase resident profile table.
                </p>
              </div>

              {savedFeedback && (
                <div className="mb-4 bg-emerald-50 border border-emerald-300 p-3 font-sans text-xs text-emerald-950 flex items-center gap-2 rounded-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Preferences saved to Supabase resident profile &amp; butler dossier.</span>
                </div>
              )}

              <form onSubmit={handleSavePreferences} className="space-y-4 font-sans text-xs">
                <div className="space-y-1">
                  <label className="font-label-caps text-[10px] text-[#727972] uppercase block">
                    Pillow &amp; Headboard Density
                  </label>
                  <select
                    value={pillowPref}
                    onChange={(e) => setPillowPref(e.target.value)}
                    className="w-full bg-[#f6f3ed] p-2.5 text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                  >
                    <option value="Dual-Density Goose Down">Dual-Density Hungarian Goose Down</option>
                    <option value="Hypoallergenic Raw Silk">Hypoallergenic Organic Raw Silk</option>
                    <option value="Memory Foam Ergonomic">Memory Foam Ergonomic Cervical</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-label-caps text-[10px] text-[#727972] uppercase block">
                    Aromatherapy Turndown
                  </label>
                  <select
                    value={aromaPref}
                    onChange={(e) => setAromaPref(e.target.value)}
                    className="w-full bg-[#f6f3ed] p-2.5 text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                  >
                    <option value="Estate Cypress & Bergamot">Estate Cypress &amp; Bergamot</option>
                    <option value="French Lavender & Chamomile">French Lavender &amp; Chamomile</option>
                    <option value="Unscented Pure Linen">Unscented Pure Linen Air</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-label-caps text-[10px] text-[#727972] uppercase block">
                    Morning Print Journal
                  </label>
                  <select
                    value={newsPref}
                    onChange={(e) => setNewsPref(e.target.value)}
                    className="w-full bg-[#f6f3ed] p-2.5 text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                  >
                    <option value="The Financial Times">The Financial Times (London Edition)</option>
                    <option value="Architectural Digest">Architectural Digest International</option>
                    <option value="Le Figaro">Le Figaro</option>
                    <option value="Digital Dispatches Only">Digital Dispatches Only (No Print)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-label-caps text-[10px] text-[#727972] uppercase block">
                    Target Radiant Temperature (°C)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="18"
                    max="26"
                    value={tempPref}
                    onChange={(e) => setTempPref(Number(e.target.value))}
                    className="w-full bg-[#f6f3ed] p-2.5 text-[#001d0e] border border-[#e5e2dc] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={savingPrefs}
                    className="w-full py-3 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#775a19] transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    {savingPrefs ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : null}
                    <span>Save Stay Preferences</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Bookings Ledger (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tab Switcher */}
            <div className="flex border-b border-[#e2dcd0] bg-[#f7f3ea]">
              <button
                type="button"
                onClick={() => setActiveTab('rooms')}
                className={`py-3 px-4 text-xs uppercase tracking-wider font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'rooms'
                    ? 'border-[#002613] text-[#002613] bg-[#fcf9f3]'
                    : 'border-transparent text-[#7a7466] hover:text-[#1c1c18]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Chamber Stays ({reservations.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('dining')}
                className={`py-3 px-4 text-xs uppercase tracking-wider font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'dining'
                    ? 'border-[#002613] text-[#002613] bg-[#fcf9f3]'
                    : 'border-transparent text-[#7a7466] hover:text-[#1c1c18]'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Dining ({diningList.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('experiences')}
                className={`py-3 px-4 text-xs uppercase tracking-wider font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'experiences'
                    ? 'border-[#002613] text-[#002613] bg-[#fcf9f3]'
                    : 'border-transparent text-[#7a7466] hover:text-[#1c1c18]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Experiences ({expList.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('lookup')}
                className={`py-3 px-4 text-xs uppercase tracking-wider font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'lookup'
                    ? 'border-[#002613] text-[#002613] bg-[#fcf9f3]'
                    : 'border-transparent text-[#7a7466] hover:text-[#1c1c18]'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Voucher Lookup</span>
              </button>
            </div>

            {/* TAB 1: CHAMBER STAYS */}
            {activeTab === 'rooms' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-[#001d0e]">
                    Your Sanctuary Bookings ({reservations.length})
                  </h3>
                  <button
                    onClick={() => onNavigate('reservation')}
                    className="px-4 py-2 bg-[#775a19] text-[#ffffff] font-label-caps text-xs uppercase tracking-wider hover:bg-[#001d0e] transition-colors cursor-pointer"
                  >
                    + Book New Stay
                  </button>
                </div>

                {reservations.length === 0 ? (
                  <div className="bg-[#ffffff] p-10 text-center border border-[#e5e2dc]">
                    <p className="font-sans text-xs text-[#727972] mb-4">
                      You currently have no active chamber reservations.
                    </p>
                    <button
                      onClick={() => onNavigate('rooms-and-suites')}
                      className="px-6 py-2.5 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase"
                    >
                      Explore Chambers
                    </button>
                  </div>
                ) : (
                  reservations.map((res) => (
                    <div
                      key={res.id}
                      className="bg-[#ffffff] p-6 border border-[#e5e2dc] shadow-sm flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center"
                    >
                      <div className="flex gap-4 items-center">
                        <img
                          src={res.roomImage}
                          alt={res.roomName}
                          referrerPolicy="no-referrer"
                          className="w-20 h-20 object-cover shrink-0 border border-[#e5e2dc]"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-bold text-[#001d0e]">
                              #{res.refCode}
                            </span>
                            <span
                              className={`px-2 py-0.5 font-label-caps text-[9px] uppercase font-bold rounded-xs ${
                                res.status === 'confirmed'
                                  ? 'bg-[#c3ecd0]/40 text-[#002111]'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {res.status}
                            </span>
                          </div>
                          <h4 className="font-serif text-lg text-[#001d0e]">{res.roomName}</h4>
                          <p className="font-sans text-xs text-[#727972]">
                            {res.checkIn} → {res.checkOut} ({res.nights} Nights · {res.adults} Adults)
                          </p>
                          <p className="font-serif text-sm font-semibold text-[#775a19] mt-1">
                            Total: ₹{res.total.toLocaleString()}.00 INR
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
                        <button
                          onClick={() => setSelectedRes(res)}
                          className="px-4 py-2 bg-[#f0eee8] text-[#001d0e] font-label-caps text-[10px] uppercase hover:bg-[#e5e2dc] transition-colors cursor-pointer text-center"
                        >
                          View Voucher
                        </button>
                        {res.status === 'confirmed' && (
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  'Are you sure you wish to cancel this reservation in Supabase?'
                                )
                              ) {
                                onCancelReservation(res.id, res.refCode);
                              }
                            }}
                            className="px-3 py-2 text-[#ba1a1a] hover:bg-[#ba1a1a]/10 font-label-caps text-[10px] uppercase transition-colors cursor-pointer text-center"
                          >
                            Cancel Stay
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 2: DINING RESERVATIONS */}
            {activeTab === 'dining' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-[#001d0e]">
                    Dining Reservations ({diningList.length})
                  </h3>
                  <button
                    onClick={() => onNavigate('dining')}
                    className="px-4 py-2 bg-[#775a19] text-[#ffffff] font-label-caps text-xs uppercase tracking-wider hover:bg-[#001d0e] transition-colors cursor-pointer"
                  >
                    + Reserve Table
                  </button>
                </div>

                {diningList.length === 0 ? (
                  <div className="bg-[#ffffff] p-10 text-center border border-[#e5e2dc]">
                    <p className="font-sans text-xs text-[#727972] mb-4">
                      No dining reservations recorded yet.
                    </p>
                    <button
                      onClick={() => onNavigate('dining')}
                      className="px-6 py-2.5 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase"
                    >
                      View Sanctuary Dining Venues
                    </button>
                  </div>
                ) : (
                  diningList.map((din) => (
                    <div
                      key={din.id}
                      className="bg-white p-5 border border-[#e5e2dc] shadow-sm flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold text-[#001d0e]">
                            #{din.ref_code}
                          </span>
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[9px] uppercase font-bold rounded-xs">
                            {din.status}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg text-[#001d0e]">{din.venue_name}</h4>
                        <p className="text-xs text-[#727972] mt-0.5">
                          {din.reservation_date} at {din.reservation_time} · {din.party_size} Guests ·{' '}
                          {din.seating_area}
                        </p>
                        {din.dietary_notes && (
                          <p className="text-[11px] text-[#8c4f00] mt-1 italic">
                            Notes: {din.dietary_notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 3: EXPERIENCES */}
            {activeTab === 'experiences' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-[#001d0e]">
                    Curated Experiences ({expList.length})
                  </h3>
                  <button
                    onClick={() => onNavigate('experiences')}
                    className="px-4 py-2 bg-[#775a19] text-[#ffffff] font-label-caps text-xs uppercase tracking-wider hover:bg-[#001d0e] transition-colors cursor-pointer"
                  >
                    + Book Experience
                  </button>
                </div>

                {expList.length === 0 ? (
                  <div className="bg-[#ffffff] p-10 text-center border border-[#e5e2dc]">
                    <p className="font-sans text-xs text-[#727972] mb-4">
                      No experience excursions booked yet.
                    </p>
                    <button
                      onClick={() => onNavigate('experiences')}
                      className="px-6 py-2.5 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase"
                    >
                      Explore Sanctuary Experiences
                    </button>
                  </div>
                ) : (
                  expList.map((exp) => (
                    <div
                      key={exp.id}
                      className="bg-white p-5 border border-[#e5e2dc] shadow-sm flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold text-[#001d0e]">
                            #{exp.ref_code}
                          </span>
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[9px] uppercase font-bold rounded-xs">
                            {exp.status}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg text-[#001d0e]">{exp.experience_title}</h4>
                        <p className="text-xs text-[#727972] mt-0.5">
                          {exp.booking_date} at {exp.time_slot} · {exp.guests_count} Guests ·{' '}
                          {exp.price_paid}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 4: VOUCHER LOOKUP */}
            {activeTab === 'lookup' && (
              <div className="bg-white p-6 md:p-8 border border-[#e5e2dc] shadow-sm space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#001d0e]">
                    Guest Voucher &amp; Ledger Lookup
                  </h3>
                  <p className="text-xs text-[#5e594d] mt-1">
                    Booked as a guest without signing in? Query your reservation directly from Supabase by entering your confirmation reference code and email.
                  </p>
                </div>

                <form onSubmit={handleLookup} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#5e594d] mb-1">
                        Reservation Ref Code
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. FT-89240"
                        value={lookupRef}
                        onChange={(e) => setLookupRef(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono bg-[#f6f3ed] border border-[#e5e2dc] focus:outline-none focus:border-[#002613]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#5e594d] mb-1">
                        Booking Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="email@example.com"
                        value={lookupEmail}
                        onChange={(e) => setLookupEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#f6f3ed] border border-[#e5e2dc] focus:outline-none focus:border-[#002613]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSearching}
                    className="px-6 py-2.5 bg-[#002613] hover:bg-[#00381d] text-white text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSearching ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Search className="w-3.5 h-3.5" />
                    )}
                    <span>Search Sanctuary Database</span>
                  </button>
                </form>

                {lookupError && (
                  <p className="text-xs text-red-700 bg-red-50 p-3 border border-red-200 rounded-sm">
                    {lookupError}
                  </p>
                )}

                {lookupResult && (
                  <div className="mt-6 p-5 bg-[#f6f3ed] border border-[#d6cfbe] rounded-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-[#002613]">
                        #{lookupResult.refCode}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xs">
                        {lookupResult.status}
                      </span>
                    </div>
                    <h4 className="font-serif text-lg text-[#002613]">{lookupResult.roomName}</h4>
                    <p className="text-xs text-[#5e594d]">
                      {lookupResult.checkIn} → {lookupResult.checkOut} ({lookupResult.nights} Nights)
                    </p>
                    <p className="text-xs font-semibold text-[#8c4f00]">
                      Settled: ₹{lookupResult.total.toLocaleString()}.00 INR
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedRes(lookupResult)}
                      className="px-4 py-1.5 bg-[#002613] text-white text-xs uppercase tracking-wider"
                    >
                      Open Full Voucher
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Voucher Modal */}
            {selectedRes && (
              <div className="fixed inset-0 z-50 bg-[#001d0e]/75 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#fcf9f3] max-w-lg w-full p-8 border border-[#e5e2dc] shadow-2xl relative">
                  <button
                    onClick={() => setSelectedRes(null)}
                    className="absolute top-4 right-4 text-[#414843] hover:text-[#001d0e] cursor-pointer"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>

                  <div className="text-center space-y-3">
                    <span className="font-label-caps text-xs text-[#775a19] uppercase tracking-widest block font-semibold">
                      Sanctuary Resident Voucher
                    </span>
                    <h3 className="font-serif text-2xl text-[#001d0e]">{selectedRes.roomName}</h3>
                    <p className="font-mono text-sm font-bold text-[#775a19]">
                      Reference Code: #{selectedRes.refCode}
                    </p>
                  </div>

                  <div className="my-6 bg-[#ffffff] p-5 space-y-2 font-sans text-xs border border-[#e5e2dc]">
                    <div className="flex justify-between">
                      <span className="text-[#727972]">Primary Resident:</span>
                      <span className="font-semibold text-[#001d0e]">
                        {selectedRes.firstName} {selectedRes.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#727972]">Email / Mobile:</span>
                      <span className="text-[#001d0e]">{selectedRes.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#727972]">Arrival Date:</span>
                      <span className="font-semibold text-[#001d0e]">
                        {selectedRes.checkIn} (15:00)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#727972]">Departure Date:</span>
                      <span className="font-semibold text-[#001d0e]">
                        {selectedRes.checkOut} (12:00)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#727972]">Duration:</span>
                      <span>
                        {selectedRes.nights} Nights · {selectedRes.adults} Guests
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#f0eee8]">
                      <span className="font-bold text-[#001d0e]">Total Settled:</span>
                      <span className="font-serif text-base font-bold text-[#775a19]">
                        ₹{selectedRes.total.toLocaleString()}.00 INR
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 py-3 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#775a19] transition-colors cursor-pointer"
                    >
                      Print Voucher
                    </button>
                    <button
                      onClick={() => setSelectedRes(null)}
                      className="px-6 py-3 bg-[#f0eee8] text-[#001d0e] font-label-caps text-xs uppercase hover:bg-[#e5e2dc] transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
