import React, { useState } from 'react';
import { PageId } from '../components/Header';
import { DINING_VENUES } from '../data/hotelData';
import { TableReservationModal } from '../components/TableReservationModal';

interface DiningPageProps {
  onNavigate: (page: PageId) => void;
}

export const DiningPage: React.FC<DiningPageProps> = () => {
  const [activeVenue, setActiveVenue] = useState(DINING_VENUES[0].id);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [targetVenueName, setTargetVenueName] = useState('The Orangery');

  const selectedVenue =
    DINING_VENUES.find((v) => v.id === activeVenue) || DINING_VENUES[0];

  const handleOpenReservation = (venueName: string) => {
    setTargetVenueName(venueName);
    setReservationModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col bg-[#fcf9f3]">
      {/* Editorial Header */}
      <section className="relative -mt-20 pt-36 pb-20 w-full bg-[#0d3320] text-[#ffffff] overflow-hidden">
        <div className="relative w-full px-5 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffffff]/10 backdrop-blur-md rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffdea5]"></span>
            <span className="font-label-caps text-[11px] text-[#ffdea5] uppercase tracking-widest">
              Gastronomic Sanctuary
            </span>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-6xl text-[#ffffff] tracking-tight max-w-3xl mb-4 font-normal">
            Dining &amp; Lounges
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-[#c3ecd0] max-w-2xl font-normal opacity-90 mb-6">
            “Culinary art guided by botanical harvests and Mediterranean terroir.”
          </p>

          <button
            onClick={() => handleOpenReservation('The Orangery')}
            className="px-8 py-3.5 bg-[#775a19] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#fed488] hover:text-[#785a1a] transition-all cursor-pointer shadow-md"
          >
            Reserve a Dining Table
          </button>
        </div>
      </section>

      {/* Venue Switcher Tabs */}
      <section className="sticky top-20 z-40 w-full bg-[#ffffff] border-b border-[#e5e2dc] shadow-sm">
        <div className="max-w-7xl mx-auto px-5 lg:px-16 flex items-center justify-start gap-3 py-3 overflow-x-auto no-scrollbar">
          {DINING_VENUES.map((venue) => (
            <button
              key={venue.id}
              onClick={() => setActiveVenue(venue.id)}
              className={`px-5 py-2.5 font-label-caps text-xs uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                activeVenue === venue.id
                  ? 'bg-[#001d0e] text-[#ffffff]'
                  : 'bg-[#f0eee8] text-[#414843] hover:bg-[#e5e2dc]'
              }`}
            >
              {venue.name}
            </button>
          ))}
        </div>
      </section>

      {/* Selected Venue Showcase */}
      <section className="w-full py-16 px-5 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Venue Info & Photo (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="aspect-[16/10] bg-[#f0eee8] overflow-hidden border border-[#e5e2dc]">
              <img
                src={selectedVenue.image}
                alt={selectedVenue.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div>
                <span className="font-label-caps text-[11px] text-[#775a19] uppercase tracking-widest block mb-1">
                  {selectedVenue.subtitle}
                </span>
                <h2 className="font-serif text-3xl text-[#001d0e]">
                  {selectedVenue.name}
                </h2>
              </div>

              <p className="font-sans text-sm text-[#414843] leading-relaxed">
                {selectedVenue.description}
              </p>

              <div className="bg-[#f6f3ed] p-5 space-y-2 font-sans text-xs border border-[#e5e2dc]">
                <div className="flex items-center gap-2 text-[#001d0e]">
                  <span className="material-symbols-outlined text-sm text-[#775a19]">
                    schedule
                  </span>
                  <span>{selectedVenue.hours}</span>
                </div>
                <div className="flex items-center gap-2 text-[#001d0e]">
                  <span className="material-symbols-outlined text-sm text-[#775a19]">
                    checkroom
                  </span>
                  <span>Dress Code: {selectedVenue.dressCode}</span>
                </div>
                <div className="flex items-center gap-2 text-[#001d0e]">
                  <span className="material-symbols-outlined text-sm text-[#775a19]">
                    wb_twilight
                  </span>
                  <span>Ambience: {selectedVenue.atmosphere}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleOpenReservation(selectedVenue.name)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#775a19] transition-colors cursor-pointer"
                >
                  Reserve Table at {selectedVenue.name}
                </button>
              </div>
            </div>
          </div>

          {/* Degustation Menu Accordion (6 cols) */}
          <div className="lg:col-span-6 bg-[#ffffff] p-6 lg:p-8 border border-[#e5e2dc] shadow-sm">
            <div className="border-b border-[#e5e2dc] pb-4 mb-6">
              <span className="font-label-caps text-[10px] text-[#775a19] uppercase tracking-widest block">
                Seasonal Harvest
              </span>
              <h3 className="font-serif text-2xl text-[#001d0e]">
                Degustation Menu Selections
              </h3>
              <p className="font-sans text-xs text-[#727972] mt-1">
                Ingredients picked daily at 06:00 from the hotel's coastal botanical garden.
              </p>
            </div>

            <div className="space-y-8">
              {selectedVenue.menu.map((sec, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="font-label-caps text-xs uppercase text-[#775a19] tracking-widest border-b border-[#f0eee8] pb-1 font-semibold">
                    {sec.category}
                  </h4>

                  <div className="space-y-4">
                    {sec.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="group">
                        <div className="flex items-baseline justify-between gap-4">
                          <h5 className="font-sans text-sm font-semibold text-[#001d0e] group-hover:text-[#775a19] transition-colors">
                            {item.name}
                          </h5>
                          <span className="font-serif text-sm font-bold text-[#001d0e] shrink-0">
                            {item.price}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-[#414843] mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                        {item.dietary && (
                          <span className="inline-block mt-1 font-label-caps text-[9px] uppercase text-[#416650] bg-[#c3ecd0]/30 px-2 py-0.5">
                            {item.dietary}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#e5e2dc] flex items-center justify-between text-xs text-[#727972]">
              <span>Sommelier pairings available: ₹75 per guest</span>
              <span className="font-mono">VAT & Service Included</span>
            </div>
          </div>
        </div>
      </section>

      {/* Table Reservation Modal */}
      <TableReservationModal
        isOpen={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
        defaultVenue={targetVenueName}
      />
    </div>
  );
};
