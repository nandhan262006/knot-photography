import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from '../components/Lightbox';
import { ZoomIn } from 'lucide-react';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const tags = ['All', 'Wedding', 'Pre-Wedding', 'Reception', 'Engagement'];

  const galleryItems = [
    {
      id: 0,
      title: "Tying the Sacred Thread",
      category: "Wedding",
      url: "/images/knot.png"
    },
    {
      id: 1,
      title: "Legacy Vows at Sunset",
      category: "Pre-Wedding",
      url: "/images/prewedding.png"
    },
    {
      id: 2,
      title: "A Golden Gaze",
      category: "Reception",
      url: "/images/bridal.png"
    },
    {
      id: 3,
      title: "Haldi Laughter & Showers",
      category: "Wedding",
      url: "/images/candid.png"
    },
    {
      id: 4,
      title: "Promises of Gold",
      category: "Engagement",
      url: "/images/hero_bg.png"
    },
    {
      id: 5,
      title: "A Saree of Crimson & Gold",
      category: "Engagement",
      url: "/images/bridal.png"
    },
    {
      id: 6,
      title: "Ancient Pathways",
      category: "Pre-Wedding",
      url: "/images/prewedding.png"
    },
    {
      id: 7,
      title: "Heirloom Vows",
      category: "Reception",
      url: "/images/knot.png"
    }
  ];

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const openLightbox = (index) => {
    // Find index of item in filtered list
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section 
      id="portfolio" 
      className="relative w-full py-16 md:py-24 lg:py-32 bg-[#0c0c0c] border-b border-gold-leaf/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-nunito text-xs uppercase tracking-[0.3em] text-gold-leaf font-semibold mb-3 block">
            VISUAL JOURNAL
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl text-cream-white font-light tracking-wide">
            Selected Works
          </h2>
          <div className="w-12 h-[1px] bg-gold-leaf mx-auto mt-4" />
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`font-nunito text-xs uppercase tracking-[0.2em] px-5 py-2.5 transition-all duration-300 border rounded-none cursor-pointer ${
                activeFilter === tag 
                  ? 'border-gold-leaf bg-gold-leaf text-black font-semibold' 
                  : 'border-gold-leaf/20 text-cream-white/70 hover:border-gold-leaf/60 hover:text-cream-white'
              } clickable`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Masonry Grid Layout */}
        <motion.div 
          layout
          className="masonry-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.15 }}
                className="masonry-item relative group overflow-hidden border border-white/5 bg-black cursor-pointer clickable"
                onClick={() => openLightbox(index)}
              >
                {/* Image */}
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 group-hover:brightness-100"
                />

                {/* Hover Reveal Details Overlay */}
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
          </AnimatePresence>
        </motion.div>

        {/* Fullscreen Lightbox Modal */}
        <Lightbox
          isOpen={lightboxOpen}
          images={filteredItems}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          setActiveIndex={setLightboxIndex}
        />

      </div>
    </section>
  );
}
