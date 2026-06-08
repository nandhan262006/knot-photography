import React from 'react';
import { Star } from 'lucide-react';

export default function Reviews() {
  const googleReviews = [
    {
      id: 1,
      name: "Sireesha Reddy",
      role: "Bride",
      text: "THE KNOT team is absolutely magical! They shot our wedding in Nellore last month. The pictures look like they are straight out of Vogue India. Truly spectacular work!",
      rating: 5,
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Nandhan Krishna",
      role: "Groom",
      text: "Highly professional crew. They captured the candid emotional moments during our haldi ceremony perfectly. Highly recommended for anyone looking for luxury wedding photography.",
      rating: 5,
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Srinivas Rao",
      role: "Father of Bride",
      text: "Their albums and highlights reels are state-of-the-art. Every single relative was wowed by the cinematic styling and golden tone edits. Professional, polite, and master visualists.",
      rating: 5,
      date: "3 months ago"
    },
    {
      id: 4,
      name: "Swathy & Akhil",
      role: "Couple",
      text: "We hired them for our pre-wedding shoot. The shots they captured in ancient stone settings at sunset are breathtaking. Absolute mastery of lighting and shadows!",
      rating: 5,
      date: "4 months ago"
    },
    {
      id: 5,
      name: "Vikram Aditya",
      role: "Groom",
      text: "Outstanding photography! Easily the best in Nellore. Rated 5 stars for a reason. They made our wedding memories feel like timeless cinematic heirlooms.",
      rating: 5,
      date: "6 months ago"
    }
  ];

  return (
    <section 
      id="reviews" 
      className="relative w-full py-20 bg-rose-dark/45 overflow-hidden border-b border-gold-leaf/5"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-rose-blush/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center relative z-10 mb-12">
        <span className="font-nunito text-xs uppercase tracking-[0.3em] text-gold-leaf font-semibold mb-3 block">
          CLIENT KUDOS
        </span>
        <h2 className="font-cormorant text-4xl md:text-5xl text-cream-white font-light tracking-wide">
          109 Google Reviews · 4.8★ Rating
        </h2>
        <div className="w-12 h-[1px] bg-gold-leaf mx-auto mt-4" />
      </div>

      {/* Ticker Row */}
      <div className="relative w-full overflow-hidden py-4 flex select-none">
        {/* Subtle gradients on edges for fade-out styling */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Double-listed list for infinite scrolling */}
        <div className="animate-marquee gap-6">
          {[...googleReviews, ...googleReviews].map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="bg-[#121212] border border-gold-leaf/5 hover:border-gold-leaf/20 w-[300px] md:w-[380px] p-8 flex flex-col justify-between transition-colors duration-300 pointer-events-auto"
            >
              
              {/* Rating stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-gold-leaf text-gold-leaf" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="font-cormorant text-cream-white/80 text-base md:text-lg italic leading-relaxed tracking-wider mb-6 flex-grow">
                "{review.text}"
              </p>

              {/* Reviewer Details */}
              <div className="flex justify-between items-center border-t border-white/5 pt-4">
                <div>
                  <h4 className="font-nunito text-xs uppercase tracking-widest text-cream-white font-semibold">
                    {review.name}
                  </h4>
                  <span className="font-nunito text-[10px] text-rose-dusty/60 tracking-wider">
                    {review.role}
                  </span>
                </div>
                <span className="font-nunito text-[9px] text-cream-white/30 uppercase tracking-widest">
                  {review.date}
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
