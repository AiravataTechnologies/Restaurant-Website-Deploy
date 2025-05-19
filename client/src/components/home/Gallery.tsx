import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GalleryImage } from '@/lib/types';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  
  const { ref: sectionRef } = useScrollAnimation();
  const { ref: galleryRef } = useScrollAnimation();
  
  const { data: galleryImages = [] } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery'],
  });
  
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + galleryImages.length) % galleryImages.length);
  };
  
  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % galleryImages.length);
  };
  
  // If no API data, use fallback gallery data
  const hasGalleryData = galleryImages.length > 0;
  
  const fallbackGalleryImages = [
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
  
  // Use API data if available, otherwise use fallback
  const displayImages = hasGalleryData ? galleryImages : fallbackGalleryImages;
  
  return (
    <section id="gallery" className="py-20 bg-neutral">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in" ref={sectionRef}>
          <span className="text-accent font-script text-3xl">Visual Feast</span>
          <h2 className="font-display text-4xl font-bold mt-2 mb-6">Our Gallery</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 fade-in" ref={galleryRef}>
          {displayImages.map((image, index) => (
            <div 
              key={image.id}
              className="gallery-item overflow-hidden rounded-lg cursor-pointer transition-all hover:shadow-xl"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover transition-all duration-700 hover:scale-110" 
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white text-4xl"
          >
            <i className="fas fa-times"></i>
          </button>
          <button 
            onClick={prevImage}
            className="absolute left-6 text-white text-4xl"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-6 text-white text-4xl"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          <img 
            src={displayImages[currentImageIndex].src} 
            alt={displayImages[currentImageIndex].alt} 
            className="max-h-[80vh] max-w-[80vw] object-contain" 
          />
        </div>
      )}
    </section>
  );
}
