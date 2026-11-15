import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { settings, language, setActiveView } = useApp();
  const [dismissed, setDismissed] = useState(false);

  if (!settings.announcementActive || dismissed) return null;

  const text = settings.announcementText[language] || settings.announcementText.en;

  return (
    <div className="bg-[#171717] text-[#F7F4EE] border-b border-[#2C2C2C] text-xs py-2 px-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 tracking-[0.15em] text-[11px] sm:text-xs uppercase font-medium text-center">
          <Sparkles className="w-3 h-3 text-[#C4A77D] shrink-0 hidden sm:inline" />
          <span 
            onClick={() => setActiveView('catalog')}
            className="cursor-pointer hover:text-[#C4A77D] transition-colors"
          >
            {text}
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-stone-400 hover:text-white transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
