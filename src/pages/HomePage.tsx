import React, { useState } from 'react';
import { PageId } from '../components/Header';
import { ROOMS_DATA } from '../data/hotelData';
import { FountantLogo } from '../components/FountantLogo';

interface HomePageProps {
  onNavigate: (page: PageId, roomId?: string) => void;
  onOpenInquiry: (topic?: string, roomName?: string) => void;
  onSelectRoomForBooking: (roomId: string, checkIn?: string, checkOut?: string, guests?: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenInquiry,
  onSelectRoomForBooking
}) => {
  const [checkIn, setCheckIn] = useState('2024-10-14');
  const [checkOut, setCheckOut] = useState('2024-10-17');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [guests, setGuests] = useState('2');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const targetRoomId = selectedCategory === 'all' ? 'deluxe-room' : `${selectedCategory}-room`;
    const found = ROOMS_DATA.find((r) => r.category === selectedCategory) || ROOMS_DATA[0];
    onSelectRoomForBooking(found.id, checkIn, checkOut, parseInt(guests, 10));
  };

  return (
    <div className="w-full flex flex-col bg-[#fcf9f3]">
      {/* Immersive Editorial Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-[#0d3320] text-[#ffffff] overflow-hidden pt-24 pb-20">
        {/* Subtle Architectural Grid and Arc Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1440 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-100 250 C300 120, 650 420, 1150 180 C1350 90, 1550 300, 1680 240"
              stroke="#c3ecd0"
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />
            <path
              d="M-50 480 C400 360, 850 600, 1350 380 C1500 310, 1600 460, 1700 400"
              stroke="#e9c176"
              strokeWidth="1"
            />
            <circle
              cx="720"
              cy="360"
              r="280"
              stroke="#c3ecd0"
              strokeWidth="1"
              strokeDasharray="2 6"
              className="opacity-40"
            />
            <circle
              cx="720"
              cy="360"
              r="400"
              stroke="#e9c176"
              strokeWidth="1"
              className="opacity-20"
            />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative w-full px-5 lg:px-16 max-w-5xl mx-auto flex flex-col items-center text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ffffff]/10 backdrop-blur-md rounded-none mb-6 border border-[#c3ecd0]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fed488]"></span>
            <span className="font-label-caps text-[11px] text-[#ffdea5] uppercase tracking-[0.2em]">
              Architectural Sanctuary · Seaside Enclave
            </span>
          </div>

          <FountantLogo variant="full" theme="light" className="mb-4" />

          <h1 className="font-display-hero text-4xl sm:text-6xl lg:text-7xl text-[#ffffff] tracking-tight max-w-4xl mb-4 font-normal">
            Where Botanical Living Meets Architectural Poise
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-[#c3ecd0] max-w-2xl font-light opacity-95 mb-8">
            “Thoughtfully designed spaces for extraordinary stays.”
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[#769d83] font-label-caps text-[11px] uppercase tracking-wider mb-12">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffdea5] text-base">
                nest_eco_leaf
              </span>
              Botanical Living
            </span>
            <span className="w-1 h-1 rounded-full bg-[#727972]"></span>
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffdea5] text-base">
                bed
              </span>
              Custom Italian Linens
            </span>
            <span className="w-1 h-1 rounded-full bg-[#727972]"></span>
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffdea5] text-base">
                concierge
              </span>
              24h Enclave Valet
            </span>
          </div>

          {/* Luxury Horizontal Booking Ribbon */}
          <div className="w-full max-w-4xl bg-[#fcf9f3] text-[#1c1c18] shadow-2xl p-4 sm:p-6 border border-[#e5e2dc]">
            <form
              onSubmit={handleQuickSearch}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end text-left"
            >
              <div>
                <label className="block font-label-caps text-[10px] text-[#775a19] uppercase tracking-wider mb-1">
                  Arrival Date
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-[#f0eee8] px-3 py-2.5 font-sans text-xs text-[#001d0e] border border-transparent focus:border-[#775a19] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-label-caps text-[10px] text-[#775a19] uppercase tracking-wider mb-1">
                  Departure Date
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-[#f0eee8] px-3 py-2.5 font-sans text-xs text-[#001d0e] border border-transparent focus:border-[#775a19] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-label-caps text-[10px] text-[#775a19] uppercase tracking-wider mb-1">
                  Chamber Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-[#f0eee8] px-3 py-2.5 font-sans text-xs text-[#001d0e] border border-transparent focus:border-[#775a19] focus:outline-none cursor-pointer"
                >
                  <option value="all">All Chambers (5)</option>
                  <option value="deluxe">Deluxe Pavilions</option>
                  <option value="executive">Executive Tower</option>
                  <option value="suites">Luxury Salon Suites</option>
                  <option value="signature">Penthouse Enclave</option>
                </select>
              </div>

              <div>
                <label className="block font-label-caps text-[10px] text-[#775a19] uppercase tracking-wider mb-1">
                  Resident Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-[#f0eee8] px-3 py-2.5 font-sans text-xs text-[#001d0e] border border-transparent focus:border-[#775a19] focus:outline-none cursor-pointer"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="6">Up to 6 Guests</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#775a19] text-[#ffffff] font-label-caps text-[11px] uppercase tracking-widest hover:bg-[#001d0e] transition-colors cursor-pointer shadow-sm text-center"
                >
                  Check Availability
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Narrative Section: The Philosophy of Botanical Silence */}
      <section className="w-full py-20 px-5 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-[#775a19]"></span>
              <span className="font-label-caps text-[11px] text-[#775a19] uppercase tracking-widest">
                Heritage & Architecture
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#001d0e] tracking-tight leading-tight">
              A Living Sanctuary Conceived for Quiet Minds
            </h2>
            <p className="font-sans text-base text-[#414843] leading-relaxed">
              Rising on 144 Royal Palm Boulevard, FOUNTANT HOTEL bridges European classical proportions with the restorative tranquility of Mediterranean subtropical flora. Honed Italian limestone floors, hand-knotted New Zealand wool rugs, and natural slaked-lime plaster walls capture the soft passage of morning light.
            </p>
            <p className="font-sans text-sm text-[#414843] leading-relaxed">
              Every chamber is acoustically calibrated below 24 decibels, creating an intimate haven untouched by the noise of the outside world.
            </p>
            <div className="pt-2 flex items-center gap-6">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#1b1714] transition-colors cursor-pointer"
              >
                Discover Our Heritage
              </button>
              <button
                onClick={() => onNavigate('rooms-and-suites')}
                className="text-[#775a19] font-label-caps text-xs uppercase tracking-widest hover:text-[#001d0e] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>View All Chambers</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-[#f0eee8] overflow-hidden group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlW9YlAOZza9EXnrvsL76okQsSh-8gmGE-TBE2UXprVO2Mv-c3nZu-z5jHocrN0mG5yLQOMv6Ys9lp3wYzcW_LL0dHDdiMZ-6P27RV3m7dV2ZOvw_sTDB6aleDfGzuXsm0fgzAjTJ0dscqFA97pz16VVoU673SHfyXWH-4fBAqQYmyz2NdTt0sYhlJGMPqoJ6ojhhP41e41Qt52SUxMIA5AeqHnmZQYiQmGpGBmvCif27RMqpJp3KI"
                  alt="Deluxe Botanical Sanctuary Room"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="bg-[#f6f3ed] p-5">
                <span className="font-label-caps text-[10px] text-[#775a19] uppercase tracking-wider block mb-1">
                  Chamber 01
                </span>
                <h4 className="font-serif text-lg text-[#001d0e]">Deluxe Garden View</h4>
                <p className="font-sans text-xs text-[#414843] mt-1">
                  Unvarnished white oak and floor-to-ceiling casement windows overlooking cypress gardens.
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:pt-8">
              <div className="aspect-[4/5] bg-[#f0eee8] overflow-hidden group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVWDnHGpcmAZdQRsivVGC_moggY8ydWzaQFhRwuw-09vIVk0tfs2hFlOWWkW5HO8V7_5kzHZtJfPqEkQhTlwcxKHGT_aWk2NAVa8eyFJknOINXZaw8bXeaCP44MwwGku_-dTXfYhkUYZ7-FLFlnV0-CEs1fWlH8vbe70_wq7Egs88x5jlg40Kvx1IM1vxCmdmhRQxgPTLGVmY22csLQVaCO4RZ39dsjcXVim6T4lxlm47japq_j_cF"
                  alt="Courtyard Fountain Balcony"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="bg-[#f6f3ed] p-5">
                <span className="font-label-caps text-[10px] text-[#775a19] uppercase tracking-wider block mb-1">
                  Chamber 02
                </span>
                <h4 className="font-serif text-lg text-[#001d0e]">Courtyard Fountain Balcony</h4>
                <p className="font-sans text-xs text-[#414843] mt-1">
                  Private wrought iron loggia above FOUNTANT's historic tier fountain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Suites Showcase Ribbon */}
      <section className="w-full bg-[#f0eee8] py-20 px-5 lg:px-16 border-y border-[#e5e2dc]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-label-caps text-[11px] text-[#775a19] uppercase tracking-widest block mb-2">
                Accommodations Portfolio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#001d0e] tracking-tight">
                Curated Sanctuary Chambers
              </h2>
            </div>
            <button
              onClick={() => onNavigate('rooms-and-suites')}
              className="inline-flex items-center gap-2 font-label-caps text-xs uppercase tracking-widest text-[#775a19] hover:text-[#001d0e] transition-colors cursor-pointer"
            >
              <span>Explore All 5 Accommodations</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROOMS_DATA.slice(0, 3).map((room) => (
              <div
                key={room.id}
                className="bg-[#ffffff] flex flex-col justify-between group overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#f0eee8]">
                    <img
                      src={room.heroImage}
                      alt={room.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#001d0e] text-[#ffffff] font-label-caps text-[10px] uppercase px-2.5 py-1 tracking-widest">
                      {room.tag}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#ffffff]/90 px-2.5 py-1 font-sans text-xs font-semibold text-[#001d0e]">
                      ₹{room.pricePerNight} <span className="font-normal text-[11px] text-[#727972]">/ night</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 font-label-caps text-[10px] text-[#775a19] uppercase">
                      <span>{room.specs.areaM2} m²</span>
                      <span>·</span>
                      <span>{room.specs.bed}</span>
                      <span>·</span>
                      <span>Max {room.specs.maxGuests} Guests</span>
                    </div>

                    <h3 className="font-serif text-xl text-[#001d0e] group-hover:text-[#775a19] transition-colors">
                      {room.name}
                    </h3>

                    <p className="font-sans text-xs leading-relaxed text-[#414843] line-clamp-2">
                      {room.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#f0eee8] flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('room-detail', room.id)}
                    className="font-label-caps text-[11px] uppercase tracking-wider text-[#001d0e] hover:text-[#775a19] transition-colors cursor-pointer"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => onSelectRoomForBooking(room.id)}
                    className="px-4 py-2 bg-[#775a19] text-[#ffffff] font-label-caps text-[10px] uppercase tracking-widest hover:bg-[#001d0e] transition-colors cursor-pointer"
                  >
                    Book Room
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Enclave Inclusions (Exact 4 Cards from Image 1) */}
      <section className="w-full bg-[#f6f3ed] py-20 px-5 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="font-label-caps text-[11px] uppercase text-[#775a19] tracking-widest block mb-2">
              Hospitality Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#001d0e] tracking-tight">
              The Enclave Inclusions
            </h2>
            <p className="font-sans text-sm text-[#414843] mt-3">
              Every stay at FOUNTANT HOTEL is curated with meticulous attention to silence, tactile comfort, and bespoke sensory delights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#ffffff] p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#fed488]/40 flex items-center justify-center text-[#775a19] mb-6">
                  <span className="material-symbols-outlined text-2xl">spa</span>
                </div>
                <h3 className="font-sans text-lg font-semibold text-[#001d0e] mb-2">
                  Thermal Spa Access
                </h3>
                <p className="font-sans text-xs text-[#414843] leading-relaxed">
                  Complimentary hydrotherapy pools, cedar saunas, and botanical relaxation gardens for all resident guests.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f0eee8] text-[#775a19] font-label-caps text-[10px] uppercase tracking-wider">
                All Accommodations
              </div>
            </div>

            <div className="bg-[#ffffff] p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#c3ecd0]/40 flex items-center justify-center text-[#001d0e] mb-6">
                  <span className="material-symbols-outlined text-2xl">restaurant</span>
                </div>
                <h3 className="font-sans text-lg font-semibold text-[#001d0e] mb-2">
                  Bespoke Breakfast
                </h3>
                <p className="font-sans text-xs text-[#414843] leading-relaxed">
                  Farm-to-table breakfast served either à la carte at The Orangery or delivered in-suite on polished silver trays.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f0eee8] text-[#775a19] font-label-caps text-[10px] uppercase tracking-wider">
                All Accommodations
              </div>
            </div>

            <div className="bg-[#ffffff] p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#775a19] mb-6">
                  <span className="material-symbols-outlined text-2xl">local_bar</span>
                </div>
                <h3 className="font-sans text-lg font-semibold text-[#001d0e] mb-2">
                  Botanical Evening Bar
                </h3>
                <p className="font-sans text-xs text-[#414843] leading-relaxed">
                  Curated aperitivo and rare herbal infusions presented nightly in the Library Salon from 17:00 to 19:00.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f0eee8] text-[#775a19] font-label-caps text-[10px] uppercase tracking-wider">
                Executive & Suites
              </div>
            </div>

            <div className="bg-[#ffffff] p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-12 h-12 rounded-full bg-[#fed488]/40 flex items-center justify-center text-[#775a19] mb-6">
                  <span className="material-symbols-outlined text-2xl">directions_car</span>
                </div>
                <h3 className="font-sans text-lg font-semibold text-[#001d0e] mb-2">
                  Private Port Chauffeur
                </h3>
                <p className="font-sans text-xs text-[#414843] leading-relaxed">
                  Seamless private vehicle transfers between regional airport or private port docks in our hybrid fleet.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#f0eee8] text-[#775a19] font-label-caps text-[10px] uppercase tracking-wider">
                Luxury & Presidential
              </div>
            </div>
          </div>

          {/* Bespoke Inquiries Banner */}
          <div className="mt-12 bg-[#001d0e] text-[#ffffff] p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="max-w-xl">
              <span className="font-label-caps text-[11px] uppercase text-[#ffdea5] tracking-widest block mb-2">
                Personal Curation
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#ffffff] mb-2">
                Require Interconnecting Chambers or Custom Stays?
              </h3>
              <p className="font-sans text-sm text-[#769d83] leading-relaxed">
                Our Head Concierge orchestrates floor buyouts, multi-generational wing reservations, and extended artist residencies.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onOpenInquiry('Custom Stay Curation')}
                className="px-6 py-3.5 bg-[#775a19] text-[#ffffff] hover:bg-[#fed488] hover:text-[#785a1a] font-label-caps text-xs uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap shadow-sm"
              >
                Contact Head Concierge
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gastronomic & Wellness Teaser */}
      <section className="w-full py-20 px-5 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Card 1: Dining */}
          <div className="bg-[#f0eee8] p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#e5e2dc]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAICZ_GbXtFo_uvzhERRUiZGRdsrjbbcf_0N7oWBiNmxZaIkzmyke7HqEL6ZwSc9cwNONlNGcrNHMIN5kfxD2MXwf3MiJ_HOneG2l6wZtdvI3Jqd9kEiFyIYoszdLxzSi5U-shGq7q6e0RINLFc1q1o2XkML05YzsAyaRkzEVE7E__Iaclf-gHY-UwyT13ycNX2XmcZXf4BHa4adHjOsCIDbJwwdMmzHB5fpLke6X2MqwpO--v1BpVw"
                  alt="The Orangery Dining Conservatory"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-label-caps text-[11px] text-[#775a19] uppercase tracking-widest block">
                The Culinary Sanctuary
              </span>
              <h3 className="font-serif text-2xl text-[#001d0e]">
                The Orangery & Evening Botanical Bar
              </h3>
              <p className="font-sans text-xs text-[#414843] leading-relaxed">
                Experience farm-to-table breakfast and seasonal dinner courses beneath vaulted glass conservatory ceilings, complemented by single-cask spirits and rare amari in the library salon.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('dining')}
                className="px-6 py-3 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#1b1714] transition-colors cursor-pointer"
              >
                Explore Dining & Reserve Table
              </button>
            </div>
          </div>

          {/* Card 2: Experiences */}
          <div className="bg-[#f0eee8] p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#e5e2dc]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFyIalMhuVJqj5c_JQ16Bo6SCqFM3pfwPIsJTxYjEr60pS0xZAb0VgSz5lyPNZzJ2wXvIUuxzMiirp_yWE9dxlFBWG6o2iDTtvkSmkqCWEnUWPABXBfbFn0kv8a7TBKLIX54TdPZU9muuE9TIPwbbBLwRxS8v1rRwWPa4MK05U7ciY0xfyYXETUT2rF8RjkX8mM4ChjPaYmjIflmHzdQQ5znZ4PhK0frpdsybPp2-vdmnySyOLvKUT"
                  alt="Thermal Hydrotherapy Spa"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-label-caps text-[11px] text-[#775a19] uppercase tracking-widest block">
                Bespoke Curations
              </span>
              <h3 className="font-serif text-2xl text-[#001d0e]">
                Thermal Hydrotherapy & Coastal Yacht Charters
              </h3>
              <p className="font-sans text-xs text-[#414843] leading-relaxed">
                From deep subterranean Roman baths and herbal salt exfoliation to sunrise yacht departures gliding past azure limestone grottos.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onNavigate('experiences')}
                className="px-6 py-3 bg-[#775a19] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#001d0e] transition-colors cursor-pointer"
              >
                Discover All Experiences
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Quote */}
      <section className="w-full bg-[#fcf9f3] py-16 border-t border-[#e5e2dc]">
        <div className="max-w-3xl mx-auto px-5 text-center space-y-4">
          <div className="flex justify-center text-[#775a19]">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            ))}
          </div>
          <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#001d0e] leading-snug">
            “An extraordinary haven of architectural serenity. The courtyard suite experience remains unmatched in hospitality.”
          </blockquote>
          <p className="font-label-caps text-xs text-[#727972] tracking-[0.2em] uppercase">
            — The Architectural Traveler, 2024
          </p>
        </div>
      </section>
    </div>
  );
};
