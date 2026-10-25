import React from 'react';
import { Currency } from '../types/crypto';
import { CoinIcon } from './CoinIcon';
import { formatNumber } from '../utils/formatters';
import { Star, Trash2, ArrowRight } from 'lucide-react';

interface SavedPairsProps {
  favorites: { from: string; to: string }[];
  currencies: Currency[];
  onSelectPair: (from: string, to: string) => void;
  onRemoveFavorite: (from: string, to: string) => void;
}

export const SavedPairs: React.FC<SavedPairsProps> = ({
  favorites,
  currencies,
  onSelectPair,
  onRemoveFavorite,
}) => {
  if (favorites.length === 0) return null;

  const currencyMap = new Map(currencies.map((c) => [c.symbol, c]));

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <h3 className="font-bold text-white text-sm sm:text-base">
            Your Pinned Favorites
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          {favorites.length} saved
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {favorites.map((fav) => {
          const fromCurr = currencyMap.get(fav.from);
          const toCurr = currencyMap.get(fav.to);
          if (!fromCurr || !toCurr) return null;

          const rate = fromCurr.priceUsd / toCurr.priceUsd;

          return (
            <div
              key={`${fav.from}-${fav.to}`}
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between group"
            >
              <div
                onClick={() => onSelectPair(fav.from, fav.to)}
                className="flex items-center gap-2.5 cursor-pointer flex-1"
              >
                <div className="flex -space-x-2">
                  <CoinIcon symbol={fromCurr.symbol} size="sm" className="ring-2 ring-slate-900" />
                  <CoinIcon symbol={toCurr.symbol} size="sm" className="ring-2 ring-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1 font-bold text-xs text-slate-100 group-hover:text-indigo-400 transition">
                    <span>{fromCurr.symbol}</span>
                    <span className="text-slate-500">/</span>
                    <span>{toCurr.symbol}</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    1 = {formatNumber(rate, toCurr.decimals || 4)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onSelectPair(fav.from, fav.to)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-slate-800 transition"
                  title="Load this conversion"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFavorite(fav.from, fav.to);
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                  title="Remove from favorites"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
