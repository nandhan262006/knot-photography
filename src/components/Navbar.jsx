import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 bg-[#050505] ${
        isScrolled 
          ? 'border-b border-gold-leaf/10 py-2 shadow-lg' 
          : 'py-2 md:py-3'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center group clickable">
          <img
            src="/images/navlog.png"
            alt="THE KNOT"
            className="h-16 md:h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) =>
            link.external ? (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="relative font-nunito text-sm uppercase tracking-widest text-cream-white/70 hover:text-cream-white transition-colors duration-300 py-2 group clickable"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-leaf transition-all duration-300 group-hover:w-full" />
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="relative font-nunito text-sm uppercase tracking-widest text-cream-white/70 hover:text-cream-white transition-colors duration-300 py-2 group clickable"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-leaf transition-all duration-300 group-hover:w-full" />
              </a>
            )
          )}
        </div>

        {/* Desktop CTA Booking Button */}
        <div className="hidden md:block">
          <a
            href="https://wa.me/918500563003?text=Hi!%20I'd%20like%20to%20book%20a%2015-minute%20call%20to%20discuss%20photography%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="font-nunito text-xs uppercase tracking-widest border border-cream-white/20 hover:border-cream-white/50 px-6 py-2.5 rounded-none text-cream-white hover:bg-white/10 transition-all duration-300 font-medium clickable"
          >
            Book 15 Min Call
          </a>
        </div>

        {/* Mobile Hamburger Menu Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="md:hidden text-cream-white hover:text-gold-leaf transition-colors duration-300 focus:outline-none clickable"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#050505] z-[100] flex flex-col items-center justify-center space-y-6 md:space-y-8 overflow-y-auto transition-all duration-500 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-cream-white hover:text-gold-leaf transition-colors duration-300 clickable"
        >
          <X size={28} />
        </button>

        <img
          src="/images/navlog.png"
          alt="THE KNOT"
          className="h-20 w-auto object-contain mb-4 opacity-90"
        />

        {navLinks.map((link) =>
          link.external ? (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="font-cormorant text-xl md:text-2xl tracking-widest text-cream-white hover:text-gold-leaf transition-colors duration-300 clickable"
            >
              {link.name}
            </Link>
          ) : (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-cormorant text-xl md:text-2xl tracking-widest text-cream-white hover:text-gold-leaf transition-colors duration-300 clickable"
            >
              {link.name}
            </a>
          )
        )}

        <a
          href="https://wa.me/918500563003?text=Hi!%20I'd%20like%20to%20book%20a%2015-minute%20call%20to%20discuss%20photography%20services."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="font-nunito text-xs uppercase tracking-widest border border-cream-white/20 px-6 md:px-8 py-3 text-cream-white hover:bg-white/10 transition-all duration-300 mt-6 clickable"
        >
          Book 15 Min Call
        </a>
      </div>
    </nav>
  );
}
