import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Global Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Section Components
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Studio3D from './sections/Studio3D';
import Portfolio from './sections/Portfolio';
import Reviews from './sections/Reviews';
import Contact from './sections/Contact';

// Pages
import GalleryPage from './pages/GalleryPage';
import StudioPage from './pages/StudioPage';

function HomePage() {
  return (
    <>
      {/* Custom Global Effects */}
      <ScrollProgress />
      <div className="grain-overlay" />

      {/* Header Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="w-full flex flex-col">
        <Hero />
        <About />
        <Services />
        <Studio3D />
        <Portfolio />
        <Reviews />
        <Contact />
      </main>

      {/* Footer Branding */}
      <Footer />

      {/* Pulsing Floating WhatsApp Widget */}
      <FloatingWhatsApp />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#050505] text-[#faf8f5] overflow-x-hidden selection:bg-[#d4a0a0] selection:text-black antialiased font-nunito">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/studio/*" element={<StudioPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
