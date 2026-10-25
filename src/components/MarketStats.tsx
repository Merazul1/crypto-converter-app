import React from 'react';
import { GasFeeInfo } from '../types/crypto';
import { Gauge, Fuel, BarChart3, Bookmark } from 'lucide-react';
import { POPULAR_PAIRS } from '../data/defaultCurrencies';

interface MarketStatsProps {
  gasInfo: GasFeeInfo;
  fearAndGreed: { value: number; classification: string };
  onSelectPair: (from: string, to: string) => void;
  currentFrom: string;
  currentTo: string;
}

export const MarketStats: React.FC<MarketStatsProps> = ({
  gasInfo,
  fearAndGreed,
  onSelectPair,
  currentFrom,
  currentTo,
}) => {
  // Determine color for fear and greed index
  const getFngColor = (val: number) => {
    if (val >= 75) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (val >= 55) return 'text-teal-400 bg-teal-500/10 border-teal-500/30';
    if (val >= 45) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  return (
    <div className="space-y-4">
      {/* Quick Pair Chips Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800">
        <div className="flex items-center gap-2 mb-2.5">
          <Bookmark className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Popular Conversions
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {POPULAR_PAIRS.map((pair) => {
            const isActive = currentFrom === pair.from && currentTo === pair.to;
            return (
              <button
                key={`${pair.from}-${pair.to}`}
                onClick={() => onSelectPair(pair.from, pair.to)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-semibold transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                <span>{pair.from}</span>
                <span className="text-slate-500">→</span>
                <span>{pair.to}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Micro-Widgets: Gas, Market Sentiment, Dominance */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Fear & Greed */}
        <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-indigo-400" />
              Crypto Sentiment
            </span>
            <div className="mt-1">
              <div className="text-xl font-black text-slate-100 font-mono">
                {fearAndGreed.value}/100
              </div>
              <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-md border mt-1 ${getFngColor(fearAndGreed.value)}`}>
                {fearAndGreed.classification}
              </span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 flex items-center justify-center font-bold text-xs text-indigo-300">
            {fearAndGreed.value}%
          </div>
        </div>

        {/* Live Gas Fees */}
        <div className="glass-panel rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Fuel className="w-4 h-4 text-emerald-400" />
              Ethereum Gas
            </span>
            <span className="text-[10px] text-slate-500">Live Gwei</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2 pt-1 border-t border-slate-800/60 text-center font-mono">
            <div className="bg-slate-900/70 p-1.5 rounded-lg border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">Slow</span>
              <span className="text-xs font-bold text-slate-200">{gasInfo.slow}</span>
            </div>
            <div className="bg-slate-900/70 p-1.5 rounded-lg border border-indigo-500/30">
              <span className="text-[10px] text-indigo-400 block">Standard</span>
              <span className="text-xs font-bold text-indigo-300">{gasInfo.standard}</span>
            </div>
            <div className="bg-slate-900/70 p-1.5 rounded-lg border border-slate-800/80">
              <span className="text-[10px] text-amber-400 block">Fast</span>
              <span className="text-xs font-bold text-amber-300">{gasInfo.fast}</span>
            </div>
          </div>
        </div>

        {/* Market Dominance & Status */}
        <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              BTC Dominance
            </span>
            <span className="text-xs font-bold font-mono text-amber-400">58.4%</span>
          </div>

          <div className="space-y-1.5 mt-2">
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
              <div className="bg-amber-400 h-full" style={{ width: '58.4%' }} title="BTC 58.4%" />
              <div className="bg-indigo-500 h-full" style={{ width: '14.2%' }} title="ETH 14.2%" />
              <div className="bg-slate-500 h-full" style={{ width: '27.4%' }} title="Others 27.4%" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> BTC 58%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> ETH 14%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" /> Others
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
