import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Contact() {
  const contactDetails = [
    {
      icon: <Phone className="w-5 h-5 text-gold-leaf" />,
      label: "Call Us",
      value: "+91 85005 63003",
      href: "tel:+918500563003"
    },
    {
      icon: <svg className="w-5 h-5 text-gold-leaf" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" strokeWidth="3"/></svg>,
      label: "Instagram Journal",
      value: "@the_knot_photography_nellore",
      href: "https://www.instagram.com/the_knot_photography_nellore"
    },
    {
      icon: <svg className="w-5 h-5 text-rose-blush" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" strokeWidth="3"/></svg>,
      label: "Kids Studio 3D Nellore",
      value: "@kids_studio_3d_nellore",
      href: "https://www.instagram.com/kids_studio_3d_nellore"
    },
    {
      icon: <MapPin className="w-5 h-5 text-gold-leaf" />,
      label: "Our Studio",
      value: "MSR Nagar, Magunta Layout, Nellore, AP 524003",
      href: "https://maps.app.goo.gl/sJApGzNLNRqhuQXB8"
    }
  ];

  return (
    <section 
      id="contact" 
      className="relative w-full py-16 md:py-24 lg:py-32 bg-[#050505] overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-gold-leaf/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">
        
        {/* Left Side: Contact Information */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          <div>
            <span className="font-nunito text-xs uppercase tracking-[0.3em] text-gold-leaf font-semibold mb-3 block">
              SECURE YOUR DATE
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-cream-white font-light tracking-wide leading-tight mb-8">
              Let’s Capture Your<br />
              <span className="italic text-rose-dusty">Once In A Lifetime.</span>
            </h2>
            <p className="font-nunito text-sm md:text-base text-cream-white/70 tracking-wider leading-relaxed max-w-xl mb-12">
              Popular wedding dates in Andhra Pradesh book up to a year in advance. Reach out today to check availability for your wedding, engagement, or pre-wedding shoot.
            </p>
          </div>

          {/* Details list */}
          <div className="space-y-8 mb-12">
            {contactDetails.map((detail, idx) => (
              <a
                key={idx}
                href={detail.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 hover:translate-x-1.5 transition-transform duration-300 group max-w-md clickable"
              >
                <div className="p-3 bg-[#121212] border border-gold-leaf/10 group-hover:border-gold-leaf/30 flex items-center justify-center transition-colors">
                  {detail.icon}
                </div>
                <div>
                  <span className="font-nunito text-[9px] uppercase tracking-widest text-rose-dusty/60">
                    {detail.label}
                  </span>
                  <p className="font-cormorant text-lg md:text-xl text-cream-white tracking-wider md:tracking-widest font-light mt-0.5 group-hover:text-gold-leaf transition-colors">
                    {detail.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Large WhatsApp CTA Button */}
          <div>
            <a
              href="https://wa.me/918500563003"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer inline-flex items-center gap-3 font-nunito text-xs uppercase tracking-[0.25em] bg-gold-leaf text-black px-6 md:px-10 py-4.5 font-bold transition-all duration-300 shadow-xl shadow-gold-leaf/10 hover:shadow-gold-leaf/25 clickable whitespace-nowrap"
            >
              <MessageCircle size={18} className="fill-current shrink-0" />
              <span className="hidden sm:inline">Book Your Date on WhatsApp</span><span className="sm:hidden">Book Now</span>
            </a>
          </div>

        </div>

        {/* Right Side: Styled Google Maps Frame */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-start w-full relative py-12 lg:py-0">
          
          {/* Small Monogram Header */}
          <div className="mb-4 flex items-center gap-3 opacity-60 self-center lg:self-start">
            <span className="font-serif-display text-2xl text-stroke-gold select-none">TKP</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-leaf" />
            <span className="font-nunito text-[9px] uppercase tracking-widest text-rose-dusty">Studio Location</span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[450px] aspect-[4/3] bg-[#121212] border border-gold-leaf/10 p-2 shadow-2xl hover:border-gold-leaf/30 transition-all duration-500 group"
          >
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-4 h-[1px] bg-gold-leaf/40" />
            <span className="absolute top-0 left-0 w-[1px] h-4 bg-gold-leaf/40" />
            <span className="absolute top-0 right-0 w-4 h-[1px] bg-gold-leaf/40" />
            <span className="absolute top-0 right-0 w-[1px] h-4 bg-gold-leaf/40" />
            <span className="absolute bottom-0 left-0 w-4 h-[1px] bg-gold-leaf/40" />
            <span className="absolute bottom-0 left-0 w-[1px] h-4 bg-gold-leaf/40" />
            <span className="absolute bottom-0 right-0 w-4 h-[1px] bg-gold-leaf/40" />
            <span className="absolute bottom-0 right-0 w-[1px] h-4 bg-gold-leaf/40" />
            
            {/* Google Maps embed with custom CSS filter */}
            <iframe
              src="https://maps.google.com/maps?q=THE%20KNOT%20Photography%20Nellore&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "invert(90%) hue-rotate(180deg) brightness(85%) contrast(90%) grayscale(30%)",
                opacity: 0.85
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="THE KNOT Photography Studio Location Map"
              className="w-full h-full group-hover:opacity-100 transition-opacity duration-500"
            />
            
            {/* Floating Action Banner */}
            <div className="absolute -bottom-4 right-4 bg-black border border-gold-leaf/20 px-4 py-2 flex items-center gap-2 group-hover:border-gold-leaf/50 transition-colors duration-300">
              <div className="w-2 h-2 rounded-full bg-gold-leaf animate-pulse" />
              <a 
                href="https://maps.app.goo.gl/sJApGzNLNRqhuQXB8"
                target="_blank"
                rel="noopener noreferrer"
                className="font-nunito text-[10px] uppercase tracking-widest text-cream-white hover:text-gold-leaf transition-colors clickable"
              >
                Open in Google Maps
              </a>
            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}
