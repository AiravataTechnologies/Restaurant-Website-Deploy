import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, StarHalf, Quote } from 'lucide-react';

// Define testimonial type
export type Testimonial = {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  comment: string;
  date?: string;
}

export function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Enhanced testimonials array with real people images
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Food Critic",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
      rating: 5,
      comment: "The dining experience at Gusto was nothing short of exceptional. From the moment we walked in, the staff treated us like royalty. Each dish was a masterpiece, both visually and in flavor. We'll definitely be back!",
      date: "May 2, 2025"
    },
    {
      id: 2,
      name: "Michael Roberts",
      role: "Regular Customer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      rating: 5,
      comment: "What a gem! We celebrated our anniversary at Gusto and it was perfect. The Maine Lobster Ravioli was divine, and the staff surprised us with a complimentary dessert. The attention to detail is outstanding.",
      date: "April 18, 2025"
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Food Blogger",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      rating: 4.5,
      comment: "The ambiance alone is worth the visit - so elegant yet comfortable. Chef Alessandro's seasonal menu showcases fresh ingredients in creative ways. The wine pairing recommendations were spot on. A true culinary destination.",
      date: "April 10, 2025"
    },
    {
      id: 4,
      name: "John Anderson",
      role: "Wine Enthusiast",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      rating: 5,
      comment: "As a wine enthusiast, I was blown away by Gusto's curated selection. Their sommelier paired the perfect vintage with our meal, enhancing every bite. The ambiance and service were equally impressive.",
      date: "March 28, 2025"
    },
    {
      id: 5,
      name: "Lisa Tanaka",
      role: "Local Foodie",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
      rating: 4.5,
      comment: "I've dined at Gusto multiple times and each visit exceeds my expectations. The seasonal menu is always exciting, and their attention to locally-sourced ingredients makes every dish special. The Aged Ribeye is a must-try!",
      date: "March 15, 2025"
    },
    {
      id: 6,
      name: "David Patel",
      role: "Executive Chef",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      rating: 5,
      comment: "As a fellow chef, I appreciate the technical brilliance behind Gusto's cuisine. Their commitment to traditional techniques while incorporating modern twists shows true culinary artistry. The Osso Buco is particularly outstanding.",
      date: "March 7, 2025"
    },
    {
      id: 7,
      name: "Olivia Martinez",
      role: "Event Planner",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
      rating: 5,
      comment: "We hosted a corporate dinner at Gusto and it exceeded all expectations. The private dining room was elegant, the custom menu was exceptional, and the service was impeccable. Our clients were thoroughly impressed.",
      date: "February 22, 2025"
    },
    {
      id: 8,
      name: "Robert Kim",
      role: "Culinary Instructor",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
      rating: 4.5,
      comment: "Gusto represents the gold standard in Italian dining. Their handmade pasta is among the best I've had outside of Italy. The risotto preparation is textbook perfect - creamy with just the right bite. My students could learn much here.",
      date: "February 14, 2025"
    }
  ];

  // Enhanced device detection
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    
    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  // Calculate total slides with improved responsive logic
  useEffect(() => {
    if (sliderRef.current && testimonials.length) {
      let visibleSlides;
      
      if (isMobile) {
        visibleSlides = 1;
      } else if (isTablet) {
        visibleSlides = 2;
      } else {
        visibleSlides = 3;
      }
      
      const totalSlideCount = Math.max(1, testimonials.length - visibleSlides + 1);
      setTotalSlides(totalSlideCount);
    }
  }, [testimonials, isMobile, isTablet]);

  // Enhanced scroll handling with touch support
  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const scrollLeft = sliderRef.current.scrollLeft;
        const slideWidth = getSlideWidth();
        if (slideWidth > 0) {
          const newActiveSlide = Math.round(scrollLeft / slideWidth);
          setActiveSlide(Math.min(newActiveSlide, totalSlides - 1));
        }
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll);
      return () => slider.removeEventListener('scroll', handleScroll);
    }
  }, [totalSlides]);

  const getSlideWidth = () => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth;
      const gap = 24; // 1.5rem
      
      if (isMobile) {
        return containerWidth;
      } else if (isTablet) {
        return (containerWidth - gap) / 2;
      } else {
        return (containerWidth - 2 * gap) / 3;
      }
    }
    return 0;
  };

  const scrollToSlide = (index: number) => {
    if (sliderRef.current) {
      const slideWidth = getSlideWidth();
      const gap = 24; // 1.5rem
      let scrollPosition;
      
      if (isMobile) {
        scrollPosition = index * slideWidth;
      } else {
        scrollPosition = index * (slideWidth + gap);
      }
      
      sliderRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setActiveSlide(index);
    }
  };

  const scrollPrev = () => {
    const newIndex = Math.max(0, activeSlide - 1);
    scrollToSlide(newIndex);
  };

  const scrollNext = () => {
    const newIndex = Math.min(totalSlides - 1, activeSlide + 1);
    scrollToSlide(newIndex);
  };

  // Generate star rating display with improved styling
  const generateStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400" size={16} />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-yellow-400 text-yellow-400" size={16} />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="text-gray-300" size={16} />);
    }
    
    return (
      <div className="flex gap-0.5 items-center">
        {stars}
        <span className="ml-2 text-sm text-gray-600 font-medium">{rating}</span>
      </div>
    );
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16" ref={sectionRef}>
          <span className="text-2xl sm:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-500 font-serif">
            What Our Guests Say
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-4 sm:mb-6 text-gray-800">
            Guest Experiences
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto rounded-full"></div>
          <p className="max-w-2xl mx-auto mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base">
            Discover why our guests keep coming back to Gusto for their special moments and everyday dining pleasures.
          </p>
        </div>
        
        <div className="relative">
          {/* Enhanced Navigation Buttons for Desktop/Tablet */}
          {!isMobile && (
            <>
              <Button 
                onClick={scrollPrev}
                disabled={activeSlide === 0}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg text-gray-800 hover:text-amber-600 transition-all z-10 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                variant="ghost"
                size="icon"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </Button>
              
              <Button 
                onClick={scrollNext}
                disabled={activeSlide === totalSlides - 1}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg text-gray-800 hover:text-amber-600 transition-all z-10 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                variant="ghost"
                size="icon"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </Button>
            </>
          )}
          
          {/* Enhanced Testimonial Slider */}
          <div 
            ref={sliderRef} 
            className="flex overflow-x-auto gap-6 pb-8 sm:pb-10 snap-x snap-mandatory"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className={`flex-shrink-0 snap-center ${
                  isMobile 
                    ? 'w-full' 
                    : isTablet 
                    ? 'w-[calc(50%-12px)]' 
                    : 'w-[calc(33.333%-16px)]'
                }`}
              >
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col relative group hover:-translate-y-1">
                  <Quote className="absolute top-4 sm:top-6 right-4 sm:right-6 text-gray-200 group-hover:text-amber-200 transition-colors" size={28} />
                  
                  <div className="flex items-center justify-between mb-4">
                    {generateStars(testimonial.rating)}
                  </div>
                  
                  <p className="text-gray-700 italic mb-6 leading-relaxed flex-grow text-sm sm:text-base">
                    "{testimonial.comment}"
                  </p>
                  
                  <div className="border-t border-gray-100 pt-4 sm:pt-6 mt-4 flex items-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-amber-500 flex-shrink-0">
                      <img 
                        src={testimonial.image} 
                        alt={`${testimonial.name} portrait`} 
                        className="w-full h-full object-cover" 
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-3 sm:ml-4 min-w-0">
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                        {testimonial.name}
                      </h4>
                      <p className="text-amber-600 text-xs sm:text-sm truncate">
                        {testimonial.role}
                      </p>
                      {testimonial.date && (
                        <p className="text-gray-400 text-xs mt-1">
                          {testimonial.date}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced Pagination with better mobile spacing */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
          {Array.from({ length: Math.min(8, totalSlides) }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                activeSlide === index 
                  ? 'w-6 sm:w-8 bg-amber-500' 
                  : 'w-2 sm:w-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Enhanced Call to Action */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
            Experience the Gusto difference for yourself
          </p>
          <Button className="bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 text-sm sm:text-base">
            Reserve a Table
          </Button>
        </div>
      </div>
      
      {/* Enhanced styles with better mobile support */}
      <style jsx>{`
        .container > div:first-child::-webkit-scrollbar {
          display: none;
        }
        
        @media (max-width: 767px) {
          .snap-x {
            scroll-snap-type: x mandatory;
          }
          
          .snap-center {
            scroll-snap-align: center;
          }
        }
      `}</style>
    </section>
  );
}