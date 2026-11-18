import React, { useState } from 'react';
import { Currency } from '../types/crypto';
import { ChevronDown, ChevronUp, HelpCircle, ArrowRightLeft, ShieldCheck, Zap } from 'lucide-react';

interface PairSeoSectionProps {
  fromCurrency: Currency;
  toCurrency: Currency;
}

export const PairSeoSection: React.FC<PairSeoSectionProps> = ({ fromCurrency, toCurrency }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Live real-time rate calculated from state
  const liveRate = toCurrency.priceUsd > 0 ? fromCurrency.priceUsd / toCurrency.priceUsd : 1;

  const formatRate = (num: number) => {
    if (num < 0.0001) return num.toFixed(8);
    if (num < 1) return num.toFixed(4);
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  const formatCryptoAmount = (num: number) => {
    if (num < 0.0001) return num.toFixed(8);
    if (num < 0.01) return num.toFixed(6);
    if (num < 1) return num.toFixed(4);
    if (Number.isInteger(num)) return num.toString();
    return num.toFixed(2);
  };

  // Dynamic conversion amounts based on currency tier
  const getForwardAmounts = (): number[] => {
    const sym = fromCurrency.symbol.toUpperCase();
    if (sym === 'SOL') return [0.01, 0.04, 0.1, 0.5, 1, 2, 5, 10, 50, 100, 500];
    if (['DOGE', 'SHIB', 'PEPE'].includes(sym)) return [1, 10, 50, 100, 250, 500, 1000, 5000, 10000];
    if (sym === 'BTC') return [0.001, 0.005, 0.01, 0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10];
    if (sym === 'ETH') return [0.01, 0.05, 0.1, 0.5, 1, 2, 3, 5, 10];
    return [0.1, 0.5, 1, 2, 5, 10, 25, 50, 100];
  };

  const getReverseAmounts = (): number[] => {
    const sym = toCurrency.symbol.toUpperCase();
    if (['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(sym)) return [5, 10, 25, 50, 100, 250, 500, 1000, 5000];
    if (sym === 'INR') return [500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];
    if (sym === 'BTC') return [0.001, 0.005, 0.01, 0.05, 0.1, 0.25, 0.5, 1];
    return [1, 5, 10, 25, 50, 100, 500];
  };

  const forwardAmounts = getForwardAmounts();
  const reverseAmounts = getReverseAmounts();

  const faqs = [
    {
      q: `What is 1 ${fromCurrency.name} (${fromCurrency.symbol}) in ${toCurrency.name} (${toCurrency.symbol}) today?`,
      a: `Right now, 1 ${fromCurrency.name} (${fromCurrency.symbol}) is currently trading at approximately ${formatRate(liveRate)} ${toCurrency.symbol}. Live rates update automatically on CoinRates.live every 25 seconds directly from Binance market order books and decentralized FX benchmarks.`
    },
    {
      q: `How do I convert ${fromCurrency.symbol} to ${toCurrency.symbol} without fees?`,
      a: `Simply type your desired ${fromCurrency.symbol} quantity into our live calculator card above to see the exact net ${toCurrency.symbol} value. There are zero transaction fees, no mandatory registration, and no KYC verification required on CoinRates.live.`
    },
    {
      q: `What is the 24-hour high and low for ${fromCurrency.symbol}/${toCurrency.symbol}?`,
      a: `The ${fromCurrency.symbol} to ${toCurrency.symbol} exchange rate fluctuates based on global trading volume and order book liquidity. You can inspect intraday highs, lows, and historical candlestick movements directly on our live interactive chart above.`
    },
    {
      q: `Can I convert small fractions like 0.1 or 0.01 ${fromCurrency.symbol} to ${toCurrency.symbol}?`,
      a: `Yes, CoinRates.live supports fractional calculations down to 8 decimal places. You can convert micro quantities such as ${forwardAmounts.slice(0, 3).join(', ')} ${fromCurrency.symbol} to ${toCurrency.symbol} with sub-second accuracy.`
    }
  ];

  return (
    <section className="space-y-8 mt-12 text-slate-300">
      
      {/* Overview Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Live Order Book Spot Benchmark</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              1 {fromCurrency.symbol} = {formatRate(liveRate)} {toCurrency.symbol}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Live {fromCurrency.name} to {toCurrency.name} exchange rate streamed from global liquidity pools.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-400 font-medium">Real-Time Continuous Feed</span>
          </div>
        </div>

        {/* Dual Conversion Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Forward Table */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
                <span>{fromCurrency.symbol} to {toCurrency.symbol} Quick Table</span>
              </h3>
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Live Value</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                    <th className="py-2 px-1">Amount ({fromCurrency.symbol})</th>
                    <th className="py-2 px-1 text-right">Value ({toCurrency.symbol})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-slate-300">
                  {forwardAmounts.map((amt) => (
                    <tr key={amt} className="hover:bg-slate-800/20 transition">
                      <td className="py-2 px-1 font-medium">{amt} {fromCurrency.symbol}</td>
                      <td className="py-2 px-1 text-right font-bold text-emerald-400">
                        {formatRate(amt * liveRate)} {toCurrency.symbol}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Reverse Table */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-indigo-400" />
                <span>{toCurrency.symbol} to {fromCurrency.symbol} Reverse Table</span>
              </h3>
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Crypto Output</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                    <th className="py-2 px-1">Amount ({toCurrency.symbol})</th>
                    <th className="py-2 px-1 text-right">Value ({fromCurrency.symbol})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-slate-300">
                  {reverseAmounts.map((fiatAmt) => (
                    <tr key={fiatAmt} className="hover:bg-slate-800/20 transition">
                      <td className="py-2 px-1 font-medium">{fiatAmt.toLocaleString()} {toCurrency.symbol}</td>
                      <td className="py-2 px-1 text-right font-bold text-indigo-400">
                        {formatCryptoAmount(fiatAmt / liveRate)} {fromCurrency.symbol}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* Pair-Specific FAQs Accordion */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-4">
        <div className="border-b border-slate-800/80 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Instant Q&amp;A</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Frequently Asked Questions About {fromCurrency.symbol} to {toCurrency.symbol}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Common questions regarding {fromCurrency.name} calculations, spread fees, and real-time exchange rates.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/40 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-800/30 transition"
                >
                  <span className="font-bold text-sm sm:text-base text-white">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Value Proposition Box */}
      <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
        <h3 className="font-bold text-base text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Why Convert {fromCurrency.symbol} to {toCurrency.symbol} on CoinRates.live?</span>
        </h3>
        <p>
          Unlike retail brokers that quietly embed 2% to 4% markups into conversion spreads, CoinRates.live streams unfiltered spot ticker benchmarks directly from global exchanges. Whether calculating high-volume trades or micro-conversions, your figures reflect true market clearing prices with zero registration and zero hidden fees.
        </p>
      </div>

    </section>
  );
};
