import React, { useState } from 'react';
import { PageId } from '../components/Header';
import { EXPERIENCES } from '../data/hotelData';
import { SanctuaryExperience } from '../types/hotel';
import { ExperienceBookingModal } from '../components/ExperienceBookingModal';

interface ExperiencesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenInquiry: (topic?: string) => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({
  onOpenInquiry
}) => {
  const [selectedExperience, setSelectedExperience] =
    useState<SanctuaryExperience | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const filteredExperiences =
    filter === 'All'
      ? EXPERIENCES
      : EXPERIENCES.filter((e) => e.category === filter);

  return (
    <div className="w-full flex flex-col bg-[#fcf9f3]">
      {/* Editorial Header */}
      <section className="relative -mt-20 pt-36 pb-20 w-full bg-[#0d3320] text-[#ffffff] overflow-hidden">
        <div className="relative w-full px-5 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffffff]/10 backdrop-blur-md rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffdea5]"></span>
            <span className="font-label-caps text-[11px] text-[#ffdea5] uppercase tracking-widest">
              Bespoke Sanctuary Itineraries
            </span>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-6xl text-[#ffffff] tracking-tight max-w-3xl mb-4 font-normal">
            Curated Experiences
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-[#c3ecd0] max-w-2xl font-normal opacity-90 mb-6">
            “Moments sculpted in maritime light, Roman thermal stone, and ancient botanical groves.”
          </p>

          <button
            onClick={() => onOpenInquiry('Custom Experience Inquiry')}
            className="px-8 py-3.5 bg-[#775a19] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#fed488] hover:text-[#785a1a] transition-all cursor-pointer shadow-md"
          >
            Request Private Curation
          </button>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-40 w-full bg-[#ffffff] border-b border-[#e5e2dc] shadow-sm">
        <div className="max-w-7xl mx-auto px-5 lg:px-16 flex items-center justify-start gap-3 py-3 overflow-x-auto no-scrollbar">
          {['All', 'Wellness', 'Maritime', 'Culinary', 'Aviation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 font-label-caps text-xs uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                filter === cat
                  ? 'bg-[#001d0e] text-[#ffffff]'
                  : 'bg-[#f0eee8] text-[#414843] hover:bg-[#e5e2dc]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="w-full py-16 px-5 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredExperiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-[#ffffff] flex flex-col justify-between border border-[#e5e2dc] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f0eee8]">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#001d0e] text-[#ffffff] font-label-caps text-[10px] uppercase px-3 py-1 tracking-widest">
                    {exp.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#fcf9f3]/90 px-3 py-1 font-sans text-xs text-[#001d0e] font-semibold">
                    {exp.duration}
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <div>
                    <span className="font-label-caps text-[10px] text-[#775a19] uppercase tracking-wider block mb-1">
                      {exp.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl text-[#001d0e]">
                      {exp.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs leading-relaxed text-[#414843]">
                    {exp.description}
                  </p>

                  <div className="pt-2">
                    <h5 className="font-label-caps text-[10px] text-[#001d0e] uppercase tracking-wider mb-2 font-semibold">
                      Curated Inclusions:
                    </h5>
                    <ul className="space-y-1.5 font-sans text-xs text-[#414843]">
                      {exp.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[#775a19] text-sm mt-0.5">
                            check
                          </span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-4 border-t border-[#f0eee8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-label-caps text-[10px] uppercase text-[#727972] block">
                    Sanctuary Tariff
                  </span>
                  <span className="font-sans text-sm font-semibold text-[#001d0e]">
                    {exp.price}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedExperience(exp)}
                  className="px-6 py-3 bg-[#775a19] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#001d0e] transition-colors cursor-pointer text-center"
                >
                  Reserve Experience
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Booking Modal */}
      <ExperienceBookingModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </div>
  );
};
