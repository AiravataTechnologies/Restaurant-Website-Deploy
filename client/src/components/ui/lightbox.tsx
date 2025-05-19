import { useState, useEffect } from 'react';

interface LightboxProps {
  images: { src: string; alt: string }[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex = 0, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Disable scrolling on body when lightbox is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, currentIndex, images.length]);

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-4xl z-60"
        aria-label="Close lightbox"
      >
        <i className="fas fa-times"></i>
      </button>
      <button 
        onClick={prevImage}
        className="absolute left-6 text-white text-4xl z-60"
        aria-label="Previous image"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button 
        onClick={nextImage}
        className="absolute right-6 text-white text-4xl z-60"
        aria-label="Next image"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
      <img 
        src={images[currentIndex].src} 
        alt={images[currentIndex].alt} 
        className="max-h-[80vh] max-w-[80vw] object-contain" 
      />
    </div>
  );
}
