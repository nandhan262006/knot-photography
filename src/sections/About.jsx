import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Award, Heart } from 'lucide-react';

export default function About() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const isAboutInView = useInView(containerRef, { once: true, amount: 0.2 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize coordinates (-0.5 to 0.5)
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;

    // Scale movement range
    setParallax({
      x: x * 20, // max 20px drift
      y: y * 20,
    });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  // Stat items
  const stats = [
    {
      value: "4.8★",
      label: "Google Rating",
      desc: "Based on verified client logs",
      icon: <Star className="w-5 h-5 text-gold-leaf" />
    },
    {
      value: "1K+",
      label: "Google Reviews",
      desc: "5-star customer trust",
      icon: <Award className="w-5 h-5 text-gold-leaf" />
    },
    {
      value: "500+",
      label: "Weddings Captured",
      desc: "Across AP & beyond",
      icon: <Heart className="w-5 h-5 text-gold-leaf" />
    }
  ];

  return (
    <section 
      id="about" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen py-16 md:py-24 lg:py-32 bg-[#0c0c0c] flex items-center overflow-hidden border-t border-b border-gold-leaf/5"
    >
      {/* Subtle background noise grid or watermark */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Right Side: Studio description + 3 stat counters */}
        <div className="md:col-span-12 flex flex-col justify-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="font-nunito text-xs uppercase tracking-[0.3em] text-gold-leaf font-semibold mb-3 block">
              OUR HERITAGE
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-cream-white font-light tracking-wide leading-tight mb-8">
              We Don't Just Take Photos.<br />
              <span className="italic text-rose-dusty">We Frame Legacies.</span>
            </h2>
          </motion.div>

          {/* Description Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-cream-white/70 font-nunito text-sm md:text-base leading-relaxed tracking-wider max-w-2xl"
          >
            <p>
              Based in the heart of Nellore, Andhra Pradesh, <strong className="text-cream-white font-medium">THE KNOT Photography</strong> is a premier boutique studio dedicated to capturing the raw emotion, grandeur, and fine details of your union. We blend editorial elegance with documentary realism, documenting moments that endure for generations.
            </p>
            <p>
              From the delicate exchange of wedding vows to the joyous shower of flowers during the rituals, our cinematic approach ensures that every smile, tear, and golden glance is preserved as a precious family heirloom. Rated <span className="text-gold-leaf font-bold">4.8★</span> with <span className="text-gold-leaf font-bold">109 reviews</span> on Google, we are privileged to be trusted by hundreds of families.
            </p>
          </motion.div>

          {/* Stats Counters */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + idx * 0.15 }}
                className="bg-[#121212] border border-gold-leaf/5 hover:border-gold-leaf/20 p-6 flex flex-col justify-between transition-all duration-300 relative group"
              >
                {/* Gold top accent line */}
                <span className="absolute top-0 left-0 w-0 h-[1.5px] bg-gold-leaf group-hover:w-full transition-all duration-300" />
                
                <div className="flex items-center justify-between mb-4">
                  {stat.icon}
                  <span className="font-nunito text-[10px] uppercase tracking-widest text-rose-dusty/50 group-hover:text-rose-dusty transition-colors">
                    Verified
                  </span>
                </div>
                
                <div className="font-serif-display text-3xl md:text-4xl text-gold-leaf font-light tracking-wide mb-1">
                  {stat.value}
                </div>
                
                <div className="font-nunito text-xs text-cream-white font-medium uppercase tracking-widest mb-1">
                  {stat.label}
                </div>
                
                <div className="font-nunito text-[10px] text-cream-white/40 tracking-wider">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Small Mobile Subheading */}
          <div className="mt-12 block md:hidden text-center">
            <span className="text-stroke-gold font-serif-display text-2xl sm:text-4xl uppercase tracking-widest select-none">
              EST. IN NELLORE
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
