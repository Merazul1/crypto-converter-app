import React from 'react';
import { BookOpen, Calculator, ShieldCheck, Zap, ArrowRightLeft } from 'lucide-react';

export const SeoContent: React.FC = () => {
  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8 text-slate-300">
      
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Educational Guide & Information</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          How Live Cryptocurrency Exchange Rates Work
        </h2>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          Understanding real-time digital currency rates, exchange mechanisms, liquidity order books, and conversion mathematics on CoinRates.live.
        </p>
      </div>

      {/* Grid of Key Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1 */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">The Conversion Formula</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Cryptocurrency conversions are calculated by benchmarking both assets against a universal global baseline (typically <strong>USD / USDT</strong>):
          </p>
          <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 border border-slate-800">
            Exchange Rate = Price(Asset A in USD) / Price(Asset B in USD)
          </div>
          <p className="text-xs text-slate-500">
            This guarantees mathematically precise conversion across any crypto-to-fiat or cross-chain crypto pair.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">Why Live Rates Fluctuate</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Unlike traditional bank forex which operates on fixed trading sessions, crypto markets trade <strong>24/7/365</strong>. Prices reflect continuous buy/sell orders executed across major exchanges like Binance, Coinbase, and Kraken.
          </p>
          <p className="text-xs text-slate-500">
            CoinRates.live fetches updated pricing every 25 seconds to capture volatile micro-swings.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">Understanding Slippage & Fees</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            When executing actual swaps on automated market makers (Uniswap, Raydium) or centralized exchanges, traders encounter fees ranging from <strong>0.1% to 1.0%</strong>. Use our built-in slider to calculate exact net receipts.
          </p>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-white">Fiat Currency Integrations</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Whether you want to convert Bitcoin to <strong>US Dollars (USD)</strong>, <strong>Euros (EUR)</strong>, <strong>Indian Rupees (INR)</strong>, or <strong>British Pounds (GBP)</strong>, CoinRates.live applies real-time foreign exchange benchmark feeds.
          </p>
        </div>

      </div>

      {/* SEO Keywords Summary Footer */}
      <div className="pt-4 border-t border-slate-800/60 flex flex-wrap gap-2 text-xs text-slate-500">
        <span className="font-semibold text-slate-400">Popular Search Topics:</span>
        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">Cryptocurrency Exchange Rates</span>
        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">Crypto Exchange Rate</span>
        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">Digital Currency Rates</span>
        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">BTC to USD</span>
        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">ETH to USD</span>
        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">SOL to USD</span>
        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">BTC to INR</span>
        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">BTC to EUR</span>
      </div>

    </section>
  );
};
