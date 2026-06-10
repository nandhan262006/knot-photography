import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Studio3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);

  const cards = [
    { id: 0, title: "3D Themed Backdrops", image: "/images/bridal.png" },
    { id: 1, title: "Premium Baby Props", image: "/images/candid.png" },
    { id: 2, title: "Cake Smash Sessions", image: "/images/knot.png" },
    { id: 3, title: "Newborn Photography", image: "/images/prewedding.png" },
    { id: 4, title: "Birthday Party Coverage", image: "/images/hero_bg.png" }
  ];

  const getCardWidth = () =>
    window.innerWidth < 640 ? 280 : window.innerWidth < 768 ? 300 : 340;

  const sensitivity = 0.55;

  const snapTo = useCallback((fromIndex, direction) => {
    const n = cards.length;
    if (direction > 0) setActiveIndex((fromIndex + 1) % n);
    else if (direction < 0) setActiveIndex((fromIndex - 1 + n) % n);
  }, [cards.length]);

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
      const n = cards.length;
      const newIdx = ((curr - fullSwipes) % n + n) % n;
      setActiveIndex(newIdx);
    }

    setIsDragging(false);
    setDragOffset(0);
    dragOffsetRef.current = 0;
  }, [cards.length]);

  const fractionalIndex = isDragging
    ? activeIndex - dragOffset / (getCardWidth() * sensitivity)
    : activeIndex;

  return (
    <section
      id="studio3d"
      className="relative w-full py-16 md:py-24 lg:py-32 bg-[#0c0c0c] overflow-hidden flex flex-col items-center justify-center border-b border-gold-leaf/5"
    >
      <div className="absolute top-[15%] left-[5%] w-80 h-80 rounded-full bg-rose-blush/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[15%] right-[5%] w-80 h-80 rounded-full bg-gold-leaf/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center relative z-10">

        <div className="mb-20">
          <span className="font-nunito text-xs uppercase tracking-[0.3em] text-rose-blush font-semibold mb-3 block">
            KID&apos;S STUDIO 3D NELLORE
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl text-cream-white font-light tracking-wide">
            Andhra&apos;s Largest Baby Studio
          </h2>
          <p className="font-nunito text-xs md:text-sm text-cream-white/50 tracking-wider mt-4 max-w-xl mx-auto">
            📸 3D Themes | Premium Props | Memorable Moments
          </p>
          <a
            href="https://www.instagram.com/kids_studio_3d_nellore"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-nunito text-xs uppercase tracking-[0.25em] text-rose-blush hover:text-gold-leaf border border-rose-blush/30 hover:border-gold-leaf px-5 py-2.5 mt-6 transition-all duration-300 clickable"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" strokeWidth="3"/></svg>
            Follow on Instagram
          </a>
          <div className="w-12 h-[1px] bg-rose-blush mx-auto mt-4" />
        </div>

        <div className="relative w-full flex flex-col items-center justify-center">

          <div
            className="perspective-container relative w-full max-w-[420px] h-[400px] md:h-[480px] flex items-center justify-center select-none"
            style={{ touchAction: 'pan-y' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <div className="card-deck-3d relative w-full h-full flex items-center justify-center">

              {cards.map((card, index) => {
                const cw = getCardWidth();
                const diff = (index - fractionalIndex + cards.length) % cards.length;
                let offset = diff;
                if (offset > cards.length / 2) offset -= cards.length;

                const isActive = !isDragging && offset === 0;
                const absOffset = Math.abs(offset);

                const rotateY = offset * 45;
                const translateZ = isActive ? 100 : -100 - (absOffset * 70);
                const translateX = offset * (cw * 0.5);
                const opacity = isActive ? 1 : absOffset === 1 ? 0.6 : 0.1;
                const scale = isActive ? 1.05 : 0.85;

                return (
                  <div
                    key={card.id}
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
                        src={card.image}
                        alt={card.title}
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
                        {card.title}
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
              aria-label="Previous card"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center space-x-2">
              {cards.map((_, idx) => (
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
              aria-label="Next card"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
