import React, { useState, useMemo } from 'react';
import { PageId } from '../components/Header';
import { ROOMS_DATA } from '../data/hotelData';
import { Room } from '../types/hotel';

interface RoomDetailPageProps {
  roomId?: string;
  onNavigate: (page: PageId, roomId?: string) => void;
  onOpenInquiry: (topic?: string, roomName?: string) => void;
  onSelectRoomForBooking: (
    roomId: string,
    checkIn?: string,
    checkOut?: string,
    guests?: number
  ) => void;
}

export const RoomDetailPage: React.FC<RoomDetailPageProps> = ({
  roomId = 'deluxe-room',
  onNavigate,
  onOpenInquiry,
  onSelectRoomForBooking
}) => {
  const room: Room = useMemo(() => {
    return ROOMS_DATA.find((r) => r.id === roomId) || ROOMS_DATA[0];
  }, [roomId]);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Booking widget state
  const [checkIn, setCheckIn] = useState('2024-10-18');
  const [checkOut, setCheckOut] = useState('2024-10-21');
  const [guests, setGuests] = useState(2);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>('policy-arrival');
  const [copiedLink, setCopiedLink] = useState(false);

  // Calculate nights and breakdown
  const nights = useMemo(() => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 1;
  }, [checkIn, checkOut]);

  const subtotal = room.pricePerNight * nights;
  const serviceFee = Math.round(subtotal * 0.1);
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + serviceFee + taxes;

  const currentGalleryItem = room.galleryImages[activeImageIndex] || room.galleryImages[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleBookNow = () => {
    onSelectRoomForBooking(room.id, checkIn, checkOut, guests);
  };

  // Other rooms for complementary section
  const complementaryRooms = useMemo(() => {
    return ROOMS_DATA.filter((r) => r.id !== room.id).slice(0, 2);
  }, [room.id]);

  return (
    <div className="w-full flex flex-col bg-[#fcf9f3]">
      {/* Toast Notification */}
      {copiedLink && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#001d0e] text-[#ffffff] px-4 py-3 shadow-2xl flex items-center gap-2 border border-[#c5a059] animate-bounce">
          <span className="material-symbols-outlined text-[#fed488] text-sm">
            link
          </span>
          <span className="font-sans text-xs">
            Chamber link copied to clipboard.
          </span>
        </div>
      )}

      {/* Breadcrumb & Immediate Confirmation Bar */}
      <section className="w-full px-5 lg:px-16 max-w-7xl mx-auto pt-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('rooms-and-suites')}
              className="font-label-caps text-[11px] uppercase text-[#775a19] tracking-widest hover:text-[#001d0e] transition-colors cursor-pointer"
            >
              Sanctuary Chambers
            </button>
            <span className="text-[#775a19]/50 font-label-caps text-[11px]">/</span>
            <span className="font-label-caps text-[11px] uppercase text-[#414843] tracking-widest">
              {room.name} Residence
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f0eee8] font-label-caps text-[11px] text-[#775a19] uppercase tracking-widest rounded-none border border-[#e5e2dc]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#775a19]"></span>
              Immediate Confirmation
            </span>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 font-label-caps text-[11px] uppercase tracking-widest text-[#414843] hover:text-[#001d0e] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">share</span>
              <span className="hidden sm:inline">Share Suite</span>
            </button>
          </div>
        </div>

        {/* Gallery Composition (Main View 16:10 + 4 Thumbnails on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Hero Frame */}
          <div className="lg:col-span-8 relative group overflow-hidden bg-[#f0eee8] border border-[#e5e2dc]">
            <div className="aspect-[16/10] w-full overflow-hidden">
              <img
                src={currentGalleryItem.url}
                alt={currentGalleryItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-[#001d0e]/85 backdrop-blur-md px-4 py-2 text-[#ffffff]">
              <span className="font-label-caps text-[10px] uppercase tracking-widest text-[#ffdea5]">
                View 0{activeImageIndex + 1} //
              </span>
              <span className="font-sans text-xs text-[#ffffff] ml-2">
                {currentGalleryItem.caption}
              </span>
            </div>
          </div>

          {/* Curated Quadrant Thumbnails */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2.5 h-full">
            {room.galleryImages.map((img, idx) => {
              const isActive = activeImageIndex === idx;
              return (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`gallery-thumb relative aspect-[16/9] lg:aspect-[16/6] w-full overflow-hidden bg-[#f0eee8] text-left transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? 'ring-2 ring-[#775a19] opacity-100 border-transparent'
                      : 'opacity-75 hover:opacity-100 border-[#e5e2dc]'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-0 bg-[#001d0e]/15 hover:bg-transparent transition-colors"></span>
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#fcf9f3]/90 text-[#1c1c18] font-label-caps text-[10px] uppercase font-semibold">
                    {img.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Title & Core Specifications Ribbon (Exact matching Image 3) */}
      <section className="w-full px-5 lg:px-16 max-w-7xl mx-auto pb-8">
        <div className="bg-[#f6f3ed] p-6 lg:p-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border border-[#e5e2dc]">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-label-caps text-[11px] uppercase text-[#775a19] tracking-widest font-semibold">
                {room.specs.level}
              </span>
              <span className="px-2 py-0.5 bg-[#775a19]/15 text-[#775a19] font-label-caps text-[10px] uppercase">
                Featured
              </span>
            </div>
            <h1 className="font-display-hero text-3xl sm:text-4xl lg:text-5xl text-[#001d0e] tracking-tight">
              {room.name}
            </h1>
            <p className="font-sans text-sm text-[#414843] max-w-2xl leading-relaxed">
              {room.shortDescription}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-4 lg:text-right shrink-0">
            <div>
              <span className="font-label-caps text-[10px] uppercase text-[#727972] block">
                From
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-display-hero text-3xl sm:text-4xl text-[#001d0e] font-normal">
                  ₹{room.pricePerNight.toLocaleString()}
                </span>
                <span className="font-sans text-xs text-[#414843]">/ night</span>
              </div>
            </div>
            <span className="hidden sm:inline text-[#c1c8c1]">|</span>
            <div className="font-label-caps text-[11px] uppercase text-[#775a19] font-semibold">
              Inclusive of Curated Breakfast
            </div>
          </div>
        </div>

        {/* Architectural Key Specs Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-[#ffffff] p-5 flex items-center gap-3 shadow-sm border border-[#e5e2dc]">
            <span className="material-symbols-outlined text-[#775a19] text-2xl">
              square_foot
            </span>
            <div>
              <span className="block font-label-caps text-[10px] text-[#727972] uppercase">
                Chamber Scale
              </span>
              <span className="font-sans text-base font-semibold text-[#001d0e]">
                {room.specs.areaM2} m² / {room.specs.areaSqFt} sq ft
              </span>
            </div>
          </div>

          <div className="bg-[#ffffff] p-5 flex items-center gap-3 shadow-sm border border-[#e5e2dc]">
            <span className="material-symbols-outlined text-[#775a19] text-2xl">
              group
            </span>
            <div>
              <span className="block font-label-caps text-[10px] text-[#727972] uppercase">
                Occupancy
              </span>
              <span className="font-sans text-base font-semibold text-[#001d0e]">
                Max {room.specs.maxGuests} Guests
              </span>
            </div>
          </div>

          <div className="bg-[#ffffff] p-5 flex items-center gap-3 shadow-sm border border-[#e5e2dc]">
            <span className="material-symbols-outlined text-[#775a19] text-2xl">
              bed
            </span>
            <div>
              <span className="block font-label-caps text-[10px] text-[#727972] uppercase">
                Bedding
              </span>
              <span className="font-sans text-base font-semibold text-[#001d0e] truncate">
                {room.specs.bed}
              </span>
            </div>
          </div>

          <div className="bg-[#ffffff] p-5 flex items-center gap-3 shadow-sm border border-[#e5e2dc]">
            <span className="material-symbols-outlined text-[#775a19] text-2xl">
              nature
            </span>
            <div>
              <span className="block font-label-caps text-[10px] text-[#727972] uppercase">
                Exterior Aspect
              </span>
              <span className="font-sans text-base font-semibold text-[#001d0e] truncate">
                {room.specs.aspect}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Split & Sticky Reservation Matrix */}
      <section className="w-full px-5 lg:px-16 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Narrative, Triad, Amenities, Policies (7 cols) */}
          <div className="lg:col-span-7 space-y-12">
            {/* Room Narrative */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-px bg-[#775a19]"></span>
                <span className="font-label-caps text-[11px] uppercase tracking-widest text-[#775a19]">
                  The Living Atmosphere
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#001d0e]">
                Natural Materials, Quiet Proportions
              </h2>
              <div className="space-y-3 font-sans text-base text-[#414843] leading-relaxed">
                <p>{room.longDescription}</p>
                <p>
                  Floor-to-ceiling sheer drapes filter soft maritime breeze into the chambers, while fluted travertine bedside alcoves provide ambient warm-dimming reading illumination.
                </p>
              </div>
            </div>

            {/* Architectural Highlights Triad */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {room.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="bg-[#f0eee8] p-5 space-y-2 border border-[#e5e2dc]"
                >
                  <span className="material-symbols-outlined text-[#775a19] text-2xl">
                    {highlight.icon}
                  </span>
                  <h3 className="font-sans text-sm font-semibold text-[#001d0e]">
                    {highlight.title}
                  </h3>
                  <p className="font-sans text-xs text-[#414843] leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Sensory Amenities Grid (8 Items from Image 3) */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-px bg-[#775a19]"></span>
                <span className="font-label-caps text-[11px] uppercase tracking-widest text-[#775a19]">
                  Curated Suite Privileges
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#001d0e]">
                Included Amenities &amp; Refinements
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-[#ffffff] shadow-sm border border-[#e5e2dc]">
                  <span className="material-symbols-outlined text-[#775a19] mt-0.5">
                    wifi
                  </span>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-[#001d0e]">
                      Ultra-Speed Wi-Fi 6
                    </h4>
                    <p className="font-sans text-xs text-[#414843]">
                      Dedicated unthrottled fiber-optic node with integrated private VPN capabilities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#ffffff] shadow-sm border border-[#e5e2dc]">
                  <span className="material-symbols-outlined text-[#775a19] mt-0.5">
                    nest_thermostat
                  </span>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-[#001d0e]">
                      Multi-Zone Climate
                    </h4>
                    <p className="font-sans text-xs text-[#414843]">
                      Silent radiant subfloor heating with individualized HEPA allergen filtration.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#ffffff] shadow-sm border border-[#e5e2dc]">
                  <span className="material-symbols-outlined text-[#775a19] mt-0.5">
                    tv
                  </span>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-[#001d0e]">
                      55" Concealed 4K Display
                    </h4>
                    <p className="font-sans text-xs text-[#414843]">
                      Flush motorized panel concealed behind artisanal linen architectural millwork.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#ffffff] shadow-sm border border-[#e5e2dc]">
                  <span className="material-symbols-outlined text-[#775a19] mt-0.5">
                    wine_bar
                  </span>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-[#001d0e]">
                      Artisanal Cellar Bar
                    </h4>
                    <p className="font-sans text-xs text-[#414843]">
                      Small-batch botanical spirits, biodynamic estate wines, and crystal glassware.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#ffffff] shadow-sm border border-[#e5e2dc]">
                  <span className="material-symbols-outlined text-[#775a19] mt-0.5">
                    coffee
                  </span>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-[#001d0e]">
                      Bespoke Nespresso Atelier
                    </h4>
                    <p className="font-sans text-xs text-[#414843]">
                      Exclusive single-origin roasts, loose leaf Mariage Frères teas, fresh oat milk daily.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#ffffff] shadow-sm border border-[#e5e2dc]">
                  <span className="material-symbols-outlined text-[#775a19] mt-0.5">
                    spa
                  </span>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-[#001d0e]">
                      Diptyque &amp; Le Labo Bath
                    </h4>
                    <p className="font-sans text-xs text-[#414843]">
                      Full-sized apothecary flasks of Santal 33 &amp; Philosykos bath elixirs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#ffffff] shadow-sm border border-[#e5e2dc]">
                  <span className="material-symbols-outlined text-[#775a19] mt-0.5">
                    lock
                  </span>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-[#001d0e]">
                      Architectural Chamber Safe
                    </h4>
                    <p className="font-sans text-xs text-[#414843]">
                      Sized for 16" laptops with integrated biometric scanner and internal power sockets.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#ffffff] shadow-sm border border-[#e5e2dc]">
                  <span className="material-symbols-outlined text-[#775a19] mt-0.5">
                    room_service
                  </span>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-[#001d0e]">
                      24/7 Butler &amp; Dining
                    </h4>
                    <p className="font-sans text-xs text-[#414843]">
                      White-glove course-by-course chamber dining service and evening turndown ritual.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accordion Policies */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-px bg-[#775a19]"></span>
                <span className="font-label-caps text-[11px] uppercase tracking-widest text-[#775a19]">
                  Sanctuary Guidelines
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#001d0e]">
                Stay Policies &amp; Terms
              </h2>

              <div className="space-y-2 border border-[#e5e2dc]">
                {/* Accordion 1: Arrival & Departure */}
                <div className="bg-[#f6f3ed]">
                  <button
                    onClick={() =>
                      setOpenAccordion(
                        openAccordion === 'policy-arrival' ? null : 'policy-arrival'
                      )
                    }
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-[#f0eee8] transition-colors cursor-pointer"
                  >
                    <span className="font-sans text-sm font-semibold text-[#001d0e] flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#775a19] text-xl">
                        schedule
                      </span>
                      Arrival &amp; Departure Timelines
                    </span>
                    <span className="material-symbols-outlined text-[#727972]">
                      {openAccordion === 'policy-arrival' ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {openAccordion === 'policy-arrival' && (
                    <div className="px-5 pb-5 font-sans text-xs leading-relaxed text-[#414843] space-y-2">
                      <p>
                        <strong>Check-in:</strong> 3:00 PM onwards. Early arrival requests are subject to chamber readiness; complimentary luggage custody and spa sanctuary access are provided during transit.
                      </p>
                      <p>
                        <strong>Check-out:</strong> 12:00 PM (Noon). Late departures until 3:00 PM may be arranged with the Head Butler desk subject to seasonal availability.
                      </p>
                    </div>
                  )}
                </div>

                {/* Accordion 2: Flexible Cancellation */}
                <div className="bg-[#f6f3ed]">
                  <button
                    onClick={() =>
                      setOpenAccordion(
                        openAccordion === 'policy-cancel' ? null : 'policy-cancel'
                      )
                    }
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-[#f0eee8] transition-colors cursor-pointer"
                  >
                    <span className="font-sans text-sm font-semibold text-[#001d0e] flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#775a19] text-xl">
                        event_available
                      </span>
                      Flexible 48-Hour Cancellation Guarantee
                    </span>
                    <span className="material-symbols-outlined text-[#727972]">
                      {openAccordion === 'policy-cancel' ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {openAccordion === 'policy-cancel' && (
                    <div className="px-5 pb-5 font-sans text-xs leading-relaxed text-[#414843] space-y-2">
                      <p>
                        Reservations may be modified or cancelled without penalty up to 48 hours prior to 3:00 PM on the scheduled arrival date. Cancellations received within 48 hours will incur a fee equivalent to one night's chamber tariff and associated taxes.
                      </p>
                    </div>
                  )}
                </div>

                {/* Accordion 3: Children & Pets */}
                <div className="bg-[#f6f3ed]">
                  <button
                    onClick={() =>
                      setOpenAccordion(
                        openAccordion === 'policy-pet' ? null : 'policy-pet'
                      )
                    }
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-[#f0eee8] transition-colors cursor-pointer"
                  >
                    <span className="font-sans text-sm font-semibold text-[#001d0e] flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#775a19] text-xl">
                        pets
                      </span>
                      Children &amp; Canine Companions
                    </span>
                    <span className="material-symbols-outlined text-[#727972]">
                      {openAccordion === 'policy-pet' ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {openAccordion === 'policy-pet' && (
                    <div className="px-5 pb-5 font-sans text-xs leading-relaxed text-[#414843] space-y-2">
                      <p>
                        Children aged 12 and under reside with our compliments when sharing current bedding. Handcrafted nursery cribs are available upon prior notice.
                      </p>
                      <p>
                        Well-mannered canines under 15kg are welcomed in ground-level and courtyard residences. A one-time deep sanitation tariff of ₹120 applies, inclusive of custom memory-foam bedding and organic gourmet treats.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Booking Matrix Widget (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-[#ffffff] p-6 lg:p-8 shadow-xl border border-[#e5e2dc] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ffdea5] via-[#775a19] to-[#0d3320]"></div>

              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <span className="font-label-caps text-[11px] uppercase text-[#775a19] tracking-wider block">
                    Guaranteed Best Tariff
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display-hero text-3xl sm:text-4xl text-[#001d0e] font-normal">
                      ₹{room.pricePerNight.toLocaleString()}
                    </span>
                    <span className="font-sans text-xs text-[#414843]">/ night</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[#775a19]">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                  <span className="font-sans text-xs text-[#414843] ml-1 font-semibold">
                    {room.rating} ({room.reviewCount})
                  </span>
                </div>
              </div>

              {/* Date & Guest Controls */}
              <div className="space-y-3 mb-6">
                {/* Dates Grid */}
                <div className="grid grid-cols-2 gap-2 bg-[#f6f3ed] p-2 border border-[#e5e2dc]">
                  <div className="p-1.5">
                    <label className="block font-label-caps text-[10px] uppercase text-[#727972] mb-1">
                      Check-In
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent font-sans text-sm font-semibold text-[#001d0e] focus:outline-none cursor-pointer"
                    />
                  </div>

                  <div className="p-1.5 border-l border-[#e5e2dc]">
                    <label className="block font-label-caps text-[10px] uppercase text-[#727972] mb-1">
                      Check-Out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent font-sans text-sm font-semibold text-[#001d0e] focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Guests Counter */}
                <div className="bg-[#f6f3ed] p-3 flex items-center justify-between border border-[#e5e2dc]">
                  <div>
                    <span className="block font-label-caps text-[10px] uppercase text-[#727972]">
                      Guests
                    </span>
                    <span className="font-sans text-sm font-semibold text-[#001d0e]">
                      {guests} {guests === 1 ? 'Adult' : 'Adults'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                      className="w-8 h-8 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#001d0e] hover:bg-[#775a19] hover:text-[#ffffff] transition-colors disabled:opacity-40 cursor-pointer"
                      aria-label="Decrease guests"
                    >
                      <span className="material-symbols-outlined text-base">remove</span>
                    </button>
                    <span className="font-sans text-sm font-semibold text-[#001d0e]">
                      {guests}
                    </span>
                    <button
                      onClick={() =>
                        setGuests(Math.min(room.specs.maxGuests, guests + 1))
                      }
                      disabled={guests >= room.specs.maxGuests}
                      className="w-8 h-8 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#001d0e] hover:bg-[#775a19] hover:text-[#ffffff] transition-colors disabled:opacity-40 cursor-pointer"
                      aria-label="Increase guests"
                    >
                      <span className="material-symbols-outlined text-base">add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Pricing Breakdown */}
              <div className="space-y-2 py-4 bg-[#f6f3ed]/60 px-4 mb-6 border border-[#e5e2dc]">
                <div className="flex items-center justify-between font-sans text-xs text-[#414843]">
                  <span>
                    ₹{room.pricePerNight} × {nights} Night{nights > 1 ? 's' : ''}
                  </span>
                  <span className="font-sans text-sm font-semibold text-[#001d0e]">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between font-sans text-xs text-[#414843]">
                  <span>Sanctuary Conservation &amp; Service (10%)</span>
                  <span>₹{serviceFee.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between font-sans text-xs text-[#414843]">
                  <span>State &amp; Municipal Lodging Taxes (12%)</span>
                  <span>₹{taxes.toLocaleString()}</span>
                </div>

                <div className="pt-3 mt-2 border-t border-[#e5e2dc] flex items-center justify-between">
                  <div>
                    <span className="block font-label-caps text-[11px] uppercase text-[#001d0e] font-bold">
                      Total Tariff
                    </span>
                    <span className="font-sans text-[11px] text-[#727972]">
                      Includes all municipal levies
                    </span>
                  </div>
                  <span className="font-serif text-2xl text-[#775a19] font-bold">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBookNow}
                  className="w-full flex items-center justify-center py-4 bg-[#775a19] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#001d0e] transition-all duration-300 shadow-md group cursor-pointer"
                >
                  <span>BOOK THIS ROOM</span>
                  <span className="material-symbols-outlined ml-2 text-base transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>

                <button
                  onClick={() => onOpenInquiry('Custom Sanctuary Arrangement', room.name)}
                  className="w-full py-3 bg-transparent text-[#001d0e] hover:bg-[#f0eee8] transition-colors font-label-caps text-xs uppercase tracking-widest text-center cursor-pointer border border-[#e5e2dc]"
                >
                  Request Custom Arrangement
                </button>
              </div>

              {/* Guarantees Micro-Badges */}
              <div className="mt-6 pt-4 border-t border-[#f0eee8] grid grid-cols-2 gap-2 text-center">
                <div className="flex items-center justify-center gap-1.5 font-label-caps text-[10px] uppercase text-[#414843]">
                  <span className="material-symbols-outlined text-[#775a19] text-base">
                    verified
                  </span>
                  <span>No Hidden Fees</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 font-label-caps text-[10px] uppercase text-[#414843]">
                  <span className="material-symbols-outlined text-[#775a19] text-base">
                    lock
                  </span>
                  <span>Encrypted Payment</span>
                </div>
              </div>
            </div>

            {/* Dedicated Concierge Direct Dial Card */}
            <div className="mt-4 p-4 bg-[#f0eee8] flex items-center gap-3 border border-[#e5e2dc]">
              <div className="w-12 h-12 rounded-full bg-[#ffffff] flex items-center justify-center text-[#775a19] shadow-sm shrink-0">
                <span className="material-symbols-outlined">concierge</span>
              </div>
              <div>
                <h4 className="font-sans text-sm font-semibold text-[#001d0e]">
                  Personal Stay Curator
                </h4>
                <p className="font-sans text-xs text-[#414843]">
                  Direct line for pre-arrival dining and private transfers: +1 (800) 843-3686
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Accommodations Section (Complementary Sanctuaries) */}
      <section className="w-full bg-[#f6f3ed] py-16 px-5 lg:px-16 border-t border-[#e5e2dc]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <span className="font-label-caps text-[11px] uppercase tracking-widest text-[#775a19]">
                The Collection
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#001d0e]">
                Complementary Sanctuaries
              </h2>
            </div>
            <button
              onClick={() => onNavigate('rooms-and-suites')}
              className="inline-flex items-center gap-2 font-label-caps text-xs uppercase tracking-widest text-[#775a19] hover:text-[#001d0e] transition-colors cursor-pointer"
            >
              <span>Explore All Accommodations</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complementaryRooms.map((comp) => (
              <div
                key={comp.id}
                className="group bg-[#ffffff] overflow-hidden shadow-sm flex flex-col justify-between border border-[#e5e2dc]"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#f0eee8]">
                    <img
                      src={comp.heroImage}
                      alt={comp.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-[#fcf9f3]/90 px-3 py-1 font-label-caps text-[10px] uppercase text-[#001d0e]">
                      {comp.specs.level}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-[#001d0e] text-[#ffffff] px-3 py-1 font-sans text-xs font-semibold">
                      ₹{comp.pricePerNight} / night
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <div className="flex items-center gap-2 font-label-caps text-[10px] text-[#775a19] uppercase">
                      <span>{comp.specs.areaM2} m² / {comp.specs.areaSqFt} sq ft</span>
                      <span>•</span>
                      <span>{comp.specs.aspect}</span>
                    </div>
                    <h3 className="font-serif text-xl text-[#001d0e] group-hover:text-[#775a19] transition-colors">
                      {comp.name}
                    </h3>
                    <p className="font-sans text-xs text-[#414843] leading-relaxed line-clamp-2">
                      {comp.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-[#f0eee8]">
                  <button
                    onClick={() => {
                      onNavigate('room-detail', comp.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-label-caps text-[11px] uppercase text-[#775a19] hover:text-[#001d0e] transition-colors cursor-pointer"
                  >
                    View Chamber Details →
                  </button>
                  <button
                    onClick={() => onSelectRoomForBooking(comp.id)}
                    className="px-5 py-2.5 bg-[#001d0e] text-[#ffffff] font-label-caps text-[10px] uppercase tracking-widest hover:bg-[#775a19] transition-colors cursor-pointer"
                  >
                    Instant Reserve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
