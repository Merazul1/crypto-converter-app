import React, { useState } from 'react';
import { Heart, Shield } from 'lucide-react';
import { Logo } from './Logo';
import { PrivacyModal } from './PrivacyModal';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const handleLink = (e: React.MouseEvent, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      window.history.pushState({}, '', path);
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-12 mt-16 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Col */}
            <div className="space-y-3 md:col-span-1">
              <Logo size="sm" />
              <p className="text-slate-400 leading-relaxed pt-1">
                Fast, free, and accurate live cryptocurrency converter supporting 50+ coins and global fiat currencies.
              </p>
              <div className="pt-2 flex flex-col space-y-1.5 text-slate-400">
                <a href="/about" onClick={(e) => handleLink(e, '/about')} className="hover:text-indigo-400 transition">About CoinRates.live</a>
                <a href="/contact" onClick={(e) => handleLink(e, '/contact')} className="hover:text-indigo-400 transition">Contact Us & Support</a>
                <a href="/guides" onClick={(e) => handleLink(e, '/guides')} className="hover:text-indigo-400 transition">Crypto Market Guides</a>
              </div>
            </div>

            {/* Quick Features */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Features
              </h4>
              <ul className="space-y-2">
                <li><a href="/convert/btc-to-usd" onClick={(e) => handleLink(e, '/convert/btc-to-usd')} className="hover:text-indigo-400 transition">BTC to USD Converter</a></li>
                <li><a href="/convert/eth-to-usd" onClick={(e) => handleLink(e, '/convert/eth-to-usd')} className="hover:text-indigo-400 transition">ETH to USD Converter</a></li>
                <li><a href="/convert/sol-to-usd" onClick={(e) => handleLink(e, '/convert/sol-to-usd')} className="hover:text-indigo-400 transition">SOL to USD Converter</a></li>
                <li><a href="/guides/understanding-ethereum-gas-fees" onClick={(e) => handleLink(e, '/guides/understanding-ethereum-gas-fees')} className="hover:text-indigo-400 transition">Ethereum Gas Tracker Guide</a></li>
                <li><a href="/guides/how-crypto-exchange-rates-work" onClick={(e) => handleLink(e, '/guides/how-crypto-exchange-rates-work')} className="hover:text-indigo-400 transition">Exchange Rates Explained</a></li>
              </ul>
            </div>

            {/* Supported Assets */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Educational Guides
              </h4>
              <ul className="space-y-2">
                <li><a href="/guides/how-crypto-exchange-rates-work" onClick={(e) => handleLink(e, '/guides/how-crypto-exchange-rates-work')} className="hover:text-indigo-400 transition">Order Books & Bid-Ask Spreads</a></li>
                <li><a href="/guides/fiat-to-crypto-conversion-guide" onClick={(e) => handleLink(e, '/guides/fiat-to-crypto-conversion-guide')} className="hover:text-indigo-400 transition">Fiat-to-Crypto Exchange Guide</a></li>
                <li><a href="/guides/crypto-market-cap-vs-volume" onClick={(e) => handleLink(e, '/guides/crypto-market-cap-vs-volume')} className="hover:text-indigo-400 transition">Market Cap vs 24h Volume</a></li>
                <li><a href="/disclaimer" onClick={(e) => handleLink(e, '/disclaimer')} className="hover:text-indigo-400 transition">Financial Risk Disclaimer</a></li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Legal & Compliance
              </h4>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Rates are provided for informational and calculation purposes. Real-time rates reflect global trading volume and order books. No financial advice provided.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="/privacy-policy"
                  onClick={(e) => handleLink(e, '/privacy-policy')}
                  className="text-slate-400 hover:text-indigo-400 underline underline-offset-2 transition"
                >
                  Privacy Policy
                </a>
                <span>•</span>
                <a
                  href="/terms"
                  onClick={(e) => handleLink(e, '/terms')}
                  className="text-slate-400 hover:text-indigo-400 underline underline-offset-2 transition"
                >
                  Terms of Service
                </a>
                <span>•</span>
                <a
                  href="/disclaimer"
                  onClick={(e) => handleLink(e, '/disclaimer')}
                  className="text-slate-400 hover:text-indigo-400 underline underline-offset-2 transition"
                >
                  Disclaimer
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <p>© {new Date().getFullYear()} CoinRates.live. Free Real-Time Cryptocurrency Converter & Market Intelligence.</p>
            <div className="flex items-center gap-4">
              <a href="/about" onClick={(e) => handleLink(e, '/about')} className="hover:text-slate-300 transition">About</a>
              <span>•</span>
              <a href="/contact" onClick={(e) => handleLink(e, '/contact')} className="hover:text-slate-300 transition">Contact</a>
              <span>•</span>
              <a href="/privacy-policy" onClick={(e) => handleLink(e, '/privacy-policy')} className="hover:text-slate-300 transition">Privacy</a>
              <span>•</span>
              <a href="/terms" onClick={(e) => handleLink(e, '/terms')} className="hover:text-slate-300 transition">Terms</a>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span>Made with</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>for crypto traders</span>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy / Terms Modal */}
      {modalType && (
        <PrivacyModal
          isOpen={true}
          onClose={() => setModalType(null)}
          type={modalType}
        />
      )}
    </>
  );
};
