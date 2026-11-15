import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';

export const PromotionalBanner: React.FC = () => {
  const { t, setActiveView, setSelectedCategory } = useApp();

  return (
    <section className="relative py-20 bg-[#171717] text-white overflow-hidden border-b border-stone-800">
      {/* Background Subtle Luxury Texture Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C4A77D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs uppercase tracking-[0.35em] font-semibold text-[#C4A77D] block mb-4">
          EXCLUSIVE CAMPAIGN 2026
        </span>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-3xl mx-auto text-balance">
          {t('promoHeading')}
        </h2>

        <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal leading-relaxed">
          {t('promoDescription')}
        </p>

        <button
          onClick={() => {
            setSelectedCategory(null);
            setActiveView('catalog');
          }}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C4A77D] hover:bg-[#b0946b] text-[#171717] text-xs uppercase tracking-[0.2em] font-bold rounded shadow-lg transition-all duration-200"
        >
          <span>{t('promoCta')}</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
