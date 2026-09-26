import React, { useState } from 'react';
import { PageId } from './Header';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenInquiry?: (initialTopic?: string) => void;
  onOpenSupabaseConfig?: () => void;
  onOpenAuth?: (mode?: 'signin' | 'signup') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenInquiry,
  onOpenSupabaseConfig,
  onOpenAuth,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [policyModal, setPolicyModal] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <>
      <footer className="w-full bg-[#f6f3ed] text-[#1c1c18] pt-16 pb-12 border-t border-[#e5e2dc]">
        <div className="w-full px-5 lg:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14">
            {/* Col 1-5: Brand & Newsletter */}
            <div className="lg:col-span-5 flex flex-col justify-between pr-0 lg:pr-8">
              <div className="space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-2xl tracking-[0.16em] uppercase text-[#001d0e] font-medium">
                    FOUNTANT
                  </span>
                  <span className="font-label-caps text-[11px] uppercase text-[#775a19] tracking-widest">
                    HOTEL & SANCTUARY
                  </span>
                </div>
                <p className="font-sans text-[15px] leading-relaxed text-[#414843] max-w-md">
                  A bespoke sanctuary curated for the discerning wanderer. Timeless
                  architectural grandeur, quiet luxury, and refined botanic living.
                </p>
                <div className="pt-2 space-y-1 font-sans text-xs text-[#414843]">
                  <p>144 Royal Palm Boulevard, Seaside Enclave</p>
                  <p>
                    Concierge Desk:{' '}
                    <a href="tel:+18008433686" className="text-[#001d0e] hover:underline">
                      +1 (800) 843-3686
                    </a>{' '}
                    ·{' '}
                    <a
                      href="mailto:reservations@founthanthotel.com"
                      className="text-[#001d0e] hover:underline"
                    >
                      reservations@founthanthotel.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div className="mt-8">
                <h4 className="font-label-caps text-[11px] uppercase tracking-widest text-[#775a19] mb-2 font-semibold">
                  Stay in the Know
                </h4>
                <p className="font-sans text-xs text-[#414843] mb-3">
                  Receive curated seasonal itineraries, culinary previews, and private suite releases.
                </p>

                {subscribed ? (
                  <div className="bg-[#c3ecd0]/40 border border-[#769d83] p-3 text-xs text-[#002111] flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-[#416650]">
                      check_circle
                    </span>
                    <span>
                      Thank you. Your personal invitation to the Sanctuary Gazette has been confirmed.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex max-w-md">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 bg-[#ffffff] px-4 py-3 font-sans text-xs text-[#1c1c18] placeholder:text-[#727972] border border-[#e5e2dc] focus:outline-none focus:border-[#775a19]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#001d0e] text-[#ffffff] font-label-caps text-[11px] uppercase tracking-wider hover:bg-[#1b1714] transition-colors cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Col 6-12: Navigation Quadrant */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Sanctuary */}
              <div className="flex flex-col space-y-2.5">
                <h4 className="font-label-caps text-[11px] uppercase tracking-widest text-[#001d0e] font-bold mb-1">
                  Sanctuary
                </h4>
                <button
                  onClick={() => onNavigate('rooms-and-suites')}
                  className="text-left font-sans text-xs text-[#414843] hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  Rooms & Suites
                </button>
                <button
                  onClick={() => onNavigate('dining')}
                  className="text-left font-sans text-xs text-[#414843] hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  Dining & Lounge
                </button>
                <button
                  onClick={() => onNavigate('experiences')}
                  className="text-left font-sans text-xs text-[#414843] hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  Curated Experiences
                </button>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="text-left font-sans text-xs text-[#414843] hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  Visual Gallery
                </button>
              </div>

              {/* Hospitality */}
              <div className="flex flex-col space-y-2.5">
                <h4 className="font-label-caps text-[11px] uppercase tracking-widest text-[#001d0e] font-bold mb-1">
                  Hospitality
                </h4>
                <button
                  onClick={() => onNavigate('offers')}
                  className="text-left font-sans text-xs text-[#414843] hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  Seasonal Offers
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-left font-sans text-xs text-[#414843] hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  Heritage & Story
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-left font-sans text-xs text-[#414843] hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  Private Concierge
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-left font-sans text-xs text-[#414843] hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  Guest FAQ
                </button>
              </div>

              {/* Portal */}
              <div className="flex flex-col space-y-2.5">
                <h4 className="font-label-caps text-[11px] uppercase tracking-widest text-[#001d0e] font-bold mb-1">
                  Portal
                </h4>
                <button
                  onClick={() => onNavigate('guest-account')}
                  className="text-left font-sans text-xs text-[#414843] hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  My Account &amp; Preferences
                </button>
                <button
                  onClick={() => onNavigate('guest-account')}
                  className="text-left font-sans text-xs text-[#414843] hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  My Bookings Ledger
                </button>
                <button
                  onClick={() => onOpenAuth?.('signin')}
                  className="text-left font-sans text-xs text-[#414843] hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  Resident Sign In
                </button>
                <button
                  onClick={() => onOpenSupabaseConfig?.()}
                  className="text-left font-sans text-xs text-[#775a19] font-medium hover:underline transition-colors cursor-pointer"
                >
                  ⚡ Supabase Cloud Backend
                </button>
                <button
                  onClick={() => onNavigate('reservation')}
                  className="text-left font-sans text-xs text-[#414843] hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  Check Availability
                </button>
                <button
                  onClick={() => {
                    if (onOpenInquiry) {
                      onOpenInquiry('Bespoke Suite Request');
                    } else {
                      onNavigate('contact');
                    }
                  }}
                  className="text-left font-sans text-xs text-[#414843] hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  Bespoke Requests
                </button>
              </div>

              {/* Connect */}
              <div className="flex flex-col space-y-2.5">
                <h4 className="font-label-caps text-[11px] uppercase tracking-widest text-[#001d0e] font-bold mb-1">
                  Connect
                </h4>
                <div className="flex items-center gap-3 text-[#414843]">
                  <span
                    className="material-symbols-outlined text-lg hover:text-[#775a19] cursor-pointer transition-colors"
                    title="Global Sanctuary Network"
                  >
                    public
                  </span>
                  <span
                    className="material-symbols-outlined text-lg hover:text-[#775a19] cursor-pointer transition-colors"
                    title="Instagram Dossier"
                  >
                    photo_camera
                  </span>
                  <a
                    href="mailto:concierge@founthanthotel.com"
                    className="material-symbols-outlined text-lg hover:text-[#775a19] cursor-pointer transition-colors"
                    title="Direct Concierge Email"
                  >
                    mail
                  </a>
                </div>
                <p className="font-sans text-xs text-[#414843] pt-1">
                  Valet & Arrival: East Gate Portico
                </p>
                <p className="font-sans text-xs text-[#414843]">
                  Private Helipad: Grid B-4
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Legal Strip */}
          <div className="pt-6 border-t border-[#e5e2dc] flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-[#414843]">
            <p>© 2024 FOUNTANT HOTEL LLC. All bespoke privileges reserved.</p>
            <div className="flex flex-wrap items-center gap-6 font-label-caps text-[10px] uppercase">
              <button
                onClick={() => setPolicyModal('privacy')}
                className="hover:text-[#001d0e] transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setPolicyModal('terms')}
                className="hover:text-[#001d0e] transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <button
                onClick={() => setPolicyModal('accessibility')}
                className="hover:text-[#001d0e] transition-colors cursor-pointer"
              >
                Accessibility
              </button>
              <button
                onClick={() => setPolicyModal('cookies')}
                className="hover:text-[#001d0e] transition-colors cursor-pointer"
              >
                Cookie Preferences
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal for Legal / Policy Info */}
      {policyModal && (
        <div className="fixed inset-0 z-50 bg-[#001d0e]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fcf9f3] max-w-lg w-full p-8 border border-[#e5e2dc] shadow-2xl relative">
            <button
              onClick={() => setPolicyModal(null)}
              className="absolute top-4 right-4 text-[#414843] hover:text-[#001d0e] cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <span className="font-label-caps text-[10px] text-[#775a19] uppercase tracking-widest block mb-2">
              Sanctuary Guidelines
            </span>
            <h3 className="font-serif text-2xl text-[#001d0e] mb-4">
              {policyModal === 'privacy' && 'Privacy & Resident Seclusion Policy'}
              {policyModal === 'terms' && 'Terms of Sanctuary Residency'}
              {policyModal === 'accessibility' && 'Universal Accessibility Guarantee'}
              {policyModal === 'cookies' && 'Digital Privacy & Cookie Preferences'}
            </h3>
            <div className="font-sans text-xs leading-relaxed text-[#414843] space-y-3 max-h-72 overflow-y-auto pr-2">
              {policyModal === 'privacy' && (
                <>
                  <p>
                    FOUNTANT HOTEL upholds the strictest standards of resident privacy. Guest itineraries, chamber selections, and direct contact points are guarded in cryptographic security.
                  </p>
                  <p>
                    We never sell, rent, or distribute guest dossiers to third parties. Dedicated concierge notes regarding dietary, allergen, and bedding preferences remain strictly confidential to your private butler team.
                  </p>
                </>
              )}
              {policyModal === 'terms' && (
                <>
                  <p>
                    Residency at FOUNTANT HOTEL guarantees access to all botanical courtyards, thermal spa circuits, and library salons. Quiet sanctuary hours are observed throughout pavilion corridors from 22:00 to 07:00.
                  </p>
                  <p>
                    Reservations may be cancelled without penalty up to 48 hours prior to check-in (15:00 local time). Cancellations inside 48 hours are subject to a single night deposit.
                  </p>
                </>
              )}
              {policyModal === 'accessibility' && (
                <>
                  <p>
                    All garden pathways, dining verandas, and elevator corridors feature step-free architectural grading and tactile stone navigation.
                  </p>
                  <p>
                    Dedicated accessible sanctuary chambers provide zero-barrier showers, motorized drapes, and assistive listening in all lecture salons.
                  </p>
                </>
              )}
              {policyModal === 'cookies' && (
                <>
                  <p>
                    We employ essential session storage cookies to maintain your room reservations, currency selections, and concierge inquiries.
                  </p>
                  <p>
                    No invasive third-party cross-site advertising trackers are loaded on this domain.
                  </p>
                </>
              )}
            </div>
            <div className="mt-6 pt-4 border-t border-[#e5e2dc] flex justify-end">
              <button
                onClick={() => setPolicyModal(null)}
                className="px-6 py-2.5 bg-[#001d0e] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest cursor-pointer"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
