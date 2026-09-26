export type RoomCategory = 'deluxe' | 'executive' | 'suites' | 'signature';

export interface RoomSpec {
  areaM2: number;
  areaSqFt: number;
  bed: string;
  maxGuests: number;
  aspect: string;
  level: string;
}

export interface RoomHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface RoomGalleryImage {
  id: string;
  title: string;
  caption: string;
  category: string;
  url: string;
}

export interface Room {
  id: string;
  slug: string;
  name: string;
  refCode: string;
  pavilion: string;
  category: RoomCategory;
  tag: string;
  tagColor?: string;
  tagText?: string;
  pricePerNight: number;
  specs: RoomSpec;
  shortDescription: string;
  longDescription: string;
  amenities: string[];
  keyAmenities: string[];
  heroImage: string;
  galleryImages: RoomGalleryImage[];
  highlights: RoomHighlight[];
  rating: number;
  reviewCount: number;
}

export interface ReservationPrivileges {
  airportTransfer: boolean;
  earlyArrival: boolean;
  featherFree: boolean;
  champagneOnArrival?: boolean;
}

export interface Reservation {
  id: string;
  refCode: string;
  roomId: string;
  roomName: string;
  roomImage: string;
  category: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  privileges: ReservationPrivileges;
  nightlyRate: number;
  subtotal: number;
  serviceFee: number;
  taxes: number;
  total: number;
  status: 'confirmed' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface DiningVenue {
  id: string;
  name: string;
  subtitle: string;
  hours: string;
  dressCode: string;
  description: string;
  atmosphere: string;
  image: string;
  menu: {
    category: string;
    items: {
      name: string;
      description: string;
      price: string;
      dietary?: string;
    }[];
  }[];
}

export interface SanctuaryExperience {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  inclusions: string[];
  description: string;
  price: string;
  image: string;
  category: 'Wellness' | 'Maritime' | 'Culinary' | 'Aviation';
}

export interface SeasonalOffer {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  perks: string[];
  savings: string;
  validUntil: string;
  defaultRoomId: string;
  image: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Chambers' | 'Architecture' | 'Gastronomy' | 'Grounds' | 'Wellness';
  url: string;
  caption: string;
}
