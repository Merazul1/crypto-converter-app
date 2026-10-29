import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {type === 'privacy' ? (
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            ) : (
              <FileText className="w-5 h-5 text-indigo-400" />
            )}
            <h3 className="text-lg font-bold text-white">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p>
                At <strong>CoinRates.live</strong>, accessible from <a href="https://www.coinrates.live" className="text-indigo-400 underline">https://www.coinrates.live</a>, the privacy of our visitors is of extreme importance to us. This Privacy Policy document outlines the types of personal information that is received and collected by CoinRates.live and how it is used.
              </p>

              <h4 className="font-bold text-white text-sm pt-2">Log Files and Analytics</h4>
              <p>
                Like many other Web sites, CoinRates.live makes use of log files and privacy-focused analytics (including Ahrefs Analytics). The information inside the log files includes internet protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time stamp, and referring/exit pages to analyze trends and administer the site.
              </p>

              <h4 className="font-bold text-white text-sm pt-2">Cookies and Web Beacons (Google AdSense)</h4>
              <p>
                CoinRates.live uses cookies to store information about visitors preferences, to record user-specific information on which pages the site visitor accesses or visits, and to personalize or customize our web page content based upon visitors browser type or other information that the visitor sends via their browser.
              </p>
              <p>
                Google, as a third-party vendor, uses cookies to serve ads on CoinRates.live. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to CoinRates.live and/or other sites on the Internet. Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">Google Ads Settings</a>, or by using the Digital Advertising Alliance (DAA) WebChoices tool at <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">optout.aboutads.info</a> (or <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">Your Online Choices</a> for European visitors).
              </p>

              <h4 className="font-bold text-white text-sm pt-2">Third-Party Advertising Partners</h4>
              <p>
                Some of our advertising partners (including Google AdSense) may use cookies and web beacons on our site. These third-party ad servers or ad networks use technology in their respective advertisements and links that appear on CoinRates.live, which are sent directly to your browser. They automatically receive your IP address when this occurs.
              </p>

              <h4 className="font-bold text-white text-sm pt-2">Consent</h4>
              <p>
                By using our website, you hereby consent to our privacy policy and agree to its terms.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to <strong>CoinRates.live</strong>. By accessing or using our free live cryptocurrency calculator and market tools, you agree to be bound by these Terms of Service.
              </p>

              <h4 className="font-bold text-white text-sm pt-2">1. Informational Purpose Only</h4>
              <p>
                All data, exchange rates, conversion calculations, and market indicators provided on CoinRates.live are for informational and educational purposes only. CoinRates.live does not provide financial, investment, or trading advice.
              </p>

              <h4 className="font-bold text-white text-sm pt-2">2. Accuracy of Data</h4>
              <p>
                While we strive to provide real-time, accurate market rates directly via Binance and global FX feeds, CoinRates.live does not guarantee the complete accuracy, timeliness, or completeness of any data displayed.
              </p>

              <h4 className="font-bold text-white text-sm pt-2">3. Limitation of Liability</h4>
              <p>
                Under no circumstances shall CoinRates.live or its operators be held liable for any loss or damage resulting from the use of or reliance on any calculations or prices displayed on this website.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
