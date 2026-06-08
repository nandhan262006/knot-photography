import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    // Minimum loader display duration for smooth animations
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, 2000);

    // Fallback: hide loader after 8 seconds max to prevent soft-locks
    const fallbackTimer = setTimeout(() => {
      setLoading(false);
    }, 8000);

    const handleProgress = (e) => {
      if (e.detail && typeof e.detail.progress === 'number') {
        setProgress(Math.round(e.detail.progress));
      }
    };

    window.addEventListener('3d-loading-progress', handleProgress);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
      window.removeEventListener('3d-loading-progress', handleProgress);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100 && minTimePassed) {
      setLoading(false);
    }
  }, [progress, minTimePassed]);

  const logoText = "THE KNOT";
  
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const letterVariants = {
    initial: { opacity: 0, y: 30, filter: "blur(5px)" },
    animate: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: [0.6, 0.01, -0.05, 0.95] 
      } 
    }
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 bg-[#050505] z-[9999] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100vh",
            transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1], delay: 0.2 } 
          }}
        >
          {/* Subtle elegant circular golden ring background decoration */}
          <div className="absolute w-[280px] h-[280px] rounded-full border border-gold-leaf/10 flex items-center justify-center animate-[spin_40s_linear_infinite]" />
          <div className="absolute w-[290px] h-[290px] rounded-full border border-rose-blush/5 flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Elegant camera aperture or ring icon drawing animation */}
            <svg 
              className="w-16 h-16 mb-8 text-gold-leaf" 
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <motion.circle 
                cx="50" 
                cy="50" 
                r="40" 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.path 
                d="M50 10 L60 45 L90 50 L60 55 L50 90 L40 55 L10 50 L40 45 Z"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              />
            </svg>

            {/* Letter by letter reveal */}
            <motion.div 
              className="flex space-x-3 md:space-x-4 mb-2"
              variants={containerVariants}
              initial="initial"
              animate="animate"
            >
              {logoText.split("").map((letter, idx) => (
                <motion.span
                  key={idx}
                  variants={letterVariants}
                  className={`font-cormorant text-3xl md:text-5xl tracking-widest text-cream-white font-light ${letter === " " ? "w-4" : ""}`}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="font-cormorant italic text-sm md:text-base text-rose-dusty tracking-wider mt-2"
            >
              Est. In Nellore
            </motion.p>

            {/* Progress Bar & Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-col items-center"
            >
              <span className="font-nunito text-[10px] uppercase tracking-[0.25em] text-gold-leaf mb-3">
                Loading Experience {progress}%
              </span>
              <div className="w-40 h-[1.5px] bg-white/10 relative overflow-hidden">
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-gold-leaf transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
