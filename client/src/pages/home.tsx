import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { ChefsSpecial } from '@/components/home/ChefsSpecial';
import { Menu } from '@/components/home/Menu';
import { Gallery } from '@/components/home/Gallery';
import { Testimonials } from '@/components/home/Testimonials';
import { Booking } from '@/components/home/Booking';
import { Contact } from '@/components/home/Contact';

export default function Home() {
  // Load FontAwesome script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js';
    script.defer = true;
    document.head.appendChild(script);
    
    // Set the page title and meta description
    document.title = 'Gusto - Fine Dining Restaurant';
    
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Experience the finest culinary delights at Gusto Restaurant. Book a table for a memorable dining experience featuring gourmet cuisine and exceptional service.';
    document.head.appendChild(metaDescription);
    
    return () => {
      document.head.removeChild(script);
      if (metaDescription.parentNode) {
        document.head.removeChild(metaDescription);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <ChefsSpecial />
        <Menu />
        <Gallery />
        <Testimonials />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
