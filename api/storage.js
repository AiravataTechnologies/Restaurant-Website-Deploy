// Simplified storage for Vercel serverless functions
class MemStorage {
  constructor() {
    // Initialize with dummy data for presentation
    this.menuItems = [
      {
        id: 1,
        name: "Truffle Arancini",
        description: "Crispy risotto balls with wild mushrooms and truffle oil",
        price: 1400, // $14.00
        image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        thumbnail: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        tags: ["Vegetarian"],
        category: "starters"
      },
      {
        id: 2,
        name: "Tuna Tartare",
        description: "Fresh tuna with avocado, citrus, and crispy wonton chips",
        price: 1600, // $16.00
        image: "https://pixabay.com/get/g2e086f4a232a719fe913dde7f77c567d6eb5cb76a306c7738c517eaa991732a8149dbb3e4af83d3aab6c271421c71bdeedb6a23941a7f97b863003e5546a83a6_1280.jpg",
        thumbnail: "https://pixabay.com/get/ge252886961a64c104430c6f85ff28cf5f6df2ed6a5cec0283e449ef3ea4126347a284b53426bd9784dca7421469571b2440c671bdf8b2741758a86898886513a_1280.jpg",
        tags: ["Gluten Free"],
        category: "starters"
      },
      {
        id: 3,
        name: "Filet Mignon",
        description: "8oz prime cut with peppercorn sauce and roasted vegetables",
        price: 4200, // $42.00
        image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        thumbnail: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        tags: ["Spicy"],
        category: "mains"
      },
      {
        id: 4,
        name: "Wild Mushroom Risotto",
        description: "Creamy arborio rice with wild mushrooms and parmesan",
        price: 2800, // $28.00
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        thumbnail: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        tags: ["Vegetarian"],
        category: "mains"
      },
      {
        id: 5,
        name: "Tiramisu",
        description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
        price: 1200, // $12.00
        image: "https://images.unsplash.com/photo-1551404973-69719d2d1246?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        thumbnail: "https://images.unsplash.com/photo-1551404973-69719d2d1246?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        tags: ["Vegetarian"],
        category: "desserts"
      },
      {
        id: 6,
        name: "Craft Cocktail",
        description: "Seasonal craft cocktail made with premium spirits",
        price: 1400, // $14.00
        image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        thumbnail: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        tags: [],
        category: "drinks"
      }
    ];
    
    this.specialItems = [
      {
        id: 1,
        name: "Maine Lobster Ravioli",
        description: "Handcrafted pasta filled with succulent lobster, served with a saffron cream sauce and fresh herbs.",
        price: 3800, // $38.00
        image: "https://images.unsplash.com/photo-1599021456807-25db0f974333?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
      },
      {
        id: 2,
        name: "Aged Ribeye Steak",
        description: "30-day dry-aged ribeye, grilled to perfection, served with truffle mashed potatoes and seasonal vegetables.",
        price: 4500, // $45.00
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
      },
      {
        id: 3,
        name: "Chocolate Symphony",
        description: "Layered dark chocolate mousse with raspberry coulis, hazelnut crunch, and gold leaf garnish.",
        price: 1600, // $16.00
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
      }
    ];
    
    this.testimonials = [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Food Critic",
        image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120",
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
      }
    ];
    
    this.galleryImages = [
      {
        id: 1,
        src: "https://pixabay.com/get/gcbac02ec206f1adcd34c0b746b40c8d13b5e2ea639faeb361ebe821365a5ae8a72cf7e851439d5d55b144a200ae138b0e6f63cb90e184706ca4f2e1142accc39_1280.jpg",
        alt: "Gourmet dish presentation"
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        alt: "Restaurant interior ambiance"
      },
      {
        id: 3,
        src: "https://pixabay.com/get/gdf6f0bf5a1e040c1a80148dbb6ddf3cf43c7cbcd4744a40e17f1e3536e16e1a566e339ccaff4641fe79af16ae85938ad65ab4c18e3eaa202174687565c08437d_1280.jpg",
        alt: "Chef preparing food"
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        alt: "Bartender crafting cocktail"
      },
      {
        id: 5,
        src: "https://images.unsplash.com/photo-1546039907-7fa05f864c02?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        alt: "Artisan dessert"
      },
      {
        id: 6,
        src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        alt: "Elegant table setting"
      },
      {
        id: 7,
        src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        alt: "Wine service"
      },
      {
        id: 8,
        src: "https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        alt: "Restaurant during evening service"
      }
    ];

    this.tableBookings = new Map();
    this.bookingId = 1;
  }

  async getMenuItems() {
    return this.menuItems;
  }
  
  async getSpecialItems() {
    return this.specialItems;
  }
  
  async getTestimonials() {
    return this.testimonials;
  }
  
  async getGalleryImages() {
    return this.galleryImages;
  }
  
  async createTableBooking(booking) {
    const id = this.bookingId++;
    const now = new Date().toISOString();
    
    const tableBooking = {
      id,
      name: booking.name,
      phone: booking.phone,
      date: booking.date,
      time: booking.time,
      guests: booking.guests,
      occasion: booking.occasion || null,
      specialRequests: booking.specialRequests || null,
      createdAt: now,
      notificationSent: false
    };
    
    this.tableBookings.set(id, tableBooking);
    return tableBooking;
  }
  
  async sendWhatsAppNotification(booking) {
    // In a real application, this would integrate with WhatsApp Business API
    console.log('WhatsApp notification would be sent with the following details:');
    console.log(`Name: ${booking.name}`);
    console.log(`Phone: ${booking.phone}`);
    console.log(`Date: ${booking.date}`);
    console.log(`Time: ${booking.time}`);
    console.log(`Guests: ${booking.guests}`);
    if (booking.occasion) console.log(`Occasion: ${booking.occasion}`);
    if (booking.specialRequests) console.log(`Special Requests: ${booking.specialRequests}`);
    
    return true;
  }
}

export const storage = new MemStorage();