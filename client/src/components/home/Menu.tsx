import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { MenuItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function Menu() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isVegetarian, setIsVegetarian] = useState<boolean>(false);
  const [isGlutenFree, setIsGlutenFree] = useState<boolean>(false);
  const [isSpicy, setIsSpicy] = useState<boolean>(false);

  const { ref: sectionRef } = useScrollAnimation();
  const { ref: filterRef } = useScrollAnimation();
  const { ref: menuRef } = useScrollAnimation();
  const { ref: buttonRef } = useScrollAnimation();

  const { data: menuItems = [] } = useQuery<MenuItem[]>({
    queryKey: ['/api/menu-items'],
  });

  const filteredItems = menuItems.filter(item => {
    // Category filter
    if (activeFilter !== 'all' && item.category !== activeFilter) {
      return false;
    }

    // Tag filters
    if (isVegetarian && !item.tags.includes('Vegetarian')) {
      return false;
    }
    if (isGlutenFree && !item.tags.includes('Gluten Free')) {
      return false;
    }
    if (isSpicy && !item.tags.includes('Spicy')) {
      return false;
    }

    return true;
  });

  // Group items by category
  const itemsByCategory = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  // Category titles for display
  const categoryTitles: Record<string, string> = {
    starters: 'Starters',
    mains: 'Main Course',
    desserts: 'Desserts',
    drinks: 'Drinks'
  };

  // If no API data, use fallback data
  const hasMenuItems = menuItems.length > 0;

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in" ref={sectionRef}>
          <span className="text-accent font-script text-3xl">Culinary Delights</span>
          <h2 className="font-display text-4xl font-bold mt-2 mb-6">Our Menu</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-10"></div>
          <a 
            href="#" 
            className="inline-block mt-4 mb-8 border-2 border-accent text-accent hover:bg-accent hover:text-white py-2 px-6 rounded-sm uppercase text-sm tracking-wider font-medium transition-all"
          >
            <i className="fas fa-download mr-2"></i> Download Full Menu
          </a>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10" ref={filterRef}>
            <Button 
              onClick={() => setActiveFilter('all')}
              className={`py-2 px-6 rounded-sm uppercase text-sm tracking-wider font-medium ${
                activeFilter === 'all' 
                  ? 'bg-accent text-white' 
                  : 'bg-gray-200 hover:bg-accent hover:text-white transition-all'
              }`}
            >
              All
            </Button>
            <Button 
              onClick={() => setActiveFilter('starters')}
              className={`py-2 px-6 rounded-sm uppercase text-sm tracking-wider font-medium ${
                activeFilter === 'starters' 
                  ? 'bg-accent text-white' 
                  : 'bg-gray-200 hover:bg-accent hover:text-white transition-all'
              }`}
            >
              Starters
            </Button>
            <Button 
              onClick={() => setActiveFilter('mains')}
              className={`py-2 px-6 rounded-sm uppercase text-sm tracking-wider font-medium ${
                activeFilter === 'mains' 
                  ? 'bg-accent text-white' 
                  : 'bg-gray-200 hover:bg-accent hover:text-white transition-all'
              }`}
            >
              Main Course
            </Button>
            <Button 
              onClick={() => setActiveFilter('desserts')}
              className={`py-2 px-6 rounded-sm uppercase text-sm tracking-wider font-medium ${
                activeFilter === 'desserts' 
                  ? 'bg-accent text-white' 
                  : 'bg-gray-200 hover:bg-accent hover:text-white transition-all'
              }`}
            >
              Desserts
            </Button>
            <Button 
              onClick={() => setActiveFilter('drinks')}
              className={`py-2 px-6 rounded-sm uppercase text-sm tracking-wider font-medium ${
                activeFilter === 'drinks' 
                  ? 'bg-accent text-white' 
                  : 'bg-gray-200 hover:bg-accent hover:text-white transition-all'
              }`}
            >
              Drinks
            </Button>
          </div>
          
          {/* Sub Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center mr-4">
              <Checkbox 
                id="vegetarian" 
                checked={isVegetarian}
                onCheckedChange={(checked) => setIsVegetarian(checked === true)}
                className="h-4 w-4 text-accent"
              />
              <Label htmlFor="vegetarian" className="ml-2 text-gray-700 text-sm">Vegetarian</Label>
            </div>
            <div className="flex items-center mr-4">
              <Checkbox 
                id="gluten-free" 
                checked={isGlutenFree}
                onCheckedChange={(checked) => setIsGlutenFree(checked === true)}
                className="h-4 w-4 text-accent"
              />
              <Label htmlFor="gluten-free" className="ml-2 text-gray-700 text-sm">Gluten Free</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="spicy" 
                checked={isSpicy}
                onCheckedChange={(checked) => setIsSpicy(checked === true)}
                className="h-4 w-4 text-accent"
              />
              <Label htmlFor="spicy" className="ml-2 text-gray-700 text-sm">Spicy</Label>
            </div>
          </div>
        </div>
        
        <div className="menu-container" ref={menuRef}>
          {hasMenuItems ? (
            // Render menu items from API
            Object.entries(itemsByCategory).map(([category, items]) => (
              <div key={category} className="menu-category fade-in mt-16" data-category={category}>
                <h3 className="font-display text-2xl font-semibold mb-8 text-center">{categoryTitles[category]}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  {items.map((item) => (
                    <div key={item.id} className="menu-item group relative flex justify-between items-start pb-4 border-b border-gray-200">
                      <div>
                        <div className="flex items-center mb-1">
                          <h4 className="font-display font-semibold text-lg mr-2">{item.name}</h4>
                          {item.tags.map((tag) => {
                            let bgColor = 'bg-accent';
                            if (tag === 'Spicy') bgColor = 'bg-red-500';
                            if (tag === 'Gluten Free') bgColor = 'bg-green-600';
                            if (tag === 'Signature') bgColor = 'bg-secondary';
                            
                            return (
                              <span key={tag} className={`${bgColor} text-white text-xs px-2 py-1 rounded-full mr-1`}>
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{item.description}</p>
                        <div className="text-accent font-semibold mt-2">${item.price}</div>
                        
                        {/* Hover Preview */}
                        <div className="menu-preview absolute left-0 bottom-full mb-2 z-40 w-60 h-48 bg-white rounded-lg shadow-xl overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
                        <img src={item.thumbnail} alt={`${item.name} thumbnail`} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Fallback menu items when API data is not available
            <>
              {/* Starters */}
              <div className="menu-category fade-in" data-category="starters">
                <h3 className="font-display text-2xl font-semibold mb-8 text-center">Starters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="menu-item group relative flex justify-between items-start pb-4 border-b border-gray-200">
                    <div>
                      <div className="flex items-center mb-1">
                        <h4 className="font-display font-semibold text-lg mr-2">Truffle Arancini</h4>
                        <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">Vegetarian</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">Crispy risotto balls with wild mushrooms and truffle oil</p>
                      <div className="text-accent font-semibold mt-2">$14</div>
                      
                      {/* Hover Preview */}
                      <div className="menu-preview absolute left-0 bottom-full mb-2 z-40 w-48 h-48 bg-white rounded-lg shadow-xl overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1628557044797-f21a177c37ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300" alt="Truffle Arancini" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1628557044797-f21a177c37ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" alt="Truffle Arancini thumbnail" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  <div className="menu-item group relative flex justify-between items-start pb-4 border-b border-gray-200">
                    <div>
                      <div className="flex items-center mb-1">
                        <h4 className="font-display font-semibold text-lg mr-2">Tuna Tartare</h4>
                        <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">Gluten Free</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">Fresh tuna with avocado, citrus, and crispy wonton chips</p>
                      <div className="text-accent font-semibold mt-2">$16</div>
                      
                      {/* Hover Preview */}
                      <div className="menu-preview absolute left-0 bottom-full mb-2 z-40 w-48 h-48 bg-white rounded-lg shadow-xl overflow-hidden">
                        <img src="https://pixabay.com/get/g2e086f4a232a719fe913dde7f77c567d6eb5cb76a306c7738c517eaa991732a8149dbb3e4af83d3aab6c271421c71bdeedb6a23941a7f97b863003e5546a83a6_1280.jpg" alt="Tuna Tartare" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
                      <img src="https://pixabay.com/get/ge252886961a64c104430c6f85ff28cf5f6df2ed6a5cec0283e449ef3ea4126347a284b53426bd9784dca7421469571b2440c671bdf8b2741758a86898886513a_1280.jpg" alt="Tuna Tartare thumbnail" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Course */}
              <div className="menu-category fade-in mt-16" data-category="mains">
                <h3 className="font-display text-2xl font-semibold mb-8 text-center">Main Course</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="menu-item group relative flex justify-between items-start pb-4 border-b border-gray-200">
                    <div>
                      <div className="flex items-center mb-1">
                        <h4 className="font-display font-semibold text-lg mr-2">Filet Mignon</h4>
                        <span className="bg-error text-white text-xs px-2 py-1 rounded-full">Spicy</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">8oz prime cut with peppercorn sauce and roasted vegetables</p>
                      <div className="text-accent font-semibold mt-2">$42</div>
                      
                      {/* Hover Preview */}
                      <div className="menu-preview absolute left-0 bottom-full mb-2 z-40 w-48 h-48 bg-white rounded-lg shadow-xl overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300" alt="Filet Mignon" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" alt="Filet Mignon thumbnail" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  <div className="menu-item group relative flex justify-between items-start pb-4 border-b border-gray-200">
                    <div>
                      <div className="flex items-center mb-1">
                        <h4 className="font-display font-semibold text-lg mr-2">Wild Mushroom Risotto</h4>
                        <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">Vegetarian</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">Creamy arborio rice with wild mushrooms and parmesan</p>
                      <div className="text-accent font-semibold mt-2">$28</div>
                      
                      {/* Hover Preview */}
                      <div className="menu-preview absolute left-0 bottom-full mb-2 z-40 w-48 h-48 bg-white rounded-lg shadow-xl overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300" alt="Wild Mushroom Risotto" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" alt="Wild Mushroom Risotto thumbnail" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Desserts */}
              <div className="menu-category fade-in mt-16" data-category="desserts">
                <h3 className="font-display text-2xl font-semibold mb-8 text-center">Desserts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="menu-item group relative flex justify-between items-start pb-4 border-b border-gray-200">
                    <div>
                      <div className="flex items-center mb-1">
                        <h4 className="font-display font-semibold text-lg mr-2">Tiramisu</h4>
                        <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">Signature</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">Classic Italian dessert with mascarpone and espresso</p>
                      <div className="text-accent font-semibold mt-2">$12</div>
                      
                      {/* Hover Preview */}
                      <div className="menu-preview absolute left-0 bottom-full mb-2 z-40 w-48 h-48 bg-white rounded-lg shadow-xl overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300" alt="Tiramisu" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" alt="Tiramisu thumbnail" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  <div className="menu-item group relative flex justify-between items-start pb-4 border-b border-gray-200">
                    <div>
                      <div className="flex items-center mb-1">
                        <h4 className="font-display font-semibold text-lg mr-2">Crème Brûlée</h4>
                        <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">Gluten Free</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">Vanilla custard with caramelized sugar crust</p>
                      <div className="text-accent font-semibold mt-2">$10</div>
                      
                      {/* Hover Preview */}
                      <div className="menu-preview absolute left-0 bottom-full mb-2 z-40 w-48 h-48 bg-white rounded-lg shadow-xl overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300" alt="Crème Brûlée" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" alt="Crème Brûlée thumbnail" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Drinks */}
              <div className="menu-category fade-in mt-16" data-category="drinks">
                <h3 className="font-display text-2xl font-semibold mb-8 text-center">Drinks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="menu-item group relative flex justify-between items-start pb-4 border-b border-gray-200">
                    <div>
                      <div className="flex items-center mb-1">
                        <h4 className="font-display font-semibold text-lg mr-2">Signature Martini</h4>
                        <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">Signature</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">House infused gin with elderflower and cucumber</p>
                      <div className="text-accent font-semibold mt-2">$18</div>
                      
                      {/* Hover Preview */}
                      <div className="menu-preview absolute left-0 bottom-full mb-2 z-40 w-48 h-48 bg-white rounded-lg shadow-xl overflow-hidden">
                        <img src="https://pixabay.com/get/g47eb07a96795a5c4c7687f4fa9aef164263912c121e43ba8bed963e7f547f176b044bc7f4a7cca8e514f94282dbc3a30b9e6df4fb5766a52de91e5a2bc8601df_1280.jpg" alt="Signature Martini" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
                      <img src="https://pixabay.com/get/gb7c717affe56d7170d6f6b6b8ceb0166e70ada7b9e34d40ff06c39c80f73533e98f53e2c1dde43d38737f77daa878251c438118dee5dc255067d1baf0e88e80d_1280.jpg" alt="Signature Martini thumbnail" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  <div className="menu-item group relative flex justify-between items-start pb-4 border-b border-gray-200">
                    <div>
                      <div className="flex items-center mb-1">
                        <h4 className="font-display font-semibold text-lg mr-2">Aged Bordeaux</h4>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">2010 Château Margaux, Premier Grand Cru Classé</p>
                      <div className="text-accent font-semibold mt-2">$32 / glass</div>
                      
                      {/* Hover Preview */}
                      <div className="menu-preview absolute left-0 bottom-full mb-2 z-40 w-48 h-48 bg-white rounded-lg shadow-xl overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300" alt="Aged Bordeaux" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" alt="Aged Bordeaux thumbnail" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="text-center mt-16 fade-in" ref={buttonRef}>
          <Button 
            className="border-2 border-accent hover:bg-accent hover:text-white transition-all text-accent py-3 px-8 rounded-sm uppercase text-sm tracking-wider font-medium inline-block"
          >
            Download Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
}
