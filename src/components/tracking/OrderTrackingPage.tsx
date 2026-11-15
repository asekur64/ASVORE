import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus, Order } from '../../types';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Calendar, 
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

const STATUS_STAGES: OrderStatus[] = [
  'Order Placed',
  'Order Confirmed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

export const OrderTrackingPage: React.FC = () => {
  const { orders, formatPrice, t } = useApp();

  const [orderQuery, setOrderQuery] = useState('ASV-8942');
  const [phoneQuery, setPhoneQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => orders[0] || null);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    const cleanOrder = orderQuery.trim().toUpperCase();
    const cleanPhone = phoneQuery.trim();

    const match = orders.find(o => {
      const orderMatches = o.orderNumber.toUpperCase() === cleanOrder || o.id === orderQuery.trim();
      const phoneMatches = !cleanPhone || o.customer.phone.includes(cleanPhone);
      return orderMatches && phoneMatches;
    });

    setSearchedOrder(match || null);
  };

  const getStageIndex = (status: OrderStatus) => {
    if (status === 'Cancelled' || status === 'Returned') return -1;
    return STATUS_STAGES.indexOf(status);
  };

  const currentStageIdx = searchedOrder ? getStageIndex(searchedOrder.status) : -1;

  return (
    <div className="bg-[#FBF9F5] py-12 sm:py-16 border-b border-[#E8E4DA] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A6885E] block mb-2">
            NATIONWIDE REAL-TIME DISPATCH
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            {t('trackOrderHeading')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            {t('trackOrderSubtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white p-5 rounded-lg border border-[#E8E4DA] shadow-xs mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Order Number
              </label>
              <input
                type="text"
                required
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="e.g. ASV-8942"
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded font-mono uppercase focus:outline-none focus:border-[#C4A77D]"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={phoneQuery}
                onChange={(e) => setPhoneQuery(e.target.value)}
                placeholder="e.g. 01712345678"
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded font-mono focus:outline-none focus:border-[#C4A77D]"
              />
            </div>

            <div className="sm:col-span-3 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-[#C4A77D]" />
                <span>{t('trackButton')}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Search Results */}
        {hasSearched && (
          searchedOrder ? (
            <div className="space-y-6">
              
              {/* Top Order Status Card */}
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#E8E4DA] shadow-xs">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#A6885E] font-semibold block mb-0.5">
                      OFFICIAL DISPATCH RECORD
                    </span>
                    <h2 className="font-mono text-xl sm:text-2xl font-bold text-stone-900">
                      #{searchedOrder.orderNumber}
                    </h2>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span>·</span>
                      <span className="font-semibold text-stone-800">{searchedOrder.customer.fullName}</span>
                    </div>
                  </div>

                  <div className="text-right sm:self-center">
                    <span className="inline-block px-3 py-1 bg-stone-900 text-white rounded text-xs font-semibold uppercase tracking-wider">
                      {searchedOrder.status}
                    </span>
                    {searchedOrder.trackingNumber && (
                      <span className="block text-xs font-mono text-stone-500 mt-1">
                        Courier Trk: {searchedOrder.trackingNumber}
                      </span>
                    )}
                  </div>
                </div>

                {/* Visual 6-Stage Progress Stepper */}
                <div className="py-8">
                  <div className="relative">
                    {/* Connecting bar */}
                    <div className="absolute top-4 left-0 right-0 h-0.5 bg-stone-200 -z-0" />
                    <div 
                      className="absolute top-4 left-0 h-0.5 bg-[#C4A77D] transition-all duration-500 -z-0"
                      style={{ 
                        width: `${currentStageIdx >= 0 ? (currentStageIdx / (STATUS_STAGES.length - 1)) * 100 : 0}%` 
                      }}
                    />

                    {/* Stage Nodes */}
                    <div className="relative z-10 flex justify-between">
                      {STATUS_STAGES.map((stage, idx) => {
                        const isCompleted = idx <= currentStageIdx;
                        const isCurrent = idx === currentStageIdx;

                        return (
                          <div key={stage} className="flex flex-col items-center text-center max-w-[80px]">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-all ${
                              isCompleted 
                                ? 'bg-stone-900 text-white shadow-sm' 
                                : 'bg-stone-100 text-stone-400 border border-stone-300'
                            } ${isCurrent ? 'ring-4 ring-[#C4A77D]/30' : ''}`}>
                              {isCompleted ? <CheckCircle2 className="w-4 h-4 text-[#C4A77D]" /> : idx + 1}
                            </div>
                            <span className={`text-[10px] mt-2 font-semibold uppercase tracking-wider leading-tight ${
                              isCurrent ? 'text-stone-900' : isCompleted ? 'text-stone-700' : 'text-stone-400'
                            }`}>
                              {stage}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Stage Activity Log */}
                <div className="pt-6 border-t border-stone-200">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-stone-900 mb-4">
                    Tracking Timeline & Log
                  </h3>
                  <div className="space-y-3">
                    {searchedOrder.statusHistory.map((hist, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs">
                        <Clock className="w-3.5 h-3.5 text-[#C4A77D] shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span className="font-semibold text-stone-900">{hist.status}</span>
                          <span className="text-stone-400 text-[11px] ml-2">
                            {new Date(hist.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {hist.note && (
                            <p className="text-stone-600 text-[11px] mt-0.5">{hist.note}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Order Items & Destination Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Destination */}
                <div className="bg-white p-6 rounded-lg border border-[#E8E4DA] shadow-xs text-xs space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-stone-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#A6885E]" />
                    <span>Delivery Details</span>
                  </h4>
                  <div className="text-stone-700 space-y-1">
                    <p><strong>Recipient:</strong> {searchedOrder.customer.fullName}</p>
                    <p><strong>Contact:</strong> {searchedOrder.customer.phone}</p>
                    <p><strong>Address:</strong> {searchedOrder.customer.address}</p>
                    <p><strong>Division & District:</strong> {searchedOrder.customer.district}, {searchedOrder.customer.division}</p>
                  </div>
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-stone-500">
                    <span>Payment: <strong>{searchedOrder.paymentMethod}</strong></span>
                    <span className="font-mono font-bold text-stone-900">{formatPrice(searchedOrder.total)}</span>
                  </div>
                </div>

                {/* Concierge Help */}
                <div className="bg-white p-6 rounded-lg border border-[#E8E4DA] shadow-xs text-xs flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-stone-900 flex items-center gap-1.5 mb-2">
                      <ShieldCheck className="w-4 h-4 text-[#A6885E]" />
                      <span>Need Assistance?</span>
                    </h4>
                    <p className="text-stone-600 text-xs leading-relaxed mb-4">
                      Our concierge desk in Gaibandha is available 24/7 on WhatsApp to adjust addresses, delivery times, or check courier status.
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/8801815951971?text=${encodeURIComponent(`Hello ASVORE! I need an update regarding Order #${searchedOrder.orderNumber}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs uppercase tracking-wider font-bold rounded flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

              </div>

            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg border border-[#E8E4DA] text-center">
              <p className="text-stone-700 text-sm font-semibold mb-1">
                No matching order found for "{orderQuery}"
              </p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                Please verify your order number format (e.g. ASV-8942) or test with demo order: <strong>ASV-8942</strong>.
              </p>
              <button
                onClick={() => setOrderQuery('ASV-8942')}
                className="px-4 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-mono rounded"
              >
                Use Demo Order ASV-8942
              </button>
            </div>
          )
        )}

      </div>
    </div>
  );
};
