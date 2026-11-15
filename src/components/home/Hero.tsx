import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, setActiveView, setSelectedCategory, settings, language } = useApp();

  const headline = settings.heroHeadline[language] || settings.heroHeadline.en;
  const subtitle = settings.heroSubtitle[language] || settings.heroSubtitle.en;

  return (
    <section className="relative bg-[#FBF9F5] border-b border-[#E8E4DA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A6885E] mb-4">
              ASVORE · MEN'S ATELIER 2026
            </span>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#171717] font-bold tracking-tight leading-[1.12] mb-6 text-balance">
              {headline}
            </h1>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-normal">
              {subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setActiveView('catalog');
                }}
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-[#171717] hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold rounded shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>{t('heroPrimaryCta')}</span>
                <ArrowUpRight className="w-4 h-4 text-[#C4A77D]" />
              </button>

              <button
                onClick={() => {
                  const element = document.getElementById('categories-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActiveView('catalog');
                  }
                }}
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent hover:bg-stone-200/50 text-[#171717] text-xs uppercase tracking-[0.2em] font-semibold border border-stone-300 rounded transition-colors duration-200"
              >
                <span>{t('heroSecondaryCta')}</span>
              </button>
            </div>

            {/* Quiet Trust Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200/80 w-full max-w-lg text-stone-600">
              <div className="flex items-center gap-2 text-xs">
                <Truck className="w-4 h-4 text-[#C4A77D] shrink-0" />
                <span className="leading-tight">64 Districts Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#C4A77D] shrink-0" />
                <span className="leading-tight">Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <RefreshCw className="w-4 h-4 text-[#C4A77D] shrink-0" />
                <span className="leading-tight">Hassle-Free Exchange</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Fashion Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-lg overflow-hidden shadow-2xl bg-stone-200 border border-stone-200/80">
              <img
                src="/src/assets/images/hero_fashion_editorial_1794457621413.jpg"
                alt="ASVORE Men's Luxury Lookbook Collection"
                className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle Luxury Corner Label */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white text-xs font-medium tracking-widest uppercase">
                <span>The Contemporary Tailoring Series</span>
                <span className="text-[#C4A77D] font-mono">2026</span>
              </div>
            </div>

            {/* Decorative Offset Backdrop Frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#C4A77D]/40 rounded-lg -z-0 pointer-events-none hidden sm:block" />
          </div>

        </div>
      </div>
    </section>
  );
};
