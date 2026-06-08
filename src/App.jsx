import React from 'react';
import './App.css';

// Global Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import PageLoader from './components/PageLoader';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Section Components
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Reviews from './sections/Reviews';
import Contact from './sections/Contact';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#faf8f5] overflow-x-hidden selection:bg-[#d4a0a0] selection:text-black antialiased font-nunito">
      
      {/* Custom Global Effects */}
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <div className="grain-overlay" />

      {/* Header Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="w-full flex flex-col">
        {/* Section 1: Hero Particle Scene */}
        <Hero />

        {/* Section 2: About Parallax Split */}
        <About />

        {/* Section 3: 3D Services Deck */}
        <Services />

        {/* Section 4: Portfolio Masonry + Lightbox */}
        <Portfolio />

        {/* Section 5: Infinite Review Ticker */}
        <Reviews />

        {/* Section 6: Contact & Booking */}
        <Contact />
      </main>

      {/* Footer Branding */}
      <Footer />

      {/* Pulsing Floating WhatsApp Widget */}
      <FloatingWhatsApp />

    </div>
  );
}
