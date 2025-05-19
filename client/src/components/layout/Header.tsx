import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useMobileMenu } from '@/hooks/use-mobile-menu';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { scrollToSection } from '@/lib/utils';

export function Header() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 20;

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, closeMenu]);

  const handleNavClick = (sectionId: string) => {
    closeMenu();
    scrollToSection(sectionId);
  };
  
  return (
    <header className={`fixed w-full z-50 bg-white bg-opacity-95 transition-all ${isScrolled ? 'shadow-md py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-3xl font-script text-accent mr-2">Gusto</Link>
            <span className="text-sm font-display text-primary tracking-widest">FINE DINING</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => handleNavClick('home')} className="nav-link text-sm uppercase tracking-wider font-medium hover:text-accent transition-all">Home</button>
            <button onClick={() => handleNavClick('about')} className="nav-link text-sm uppercase tracking-wider font-medium hover:text-accent transition-all">About</button>
            <button onClick={() => handleNavClick('menu')} className="nav-link text-sm uppercase tracking-wider font-medium hover:text-accent transition-all">Menu</button>
            <button onClick={() => handleNavClick('gallery')} className="nav-link text-sm uppercase tracking-wider font-medium hover:text-accent transition-all">Gallery</button>
            <button onClick={() => handleNavClick('contact')} className="nav-link text-sm uppercase tracking-wider font-medium hover:text-accent transition-all">Contact</button>
          </nav>
          
          <div className="hidden md:block">
            <Button 
              onClick={() => handleNavClick('booking')}
              className="bg-gray-700 hover:bg-black text-white py-2 px-6 rounded-sm uppercase text-sm tracking-wider font-medium hover:text-white transition-all"
            >
              Book a Table
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-secondary focus:outline-none" 
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pb-4`}>
          <div className="flex flex-col space-y-3">
            <button onClick={() => handleNavClick('home')} className="text-sm uppercase tracking-wider font-medium hover:text-accent transition-all py-2 border-b border-gray-100">Home</button>
            <button onClick={() => handleNavClick('about')} className="text-sm uppercase tracking-wider font-medium hover:text-accent transition-all py-2 border-b border-gray-100">About</button>
            <button onClick={() => handleNavClick('menu')} className="text-sm uppercase tracking-wider font-medium hover:text-accent transition-all py-2 border-b border-gray-100">Menu</button>
            <button onClick={() => handleNavClick('gallery')} className="text-sm uppercase tracking-wider font-medium hover:text-accent transition-all py-2 border-b border-gray-100">Gallery</button>
            <button onClick={() => handleNavClick('contact')} className="text-sm uppercase tracking-wider font-medium hover:text-accent transition-all py-2 border-b border-gray-100">Contact</button>
            <Button
              onClick={() => handleNavClick('booking')}
              className="bg-gray-700 hover:bg-black text-white py-2 px-6 rounded-sm uppercase text-sm tracking-wider font-medium text-center mt-2 hover:text-white transition-all"
            >
              Book a Table
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
