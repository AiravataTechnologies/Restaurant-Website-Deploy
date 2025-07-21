import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/utils';

export function Hero() {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Local video background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/cooking.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex flex-col justify-center items-center text-center text-white">
        <span className="font-script text-8xl md:text-9xl text-accent mb-2">Food Platform</span>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 max-w-4xl">Flavors of Purity Crafted with Passion</h1>
        <p className="text-neutral-200 text-lg md:text-xl mb-10 max-w-3xl">At Food Platform, every dish is a tribute to purity and tradition. Crafted with care, rich in flavor, and served with warmth, experience vegetarian dining at its finest.</p>
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