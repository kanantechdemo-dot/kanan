import React, { useState, useMemo } from 'react';
import { PageId } from '../components/Header';
import { ROOMS_DATA } from '../data/hotelData';
import { Room } from '../types/hotel';

interface RoomsPageProps {
  onNavigate: (page: PageId, roomId?: string) => void;
  onOpenInquiry: (topic?: string, roomName?: string) => void;
  onSelectRoomForBooking: (roomId: string) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({
  onNavigate,
  onOpenInquiry,
  onSelectRoomForBooking
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [capacityFilter, setCapacityFilter] = useState<string>('any');
  const [amenityFilter, setAmenityFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('recommended');

  const filteredRooms = useMemo(() => {
    return ROOMS_DATA.filter((room) => {
      // Category filter
      if (selectedCategory !== 'all' && room.category !== selectedCategory) {
        return false;
      }

      // Capacity filter
      if (capacityFilter !== 'any') {
        const requiredGuests = parseInt(capacityFilter, 10);
        if (room.specs.maxGuests < requiredGuests) {
          return false;
        }
      }

      // Amenity filter
      if (amenityFilter !== 'all') {
        const allRoomAmenities = [
          ...room.amenities,
          ...room.keyAmenities,
          room.tag
        ].join(' ').toLowerCase();

        if (amenityFilter === 'balcony' && !allRoomAmenities.includes('balcony')) {
          return false;
        }
        if (amenityFilter === 'pool' && !allRoomAmenities.includes('pool')) {
          return false;
        }
        if (amenityFilter === 'ocean' && !allRoomAmenities.includes('skyline') && !allRoomAmenities.includes('horizon') && !allRoomAmenities.includes('ocean')) {
          return false;
        }
        if (amenityFilter === 'butler' && !allRoomAmenities.includes('butler')) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'asc') {
        return a.pricePerNight - b.pricePerNight;
      }
      if (sortOption === 'desc') {
        return b.pricePerNight - a.pricePerNight;
      }
      if (sortOption === 'size') {
        return b.specs.areaM2 - a.specs.areaM2;
      }
      return 0; // Curated order
    });
  }, [selectedCategory, capacityFilter, amenityFilter, sortOption]);

  const categories = [
    { id: 'all', label: `All Suites & Rooms (${ROOMS_DATA.length})` },
    { id: 'deluxe', label: 'Deluxe' },
    { id: 'executive', label: 'Executive' },
    { id: 'suites', label: 'Suites' },
    { id: 'signature', label: 'Signature' },
  ];

  return (
    <div className="w-full flex flex-col bg-[#fcf9f3]">
      {/* Immersive Editorial Header (Bleeds behind shell navbar) */}
      <section className="relative -mt-20 pt-36 pb-20 w-full bg-[#0d3320] text-[#ffffff] overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1440 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-100 200 C300 100, 600 350, 1100 150 C1300 80, 1500 260, 1600 200"
              stroke="#c3ecd0"
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />
            <path
              d="M-50 400 C400 300, 800 520, 1300 320 C1450 260, 1550 400, 1650 350"
              stroke="#e9c176"
              strokeWidth="1"
            />
            <circle
              cx="280"
              cy="180"
              r="140"
              fill="radial-gradient(circle, rgba(195,236,208,0.08) 0%, transparent 70%)"
            />
          </svg>
        </div>

        <div className="relative w-full px-5 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffffff]/10 backdrop-blur-md rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffdea5]"></span>
            <span className="font-label-caps text-[11px] text-[#ffdea5] uppercase tracking-widest">
              Architectural Sanctuary
            </span>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-6xl lg:text-7xl text-[#ffffff] tracking-tight max-w-3xl mb-4 font-normal">
            Rooms &amp; Suites
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-[#c3ecd0] max-w-2xl font-normal opacity-90 mb-8">
            “Thoughtfully designed spaces for extraordinary stays.”
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[#769d83] font-label-caps text-[11px] uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#ffdea5] text-base">
                nest_eco_leaf
              </span>
              Botanical Living
            </span>
            <span className="w-1 h-1 rounded-full bg-[#727972]"></span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#ffdea5] text-base">
                bed
              </span>
              Custom Italian Linens
            </span>
            <span className="w-1 h-1 rounded-full bg-[#727972]"></span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#ffdea5] text-base">
                concierge
              </span>
              24h Enclave Valet
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Filter & Sorting Bar */}
      <section className="sticky top-20 z-40 w-full bg-[#ffffff]/95 backdrop-blur-md shadow-sm border-b border-[#e5e2dc]">
        <div className="w-full px-5 lg:px-16 max-w-7xl mx-auto py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              {categories.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 font-label-caps text-[11px] uppercase transition-colors rounded-none whitespace-nowrap cursor-pointer shadow-sm ${
                    selectedCategory === tab.id
                      ? 'bg-[#001d0e] text-[#ffffff]'
                      : 'bg-[#f0eee8] text-[#414843] hover:bg-[#e5e2dc]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filter Controls: Capacity, Amenity, Sorting */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Capacity Selector */}
              <div className="relative inline-flex items-center bg-[#f6f3ed] px-3 py-1.5 rounded-none border border-[#e5e2dc]">
                <span className="material-symbols-outlined text-[#727972] text-base mr-2">
                  group
                </span>
                <select
                  value={capacityFilter}
                  onChange={(e) => setCapacityFilter(e.target.value)}
                  className="bg-transparent font-sans text-xs text-[#1c1c18] focus:outline-none cursor-pointer pr-4 appearance-none"
                >
                  <option value="any">Any Capacity</option>
                  <option value="2">2+ Guests</option>
                  <option value="3">3+ Guests</option>
                  <option value="4">4+ Guests</option>
                  <option value="6">6 Guests</option>
                </select>
                <span className="material-symbols-outlined text-xs text-[#727972] pointer-events-none -ml-3">
                  expand_more
                </span>
              </div>

              {/* Amenity Dropdown */}
              <div className="relative inline-flex items-center bg-[#f6f3ed] px-3 py-1.5 rounded-none border border-[#e5e2dc]">
                <span className="material-symbols-outlined text-[#727972] text-base mr-2">
                  tune
                </span>
                <select
                  value={amenityFilter}
                  onChange={(e) => setAmenityFilter(e.target.value)}
                  className="bg-transparent font-sans text-xs text-[#1c1c18] focus:outline-none cursor-pointer pr-4 appearance-none"
                >
                  <option value="all">All Amenities</option>
                  <option value="balcony">Private Balcony</option>
                  <option value="pool">Private Pool</option>
                  <option value="ocean">Ocean / Skyline View</option>
                  <option value="butler">Personal Butler</option>
                </select>
                <span className="material-symbols-outlined text-xs text-[#727972] pointer-events-none -ml-3">
                  expand_more
                </span>
              </div>

              {/* Sorting Option */}
              <div className="relative inline-flex items-center bg-[#f6f3ed] px-3 py-1.5 rounded-none border border-[#e5e2dc]">
                <span className="material-symbols-outlined text-[#727972] text-base mr-2">
                  sort
                </span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-transparent font-sans text-xs text-[#1c1c18] focus:outline-none cursor-pointer pr-4 appearance-none"
                >
                  <option value="recommended">Curated Order</option>
                  <option value="asc">Rate: Low to High</option>
                  <option value="desc">Rate: High to Low</option>
                  <option value="size">Size (m²)</option>
                </select>
                <span className="material-symbols-outlined text-xs text-[#727972] pointer-events-none -ml-3">
                  expand_more
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room Showcase List Section */}
      <section className="w-full px-5 lg:px-16 max-w-7xl mx-auto py-16">
        {filteredRooms.length === 0 ? (
          <div className="bg-[#ffffff] p-12 text-center space-y-4 border border-[#e5e2dc]">
            <span className="material-symbols-outlined text-4xl text-[#775a19]">
              travel_explore
            </span>
            <h3 className="font-serif text-2xl text-[#001d0e]">
              No Chambers Found Matching Filter Criteria
            </h3>
            <p className="font-sans text-xs text-[#414843] max-w-md mx-auto">
              Please adjust capacity or amenity selections to view other available sanctuary suites.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setCapacityFilter('any');
                setAmenityFilter('all');
              }}
              className="px-6 py-2.5 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {filteredRooms.map((room) => {
              const galleryCount =
                room.id === 'deluxe-room'
                  ? 5
                  : room.id === 'premium-room'
                  ? 6
                  : room.id === 'executive-panorama'
                  ? 8
                  : room.id === 'luxury-salon-suite'
                  ? 10
                  : 14;

              const bookButtonText =
                room.category === 'signature'
                  ? 'Reserve Suite'
                  : room.category === 'suites'
                  ? 'Book Suite'
                  : 'Book Room';

              return (
                <article
                  key={room.id}
                  className="room-card group flex flex-col lg:flex-row bg-[#ffffff] rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#e5e2dc]"
                >
                  {/* Left: Image Container */}
                  <div className="lg:w-1/2 relative min-h-[340px] overflow-hidden bg-[#f0eee8]">
                    <img
                      src={room.heroImage}
                      alt={room.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div
                      className={`absolute top-4 left-4 font-label-caps text-[11px] uppercase px-3 py-1.5 tracking-widest shadow-sm font-semibold ${
                        room.category === 'signature'
                          ? 'bg-[#ffdea5] text-[#261900]'
                          : room.category === 'executive'
                          ? 'bg-[#1b1714] text-[#ffffff]'
                          : room.id === 'premium-room'
                          ? 'bg-[#775a19] text-[#ffffff]'
                          : 'bg-[#001d0e] text-[#ffffff]'
                      }`}
                    >
                      {room.tag}
                    </div>

                    <button
                      onClick={() => onNavigate('room-detail', room.id)}
                      className="absolute bottom-4 right-4 bg-[#ffffff]/85 backdrop-blur-md px-3 py-1 rounded-none flex items-center gap-1.5 font-label-caps text-[11px] text-[#001d0e] cursor-pointer hover:bg-[#ffffff]"
                    >
                      <span className="material-symbols-outlined text-sm text-[#775a19]">
                        photo_camera
                      </span>
                      <span>{galleryCount} Galleries</span>
                    </button>
                  </div>

                  {/* Right: Content Container */}
                  <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-label-caps text-[11px] uppercase text-[#775a19] tracking-widest">
                          Accommodations · {room.pavilion}
                        </span>
                        <span className="font-sans text-xs text-[#727972]">
                          Ref. {room.refCode}
                        </span>
                      </div>

                      <h2 className="font-serif text-2xl lg:text-3xl text-[#001d0e] mb-3">
                        {room.name}
                      </h2>

                      <p className="font-sans text-sm text-[#414843] line-clamp-2 mb-6 leading-relaxed">
                        {room.shortDescription}
                      </p>

                      {/* Specification Badges Ribbon */}
                      <div className="grid grid-cols-3 gap-2 py-4 mb-6 bg-[#f6f3ed] px-4 rounded-none border border-[#e5e2dc]">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#775a19] text-base">
                            square_foot
                          </span>
                          <div>
                            <div className="font-label-caps text-[10px] text-[#727972] uppercase">
                              Area
                            </div>
                            <div className="font-sans text-sm font-semibold text-[#1c1c18]">
                              {room.specs.areaM2} m²
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#775a19] text-base">
                            bed
                          </span>
                          <div>
                            <div className="font-label-caps text-[10px] text-[#727972] uppercase">
                              {room.category === 'signature' ? 'Configuration' : 'Bed'}
                            </div>
                            <div className="font-sans text-sm font-semibold text-[#1c1c18] truncate">
                              {room.specs.bed}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#775a19] text-base">
                            person
                          </span>
                          <div>
                            <div className="font-label-caps text-[10px] text-[#727972] uppercase">
                              Guests
                            </div>
                            <div className="font-sans text-sm font-semibold text-[#1c1c18]">
                              Up to {room.specs.maxGuests}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Curated Amenities Pills */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {room.amenities.slice(0, 4).map((amenity, idx) => (
                          <span
                            key={idx}
                            className={`px-2.5 py-1 font-label-caps text-[10px] uppercase ${
                              idx === 0 && room.id === 'premium-room'
                                ? 'bg-[#ffdea5]/50 text-[#5d4201] font-semibold'
                                : idx === 1 && room.category === 'signature'
                                ? 'bg-[#001d0e] text-[#ffffff]'
                                : 'bg-[#f0eee8] text-[#414843]'
                            }`}
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="pt-6 border-t border-[#f0eee8] flex items-end justify-between">
                      <div>
                        <span className="font-label-caps text-[10px] uppercase text-[#727972] tracking-wider block">
                          Seasonal Rate
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-serif text-2xl lg:text-3xl text-[#001d0e] font-semibold">
                            ₹{room.pricePerNight.toLocaleString()}
                          </span>
                          <span className="font-sans text-xs text-[#414843]">
                            / night
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onNavigate('room-detail', room.id)}
                          className="px-4 py-3 text-[#001d0e] hover:text-[#775a19] font-label-caps text-[11px] uppercase transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => onSelectRoomForBooking(room.id)}
                          className={`px-6 py-3 font-label-caps text-[11px] uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer ${
                            room.category === 'signature'
                              ? 'bg-[#775a19] text-[#ffffff] hover:bg-[#fed488] hover:text-[#785a1a]'
                              : room.category === 'suites'
                              ? 'bg-[#775a19] text-[#ffffff] hover:bg-[#001d0e]'
                              : room.id === 'premium-room'
                              ? 'bg-[#775a19] text-[#ffffff] hover:bg-[#fed488] hover:text-[#785a1a]'
                              : 'bg-[#001d0e] text-[#ffffff] hover:bg-[#1b1714]'
                          }`}
                        >
                          {bookButtonText}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Suite Privileges Comparison & Highlights Module (Exact from Image 1) */}
      <section className="w-full bg-[#f6f3ed] py-20 border-t border-[#e5e2dc]">
        <div className="w-full px-5 lg:px-16 max-w-7xl mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
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
              <div className="mt-6 pt-4 border-t border-[#f0eee8] text-[#775a19] font-label-caps text-[10px] uppercase">
                All Accommodations
              </div>
            </div>

            {/* Card 2 */}
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
              <div className="mt-6 pt-4 border-t border-[#f0eee8] text-[#775a19] font-label-caps text-[10px] uppercase">
                All Accommodations
              </div>
            </div>

            {/* Card 3 */}
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
              <div className="mt-6 pt-4 border-t border-[#f0eee8] text-[#775a19] font-label-caps text-[10px] uppercase">
                Executive & Suites
              </div>
            </div>

            {/* Card 4 */}
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
              <div className="mt-6 pt-4 border-t border-[#f0eee8] text-[#775a19] font-label-caps text-[10px] uppercase">
                Luxury & Presidential
              </div>
            </div>
          </div>

          {/* Bespoke Inquiries Banner (Exact from Image 1) */}
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
                onClick={() => onOpenInquiry('Interconnecting Chambers')}
                className="px-6 py-3.5 bg-[#775a19] text-[#ffffff] hover:bg-[#fed488] hover:text-[#785a1a] font-label-caps text-xs uppercase tracking-widest transition-all cursor-pointer shadow-sm whitespace-nowrap"
              >
                Contact Head Concierge
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
