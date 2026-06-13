import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ZoomIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Lightbox from '../components/Lightbox';
import { getGallery, urlFor } from '../lib/sanity';

const fallbackGallery = [
  { _id: 'g1', title: 'Love in the Wild', category: 'Pre-Wedding', url: '/images/prewedding.jpg' },
  { _id: 'g2', title: 'Pre-Wedding Magic', category: 'Pre-Wedding', url: '/images/PREWEDDING.jpeg' },
  { _id: 'g3', title: 'Happily Ever After', category: 'Wedding', url: '/images/postwedding.jpg' },
  { _id: 'g4', title: 'The Big Day', category: 'Wedding', url: '/images/weddings.jpg' },
  { _id: 'g5', title: 'Fashion Story', category: 'Fashion', url: '/images/fashion.jpg' },
  { _id: 'g6', title: 'Precious Moments', category: 'Maternity', url: '/images/maternity.png' },
  { _id: 'g7', title: 'Tiny Treasures', category: 'Baby', url: '/images/babyphotography.png' },
  { _id: 'g8', title: 'Nature Canvas', category: 'Pre-Wedding', url: '/images/outdoor.jpg' },
  { _id: 'g9', title: 'Little Stars', category: 'Kids Studio', url: '/images/kidsstudio1.png' },
  { _id: 'g10', title: 'Kids Studio Magic', category: 'Kids Studio', url: '/images/kidsstudio2.png' },
];

export default function GalleryPage() {
  const navigate = useNavigate();
  const [galleryImages, setGalleryImages] = useState(fallbackGallery);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    getGallery()
      .then((images) => {
        if (images && images.length > 0) {
          setGalleryImages(
            images.map((item) => ({
              _id: item._id,
              title: item.title || '',
              category: item.category || '',
              url: urlFor(item.image).width(800).url(),
            }))
          );
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#faf8f5] overflow-x-hidden">
      <SEO
        title="Gallery"
        description="Browse our curated collection of wedding, pre-wedding, engagement, maternity, baby, and kids studio photography in Nellore, Andhra Pradesh."
        url="https://theknotphotography.com/gallery"
        image="/images/portfolio1.jpg"
      />
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
              key={item._id}
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
