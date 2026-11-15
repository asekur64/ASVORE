import React from 'react';
import { useApp } from '../../context/AppContext';
import { Category } from '../../types';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../../assets/images';

interface CategoryItem {
  id: Category;
  title: { en: string; bn: string };
  subtitle: { en: string; bn: string };
  image: string;
}

const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: 'Panjabis',
    title: { en: 'Panjabis', bn: 'পাঞ্জাবি' },
    subtitle: { en: 'Handcrafted semi-silk & cotton traditional luxury', bn: 'হ্যান্ডক্রাফটেড সেমি-সিল্ক ও কটন ঐতিহ্যবাহী পোশাক' },
    image: IMAGES.panjabiTraditional,
  },
  {
    id: 'Watches',
    title: { en: 'Watches', bn: 'ঘড়ি' },
    subtitle: { en: 'Precision steel chronographs and minimal timepieces', bn: 'প্রেসিশন স্টিল ক্রোনোগ্রাফ এবং এলিগেন্ট ঘড়ি' },
    image: IMAGES.mensWatch,
  },
  {
    id: 'Perfumes',
    title: { en: 'Perfumes', bn: 'পারফিউম' },
    subtitle: { en: 'Rich oriental ouds, amber, and French formulations', bn: 'লং-লাস্টিং প্রাচ্যীয় উদ, অ্যাম্বার ও ফরাসি সুরভি' },
    image: IMAGES.perfumeLuxury,
  },
  {
    id: 'Shirts',
    title: { en: 'Shirts', bn: 'শার্ট' },
    subtitle: { en: 'Egyptian cotton pinpoint oxfords & resort linens', bn: 'ইজিপশিয়ান কটন ও প্রিমিয়াম লিনেন শার্ট' },
    image: IMAGES.mensShirt,
  },
  {
    id: 'T-Shirts',
    title: { en: 'T-Shirts', bn: 'টি-শার্ট' },
    subtitle: { en: '260 GSM heavy Supima cotton minimalist tees', bn: '২৬০ জিএসএম হেভিওয়েট সুপিমা কটন' },
    image: IMAGES.mensTshirt,
  },
  {
    id: 'Trousers',
    title: { en: 'Trousers', bn: 'ট্রাউজার' },
    subtitle: { en: 'High-rise Gurkha & tailored gabardine trousers', bn: 'গুর্খা বেল্টলেস ও টেইলরড প্লিটেড ট্রাউজার' },
    image: IMAGES.mensTrouser,
  },
  {
    id: 'Belts',
    title: { en: 'Belts', bn: 'বেল্ট' },
    subtitle: { en: 'Vegetable-tanned full-grain reversible leather', bn: 'ফুল-গ্রেইন জেনুইন রিভার্সিবল লেদার' },
    image: IMAGES.leatherBelt,
  },
  {
    id: 'Wallets',
    title: { en: 'Wallets', bn: 'ওয়ালেট' },
    subtitle: { en: 'Ultra-slim RFID-shielded bifold cardholders', bn: 'আরএফআইডি প্রটেক্টেড স্লিম লেদার ওয়ালেট' },
    image: IMAGES.leatherWallet,
  },
  {
    id: 'Sunglasses',
    title: { en: 'Sunglasses', bn: 'সানগ্লাস' },
    subtitle: { en: 'Cellulose acetate polarized UV400 frames', bn: 'পোলারাইজড ইউভি৪০০ সেলুলোজ ফ্রেম' },
    image: IMAGES.mensSunglasses,
  },
];

export const CategoryShowcase: React.FC = () => {
  const { t, language, setSelectedCategory, setActiveView } = useApp();

  const handleSelect = (category: Category) => {
    setSelectedCategory(category);
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="categories-section" className="py-16 sm:py-20 bg-[#FBF9F5] border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A6885E] block mb-2">
              ASVORE DEPARTMENTS
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#171717] font-bold tracking-tight">
              {t('shopByCategory')}
            </h2>
            <p className="text-stone-500 text-sm mt-2">
              {t('categorySubtitle')}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setActiveView('catalog');
            }}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-stone-800 hover:text-[#C4A77D] transition-colors"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Categories Grid (3 Columns on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES_DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className="group relative cursor-pointer bg-white rounded-md overflow-hidden border border-[#E8E4DA] hover:border-[#C4A77D]/60 transition-all duration-300 hover:shadow-lg flex flex-col"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title[language]}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Category Text & Action */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-stone-900 group-hover:text-[#A6885E] transition-colors">
                    {item.title[language]}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {item.subtitle[language]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-stone-800 group-hover:text-[#A6885E]">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
