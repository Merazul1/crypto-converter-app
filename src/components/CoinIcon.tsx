import React from 'react';

interface CoinIconProps {
  symbol: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const CoinIcon: React.FC<CoinIconProps> = ({ symbol, size = 'md', className = '' }) => {
  const sym = symbol.toUpperCase();

  const sizeClasses = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm font-semibold',
    xl: 'w-12 h-12 text-base font-bold',
  }[size];

  // Specific high-fidelity SVGs for major coins
  if (sym === 'BTC') {
    return (
      <div className={`${sizeClasses} rounded-full bg-[#F7931A] text-white flex items-center justify-center shadow-sm shrink-0 font-bold ${className}`}>
        ₿
      </div>
    );
  }

  if (sym === 'ETH') {
    return (
      <div className={`${sizeClasses} rounded-full bg-[#627EEA] text-white flex items-center justify-center shadow-sm shrink-0 font-bold ${className}`}>
        Ξ
      </div>
    );
  }

  if (sym === 'SOL') {
    return (
      <div className={`${sizeClasses} rounded-full bg-gradient-to-tr from-[#9945FF] to-[#14F195] text-white flex items-center justify-center shadow-sm shrink-0 font-bold ${className}`}>
        S
      </div>
    );
  }

  if (sym === 'USDT') {
    return (
      <div className={`${sizeClasses} rounded-full bg-[#26A17B] text-white flex items-center justify-center shadow-sm shrink-0 font-bold ${className}`}>
        ₮
      </div>
    );
  }

  if (sym === 'USDC') {
    return (
      <div className={`${sizeClasses} rounded-full bg-[#2775CA] text-white flex items-center justify-center shadow-sm shrink-0 font-bold ${className}`}>
        $
      </div>
    );
  }

  if (sym === 'BNB') {
    return (
      <div className={`${sizeClasses} rounded-full bg-[#F3BA2F] text-slate-950 flex items-center justify-center shadow-sm shrink-0 font-bold ${className}`}>
        ❖
      </div>
    );
  }

  if (sym === 'XRP') {
    return (
      <div className={`${sizeClasses} rounded-full bg-slate-900 border border-slate-700 text-cyan-400 flex items-center justify-center shadow-sm shrink-0 font-bold ${className}`}>
        ✕
      </div>
    );
  }

  if (sym === 'DOGE') {
    return (
      <div className={`${sizeClasses} rounded-full bg-[#C2A633] text-white flex items-center justify-center shadow-sm shrink-0 font-bold ${className}`}>
        Ð
      </div>
    );
  }

  // Fiat badges
  if (sym === 'USD') {
    return (
      <div className={`${sizeClasses} rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0 font-bold ${className}`}>
        $
      </div>
    );
  }

  if (sym === 'EUR') {
    return (
      <div className={`${sizeClasses} rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0 font-bold ${className}`}>
        €
      </div>
    );
  }

  if (sym === 'GBP') {
    return (
      <div className={`${sizeClasses} rounded-full bg-purple-600 text-white flex items-center justify-center shadow-sm shrink-0 font-bold ${className}`}>
        £
      </div>
    );
  }

  if (sym === 'INR') {
    return (
      <div className={`${sizeClasses} rounded-full bg-orange-600 text-white flex items-center justify-center shadow-sm shrink-0 font-bold ${className}`}>
        ₹
      </div>
    );
  }

  if (sym === 'JPY') {
    return (
      <div className={`${sizeClasses} rounded-full bg-rose-600 text-white flex items-center justify-center shadow-sm shrink-0 font-bold ${className}`}>
        ¥
      </div>
    );
  }

  // Color generator for other currencies
  const colors = [
    'bg-indigo-600', 'bg-violet-600', 'bg-amber-600', 'bg-teal-600',
    'bg-cyan-600', 'bg-pink-600', 'bg-fuchsia-600', 'bg-sky-600'
  ];
  const charCodeSum = sym.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const colorClass = colors[charCodeSum % colors.length];

  return (
    <div className={`${sizeClasses} rounded-full ${colorClass} text-white flex items-center justify-center shadow-sm shrink-0 font-bold tracking-tight ${className}`}>
      {sym.slice(0, 3)}
    </div>
  );
};
