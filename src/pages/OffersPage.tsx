import React from 'react';
import { PageId } from '../components/Header';
import { SEASONAL_OFFERS } from '../data/hotelData';

interface OffersPageProps {
  onNavigate: (page: PageId, roomId?: string) => void;
  onSelectRoomForBooking: (roomId: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({
  onNavigate,
  onSelectRoomForBooking
}) => {
  return (
    <div className="w-full flex flex-col bg-[#fcf9f3]">
      {/* Editorial Header */}
      <section className="relative -mt-20 pt-36 pb-20 w-full bg-[#0d3320] text-[#ffffff] overflow-hidden">
        <div className="relative w-full px-5 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffffff]/10 backdrop-blur-md rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffdea5]"></span>
            <span className="font-label-caps text-[11px] text-[#ffdea5] uppercase tracking-widest">
              Resident Privileges
            </span>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-6xl text-[#ffffff] tracking-tight max-w-3xl mb-4 font-normal">
            Seasonal Offers &amp; Stays
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-[#c3ecd0] max-w-2xl font-normal opacity-90 mb-4">
            “Exclusive retreats crafted around seasonal transitions and extended contemplation.”
          </p>
        </div>
      </section>

      {/* Offers Showcase */}
      <section className="w-full py-16 px-5 lg:px-16 max-w-7xl mx-auto">
        <div className="space-y-12">
          {SEASONAL_OFFERS.map((offer, idx) => (
            <div
              key={offer.id}
              className={`bg-[#ffffff] border border-[#e5e2dc] shadow-sm flex flex-col ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } overflow-hidden`}
            >
              <div className="lg:w-1/2 relative min-h-[340px] bg-[#f0eee8]">
                <img
                  src={offer.image}
                  alt={offer.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#001d0e] text-[#ffffff] font-label-caps text-[10px] uppercase px-3 py-1 tracking-widest font-semibold">
                  {offer.badge}
                </div>
              </div>

              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="font-label-caps text-[10px] text-[#775a19] uppercase tracking-wider block mb-1">
                      {offer.subtitle}
                    </span>
                    <h2 className="font-serif text-2xl lg:text-3xl text-[#001d0e]">
                      {offer.title}
                    </h2>
                  </div>

                  <p className="font-sans text-xs leading-relaxed text-[#414843]">
                    {offer.description}
                  </p>

                  <div className="bg-[#f6f3ed] p-4 border border-[#e5e2dc]">
                    <span className="font-label-caps text-[10px] text-[#001d0e] uppercase tracking-wider block mb-2 font-semibold">
                      Included Sanctuary Privileges:
                    </span>
                    <ul className="space-y-1 font-sans text-xs text-[#414843]">
                      {offer.perks.map((perk, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#775a19]">
                            check
                          </span>
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-xs text-[#727972] pt-2">
                    <span className="font-semibold text-[#775a19]">
                      {offer.savings}
                    </span>
                    <span>Valid through: {offer.validUntil}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#f0eee8] flex items-center gap-4 mt-6">
                  <button
                    onClick={() => onSelectRoomForBooking(offer.defaultRoomId)}
                    className="px-6 py-3.5 bg-[#775a19] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#001d0e] transition-colors cursor-pointer"
                  >
                    Reserve This Offer
                  </button>
                  <button
                    onClick={() => onNavigate('room-detail', offer.defaultRoomId)}
                    className="font-label-caps text-xs uppercase text-[#001d0e] hover:text-[#775a19] transition-colors cursor-pointer"
                  >
                    View Chamber Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
