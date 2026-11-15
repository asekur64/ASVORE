import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Compass, Sparkles, Headphones } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { t } = useApp();

  const features = [
    {
      icon: <Award className="w-6 h-6 text-[#A6885E]" />,
      title: t('whyReason1Title'),
      desc: t('whyReason1Desc'),
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#A6885E]" />,
      title: t('whyReason2Title'),
      desc: t('whyReason2Desc'),
    },
    {
      icon: <Compass className="w-6 h-6 text-[#A6885E]" />,
      title: t('whyReason3Title'),
      desc: t('whyReason3Desc'),
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#A6885E]" />,
      title: t('whyReason4Title'),
      desc: t('whyReason4Desc'),
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A6885E] block mb-2">
            THE ASVORE STANDARD
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-bold tracking-tight">
            {t('whyHeading')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-md bg-[#FBF9F5] border border-[#E8E4DA] hover:border-[#C4A77D]/60 transition-all duration-200 flex flex-col items-start"
            >
              <div className="p-3 rounded bg-white shadow-xs border border-stone-200 mb-4">
                {feat.icon}
              </div>
              <h3 className="font-sans font-bold text-base text-stone-900 mb-2">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
