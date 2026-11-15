import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from './ProductCard';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Check, 
  Minus, 
  Plus, 
  Share2,
  ChevronRight
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    language, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setActiveView,
    setIsCartOpen,
    reviews,
    t
  } = useApp();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : undefined);
  const [selectedColor, setSelectedColor] = useState(product?.colors ? product.colors[0].name : undefined);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100) 
    : 0;

  const productReviews = reviews.filter(r => r.productId === product.id && r.isApproved);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name[language],
        text: `Check out ${product.name[language]} at ASVORE`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-[#FBF9F5] py-8 sm:py-12 border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8 font-medium">
          <button 
            onClick={() => setActiveView('home')} 
            className="hover:text-black transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <button 
            onClick={() => setActiveView('catalog')} 
            className="hover:text-black transition-colors"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-stone-900 truncate max-w-xs">{product.name[language]}</span>
        </nav>

        {/* Contiguous Purchase Module (PDP Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Image Gallery (Sticky on desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded overflow-hidden border-2 transition-all ${
                    activeImageIdx === idx 
                      ? 'border-[#C4A77D] shadow-md' 
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name[language]} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 relative aspect-[4/5] bg-stone-100 rounded-lg overflow-hidden border border-stone-200/80 shadow-md">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name[language]}
                className="w-full h-full object-cover object-center cursor-zoom-in"
                referrerPolicy="no-referrer"
              />

              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-xs">
                  -{discountPercent}% OFF
                </div>
              )}

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-md ${
                  isFavorited ? 'bg-[#171717] text-[#C4A77D]' : 'bg-white/90 text-stone-700 hover:text-black'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

          </div>

          {/* Right Column: Sticky Purchase Details */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            
            {/* Category & SKU */}
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-medium">
              <span className="uppercase tracking-[0.2em] text-[#A6885E] font-semibold">
                {product.category}
              </span>
              <span className="font-mono text-stone-400">SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 leading-tight mb-3">
              {product.name[language]}
            </h1>

            {/* Ratings & Social Proof */}
            <div className="flex items-center gap-3 text-xs mb-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'}`}
                  />
                ))}
              </div>
              <span className="font-semibold text-stone-800">{product.rating.toFixed(1)}</span>
              <span className="text-stone-400">·</span>
              <span className="text-stone-500 underline cursor-pointer" onClick={() => setActiveTab('reviews')}>
                {product.reviewCount} Verified Client Reviews
              </span>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-white rounded-md border border-[#E8E4DA] mb-6 flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-stone-950">
                  {formatPrice(product.salePrice || product.price)}
                </span>
                {product.salePrice && (
                  <span className="text-sm font-mono text-stone-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Stock status indicator */}
              <div className="text-xs">
                {product.stock <= 0 ? (
                  <span className="text-rose-600 font-semibold uppercase tracking-wider">Out of Stock</span>
                ) : product.stock <= 5 ? (
                  <span className="text-amber-700 font-semibold">Only {product.stock} left in stock</span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    In Stock ({product.stock} units)
                  </span>
                )}
              </div>
            </div>

            {/* Description Excerpt */}
            <p className="text-stone-600 text-sm leading-relaxed mb-6">
              {product.description[language]}
            </p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  <span>Color: <strong className="text-stone-900">{selectedColor}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-transform ${
                        selectedColor === c.name 
                          ? 'border-[#C4A77D] scale-110 shadow-sm ring-2 ring-[#C4A77D]/30' 
                          : 'border-stone-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={`Select ${c.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  <span>{t('selectSize')}</span>
                  <span className="text-[#A6885E] lowercase tracking-normal text-xs cursor-pointer hover:underline">
                    Size guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 text-xs font-mono font-semibold rounded border transition-colors ${
                        selectedSize === sz
                          ? 'bg-[#171717] text-white border-black shadow-xs'
                          : 'bg-white text-stone-700 border-stone-300 hover:border-black'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Actions */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-4">
                {/* Stepper */}
                <div className="flex items-center border border-stone-300 rounded bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-3 text-stone-600 hover:text-black disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-mono font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="p-3 text-stone-600 hover:text-black disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
                  disabled={product.stock <= 0}
                  className="flex-1 py-3.5 px-6 bg-[#171717] hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-semibold rounded shadow-md disabled:bg-stone-300 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C4A77D]" />
                  <span>{t('addToCart')}</span>
                </button>
              </div>

              {/* Buy Now (Direct Checkout) */}
              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="w-full py-3.5 bg-[#C4A77D] hover:bg-[#b0946b] text-[#171717] text-xs uppercase tracking-[0.2em] font-bold rounded shadow transition-all disabled:opacity-50"
              >
                {t('buyNow')}
              </button>
            </div>

            {/* Delivery & Assurance Strip */}
            <div className="p-4 bg-white rounded border border-[#E8E4DA] space-y-3 text-xs text-stone-600">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-[#A6885E] shrink-0" />
                <span>{t('freeDeliveryNote')}</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#A6885E] shrink-0" />
                <span>Cash on Delivery & bKash / Nagad accepted nationwide</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-[#A6885E] shrink-0" />
                <span>7-Day Return & Size Exchange Guarantee</span>
              </div>
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-stone-500">
                <span>Direct Showroom Fulfillment: Gaibandha Sadar</span>
                <button onClick={handleShare} className="hover:text-black flex items-center gap-1">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Accordion / Tabs: Details, Specs & Reviews */}
        <div className="mt-16 pt-12 border-t border-stone-200">
          <div className="flex items-center gap-8 border-b border-stone-200 pb-4">
            <button
              onClick={() => setActiveTab('details')}
              className={`text-sm uppercase tracking-wider font-semibold pb-4 -mb-4 transition-colors ${
                activeTab === 'details'
                  ? 'border-b-2 border-stone-900 text-stone-900'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              {t('productDetails')}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`text-sm uppercase tracking-wider font-semibold pb-4 -mb-4 transition-colors ${
                activeTab === 'specs'
                  ? 'border-b-2 border-stone-900 text-stone-900'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              {t('specifications')}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-sm uppercase tracking-wider font-semibold pb-4 -mb-4 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-stone-900 text-stone-900'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              {t('customerReviews')} ({productReviews.length})
            </button>
          </div>

          <div className="py-8">
            {activeTab === 'details' && (
              <div className="max-w-2xl space-y-4">
                <p className="text-stone-700 text-sm leading-relaxed">
                  {product.description[language]}
                </p>
                <ul className="space-y-2 text-stone-600 text-xs sm:text-sm pl-4 list-disc">
                  {product.details[language]?.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-xl">
                <table className="w-full text-xs text-stone-700 divide-y divide-stone-200">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <tr key={key} className="py-2.5 flex justify-between">
                        <td className="font-semibold text-stone-900">{key}</td>
                        <td className="text-stone-600 text-right">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 max-w-3xl">
                {productReviews.length === 0 ? (
                  <p className="text-xs text-stone-500">
                    No approved client reviews for this product yet.
                  </p>
                ) : (
                  productReviews.map(rev => (
                    <div key={rev.id} className="p-4 bg-white rounded border border-stone-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-xs text-stone-900">{rev.customerName}</span>
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'text-stone-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-stone-600 italic">"{rev.comment}"</p>
                      <span className="text-[10px] text-stone-400 block mt-2">{rev.date}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200">
            <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 mb-8">
              {t('relatedProducts')}
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
