import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ChefHat, Award, GlassWater, ArrowRight, PlayCircle, Pause } from 'lucide-react';

// Custom parallax scroll hook
const useParallax = (value, distance) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

// Video modal component
const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/40 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={videoUrl}
                title="Chef video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Stats counter animation
const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const inView = useInView(countRef);
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    if (inView) {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      };
      
      animationFrame = requestAnimationFrame(step);
    }
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);
  
  return <span ref={countRef}>{count}+</span>;
};

// Chef card component with hover effects
const ChefCard = ({ name, title, bio, imageUrl }) => {
  return (
    <motion.div 
      className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition-all group"
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-64 overflow-hidden relative">
        <motion.img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover object-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 text-white">
            <p className="font-medium">{bio.substring(0, 60)}...</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h4 className="font-display text-xl font-semibold">{name}</h4>
        <p className="text-accent font-medium mt-1">{title}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-gray-600 text-sm line-clamp-2">{bio}</p>
          <motion.button 
            className="text-accent"
            whileHover={{ x: 3 }}
          >
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Testimonial carousel component
const TestimonialCarousel = () => {
  const [active, setActive] = useState(0);
  const testimonials = [
    {
      text: "The culinary experience at Gusto is simply unmatched. Chef Alessandro's passion shines through in every dish.",
      author: "Michael Thompson",
      role: "Food Critic"
    },
    {
      text: "From the ambiance to the service to the food—everything at Gusto speaks of excellence and attention to detail.",
      author: "Sarah Johnson",
      role: "Regular Guest"
    },
    {
      text: "The fusion dishes at Gusto challenge conventional flavor profiles while maintaining a comforting familiarity.",
      author: "David Chen",
      role: "Culinary Magazine Editor"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <div className="relative overflow-hidden bg-gray-50 rounded-lg p-8 shadow-md">
      <div className="absolute top-4 right-4 text-accent/30">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 7l-5 5.5 5 5.5v-11zM18 7l-5 5.5 5 5.5v-11z" />
        </svg>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={active}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="min-h-[160px] flex flex-col justify-between"
        >
          <p className="text-gray-600 italic text-lg mb-6">"{testimonials[active].text}"</p>
          <div>
            <p className="font-display font-semibold">{testimonials[active].author}</p>
            <p className="text-accent text-sm">{testimonials[active].role}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex mt-6">
        {testimonials.map((_, index) => (
          <button 
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${index === active ? 'bg-accent' : 'bg-gray-300'}`}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  );
};

export function About() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const storyRef = useRef(null);
  const inViewStory = useInView(storyRef, { once: false, amount: 0.3 });
  
  const imageRef = useRef(null);
  const inViewImage = useInView(imageRef, { once: false, amount: 0.3 });
  
  const contentRef = useRef(null);
  const inViewContent = useInView(contentRef, { once: false, amount: 0.3 });
  
  const teamRef = useRef(null);
  const inViewTeam = useInView(teamRef, { once: false, amount: 0.3 });
  
  const y1 = useParallax(scrollYProgress, 100);
  const y2 = useParallax(scrollYProgress, -100);
  
  return (
    <section id="about" className="relative pt-16 pb-24 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <motion.div 
        className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-accent/5 z-0"
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute bottom-40 -right-20 w-80 h-80 rounded-full bg-accent/5 z-0"
        style={{ y: y2 }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          ref={storyRef}
          initial={{ opacity: 0, y: 100 }}
          animate={inViewStory ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-script text-3xl inline-block px-4 py-1 rounded-full bg-accent/10">Our Story</span>
          <h2 className="font-display text-5xl font-bold mt-4 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Passion for Exceptional Cuisine</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Since 2005, we've been crafting memorable dining experiences that combine tradition with innovation.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left column with image and video trigger */}
          <motion.div 
            ref={imageRef}
            initial={{ opacity: 0, x: -100 }}
            animate={inViewImage ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative group cursor-pointer" onClick={() => setVideoModalOpen(true)}>
              <motion.div 
                className="absolute -top-6 -left-6 w-32 h-32 bg-accent/20 rounded-lg rotate-3 z-0"
                whileHover={{ rotate: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="bg-white/90 rounded-full p-4 backdrop-blur-sm"
                  >
                    <PlayCircle size={48} className="text-accent" />
                  </motion.div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=3540&auto=format&fit=crop" 
                  alt="Chef plating a gourmet dish" 
                  className="w-full h-auto rounded-lg shadow-lg z-10 relative" 
                />
              </div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 w-28 h-28 bg-accent rounded-lg z-0"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
            </div>
            
            {/* Stats container */}
            <motion.div 
              className="grid grid-cols-3 gap-4 mt-12"
              initial={{ opacity: 0, y: 50 }}
              animate={inViewImage ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform">
                <h4 className="text-3xl font-bold text-accent mb-1"><CountUp end={18} /></h4>
                <p className="text-gray-600 text-sm">Years of Excellence</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform">
                <h4 className="text-3xl font-bold text-accent mb-1"><CountUp end={12000} /></h4>
                <p className="text-gray-600 text-sm">Happy Customers</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform">
                <h4 className="text-3xl font-bold text-accent mb-1"><CountUp end={3} /></h4>
                <p className="text-gray-600 text-sm">Michelin Stars</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right column with content */}
          <motion.div 
            ref={contentRef}
            initial={{ opacity: 0, x: 100 }}
            animate={inViewContent ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inViewContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-display text-3xl font-semibold mb-6">Exceptional Dining Since 2005</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                At Gusto, we believe that dining is more than just eating—it's an experience that engages all your senses. Our journey began with a simple vision: to create a space where exceptional food meets warm hospitality.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Every dish at Gusto tells a story—one of carefully selected ingredients, time-honored techniques, and innovative culinary vision. Our team of passionate chefs, led by the renowned Chef Alessandro, works tirelessly to craft meals that not only satisfy hunger but create lasting memories.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <motion.div 
                className="text-center p-6 rounded-lg hover:bg-accent/5 transition-colors"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inViewContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
                  <ChefHat size={28} />
                </div>
                <h4 className="font-display font-semibold">Finest Ingredients</h4>
                <p className="text-gray-600 text-sm mt-2">Locally sourced, seasonal produce for maximum flavor.</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 rounded-lg hover:bg-accent/5 transition-colors"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inViewContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
                  <Award size={28} />
                </div>
                <h4 className="font-display font-semibold">Award Winning</h4>
                <p className="text-gray-600 text-sm mt-2">Recognized for culinary excellence year after year.</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-6 rounded-lg hover:bg-accent/5 transition-colors"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inViewContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
                  <GlassWater size={28} />
                </div>
                <h4 className="font-display font-semibold">Perfect Ambiance</h4>
                <p className="text-gray-600 text-sm mt-2">Thoughtfully designed space for memorable occasions.</p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inViewContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <TestimonialCarousel />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Enhanced Chef Team Section with animations */}
        <motion.div 
          className="mt-24"
          ref={teamRef}
          initial={{ opacity: 0, y: 100 }}
          animate={inViewTeam ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <motion.span 
              className="text-accent font-script text-3xl inline-block px-4 py-1 rounded-full bg-accent/10"
              initial={{ opacity: 0, y: 20 }}
              animate={inViewTeam ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Culinary Artists
            </motion.span>
            <motion.h3 
              className="font-display text-4xl font-semibold mb-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inViewTeam ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Meet Our Culinary Team
            </motion.h3>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={inViewTeam ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              The heart and soul behind every exceptional dish at Gusto. Our talented chefs bring passion, 
              creativity, and expertise to create unforgettable dining experiences.
            </motion.p>
            <motion.div 
              className="w-16 h-1 bg-accent mx-auto mt-6"
              initial={{ width: 0 }}
              animate={inViewTeam ? { width: 64 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ChefCard 
              name="Alessandro Rossi"
              title="Executive Chef"
              bio="With over 20 years of experience in fine dining, Chef Alessandro brings classical techniques and innovative vision to every dish at Gusto."
              imageUrl="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop"
            />
            
            <ChefCard 
              name="Sofia Martinez"
              title="Pastry Chef"
              bio="Chef Sofia's artistic approach to desserts combines traditional pastry techniques with modern presentation to create memorable sweet finales."
              imageUrl="https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&auto=format&fit=crop"
            />
            
            <ChefCard 
              name="Marco Chen"
              title="Sous Chef"
              bio="Specializing in fusion cuisine, Chef Marco blends Eastern and Western cooking styles to create unique and unforgettable flavor profiles."
              imageUrl="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&auto=format&fit=crop"
            />
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={inViewTeam ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.button 
              className="bg-accent text-white px-8 py-3 rounded-full font-medium inline-flex items-center shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Our Team
              <ArrowRight className="ml-2" size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Video modal for chef showcase */}
      <VideoModal 
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl="https://www.youtube.com/embed/dA0VGEbbw4g" // Example YouTube video of a chef cooking
      />
    </section>
  );
}