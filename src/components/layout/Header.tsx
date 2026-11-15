import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Compass,
  MapPin,
  Phone
} from 'lucide-react';
import { Category } from '../../types';

export const Header: React.FC = () => {
  const { 
    t, 
    language, 
    toggleLanguage, 
    activeView, 
    setActiveView, 
    cartCount, 
    setIsCartOpen, 
    wishlist,
    currentUser,
    setIsAuthModalOpen,
    isAdminAuthenticated,
    setIsAdminAuthOpen,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [clothingDropdown, setClothingDropdown] = useState(false);
  const [accessoriesDropdown, setAccessoriesDropdown] = useState(false);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setActiveView('catalog');
    setClothingDropdown(false);
    setAccessoriesDropdown(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveView('catalog');
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E8E4DA] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-6 lg:gap-8">
          
          {/* ZONE 1: ASVORE Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-stone-800 hover:text-black focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                setSelectedCategory(null);
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer text-left focus:outline-none"
            >
              <Logo size="md" showTagline={true} />
            </button>
          </div>

          {/* ZONE 2: Concise Single-Line Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-[0.08em] uppercase text-stone-800">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setActiveView('home');
              }}
              className={`hover:text-[#C4A77D] transition-colors whitespace-nowrap ${
                activeView === 'home' && !searchQuery ? 'text-[#C4A77D] font-semibold' : ''
              }`}
            >
              {t('navHome')}
            </button>

            <button
              onClick={() => {
                setSelectedCategory(null);
                setActiveView('catalog');
              }}
              className="hover:text-[#C4A77D] transition-colors whitespace-nowrap"
            >
              {t('navNewArrivals')}
            </button>

            {/* Clothing Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setClothingDropdown(true)}
              onMouseLeave={() => setClothingDropdown(false)}
            >
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  setActiveView('catalog');
                }}
                className="flex items-center gap-1 hover:text-[#C4A77D] transition-colors whitespace-nowrap py-2"
              >
                <span>{t('navClothing')}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {clothingDropdown && (
                <div className="absolute top-full left-0 w-48 bg-[#171717] text-[#F7F4EE] shadow-2xl py-3 rounded border border-stone-800 animate-in fade-in duration-150">
                  {(['Panjabis', 'Shirts', 'T-Shirts', 'Trousers'] as Category[]).map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className="w-full text-left px-5 py-2 text-xs hover:bg-[#252525] hover:text-[#C4A77D] transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Accessories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAccessoriesDropdown(true)}
              onMouseLeave={() => setAccessoriesDropdown(false)}
            >
              <button 
                onClick={() => {
                  setSelectedCategory('Watches');
                  setActiveView('catalog');
                }}
                className="flex items-center gap-1 hover:text-[#C4A77D] transition-colors whitespace-nowrap py-2"
              >
                <span>{t('navAccessories')}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {accessoriesDropdown && (
                <div className="absolute top-full left-0 w-48 bg-[#171717] text-[#F7F4EE] shadow-2xl py-3 rounded border border-stone-800 animate-in fade-in duration-150">
                  {(['Watches', 'Belts', 'Wallets', 'Sunglasses'] as Category[]).map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className="w-full text-left px-5 py-2 text-xs hover:bg-[#252525] hover:text-[#C4A77D] transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleCategorySelect('Perfumes')}
              className="hover:text-[#C4A77D] transition-colors whitespace-nowrap"
            >
              {t('navPerfumes')}
            </button>

            <button
              onClick={() => {
                if (activeView !== 'home') {
                  setActiveView('home');
                  setTimeout(() => {
                    const el = document.getElementById('exclusive-collections');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('exclusive-collections');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hover:text-[#C4A77D] transition-colors whitespace-nowrap"
            >
              {t('navCollections')}
            </button>

            <button
              onClick={() => setActiveView('about')}
              className="hover:text-[#C4A77D] transition-colors whitespace-nowrap"
            >
              {t('navAbout')}
            </button>
          </nav>

          {/* ZONE 3: Primary Actions & Utilities */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    autoFocus
                    className="w-48 sm:w-64 bg-white border border-[#C4A77D] rounded-full py-1.5 pl-3 pr-8 text-xs focus:outline-none shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="absolute right-2.5 text-stone-400 hover:text-black"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-stone-700 hover:text-black transition-colors"
                  aria-label="Search Catalog"
                  title="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 text-xs font-semibold tracking-wider text-stone-700 hover:text-black hover:bg-stone-200/50 rounded transition-colors whitespace-nowrap border border-stone-300"
              title="Switch Language"
            >
              {language === 'en' ? 'বাংলা' : 'EN'}
            </button>

            {/* Order Tracking Quick Link */}
            <button
              onClick={() => setActiveView('track')}
              className="hidden md:flex p-2 text-stone-700 hover:text-black transition-colors"
              title={t('navTrackOrder')}
            >
              <Compass className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => {
                if (currentUser) {
                  setActiveView('account');
                } else {
                  setActiveView('catalog');
                }
              }}
              className="relative p-2 text-stone-700 hover:text-black transition-colors"
              title={t('navWishlist')}
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C4A77D]" />
              )}
            </button>

            {/* User Account */}
            <button
              onClick={() => {
                if (currentUser) {
                  setActiveView('account');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="p-2 text-stone-700 hover:text-black transition-colors"
              title={currentUser ? currentUser.name : t('navAccount')}
            >
              <User className="w-4 h-4" />
            </button>

            {/* Shopping Bag Button (Zone 3 Primary Action) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 bg-[#171717] hover:bg-black text-white text-xs font-medium tracking-wider rounded transition-colors"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C4A77D]" />
              <span className="hidden sm:inline uppercase text-[11px] font-semibold">{t('navCart')}</span>
              <span className="bg-[#C4A77D] text-[#171717] text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Admin Switcher */}
            <button
              onClick={() => {
                if (isAdminAuthenticated) {
                  setActiveView('admin');
                } else {
                  setIsAdminAuthOpen(true);
                }
              }}
              className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors"
              title={t('navAdmin')}
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-sm bg-[#171717] text-stone-200 h-full flex flex-col justify-between p-6 shadow-2xl z-10 overflow-y-auto">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-stone-800">
                <Logo isDark={true} size="sm" showTagline={true} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation List */}
              <div className="py-6 space-y-4">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setActiveView('home');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm uppercase tracking-widest hover:text-[#C4A77D]"
                >
                  {t('navHome')}
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setActiveView('catalog');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm uppercase tracking-widest hover:text-[#C4A77D]"
                >
                  {t('navNewArrivals')}
                </button>

                <div className="pt-2 pb-2">
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-2">
                    {t('shopByCategory')}
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-stone-400 pl-2 border-l border-stone-800">
                    {[
                      'Panjabis', 'Shirts', 'T-Shirts', 'Trousers', 
                      'Watches', 'Belts', 'Wallets', 'Sunglasses', 'Perfumes'
                    ].map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat as Category)}
                        className="text-left py-1.5 hover:text-[#C4A77D]"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveView('track');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm uppercase tracking-widest hover:text-[#C4A77D]"
                >
                  {t('navTrackOrder')}
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (activeView !== 'home') {
                      setActiveView('home');
                      setTimeout(() => {
                        const el = document.getElementById('exclusive-collections');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      const el = document.getElementById('exclusive-collections');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block w-full text-left py-2 text-sm uppercase tracking-widest hover:text-[#C4A77D]"
                >
                  {t('navCollections')}
                </button>

                <button
                  onClick={() => {
                    setActiveView('about');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm uppercase tracking-widest hover:text-[#C4A77D]"
                >
                  {t('navAbout')}
                </button>

                <button
                  onClick={() => {
                    setActiveView('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm uppercase tracking-widest hover:text-[#C4A77D]"
                >
                  {t('navContact')}
                </button>
              </div>
            </div>

            {/* Bottom info inside mobile drawer */}
            <div className="pt-6 border-t border-stone-800 text-xs text-stone-400 space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C4A77D]" />
                <span>Gaibandha, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C4A77D]" />
                <span>+8801815951971</span>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1.5 bg-[#242424] text-white rounded text-xs border border-stone-700"
                >
                  Language: {language === 'en' ? 'বাংলা' : 'English'}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (isAdminAuthenticated) {
                      setActiveView('admin');
                    } else {
                      setIsAdminAuthOpen(true);
                    }
                  }}
                  className="text-stone-500 hover:text-stone-300 text-xs"
                >
                  Admin Access
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
