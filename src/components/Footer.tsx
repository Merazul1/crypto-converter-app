import React from 'react';
import { Heart, Shield } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-12 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <Logo size="sm" />
            <p className="text-slate-400 leading-relaxed pt-1">
              Fast, free, and accurate live cryptocurrency converter supporting 50+ coins and global fiat currencies.
            </p>
          </div>

          {/* Quick Features */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Features
            </h4>
            <ul className="space-y-2">
              <li>Instant 2-Way Crypto Swaps</li>
              <li>Live 24h Binance Ticker Feed</li>
              <li>Global Fiat Exchange Rates</li>
              <li>Ethereum Gas Fee Tracker</li>
              <li>Interactive Sparkline Charts</li>
            </ul>
          </div>

          {/* Supported Assets */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Supported Coins
            </h4>
            <ul className="space-y-2">
              <li>Bitcoin (BTC) & Ethereum (ETH)</li>
              <li>Solana (SOL) & Binance Coin (BNB)</li>
              <li>Ripple (XRP) & Dogecoin (DOGE)</li>
              <li>USD, EUR, GBP, INR, JPY, CAD</li>
              <li>USDT, USDC, DAI Stablecoins</li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Disclaimer
            </h4>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Rates are provided for informational and calculation purposes. Real-time rates reflect global trading volume and order books. No financial advice provided.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} CoinRates.live. Free Real-Time Cryptocurrency Converter.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for crypto traders</span>
            </span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">100% Free Forever</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
