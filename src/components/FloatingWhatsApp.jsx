import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918500563003"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book on WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center whatsapp-pulse clickable"
      style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
    >
      <MessageCircle size={28} className="fill-current" />
      <span className="absolute -top-2 -left-2 bg-gold-leaf text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
        Book
      </span>
    </a>
  );
}
