import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Testimonial } from '@/lib/types';
import { generateStars } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef } = useScrollAnimation();

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  const slideWidth = () => {
    if (sliderRef.current) {
      const slide = sliderRef.current.querySelector('.testimonial-slide');
      return slide ? slide.clientWidth : 0;
    }
    return 0;
  };

  const scrollPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -slideWidth(),
        behavior: 'smooth'
      });
    }
  };

  const scrollNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: slideWidth(),
        behavior: 'smooth'
      });
    }
  };

  // If no API data, use fallback testimonials
  const hasTestimonials = testimonials.length > 0;
  
  const fallbackTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Food Critic",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120",
      rating: 5,
      comment: "The dining experience at Gusto was nothing short of exceptional. From the moment we walked in, the staff treated us like royalty. Each dish was a masterpiece, both visually and in flavor. We'll definitely be back!"
    },
    {
      id: 2,
      name: "Michael Roberts",
      role: "Regular Customer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120",
      rating: 5,
      comment: "What a gem! We celebrated our anniversary at Gusto and it was perfect. The Maine Lobster Ravioli was divine, and the staff surprised us with a complimentary dessert. The attention to detail is outstanding."
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Food Blogger",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120",
      rating: 4.5,
      comment: "The ambiance alone is worth the visit - so elegant yet comfortable. Chef Alessandro's seasonal menu showcases fresh ingredients in creative ways. The wine pairing recommendations were spot on. A true culinary destination."
    },
    {
      id: 4,
      name: "John Anderson",
      role: "Wine Enthusiast",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120",
      rating: 5,
      comment: "As a wine enthusiast, I was blown away by Gusto's curated selection. Their sommelier paired the perfect vintage with our meal, enhancing every bite. The ambiance and service were equally impressive."
    },
    {
      id: 5,
      name: "Lisa Tanaka",
      role: "Local Foodie",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120",
      rating: 4.5,
      comment: "I've dined at Gusto multiple times and each visit exceeds my expectations. The seasonal menu is always exciting, and their attention to locally-sourced ingredients makes every dish special. The Aged Ribeye is a must-try!"
    }
  ];
  
  // Use API data if available, otherwise use fallback
  const displayTestimonials = hasTestimonials ? testimonials : fallbackTestimonials;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in" ref={sectionRef}>
          <span className="text-accent font-script text-3xl">What People Say</span>
          <h2 className="font-display text-4xl font-bold mt-2 mb-6">Testimonials</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="relative fade-in">
          <div 
            ref={sliderRef} 
            className="testimonial-slider flex overflow-x-auto pb-10 snap-x scrollbar-hide"
          >
            {displayTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-slide min-w-full md:min-w-[33.333%] px-4 snap-center">
                <div className="bg-neutral p-8 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="text-accent text-xl">
                      {generateStars(testimonial.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.comment}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={`${testimonial.name} portrait`} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-accent" 
                    />
                    <div className="ml-4">
                      <h4 className="font-display font-semibold">{testimonial.name}</h4>
                      <p className="text-accent text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-primary hover:text-accent transition-all hidden md:block z-10"
            variant="ghost"
            size="icon"
          >
            <i className="fas fa-chevron-left text-xl"></i>
          </Button>
          <Button 
            onClick={scrollNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-primary hover:text-accent transition-all hidden md:block z-10"
            variant="ghost"
            size="icon"
          >
            <i className="fas fa-chevron-right text-xl"></i>
          </Button>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2 md:hidden">
          <span className="h-2 w-2 rounded-full bg-accent"></span>
          <span className="h-2 w-2 rounded-full bg-gray-300"></span>
          <span className="h-2 w-2 rounded-full bg-gray-300"></span>
        </div>
      </div>
    </section>
  );
}
