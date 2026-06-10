import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Briefcase, MessageCircle } from 'lucide-react';

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
  }, []);

  return (
    <section 
      id="home" 
      className="relative w-full h-dvh min-h-screen overflow-hidden flex flex-col justify-center items-center bg-[#050505]"
    >
      {/* Background Cinematic Shading */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050505]/90 pointer-events-none z-10" />

      {/* Full-screen Logo Reveal Video Background */}
      <motion.video
        ref={videoRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: videoEnded ? 0 : 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full object-cover max-sm:object-contain max-sm:bg-[#050505] z-0"
        src="/images/i_need_a_logo_revaling_video_f.mp4"
        muted
        playsInline
        onEnded={handleEnded}
      />

      {/* Crisp Logo Image Background (after video ends) */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: videoEnded ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="absolute inset-0 w-full h-full object-cover max-sm:object-contain max-sm:bg-[#050505] z-0"
        src="/images/knotlogo2025.png"
        alt="THE KNOT"
      />

      {/* Post-video CTA Buttons */}
      <AnimatePresence>
        {videoEnded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="absolute bottom-24 md:bottom-28 z-20 flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="#portfolio"
              className="btn-shimmer inline-flex items-center gap-2 font-nunito text-xs uppercase tracking-[0.25em] border border-gold-leaf/60 px-6 py-3 text-gold-leaf hover:bg-gold-leaf hover:text-black font-semibold transition-all duration-500 rounded-none shadow-lg shadow-gold-leaf/5 hover:shadow-gold-leaf/10 clickable"
            >
              <Briefcase size={14} />
              Explore My Work
            </a>
            <a
              href="#contact"
              className="btn-shimmer inline-flex items-center gap-2 font-nunito text-xs uppercase tracking-[0.25em] border border-gold-leaf/60 px-6 py-3 text-gold-leaf hover:bg-gold-leaf hover:text-black font-semibold transition-all duration-500 rounded-none shadow-lg shadow-gold-leaf/5 hover:shadow-gold-leaf/10 clickable"
            >
              <MessageCircle size={14} />
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>

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
