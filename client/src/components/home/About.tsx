import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function About() {
  const { ref: sectionRef } = useScrollAnimation();
  const { ref: imageRef } = useScrollAnimation();
  const { ref: contentRef } = useScrollAnimation();
  
  return (
    <section id="about" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in" ref={sectionRef}>
          <span className="text-accent font-script text-3xl">Our Story</span>
          <h2 className="font-display text-4xl font-bold mt-2 mb-6">Passion for Exceptional Cuisine</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in" ref={imageRef}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=3540&auto=format&fit=crop" 
                alt="Chef plating a gourmet dish" 
                className="w-full h-auto rounded-lg shadow-lg z-10 relative" 
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-lg hidden md:block"></div>
            </div>
          </div>
          
          <div className="fade-in" ref={contentRef}>
            <h3 className="font-display text-2xl font-semibold mb-4">Exceptional Dining Since 2005</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At Gusto, we believe that dining is more than just eating—it's an experience that engages all your senses. Our journey began with a simple vision: to create a space where exceptional food meets warm hospitality.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Every dish at Gusto tells a story—one of carefully selected ingredients, time-honored techniques, and innovative culinary vision. Our team of passionate chefs, led by the renowned Chef Alessandro, works tirelessly to craft meals that not only satisfy hunger but create lasting memories.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <i className="fas fa-utensils text-accent text-3xl mb-3"></i>
                <h4 className="font-display font-semibold">Finest Ingredients</h4>
                <p className="text-gray-600 text-sm mt-2">Locally sourced, seasonal produce for maximum flavor.</p>
              </div>
              <div className="text-center">
                <i className="fas fa-award text-accent text-3xl mb-3"></i>
                <h4 className="font-display font-semibold">Award Winning</h4>
                <p className="text-gray-600 text-sm mt-2">Recognized for culinary excellence year after year.</p>
              </div>
              <div className="text-center">
                <i className="fas fa-glass-cheers text-accent text-3xl mb-3"></i>
                <h4 className="font-display font-semibold">Perfect Ambiance</h4>
                <p className="text-gray-600 text-sm mt-2">Thoughtfully designed space for memorable occasions.</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-6 mt-2">
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120" 
                  alt="Chef Alessandro" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent" 
                />
                <div className="ml-4">
                  <h4 className="font-display font-semibold">Alessandro Rossi</h4>
                  <p className="text-accent text-sm">Executive Chef</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120" 
                  alt="Chef Sofia" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent" 
                />
                <div className="ml-4">
                  <h4 className="font-display font-semibold">Sofia Martinez</h4>
                  <p className="text-accent text-sm">Pastry Chef</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120" 
                  alt="Chef Marco" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent" 
                />
                <div className="ml-4">
                  <h4 className="font-display font-semibold">Marco Chen</h4>
                  <p className="text-accent text-sm">Sous Chef</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
