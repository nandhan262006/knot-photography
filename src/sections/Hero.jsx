import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      video.muted = false;
    };

    video.addEventListener('play', handlePlay);
    video.play().catch(() => {});

    return () => video.removeEventListener('play', handlePlay);
  }, []);

  const handleEnded = useCallback(() => {
    setVideoEnded(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <section 
      id="home" 
      className="relative w-full max-sm:h-[50vh] h-dvh overflow-hidden flex flex-col justify-center items-center bg-[#050505]"
    >


      {/* CTA Overlay */}
      <div className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <a
          href="https://wa.me/918500563003?text=Hi!%20I'd%20like%20to%20book%20a%2015-minute%20call%20to%20discuss%20photography%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shimmer inline-flex items-center gap-3 font-nunito text-xs uppercase tracking-[0.25em] bg-gold-leaf text-black px-8 py-4 font-bold transition-all duration-300 shadow-xl shadow-gold-leaf/10 hover:shadow-gold-leaf/25 clickable"
        >
          Book a 15 Min Call
        </a>
      </div>

      {/* homepage.png stands here - hidden behind black on mobile until video ends */}
      <motion.img
        initial={{ opacity: 1 }}
        animate={{ opacity: videoEnded ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 w-full h-full object-cover z-0 sm:opacity-100"
        src="/images/homepage.png"
        alt="THE KNOT Photography"
      />

      {/* Mobile black cover - slides up with video on end */}
      <motion.div
        initial={{ y: 0 }}
        animate={videoEnded ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0 w-full h-full bg-[#050505] z-[4] block sm:hidden"
      />

      {/* Full-screen Logo Reveal Video - slides up on end */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={videoEnded ? { y: '-100%' } : { opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0 w-full h-full z-[5]"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover max-sm:object-contain"
          src="/images/i_need_a_logo_revaling_video_f.mp4"
          muted
          playsInline
          onEnded={handleEnded}
        />
      </motion.div>


      {/* Down indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5, delay: 2.0 }}
        className="absolute bottom-10 z-20 text-cream-white/50 flex flex-col items-center pointer-events-none"
      >
        <span className="font-nunito text-[10px] sm:text-[9px] uppercase tracking-[0.3em] mb-1 font-light">Scroll Down</span>
        <ChevronDown size={14} className="text-gold-leaf" />
      </motion.div>
    </section>
  );
}
