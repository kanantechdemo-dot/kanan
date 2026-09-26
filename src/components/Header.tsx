import React, { useState, useEffect } from 'react';
import { FountantLogo } from './FountantLogo';
import { useAuth } from '../context/AuthContext';
import { Database, LogIn, LogOut, User as UserIcon, Settings } from 'lucide-react';

export type PageId =
  | 'home'
  | 'rooms-and-suites'
  | 'room-detail'
  | 'dining'
  | 'experiences'
  | 'offers'
  | 'gallery'
  | 'about'
  | 'contact'
  | 'reservation'
  | 'guest-account';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, roomId?: string) => void;
  bookingCount?: number;
  onOpenAuth?: (mode?: 'signin' | 'signup') => void;
  onOpenSupabaseConfig?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  bookingCount = 0,
  onOpenAuth,
  onOpenSupabaseConfig,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { user, profile, isConfigured, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'rooms-and-suites', label: 'Rooms & Suites' },
    { id: 'dining', label: 'Dining' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'offers', label: 'Offers' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'guest-account', label: 'Resident Portal' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#fcf9f3]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e5e2dc]'
          : 'bg-[#fcf9f3]/90 backdrop-blur-sm'
      }`}
    >
      <div className="h-20 w-full px-4 lg:px-12 flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center text-left focus:outline-none group cursor-pointer"
          aria-label="Fountant Hotel Home"
        >
          <FountantLogo variant="compact" theme="dark" />
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive =
              currentPage === item.id ||
              (item.id === 'rooms-and-suites' && currentPage === 'room-detail');
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`font-label-caps text-[11px] tracking-[0.16em] uppercase py-1 cursor-pointer transition-colors border-b-2 ${
                  isActive
                    ? 'text-[#001d0e] font-semibold border-[#775a19]'
                    : 'text-[#414843] hover:text-[#001d0e] border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Supabase Pill, Primary Action & Profile */}
        <div className="flex items-center gap-3">
          {/* Supabase Indicator Pill */}
          <button
            type="button"
            onClick={onOpenSupabaseConfig}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider rounded-full border transition-all cursor-pointer ${
              isConfigured
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
            }`}
            title="Configure Supabase Database & Auth"
          >
            <Database className="w-3 h-3 text-[#775a19]" />
            <span className="font-semibold">
              {isConfigured ? 'Supabase: Active' : 'Supabase Setup'}
            </span>
          </button>

          {/* Book Room CTA */}
          <button
            onClick={() => onNavigate('reservation')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-[#775a19] text-[#ffffff] font-label-caps text-[11px] uppercase tracking-[0.16em] hover:bg-[#fed488] hover:text-[#785a1a] transition-all duration-300 shadow-sm cursor-pointer"
          >
            BOOK YOUR STAY
          </button>

          {/* User Auth / Resident Badge */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-sm hover:bg-[#efe9dc] transition-colors focus:outline-none cursor-pointer"
                aria-label="User Account"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#775a19]/50">
                  <img
                    src={
                      profile?.avatar_url ||
                      'https://lh3.googleusercontent.com/aida/AEtjO1W73mYvv44lZok1oc9jaitEdFnqRZ-ecnx3bEqPMo-i_O66DyQR7CGyabALMgEF7vOR1yZUzXnP9KztJrZu94RjwLvrVw4RGy0_epfaXS2k3NDri7MpZuybrXNIzuCMQfwKin6n8X0xYQrFEg97R_o867uHF9wZlu_b9FGZEVOONAwFBGLX7eZlyj5SfODIIJTijmLY0rzKGarGFnpNTfx_ExhlwnlW6BIx2H8mRp3wvj-bHBuyI2NRbTsVDNnZrOzmP7RxjmW3'
                    }
                    alt="Resident"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {bookingCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#001d0e] text-[#ffffff] font-sans text-[8px] font-bold rounded-full flex items-center justify-center border border-white">
                      {bookingCount}
                    </span>
                  )}
                </div>
                <div className="hidden lg:block text-left text-[11px] leading-tight">
                  <p className="font-semibold text-[#1c1c18] truncate max-w-[100px]">
                    {profile?.first_name || 'Resident'}
                  </p>
                  <p className="text-[9px] text-[#775a19] uppercase tracking-wider">
                    Sovereign
                  </p>
                </div>
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#fcf9f3] border border-[#d6cfbe] shadow-xl rounded-sm py-2 z-50 animate-fade-in text-xs">
                  <div className="px-4 py-2 border-b border-[#e2dcd0]">
                    <p className="font-semibold text-[#1c1c18]">
                      {profile?.first_name} {profile?.last_name}
                    </p>
                    <p className="text-[10px] text-[#7a7466] truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-[#002613] text-[#fed488] text-[9px] uppercase tracking-wider rounded-xs">
                      {profile?.membership_tier || 'Enclave Sovereign'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onNavigate('guest-account');
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-[#f2ede2] flex items-center gap-2 text-[#1c1c18]"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#775a19]" />
                    <span>Resident Portal &amp; Ledger</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenSupabaseConfig?.();
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-[#f2ede2] flex items-center gap-2 text-[#1c1c18]"
                  >
                    <Settings className="w-3.5 h-3.5 text-[#775a19]" />
                    <span>Supabase Backend Settings</span>
                  </button>

                  <div className="border-t border-[#e2dcd0] mt-1 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-700 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth?.('signin')}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#d6cfbe] hover:border-[#775a19] text-[#1c1c18] font-label-caps text-[11px] uppercase tracking-[0.14em] rounded-sm transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-[#775a19]" />
              <span className="hidden sm:inline">Resident Sign In</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#1c1c18] hover:text-[#775a19] transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-20 bg-[#fcf9f3] border-b border-[#e5e2dc] shadow-2xl p-6 transition-all duration-300 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive =
                currentPage === item.id ||
                (item.id === 'rooms-and-suites' && currentPage === 'room-detail');
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left font-label-caps text-[13px] tracking-[0.14em] uppercase py-2 border-b border-[#f0eee8] flex items-center justify-between ${
                    isActive
                      ? 'text-[#001d0e] font-bold pl-2 border-l-2 border-l-[#775a19]'
                      : 'text-[#414843]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="material-symbols-outlined text-sm text-[#775a19]">
                    arrow_forward
                  </span>
                </button>
              );
            })}

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSupabaseConfig?.();
                }}
                className="w-full py-2.5 px-3 bg-[#f2ede2] border border-[#d6cfbe] text-[#002613] text-xs uppercase font-mono tracking-wider rounded-sm flex items-center justify-center gap-2"
              >
                <Database className="w-3.5 h-3.5 text-[#775a19]" />
                <span>
                  {isConfigured ? 'Supabase Backend (Active)' : 'Setup Supabase Backend'}
                </span>
              </button>

              <button
                onClick={() => {
                  onNavigate('reservation');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 bg-[#775a19] text-[#ffffff] font-label-caps text-xs uppercase tracking-widest text-center"
              >
                BOOK YOUR STAY
              </button>
              <div className="text-center font-sans text-xs text-[#727972] pt-1">
                Concierge Direct: +1 (800) 843-3686
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
