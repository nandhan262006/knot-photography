import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ isOpen, images, activeIndex, onClose, setActiveIndex }) {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length, setActiveIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length, setActiveIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || images.length === 0) return null;

  // Mobile swipe gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 70) {
      handleNext();
    } else if (diff < -70) {
      handlePrev();
    }
  };

  const activeImage = images[activeIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center select-none"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)', touchAction: 'pan-y' }}
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Control Bar */}
        <div 
          className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="font-cormorant text-cream-white/70 text-sm tracking-widest">
            {activeIndex + 1} / {images.length} — <span className="italic text-gold-leaf">{activeImage.category}</span>
          </div>

          <div className="flex items-center space-x-6 text-cream-white">
            <button 
              onClick={onClose}
              className="hover:text-gold-leaf transition-colors duration-300 focus:outline-none p-1.5 rounded-full hover:bg-white/5 clickable"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Navigation Buttons (Desktop) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-6 text-cream-white/50 hover:text-gold-leaf p-3 rounded-full hover:bg-white/5 transition-all duration-300 hidden md:block z-10 clickable"
          aria-label="Previous image"
        >
          <ChevronLeft size={36} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-6 text-cream-white/50 hover:text-gold-leaf p-3 rounded-full hover:bg-white/5 transition-all duration-300 hidden md:block z-10 clickable"
          aria-label="Next image"
        >
          <ChevronRight size={36} />
        </button>

        {/* Main Image View */}
        <div
          className="w-full max-w-5xl max-h-[70vh] md:max-h-[80vh] px-4 flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.img
            key={activeImage.id}
            src={activeImage.url}
            alt={activeImage.title || "Portfolio showcase"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="max-w-full max-h-[60vh] md:max-h-[75vh] object-contain shadow-2xl border border-white/5"
          />

          <div className="mt-4 text-center">
            <h3 className="font-cormorant text-xl tracking-widest text-cream-white font-light">
              {activeImage.title}
            </h3>
            <p className="font-nunito text-[10px] text-rose-dusty/60 uppercase tracking-widest mt-1">
              THE KNOT Photography · Nellore
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
