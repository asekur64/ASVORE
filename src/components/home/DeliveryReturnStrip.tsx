import React from 'react';
import { useApp } from '../../context/AppContext';
import { Truck, RefreshCw, ShieldCheck, Headphones, CreditCard, MapPin } from 'lucide-react';

export const DeliveryReturnStrip: React.FC = () => {
  const { setActiveView, formatPrice, settings } = useApp();

  return (
    <section className="py-14 bg-[#171717] text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C4A77D] block mb-1">
            CUSTOMER TRUST & COMMITMENT
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Nationwide Delivery & Assurance
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            Reliable doorstep fulfillment, verified payments, and straightforward size exchanges.
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Nationwide Delivery */}
          <div className="p-5 bg-stone-900/60 rounded border border-stone-800 hover:border-stone-700 transition-colors space-y-2">
            <div className="w-10 h-10 rounded bg-[#C4A77D]/10 text-[#C4A77D] flex items-center justify-center mb-3">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">
              All 64 Districts Delivery
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Inside Dhaka: <strong>24–48 Hours</strong> (৳{settings.deliveryInsideDhaka}). Outside Dhaka: <strong>48–72 Hours</strong> (৳{settings.deliveryOutsideDhaka}). Free shipping on orders over {formatPrice(settings.freeDeliveryThreshold)}.
            </p>
          </div>

          {/* Card 2: Flexible Payments */}
          <div className="p-5 bg-stone-900/60 rounded border border-stone-800 hover:border-stone-700 transition-colors space-y-2">
            <div className="w-10 h-10 rounded bg-[#C4A77D]/10 text-[#C4A77D] flex items-center justify-center mb-3">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">
              COD & Verified MFS
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Pay Cash on Delivery upon opening inspection, or securely via official <strong>bKash</strong> & <strong>Nagad</strong> Merchant with manual TrxID verification.
            </p>
          </div>

          {/* Card 3: 7-Day Exchange */}
          <div className="p-5 bg-stone-900/60 rounded border border-stone-800 hover:border-stone-700 transition-colors space-y-2">
            <div className="w-10 h-10 rounded bg-[#C4A77D]/10 text-[#C4A77D] flex items-center justify-center mb-3">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">
              7-Day Size Exchange
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Hassle-free size replacement if your shirt or Panjabi doesn't fit perfectly. Unworn items in original packaging exchanged with priority courier dispatch.
            </p>
          </div>

          {/* Card 4: Concierge Support */}
          <div className="p-5 bg-stone-900/60 rounded border border-stone-800 hover:border-stone-700 transition-colors space-y-2">
            <div className="w-10 h-10 rounded bg-[#C4A77D]/10 text-[#C4A77D] flex items-center justify-center mb-3">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">
              Direct Concierge Support
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Real human assistance via WhatsApp at <strong>+8801815951971</strong> or visit our physical showroom in Gaibandha Sadar for bespoke fitting.
            </p>
          </div>

        </div>

        {/* Quick Links Footer within Strip */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C4A77D]" />
            <span>100% Genuine Atelier Craftsmanship Guaranteed</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView('policies')}
              className="text-[#C4A77D] hover:underline"
            >
              Read Full Delivery & Return Policies &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
