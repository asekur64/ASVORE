import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { BD_DIVISIONS, BD_DISTRICTS } from '../../data/translations';
import { PaymentMethod, Order } from '../../types';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  Compass, 
  MessageSquare
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    couponDiscount, 
    appliedCoupon, 
    settings, 
    formatPrice, 
    createOrder, 
    currentUser, 
    setActiveView, 
    t 
  } = useApp();

  // Customer Form
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [division, setDivision] = useState(BD_DIVISIONS[0]);
  const [district, setDistrict] = useState(BD_DISTRICTS[BD_DIVISIONS[0]][0]);
  const [upazila, setUpazila] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery');
  const [trxId, setTrxId] = useState('');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Update district when division changes
  useEffect(() => {
    if (BD_DISTRICTS[division]) {
      setDistrict(BD_DISTRICTS[division][0]);
    }
  }, [division]);

  // Delivery fee calculation
  const isInsideDhaka = district.toLowerCase() === 'dhaka';
  const deliveryBaseRate = isInsideDhaka ? settings.deliveryInsideDhaka : settings.deliveryOutsideDhaka;
  const isFreeDelivery = cartSubtotal >= settings.freeDeliveryThreshold;
  const deliveryFee = isFreeDelivery ? 0 : deliveryBaseRate;
  const finalPayable = Math.max(0, cartSubtotal - couponDiscount + deliveryFee);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      alert('Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      alert('Please enter a valid 11-digit Bangladeshi mobile number (e.g. 017XXXXXXXX)');
      return;
    }
    if (!address.trim()) {
      alert('Please provide your full delivery address');
      return;
    }

    if ((paymentMethod === 'bKash' || paymentMethod === 'Nagad') && !trxId.trim()) {
      alert(`Please enter your ${paymentMethod} Transaction ID (TrxID) after completing payment.`);
      return;
    }

    const orderCustomer = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      division,
      district,
      upazila: upazila.trim() || district,
      address: address.trim(),
      notes: notes.trim() ? `${notes.trim()}${trxId ? ` [${paymentMethod} TrxID: ${trxId.trim()}]` : ''}` : (trxId ? `[${paymentMethod} TrxID: ${trxId.trim()}]` : undefined),
    };

    const newOrder = createOrder(orderCustomer, paymentMethod);
    setPlacedOrder(newOrder);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If order was just placed, display Order Confirmation receipt view
  if (placedOrder) {
    return (
      <div className="bg-[#FBF9F5] py-16 border-b border-[#E8E4DA] min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-lg border border-[#E8E4DA] p-8 shadow-xl text-center">
            
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A6885E] block mb-1">
              ORDER CONFIRMED
            </span>
            <h1 className="font-serif-luxury text-3xl font-bold text-stone-900 mb-2">
              {t('orderConfirmed')}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mb-6">
              {t('thankYouOrder')}
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-stone-50 rounded p-5 text-left border border-stone-200 text-xs text-stone-700 space-y-3 mb-6">
              <div className="flex justify-between pb-2 border-b border-stone-200">
                <span className="font-semibold text-stone-900">Order Reference:</span>
                <span className="font-mono font-bold text-stone-900">{placedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="font-medium text-stone-900">{placedOrder.customer.fullName} ({placedOrder.customer.phone})</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Destination:</span>
                <span className="font-medium text-stone-900 text-right">{placedOrder.customer.address}, {placedOrder.customer.district}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-semibold text-stone-900">{placedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold text-stone-900">
                <span>Total Amount:</span>
                <span className="font-mono text-base">{formatPrice(placedOrder.total)}</span>
              </div>
            </div>

            {/* Tracking & Assistance Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setActiveView('track');
                }}
                className="flex-1 py-3 px-4 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-widest font-semibold rounded flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#C4A77D]" />
                <span>Track This Order</span>
              </button>

              <a
                href={`https://wa.me/8801815951971?text=${encodeURIComponent(`Hello ASVORE! I just placed Order #${placedOrder.orderNumber} for ${formatPrice(placedOrder.total)}. Please confirm my dispatch schedule.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs uppercase tracking-widest font-semibold rounded flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Notify via WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => setActiveView('home')}
              className="mt-6 text-xs text-stone-500 hover:text-stone-900 underline"
            >
              Continue Shopping
            </button>

          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[#FBF9F5] py-20 text-center">
        <h2 className="font-serif-luxury text-2xl font-bold mb-2">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-stone-500 mb-6">Add products from our catalog to proceed to checkout.</p>
        <button
          onClick={() => setActiveView('catalog')}
          className="px-6 py-3 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold rounded"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF9F5] py-10 sm:py-14 border-b border-[#E8E4DA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <button
          onClick={() => setActiveView('catalog')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-black mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </button>

        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 mb-8">
          {t('checkout')}
        </h1>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Customer & Delivery Info */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Contact Details */}
            <div className="bg-white p-6 rounded-md border border-[#E8E4DA] shadow-xs">
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-mono">1</span>
                <span>{t('customerInfo')}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tanvir Hossain"
                    className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded focus:border-[#C4A77D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    {t('phoneNumber')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded focus:border-[#C4A77D] focus:outline-none font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    {t('emailAddress')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded focus:border-[#C4A77D] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination in Bangladesh */}
            <div className="bg-white p-6 rounded-md border border-[#E8E4DA] shadow-xs">
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-mono">2</span>
                <span>{t('deliveryAddress')}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    {t('division')} *
                  </label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded focus:border-[#C4A77D] focus:outline-none"
                  >
                    {BD_DIVISIONS.map(div => (
                      <option key={div} value={div}>{div}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    {t('district')} *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded focus:border-[#C4A77D] focus:outline-none"
                  >
                    {(BD_DISTRICTS[division] || []).map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    {t('upazila')}
                  </label>
                  <input
                    type="text"
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    placeholder="e.g. Gaibandha Sadar / Gulshan"
                    className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded focus:border-[#C4A77D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    {t('streetAddress')} *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. House 24, Road 4, Sector 11, Uttara, Dhaka"
                    className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded focus:border-[#C4A77D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    {t('deliveryInstructions')}
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Call before delivery, deliver after 2 PM"
                    className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded focus:border-[#C4A77D] focus:outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white p-6 rounded-md border border-[#E8E4DA] shadow-xs">
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-mono">3</span>
                <span>{t('paymentMethod')}</span>
              </h2>

              <div className="space-y-3">
                
                {/* 1. Cash on Delivery */}
                <label className={`block p-4 rounded border cursor-pointer transition-colors ${
                  paymentMethod === 'Cash on Delivery' ? 'border-stone-900 bg-stone-50' : 'border-stone-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      className="mt-1 accent-stone-900"
                    />
                    <div>
                      <div className="font-semibold text-xs text-stone-900">{t('cod')}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{t('codDesc')}</div>
                    </div>
                  </div>
                </label>

                {/* 2. bKash */}
                <label className={`block p-4 rounded border cursor-pointer transition-colors ${
                  paymentMethod === 'bKash' ? 'border-[#D12053] bg-pink-50/30' : 'border-stone-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'bKash'}
                      onChange={() => setPaymentMethod('bKash')}
                      className="mt-1 accent-[#D12053]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-stone-900">{t('bkash')}</span>
                        <span className="text-[11px] font-bold text-[#D12053]">bKash Merchant</span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{t('bkashDesc')}</div>

                      {paymentMethod === 'bKash' && (
                        <div className="mt-3 p-3 bg-white rounded border border-[#D12053]/30 text-xs space-y-2">
                          <p className="text-stone-700">
                            Send payment to ASVORE Official Merchant Number: <strong className="font-mono text-[#D12053] select-all">+8801815951971</strong>
                          </p>
                          <div className="text-[11px] text-stone-500">
                            Use reference: <strong>ASVORE</strong> · Enter the 10-character Transaction ID below:
                          </div>
                          <input
                            type="text"
                            required={paymentMethod === 'bKash'}
                            value={trxId}
                            onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                            placeholder="e.g. BK9X29A8K2"
                            className="w-full text-xs p-2 bg-stone-50 border border-stone-300 rounded font-mono uppercase focus:outline-none focus:border-[#D12053]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </label>

                {/* 3. Nagad */}
                <label className={`block p-4 rounded border cursor-pointer transition-colors ${
                  paymentMethod === 'Nagad' ? 'border-[#EA1D25] bg-red-50/30' : 'border-stone-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'Nagad'}
                      onChange={() => setPaymentMethod('Nagad')}
                      className="mt-1 accent-[#EA1D25]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-stone-900">{t('nagad')}</span>
                        <span className="text-[11px] font-bold text-[#EA1D25]">Nagad Merchant</span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{t('nagadDesc')}</div>

                      {paymentMethod === 'Nagad' && (
                        <div className="mt-3 p-3 bg-white rounded border border-[#EA1D25]/30 text-xs space-y-2">
                          <p className="text-stone-700">
                            Send payment to ASVORE Merchant Number: <strong className="font-mono text-[#EA1D25] select-all">+8801815951971</strong>
                          </p>
                          <div className="text-[11px] text-stone-500">
                            Enter the Nagad Transaction ID (TrxID) below:
                          </div>
                          <input
                            type="text"
                            required={paymentMethod === 'Nagad'}
                            value={trxId}
                            onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                            placeholder="e.g. 7N29BK8821"
                            className="w-full text-xs p-2 bg-stone-50 border border-stone-300 rounded font-mono uppercase focus:outline-none focus:border-[#EA1D25]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </label>

              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="lg:col-span-5 bg-white p-6 rounded-md border border-[#E8E4DA] shadow-xs space-y-6">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-900 pb-4 border-b border-stone-200">
              {t('orderSummary')}
            </h2>

            {/* Mini Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img 
                      src={item.image} 
                      alt={item.name.en} 
                      className="w-12 h-14 object-cover rounded border border-stone-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="truncate">
                      <p className="font-semibold text-stone-900 truncate">{item.name.en}</p>
                      <p className="text-[11px] text-stone-500">Qty: {item.quantity} {item.size ? `· Size ${item.size}` : ''}</p>
                    </div>
                  </div>
                  <span className="font-mono font-semibold text-stone-900 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-stone-600 pt-4 border-t border-stone-200">
              <div className="flex justify-between">
                <span>{t('subtotal')}</span>
                <span className="font-mono text-stone-900">{formatPrice(cartSubtotal)}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="font-mono">-{formatPrice(couponDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#A6885E]" />
                  <span>Delivery ({isInsideDhaka ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                </span>
                <span className="font-mono font-medium text-stone-900">
                  {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-stone-900 pt-3 border-t border-stone-200">
                <span>{t('total')}</span>
                <span className="font-mono text-xl text-stone-950">
                  {formatPrice(finalPayable)}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              className="w-full py-4 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-bold rounded shadow-lg transition-all"
            >
              {t('placeOrder')} · {formatPrice(finalPayable)}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 text-center">
              <ShieldCheck className="w-4 h-4 text-[#A6885E]" />
              <span>Nationwide Secure Delivery & Authentic ASVORE Packaging</span>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
