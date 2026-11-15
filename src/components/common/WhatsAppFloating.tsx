import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const { t } = useApp();
  const [showTooltip, setShowTooltip] = useState(false);

  const phone = '8801815951971';
  const message = encodeURIComponent(t('whatsappMessage'));
  const waUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center">
      {/* Tooltip on hover/click */}
      {showTooltip && (
        <div className="mr-3 bg-[#171717] text-white p-3 rounded-lg shadow-xl border border-stone-700 text-xs max-w-[200px] animate-in fade-in slide-in-from-left-2 duration-200 relative">
          <button 
            onClick={() => setShowTooltip(false)}
            className="absolute top-1 right-1 text-stone-400 hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="font-semibold text-[#C4A77D] mb-1">ASVORE Concierge</p>
          <p className="text-stone-300 text-[11px] leading-snug">
            {t('needAssistance')}
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none"
        aria-label="Chat with ASVORE on WhatsApp"
        title="Chat on WhatsApp (+8801815951971)"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-none" />
      </a>
    </div>
  );
};
