export interface SpecialItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  thumbnail: string;
  tags: string[];
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  comment: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export interface TableBooking {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion?: string;
  specialRequests?: string;
}
