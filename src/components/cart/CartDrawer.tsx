import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    formatPrice, 
    t, 
    setActiveView,
    settings,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponDiscount
  } = useApp();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error: boolean } | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = settings.freeDeliveryThreshold;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;

    const res = applyCoupon(couponCodeInput);
    setCouponMsg({ text: res.message, error: !res.success });
    if (res.success) {
      setCouponCodeInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-stone-900 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif-luxury text-xl font-bold text-stone-900">
                {t('shoppingBag')}
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 bg-stone-100 rounded text-stone-600">
                ({cart.length})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Milestone Indicator */}
          {cart.length > 0 && (
            <div className="bg-[#FBF9F5] px-6 py-3 border-b border-stone-200/80 text-xs">
              <div className="flex items-center justify-between font-medium text-stone-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#A6885E]" />
                  {amountNeeded > 0
                    ? t('freeDeliveryProgress', { amount: formatPrice(amountNeeded) })
                    : t('freeDeliveryUnlocked')}
                </span>
                <span className="font-mono text-stone-500">{progressPercent}%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#C4A77D] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4 text-stone-400">
                  <Tag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-lg font-bold text-stone-900 mb-1">
                  {t('emptyCart')}
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  {t('emptyCartSubtitle')}
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveView('catalog');
                  }}
                  className="px-6 py-3 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-widest font-semibold rounded"
                >
                  {t('startShopping')}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-stone-100 rounded overflow-hidden shrink-0 border border-stone-200">
                    <img
                      src={item.image}
                      alt={item.name.en}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1">
                          {item.name.en}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant metadata */}
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-1">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.size && item.color && <span>·</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>

                      <div className="text-xs font-mono font-bold text-stone-900 mt-1">
                        {formatPrice(item.price)}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-stone-200 rounded">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-mono font-bold text-stone-800">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#FBF9F5] border-t border-stone-200 space-y-4">
              
              {/* Coupon Code Section */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-{formatPrice(couponDiscount)})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-stone-700 text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    placeholder={t('couponCode')}
                    className="flex-1 px-3 py-2 bg-white border border-stone-300 rounded text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-[#C4A77D]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-800 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded"
                  >
                    {t('applyCoupon')}
                  </button>
                </form>
              )}

              {couponMsg && (
                <p className={`text-[11px] ${couponMsg.error ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {couponMsg.text}
                </p>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span className="font-mono">{formatPrice(cartSubtotal)}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>{t('discount')}</span>
                    <span className="font-mono">-{formatPrice(couponDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{t('deliveryCharge')}</span>
                  <span className="font-mono text-stone-500">
                    {cartSubtotal >= freeShippingThreshold ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>

                <div className="flex justify-between text-sm sm:text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>{t('total')}</span>
                  <span className="font-mono text-lg text-stone-900">
                    {formatPrice(Math.max(0, cartSubtotal - couponDiscount))}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-bold rounded flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>{t('proceedToCheckout')}</span>
                <ArrowRight className="w-4 h-4 text-[#C4A77D]" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
