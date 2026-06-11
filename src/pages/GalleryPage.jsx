import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ZoomIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Lightbox from '../components/Lightbox';

const galleryImages = [
  { id: 0, title: "Bridal Splendor", category: "Wedding", url: "/images/gallery3.jpeg" },
  { id: 1, title: "Bridal Package Highlight", category: "Wedding", url: "/images/gallery8.jpg" },
  { id: 2, title: "Candid Laughter", category: "Candid", url: "/images/outdoor.jpg" },
  { id: 3, title: "Golden Hour Glow", category: "Pre-Wedding", url: "/images/maternity.png" },
  { id: 4, title: "Tying the Knot", category: "Wedding", url: "/images/gallery5.jpeg" },
  { id: 5, title: "Love in Frames", category: "Pre-Wedding", url: "/images/gallery4.jpg" },
  { id: 6, title: "Pre-Wedding Elegance", category: "Pre-Wedding", url: "/images/gallery9.jpg" },
];

export default function GalleryPage() {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#faf8f5] overflow-x-hidden">
      {/* Header */}
      <div className="relative w-full py-20 md:py-28 bg-[#050505] border-b border-gold-leaf/5">
        <div className="absolute top-[10%] right-[5%] w-80 h-80 rounded-full bg-gold-leaf/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full bg-rose-blush/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-cream-white/50 hover:text-gold-leaf transition-colors duration-300 font-nunito text-xs uppercase tracking-widest mb-8 clickable"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>

          <div className="text-center">
            <span className="font-nunito text-xs uppercase tracking-[0.3em] text-gold-leaf font-semibold mb-3 block">
              THE KNOT PHOTOGRAPHY
            </span>
            <h1 className="font-cormorant text-4xl md:text-6xl text-cream-white font-light tracking-wide">
              Our Gallery
            </h1>
            <div className="w-12 h-[1px] bg-gold-leaf mx-auto mt-4" />
            <p className="font-nunito text-sm text-cream-white/50 mt-6 max-w-lg mx-auto tracking-wider">
              A curated collection of timeless moments captured through our lens
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <motion.div layout className="masonry-grid">
          {galleryImages.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="masonry-item relative group overflow-hidden border border-white/5 bg-black cursor-pointer clickable select-none"
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-auto object-cover md:group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 md:group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-nunito text-[9px] uppercase tracking-widest text-gold-leaf font-bold">
                      {item.category}
                    </span>
                    <h3 className="font-cormorant text-xl text-cream-white tracking-widest font-light mt-1">
                      {item.title}
                    </h3>
                  </div>
                  <div className="p-2 border border-gold-leaf/40 rounded-full text-gold-leaf bg-black/60">
                    <ZoomIn size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        images={galleryImages}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        setActiveIndex={setLightboxIndex}
      />
    </div>
  );
}
