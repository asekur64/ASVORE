import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { Category } from '../../types';

export const Footer: React.FC = () => {
  const { t, language, setSelectedCategory, setActiveView, settings } = useApp();

  const handleCategoryClick = (cat: Category) => {
    setSelectedCategory(cat);
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#171717] text-[#F7F4EE] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-stone-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo isDark={true} size="md" showTagline={true} />
            <p className="mt-4 text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              ASVORE is a modern men's fashion and lifestyle brand combining contemporary styling, timeless tailoring, and accessible quality across Bangladesh.
            </p>

            {/* Direct Contact info */}
            <div className="mt-6 space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C4A77D] shrink-0 mt-0.5" />
                <span>{settings.showroomAddress[language]}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C4A77D] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-[#C4A77D] transition-colors">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C4A77D] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#C4A77D] transition-colors">
                  {settings.email}
                </a>
              </div>
            </div>

            {/* Social Media Link */}
            <div className="mt-6">
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-300 hover:text-[#C4A77D] transition-colors"
              >
                <span>{t('socialFacebook')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Shopping Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-200 mb-4">
              {t('shoppingCategories')}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              {(['Panjabis', 'Shirts', 'T-Shirts', 'Trousers', 'Watches', 'Perfumes'] as Category[]).map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-[#C4A77D] transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-200 mb-4">
              {t('customerCare')}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    setActiveView('track');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#C4A77D] transition-colors"
                >
                  {t('navTrackOrder')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#C4A77D] transition-colors"
                >
                  {t('navContact')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#C4A77D] transition-colors"
                >
                  {t('navAbout')}
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/8801815951971?text=${encodeURIComponent(t('whatsappMessage'))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C4A77D] transition-colors inline-flex items-center gap-1"
                >
                  <span>{t('whatsappHelp')}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Policies */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-200 mb-4">
              {t('policies')}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    setActiveView('policies');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#C4A77D] transition-colors"
                >
                  {t('deliveryPolicy')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('policies');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#C4A77D] transition-colors"
                >
                  {t('returnRefund')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('policies');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#C4A77D] transition-colors"
                >
                  {t('privacyPolicy')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('policies');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#C4A77D] transition-colors"
                >
                  {t('termsConditions')}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Payment Options & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; 2026 ASVORE Men's Fashion. {t('allRightsReserved')}
          </div>

          {/* Payment Trust Badges */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-wider text-stone-400">Supported Payments:</span>
            <span className="px-2 py-0.5 bg-stone-800 text-stone-300 rounded text-[11px] font-mono">COD</span>
            <span className="px-2 py-0.5 bg-[#D12053]/20 text-[#FF4D85] rounded text-[11px] font-semibold">bKash</span>
            <span className="px-2 py-0.5 bg-[#EA1D25]/20 text-[#FF7043] rounded text-[11px] font-semibold">Nagad</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
