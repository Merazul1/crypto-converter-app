import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Which sites support fast BTC to USD conversion?',
    a: 'CoinRates.live is engineered specifically for instantaneous, zero-delay BTC to USD and cryptocurrency conversions. With direct streaming price feeds from Binance, zero sign-up requirements, and built-in slippage calculations, you can convert Bitcoin to US Dollar with 100% accuracy in real-time.',
  },
  {
    q: 'What are fiat-to-crypto exchange rates and how are they tracked?',
    a: 'Fiat-to-crypto exchange rates calculate the exact amount of cryptocurrency (such as Bitcoin, Ethereum, or Solana) you receive in exchange for traditional government fiat currencies (like USD, EUR, GBP, or INR). CoinRates.live tracks live market orders and decentralized currency benchmarks to provide continuous 24/7 rate updates.',
  },
  {
    q: 'How does exchange rate tracking for crypto work in real-time?',
    a: 'Exchange rate tracking for crypto monitors real-time bid and ask order books across premier liquidity venues like Binance. CoinRates.live streams consolidated price feeds every 20 seconds, eliminating localized distortions and giving you the true market clearing rate.',
  },
  {
    q: 'How do crypto currencies exchange rates differ across platforms?',
    a: 'Crypto currencies exchange rates can vary slightly between exchanges like Binance, Coinbase, and Kraken due to differing trading volumes and localized liquidity. CoinRates.live aggregates continuous live benchmark prices so you always see fair market value.',
  },
  {
    q: 'Is this live crypto converter completely free to use?',
    a: 'Yes, CoinRates.live is 100% free with no registration forms, no subscriptions, and no hidden API limits for everyday calculations.',
  },
  {
    q: 'Where do the real-time exchange rates come from?',
    a: 'We pull real-time data from major global liquidity providers including Binance REST/WebSocket market streams and open foreign exchange feeds. If you are offline, smart baseline rates guarantee seamless operation.',
  },
  {
    q: 'Can I convert between crypto and fiat currencies like USD, EUR, or INR?',
    a: 'Yes, CoinRates.live provides instant bidirectional calculations between top cryptocurrencies (BTC, ETH, SOL, XRP, DOGE) and 50+ global fiat currencies (USD, EUR, GBP, INR, JPY, CAD, AUD).',
  },
  {
    q: 'What is the slippage / fee adjustment option?',
    a: 'Real-world crypto swaps on exchanges or DeFi protocols often incur a trading fee (e.g. 0.1% on Binance or 0.3% on Uniswap). The fee toggle lets you see your exact net payout after slippage.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800/80">
        <HelpCircle className="w-5 h-5 text-indigo-400" />
        <h3 className="font-bold text-white text-base sm:text-lg">
          Frequently Asked Questions
        </h3>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden transition"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-800/40 transition gap-3"
              >
                <span className="font-semibold text-sm text-slate-200">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-4 pt-0 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/40 mt-1">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
