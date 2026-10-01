import React from 'react';

interface LogoProps {
  variant?: 'primary' | 'compact' | 'mobile' | 'icon';
  theme?: 'dark' | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'primary',
  theme = 'dark',
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const isLight = theme === 'light';

  const sizeMap = {
    xs: { icon: 20, text: 'text-sm', sub: 'text-[8px' },
    sm: { icon: 26, text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 34, text: 'text-lg', sub: 'text-[10px]' },
    lg: { icon: 44, text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 56, text: 'text-3xl', sub: 'text-sm' },
  };

  const { icon: iconSize, text: textSize, sub: subSize } = sizeMap[size];

  // SVG Mountain + Shield + Safety Core Emblem
  const ShieldMountainIcon = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
      aria-label="PeakShield Mountain Shield Emblem"
    >
      <defs>
        <linearGradient id="psShieldGrad" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="50%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#0C4A6E" />
        </linearGradient>
        <linearGradient id="psMountLeft" x1="14" y1="18" x2="24" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#94AA38" />
        </linearGradient>
        <linearGradient id="psMountRight" x1="24" y1="18" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id="psBorderGrad" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
      <path
        d="M24 4L7 11V23.2C7 33.7 14.3 43.1 24 45.8C33.7 43.1 41 33.7 41 23.2V11L24 4Z"
        fill="url(#psShieldGrad)"
        stroke="url(#psBorderGrad)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M24 6.5L9.5 12.5V23C9.5 32 15.7 40.2 24 42.6C32.3 40.2 38.5 32 38.5 23V12.5L24 6.5Z"
        fill="#071322"
        fillOpacity="0.45"
      />
      <path
        d="M24 13L15 28H33L24 13Z"
        fill="#0284C7"
        fillOpacity="0.4"
      />
      <path
        d="M24 14L13 33H24V14Z"
        fill="url(#psMountLeft)"
      />
      <path
        d="M24 14L35 33H24V14Z"
        fill="url(#psMountRight)"
      />
      <path
        d="M24 14L20.5 20.5L24 23L27.5 20.5L24 14Z"
        fill="#FFFFFF"
      />
      <path
        d="M17 37C19.1 38.5 21.5 39.5 24 39.8C26.5 39.5 28.9 38.5 31 37"
        stroke="#38BDF8"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{ShieldMountainIcon}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {ShieldMountainIcon}
      <div className="flex flex-col text-left">
        <div className={`font-display font-extrabold tracking-tight leading-none ${textSize}`}>
          <span className={isLight ? 'text-slate-900' : 'text-white'}>Peak</span>
          <span className="text-sky-400">Shield</span>
        </div>
        {(variant === 'primary' || showTagline) && (
          <span
            className={`font-mono font-bold tracking-wider uppercase mt-1 ${subSize} ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Predict - Protect - Respond
          </span>
        )}
        {variant === 'mobile' && (
          <span className={`text-[9px] font-mono leading-none mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Mountain Safety
          </span>
        )}
      </div>
    </div>
  );
};
