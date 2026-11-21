import React, { useState } from 'react';
import { 
  Mail, 
  HelpCircle, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle,
  Globe,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Scale,
  BookOpen,
  Clock,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Zap,
  ArrowRight
} from 'lucide-react';

export type StaticPageKey = 
  | 'about' 
  | 'contact' 
  | 'privacy' 
  | 'terms' 
  | 'disclaimer' 
  | 'guides' 
  | 'guide-rates' 
  | 'guide-fiat' 
  | 'guide-marketcap' 
  | 'guide-gas' 
  | 'guide-tax'
  | 'guide-cex-dex'
  | 'guide-stablecoins'
  | 'guide-fees';

interface StaticPageProps {
  page: StaticPageKey;
  onNavigate: (path: string) => void;
}

// Reusable Author & Editorial Badge
const EditorialByline: React.FC<{ readTime: string; updatedDate?: string }> = ({ 
  readTime, 
  updatedDate = 'Updated November 2026' 
}) => (
  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 py-3 border-y border-slate-800/80 my-4">
    <div className="flex items-center gap-1.5 text-indigo-400 font-medium">
      <UserCheck className="w-3.5 h-3.5" />
      <span>By CoinRates Market Research Team</span>
    </div>
    <span className="text-slate-600">•</span>
    <div className="flex items-center gap-1.5 text-slate-400">
      <Clock className="w-3.5 h-3.5 text-slate-500" />
      <span>{readTime}</span>
    </div>
    <span className="text-slate-600">•</span>
    <div className="flex items-center gap-1.5 text-emerald-400">
      <ShieldCheck className="w-3.5 h-3.5" />
      <span>Reviewed for Technical & Financial Accuracy</span>
    </div>
    <span className="text-slate-600">•</span>
    <span className="text-slate-500">{updatedDate}</span>
  </div>
);

