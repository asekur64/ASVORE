import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Check } from 'lucide-react';
import { IMAGES } from '../../assets/images';

export const BrandStory: React.FC = () => {
  const { t, setActiveView } = useApp();

  return (
    <section className="py-20 bg-[#FBF9F5] border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image Showcase */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="aspect-[4/5] rounded overflow-hidden shadow-xl bg-stone-200 border border-stone-200">
              <img
                src={IMAGES.panjabiTraditional}
                alt="ASVORE Craftsmanship"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Minimal Stat Card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded shadow-xl border border-stone-200/80 max-w-xs hidden sm:block">
              <span className="text-[11px] uppercase tracking-widest text-[#A6885E] font-semibold block mb-1">
                OUR PROMISE
              </span>
              <p className="font-serif-luxury text-base font-bold text-stone-900 leading-snug">
                "Style Beyond Ordinary. Quality within Reach."
              </p>
            </div>
          </div>

          {/* Prose Content */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A6885E] block mb-3">
              THE PHILOSOPHY
            </span>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-[1.18] mb-6 text-balance">
              {t('storyHeading')}
            </h2>

            <p className="text-stone-600 text-base leading-relaxed mb-6 font-normal">
              {t('storyDescription')}
            </p>

            <div className="space-y-3 mb-8 text-stone-700 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#C4A77D]/20 text-[#A6885E] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>Bespoke tailoring cuts inspired by European and South Asian sartorial heritage</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#C4A77D]/20 text-[#A6885E] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>Honest pricing with transparent atelier craftsmanship</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#C4A77D]/20 text-[#A6885E] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span>Flagship showroom based in Gaibandha, serving all 64 districts</span>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold rounded transition-colors"
            >
              <span>{t('storyCta')}</span>
              <ArrowRight className="w-4 h-4 text-[#C4A77D]" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
