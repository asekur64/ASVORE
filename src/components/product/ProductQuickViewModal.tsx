import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, ShoppingBag, Heart, ArrowUpRight } from 'lucide-react';

export const ProductQuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    language, 
    formatPrice, 
    addToCart, 
    openProduct, 
    toggleWishlist, 
    isInWishlist,
    t 
  } = useApp();

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    quickViewProduct?.sizes ? quickViewProduct.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    quickViewProduct?.colors ? quickViewProduct.colors[0].name : undefined
  );

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="fixed inset-0"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative bg-white rounded-lg max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 z-10 flex flex-col md:flex-row">
        
        {/* Close button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 flex items-center justify-center shadow"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 aspect-[4/5] bg-stone-100 relative">
          <img
            src={quickViewProduct.images[0]}
            alt={quickViewProduct.name[language]}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#A6885E] font-semibold block mb-1">
              {quickViewProduct.category}
            </span>
            <h3 className="font-serif-luxury text-xl font-bold text-stone-900 mb-2">
              {quickViewProduct.name[language]}
            </h3>

            {/* Stars */}
            <div className="flex items-center gap-2 text-xs mb-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.floor(quickViewProduct.rating) ? 'fill-current' : 'text-stone-300'}`}
                  />
                ))}
              </div>
              <span className="font-semibold text-stone-800">{quickViewProduct.rating.toFixed(1)}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4 font-mono">
              <span className="text-xl font-bold text-stone-900">
                {formatPrice(quickViewProduct.salePrice || quickViewProduct.price)}
              </span>
              {quickViewProduct.salePrice && (
                <span className="text-xs text-stone-400 line-through">
                  {formatPrice(quickViewProduct.price)}
                </span>
              )}
            </div>

            <p className="text-xs text-stone-600 line-clamp-3 mb-4 leading-relaxed">
              {quickViewProduct.description[language]}
            </p>

            {/* Variations */}
            {quickViewProduct.sizes && (
              <div className="mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-700 block mb-1.5">
                  Size
                </span>
                <div className="flex gap-2">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 text-xs font-mono font-medium rounded border ${
                        selectedSize === s
                          ? 'bg-[#171717] text-white border-black'
                          : 'bg-white text-stone-700 border-stone-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-4 border-t border-stone-100">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  addToCart(quickViewProduct, selectedSize, selectedColor);
                  setQuickViewProduct(null);
                }}
                disabled={quickViewProduct.stock <= 0}
                className="flex-1 py-3 bg-[#171717] hover:bg-black text-white text-xs uppercase tracking-widest font-semibold rounded flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#C4A77D]" />
                <span>{t('addToCart')}</span>
              </button>
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 rounded border border-stone-300 ${
                  isFavorited ? 'bg-[#171717] text-[#C4A77D]' : 'bg-white text-stone-700'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => {
                const id = quickViewProduct.id;
                setQuickViewProduct(null);
                openProduct(id);
              }}
              className="w-full py-2 text-stone-600 hover:text-black text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1"
            >
              <span>View Full Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
