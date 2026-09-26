import React, { useState } from 'react';
import { PageId } from '../components/Header';
import { FountantLogo } from '../components/FountantLogo';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenInquiry: (topic?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenInquiry
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the architectural philosophy behind FOUNTANT HOTEL?',
      a: 'FOUNTANT HOTEL was conceived as an antidote to urban sensory overload. We combine classical 19th-century limestone architecture with warm editorial minimalism, fluted untreated white oak, Italian Arabescato marble, and triple-glazed acoustic casements engineered to maintain interior sound levels below 24 decibels.'
    },
    {
      q: 'How do arrival transfers and the private helipad function?',
      a: 'Guests arriving by air may touch down directly on Helipad Grid B-4 (Coastal Coordinates 34.0259° N, 118.7798° W) with pre-arranged flight clearance through our Butler Desk. For guests arriving by road, our private chauffeured hybrid Mercedes-Maybach fleet coordinates transfers from regional airports directly to the East Gate Portico.'
    },
    {
      q: 'Are thermal spa circuits included in room reservations?',
      a: 'Yes. All resident guests enjoy complimentary unlimited access to the Roman hydrotherapy pools, cedar thermal saunas, cold plunge basins, and quiet meditation gardens throughout their residency.'
    },
    {
      q: 'Can private floor buyouts or interconnecting wings be arranged?',
      a: 'Yes. Our Head Concierge orchestrates multi-chamber pavilion buyouts, private security corridors, and extended artist residencies. Please contact our Butler Desk directly via our bespoke arrangement form.'
    }
  ];

  return (
    <div className="w-full flex flex-col bg-[#fcf9f3]">
      {/* Editorial Header */}
      <section className="relative -mt-20 pt-36 pb-20 w-full bg-[#0d3320] text-[#ffffff] overflow-hidden">
        <div className="relative w-full px-5 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffffff]/10 backdrop-blur-md rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffdea5]"></span>
            <span className="font-label-caps text-[11px] text-[#ffdea5] uppercase tracking-widest">
              Estate Heritage &amp; Stewardship
            </span>
          </div>

          <FountantLogo variant="full" theme="light" className="mb-4" />

          <h1 className="font-display-hero text-4xl sm:text-6xl text-[#ffffff] tracking-tight max-w-3xl mb-4 font-normal">
            Heritage &amp; Architecture
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-[#c3ecd0] max-w-2xl font-normal opacity-90 mb-4">
            “Built upon timeless stone, restored for the contemplative traveler.”
          </p>
        </div>
      </section>

      {/* Main Historical Narrative */}
      <section className="w-full py-20 px-5 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-[#775a19]"></span>
              <span className="font-label-caps text-[11px] text-[#775a19] uppercase tracking-widest">
                Established 1894
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#001d0e] leading-snug">
              A Legacy of Botanical Solitude and Classical Rigor
            </h2>

            <p className="font-sans text-sm text-[#414843] leading-relaxed">
              Founded on the seaside bluffs by botanist and maritime collector Lord Alistair Fountant, the estate was initially envisioned as an experimental arboretum. Rare subtropical cycads, Mediterranean olive trees, and sweet citrus groves were nurtured along natural spring water lines.
            </p>

            <p className="font-sans text-sm text-[#414843] leading-relaxed">
              At the courtyard heart stands the historic tiered fountain, carved in 1904 from Tuscan limestone and Florentine bronze. Its continuous, gentle cadence anchors the entire sanctuary in an aura of tranquil stillness.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#e5e2dc]">
              <div>
                <span className="font-serif text-3xl text-[#001d0e] block">130+</span>
                <span className="font-label-caps text-[10px] text-[#727972] uppercase">
                  Years of Heritage
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl text-[#001d0e] block">1,200</span>
                <span className="font-label-caps text-[10px] text-[#727972] uppercase">
                  Botanical Species
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl text-[#001d0e] block">&lt;24dB</span>
                <span className="font-label-caps text-[10px] text-[#727972] uppercase">
                  Acoustic Quietude
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] bg-[#f0eee8] overflow-hidden border border-[#e5e2dc] shadow-lg">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVWDnHGpcmAZdQRsivVGC_moggY8ydWzaQFhRwuw-09vIVk0tfs2hFlOWWkW5HO8V7_5kzHZtJfPqEkQhTlwcxKHGT_aWk2NAVa8eyFJknOINXZaw8bXeaCP44MwwGku_-dTXfYhkUYZ7-FLFlnV0-CEs1fWlH8vbe70_wq7Egs88x5jlg40Kvx1IM1vxCmdmhRQxgPTLGVmY22csLQVaCO4RZ39dsjcXVim6T4lxlm47japq_j_cF"
                alt="Fountant historic fountain courtyard"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#001d0e] text-[#ffffff] p-6 max-w-xs shadow-xl hidden sm:block">
              <span className="font-label-caps text-[9px] uppercase tracking-widest text-[#ffdea5] block mb-1">
                The Central Element
              </span>
              <p className="font-serif italic text-sm text-[#c3ecd0]">
                “Water has memory here. It quiets the pulse and restores proportion.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Head Concierge Letter */}
      <section className="w-full bg-[#f6f3ed] py-20 px-5 lg:px-16 border-y border-[#e5e2dc]">
        <div className="max-w-4xl mx-auto bg-[#ffffff] p-8 lg:p-14 border border-[#e5e2dc] shadow-sm relative">
          <div className="text-center space-y-4">
            <FountantLogo variant="crest-only" size="md" className="mx-auto" />
            <span className="font-label-caps text-[11px] text-[#775a19] uppercase tracking-widest block">
              Letter of Welcome
            </span>
            <h3 className="font-serif text-3xl text-[#001d0e]">
              A Word from the Head Butler Desk
            </h3>
            <div className="w-16 h-px bg-[#775a19] mx-auto my-4"></div>
          </div>

          <div className="mt-8 space-y-4 font-sans text-sm text-[#414843] leading-relaxed">
            <p>
              Dear Discerning Resident,
            </p>
            <p>
              True luxury in our modern era is no longer about ostentatious gold leaf or hurried spectacle. It is the unhurried presence of time, the tactile honesty of hand-smoothed travertine, the crisp snap of organic Italian percale linen, and the profound peace of a chamber where no outside voice intrudes.
            </p>
            <p>
              Whether you come to finish a manuscript, celebrate an intimate anniversary, or simply listen to the morning courtyard fountain with a fresh cup of estate lemon verbena tea, our entire guild stands ready to anticipate your needs before they are spoken.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#f0eee8]">
              <div>
                <span className="font-serif text-lg text-[#001d0e] block font-semibold">
                  Guillaume Laurent
                </span>
                <span className="font-label-caps text-[10px] text-[#775a19] uppercase tracking-wider">
                  Head Butler &amp; Sanctuary Curator · Les Clefs d'Or
                </span>
              </div>
              <button
                onClick={() => onOpenInquiry('Direct Concierge Correspondence')}
                className="px-6 py-2.5 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest hover:bg-[#775a19] transition-colors cursor-pointer"
              >
                Inquire Directly
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Guest FAQ Section */}
      <section className="w-full py-20 px-5 lg:px-16 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-label-caps text-[11px] text-[#775a19] uppercase tracking-widest block mb-1">
            Resident Clarity
          </span>
          <h2 className="font-serif text-3xl text-[#001d0e]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-[#ffffff] border border-[#e5e2dc] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-[#f6f3ed] transition-colors cursor-pointer"
                >
                  <span className="font-serif text-base text-[#001d0e] font-medium pr-4">
                    {faq.q}
                  </span>
                  <span className="material-symbols-outlined text-[#775a19]">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 font-sans text-xs leading-relaxed text-[#414843] border-t border-[#f0eee8] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
