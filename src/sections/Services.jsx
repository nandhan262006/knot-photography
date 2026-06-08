import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Film, BookOpen, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const services = [
    {
      id: 0,
      title: "Bridal Photography",
      desc: "Capturing the grace, heritage, and emotions of the bride. Every look, smile, and heavy gold detail preserved.",
      icon: <Sparkles className="w-6 h-6 text-gold-leaf" />,
      image: "/images/bridal.png",
      price: "Enquire for details"
    },
    {
      id: 1,
      title: "Candid Wedding Shoots",
      desc: "Raw, unscripted emotions captured in real-time. The laughter, the tears, and the unseen moments of joy.",
      icon: <Heart className="w-6 h-6 text-gold-leaf" />,
      image: "/images/candid.png",
      price: "Enquire for details"
    },
    {
      id: 2,
      title: "Pre-Wedding Shoots",
      desc: "Cinematic, editorial stories set against breathtaking heritage ruins and scenic sunset backgrounds.",
      icon: <Camera className="w-6 h-6 text-gold-leaf" />,
      image: "/images/prewedding.png",
      price: "Enquire for details"
    },
    {
      id: 3,
      title: "Event Coverage",
      desc: "From massive receptions to intimate family engagements. Every ritual documented with elegance and scale.",
      icon: <Film className="w-6 h-6 text-gold-leaf" />,
      image: "/images/hero_bg.png",
      price: "Enquire for details"
    },
    {
      id: 4,
      title: "Album & Reels",
      desc: "Handcrafted, custom gold-leaf albums combined with short cinematic highlights for social media sharing.",
      icon: <BookOpen className="w-6 h-6 text-gold-leaf" />,
      image: "/images/knot.png",
      price: "Enquire for details"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    
    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section 
      id="services" 
      className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden flex flex-col items-center justify-center border-b border-gold-leaf/5"
    >
      {/* Background Soft Blobs */}
      <div className="absolute top-[10%] right-[5%] w-80 h-80 rounded-full bg-gold-leaf/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full bg-rose-blush/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center relative z-10">
        
        {/* Section Header */}
        <div className="mb-20">
          <span className="font-nunito text-xs uppercase tracking-[0.3em] text-gold-leaf font-semibold mb-3 block">
            OUR OFFERINGS
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl text-cream-white font-light tracking-wide">
            Bespoke Services
          </h2>
          <div className="w-12 h-[1px] bg-gold-leaf mx-auto mt-4" />
        </div>

        {/* 3D Carousel Container */}
        <div className="relative w-full flex flex-col items-center justify-center">
          
          {/* Main 3D Card Stage */}
          <div 
            className="perspective-container relative w-full max-w-[420px] h-[480px] flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="card-deck-3d relative w-full h-full flex items-center justify-center">
              
              {services.map((service, index) => {
                // Calculate angular distance and 3D offset
                const diff = (index - activeIndex + services.length) % services.length;
                
                // Represent offset as -2, -1, 0, 1, 2 for layout centering
                let offset = diff;
                if (offset > services.length / 2) {
                  offset -= services.length;
                }

                const isActive = offset === 0;
                const absOffset = Math.abs(offset);
                
                // Determine 3D values
                const rotateY = offset * 45; // rotation angle
                const translateZ = isActive ? 100 : -100 - (absOffset * 50); // distance depth
                const translateX = offset * 180; // horizontal spread
                const opacity = isActive ? 1 : absOffset === 1 ? 0.6 : 0.15;
                const scale = isActive ? 1 : 0.85;

                return (
                  <div
                    key={service.id}
                    className="absolute w-[300px] sm:w-[340px] h-[430px] rounded-none overflow-hidden transition-all duration-700 ease-out shadow-2xl border border-gold-leaf/10"
                    style={{
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity: opacity,
                      zIndex: 10 - absOffset,
                      pointerEvents: isActive ? 'auto' : 'none',
                      backgroundColor: '#0c0c0c',
                    }}
                  >
                    {/* Full Bleed Image Background */}
                    <div className="absolute inset-0 w-full h-full">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" 
                      />
                      {/* Premium vignette gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />
                    </div>

                    {/* Service Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                      
                      {/* Top icon and category banner */}
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-black/55 border border-gold-leaf/20 flex items-center justify-center">
                          {service.icon}
                        </div>
                        <span className="font-nunito text-[9px] uppercase tracking-[0.2em] bg-gold-leaf text-black px-2 py-0.5 font-bold">
                          Premium
                        </span>
                      </div>

                      {/* Bottom title, description, and action */}
                      <div>
                        <h3 className="font-cormorant text-2xl tracking-widest text-cream-white font-light mb-3">
                          {service.title}
                        </h3>
                        <p className="font-nunito text-xs text-cream-white/70 tracking-wider leading-relaxed mb-6">
                          {service.desc}
                        </p>
                        
                        <div className="h-[1px] w-full bg-gold-leaf/10 mb-4" />
                        
                        <div className="flex justify-between items-center">
                          <span className="font-nunito text-[9px] uppercase tracking-widest text-rose-dusty">
                            {service.price}
                          </span>
                          <a
                            href="https://wa.me/918500563003"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-nunito text-[10px] uppercase tracking-widest text-gold-leaf hover:underline flex items-center gap-1 clickable"
                          >
                            Inquire Now
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center space-x-6 mt-8 z-20">
            <button
              onClick={handlePrev}
              className="p-3 border border-gold-leaf/30 text-gold-leaf hover:bg-gold-leaf hover:text-black transition-all duration-300 rounded-none focus:outline-none clickable"
              aria-label="Previous service"
            >
              <ChevronLeft size={18} />
            </button>
            
            <div className="flex items-center space-x-2">
              {services.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 transition-all duration-300 ${
                    idx === activeIndex ? 'w-8 bg-gold-leaf' : 'w-2 bg-cream-white/20'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 border border-gold-leaf/30 text-gold-leaf hover:bg-gold-leaf hover:text-black transition-all duration-300 rounded-none focus:outline-none clickable"
              aria-label="Next service"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
