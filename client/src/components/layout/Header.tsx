import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useMobileMenu } from '@/hooks/use-mobile-menu';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { scrollToSection } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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

  const handleNavClick = (sectionId) => {
    closeMenu();
    scrollToSection(sectionId);
  };
  
  // Smooth animation variants with improved easing
  const logoVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.25, 0.1, 0.25, 1] // Custom cubic bezier for natural motion
      } 
    }
  };
  
  const navItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: i => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.06, // More subtle stagger
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };
  
  const mobileNavVariants = {
    hidden: { height: 0, opacity: 0, overflow: "hidden" },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: { 
        height: { duration: 0.4, ease: [0.19, 1, 0.22, 1] }, // Exponential easing
        opacity: { duration: 0.3 },
        when: "beforeChildren",
        staggerChildren: 0.07
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { 
        height: { duration: 0.35, ease: [0.55, 0, 0.1, 1] },
        opacity: { duration: 0.25 },
        when: "afterChildren",
        staggerChildren: 0.03,
        staggerDirection: -1
      },
      overflow: "hidden"
    }
  };
  
  const mobileNavItemVariants = {
    hidden: { opacity: 0, x: -8 }, // Smaller movement for subtlety
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      x: -8,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.03, 
      transition: { duration: 0.25, ease: "easeOut" } 
    },
    tap: { 
      scale: 0.97, 
      transition: { duration: 0.15, ease: [0.55, 0, 0.1, 1] } 
    }
  };
  
  return (
    <motion.header 
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.2, 0.65, 0.3, 0.9],
        delay: 0.1
      }}
      className={`fixed w-full z-50 bg-white ${
  isScrolled 
    ? 'shadow-md py-2 transition-all duration-500 ease-out' 
    : 'py-4 transition-all duration-500 ease-out'
}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            initial="hidden"
            animate="visible"
            variants={logoVariants}
          >
            <Link href="/" className="text-5xl font-script text-amber-500 mr-2">Food Platform</Link>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm font-display text-gray-600 tracking-widest"
            >
              ... Pure Veg. Pure Taste. Pure Joy.
            </motion.span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['home', 'about', 'menu', 'gallery', 'contact'].map((item, i) => (
              <motion.button 
                key={item}
                onClick={() => handleNavClick(item)} 
                className="text-gray-700 hover:text-amber-600 text-sm uppercase tracking-wider font-medium transition-colors duration-300 ease-out"
                initial="hidden"
                animate="visible"
                custom={i}
                variants={navItemVariants}
                whileHover={{ 
                  y: -2, 
                  color: '#d97706', // amber-600 color
                  transition: { duration: 0.2, ease: "easeOut" } 
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.button>
            ))}
          </nav>
          
          <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.5,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <motion.div
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Button 
                onClick={() => handleNavClick('booking')}
                className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-sm uppercase text-sm tracking-wider font-medium transition-all duration-300"
              >
                Book a Table
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Mobile Menu Button */}
          <motion.button 
            onClick={toggleMenu}
            className="md:hidden text-gray-700 focus:outline-none" 
            aria-label="Toggle menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileTap={{ scale: 0.92, transition: { duration: 0.1, ease: "easeOut" } }}
          >
            <i className="fas fa-bars text-2xl"></i>
          </motion.button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden pb-4"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileNavVariants}
            >
              <div className="flex flex-col space-y-3">
                {['home', 'about', 'menu', 'gallery', 'contact'].map((item) => (
                  <motion.button 
                    key={item}
                    onClick={() => handleNavClick(item)} 
                    className="text-gray-700 hover:text-amber-600 text-sm uppercase tracking-wider font-medium transition-colors duration-300 ease-out py-2 border-b border-gray-100 text-left"
                    variants={mobileNavItemVariants}
                    whileHover={{ x: 3, transition: { duration: 0.2 } }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.button>
                ))}
                <motion.div 
                  variants={mobileNavItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    onClick={() => handleNavClick('booking')}
                    className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded-sm uppercase text-sm tracking-wider font-medium text-center mt-2 transition-all duration-300 w-full"
                  >
                    Book a Table
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}