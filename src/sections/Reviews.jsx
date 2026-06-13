import React from 'react';
import { Star } from 'lucide-react';

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="w-5 h-5">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
);

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
      className="relative w-full py-16 md:py-20 bg-[#0c0c0c] overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center relative z-10 mb-12">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 mb-6">
          <GoogleIcon />
          <span className="font-nunito text-[11px] uppercase tracking-widest text-[#4285F4] font-semibold">
            Google Reviews
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-[#4285F4] tracking-tight font-serif-display">
          4.8
        </h2>
        <div className="flex items-center justify-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={20} className="fill-[#FBBC05] text-[#FBBC05]" />
          ))}
        </div>
        <p className="font-nunito text-sm text-white/50 tracking-wider mt-3">
          Based on <span className="text-white/80 font-semibold">1K+ reviews</span>
        </p>
      </div>

      {/* Ticker Row */}
      <div className="relative w-full overflow-hidden py-4 flex select-none">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[#0c0c0c] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[#0c0c0c] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee gap-6">
          {[...googleReviews, ...googleReviews, ...googleReviews, ...googleReviews].map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] w-[320px] md:w-[400px] p-6 md:p-7 flex flex-col justify-between transition-all duration-300 pointer-events-auto rounded-lg"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>

                <p className="font-nunito text-[13px] text-white/70 leading-relaxed mb-5 flex-grow">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-white/[0.06] pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#4285F4]/20 flex items-center justify-center text-[#4285F4] font-bold text-xs font-nunito">
                    {review.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h4 className="font-nunito text-xs text-white/80 font-semibold">
                      {review.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      <GoogleIcon />
                      <span className="font-nunito text-[10px] text-[#4285F4]/60">
                        {review.role}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="font-nunito text-[10px] text-white/30">
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
