import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Is this live crypto converter completely free to use?',
    a: 'Yes, 100% free. There are no registration forms, no subscriptions, and no hidden API limits for everyday calculations.',
  },
  {
    q: 'Where do the real-time exchange rates come from?',
    a: 'We pull real-time data from major global liquidity providers including the Binance REST/WebSocket market feed and decentralized fx feeds. If you are offline, smart baseline rates guarantee seamless operation.',
  },
  {
    q: 'How frequently are rates refreshed?',
    a: 'Prices update automatically every 20 seconds. You can also press the circular refresh button on the converter card at any moment to trigger an immediate live sync.',
  },
  {
    q: 'Can I convert between crypto and fiat currencies like USD, EUR, or INR?',
    a: 'Absolutely. CoinRates.live provides bidirectional calculations between cryptocurrencies (BTC, ETH, SOL, etc.) and global currencies (USD, EUR, GBP, INR, JPY, CAD, AUD, etc.).',
  },
  {
    q: 'How do crypto exchanges rates differ across platforms?',
    a: 'Crypto exchanges rates can vary slightly between platforms like Binance, Coinbase, and Kraken due to order book depth and localized liquidity. CoinRates.live streams consolidated live benchmark rates to give you the most accurate real-time market value.',
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
