import { useEffect, useState, useRef } from "react";
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { scrollToSection } from '@/lib/utils';
import { Star, Clock, Award, ChefHat, ArrowRight, PlayCircle, Pause, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ChefsSpecial() {
  const { ref: sectionRef } = useScrollAnimation();
  const { ref: titleRef } = useScrollAnimation();
  const { ref: descriptionRef } = useScrollAnimation();
  const { ref: buttonRef } = useScrollAnimation();
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(null);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // Parallax effect refs
  const parallaxRef = useRef(null);
  const showcaseRef = useRef(null); // Add ref for showcase section
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Enhanced special items with working video URLs
  const specialItems = [
    {
      id: 1,
      name: "Maine Lobster Ravioli",
      description: "Handcrafted pasta filled with succulent lobster, served with a saffron cream sauce and fresh herbs.",
      fullDescription: "Our signature dish features hand-folded ravioli stuffed with sweet Maine lobster meat, ricotta, and fine herbs. Delicately poached and finished with a saffron-infused cream sauce and microgreens from our rooftop garden.",
      price: 38,
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      videoThumbnail: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      // YouTube embed for lobster ravioli cooking
      videoUrl: "https://www.youtube.com/embed/AmC9SmCBUj4?autoplay=1&controls=1&rel=0",
      videoType: "youtube",
      rating: 4.9,
      prepTime: "25 min",
      badge: "Signature",
      chefNote: "The secret is in the emulsion of the sauce, folding in cold butter at the very end for a silky finish."
    },
    {
      id: 2,
      name: "Aged Ribeye Steak",
      description: "30-day dry-aged ribeye, grilled to perfection, served with truffle mashed potatoes and seasonal vegetables.",
      fullDescription: "Prime Black Angus beef, dry-aged for 30 days to enhance tenderness and flavor. Grilled over oak and cherry wood, topped with herbed compound butter, and accompanied by silky truffle-infused potato purée and glazed seasonal vegetables.",
      price: 45,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      videoThumbnail: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      // YouTube embed for ribeye steak cooking
      videoUrl: "https://www.youtube.com/embed/2SEIqdmV-yM?autoplay=1&controls=1&rel=0",
      videoType: "youtube",
      rating: 4.8,
      prepTime: "30 min",
      badge: "Popular",
      chefNote: "I recommend medium-rare to fully appreciate the marbling and deep flavor profile of our dry-aging process."
    },
    {
      id: 3,
      name: "Chocolate Symphony",
      description: "Layered dark chocolate mousse with raspberry coulis, hazelnut crunch, and gold leaf garnish.",
      fullDescription: "A decadent composition of five textures of chocolate: silky Valrhona mousse, crisp tempered shells, moist flourless cake, airy chocolate foam, and velvety ganache. Balanced with tart raspberry coulis and candied hazelnuts for textural contrast.",
      price: 16,
      image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      videoThumbnail: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      // YouTube embed for chocolate dessert
      videoUrl: "https://www.youtube.com/embed/KGECBmYaodQ?si=0MSV3q0oHPK38hTJ&autoplay=1&controls=1&rel=0",
      videoType: "youtube",
      rating: 4.9,
      prepTime: "15 min",
      badge: "New",
      chefNote: "Allow the dessert to sit at room temperature for 5 minutes before enjoying to experience the full range of flavors."
    }
  ];

  // Handle parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (parallaxRef.current) {
        const rect = parallaxRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setParallaxOffset({ x: x / 50, y: y / 50 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-scroll through items every 5 seconds - FIXED: Now stops when video is playing
  useEffect(() => {
    if (autoplayPaused || showVideo) return; // Stop auto-switching when video is playing
    
    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveIndex(prev => (prev + 1) % specialItems.length);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovering, specialItems.length, autoplayPaused, showVideo]); // Added showVideo dependency

  // For cursor spotlight effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleAutoplay = () => {
    setAutoplayPaused(!autoplayPaused);
  };

  const MotionButtonWithHover = ({ children, className, onClick }) => {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={className}
        onClick={onClick}
      >
        {children}
      </motion.button>
    );
  };

  // FIXED: Proper scroll to showcase function
  const scrollToShowcase = () => {
    if (showcaseRef.current) {
      const yOffset = -80; // Offset for header
      const y = showcaseRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-secondary to-secondary/80 text-white overflow-hidden relative">
      {/* Dynamic light effect following cursor */}
      <div 
        className="pointer-events-none absolute opacity-20 bg-gradient-radial from-accent to-transparent rounded-full blur-2xl w-64 h-64 -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          display: showVideo ? 'none' : 'block'
        }}
      />

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-accent"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: -20,
              opacity: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: "120vh",
              opacity: 0
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-16" 
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="text-accent font-script text-3xl inline-block"
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Exclusive Offerings
          </motion.span>
          
          <motion.h2 
            className="font-display text-5xl font-bold mt-3 mb-6" 
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Chef's Special Selection
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-accent mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          />
          
          <motion.p 
            className="max-w-2xl mx-auto text-gray-200 text-lg" 
            ref={descriptionRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Expertly crafted dishes featuring seasonal ingredients and unparalleled culinary techniques.
            Each special reflects Chef Moreau's passion for innovative gastronomy.
          </motion.p>
        </motion.div>
        
        <div className="relative">
          {/* Showcase display with featured item transition - FIXED: Added ref */}
          <div className="lg:flex items-center gap-12 mb-16" ref={showcaseRef}>
            <div className="lg:w-1/2 mb-8 lg:mb-0" ref={parallaxRef}>
              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-2xl group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition-all duration-300 z-10" />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)` 
                    }}
                  >
                    <img 
                      src={specialItems[activeIndex].image} 
                      alt={specialItems[activeIndex].name}
                      className="w-full h-96 object-cover transition-transform duration-700 transform scale-105 group-hover:scale-110"
                    />
                  </motion.div>
                </AnimatePresence>
                
                <motion.div 
                  className="absolute top-4 right-4 bg-accent text-white px-4 py-1 rounded-full text-sm font-medium z-20"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  key={specialItems[activeIndex].badge}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {specialItems[activeIndex].badge}
                </motion.div>
                
                {/* Video play button overlay */}
                <MotionButtonWithHover
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent/90 hover:bg-accent text-white p-4 rounded-full z-20 shadow-lg"
                  onClick={() => setShowVideo(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <PlayCircle className="w-10 h-10" />
                </MotionButtonWithHover>
                
                {/* Autoplay control */}
                <button 
                  className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20"
                  onClick={toggleAutoplay}
                >
                  {autoplayPaused ? 
                    <PlayCircle className="w-5 h-5" /> : 
                    <Pause className="w-5 h-5" />
                  }
                </button>
              </motion.div>
              
              {/* Navigation dots */}
              <div className="flex justify-center mt-6 space-x-3">
                {specialItems.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? "bg-accent w-6" : "bg-white/30 hover:bg-white/50 w-3"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    aria-label={`View ${specialItems[idx].name}`}
                  />
                ))}
              </div>
            </div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              key={activeIndex}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <ChefHat className="text-accent w-5 h-5" />
                <span className="text-accent font-medium tracking-wider uppercase text-sm">Chef's Recommendation</span>
              </div>
              
              <motion.h3 
                className="font-display text-3xl font-bold mt-2 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                {specialItems[activeIndex].name}
              </motion.h3>
              
              <motion.p 
                className="text-gray-200 mb-6 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {showFullDescription ? 
                  specialItems[activeIndex].fullDescription : 
                  specialItems[activeIndex].description}
                <motion.button 
                  className="text-accent ml-2 font-medium"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? "Show Less" : "Read More"}
                </motion.button>
              </motion.p>
              
              {/* Chef's note */}
              <motion.div 
                className="bg-black/30 backdrop-blur-sm p-4 rounded-lg mb-6 border-l-4 border-accent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <ChefHat className="text-accent w-4 h-4" />
                  <span className="text-accent text-sm font-medium">Chef's Note</span>
                </div>
                <p className="text-gray-200 text-sm italic">"{specialItems[activeIndex].chefNote}"</p>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap items-center gap-6 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
                  <Star className="text-yellow-400 w-5 h-5 mr-1" />
                  <span className="font-medium">{specialItems[activeIndex].rating} Rating</span>
                </motion.div>
                <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
                  <Clock className="text-accent w-5 h-5 mr-1" />
                  <span>{specialItems[activeIndex].prepTime}</span>
                </motion.div>
                <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
                  <Award className="text-accent w-5 h-5 mr-1" />
                  <span>Award Winning</span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex items-baseline justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.span 
                  className="text-accent font-display text-3xl font-bold"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  ${specialItems[activeIndex].price}
                </motion.span>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => scrollToSection('booking')}
                    className="bg-accent hover:bg-accent/90 text-white py-3 px-8 rounded-sm uppercase text-sm tracking-wider font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    Reserve Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* All specials in cards format */}
          <motion.h3 
            className="font-display text-2xl font-semibold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            All Special Offerings
          </motion.h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {specialItems.map((item, idx) => (
              <motion.div
                key={item.id}
                className={`bg-black bg-opacity-40 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-accent/20 ${
                  idx === activeIndex ? "ring-2 ring-accent" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                onMouseEnter={() => setIsHovering(idx)}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <motion.div 
                    className="absolute top-3 right-3 bg-accent/90 text-white px-3 py-1 rounded-full text-xs font-medium"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.badge}
                  </motion.div>
                  
                  {/* Quick view button - FIXED */}
                  <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.button
                      className="bg-white text-secondary px-4 py-2 rounded-sm font-medium flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(idx);
                        // Use the proper scroll function
                        setTimeout(() => scrollToShowcase(), 100);
                      }}
                    >
                      <PlayCircle className="w-5 h-5" />
                      Quick View
                    </motion.button>
                  </motion.div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-display text-lg font-semibold">{item.name}</h4>
                    <span className="text-accent font-display font-bold">${item.price}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="text-yellow-400 w-4 h-4 mr-1" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                    <span className="text-sm text-gray-300 flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" />
                      {item.prepTime}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-16" 
            ref={buttonRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => scrollToSection('booking')}
                className="bg-accent hover:bg-accent/90 text-white py-4 px-10 rounded-sm uppercase text-sm tracking-wider font-bold inline-block hover:text-white hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
              >
                Reserve Your Experience
              </Button>
            </motion.div>
            <motion.p 
              className="text-gray-300 mt-4 text-sm"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Limited availability. Reservations recommended 48 hours in advance.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="relative bg-secondary rounded-lg overflow-hidden w-full max-w-4xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <button 
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20"
                onClick={() => setShowVideo(false)}
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="aspect-video bg-black">
                {/* YouTube embed */}
                <iframe
                  src={specialItems[activeIndex].videoUrl}
                  title={`${specialItems[activeIndex].name} cooking video`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-2">{specialItems[activeIndex].name}</h3>
                <p className="text-gray-300 text-sm">{specialItems[activeIndex].fullDescription}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}