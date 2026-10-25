import React, { useState, useMemo } from 'react';
import { Currency, CurrencyType } from '../types/crypto';
import { CoinIcon } from './CoinIcon';
import { formatNumber } from '../utils/formatters';
import { Search, X, TrendingUp, TrendingDown, Check } from 'lucide-react';

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currencies: Currency[];
  selectedCurrency: Currency;
  onSelect: (currency: Currency) => void;
  title: string;
}

export const CurrencyModal: React.FC<CurrencyModalProps> = ({
  isOpen,
  onClose,
  currencies,
  selectedCurrency,
  onSelect,
  title,
}) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | CurrencyType>('all');

  const filteredCurrencies = useMemo(() => {
    return currencies.filter((curr) => {
      // Tab filter
      if (activeTab !== 'all' && curr.type !== activeTab) {
        return false;
      }
      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        return (
          curr.symbol.toLowerCase().includes(q) ||
          curr.name.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [currencies, activeTab, search]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select from over 35+ top cryptocurrencies and global fiat currencies
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-800/80 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              autoFocus
              placeholder="Search by name or symbol (e.g. BTC, Solana, USD)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {(['all', 'crypto', 'fiat'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab === 'all' ? 'All Assets' : tab === 'crypto' ? '🪙 Crypto' : '💵 Fiat / Cash'}
              </button>
            ))}
          </div>

          {/* Quick Popular shortcuts */}
          {!search && (
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mr-1">Popular:</span>
              {currencies.filter(c => c.popular).slice(0, 7).map((curr) => (
                <button
                  key={curr.id}
                  onClick={() => {
                    onSelect(curr);
                    onClose();
                  }}
                  className={`text-xs px-2.5 py-1 rounded-md border flex items-center gap-1.5 transition ${
                    selectedCurrency.id === curr.id
                      ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400 font-semibold'
                      : 'border-slate-800 bg-slate-850 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <CoinIcon symbol={curr.symbol} size="sm" />
                  <span>{curr.symbol}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Currency List */}
        <div className="overflow-y-auto divide-y divide-slate-800/50 p-2 max-h-[380px]">
          {filteredCurrencies.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm">No currency matching "{search}"</p>
              <button
                onClick={() => setSearch('')}
                className="mt-2 text-xs text-indigo-400 hover:underline"
              >
                Clear search filter
              </button>
            </div>
          ) : (
            filteredCurrencies.map((curr) => {
              const isSelected = selectedCurrency.id === curr.id;
              const hasChange = typeof curr.change24h === 'number';
              const isPositive = (curr.change24h || 0) >= 0;

              return (
                <button
                  key={curr.id}
                  onClick={() => {
                    onSelect(curr);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition group text-left ${
                    isSelected
                      ? 'bg-indigo-600/15 border border-indigo-500/40'
                      : 'hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CoinIcon symbol={curr.symbol} size="md" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100 group-hover:text-white text-sm">
                          {curr.symbol}
                        </span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                          {curr.type.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 line-clamp-1">
                        {curr.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-200">
                        ${formatNumber(curr.priceUsd, 4)}
                      </div>
                      {hasChange && (
                        <div
                          className={`text-xs flex items-center justify-end gap-0.5 font-medium ${
                            isPositive ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isPositive ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          <span>
                            {isPositive ? '+' : ''}
                            {curr.change24h?.toFixed(2)}%
                          </span>
                        </div>
                      )}
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
