import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TableBooking } from "./types";
import { apiRequest } from "./queryClient";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function generateStars(rating: number) {
  // Using JSX with TypeScript requires proper imports and typing
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Using createElement approach instead of JSX
  for (let i = 0; i < fullStars; i++) {
    stars.push('★');
  }

  if (hasHalfStar) {
    stars.push('½');
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push('☆');
  }

  return stars.join('');
}

export async function bookTable(booking: TableBooking) {
  return await apiRequest('POST', '/api/bookings', booking);
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
