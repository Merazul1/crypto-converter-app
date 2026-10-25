import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }[size];

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  }[size];

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Custom CoinRates SVG Emblem */}
      <div className={`relative ${iconDimensions} rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-emerald-400 p-[1.5px] shadow-lg shadow-indigo-500/25 group-hover:shadow-emerald-500/30 group-hover:scale-105 transition-all duration-300`}>
        <div className="w-full h-full bg-[#0a0f1d] rounded-[14px] flex items-center justify-center p-1.5 relative overflow-hidden">
          
          {/* Subtle inner radial gradient */}
          <div className="absolute inset-0 bg-radial from-indigo-500/15 via-transparent to-transparent opacity-80" />

          {/* Precision Custom SVG Icon for CoinRates */}
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full relative z-10 transition-transform duration-300 group-hover:rotate-6"
          >
            <defs>
              <linearGradient id="cr-coin-grad" x1="2" y1="2" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" />
                <stop offset="0.5" stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="cr-arrow-grad" x1="10" y1="10" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38BDF8" />
                <stop offset="1" stopColor="#34D399" />
              </linearGradient>
            </defs>

            {/* Outer Coin Hex-Circle Ring */}
            <circle
              cx="18"
              cy="18"
              r="14.5"
              stroke="url(#cr-coin-grad)"
              strokeWidth="2.2"
              strokeDasharray="4 2"
              className="opacity-70 group-hover:opacity-100 transition-opacity"
            />

            {/* Inner Coin Solid Ring */}
            <circle
              cx="18"
              cy="18"
              r="11.5"
              stroke="#1E293B"
              strokeWidth="1.5"
            />

            {/* Conversion Exchange Arrows (Top arrow right, bottom arrow left) */}
            <path
              d="M12 14.5H22M22 14.5L18.5 11M22 14.5L18.5 18"
              stroke="url(#cr-arrow-grad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 21.5H14M14 21.5L17.5 18M14 21.5L17.5 25"
              stroke="#818CF8"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Center Live Pulse Dot */}
            <circle
              cx="18"
              cy="18"
              r="2"
              fill="#10B981"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div>
          <div className="flex items-center gap-1.5">
            <span className={`font-black ${textSizes} tracking-tight text-white flex items-center`}>
              Coin<span className="gradient-text">Rates</span>
            </span>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 tracking-wider shadow-sm shadow-emerald-500/10">
              .live
            </span>
          </div>
          <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block font-medium">
            Live Crypto & Fiat Converter
          </p>
        </div>
      )}
    </div>
  );
};
