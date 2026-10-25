import React from 'react';
import { Currency } from '../types/crypto';
import { CoinIcon } from './CoinIcon';
import { formatNumber } from '../utils/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface LiveTickerProps {
  currencies: Currency[];
  onSelectCoin: (currency: Currency) => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ currencies, onSelectCoin }) => {
  // Take top crypto assets
  const tickerCurrencies = currencies.filter((c) => c.type === 'crypto').slice(0, 16);

  // Duplicate for seamless infinite loop marquee
  const marqueeItems = [...tickerCurrencies, ...tickerCurrencies];

  return (
    <div className="w-full bg-slate-950/80 border-b border-slate-800/80 overflow-hidden relative py-2 backdrop-blur-md">
      {/* Side fades for clean marquee look */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#090d16] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#090d16] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-6">
        {marqueeItems.map((curr, idx) => {
          const isPositive = (curr.change24h || 0) >= 0;

          return (
            <button
              key={`${curr.id}-${idx}`}
              onClick={() => onSelectCoin(curr)}
              className="flex items-center gap-2.5 px-3 py-1 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/70 hover:border-slate-700 transition cursor-pointer text-left shrink-0 group"
            >
              <CoinIcon symbol={curr.symbol} size="sm" />
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-200 group-hover:text-white">
                  {curr.symbol}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  ${formatNumber(curr.priceUsd, curr.decimals || 4)}
                </span>
                <span
                  className={`text-[11px] font-semibold flex items-center ${
                    isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                  )}
                  {isPositive ? '+' : ''}
                  {curr.change24h?.toFixed(2)}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
