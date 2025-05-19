import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/utils';

export function Hero() {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Premium restaurant interior" 
          className="object-cover h-full w-full opacity-70" 
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex flex-col justify-center items-center text-center text-white">
        <span className="font-script text-6xl md:text-7xl text-accent mb-4">Gusto</span>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-6 max-w-3xl">A culinary journey through exquisite flavors</h1>
        <p className="text-neutral-200 text-lg md:text-xl mb-10 max-w-2xl">Experience the finest ingredients, expertly crafted into unforgettable dishes in an enchanting atmosphere.</p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <Button 
            onClick={() => scrollToSection('menu')}
            className="bg-accent hover:bg-opacity-90 transition-all text-white py-3 px-8 rounded-sm uppercase text-sm tracking-wider font-medium"
          >
            Explore Our Menu
          </Button>
          <Button 
            onClick={() => scrollToSection('booking')}
            variant="outline"
            className="border-2 border-white hover:bg-white hover:text-secondary transition-all text-white py-3 px-8 rounded-sm uppercase text-sm tracking-wider font-medium"
          >
            Book a Table
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <a href="#about" aria-label="Scroll down">
          <i className="fas fa-chevron-down text-white text-xl"></i>
        </a>
      </div>
    </section>
  );
}
