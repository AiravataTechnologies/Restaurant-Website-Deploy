import { useState, useEffect } from 'react';
import { ChevronDown, Coffee, Utensils, IceCream, Wine } from 'lucide-react';

// Menu Item Type
const MenuItem = ({ item, category }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTagColor = (tag) => {
    switch(tag) {
      case 'Vegetarian': return 'bg-green-500';
      case 'Gluten Free': return 'bg-blue-500';
      case 'Spicy': return 'bg-red-500';
      case 'Signature': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div 
      className="group relative flex justify-between items-start p-4 border border-gray-100 rounded-lg transition-all duration-300 hover:shadow-lg bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-1 pr-4">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h4 className="font-display font-semibold text-lg">{item.name}</h4>
          {item.tags && item.tags.map((tag) => (
            <span key={tag} className={`${getTagColor(tag)} text-white text-xs px-2 py-1 rounded-full`}>
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        <div className="text-amber-600 font-bold">${item.price}</div>
        
        {/* Preview that appears on hover */}
        {isHovered && (
          <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 rounded-lg shadow-xl overflow-hidden transition-all duration-300 opacity-100 scale-100 origin-bottom bg-white border-2 border-amber-500">
            <div className="relative w-full h-48">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <p className="text-white font-semibold p-3">{item.name}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden border-2 border-amber-500 shadow-md">
        <img 
          src={item.thumbnailUrl} 
          alt={`${item.name} thumbnail`} 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

// Main Menu Component
export function Menu() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isSpicy, setIsSpicy] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  
  // Menu data with high-quality image URLs
  const menuItems = [
    // Starters
    {
      id: 's1',
      name: 'Truffle Arancini',
      description: 'Crispy risotto balls with wild mushrooms and truffle oil',
      price: 14,
      category: 'starters',
      tags: ['Vegetarian'],
      imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=800&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 's2',
      name: 'Tuna Tartare',
      description: 'Fresh tuna with avocado, citrus, and crispy wonton chips',
      price: 16,
      category: 'starters',
      tags: ['Gluten Free'],
      imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=800&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 's3',
      name: 'Burrata Salad',
      description: 'Creamy burrata with heirloom tomatoes and basil pesto',
      price: 15,
      category: 'starters',
      tags: ['Vegetarian', 'Gluten Free'],
      imageUrl: 'https://images.unsplash.com/photo-1505575967455-40e256f73376?q=80&w=800&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1505575967455-40e256f73376?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 's4',
      name: 'Burrata Salad',
      description: 'Creamy burrata with heirloom tomatoes and basil pesto',
      price: 15,
      category: 'starters',
      tags: ['Vegetarian', 'Gluten Free'],
      imageUrl: 'https://images.unsplash.com/photo-1505575967455-40e256f73376?q=80&w=800&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1505575967455-40e256f73376?q=80&w=200&auto=format&fit=crop'
    },
    // Mains
    {
      id: 'm1',
      name: 'Filet Mignon',
      description: '8oz prime cut with peppercorn sauce and roasted vegetables',
      price: 42,
      category: 'mains',
      tags: ['Spicy', 'Signature'],
      imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 'm2',
      name: 'Wild Mushroom Risotto',
      description: 'Creamy arborio rice with wild mushrooms and parmesan',
      price: 28,
      category: 'mains',
      tags: ['Vegetarian'],
      imageUrl: 'https://images.unsplash.com/photo-1606066889831-35faf6fa6ff6?q=80&w=800&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1606066889831-35faf6fa6ff6?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 'm3',
      name: 'Grilled Sea Bass',
      description: 'Mediterranean sea bass with lemon butter and herb salad',
      price: 38,
      category: 'mains',
      tags: ['Gluten Free'],
      imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 'm4',
      name: 'Grilled Sea Bass',
      description: 'Mediterranean sea bass with lemon butter and herb salad',
      price: 38,
      category: 'mains',
      tags: ['Gluten Free'],
      imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=200&auto=format&fit=crop'
    },
    
    // Desserts
    {
      id: 'd1',
      name: 'Tiramisu',
      description: 'Classic Italian dessert with mascarpone and espresso',
      price: 12,
      category: 'desserts',
      tags: ['Signature'],
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 'd2',
      name: 'Crème Brûlée',
      description: 'Vanilla custard with caramelized sugar crust',
      price: 10,
      category: 'desserts',
      tags: ['Gluten Free'],
      imageUrl: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?q=80&w=800&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 'd3',
      name: 'Chocolate Soufflé',
      description: 'Warm chocolate soufflé with vanilla ice cream',
      price: 14,
      category: 'desserts',
      tags: ['Vegetarian'],
      imageUrl: 'https://images.unsplash.com/photo-1511715112108-9acc6c3ff61f?q=80&w=800&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1511715112108-9acc6c3ff61f?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 'd4',
      name: 'New York Cheesecake',
      description: 'Creamy cheesecake with graham cracker crust and berry compote',
      price: 12,
      category: 'desserts',
      tags: ['Vegetarian'],
      imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=200&auto=format&fit=crop'
    },

    
    // Drinks
    {
      id: 'dr1',
      name: 'Signature Martini',
      description: 'House infused gin with elderflower and cucumber',
      price: 18,
      category: 'drinks',
      tags: ['Signature'],
      imageUrl: 'https://images.pexels.com/photos/2647936/pexels-photo-2647936.jpeg?auto=compress&cs=tinysrgb&w=800',
      thumbnailUrl: 'https://images.pexels.com/photos/2647936/pexels-photo-2647936.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 'dr2',
      name: 'Aged Bordeaux',
      description: '2010 Château Margaux, Premier Grand Cru Classé',
      price: 32,
      category: 'drinks',
      tags: [],
      imageUrl: 'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=800',
      thumbnailUrl: 'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 'dr3',
      name: 'Espresso Martini',
      description: 'Vodka, coffee liqueur, and fresh espresso',
      price: 16,
      category: 'drinks',
      tags: ['Vegetarian'],
      imageUrl: 'https://images.pexels.com/photos/4087732/pexels-photo-4087732.jpeg?auto=compress&cs=tinysrgb&w=800',
      thumbnailUrl: 'https://images.pexels.com/photos/4087732/pexels-photo-4087732.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 'dr4',
      name: 'Espresso Martini',
      description: 'Vodka, coffee liqueur, and fresh espresso',
      price: 16,
      category: 'drinks',
      tags: ['Vegetarian'],
      imageUrl: 'https://images.pexels.com/photos/4087732/pexels-photo-4087732.jpeg?auto=compress&cs=tinysrgb&w=800',
      thumbnailUrl: 'https://images.pexels.com/photos/4087732/pexels-photo-4087732.jpeg?auto=compress&cs=tinysrgb&w=200'
    },

  ];

  // Filter menu items
  const filteredItems = menuItems.filter(item => {
    // Category filter
    if (activeCategory !== 'all' && item.category !== activeCategory) {
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
  }, {});

  // Initialize visibility tracking for animations
  useEffect(() => {
    // Set all sections to visible on first load
    const sections = {};
    ['starters', 'mains', 'desserts', 'drinks'].forEach(category => {
      sections[category] = true;
    });
    setVisibleSections(sections);
  }, []);

  // Category info for display
  const categoryInfo = {
    starters: { title: 'Starters', icon: <Utensils size={20} /> },
    mains: { title: 'Main Course', icon: <Utensils size={20} /> },
    desserts: { title: 'Desserts', icon: <IceCream size={20} /> },
    drinks: { title: 'Drinks', icon: <Wine size={20} /> }
  };

  const handleFilterClick = (category) => {
    setActiveCategory(category);
    
    // When changing category, animate sections
    if (category === 'all') {
      setVisibleSections({
        starters: true,
        mains: true,
        desserts: true,
        drinks: true
      });
    } else {
      const newVisibility = {};
      ['starters', 'mains', 'desserts', 'drinks'].forEach(cat => {
        newVisibility[cat] = cat === category;
      });
      setVisibleSections(newVisibility);
    }
  };

  // Determine which categories have items after filtering
  const availableCategories = Object.keys(itemsByCategory);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-600 font-serif text-3xl italic">Culinary Delights</span>
          <h2 className="text-4xl font-bold mt-2 mb-6">Our Menu</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-8"></div>
          <a 
            href="#" 
            className="inline-block mt-4 mb-8 border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white py-2 px-6 rounded-md uppercase text-sm tracking-wider font-medium transition-all duration-300"
          >
            <Coffee className="inline mr-2" size={16} /> Download Full Menu
          </a>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button 
            onClick={() => handleFilterClick('all')}
            className={`py-2 px-6 rounded-md uppercase text-sm tracking-wider font-medium transition-colors duration-300 ${
              activeCategory === 'all' 
                ? 'bg-amber-500 text-white shadow-md' 
                : 'bg-gray-100 hover:bg-amber-100 text-gray-700'
            }`}
          >
            All
          </button>
          
          {Object.entries(categoryInfo).map(([category, info]) => (
            <button 
              key={category}
              onClick={() => handleFilterClick(category)}
              className={`py-2 px-6 rounded-md uppercase text-sm tracking-wider font-medium transition-colors duration-300 ${
                activeCategory === category 
                  ? 'bg-amber-500 text-white shadow-md' 
                  : 'bg-gray-100 hover:bg-amber-100 text-gray-700'
              }`}
            >
              <span className="flex items-center">
                {info.icon}
                <span className="ml-2">{info.title}</span>
              </span>
            </button>
          ))}
        </div>
        
        {/* Tag Filters */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <label className="flex items-center cursor-pointer group">
            <input 
              type="checkbox" 
              checked={isVegetarian}
              onChange={() => setIsVegetarian(!isVegetarian)}
              className="sr-only peer"
            />
            <div className="w-4 h-4 border-2 border-amber-500 rounded flex items-center justify-center mr-2 peer-checked:bg-amber-500">
              {isVegetarian && <ChevronDown size={14} className="text-white" />}
            </div>
            <span className="text-gray-700 text-sm group-hover:text-amber-600 transition-colors">Vegetarian</span>
          </label>
          
          <label className="flex items-center cursor-pointer group">
            <input 
              type="checkbox" 
              checked={isGlutenFree}
              onChange={() => setIsGlutenFree(!isGlutenFree)}
              className="sr-only peer"
            />
            <div className="w-4 h-4 border-2 border-amber-500 rounded flex items-center justify-center mr-2 peer-checked:bg-amber-500">
              {isGlutenFree && <ChevronDown size={14} className="text-white" />}
            </div>
            <span className="text-gray-700 text-sm group-hover:text-amber-600 transition-colors">Gluten Free</span>
          </label>
          
          <label className="flex items-center cursor-pointer group">
            <input 
              type="checkbox" 
              checked={isSpicy}
              onChange={() => setIsSpicy(!isSpicy)}
              className="sr-only peer"
            />
            <div className="w-4 h-4 border-2 border-amber-500 rounded flex items-center justify-center mr-2 peer-checked:bg-amber-500">
              {isSpicy && <ChevronDown size={14} className="text-white" />}
            </div>
            <span className="text-gray-700 text-sm group-hover:text-amber-600 transition-colors">Spicy</span>
          </label>
        </div>
        
        {/* Check if there are no results */}
        {availableCategories.length === 0 && (
          <div className="text-center p-10 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-gray-500">No items match your selected filters.</p>
            <button
              onClick={() => {
                setIsVegetarian(false);
                setIsGlutenFree(false);
                setIsSpicy(false);
                setActiveCategory('all');
              }}
              className="mt-4 text-amber-600 hover:text-amber-700 underline"
            >
              Clear all filters
            </button>
          </div>
        )}
        
        {/* Menu Items */}
        <div className="menu-container space-y-16">
          {['starters', 'mains', 'desserts', 'drinks'].map(category => {
            // Skip categories with no items
            if (!itemsByCategory[category] || itemsByCategory[category].length === 0) {
              return null;
            }
            
            return (
              <div 
                key={category}
                className={`menu-category transition-all duration-500 ${
                  visibleSections[category] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px bg-amber-200 flex-grow max-w-xs"></div>
                  <h3 className="font-display text-2xl font-semibold px-6 flex items-center">
                    {categoryInfo[category].icon}
                    <span className="ml-2">{categoryInfo[category].title}</span>
                  </h3>
                  <div className="h-px bg-amber-200 flex-grow max-w-xs"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {itemsByCategory[category].map(item => (
                    <MenuItem key={item.id} item={item} category={category} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Footer Button */}
        <div className="text-center mt-16">
          <button 
            className="border-2 border-amber-500 bg-white hover:bg-amber-500 transition-all duration-300 text-amber-600 hover:text-white py-3 px-8 rounded-md uppercase text-sm tracking-wider font-medium inline-flex items-center shadow-md hover:shadow-lg"
          >
            <Coffee className="mr-2" size={18} />
            Download Full Menu
          </button>
        </div>
      </div>
    </section>
  );
}

export default Menu;