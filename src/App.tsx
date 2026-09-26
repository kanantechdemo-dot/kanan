import React, { useState, useEffect, useCallback } from 'react';
import { Header, PageId } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { RoomDetailPage } from './pages/RoomDetailPage';
import { ReservationPage } from './pages/ReservationPage';
import { DiningPage } from './pages/DiningPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { OffersPage } from './pages/OffersPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { GuestAccountPage } from './pages/GuestAccountPage';
import { InquiryModal } from './components/InquiryModal';
import { AuthModal } from './components/AuthModal';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { INITIAL_RESERVATIONS } from './data/hotelData';
import { Reservation } from './types/hotel';
import { fetchReservations, cancelReservation } from './services/reservationService';

function SanctuaryApp() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageId>('rooms-and-suites');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('deluxe-room');

  // Booking initial state passed to reservation page
  const [bookingCheckIn, setBookingCheckIn] = useState<string>('2024-10-14');
  const [bookingCheckOut, setBookingCheckOut] = useState<string>('2024-10-17');
  const [bookingGuests, setBookingGuests] = useState<number>(2);

  // Stored reservations in state, synchronized with Supabase
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);

  // Modals state
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: 'signin' | 'signup';
  }>({
    isOpen: false,
    mode: 'signin',
  });

  const [supabaseConfigOpen, setSupabaseConfigOpen] = useState(false);

  // Global Concierge / Custom Inquiry Modal
  const [inquiryModal, setInquiryModal] = useState<{
    isOpen: boolean;
    topic?: string;
    roomName?: string;
  }>({
    isOpen: false,
  });

  // Load reservations from Supabase or local storage
  const loadReservations = useCallback(async () => {
    try {
      const data = await fetchReservations(user?.id);
      if (data && data.length > 0) {
        setReservations(data);
      }
    } catch (e) {
      console.warn('Error loading reservations:', e);
    }
  }, [user]);

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  const handleNavigate = (page: PageId, roomId?: string) => {
    if (roomId) {
      setSelectedRoomId(roomId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRoomForBooking = (
    roomId: string,
    checkIn?: string,
    checkOut?: string,
    guests?: number
  ) => {
    setSelectedRoomId(roomId);
    if (checkIn) setBookingCheckIn(checkIn);
    if (checkOut) setBookingCheckOut(checkOut);
    if (guests) setBookingGuests(guests);
    setCurrentPage('reservation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveReservation = (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);
    // Refresh to verify Supabase state
    setTimeout(() => {
      loadReservations();
    }, 500);
  };

  const handleCancelReservation = async (resId: string, refCode?: string) => {
    await cancelReservation(resId, refCode);
    setReservations((prev) =>
      prev.map((r) =>
        r.id === resId || (refCode && r.refCode === refCode)
          ? { ...r, status: 'cancelled' as const }
          : r
      )
    );
  };

  const handleOpenInquiry = (topic?: string, roomName?: string) => {
    setInquiryModal({
      isOpen: true,
      topic: topic || 'Bespoke Sanctuary Arrangement',
      roomName: roomName || undefined,
    });
  };

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModal({
      isOpen: true,
      mode,
    });
  };

  const activeReservationsCount = reservations.filter(
    (r) => r.status === 'confirmed'
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f3] text-[#1c1c18]">
      {/* Fixed Top Bar Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        bookingCount={activeReservationsCount}
        onOpenAuth={handleOpenAuth}
        onOpenSupabaseConfig={() => setSupabaseConfigOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiry}
            onSelectRoomForBooking={handleSelectRoomForBooking}
          />
        )}

        {currentPage === 'rooms-and-suites' && (
          <RoomsPage
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiry}
            onSelectRoomForBooking={handleSelectRoomForBooking}
          />
        )}

        {currentPage === 'room-detail' && (
          <RoomDetailPage
            roomId={selectedRoomId}
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiry}
            onSelectRoomForBooking={handleSelectRoomForBooking}
          />
        )}

        {currentPage === 'dining' && <DiningPage onNavigate={handleNavigate} />}

        {currentPage === 'experiences' && (
          <ExperiencesPage
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiry}
          />
        )}

        {currentPage === 'offers' && (
          <OffersPage
            onNavigate={handleNavigate}
            onSelectRoomForBooking={handleSelectRoomForBooking}
          />
        )}

        {currentPage === 'gallery' && <GalleryPage />}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiry}
          />
        )}

        {currentPage === 'contact' && <ContactPage />}

        {currentPage === 'reservation' && (
          <ReservationPage
            selectedRoomId={selectedRoomId}
            initialCheckIn={bookingCheckIn}
            initialCheckOut={bookingCheckOut}
            initialGuests={bookingGuests}
            onNavigate={handleNavigate}
            onSaveReservation={handleSaveReservation}
          />
        )}

        {currentPage === 'guest-account' && (
          <GuestAccountPage
            reservations={reservations}
            onNavigate={handleNavigate}
            onCancelReservation={handleCancelReservation}
            onOpenAuth={handleOpenAuth}
          />
        )}
      </main>

      {/* Global Sanctuary Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenInquiry={(topic) => handleOpenInquiry(topic)}
        onOpenSupabaseConfig={() => setSupabaseConfigOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

      {/* Global Concierge & Custom Stay Curation Modal */}
      <InquiryModal
        isOpen={inquiryModal.isOpen}
        onClose={() => setInquiryModal({ isOpen: false })}
        initialTopic={inquiryModal.topic}
        roomName={inquiryModal.roomName}
      />

      {/* Resident Authentication Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'signin' })}
      />

      {/* Supabase Database Configuration & Diagnostics Modal */}
      <SupabaseConfigModal
        isOpen={supabaseConfigOpen}
        onClose={() => setSupabaseConfigOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SanctuaryApp />
    </AuthProvider>
  );
}
