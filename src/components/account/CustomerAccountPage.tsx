import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../product/ProductCard';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  LogOut, 
  Compass, 
  Calendar, 
  Phone, 
  Mail,
  ShieldCheck,
  Check
} from 'lucide-react';

export const CustomerAccountPage: React.FC = () => {
  const { 
    currentUser, 
    logoutUser, 
    orders, 
    wishlist, 
    products, 
    formatPrice, 
    setActiveView, 
    setIsAuthModalOpen,
    updateUserProfile,
    t 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'addresses' | 'settings'>('orders');

  // Form states for profile edit
  const [nameInput, setNameInput] = useState(currentUser?.name || '');
  const [emailInput, setEmailInput] = useState(currentUser?.email || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!currentUser) {
    return (
      <div className="bg-[#FBF9F5] py-20 min-h-screen border-b border-[#E8E4DA] text-center">
        <div className="max-w-md mx-auto px-4 bg-white p-8 rounded-lg border border-[#E8E4DA] shadow-sm">
          <User className="w-12 h-12 text-[#C4A77D] mx-auto mb-4" />
          <h2 className="font-serif-luxury text-2xl font-bold text-stone-900 mb-2">
            Customer Account
          </h2>
          <p className="text-xs text-stone-500 mb-6">
            Sign in with your mobile phone number to view order history, track current shipments, and manage saved items.
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full py-3 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-widest font-semibold rounded shadow transition-colors"
          >
            Sign In with Mobile OTP
          </button>
        </div>
      </div>
    );
  }

  // Filter orders for this customer (or display all mock orders for review)
  const myOrders = orders; // Show customer orders
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: nameInput,
      email: emailInput || undefined,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-[#FBF9F5] py-12 sm:py-16 border-b border-[#E8E4DA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Account Top Summary Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#E8E4DA] shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-stone-900 text-[#C4A77D] font-serif-luxury text-xl font-bold flex items-center justify-center">
              {currentUser.name ? currentUser.name.charAt(0) : 'A'}
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#A6885E] font-semibold">
                ASVORE MEMBER
              </span>
              <h1 className="font-serif-luxury text-2xl font-bold text-stone-900">
                {currentUser.name}
              </h1>
              <p className="text-xs text-stone-500 font-mono">
                {currentUser.phone} {currentUser.email && `· ${currentUser.email}`}
              </p>
            </div>
          </div>

          <button
            onClick={logoutUser}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-stone-300 hover:border-black text-stone-700 text-xs font-semibold uppercase tracking-wider rounded transition-colors self-start sm:self-auto"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('logout')}</span>
          </button>
        </div>

        {/* Content Tabs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-3 bg-white p-4 rounded-lg border border-[#E8E4DA] shadow-xs space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded transition-colors text-left ${
                activeTab === 'orders' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Package className="w-4 h-4 text-[#C4A77D]" />
              <span>{t('myOrders')}</span>
              <span className="ml-auto font-mono text-[11px] opacity-70">({myOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded transition-colors text-left ${
                activeTab === 'wishlist' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Heart className="w-4 h-4 text-[#C4A77D]" />
              <span>{t('myWishlist')}</span>
              <span className="ml-auto font-mono text-[11px] opacity-70">({wishlist.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded transition-colors text-left ${
                activeTab === 'profile' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <User className="w-4 h-4 text-[#C4A77D]" />
              <span>{t('myProfile')}</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded transition-colors text-left ${
                activeTab === 'addresses' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <MapPin className="w-4 h-4 text-[#C4A77D]" />
              <span>{t('savedAddresses')}</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded transition-colors text-left ${
                activeTab === 'settings' ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Settings className="w-4 h-4 text-[#C4A77D]" />
              <span>{t('accountSettings')}</span>
            </button>
          </aside>

          {/* Tab Views */}
          <main className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-lg border border-[#E8E4DA] shadow-xs">
            
            {/* 1. ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <h2 className="font-serif-luxury text-xl font-bold text-stone-900">
                    Order History & Status
                  </h2>
                  <span className="text-xs text-stone-500 font-mono">
                    {myOrders.length} records
                  </span>
                </div>

                {myOrders.length === 0 ? (
                  <p className="text-xs text-stone-500 py-6">{t('noOrdersYet')}</p>
                ) : (
                  myOrders.map(order => (
                    <div 
                      key={order.id} 
                      className="p-5 bg-stone-50 rounded border border-stone-200/80 space-y-4 hover:border-stone-300 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-stone-900 text-sm">#{order.orderNumber}</span>
                            <span className="px-2.5 py-0.5 bg-stone-900 text-white rounded text-[10px] uppercase font-semibold">
                              {order.status}
                            </span>
                          </div>
                          <span className="text-[11px] text-stone-500 block mt-0.5">
                            {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>

                        <div className="text-right sm:self-center">
                          <span className="font-mono font-bold text-sm text-stone-900">
                            {formatPrice(order.total)}
                          </span>
                          <span className="block text-[11px] text-stone-500">
                            {order.paymentMethod} ({order.paymentStatus})
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-stone-100">
                        {order.items.map(item => (
                          <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <img 
                                src={item.image} 
                                alt={item.name.en} 
                                className="w-10 h-12 object-cover rounded border border-stone-200"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <p className="font-semibold text-stone-800">{item.name.en}</p>
                                <p className="text-[11px] text-stone-500">Qty: {item.quantity} {item.size ? `· Size ${item.size}` : ''}</p>
                              </div>
                            </div>
                            <span className="font-mono font-medium text-stone-800">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Action */}
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] text-stone-500">
                          Destination: {order.customer.district}, {order.customer.division}
                        </span>
                        <button
                          onClick={() => {
                            setActiveView('track');
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 hover:border-black text-stone-800 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                        >
                          <Compass className="w-3.5 h-3.5 text-[#C4A77D]" />
                          <span>Track Dispatch</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 2. WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <h2 className="font-serif-luxury text-xl font-bold text-stone-900">
                    Saved Pieces ({wishlistProducts.length})
                  </h2>
                </div>

                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-xs text-stone-500 mb-4">{t('noWishlistItems')}</p>
                    <button
                      onClick={() => setActiveView('catalog')}
                      className="px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold rounded"
                    >
                      Explore Catalog
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlistProducts.map(p => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <h2 className="font-serif-luxury text-xl font-bold text-stone-900">
                    Personal Information
                  </h2>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded focus:border-[#C4A77D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Phone Number (Verified)
                    </label>
                    <input
                      type="tel"
                      disabled
                      value={currentUser.phone}
                      className="w-full text-xs p-3 bg-stone-100 border border-stone-200 rounded font-mono text-stone-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="e.g. name@example.com"
                      className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded focus:border-[#C4A77D] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-widest font-semibold rounded flex items-center gap-2 transition-colors"
                  >
                    <span>Save Changes</span>
                    {savedSuccess && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                </form>
              </div>
            )}

            {/* 4. SAVED ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <h2 className="font-serif-luxury text-xl font-bold text-stone-900">
                    Saved Delivery Addresses
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentUser.savedAddresses.map(addr => (
                    <div key={addr.id} className="p-4 bg-stone-50 rounded border border-stone-200 text-xs text-stone-700 space-y-1">
                      <span className="font-bold text-stone-900 block mb-1">{addr.label}</span>
                      <p>{addr.address}</p>
                      <p>{addr.upazila}, {addr.district}</p>
                      <p>{addr.division} Division, Bangladesh</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <h2 className="font-serif-luxury text-xl font-bold text-stone-900">
                    Account Security & Preferences
                  </h2>
                </div>

                <div className="space-y-4 text-xs text-stone-700">
                  <div className="p-4 bg-stone-50 rounded border border-stone-200 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-stone-900">SMS Notifications</p>
                      <p className="text-stone-500">Receive dispatch & courier transit updates via SMS.</p>
                    </div>
                    <span className="text-emerald-700 font-semibold uppercase text-[11px]">Active</span>
                  </div>

                  <div className="p-4 bg-stone-50 rounded border border-stone-200 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-stone-900">WhatsApp Concierge Updates</p>
                      <p className="text-stone-500">Direct courier tracking link sent on WhatsApp.</p>
                    </div>
                    <span className="text-emerald-700 font-semibold uppercase text-[11px]">Active</span>
                  </div>
                </div>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
};
