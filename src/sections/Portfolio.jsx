import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Lightbox from '../components/Lightbox';
import { ZoomIn, ArrowRight } from 'lucide-react';

const portfolioData = [
  { _id: 'p1', title: 'Eternal Vows', category: 'Wedding', url: '/images/gallery3.jpeg' },
  { _id: 'p2', title: 'Sunset Romance', category: 'Pre-Wedding', url: '/images/gallery4.jpg' },
  { _id: 'p3', title: 'Golden Celebration', category: 'Reception', url: '/images/gallery5.jpeg' },
  { _id: 'p4', title: 'Promise of Forever', category: 'Engagement', url: '/images/gallery6.jpeg' },
  { _id: 'p5', title: 'Sacred Union', category: 'Wedding', url: '/images/gallery7.jpeg' },
  { _id: 'p6', title: 'Together Forever', category: 'Pre-Wedding', url: '/images/gallery8.jpg' },
  { _id: 'p7', title: 'Grand Affair', category: 'Reception', url: '/images/gallery9.jpg' },
  { _id: 'p8', title: 'Blissful Beginnings', category: 'Engagement', url: '/images/gallery10.jpg' },
  { _id: 'p9', title: 'Bridal Elegance', category: 'Wedding', url: '/images/portfolio1.jpg' },
  { _id: 'p10', title: 'Engagement Glow', category: 'Engagement', url: '/images/engagement.jpg' },
  { _id: 'p11', title: 'Engagement Glow', category: 'Engagement', url: '/images/portfolio.jpeg' },

];

export default function Portfolio() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const tags = ['All', 'Wedding', 'Pre-Wedding', 'Reception', 'Engagement'];

  const galleryItems = portfolioData;

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
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-gold-leaf/40" />
            <span className="font-nunito text-[10px] uppercase tracking-[0.4em] text-gold-leaf font-semibold">
              VISUAL JOURNAL
            </span>
            <span className="w-8 h-[1px] bg-gold-leaf/40" />
          </div>
          <h2 className="font-cormorant text-4xl md:text-6xl text-cream-white font-light tracking-wide">
            Selected <span className="text-gold-leaf italic font-normal">Works</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="w-12 h-[1px] bg-gold-leaf" />
            <span className="w-1.5 h-1.5 rounded-full bg-gold-leaf/60" />
            <span className="w-12 h-[1px] bg-gold-leaf" />
          </div>
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

        {/* View Full Gallery CTA */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => navigate('/gallery')}
            className="group flex items-center gap-3 font-nunito text-xs uppercase tracking-[0.25em] border border-gold-leaf/40 hover:border-gold-leaf px-8 py-3.5 text-gold-leaf hover:bg-gold-leaf hover:text-black transition-all duration-300 clickable"
          >
            View My Gallery
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Masonry Grid Layout */}
        <motion.div 
          layout
          className="masonry-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item._id}
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
