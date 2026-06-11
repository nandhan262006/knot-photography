import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const activeIndexRef = useRef(activeIndex);
  const containerRef = useRef(null);

  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);

  const services = [
    { id: 0, title: "Engagement", image: "/images/engagement.jpg" },
    { id: 1, title: "Weddings", image: "/images/weddings.jpg" },
    { id: 2, title: "Post Wedding", image: "/images/postwedding.jpg" },
    { id: 3, title: "Pre Wedding", image: "/images/prewedding.jpg" },
    { id: 4, title: "Fashion Photography", image: "/images/fashion.jpg" },
    { id: 5, title: "Outdoor Photography", image: "/images/outdoor.jpg" },
    { id: 6, title: "Baby Photography", image: "/images/babyphotography.png" },
    { id: 7, title: "Maternity Shoot", image: "/images/maternity.png" },
    { id: 8, title: "Product", image: "/images/product.jpg" }
  ];

  const getCardWidth = () =>
    window.innerWidth < 640 ? 280 : window.innerWidth < 768 ? 300 : 340;

  const sensitivity = 0.55;

  const snapTo = useCallback((fromIndex, direction) => {
    const n = services.length;
    if (direction > 0) setActiveIndex((fromIndex + 1) % n);
    else if (direction < 0) setActiveIndex((fromIndex - 1 + n) % n);
  }, [services.length]);

  const handlePointerDown = useCallback((e) => {
    startXRef.current = e.clientX;
    dragOffsetRef.current = 0;
    isDraggingRef.current = true;
    setDragOffset(0);
    setIsDragging(true);
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    const offset = e.clientX - startXRef.current;
    dragOffsetRef.current = offset;
    setDragOffset(offset);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const cw = getCardWidth();
    const threshold = 30;
    const off = dragOffsetRef.current;

    if (Math.abs(off) > threshold) {
      const raw = off / (cw * sensitivity);
      let fullSwipes = Math.round(raw);
      if (fullSwipes === 0) fullSwipes = off > 0 ? 1 : -1;

      const curr = activeIndexRef.current;
      const n = services.length;
      const newIdx = ((curr - fullSwipes) % n + n) % n;
      setActiveIndex(newIdx);
    }

    setIsDragging(false);
    setDragOffset(0);
    dragOffsetRef.current = 0;
  }, [services.length]);

  const fractionalIndex = isDragging
    ? activeIndex - dragOffset / (getCardWidth() * sensitivity)
    : activeIndex;

  return (
    <section
      id="services"
      className="relative w-full py-16 md:py-24 lg:py-32 bg-[#050505] overflow-hidden flex flex-col items-center justify-center border-b border-gold-leaf/5"
    >
      <div className="absolute top-[10%] right-[5%] w-80 h-80 rounded-full bg-gold-leaf/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full bg-rose-blush/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center relative z-10">

        <div className="mb-20">
          <span className="font-nunito text-xs uppercase tracking-[0.3em] text-gold-leaf font-semibold mb-3 block">
            OUR OFFERINGS
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl text-cream-white font-light tracking-wide">
            Bespoke Services
          </h2>
          <div className="w-12 h-[1px] bg-gold-leaf mx-auto mt-4" />
        </div>

        <div className="relative w-full flex flex-col items-center justify-center">

          <div
            ref={containerRef}
            className="perspective-container relative w-full max-w-[420px] h-[400px] md:h-[480px] flex items-center justify-center select-none"
            style={{ touchAction: 'pan-y' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <div className="card-deck-3d relative w-full h-full flex items-center justify-center">

              {services.map((service, index) => {
                const cw = getCardWidth();
                const diff = (index - fractionalIndex + services.length) % services.length;
                let offset = diff;
                if (offset > services.length / 2) offset -= services.length;

                const isActive = !isDragging && offset === 0;
                const absOffset = Math.abs(offset);

                const rotateY = offset * 45;
                const translateZ = isActive ? 100 : -100 - (absOffset * 50);
                const translateX = offset * (cw * 0.5);
                const opacity = isActive ? 1 : absOffset === 1 ? 0.6 : 0.15;
                const scale = isActive ? 1.05 : 0.88;

                return (
                  <div
                    key={service.id}
                    className={`absolute w-[280px] sm:w-[300px] md:w-[340px] h-[380px] md:h-[430px] rounded-sm overflow-hidden border ${
                      isActive ? 'border-gold-leaf/40 shadow-2xl' : 'border-gold-leaf/10 shadow-2xl'
                    } ${isDragging ? '' : 'transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]'}`}
                    style={{
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity: opacity,
                      zIndex: 10 - absOffset,
                      pointerEvents: 'none',
                      backgroundColor: '#0c0c0c',
                      boxShadow: isActive ? '0 0 40px rgba(212, 175, 55, 0.15), 0 0 80px rgba(212, 175, 55, 0.05)' : undefined,
                    }}
                  >
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src={service.image}
                        alt={service.title}
                        className={`w-full h-full object-cover ${
                          isActive ? 'opacity-100 scale-105' : 'opacity-40'
                        } ${isDragging ? '' : 'transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]'}`}
                      />
                      <div className={`absolute inset-0 ${
                        isActive
                          ? 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'
                          : 'bg-gradient-to-t from-black/80 via-black/40 to-transparent'
                      } ${isDragging ? '' : 'transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]'}`} />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 text-left">
                      <h3 className={`font-cormorant text-2xl tracking-widest font-light ${
                        isActive ? 'text-gold-leaf' : 'text-cream-white'
                      } ${isDragging ? '' : 'transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]'}`}>
                        {service.title}
                      </h3>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          <div className="flex items-center space-x-6 mt-8 z-20">
            <button
              onClick={() => snapTo(activeIndex, -1)}
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
                    idx === Math.round(fractionalIndex) ? 'w-8 bg-gold-leaf' : 'w-2 bg-cream-white/20'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => snapTo(activeIndex, 1)}
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
