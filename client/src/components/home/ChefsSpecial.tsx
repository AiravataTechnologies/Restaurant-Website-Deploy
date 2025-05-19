import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { SpecialItem } from '@/lib/types';
import { scrollToSection } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

export function ChefsSpecial() {
  const { ref: sectionRef } = useScrollAnimation();
  const { ref: itemsRef } = useScrollAnimation();
  const { ref: buttonRef } = useScrollAnimation();
  
  const { data: specialItems = [] } = useQuery<SpecialItem[]>({
    queryKey: ['/api/special-menu'],
  });
  
  return (
    <section className="py-20 bg-secondary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in" ref={sectionRef}>
          <span className="text-accent font-script text-3xl">Exclusive Offer</span>
          <h2 className="font-display text-4xl font-bold mt-2 mb-6">Chef's Special</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={itemsRef}>
          {specialItems.length > 0 ? (
            specialItems.map((item) => (
              <div 
                key={item.id}
                className="bg-black bg-opacity-30 p-6 rounded-lg text-center transition-all hover:transform hover:scale-105 fade-in"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-64 object-cover rounded-lg mb-6" 
                />
                <h3 className="font-display text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                <span className="text-accent font-display font-semibold">${item.price}</span>
              </div>
            ))
          ) : (
            // Fallback content if no items from API
            <>
              <div className="bg-black bg-opacity-30 p-6 rounded-lg text-center transition-all hover:transform hover:scale-105 fade-in">
                <img 
                  src="https://images.unsplash.com/photo-1599021456807-25db0f974333?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                  alt="Maine Lobster Ravioli" 
                  className="w-full h-64 object-cover rounded-lg mb-6" 
                />
                <h3 className="font-display text-xl font-semibold mb-2">Maine Lobster Ravioli</h3>
                <p className="text-gray-300 text-sm mb-4">Handcrafted pasta filled with succulent lobster, served with a saffron cream sauce and fresh herbs.</p>
                <span className="text-accent font-display font-semibold">$38</span>
              </div>
              
              <div className="bg-black bg-opacity-30 p-6 rounded-lg text-center transition-all hover:transform hover:scale-105 fade-in">
                <img 
                  src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                  alt="Aged Ribeye Steak" 
                  className="w-full h-64 object-cover rounded-lg mb-6" 
                />
                <h3 className="font-display text-xl font-semibold mb-2">Aged Ribeye Steak</h3>
                <p className="text-gray-300 text-sm mb-4">30-day dry-aged ribeye, grilled to perfection, served with truffle mashed potatoes and seasonal vegetables.</p>
                <span className="text-accent font-display font-semibold">$45</span>
              </div>
              
              <div className="bg-black bg-opacity-30 p-6 rounded-lg text-center transition-all hover:transform hover:scale-105 fade-in">
                <img 
                  src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                  alt="Chocolate Symphony" 
                  className="w-full h-64 object-cover rounded-lg mb-6" 
                />
                <h3 className="font-display text-xl font-semibold mb-2">Chocolate Symphony</h3>
                <p className="text-gray-300 text-sm mb-4">Layered dark chocolate mousse with raspberry coulis, hazelnut crunch, and gold leaf garnish.</p>
                <span className="text-accent font-display font-semibold">$16</span>
              </div>
            </>
          )}
        </div>
        
        <div className="text-center mt-12 fade-in" ref={buttonRef}>
          <Button 
            onClick={() => scrollToSection('booking')}
            className="bg-accent hover:bg-opacity-90 transition-all text-white py-3 px-8 rounded-sm uppercase text-sm tracking-wider font-medium inline-block"
          >
            Reserve a Table
          </Button>
        </div>
      </div>
    </section>
  );
}
