import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    language, 
    formatPrice, 
    openProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    t 
  } = useApp();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100) 
    : 0;

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [imageError, setImageError] = useState(false);
  const [addedRecently, setAddedRecently] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock <= 0) return;
    addToCart(product, selectedSize, selectedColor, 1);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1600);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-md overflow-hidden border border-[#E8E4DA] hover:border-[#C4A77D]/70 hover:shadow-lg transition-all duration-300">
      
      {/* Product Image Stage */}
      <div 
        className="relative aspect-[3/4] bg-[#F5F2EB] overflow-hidden cursor-pointer select-none"
        onClick={() => openProduct(product.id)}
      >
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-stone-100">
            <span className="font-serif-luxury text-sm font-bold text-stone-700 tracking-wider uppercase mb-1">
              ASVORE
            </span>
            <span className="text-[11px] text-stone-500 font-medium">
              {product.name[language]}
            </span>
          </div>
        ) : (
          <img
            src={product.images[0]}
            alt={product.name[language]}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}

        {/* Badges Stack (Clean anti-pill layout) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discountPercent > 0 && (
            <span className="bg-[#171717] text-white text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded-xs shadow-xs">
              -{discountPercent}%
            </span>
          )}
          {product.isNewArrival && !discountPercent && (
            <span className="bg-[#C4A77D] text-[#171717] text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 rounded-xs shadow-xs">
              NEW
            </span>
          )}
          {product.isTrending && (
            <span className="bg-stone-800 text-[#C4A77D] text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded-xs shadow-xs">
              TRENDING
            </span>
          )}
          {product.isDemo && (
            <span 
              className="bg-amber-100/90 text-amber-800 border border-amber-300/80 text-[9px] tracking-widest uppercase font-semibold px-1.5 py-0.5 rounded-xs"
              title="Demo product for showroom preview. Admin can replace or customize."
            >
              DEMO
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm z-10 ${
            isFavorited 
              ? 'bg-[#171717] text-[#C4A77D]' 
              : 'bg-white/90 text-stone-600 hover:text-black hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Interactive Quick View / Add to Bag Hover Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 bg-white/95 hover:bg-white text-stone-900 text-[11px] font-semibold tracking-wider uppercase rounded shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#C4A77D]" />
            <span>{t('quickView')}</span>
          </button>
          
          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={`p-2 rounded shadow-xs transition-colors flex items-center justify-center ${
              addedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-[#171717] hover:bg-black text-[#C4A77D]'
            } disabled:bg-stone-400 disabled:cursor-not-allowed`}
            title={addedRecently ? 'Added to Bag!' : t('addToCart')}
            aria-label={t('addToCart')}
          >
            {addedRecently ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div 
          className="cursor-pointer"
          onClick={() => openProduct(product.id)}
        >
          {/* Metadata Row: Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5 font-medium">
            <span className="uppercase tracking-widest text-[11px] text-[#A6885E]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-mono tabular-nums text-stone-600">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-stone-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-sans font-semibold text-sm sm:text-base text-stone-900 line-clamp-1 hover:text-[#A6885E] transition-colors leading-snug">
            {product.name[language]}
          </h3>
        </div>

        {/* Sizes and Colors preview */}
        <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          {/* Sizes preview */}
          {product.sizes && product.sizes.length > 0 ? (
            <div className="flex items-center gap-1 overflow-hidden" title="Available Sizes">
              <span className="text-[10px] text-stone-400 uppercase font-medium mr-0.5">Sizes:</span>
              {product.sizes.slice(0, 4).map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(sz);
                  }}
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded border transition-colors ${
                    selectedSize === sz
                      ? 'bg-stone-900 text-white border-black font-bold'
                      : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {sz.split(' ')[0]}
                </button>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-[9px] text-stone-400 font-mono">+{product.sizes.length - 4}</span>
              )}
            </div>
          ) : (
            <span className="text-[10px] text-stone-400 uppercase">Standard Size</span>
          )}

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1 shrink-0" title="Available Colors">
              {product.colors.slice(0, 3).map((col) => (
                <button
                  key={col.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(col.name);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                    selectedColor === col.name ? 'ring-1 ring-black scale-110' : 'border-stone-300'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price Row & Stock Status */}
        <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2 font-mono tabular-nums">
            <span className="text-base sm:text-lg font-bold text-stone-900">
              {formatPrice(product.salePrice || product.price)}
            </span>
            {product.salePrice && (
              <span className="text-xs text-stone-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <div className="text-[11px]">
            {product.stock <= 0 ? (
              <span className="text-rose-600 font-medium">Out of Stock</span>
            ) : product.stock <= 5 ? (
              <span className="text-amber-700 font-medium">Only {product.stock} left</span>
            ) : (
              <span className="text-emerald-700 font-medium">In Stock</span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
