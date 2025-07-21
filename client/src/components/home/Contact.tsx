import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useState, useEffect } from 'react';

export function Contact() {
  const { ref: sectionRef } = useScrollAnimation();
  const { ref: infoRef } = useScrollAnimation();
  const { ref: mapRef } = useScrollAnimation();
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [titleAnimated, setTitleAnimated] = useState(false);
  
  // Social media hover animation states
  const [hoveredIcon, setHoveredIcon] = useState(null);

  // Handle map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Title animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleAnimated(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="contact" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" ref={sectionRef}>
          {/* Animated "Get in Touch" text */}
          <div className="relative mb-2 overflow-hidden h-12 sm:h-16">
            <span 
              className={`text-accent font-script text-3xl sm:text-4xl absolute inset-0 flex justify-center items-center transition-all duration-1000 ${titleAnimated ? 'opacity-100' : 'opacity-0 translate-y-full'}`}
              style={{ 
                transitionDelay: '300ms',
                textShadow: titleAnimated ? '0 0 10px rgba(218, 165, 32, 0.3)' : 'none'
              }}
            >
              Get in Touch
            </span>
          </div>
          
          {/* Animated "Contact Us" heading */}
          <div className="relative overflow-hidden h-16 sm:h-20 mb-6">
            <h2 
              className={`font-display text-4xl sm:text-5xl font-bold absolute inset-0 flex justify-center items-center transition-all duration-1000 ${titleAnimated ? 'opacity-100' : 'opacity-0 translate-y-full'}`}
              style={{ transitionDelay: '500ms' }}
            >
              Contact Us
            </h2>
          </div>
          
          {/* Animated underline */}
          <div className="w-0 h-1 bg-accent mx-auto transition-all duration-1500" style={{ 
            width: titleAnimated ? '80px' : '0',
            transitionDelay: '700ms' 
          }}></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div 
            className="opacity-0 transition-all duration-1000 delay-300" 
            ref={infoRef}
            style={{ 
              opacity: infoRef.current ? 1 : 0, 
              transform: infoRef.current ? 'translateX(0)' : 'translateX(-2rem)' 
            }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <h3 className="font-display text-2xl font-semibold mb-6">Visit Us</h3>
              
              <div className="flex flex-col space-y-6 mb-8">
                <div className="flex items-start group">
                  <div className="bg-accent/10 text-accent w-12 h-12 rounded-full flex items-center justify-center mr-4 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                    <i className="fas fa-map-marker-alt text-lg"></i>
                  </div>
                  <div className="pt-1">
                    <h4 className="font-display font-semibold mb-1">Our Location</h4>
                    <p className="text-gray-600">Krupa Chambers<br />Poona Link Road, Katemanevali Naka<br />Kalyan East, Maharashtra 421306</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-accent/10 text-accent w-12 h-12 rounded-full flex items-center justify-center mr-4 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                    <i className="fas fa-envelope text-lg"></i>
                  </div>
                  <div className="pt-1">
                    <h4 className="font-display font-semibold mb-1">Email Us</h4>
                    <p className="text-gray-600">info@gusto-restaurant.com<br />events@gusto-restaurant.com</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-accent/10 text-accent w-12 h-12 rounded-full flex items-center justify-center mr-4 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                    <i className="fas fa-phone-alt text-lg"></i>
                  </div>
                  <div className="pt-1">
                    <h4 className="font-display font-semibold mb-1">Call Us</h4>
                    <p className="text-gray-600">+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                  </div>
                </div>
              </div>
              
              <h4 className="font-display font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {['facebook-f', 'instagram', 'twitter', 'yelp'].map((platform, index) => (
                  <a 
                    key={platform}
                    href="#" 
                    className="bg-white text-accent hover:bg-accent hover:text-white transition-all duration-300 w-10 h-10 rounded-full flex items-center justify-center shadow-md border border-accent/20"
                    onMouseEnter={() => setHoveredIcon(platform)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    style={{
                      transform: hoveredIcon === platform ? 'translateY(-5px) scale(1.1)' : 'translateY(0) scale(1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      boxShadow: hoveredIcon === platform ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : ''
                    }}
                  >
                    <i className={`fab fa-${platform}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div 
            className="opacity-0 transition-all duration-1000 delay-500" 
            ref={mapRef}
            style={{ 
              opacity: mapRef.current ? 1 : 0, 
              transform: mapRef.current ? 'translateX(0)' : 'translateX(2rem)' 
            }}
          >
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full relative">
              {/* Loading animation overlay */}
              {!isMapLoaded && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                  <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Updated Google Maps iframe with the Krupa Chambers location - Fixed to show full width */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.041379532992!2d73.13842707497912!3d19.227482482005397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be794482ffffff1%3A0x66558c952e371848!2sKrupa%20chembers%2C%20Poona%20link%20road%2C%20Katemanevali%20naka%2C%20Kalyan%20East%2C%20Maharashtra%20421306!5e0!3m2!1sen!2sin!4v1716236544318!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '450px' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Restaurant Location Map"
                onLoad={() => setIsMapLoaded(true)}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}