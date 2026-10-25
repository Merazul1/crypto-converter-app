import React from 'react';
import { Currency } from '../types/crypto';
import { CoinIcon } from './CoinIcon';
import { formatNumber } from '../utils/formatters';
import { Globe2, ArrowRight } from 'lucide-react';

interface ConversionMatrixProps {
  sourceCurrency: Currency;
  currencies: Currency[];
  onSelectTarget: (currency: Currency) => void;
}

export const ConversionMatrix: React.FC<ConversionMatrixProps> = ({
  sourceCurrency,
  currencies,
  onSelectTarget,
}) => {
  // Top fiats to compare
  const targetFiats = currencies.filter(
    (c) => c.type === 'fiat' && ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CAD'].includes(c.symbol) && c.id !== sourceCurrency.id
  );

  // Top cryptos to compare
  const targetCryptos = currencies.filter(
    (c) => c.type === 'crypto' && ['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'DOGE'].includes(c.symbol) && c.id !== sourceCurrency.id
  );

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <Globe2 className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-white text-base">
            Multi-Currency Value Matrix
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Base: 1 {sourceCurrency.symbol}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* FIAT MATRIX */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Global Currencies (Fiat)</span>
            <span>1 {sourceCurrency.symbol} equals</span>
          </h4>
          <div className="space-y-1.5">
            {targetFiats.map((target) => {
              const rate = sourceCurrency.priceUsd / target.priceUsd;
              return (
                <div
                  key={target.id}
                  onClick={() => onSelectTarget(target)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/60 hover:border-slate-700 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <CoinIcon symbol={target.symbol} size="sm" />
                    <div>
                      <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-400 transition">
                        {target.symbol}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {target.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-slate-100">
                      {formatNumber(rate, 2)}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CRYPTO MATRIX */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Top Crypto Assets</span>
            <span>1 {sourceCurrency.symbol} equals</span>
          </h4>
          <div className="space-y-1.5">
            {targetCryptos.map((target) => {
              const rate = sourceCurrency.priceUsd / target.priceUsd;
              return (
                <div
                  key={target.id}
                  onClick={() => onSelectTarget(target)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/60 hover:border-slate-700 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <CoinIcon symbol={target.symbol} size="sm" />
                    <div>
                      <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-400 transition">
                        {target.symbol}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {target.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-slate-100">
                      {formatNumber(rate, 6)}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
