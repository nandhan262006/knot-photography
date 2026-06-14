import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';

import SEO from './components/SEO';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import FloatingWhatsApp from './components/FloatingWhatsApp';

import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Studio3D from './sections/Studio3D';
import Portfolio from './sections/Portfolio';
import Reviews from './sections/Reviews';
import Contact from './sections/Contact';

const GalleryPage = lazy(() => import('./pages/GalleryPage'));

const SITE_URL = 'https://theknotphotography.com';

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: 'THE KNOT Photography',
  image: `${SITE_URL}/images/KNOT LOGO 2025.png`,
  url: SITE_URL,
  telephone: '+91-XXXXXXXXXX',
  email: 'hello@theknotphotography.com',
  description: 'Top photographers in Nellore, Andhra Pradesh. THE KNOT Photography is a premium photography studio specializing in wedding, pre-wedding, engagement, maternity, newborn baby, kids studio 3D, and fashion photography. Recognized as one of the best photographers in Nellore.',
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nellore",
    addressRegion: "Andhra Pradesh",
    addressCountry: "IN"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 14.4426,
    longitude: 79.9865
  },
  sameAs: [
    "https://www.instagram.com/theknotphotography",
    "https://www.instagram.com/kids_studio_3d_nellore"
  ],
  priceRange: "₹₹₹",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "20:00"
  },
  areaServed: [
    { "@type": "City", name: "Nellore" },
    { "@type": "City", name: "Gudur" },
    { "@type": "City", name: "Kavali" },
    { "@type": "State", name: "Andhra Pradesh" }
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Photography Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wedding Photography" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pre-Wedding Shoot" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Engagement Photography" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maternity Photography" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Newborn Baby Photography" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kids Studio 3D Photography" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fashion Photography" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Outdoor Photography" } }
    ]
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    ratingCount: "1000+"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'THE KNOT Photography',
  description: 'Top photographers in Nellore - Premium wedding, maternity & kids studio photography in Andhra Pradesh',
  publisher: { "@id": `${SITE_URL}/#business` }
};

const fallbackLoader = (
  <div className="min-h-screen flex items-center justify-center bg-[#050505]">
    <div className="w-8 h-8 border-2 border-gold-leaf/30 border-t-gold-leaf rounded-full animate-spin" />
  </div>
);

function HomePage() {
  return (
    <>
      <SEO
        jsonLd={[localBusinessSchema, websiteSchema]}
      />
      <ScrollProgress />
      <div className="grain-overlay" />

      <Navbar />

      <main className="w-full flex flex-col">
        <Hero />
        <About />
        <Services />
        
        <Portfolio />
        <Studio3D />
        <Reviews />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
          <div className="relative min-h-screen bg-[#050505] text-[#faf8f5] overflow-x-hidden selection:bg-[#d4a0a0] selection:text-black antialiased font-nunito">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={
                <Suspense fallback={fallbackLoader}>
                  <GalleryPage />
                </Suspense>
              } />
            </Routes>
          </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
