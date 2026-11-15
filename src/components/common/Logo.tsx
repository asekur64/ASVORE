import React from 'react';

interface LogoProps {
  className?: string;
  isDark?: boolean;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  isDark = false, 
  showTagline = false,
  size = 'md' 
}) => {
  const textColor = isDark ? '#FFFFFF' : '#171717';
  const accentColor = '#C4A77D'; // Muted Champagne Gold

  const scaleMap = {
    sm: 'h-6',
    md: 'h-8 sm:h-9',
    lg: 'h-12 sm:h-14'
  };

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <div className={`flex items-center gap-2.5 ${scaleMap[size]}`}>
        {/* Monogram Crest Icon */}
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto aspect-square shrink-0"
        >
          <rect 
            x="1.5" 
            y="1.5" 
            width="37" 
            height="37" 
            stroke={accentColor} 
            strokeWidth="1.5" 
            fill="none"
          />
          {/* Geometric Diamond Accent */}
          <polygon 
            points="20,5 35,20 20,35 5,20" 
            stroke={accentColor} 
            strokeWidth="0.8" 
            strokeDasharray="1 2" 
            fill="none" 
            opacity="0.4"
          />
          {/* Modern Monogram A & V */}
          <path 
            d="M12 28L20 11L28 28" 
            stroke={textColor} 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M15 22H25" 
            stroke={accentColor} 
            strokeWidth="1.8" 
            strokeLinecap="round" 
          />
        </svg>

        {/* Wordmark Typography */}
        <div className="flex flex-col justify-center">
          <span 
            className="tracking-[0.25em] font-serif-luxury font-bold text-lg sm:text-xl uppercase leading-none whitespace-nowrap"
            style={{ color: textColor }}
          >
            ASVORE
          </span>
          {showTagline && (
            <span 
              className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-sans font-medium text-[#C4A77D] mt-1"
            >
              Style Beyond Ordinary
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
