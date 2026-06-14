import { MessageCircle, MapPin } from 'lucide-react';

const InstagramIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-gold-leaf/10 py-12 px-6" style={{ paddingBottom: 'calc(3rem + env(safe-area-inset-bottom))' }}>
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-8 md:flex-row">
        
        {/* Brand logo */}
        <img
          src="/images/knotlogo2025.png"
          alt="THE KNOT"
          className="h-10 w-auto object-contain opacity-80"
        />

        {/* Studio copy */}
        <div className="text-center font-nunito text-xs text-cream-white/50 tracking-wider md:tracking-wider tracking-normal">
          © {currentYear} THE KNOT Photography · Nellore. All Rights Reserved.
          <p className="mt-1 text-[10px] text-rose-dusty/40 uppercase tracking-widest">
            Where Every Moment Becomes Forever
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-6 text-cream-white/70">
          <a
            href="https://www.instagram.com/the_knot_photography_nellore"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram - THE KNOT"
            className="hover:text-gold-leaf transition-colors duration-300 clickable"
            title="@the_knot_photography_nellore"
          >
            <InstagramIcon size={20} />
          </a>
          <a
            href="https://www.instagram.com/kids_studio_3d_nellore"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram - Kids Studio 3D Nellore"
            className="hover:text-rose-blush transition-colors duration-300 clickable"
            title="@kids_studio_3d_nellore"
          >
            <InstagramIcon size={20} />
          </a>

          <a
            href="https://wa.me/918500563003"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hover:text-gold-leaf transition-colors duration-300 clickable"
          >
            <MessageCircle size={20} />
          </a>
          <a
            href="https://maps.app.goo.gl/sJApGzNLNRqhuQXB8"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Maps Location"
            className="hover:text-gold-leaf transition-colors duration-300 clickable"
          >
            <MapPin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
