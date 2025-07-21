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
  
  // Force use of local images (disable API images)
  const hasGalleryData = false; // Changed to false to force local images

  const fallbackGalleryImages = [
    {
      id: 1,
      src: "/images/gallery/dish1.jpg",
      alt: "Gourmet dish presentation"
    },
    {
      id: 2,
      src: "/images/gallery/restaurant-interior.jpg",
      alt: "Restaurant interior ambiance"
    },
    {
      id: 3,
      src: "/images/gallery/chef-cooking.jpg",
      alt: "Chef preparing food"
    },
    {
      id: 4,
      src: "/images/gallery/bartender.jpg",
      alt: "Bartender crafting cocktail"
    },
    {
      id: 5,
      src: "/images/gallery/dessert.jpg",
      alt: "Artisan dessert"
    },
    {
      id: 6,
      src: "/images/gallery/table-setting.jpg",
      alt: "Elegant table setting"
    },
    {
      id: 7,
      src: "/images/gallery/wine-service.jpg",
      alt: "Wine service"
    },
    {
      id: 8,
      src: "/images/gallery/evening-service.jpg",
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