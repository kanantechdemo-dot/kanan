import React from 'react';

interface FountantLogoProps {
  variant?: 'full' | 'compact' | 'crest-only' | 'wordmark-only';
  theme?: 'dark' | 'light' | 'gold';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const FountantLogo: React.FC<FountantLogoProps> = ({
  variant = 'compact',
  theme = 'dark',
  className = '',
  size = 'md'
}) => {
  const getColors = () => {
    switch (theme) {
      case 'light':
        return {
          fill: '#ffffff',
          accent: '#e9c176',
          text: '#ffffff',
          subtext: '#c3ecd0'
        };
      case 'gold':
        return {
          fill: '#c5a059',
          accent: '#775a19',
          text: '#775a19',
          subtext: '#c5a059'
        };
      case 'dark':
      default:
        return {
          fill: '#001d0e',
          accent: '#775a19',
          text: '#001d0e',
          subtext: '#775a19'
        };
    }
  };

  const colors = getColors();

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20'
  };

  // The classical Fountain Crest SVG
  const FountainCrest = ({ customClass = '' }: { customClass?: string }) => (
    <svg
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${iconSizes[size]} ${customClass} shrink-0`}
      aria-hidden="true"
    >
      {/* Plumes of fountain water spray */}
      <path
        d="M50 38C50 20 40 8 36 2C42 12 44 24 45 38M50 38C50 18 56 6 62 2C57 11 55 24 55 38"
        stroke={colors.fill}
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M48 38C44 22 28 14 18 16C28 20 38 28 42 38"
        stroke={colors.fill}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M52 38C56 22 72 14 82 16C72 20 62 28 58 38"
        stroke={colors.fill}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Classical Roman 'F' letter interwoven */}
      <path
        d="M40 38H64M40 50H56M44 38V66"
        stroke={colors.fill}
        strokeWidth="4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      
      {/* Fountain Upper Basin Rim */}
      <rect x="26" y="66" width="48" height="4" rx="1" fill={colors.fill} />
      
      {/* Fountain Chalice Basin */}
      <path
        d="M28 70C30 84 42 90 50 90C58 90 70 84 72 70Z"
        fill={colors.fill}
      />
      
      {/* Fountain Stem & Pedestal Base */}
      <path
        d="M46 90H54V96H46ZM36 98H64V102H36Z"
        fill={colors.fill}
      />
    </svg>
  );

  if (variant === 'crest-only') {
    return <FountainCrest customClass={className} />;
  }

  if (variant === 'wordmark-only') {
    return (
      <div className={`flex flex-col ${className}`}>
        <span
          className="font-serif tracking-widest uppercase font-semibold text-lg"
          style={{ color: colors.text }}
        >
          FOUNTANT
        </span>
        <span
          className="font-sans text-[10px] tracking-[0.25em] uppercase font-medium"
          style={{ color: colors.subtext }}
        >
          HOTEL & SANCTUARY
        </span>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <FountainCrest customClass="mb-2" />
        <span
          className="font-serif tracking-[0.18em] uppercase font-semibold text-2xl"
          style={{ color: colors.text }}
        >
          FOUNTANT
        </span>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-6 h-px" style={{ backgroundColor: colors.subtext }}></div>
          <span
            className="font-sans text-[11px] tracking-[0.22em] uppercase font-medium"
            style={{ color: colors.subtext }}
          >
            HOTEL & SANCTUARY
          </span>
          <div className="w-6 h-px" style={{ backgroundColor: colors.subtext }}></div>
        </div>
      </div>
    );
  }

  // Compact variant (default for navbar)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <FountainCrest />
      <div className="flex items-baseline gap-2">
        <span
          className="font-serif text-xl sm:text-2xl tracking-[0.15em] uppercase font-medium"
          style={{ color: colors.text }}
        >
          FOUNTANT
        </span>
        <span
          className="hidden sm:inline-block w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: colors.accent }}
        />
        <span
          className="hidden sm:inline-block font-sans text-[11px] tracking-[0.2em] uppercase font-semibold"
          style={{ color: colors.subtext }}
        >
          HOTEL
        </span>
      </div>
    </div>
  );
};