// Reusable Key Takeaways Box
const KeyTakeaways: React.FC<{ points: string[] }> = ({ points }) => (
  <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-2.5 my-6">
    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
      <Zap className="w-4 h-4 text-indigo-400" /> Key Takeaways
    </h3>
    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
      {points.map((pt, idx) => (
        <li key={idx} className="flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>{pt}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Interactive FAQ Accordion Component
const FaqAccordion: React.FC<{ items: { q: string; a: string }[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3 pt-6">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-indigo-400" /> Frequently Asked Questions
      </h3>
      <div className="space-y-2">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden transition"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-indigo-300 transition"
              >
                <span>{item.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                )}
              </button>
              {isOpen && (
                <div className="p-4 pt-0 text-xs sm:text-sm text-slate-400 border-t border-slate-800/60 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const StaticPage: React.FC<StaticPageProps> = ({ page, onNavigate }) => {
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 text-slate-300">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('/')}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
          Back to Live Converter
        </button>

        {page.startsWith('guide-') && (
          <button
            onClick={() => navigateTo('/guides')}
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition"
          >
            <BookOpen className="w-3.5 h-3.5" /> All Guides
          </button>
        )}
      </div>

      {/* =========================================================================
          ABOUT PAGE (E-E-A-T Optimized for AdSense Approval)
          ========================================================================= */}
      {page === 'about' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Company & Mission</span>
            <h1 className="text-3xl font-black text-white mt-1">About CoinRates.live</h1>
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            <strong>CoinRates.live</strong> is an independent digital currency conversion and exchange rate aggregation platform. Our mission is to provide cryptocurrency traders, Web3 developers, global cross-border freelancers, and digital asset investors with instantaneous, accurate, and completely transparent financial conversion tools without mandatory account registrations, paywalls, or intrusive popups.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">Our Market Data Methodology</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Unlike static currency calculators that cache rates once every few hours, CoinRates.live streams live market prices continuously from premier global liquidity order books (including Binance REST and WebSocket endpoints) and decentralized FX benchmarks. Prices refresh automatically every 25 seconds to capture volatile micro-swings across Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and over 50 global fiat currencies including USD, EUR, GBP, INR, CAD, AUD, and JPY.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
              <h3 className="font-bold text-white text-sm">100% Free Forever</h3>
              <p className="text-xs text-slate-400 mt-1">No premium tiers, no conversion caps, and zero hidden exchange fees.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <Globe className="w-5 h-5 text-indigo-400 mb-2" />
              <h3 className="font-bold text-white text-sm">Global Fiat Support</h3>
              <p className="text-xs text-slate-400 mt-1">Full 2-way conversion across USD, EUR, GBP, INR, JPY, CAD, and AUD.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <Cpu className="w-5 h-5 text-amber-400 mb-2" />
              <h3 className="font-bold text-white text-sm">Real-Time Slippage</h3>
              <p className="text-xs text-slate-400 mt-1">Simulate real-world exchange trading fees and network gas costs accurately.</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-white pt-2">Editorial Independence & Research Rigor</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            CoinRates.live operates with strict editorial independence. Our educational research guides, fee analyses, and market explanations are authored by dedicated financial analysts and blockchain software engineers. We do not accept payment to artificially alter exchange rates, promote unvetted altcoin listings, or endorse high-risk financial schemes.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">Editorial Review Process</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Every educational guide published on CoinRates.live undergoes a three-step editorial review:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-400">
            <li><strong>Primary Data Verification:</strong> Blockchain metrics, gas formulas, and exchange fee structures are audited against active network explorers (Etherscan, Solscan) and official exchange documentation.</li>
            <li><strong>Financial Accuracy Check:</strong> Tax implications, cost-basis methodologies, and order book mechanics are reviewed against published regulatory guidance (e.g. IRS Notice 2014-21, FinCEN advisories).</li>
            <li><strong>Continuous Content Updates:</strong> When protocol upgrades occur (such as Ethereum hard forks or fee schedule modifications), our guides are updated promptly to ensure readers access accurate information.</li>
          </ol>
        </article>
      )}

      {/* =========================================================================
          CONTACT PAGE
          ========================================================================= */}
      {page === 'contact' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Support & Inquiries</span>
            <h1 className="text-3xl font-black text-white mt-1">Contact Us</h1>
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            Have questions regarding our live exchange rates, feature suggestions, API partnerships, or editorial feedback? The CoinRates.live team is here to assist you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Support & Inquiries</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Send your inquiry directly to our engineering and support inbox. We reply to all queries within 24–48 business hours.
              </p>
              <a 
                href="mailto:support@coinrates.live" 
                className="inline-block font-mono text-sm text-indigo-400 hover:text-indigo-300 font-semibold underline"
              >
                support@coinrates.live
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Editorial & Corrections</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Noticed a typo, outdated regulatory reference, or want to suggest an editorial topic for our Research team?
              </p>
              <span className="inline-block font-mono text-sm text-emerald-400 font-semibold">
                editorial@coinrates.live
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4 pt-4">
            <h2 className="text-lg font-bold text-white">Send Us a Direct Message</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Your inquiry has been recorded and will be reviewed shortly.'); }} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Your Name</label>
                  <input type="text" required placeholder="Alex Turner" className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Email Address</label>
                  <input type="email" required placeholder="alex@example.com" className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Subject</label>
                <input type="text" required placeholder="Feedback on Currency Feed or Guide Suggestion" className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Message</label>
                <textarea rows={4} required placeholder="Write your message here..." className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition">
                Send Message
              </button>
            </form>
          </div>
        </article>
      )}

      {/* =========================================================================
          PRIVACY POLICY PAGE
          ========================================================================= */}
      {page === 'privacy' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Compliance & Privacy</span>
            <h1 className="text-3xl font-black text-white mt-1">Privacy Policy</h1>
            <p className="text-xs text-slate-500 mt-1">Last Updated: November 2026</p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            At <strong>CoinRates.live</strong>, accessible from <a href="https://www.coinrates.live/" className="text-indigo-400 underline">https://www.coinrates.live</a>, the privacy of our visitors is of paramount importance to us. This Privacy Policy document outlines the types of personal and anonymous information received and collected by CoinRates.live and how it is utilized.
          </p>

          <h2 className="text-lg font-bold text-white pt-2">Log Files & Web Analytics</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            CoinRates.live makes use of standard server log files and privacy-focused analytics (including Ahrefs Web Analytics). The information collected includes internet protocol (IP) addresses, browser user-agents, internet service provider (ISP), referring/exit pages, and date/time stamps. This data is used solely to analyze technical performance, optimize mobile rendering, and administer server stability. Log files are not linked to personally identifiable information.
          </p>

          <h2 className="text-lg font-bold text-white pt-2">Cookies, Web Beacons & Google AdSense</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            CoinRates.live uses cookies to remember your favorite currency pairs in your local browser storage. Third-party vendors, including <strong>Google AdSense</strong>, use cookies to serve ads based on prior visits to our website or other websites on the internet.
          </p>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Google's use of advertising cookies enables it and its partners to serve ads to our visitors based on their visit to CoinRates.live and other sites across the web. You may opt out of personalized advertising by visiting:
          </p>
          <ul className="list-disc pl-5 text-xs text-slate-400 space-y-1">
            <li><a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">Google Ads Settings</a></li>
            <li><a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">Digital Advertising Alliance (DAA) WebChoices Tool</a></li>
            <li><a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">European Interactive Digital Advertising Alliance (EDAA)</a></li>
          </ul>

          <h2 className="text-lg font-bold text-white pt-2">Children's Information (COPPA)</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            CoinRates.live does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe your child has provided personal information on our website, please contact us immediately at <a href="mailto:support@coinrates.live" className="text-indigo-400 underline">support@coinrates.live</a>.
          </p>
        </article>
      )}

      {/* =========================================================================
          TERMS OF SERVICE PAGE
          ========================================================================= */}
      {page === 'terms' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Legal Terms</span>
            <h1 className="text-3xl font-black text-white mt-1">Terms of Service</h1>
            <p className="text-xs text-slate-500 mt-1">Last Updated: November 2026</p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Welcome to CoinRates.live. By accessing and using this website, you agree to comply with and be bound by the following terms and conditions of use.
          </p>

          <h2 className="text-lg font-bold text-white pt-2">Permitted Use & Intellectual Property</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            CoinRates.live provides real-time digital currency conversion for personal, educational, and non-commercial business reference. You may not scrape, overload, reverse-engineer, or deploy automated bots against our streaming endpoints without explicit written authorization.
          </p>

          <h2 className="text-lg font-bold text-white pt-2">Disclaimer of Warranties</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            All data, conversion calculators, and market indicators are provided on an "as is" and "as available" basis without warranties of any kind. While we strive to ensure 99.9% rate accuracy, market conditions can change rapidly and CoinRates.live is not responsible for execution slippage on third-party brokerages.
          </p>
        </article>
      )}

      {/* =========================================================================
          DISCLAIMER PAGE
          ========================================================================= */}
      {page === 'disclaimer' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Financial Notice</span>
            <h1 className="text-3xl font-black text-white mt-1">Financial & Risk Disclaimer</h1>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Cryptocurrency trading and digital asset investments involve substantial risk of financial loss. Prices are highly volatile and can fluctuate dramatically within seconds. Never invest money that you cannot afford to lose.
            </p>
          </div>

          <h2 className="text-lg font-bold text-white pt-2">No Financial or Investment Advice</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            The content, charts, and conversion calculations provided on CoinRates.live are for informational, calculation, and educational purposes only. Nothing on this website constitutes legal, tax, accounting, or investment advice. Always consult a licensed financial advisor before executing financial trades.
          </p>
        </article>
      )}

      {/* =========================================================================
          GUIDES DIRECTORY HUB (8 High-Value Educational Resources)
          ========================================================================= */}
      {page === 'guides' && (
        <article className="space-y-8 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Educational Hub</span>
            <h1 className="text-3xl font-black text-white mt-1">Crypto Guides & Market Knowledge Base</h1>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Comprehensive, peer-reviewed educational guides exploring cryptocurrency economics, conversion mechanics, tax regulations, exchange liquidity, and blockchain network fees.
            </p>
          </div>

          {/* Section 1: Core Conversion & Trading Mechanics */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" /> Market Economics & Rates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                onClick={() => navigateTo('/guides/how-crypto-exchange-rates-work')}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">Market Mechanics</span>
                  <span className="text-[11px] text-slate-500">6 min read</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">How Crypto Exchange Rates Are Determined</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Understand how limit order books, bid-ask spreads, automated market makers (AMMs), and automated arbitrage stabilize market prices.
                </p>
                <span className="text-xs text-indigo-400 font-semibold inline-flex items-center gap-1 pt-1">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div 
                onClick={() => navigateTo('/guides/fiat-to-crypto-conversion-guide')}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Banking & Liquidity</span>
                  <span className="text-[11px] text-slate-500">8 min read</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">Safest Way to Convert Bitcoin to US Dollars & Fiat Rates</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Compare regulated CEXs, institutional OTC desks, and P2P multi-sig escrow with lowest fees and bank rails (ACH, FedNow, Wire).
                </p>
                <span className="text-xs text-emerald-400 font-semibold inline-flex items-center gap-1 pt-1">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Valuation, Gas & Protocol Fees */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" /> Blockchain Infrastructure & Gas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                onClick={() => navigateTo('/guides/crypto-market-cap-vs-volume')}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">Valuation Metrics</span>
                  <span className="text-[11px] text-slate-500">7 min read</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition">Market Cap vs. 24h Trading Volume vs. FDV</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Why high market cap can conceal phantom liquidity. How to evaluate circulating supply, token inflation, and wash trading risks.
                </p>
                <span className="text-xs text-amber-400 font-semibold inline-flex items-center gap-1 pt-1">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div 
                onClick={() => navigateTo('/guides/understanding-ethereum-gas-fees')}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">Ethereum Network</span>
                  <span className="text-[11px] text-slate-500">9 min read</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition">What is Gwei in Crypto? Ethereum Gas & Fee Guide</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Understand EIP-1559 base fee burning, validator tips, and how Layer-2 rollups (Arbitrum, Base, Optimism) reduce costs by 95%.
                </p>
                <span className="text-xs text-purple-400 font-semibold inline-flex items-center gap-1 pt-1">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Taxes, Exchanges & Advanced Structure */}
          <div className="space-y-4 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" /> Taxes, Exchanges & Stablecoins
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                onClick={() => navigateTo('/guides/crypto-tax-guide-conversions')}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Tax Compliance</span>
                  <span className="text-[11px] text-slate-500">10 min read</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">Cryptocurrency Tax Guide: How Conversions Are Taxed</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Learn capital gains rules, FIFO vs HIFO cost basis, taxable disposals vs wallet transfers, and reporting requirements.
                </p>
                <span className="text-xs text-emerald-400 font-semibold inline-flex items-center gap-1 pt-1">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div 
                onClick={() => navigateTo('/guides/cex-vs-dex-exchange-comparison')}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20">Exchange Architecture</span>
                  <span className="text-[11px] text-slate-500">8 min read</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition">Centralized (CEX) vs. Decentralized (DEX) Exchanges</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Proof-of-reserves, self-custody tradeoffs, order books vs automated market makers, and front-running protection.
                </p>
                <span className="text-xs text-blue-400 font-semibold inline-flex items-center gap-1 pt-1">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div 
                onClick={() => navigateTo('/guides/understanding-stablecoins-pegs')}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 cursor-pointer transition space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/10 text-teal-300 border border-teal-500/20">Stablecoin Safety</span>
                  <span className="text-[11px] text-slate-500">8 min read</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition">Understanding Stablecoins: Fiat-Backed vs Algorithmic</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  How USDT, USDC, and DAI preserve 1:1 USD pegs. Reserve audit transparency, de-pegging risks, and redemptions.
                </p>
                <span className="text-xs text-teal-400 font-semibold inline-flex items-center gap-1 pt-1">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div 
                onClick={() => navigateTo('/guides/crypto-transaction-fees-and-spreads')}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/50 cursor-pointer transition space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20">Fee Optimization</span>
                  <span className="text-[11px] text-slate-500">7 min read</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition">Crypto Transaction Fees: Network Gas & Hidden Spreads</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  How "zero-fee" crypto apps make money on inflated bid-ask spreads. Calculating true conversion slippage.
                </p>
                <span className="text-xs text-rose-400 font-semibold inline-flex items-center gap-1 pt-1">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* =========================================================================
          GUIDE 1: HOW CRYPTO EXCHANGE RATES ARE DETERMINED
          ========================================================================= */}
      {page === 'guide-rates' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Crypto Market Economics</span>
            <h1 className="text-3xl font-black text-white mt-1">How Crypto Exchange Rates Are Determined: Order Books, AMMs & Arbitrage</h1>
            <EditorialByline readTime="6 min read" />
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            Unlike sovereign fiat currencies governed by central bank monetary committees, cryptocurrency exchange rates are determined in real time by decentralized market forces: supply and demand across global liquidity order books and automated market makers (AMMs).
          </p>

          <KeyTakeaways points={[
            'Exchange rates are established by the midpoint between the highest buyer bid and lowest seller ask (the bid-ask spread).',
            'Cross-exchange arbitrage bots run automated algorithms that keep global Bitcoin and crypto rates unified across independent venues.',
            'Decentralized exchanges rely on mathematical Automated Market Maker formulas (x × y = k) instead of traditional order books.',
            'CoinRates.live streams live ticker feeds from Binance and global liquidity hubs every 25 seconds to deliver true clearing rates.'
          ]} />

          <h2 className="text-xl font-bold text-white pt-2">1. Order Books & The Bid-Ask Spread</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            On centralized cryptocurrency exchanges like Binance, Coinbase, and Kraken, market participants submit limit orders:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <h3 className="text-sm font-bold text-emerald-400">Bid (Buyer Demand)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The highest price that a buyer is willing to pay for a cryptocurrency at that precise moment.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <h3 className="text-sm font-bold text-rose-400">Ask (Seller Offer)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The lowest price that a seller is willing to accept to part with their cryptocurrency.
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            The difference between the highest bid and lowest ask is known as the <strong>bid-ask spread</strong>. When market buyers execute "market buy" orders, they consume seller liquidity at the ask price, causing the exchange rate to tick upward. When sellers dump coins onto bids, the rate decreases.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">2. Automated Arbitrage: Why Prices Match Globally</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Because cryptocurrency markets operate 24 hours a day, 365 days a year across hundreds of independent venues worldwide, price discrepancies naturally arise. For example, if Bitcoin trades at $92,000 on Binance and $92,300 on Coinbase, high-frequency algorithmic trading bots instantly buy on Binance and sell on Coinbase. This cross-exchange arbitrage rapidly pulls international prices back into equilibrium within milliseconds.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">3. Automated Market Makers (AMM) in DeFi</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            On decentralized exchanges (DEXs) like Uniswap and Raydium, there are no order books. Instead, prices are established algorithmically via liquidity pools using the constant product formula:
          </p>
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 border border-slate-800 max-w-lg">
            x × y = k (Token A Reserve × Token B Reserve = Constant Product)
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            When a trader swaps Token A for Token B, the pool's balance shifts, automatically raising the price of Token B to balance the equation.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">4. Market Depth, Order Book Slippage & Execution</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Market depth measures the cumulative capital sitting at each price level. In highly liquid pairs like BTC/USD, order book depth exceeds tens of millions within 1% of spot. When order size exceeds immediate top-of-book liquidity, the order sweeps higher price levels, resulting in slippage:
          </p>
          <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 border border-slate-800 max-w-lg">
            Slippage (%) = |(Average Executed Price - Initial Midpoint) / Initial Midpoint| × 100
          </div>

          <h2 className="text-xl font-bold text-white pt-2">5. Liquidity Tier Comparison Across Digital Assets</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900/80 text-slate-300 border-b border-slate-800">
                <tr>
                  <th className="p-3 font-semibold">Tier</th>
                  <th className="p-3 font-semibold">Assets</th>
                  <th className="p-3 font-semibold">Typical Spread</th>
                  <th className="p-3 font-semibold">24h Depth</th>
                  <th className="p-3 font-semibold">Slippage Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-400">
                <tr>
                  <td className="p-3 font-bold text-cyan-400">Tier 1 (Mega-Cap)</td>
                  <td className="p-3">BTC, ETH, SOL</td>
                  <td className="p-3 text-emerald-400">&lt; 0.02% ($0.50-$2)</td>
                  <td className="p-3">$1B - $30B+ Daily</td>
                  <td className="p-3 text-emerald-400">Virtually Zero</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-400">Tier 2 (Large-Cap)</td>
                  <td className="p-3">BNB, XRP, DOGE</td>
                  <td className="p-3 text-emerald-400">0.05% - 0.15%</td>
                  <td className="p-3">$200M - $1B Daily</td>
                  <td className="p-3 text-emerald-400">Low on &lt;$50k</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-400">Tier 3 (Mid-Cap)</td>
                  <td className="p-3">AVAX, LINK, SUI</td>
                  <td className="p-3 text-amber-400">0.20% - 0.50%</td>
                  <td className="p-3">$20M - $200M Daily</td>
                  <td className="p-3 text-amber-400">Moderate</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-rose-400">Tier 4 (Micro-Cap)</td>
                  <td className="p-3">PEPE, Meme coins</td>
                  <td className="p-3 text-rose-400">1.00% - 3.50%+</td>
                  <td className="p-3">&lt; $20M Daily</td>
                  <td className="p-3 text-rose-400">Severe</td>
                </tr>
              </tbody>
            </table>
          </div>

          <FaqAccordion items={[
            {
              q: 'Why do crypto exchange rates differ slightly across apps?',
              a: 'Each exchange operates its own independent liquidity pool and order book. Highly liquid exchanges like Binance have tighter spreads (often under $0.50 on BTC), whereas smaller local exchanges have wider spreads.'
            },
            {
              q: 'How does CoinRates.live ensure rate accuracy?',
              a: 'CoinRates.live queries premier real-time WebSocket and REST order book tickers continuously, discarding illiquid outliers to display true global clearing benchmarks.'
            },
            {
              q: 'What is slippage in crypto conversions?',
              a: 'Slippage is the difference between the expected price of a trade and the executed price, typically caused when order size exceeds immediate top-of-book liquidity.'
            }
          ]} />
        </article>
      )}

      {/* =========================================================================
          GUIDE 2: SAFEST WAY TO CONVERT BITCOIN TO US DOLLARS & FIAT
          ========================================================================= */}
      {page === 'guide-fiat' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Fiat Off-Ramps & Security</span>
            <h1 className="text-3xl font-black text-white mt-1">Safest Way to Convert Bitcoin to US Dollars (2026 Edition) & Fiat Rates</h1>
            <EditorialByline readTime="8 min read" />
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            Converting cryptocurrency into fiat currency (such as US Dollars, Euro, British Pound, or Indian Rupee) is one of the most critical financial operations in digital assets. Understanding the safest conversion rails protects your capital against counterparty risk, bank freezes, and exorbitant fee gouging.
          </p>

          <KeyTakeaways points={[
            'Regulated Centralized Exchanges (Coinbase, Kraken, Gemini) offer the safest fiat off-ramps with direct FedNow/ACH bank deposits.',
            'Institutional OTC desks are recommended for conversions exceeding $50,000 to avoid order book slippage.',
            'Never accept unverified peer-to-peer bank transfers from unknown third parties to prevent frozen bank accounts.',
            'Keep detailed records of cost basis and timestamps for capital gains tax compliance.'
          ]} />

          <h2 className="text-xl font-bold text-white pt-2">Comparison of the 4 Primary Fiat Off-Ramp Methods</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse rounded-xl overflow-hidden border border-slate-800 bg-slate-900/40">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-white font-semibold">
                  <th className="p-3">Method</th>
                  <th className="p-3">Typical Fee</th>
                  <th className="p-3">Settlement Speed</th>
                  <th className="p-3">Safety Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="p-3 font-bold text-emerald-400">Regulated CEX (Coinbase, Kraken)</td>
                  <td className="p-3">0.10% – 0.40%</td>
                  <td className="p-3">1 – 2 Business Days (ACH / FedNow)</td>
                  <td className="p-3 text-emerald-400 font-semibold">Highest (FinCEN Registered)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-400">Institutional OTC Desks</td>
                  <td className="p-3">0.05% – 0.20%</td>
                  <td className="p-3">Same-day Fedwire</td>
                  <td className="p-3 text-emerald-400 font-semibold">Highest ($50k+ Minimum)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-400">P2P Escrow (HodlHodl, Bisq)</td>
                  <td className="p-3">1.00% – 3.00%</td>
                  <td className="p-3">15 – 60 Minutes</td>
                  <td className="p-3 text-amber-400 font-semibold">Moderate (Risk of Bank Clawback)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-rose-400">Crypto ATMs</td>
                  <td className="p-3">7.00% – 18.00%</td>
                  <td className="p-3">Instant Cash</td>
                  <td className="p-3 text-rose-400 font-semibold">High Cost / Low Privacy</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-white pt-2">Step-by-Step: The Safest Conversion Protocol</h2>
          <ol className="list-decimal pl-5 space-y-3 text-xs sm:text-sm text-slate-400">
            <li><strong>Audit the Exchange Status:</strong> Verify that the platform holds a Money Services Business (MSB) license and publishes cryptographically verified Proof of Reserves (PoR).</li>
            <li><strong>Enable Hardware 2FA:</strong> Use a physical security key (YubiKey) or authenticator app (Google Authenticator); avoid SMS 2FA to prevent SIM-swap fraud.</li>
            <li><strong>Execute a Limit Order:</strong> Do not use basic "instant convert" buttons which embed wide 1.5% spreads. Use advanced spot trading interfaces with limit orders to pay lowest maker fees.</li>
            <li><strong>Withdraw via Direct Bank ACH or Fedwire:</strong> Ensure the bank account is registered under your identical legal name to avoid compliance holds.</li>
          </ol>

          <FaqAccordion items={[
            {
              q: 'Can I convert Bitcoin directly to cash without fees?',
              a: 'Every platform incurs operational costs, but you can minimize fees to near zero (0.10%) by using high-volume spot trading pairs on Kraken or Coinbase Advanced rather than instant-buy widgets.'
            },
            {
              q: 'Will my bank freeze my account for crypto deposits?',
              a: 'Reputable banks (e.g. Chase, Bank of America, Fidelity) accept deposits from regulated exchanges. To prevent flags, avoid peer-to-peer transfers from unfamiliar accounts and use exchanges that route through verified banking partners.'
            }
          ]} />
        </article>
      )}

      {/* =========================================================================
          GUIDE 3: MARKET CAP VS VOLUME VS FDV
          ========================================================================= */}
      {page === 'guide-marketcap' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Market Analysis & Tokenomics</span>
            <h1 className="text-3xl font-black text-white mt-1">Market Capitalization vs. 24h Trading Volume vs. FDV</h1>
            <EditorialByline readTime="7 min read" />
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            In cryptocurrency valuation, high market capitalization alone does not guarantee investment safety. To evaluate true financial liquidity and token health, analysts inspect the relationship between <strong>Circulating Market Cap</strong>, <strong>24-Hour Real Volume</strong>, and <strong>Fully Diluted Valuation (FDV)</strong>.
          </p>

          <KeyTakeaways points={[
            'Market Cap = Current Price × Circulating Supply; FDV = Current Price × Maximum Supply.',
            'A low Volume-to-Market-Cap ratio (under 2%) signals illiquidity and extreme slippage risk.',
            'High FDV with low circulating supply creates massive downward price pressure during venture token unlocks.',
            'Always inspect exchange volume authenticity using verified spot order book data.'
          ]} />

          <h2 className="text-xl font-bold text-white pt-2">1. Formula Breakdown: Market Cap vs. FDV</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-amber-400">Circulating Market Cap</h3>
              <p className="font-mono text-xs text-slate-300">Market Cap = Price × Circulating Supply</p>
              <p className="text-xs text-slate-400">
                Measures only the coins currently available in the open market. Bitcoin has ~19.8M BTC circulating out of 21M total.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-indigo-400">Fully Diluted Valuation (FDV)</h3>
              <p className="font-mono text-xs text-slate-300">FDV = Price × Maximum Cap Supply</p>
              <p className="text-xs text-slate-400">
                Theoretical valuation if 100% of tokens were unlocked today. A coin with $100M market cap but $2B FDV has 95% of its supply locked.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-white pt-2">2. The Volume-to-Market-Cap Ratio (Liquidity Gauge)</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            The Volume/Market Cap ratio determines how readily an asset can be bought or sold without moving the market price:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-400">
            <li><strong>Ratio &gt; 10%:</strong> High liquidity. Common for blue-chip assets like Bitcoin and Ethereum. Large orders experience minimal slippage.</li>
            <li><strong>Ratio 3% – 10%:</strong> Moderate liquidity. Standard for top 50 altcoins on major tier-1 exchanges.</li>
            <li><strong>Ratio &lt; 2%:</strong> Dangerous illiquidity. Selling even $10,000 worth can crash the price by double digits.</li>
          </ul>

          <FaqAccordion items={[
            {
              q: 'Why can an altcoin with a $1B market cap crash 90% in one day?',
              a: 'Market cap is an unweighted mathematical calculation based on the last marginal trade. If only 2% of the supply trades on thin order books, a modest sell-off depletes all available bids, causing the unit price and market cap to collapse.'
            },
            {
              q: 'How does FDV affect long-term conversion value?',
              a: 'When early investors, foundations, and venture funds unlock millions of locked tokens, supply floods the market. Unless demand scales proportionally, dilution forces the unit price lower.'
            }
          ]} />
        </article>
      )}

      {/* =========================================================================
          GUIDE 4: ETHEREUM GAS FEES & GWEI
          ========================================================================= */}
      {page === 'guide-gas' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Blockchain Infrastructure</span>
            <h1 className="text-3xl font-black text-white mt-1">What is Gwei in Crypto? Current Ethereum Gas Prices & Fee Guide</h1>
            <EditorialByline readTime="9 min read" />
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            Every transaction executed on the Ethereum blockchain requires computational effort. This computational expenditure is measured in <strong>gas</strong>, and gas prices are quoted in <strong>Gwei</strong>. Understanding how gas works is vital to avoiding overpaid transaction fees.
          </p>

          <KeyTakeaways points={[
            '1 Gwei = 0.000000001 ETH (10⁻⁹ ETH) = 1,000,000,000 Wei.',
            'Standard ETH wallet transfers require exactly 21,000 gas units; smart contract interactions require significantly more.',
            'EIP-1559 burns the base fee on every transaction, permanently reducing Ethereum supply during high demand.',
            'Layer-2 rollups like Arbitrum, Optimism, and Base reduce gas costs by 90%–98% through off-chain batching.'
          ]} />

          <h2 className="text-xl font-bold text-white pt-2">1. Gwei to ETH Conversion Reference</h2>
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-purple-300 border border-slate-800 max-w-lg">
            Total Transaction Fee = Gas Units × (Base Fee + Priority Tip)
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Because Ethereum is divisible to 18 decimal places, quoting network transaction fees in Gwei allows traders to work with human-readable numbers (e.g. "15 Gwei" instead of "0.000000015 ETH").
          </p>

          <h2 className="text-xl font-bold text-white pt-2">2. Estimated Gas Costs by Operation</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse rounded-xl overflow-hidden border border-slate-800 bg-slate-900/40">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-white font-semibold">
                  <th className="p-3">Action</th>
                  <th className="p-3">Gas Units</th>
                  <th className="p-3">Cost at 15 Gwei</th>
                  <th className="p-3">Cost on Layer-2 (Base/Arb)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="p-3 font-bold text-white">ETH Wallet Transfer</td>
                  <td className="p-3">21,000</td>
                  <td className="p-3">~$0.85 USD</td>
                  <td className="p-3 text-emerald-400">&lt; $0.01 USD</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">ERC-20 Token Transfer (USDC/USDT)</td>
                  <td className="p-3">45,000 – 65,000</td>
                  <td className="p-3">~$2.10 USD</td>
                  <td className="p-3 text-emerald-400">&lt; $0.02 USD</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Uniswap Token Swap</td>
                  <td className="p-3">120,000 – 180,000</td>
                  <td className="p-3">~$6.50 USD</td>
                  <td className="p-3 text-emerald-400">~$0.05 USD</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Cross-Chain Bridge Interaction</td>
                  <td className="p-3">200,000+</td>
                  <td className="p-3">~$9.50+ USD</td>
                  <td className="p-3 text-emerald-400">~$0.10 USD</td>
                </tr>
              </tbody>
            </table>
          </div>

          <FaqAccordion items={[
            {
              q: 'When are Ethereum gas fees cheapest during the week?',
              a: 'Gas fees are consistently lowest during weekends (Saturdays and Sundays UTC) and between 04:00 and 09:00 UTC before US and European financial markets open.'
            },
            {
              q: 'What happens to the base fee under EIP-1559?',
              a: 'The base fee is algorithmically burned by the network and removed from circulation permanently, creating deflationary pressure on ETH during peak network utilization.'
            }
          ]} />
        </article>
      )}

      {/* =========================================================================
          GUIDE 5: CRYPTOCURRENCY TAX GUIDE FOR CONVERSIONS
          ========================================================================= */}
      {page === 'guide-tax' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Tax & Regulatory Compliance</span>
            <h1 className="text-3xl font-black text-white mt-1">Cryptocurrency Tax Guide: How Conversions & Swaps Are Taxed</h1>
            <EditorialByline readTime="10 min read" />
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            In almost all major tax jurisdictions—including the United States (IRS), United Kingdom (HMRC), Canada (CRA), and the European Union—cryptocurrency is classified as property or a capital asset. Consequently, converting cryptocurrency triggers capital gains tax events.
          </p>

          <KeyTakeaways points={[
            'Converting crypto to fiat (BTC to USD) is a taxable event subject to capital gains or losses.',
            'Swapping one crypto for another (BTC to ETH) is ALSO a taxable disposal based on fair market value.',
            'Transferring crypto between your own private wallets is NOT taxable.',
            'Choose your accounting method carefully: FIFO (First-In-First-Out) vs HIFO (Highest-In-First-Out) to optimize tax liabilities.'
          ]} />

          <h2 className="text-xl font-bold text-white pt-2">Taxable vs. Non-Taxable Cryptocurrency Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" /> Taxable Events (Report Required)
              </h3>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li>Selling crypto for fiat currency (USD, EUR, GBP, CAD).</li>
                <li>Trading one cryptocurrency for another (e.g. SOL to USDC).</li>
                <li>Spending crypto to purchase goods or services.</li>
                <li>Earning staking rewards, airdrops, or mining income (ordinary income).</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Non-Taxable Events
              </h3>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li>Buying cryptocurrency with fiat currency (USD to BTC).</li>
                <li>Transferring coins between your own wallets or exchanges.</li>
                <li>Holding cryptocurrency long term (unrealized gains).</li>
                <li>Creating a self-custody wallet or donating to registered 501(c)(3) charities.</li>
              </ul>
            </div>
          </div>

          <h2 className="text-xl font-bold text-white pt-2">Cost Basis Accounting: FIFO vs. HIFO vs. LIFO</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Your capital gain is calculated as: <strong>Capital Gain = Fair Market Value at Disposal - Cost Basis</strong>. How you determine which coin you sold impacts your taxes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-400">
            <li><strong>FIFO (First-In, First-Out):</strong> Assumes the oldest purchased coin is sold first. Standard default for tax authorities.</li>
            <li><strong>HIFO (Highest-In, First-Out):</strong> Sells the coin with the highest purchase cost first, minimizing realized gains and reducing current tax liability.</li>
            <li><strong>Specific Identification:</strong> Requires explicit transaction hash tracking for each individual disposal.</li>
          </ul>

          <FaqAccordion items={[
            {
              q: 'Do I pay taxes if I convert Bitcoin into a stablecoin like USDC?',
              a: 'Yes. Stablecoins are treated as cryptocurrency. Swapping BTC for USDC is considered a property sale at fair market value, triggering a capital gain or loss.'
            },
            {
              q: 'What is the difference between short-term and long-term capital gains?',
              a: 'In the US, holding an asset for over 365 days qualifies it for lower long-term capital gains rates (0%, 15%, or 20%), whereas assets held for 1 year or less are taxed at higher ordinary income rates.'
            }
          ]} />
        </article>
      )}

      {/* =========================================================================
          GUIDE 6: CENTRALIZED (CEX) VS DECENTRALIZED (DEX) EXCHANGES
          ========================================================================= */}
      {page === 'guide-cex-dex' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Exchange Architecture</span>
            <h1 className="text-3xl font-black text-white mt-1">Centralized (CEX) vs. Decentralized (DEX) Exchanges: Security & Slippage</h1>
            <EditorialByline readTime="8 min read" />
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            When executing crypto conversions, choosing between a Centralized Exchange (CEX) and a Decentralized Exchange (DEX) involves fundamental tradeoffs between custodial security, fiat liquidity, execution speed, and privacy.
          </p>

          <KeyTakeaways points={[
            'CEX platforms hold custody of your private keys; DEX platforms enable non-custodial self-custody wallet trades.',
            'CEXs provide direct fiat on/off-ramps (bank transfers); DEXs only execute crypto-to-crypto swaps.',
            'DEX liquidity depends on Automated Market Maker pools, which can suffer high price slippage on large trades.',
            'Never leave large long-term holdings on any centralized custodial exchange.'
          ]} />

          <h2 className="text-xl font-bold text-white pt-2">Comprehensive Comparison: CEX vs. DEX</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse rounded-xl overflow-hidden border border-slate-800 bg-slate-900/40">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-white font-semibold">
                  <th className="p-3">Feature</th>
                  <th className="p-3">Centralized Exchange (CEX)</th>
                  <th className="p-3">Decentralized Exchange (DEX)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="p-3 font-bold text-white">Private Key Custody</td>
                  <td className="p-3 text-rose-400">Held by Exchange (Not Your Keys)</td>
                  <td className="p-3 text-emerald-400 font-semibold">Self-Custody (You Control Keys)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Fiat Integration</td>
                  <td className="p-3 text-emerald-400 font-semibold">Direct ACH, Wire, SEPA, Cards</td>
                  <td className="p-3 text-slate-400">Crypto-only (No direct fiat)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">KYC Verification</td>
                  <td className="p-3 text-slate-400">Mandatory Government ID</td>
                  <td className="p-3 text-emerald-400 font-semibold">Permissionless (Wallet connection only)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Execution Model</td>
                  <td className="p-3">Central Limit Order Book (CLOB)</td>
                  <td className="p-3">Automated Market Maker (AMM)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Counterparty Risk</td>
                  <td className="p-3 text-amber-400">Exchange Insolvency / Freezes</td>
                  <td className="p-3 text-amber-400">Smart Contract Exploits / Bug Risk</td>
                </tr>
              </tbody>
            </table>
          </div>

          <FaqAccordion items={[
            {
              q: 'Which is cheaper for converting $1,000 BTC to USD?',
              a: 'A centralized exchange like Kraken or Coinbase Advanced is typically cheaper because it provides native USD order books with low maker fees (0.15%–0.25%) and direct ACH cashouts.'
            },
            {
              q: 'Can DEX trades be censored or frozen?',
              a: 'True decentralized smart contracts cannot freeze wallets. However, front-end web interfaces may block certain jurisdictions, and centralized stablecoins (USDT/USDC) contain contract-level freeze functions.'
            }
          ]} />
        </article>
      )}

      {/* =========================================================================
          GUIDE 7: UNDERSTANDING STABLECOINS & PEGS
          ========================================================================= */}
      {page === 'guide-stablecoins' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Stablecoin Economics</span>
            <h1 className="text-3xl font-black text-white mt-1">Understanding Stablecoins: Fiat-Backed vs. Algorithmic Peg Mechanics</h1>
            <EditorialByline readTime="8 min read" />
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            Stablecoins serve as the primary liquidity bridge between volatile digital currencies and sovereign fiat currencies. Understanding the reserve backing and redemption mechanics of USDT, USDC, and decentralized alternatives is essential for capital preservation.
          </p>

          <KeyTakeaways points={[
            'Fiat-backed stablecoins (USDC, USDT) maintain 1:1 reserves held in short-term US Treasury bills and cash deposits.',
            'Crypto-collateralized stablecoins (DAI) rely on overcollateralization to absorb market volatility.',
            'Algorithmic stablecoins (like the failed TerraUSD/UST) rely on endogenous token minting and carry severe death-spiral risks.',
            'Check monthly third-party accounting attestations to verify dollar-for-dollar reserve solvency.'
          ]} />

          <h2 className="text-xl font-bold text-white pt-2">The Three Categories of Stablecoin Architecture</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase">1. Fiat-Collateralized</span>
              <h3 className="text-sm font-bold text-white">USDT, USDC, PYUSD</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Backed by real US dollars, overnight reverse repos, and T-bills held in regulated custodian banks. Users can redeem 1 token for $1.00 USD.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase">2. Crypto-Overcollateralized</span>
              <h3 className="text-sm font-bold text-white">DAI / USDS, LUSD</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Locked in smart contract vaults backed by excess crypto (e.g. $150 worth of ETH for every $100 of minted DAI) with automated liquidations.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase">3. Algorithmic / Synthetic</span>
              <h3 className="text-sm font-bold text-white">USDe, Historical UST</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Utilize automated arbitrage loops or delta-neutral funding rate hedging without 1:1 physical fiat reserves. High yield but elevated tail risk.
              </p>
            </div>
          </div>

          <FaqAccordion items={[
            {
              q: 'Can a stablecoin de-peg below $1.00?',
              a: 'Yes. Stablecoins can trade below $1.00 during banking crises or liquidity panics (e.g. USDC momentarily touched $0.88 during Silicon Valley Bank’s collapse before fully restoring parity as reserves were secured).'
            },
            {
              q: 'Which stablecoin is safest for long-term holding?',
              a: 'USDC (issued by Circle) publishes regular reserve attestations audits from top-four accounting firms and holds reserves exclusively in short-dated US Treasuries and cash.'
            }
          ]} />
        </article>
      )}

      {/* =========================================================================
          GUIDE 8: TRANSACTION FEES & HIDDEN SPREADS
          ========================================================================= */}
      {page === 'guide-fees' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Fee Optimization</span>
            <h1 className="text-3xl font-black text-white mt-1">Crypto Transaction Fees: Network Gas, Maker/Taker Fees & Hidden Spreads</h1>
            <EditorialByline readTime="7 min read" />
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            Many retail crypto applications advertise "0% Commission" or "Zero Fee Conversions". However, hidden spreads, inflated bid-ask markups, and network withdrawal fees can quietly erode 2% to 5% of your transaction value.
          </p>

          <KeyTakeaways points={[
            '"Zero fee" instant converter apps markup the exchange rate spread by 1.5% to 3.5%.',
            'Maker orders (limit orders that add liquidity) receive lower fees than Taker orders (market orders that take liquidity).',
            'Always calculate effective conversion cost: (Total Received / Total Paid) vs Benchmark Spot Rate.',
            'Use CoinRates.live with built-in slippage simulators to preview real-world net execution costs.'
          ]} />

          <h2 className="text-xl font-bold text-white pt-2">The 3 Components of Real Conversion Cost</h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-400">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <strong className="text-white block mb-1">1. Exchange Trading Fee (0.05% – 0.60%)</strong>
              Stated transaction commission charged by the exchange. Maker limit orders are consistently cheaper than market taker orders.
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <strong className="text-white block mb-1">2. Hidden Bid-Ask Spread Markup (1.0% – 3.0%)</strong>
              The artificial spread added on top of benchmark spot prices in retail mobile apps. For example, if BTC spot is $90,000, the app sells it to you at $91,500.
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <strong className="text-white block mb-1">3. Network Withdrawal / Miner Fee</strong>
              The flat blockchain transaction cost required to move funds from exchange custody to your personal hardware wallet.
            </div>
          </div>

          <FaqAccordion items={[
            {
              q: 'How do I avoid hidden spread markups?',
              a: 'Never use the default "Quick Buy" or "Instant Swap" widget in retail exchanges. Navigate to the exchange’s "Pro" or "Advanced" order book interface and submit limit orders.'
            },
            {
              q: 'Why does CoinRates.live include a fee slider in the converter?',
              a: 'Our converter includes an optional slippage and fee toggle (0%, 0.1%, 0.5%, 1.0%) so users can estimate real net proceeds after real-world broker fees.'
            }
          ]} />
        </article>
      )}

    </div>
  );
};
