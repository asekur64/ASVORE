import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight } from 'lucide-react';
import { Category } from '../../types';
import { IMAGES } from '../../assets/images';

export const ExclusiveCollections: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useApp();

  const collections = [
    {
      id: 'sartorial',
      title: 'Modern Sartorial Tailoring',
      subtitle: 'Sharply cut Gurkha trousers, Royal Oxford shirts, and Italian leather dress belts.',
      category: 'Trousers' as Category,
      image: IMAGES.mensTrouser,
      tag: 'COLLECTION 01',
    },
    {
      id: 'heritage',
      title: 'Traditional Elegance & Panjabis',
      subtitle: 'Bespoke semi-silk and combed cotton Panjabis with handcrafted collar embroidery.',
      category: 'Panjabis' as Category,
      image: IMAGES.panjabiTraditional,
      tag: 'COLLECTION 02',
    },
    {
      id: 'accessories',
      title: 'The Horology & Leather Edit',
      subtitle: 'Brushed steel chronographs, vegetable-tanned wallets, and polarized acetate eyewear.',
      category: 'Watches' as Category,
      image: IMAGES.mensWatch,
      tag: 'COLLECTION 03',
    },
    {
      id: 'fragrance',
      title: 'Haute Parfumerie Privée',
      subtitle: 'Smoky agarwood, French bergamot, and rich ambergris formulated for lasting sillage.',
      category: 'Perfumes' as Category,
      image: IMAGES.perfumeLuxury,
      tag: 'COLLECTION 04',
    },
  ];

  const handleSelectCollection = (cat: Category) => {
    setSelectedCategory(cat);
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="exclusive-collections" className="py-16 sm:py-20 bg-white border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A6885E] block mb-2">
              CURATED CAPSULES
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#171717] font-bold tracking-tight">
              Exclusive Collections
            </h2>
            <p className="text-stone-500 text-sm mt-1.5">
              Cohesive sartorial concepts designed for occasions, modern work, and signature style.
            </p>
          </div>
        </div>

        {/* 2x2 Editorial Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => handleSelectCollection(col.category)}
              className="group relative cursor-pointer bg-[#FBF9F5] rounded-md overflow-hidden border border-[#E8E4DA] hover:border-[#C4A77D]/70 transition-all duration-300 hover:shadow-lg flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-stone-900 text-[10px] tracking-widest font-mono font-bold uppercase px-2.5 py-1 rounded-xs">
                  {col.tag}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-stone-900 group-hover:text-[#A6885E] transition-colors mb-2">
                    {col.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {col.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-200/70 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-900 group-hover:text-[#A6885E]">
                  <span>Discover Capsule</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
