import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../product/ProductCard';
import { Category } from '../../types';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    formatPrice, 
    t 
  } = useApp();

  const [priceRange, setPriceRange] = useState<number>(5000);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'latest' | 'price-asc' | 'price-desc' | 'popular'>('latest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categoriesList: (Category | 'All')[] = [
    'All',
    'Panjabis',
    'Shirts',
    'T-Shirts',
    'Trousers',
    'Watches',
    'Belts',
    'Wallets',
    'Sunglasses',
    'Perfumes'
  ];

  const availableSizes = ['M', 'L', 'XL', 'XXL', '30', '32', '34', '36', '38', '40', '42', '44'];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = product.name.en.toLowerCase().includes(q) || product.name.bn.toLowerCase().includes(q);
        const catMatch = product.category.toLowerCase().includes(q);
        const descMatch = product.description.en.toLowerCase().includes(q);
        if (!nameMatch && !catMatch && !descMatch) return false;
      }
      // Price filter
      const currentPrice = product.salePrice || product.price;
      if (currentPrice > priceRange) return false;
      // Size filter
      if (selectedSize) {
        if (!product.sizes || !product.sizes.some(s => s.includes(selectedSize))) {
          return false;
        }
      }
      // Stock filter
      if (onlyInStock && product.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'popular') return b.rating - a.rating;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [products, selectedCategory, searchQuery, priceRange, selectedSize, onlyInStock, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setPriceRange(5000);
    setSelectedSize(null);
    setOnlyInStock(false);
    setSortBy('latest');
  };

  return (
    <div className="bg-[#FBF9F5] py-10 sm:py-14 border-b border-[#E8E4DA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-stone-200 pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A6885E] block mb-2">
                COLLECTION CATALOG
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                {selectedCategory ? `${selectedCategory} Collection` : t('catalogTitle')}
              </h1>
              {searchQuery && (
                <div className="flex items-center gap-2 mt-2 text-xs text-stone-600">
                  <span>Search results for: <strong>"{searchQuery}"</strong></span>
                  <button onClick={() => setSearchQuery('')} className="text-stone-400 hover:text-black">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Filter Toggle & Desktop Sort */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 rounded text-xs font-semibold uppercase tracking-wider"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C4A77D]" />
                <span>Filters</span>
              </button>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-500 hidden sm:inline">{t('sortBy')}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-white border border-stone-300 rounded text-xs font-medium text-stone-800 focus:outline-none focus:border-[#C4A77D]"
                >
                  <option value="latest">{t('sortLatest')}</option>
                  <option value="price-asc">{t('sortPriceAsc')}</option>
                  <option value="price-desc">{t('sortPriceDesc')}</option>
                  <option value="popular">{t('sortPopular')}</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Filters Sidebar */}
          <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1 bg-white p-6 rounded-md border border-[#E8E4DA] space-y-6 shadow-xs`}>
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                Filter Results
              </span>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-900"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Categories Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3">
                {t('filterCategory')}
              </h4>
              <div className="space-y-1.5 text-xs">
                {categoriesList.map(cat => {
                  const isSelected = (cat === 'All' && selectedCategory === null) || selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat === 'All' ? null : cat)}
                      className={`w-full text-left py-1 px-2 rounded transition-colors flex items-center justify-between ${
                        isSelected 
                          ? 'bg-stone-900 text-white font-semibold' 
                          : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="font-mono text-[10px] opacity-70">
                        {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                <span>{t('filterPrice')}</span>
                <span className="font-mono text-[#A6885E] font-bold">
                  Up to {formatPrice(priceRange)}
                </span>
              </div>
              <input
                type="range"
                min="800"
                max="5000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#C4A77D] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-stone-400 mt-1">
                <span>৳800</span>
                <span>৳5,000</span>
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-800 mb-2.5">
                <span>{t('filterSize')}</span>
                {selectedSize && (
                  <button onClick={() => setSelectedSize(null)} className="text-[10px] text-stone-400 underline">
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {availableSizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                    className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                      selectedSize === sz
                        ? 'bg-stone-900 text-white border-black font-bold'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock status toggle */}
            <div className="pt-2 border-t border-stone-100">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-stone-900 accent-[#C4A77D]"
                />
                <span>{t('filterInStock')}</span>
              </label>
            </div>

          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            
            {/* Counter */}
            <div className="flex items-center justify-between mb-6 text-xs text-stone-500 font-medium">
              <span>Showing <strong>{filteredProducts.length}</strong> styles</span>
              {selectedCategory && (
                <span className="text-[#A6885E] font-semibold uppercase tracking-wider text-[11px]">
                  Filtered by {selectedCategory}
                </span>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-md border border-[#E8E4DA] p-12 text-center">
                <p className="text-stone-600 text-sm mb-4">
                  {t('noProductsFound')}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold rounded"
                >
                  {t('resetFilters')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
};
