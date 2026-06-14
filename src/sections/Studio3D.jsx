import SEO from '../components/SEO';

const defaultStoryCards = [
  {
    order: 1,
    title: 'Maternity',
    description: 'Capturing the glow of motherhood — celebrate the journey that began with love.',
    image: '/images/maternity.png',
  },
  {
    order: 2,
    title: 'Newborn',
    description: 'Tiny fingers, tiny toes — preserving the purest moments of your little miracle.',
    image: '/images/kidsstudio1.png',
  },
  {
    order: 3,
    title: 'Little Star',
    description: 'Personality shines bright — fun, candid, and full of wonder in every frame.',
    image: '/images/kidsstudio2.png',
  },
];

const cameras = [
  { name: 'Canon EOS R1', image: '/images/canonr1.webp' },
  { name: 'Canon EOS R3', image: '/images/canonr3.webp' },
  { name: 'Canon EOS R5', image: '/images/canonr5.webp' },
  { name: 'Sony FX3', image: '/images/sonyfx3.webp' },
  { name: 'Sony A1', image: '/images/sonya1.webp' },
];

export default function Studio3D() {
  const storyCards = defaultStoryCards;

  return (
    <>
      <SEO
        title="Kids Studio 3D Nellore | Andhra's Largest Baby Studio"
        description="Andhra's largest kids 3D studio in Nellore by THE KNOT Photography. 100+ 3D themes for maternity, newborn & kids photography. Top photographers in Nellore for baby and kids studio shoots."
        keywords="kids studio nellore, kids 3d studio nellore, baby photography nellore, best baby studio nellore, kids photo shoot nellore, 3d themes for kids nellore, top photographers in nellore, best photographers in nellore, maternity photography nellore, newborn photography nellore, kids studio 3d, andhra pradesh kids studio"
      />
      <section
        id="studio3d"
        className="relative w-full py-16 md:py-24 lg:py-32 bg-[#0c0c0c] overflow-hidden flex flex-col items-center justify-center border-b border-gold-leaf/5"
      >
        <div className="absolute top-[15%] left-[5%] w-80 h-80 rounded-full bg-rose-blush/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[15%] right-[5%] w-80 h-80 rounded-full bg-gold-leaf/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center relative z-10">

          <div className="mb-20">
            <span className="font-nunito text-[10px] md:text-xs uppercase tracking-[0.3em] text-rose-blush/70 font-light mb-2 block">
              for cute little stars we have
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl text-cream-white font-light tracking-wide">
              {"Andhra's Largest Baby Studio"}
            </h2>
            <span className="font-nunito text-[10px] md:text-xs uppercase tracking-[0.3em] text-rose-blush font-semibold mt-4 mb-3 block">
              {"KID'S STUDIO 3D NELLORE"}
            </span>
            <p className="font-nunito text-xs md:text-sm text-cream-white/50 tracking-wider mt-4 max-w-xl mx-auto">
              100+ 3D Themes • Premium Props • Memorable Moments
            </p>
            <a
              href="https://www.instagram.com/kids_studio_3d_nellore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-nunito text-xs uppercase tracking-[0.25em] text-rose-blush hover:text-gold-leaf border border-rose-blush/30 hover:border-gold-leaf px-5 py-2.5 mt-6 transition-all duration-300 clickable"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" strokeWidth="3"/></svg>
              Follow on Instagram
            </a>
            <div className="w-12 h-[1px] bg-rose-blush mx-auto mt-4" />
          </div>

          <div className="relative w-full flex flex-col items-center justify-center">

            <div className="relative w-full max-w-6xl mx-auto">
              <p className="font-cormorant text-xl md:text-2xl text-cream-white/50 font-light tracking-wide text-center mb-12 md:mb-16 italic">
                Begin your beautiful journey with us — make it memorable forever
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 relative z-10 items-start">
                  {storyCards.map((item, i) => (
                  <div key={item.order} className="flex flex-col items-center relative">
                    {i > 0 && (
                      <div className="hidden md:flex absolute -left-3 top-[30%] -translate-y-1/2 z-20">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                          <path d="M5 12h14M13 5l7 7-7 7"/>
                        </svg>
                      </div>
                    )}
                    <div className="relative w-full max-w-[300px] aspect-[3/4] rounded-sm overflow-hidden border border-rose-blush/20 bg-[#111] group">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                        <h3 className="font-cormorant text-xl md:text-2xl text-gold-leaf font-light tracking-wide">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <p className="font-cormorant text-lg md:text-xl text-cream-white/60 tracking-wide mt-5 text-center max-w-[280px] leading-relaxed">
                      {item.description}
                    </p>
                    {i < 2 && (
                      <div className="md:hidden relative flex items-center justify-center py-3">
                        <div className="h-10 w-[2px] bg-gradient-to-b from-gold-leaf via-gold-leaf/40 to-transparent" />
                        <div className="absolute w-3 h-3 rounded-full bg-gold-leaf shadow-[0_0_12px_rgba(212,175,55,0.6)]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="hidden md:block absolute top-[30%] left-[5%] right-[5%] -translate-y-1/2 z-0">
                <div className="relative w-full h-[2px] bg-gradient-to-r from-transparent via-gold-leaf/30 to-transparent">
                  <div className="absolute top-1/2 -translate-y-1/2 left-[15%] w-[70%] h-[2px] bg-gold-leaf/40" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-[16%] w-4 h-4 rounded-full bg-gold-leaf shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-[50%] w-4 h-4 rounded-full bg-gold-leaf shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-[84%] w-4 h-4 rounded-full bg-gold-leaf shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
                </div>
              </div>
            </div>

            <div className="mt-20 w-full text-center overflow-hidden">
              <h3 className="font-cormorant text-3xl md:text-4xl text-cream-white font-light tracking-wide">
                The Gear We Use
              </h3>
              <div className="mt-6 marquee-track relative">
                <div className="marquee-content flex items-center gap-5 md:gap-6">
                  {[...cameras, ...cameras].map((cam, i) => (
                    <div key={i} className="flex flex-col items-center flex-shrink-0">
                      <div className="w-28 h-28 md:w-32 md:h-32 rounded-sm overflow-hidden border border-cream-white/10 bg-[#111] flex items-center justify-center p-3">
                        <img
                          src={cam.image}
                          alt={cam.name}
                          className="w-full h-full object-cover scale-110"
                        />
                      </div>
                      <span className="font-nunito text-[10px] md:text-xs text-cream-white/50 tracking-wider mt-3 whitespace-nowrap">
                        {cam.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
