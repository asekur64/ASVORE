import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../product/ProductCard';
import { ArrowRight, Sparkles, TrendingUp, Tag, Award } from 'lucide-react';

export const FeaturedSection: React.FC = () => {
  const { t, products, setActiveView, setSelectedCategory } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'bestsellers' | 'trending' | 'offers'>('all');

  const filteredProducts = products.filter(product => {
    if (activeTab === 'new') return product.isNewArrival;
    if (activeTab === 'bestsellers') return product.isBestSeller;
    if (activeTab === 'trending') return product.isTrending || product.rating >= 4.8;
    if (activeTab === 'offers') return Boolean(product.salePrice && product.salePrice < product.price);
    return true;
  }).slice(0, 8);

  return (
    <section className="py-16 sm:py-20 bg-[#FBF9F5] border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A6885E] block mb-2">
              CURATED MENSWEAR
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#171717] font-bold tracking-tight">
              {t('asvoreFavorites')}
            </h2>
            <p className="text-stone-500 text-sm mt-1.5">
              {t('favoritesSubtitle')}
            </p>
          </div>

          {/* Interactive Filter Segmented Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded border border-stone-300">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#171717] text-white shadow-xs'
                  : 'text-stone-700 hover:text-black'
              }`}
            >
              All Pieces
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1 ${
                activeTab === 'new'
                  ? 'bg-[#171717] text-white shadow-xs'
                  : 'text-stone-700 hover:text-black'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#C4A77D]" />
              <span>New Arrivals</span>
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1 ${
                activeTab === 'bestsellers'
                  ? 'bg-[#171717] text-white shadow-xs'
                  : 'text-stone-700 hover:text-black'
              }`}
            >
              <Award className="w-3 h-3 text-[#C4A77D]" />
              <span>Best Sellers</span>
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1 ${
                activeTab === 'trending'
                  ? 'bg-[#171717] text-white shadow-xs'
                  : 'text-stone-700 hover:text-black'
              }`}
            >
              <TrendingUp className="w-3 h-3 text-[#C4A77D]" />
              <span>Trending</span>
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1 ${
                activeTab === 'offers'
                  ? 'bg-[#171717] text-white shadow-xs'
                  : 'text-stone-700 hover:text-black'
              }`}
            >
              <Tag className="w-3 h-3 text-[#C4A77D]" />
              <span>Special Offers</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA to view full catalog */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setActiveView('catalog');
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold rounded shadow transition-all duration-200"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4 text-[#C4A77D]" />
          </button>
        </div>

      </div>
    </section>
  );
};
