import React from 'react';
import { 
  Mail, 
  HelpCircle, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle,
  Globe,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';

interface StaticPageProps {
  page: 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'guides' | 'guide-rates' | 'guide-fiat' | 'guide-marketcap' | 'guide-gas' | 'guide-fees';
  onNavigate: (path: string) => void;
}

export const StaticPage: React.FC<StaticPageProps> = ({ page, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 text-slate-300">
      {/* Back button */}
      <div>
        <button
          onClick={() => {
            window.history.pushState({}, '', '/');
            onNavigate('/');
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
          Back to Live Converter
        </button>
      </div>

      {/* ABOUT PAGE */}
      {page === 'about' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Company & Mission</span>
            <h1 className="text-3xl font-black text-white mt-1">About CoinRates.live</h1>
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            <strong>CoinRates.live</strong> is an independent, free, real-time cryptocurrency conversion and exchange rate aggregation platform. Our mission is to provide retail crypto traders, Web3 developers, global freelancers, and digital currency investors with instantaneous, accurate, and completely transparent financial conversion tools without mandatory sign-ups, subscriptions, or intrusive popups.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">Our Market Data Methodology</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Unlike many static currency calculators that cache rates once every few hours, CoinRates.live streams live market prices continuously from premier global liquidity order books (including Binance REST and WebSocket endpoints) and decentralized FX benchmarks. Prices refresh automatically every 25 seconds to capture volatile micro-swings across Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and over 50 global fiat currencies.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
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

          <h2 className="text-xl font-bold text-white pt-2">Editorial & Integrity Standards</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            CoinRates.live does not provide financial or investment advice. All rates, calculations, sparkline charts, and market metrics are generated algorithmically for educational and informational utility. We maintain strict editorial independence and do not manipulate conversion rates for third-party sponsors.
          </p>
        </article>
      )}

      {/* CONTACT PAGE */}
      {page === 'contact' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Support & Inquiries</span>
            <h1 className="text-3xl font-black text-white mt-1">Contact Us</h1>
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            Have questions about our exchange rates, feature suggestions, API partnerships, or bug reports? The CoinRates.live team is here to help.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Direct Email Inquiries</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Send your inquiry directly to our engineering and support inbox. We typically reply within 24–48 hours.
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
              <h3 className="font-bold text-white text-base">Technical Support & Feedback</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Notice an issue with a currency feed or want to request a new altcoin listing? Reach out directly with the pair name and exchange details.
              </p>
              <span className="inline-block text-xs text-emerald-400 font-medium">
                Average response time: &lt; 24 business hours
              </span>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4 pt-4">
            <h2 className="text-lg font-bold text-white">Send Us a Quick Message</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Your message has been received.'); }} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Your Name</label>
                  <input type="text" required placeholder="John Doe" className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Email Address</label>
                  <input type="email" required placeholder="john@example.com" className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Message Subject</label>
                <input type="text" required placeholder="Feature Request or Currency Feed Inquiry" className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Message</label>
                <textarea rows={4} required placeholder="Write your detailed message here..." className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition">
                Send Message
              </button>
            </form>
          </div>
        </article>
      )}

      {/* PRIVACY POLICY PAGE */}
      {page === 'privacy' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Compliance & Privacy</span>
            <h1 className="text-3xl font-black text-white mt-1">Privacy Policy</h1>
            <p className="text-xs text-slate-500 mt-1">Last Updated: November 2026</p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            At <strong>CoinRates.live</strong>, accessible from <a href="https://www.coinrates.live/" className="text-indigo-400 underline">https://www.coinrates.live</a>, the privacy of our visitors is of paramount importance to us. This Privacy Policy document outlines the types of personal and anonymous information received and collected by CoinRates.live and how it is used.
          </p>

          <h2 className="text-lg font-bold text-white pt-2">Log Files & Web Analytics</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Like most modern websites, CoinRates.live makes use of standard server log files and privacy-focused analytics (including Ahrefs Web Analytics). The information collected includes internet protocol (IP) addresses, browser user-agents, internet service provider (ISP), referring/exit pages, and date/time stamps. This data is used solely to analyze technical performance, optimize mobile rendering, and administer server stability. Log files are not linked to personally identifiable information.
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
            CoinRates.live does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe your child has provided personal information on our website, please contact us immediately at <a href="mailto:support@coinrates.live" className="text-indigo-400 underline">support@coinrates.live</a> and we will promptly remove such information.
          </p>

          <h2 className="text-lg font-bold text-white pt-2">Consent</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            By using our website, you hereby consent to our Privacy Policy and agree to its terms and conditions.
          </p>
        </article>
      )}

      {/* TERMS OF SERVICE PAGE */}
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
            All data, conversion calculators, and market indicators are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. While we strive to ensure 99.9% rate accuracy, market conditions can change rapidly and CoinRates.live is not responsible for execution slippage on third-party brokerages.
          </p>
        </article>
      )}

      {/* DISCLAIMER PAGE */}
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

      {/* GUIDES DIRECTORY PAGE */}
      {page === 'guides' && (
        <article className="space-y-8 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Educational Hub</span>
            <h1 className="text-3xl font-black text-white mt-1">Crypto Guides & Market Knowledge Base</h1>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              In-depth, comprehensive guides on how cryptocurrency exchange rates work, fiat conversions, market cap dynamics, and exchange liquidity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={() => { window.history.pushState({}, '', '/guides/how-crypto-exchange-rates-work'); onNavigate('/guides/how-crypto-exchange-rates-work'); }}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition space-y-3"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white">How Crypto Exchange Rates Are Determined</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Learn how order book depth, bid-ask spreads, automated market makers (AMMs), and market arbitrage establish the true price of Bitcoin and cryptocurrencies.
              </p>
              <span className="text-xs text-indigo-400 font-semibold inline-block pt-1">Read Complete Guide →</span>
            </div>

            <div 
              onClick={() => { window.history.pushState({}, '', '/guides/fiat-to-crypto-conversion-guide'); onNavigate('/guides/fiat-to-crypto-conversion-guide'); }}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition space-y-3"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white">Safest Way to Convert Bitcoin to US Dollars &amp; Fiat Rates</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Compare regulated exchanges, institutional OTC desks, P2P multi-sig escrow, and how to convert crypto to USD with lowest fees in 2025.
              </p>
              <span className="text-xs text-emerald-400 font-semibold inline-block pt-1">Read Complete Guide →</span>
            </div>

            <div 
              onClick={() => { window.history.pushState({}, '', '/guides/crypto-market-cap-vs-volume'); onNavigate('/guides/crypto-market-cap-vs-volume'); }}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition space-y-3"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white">Market Capitalization vs. 24h Trading Volume</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Why market cap alone can be misleading without evaluating 24-hour liquidity, order book depth, and circulating token supply.
              </p>
              <span className="text-xs text-amber-400 font-semibold inline-block pt-1">Read Complete Guide →</span>
            </div>

            <div 
              onClick={() => { window.history.pushState({}, '', '/guides/understanding-ethereum-gas-fees'); onNavigate('/guides/understanding-ethereum-gas-fees'); }}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition space-y-3"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white">What is Gwei in Crypto? Current Ethereum Gas Prices &amp; Fees</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                What Gwei means in crypto, how to calculate Ethereum transaction fees under EIP-1559, Gwei to USD conversion table, and tips for lower gas.
              </p>
              <span className="text-xs text-purple-400 font-semibold inline-block pt-1">Read Complete Guide →</span>
            </div>
          </div>
        </article>
      )}

      {/* GUIDE 1: HOW EXCHANGE RATES WORK */}
      {page === 'guide-rates' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Crypto Market Economics</span>
            <h1 className="text-3xl font-black text-white mt-1">How Crypto Exchange Rates Are Determined</h1>
            <p className="text-xs text-slate-500 mt-1">Published by CoinRates.live Research</p>
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            Unlike fiat currencies managed by central banks, cryptocurrency exchange rates are governed purely by decentralized market forces: supply and demand across global liquidity order books.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">1. Order Books & The Bid-Ask Spread</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            On centralized cryptocurrency exchanges like Binance, Coinbase, and Kraken, market participants place limit orders. <strong>Bids</strong> represent buyers' desired prices, while <strong>Asks</strong> represent sellers' minimum acceptable prices. The midpoint between the highest bid and lowest ask constitutes the live market spot rate. When buyers are more aggressive than sellers, orders consume ask liquidity, pushing the rate upwards.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">2. Cross-Exchange Arbitrage</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Because cryptocurrency trades globally 24 hours a day, 365 days a year across hundreds of independent exchanges, prices can momentarily diverge between venues. High-frequency automated trading bots exploit these micro-differences through arbitrage (buying low on one exchange and selling high on another), swiftly pulling global prices back into equilibrium.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">3. How CoinRates.live Aggregates Benchmark Prices</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            CoinRates.live connects directly to high-volume order book tickers, filtering out illiquid anomalies to deliver an accurate consolidated rate. This ensures that whether you are calculating 1 BTC to USD or converting Dogecoin to Euro, your figures reflect true global clearing value.
          </p>
        </article>
      )}

      {/* GUIDE 2: FIAT TO CRYPTO */}
      {page === 'guide-fiat' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Currency Conversion &amp; Security</span>
            <h1 className="text-3xl font-black text-white mt-1">Safest Way to Convert Bitcoin to US Dollars (2025 Edition) &amp; Fiat Rates</h1>
            <p className="text-xs text-slate-500 mt-1">Published by CoinRates.live Research • Updated November 2026</p>
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            Converting cryptocurrency into fiat currency (such as US Dollars, Euro, British Pound, or Indian Rupee) is one of the most critical financial operations in Web3. Knowing the safest liquidation methods ensures you protect your capital against exchange insolvency, counterparty scams, and hidden fee gouging.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">1. The 4 Safest Ways to Convert Bitcoin to US Dollars in 2025</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Depending on your priority—security, speed, privacy, or transaction size—here are the 4 battle-tested methods to convert BTC to USD safely:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Method 1 • Recommended</span>
              <h3 className="text-sm font-bold text-white">Regulated Centralized Exchanges (CEX)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Platforms like Coinbase, Kraken, and Gemini are regulated entities (FinCEN MSB registered, SOC-2 Type II certified). They offer audited 1:1 proof-of-reserves, mandatory hardware 2FA (YubiKey), and direct ACH/FedNow bank transfers that deposit USD straight into your bank.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Method 2 • High Volume</span>
              <h3 className="text-sm font-bold text-white">Institutional OTC Desks ($50k+)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                For high-volume Bitcoin liquidation, selling on open spot order books causes severe slippage. Institutional OTC desks execute large blocks off-exchange at a fixed agreed price with same-day wire settlement.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Method 3 • Non-Custodial</span>
              <h3 className="text-sm font-bold text-white">Non-Custodial P2P Multi-Sig Escrow</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Protocols like Bisq or Hodl Hodl lock Bitcoin in cryptographic smart contract escrow. BTC is only released after you confirm receipt of fiat payment in your bank. <em>Never accept reversible payment methods like basic PayPal or Venmo due to chargeback risks.</em>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wide">Method 4 • Instant Spend</span>
              <h3 className="text-sm font-bold text-white">Regulated Crypto Debit Cards</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Visa and Mastercard crypto debit cards automatically convert your Bitcoin to USD at the exact moment of swipe, allowing you to use crypto profits directly for everyday purchases without manual bank transfers.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-white pt-2">2. Understanding Real-Time Fiat-to-Crypto Exchange Rates &amp; FX Benchmarks</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Cryptocurrency assets trade 24/7 on global USD order books. When you convert Bitcoin to a local fiat currency like Euro (EUR), British Pound (GBP), or Indian Rupee (INR), the conversion relies on dual simultaneous benchmarks:
          </p>
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800 max-w-lg">
            Local Fiat Rate = (Crypto Spot USD Price) × (USD to Local Fiat FX Rate)
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            CoinRates.live streams live ticker feeds every 25 seconds directly from Binance, Kraken, and global forex benchmarks, ensuring zero latency and zero manipulative artificial spreads.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">3. How to Avoid Hidden Exchange Markup Fees &amp; Broker Spreads</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Retail brokers frequently market "0% Commission" while quietly widening their bid-ask spread by 2% to 4%. For example, if Bitcoin's real market spot price is $90,000, a broker might execute your sale at $88,200—costing you $1,800 per BTC in hidden markups! Always audit quotes against independent live rates on <strong>CoinRates.live</strong> before clicking confirm.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">4. Essential Security Checklist Before Converting Crypto to USD</h2>
          <div className="space-y-2 text-xs sm:text-sm text-slate-400">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Enable Hardware 2FA:</strong> Use physical security keys (YubiKey) or authenticator apps (Google Authenticator) instead of SMS 2FA to prevent SIM-swap attacks.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Verify URL &amp; SSL:</strong> Ensure you are on the authentic domain before signing in to prevent phishing credential theft.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Whitelist Bank Accounts:</strong> Set up withdrawal address whitelisting on your exchange to prevent unauthorized withdrawals in the event of an account breach.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Maintain Tax Records:</strong> In the US (IRS) and EU, converting cryptocurrency to fiat is a taxable disposal event. Keep detailed records of your date of acquisition, cost basis, and sale price.</span>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <h3 className="font-semibold text-emerald-300">What is the safest way to convert Bitcoin to US Dollars in 2025?</h3>
                <p className="text-slate-400 mt-1">The safest method is using a regulated, SOC-2 compliant centralized exchange like Coinbase, Kraken, or Gemini with hardware-based two-factor authentication (2FA) and direct ACH or FedNow bank withdrawal transfers.</p>
              </div>
              <div>
                <h3 className="font-semibold text-emerald-300">How are fiat-to-crypto exchange rates calculated?</h3>
                <p className="text-slate-400 mt-1">Fiat-to-crypto exchange rates are calculated by multiplying the real-time spot price of the cryptocurrency in US Dollars by the prevailing foreign exchange (forex) benchmark rate for the local fiat currency (such as USD/EUR, USD/GBP, or USD/INR).</p>
              </div>
              <div>
                <h3 className="font-semibold text-emerald-300">How can I avoid hidden brokerage markups when converting crypto to fiat?</h3>
                <p className="text-slate-400 mt-1">Avoid zero-fee retail brokers that quietly embed a 2% to 4% spread markup. Always compare quotes against independent live order book aggregates like CoinRates.live before approving the conversion.</p>
              </div>
              <div>
                <h3 className="font-semibold text-emerald-300">Is converting Bitcoin to US Dollars a taxable event?</h3>
                <p className="text-slate-400 mt-1">In most jurisdictions, including the United States (IRS) and the European Union, converting cryptocurrency to fiat currency is treated as a property disposal subject to capital gains tax based on your cost basis.</p>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* GUIDE 3: MARKET CAP VS VOLUME */}
      {page === 'guide-marketcap' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Market Analysis</span>
            <h1 className="text-3xl font-black text-white mt-1">Market Capitalization vs. 24h Trading Volume</h1>
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            In crypto investing, high market capitalization does not always guarantee safety. To evaluate true asset strength, investors must analyze the critical interplay between <strong>Market Cap</strong> and <strong>24-Hour Trading Volume</strong>.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">1. Market Capitalization: A Snapshot of Valuation</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Market capitalization is calculated simply by multiplying an asset's current unit price by its total circulating coin supply:
          </p>
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-amber-300 border border-slate-800 max-w-lg">
            Market Cap = Current Price × Circulating Supply
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Bitcoin (BTC) maintains a market cap exceeding $1.3 Trillion, representing broad institutional adoption and network security.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">2. 24-Hour Volume: The True Measure of Liquidity</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            An altcoin can technically boast a $100 Million market cap, but if its 24-hour trading volume is only $5,000, any moderately sized sell order will cause the price to crater. High trading volume ensures tight bid-ask spreads, low trade slippage, and immediate order execution.
          </p>
        </article>
      )}

      {/* GUIDE 4: ETH GAS */}
      {page === 'guide-gas' && (
        <article className="space-y-6 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Ethereum Blockchain &amp; Gas Fees</span>
            <h1 className="text-3xl font-black text-white mt-1">What is Gwei in Crypto? Current Ethereum Gas Prices &amp; Fee Guide</h1>
            <p className="text-xs text-slate-500 mt-1">Published by CoinRates.live Research • Updated November 2026</p>
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            Every transaction submitted to the Ethereum blockchain—whether sending ETH, minting an NFT, or swapping tokens on a decentralized exchange—requires computational energy. This computational cost is measured in <strong>gas</strong>, and gas prices are quoted in <strong>Gwei</strong>. Understanding how Gwei works is essential to tracking live Ethereum gas prices and saving money on transaction fees.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">1. What Does Gwei Mean in Crypto?</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong>Gwei</strong> (short for Giga-wei) is a fractional denomination of Ether (ETH), the native currency of Ethereum:
          </p>
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-purple-300 border border-slate-800 max-w-lg">
            1 Gwei = 0.000000001 ETH (10⁻⁹ ETH) = 1,000,000,000 Wei
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            The term Wei pays homage to Wei Dai, a foundational cryptographer whose work on 'b-money' predated Bitcoin. Because Ether is divisible to 18 decimal places, quoting network transaction fees in Gwei allows traders to work with manageable numbers (e.g., '18 Gwei' instead of '0.000000018 ETH').
          </p>

          <h2 className="text-xl font-bold text-white pt-2">2. What is Ethereum Gas and How Does It Work?</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            To prevent malicious spam and infinite computational loops, the Ethereum Virtual Machine (EVM) assigns an exact computational cost to every operation:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <h3 className="text-sm font-bold text-white">Gas Limit (Units of Work)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The maximum amount of computational work your transaction can consume. A simple ETH wallet transfer always requires exactly <strong>21,000 gas units</strong>. Smart contract executions—such as Uniswap swaps (120,000–180,000 gas) or NFT minting (200,000+ gas)—consume significantly more units.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <h3 className="text-sm font-bold text-white">Gas Price (Cost in Gwei)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The market price you are willing to pay per unit of gas, determined by real-time block congestion. When network demand is high, users bid higher Gwei to get their transactions included first.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-white pt-2">3. How EIP-1559 Calculates Gas Fees: Base Fee vs. Priority Tip</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Implemented during Ethereum's London Hard Fork, EIP-1559 overhauled the gas pricing model to make fees more predictable:
          </p>
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-purple-300 border border-slate-800 max-w-lg">
            Total Gas Fee = Gas Limit × (Base Fee + Priority Tip)
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            The <strong>Base Fee</strong> is set algorithmically by the Ethereum network and burned (permanently destroyed), making ETH deflationary during high activity. The <strong>Priority Tip</strong> is an optional incentive paid directly to validators to expedite inclusion during surges.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">4. Gwei to ETH and USD Conversion Table</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Estimated transaction costs across common gas price environments (calculated at an indicative ETH benchmark of $2,500 USD):
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse rounded-xl overflow-hidden border border-slate-800 bg-slate-900/40">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-white font-semibold">
                  <th className="p-3">Gas Rate (Gwei)</th>
                  <th className="p-3">Network Congestion</th>
                  <th className="p-3">ETH Transfer (21k Gas)</th>
                  <th className="p-3">Token Swap (150k Gas)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="p-3 font-bold text-emerald-400">10 Gwei</td>
                  <td className="p-3 text-slate-400">Low (Weekend / Off-Peak)</td>
                  <td className="p-3">~0.00021 ETH ($0.53 USD)</td>
                  <td className="p-3">~0.00150 ETH ($3.75 USD)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-400">20 Gwei</td>
                  <td className="p-3 text-slate-400">Standard (Normal Traffic)</td>
                  <td className="p-3">~0.00042 ETH ($1.05 USD)</td>
                  <td className="p-3">~0.00300 ETH ($7.50 USD)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-400">50 Gwei</td>
                  <td className="p-3 text-slate-400">Elevated (Market Volatility)</td>
                  <td className="p-3">~0.00105 ETH ($2.63 USD)</td>
                  <td className="p-3">~0.00750 ETH ($18.75 USD)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-rose-400">100+ Gwei</td>
                  <td className="p-3 text-slate-400">High (Surge / NFT Mint)</td>
                  <td className="p-3">~0.00210 ETH ($5.25 USD)</td>
                  <td className="p-3">~0.01500 ETH ($37.50 USD)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-white pt-2">5. How to Check Current Ethereum Gas Price &amp; Save Fees (Tips for Lower Gwei)</h2>
          <div className="space-y-2 text-xs sm:text-sm text-slate-400">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <span><strong>Transact During Off-Peak Hours:</strong> Ethereum gas is consistently lowest between 04:00 and 09:00 UTC and on Saturdays and Sundays when institutional and retail trading desks are closed.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <span><strong>Leverage Layer-2 Rollups:</strong> Protocols like <strong>Arbitrum, Optimism, Base, and zkSync</strong> bundle hundreds of off-chain transactions into a single cryptographic proof on Ethereum Layer-1, reducing your gas cost by up to 95% while inheriting Ethereum's full base security.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <span><strong>Set Custom Max Priority Fees:</strong> In wallets like MetaMask, customize your gas setting to avoid over-tipping validators during non-urgent transfers.</span>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <h3 className="font-semibold text-purple-300">What is Gwei in crypto?</h3>
                <p className="text-slate-400 mt-1">Gwei (short for Giga-wei) is a small denomination of Ether (ETH), where 1 Gwei equals 0.000000001 ETH (10⁻⁹ ETH). It is the standard unit used to measure Ethereum gas prices to keep transaction fee calculations human-readable.</p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-300">What does Gwei mean in US Dollars?</h3>
                <p className="text-slate-400 mt-1">The US Dollar value of Gwei depends on the current price of Ethereum. For example, at an ETH price of $2,500, 20 Gwei for a standard transfer of 21,000 gas units equals approximately $1.05 USD (0.00042 ETH).</p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-300">What is current Ethereum gas price and how is it calculated?</h3>
                <p className="text-slate-400 mt-1">Under Ethereum's EIP-1559 upgrade, the total gas fee equals Gas Units × (Base Fee + Priority Tip). The Base Fee automatically adjusts according to block demand and is burned, while the Priority Tip goes to network validators.</p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-300">When are Ethereum gas fees lowest?</h3>
                <p className="text-slate-400 mt-1">Ethereum gas fees are typically lowest during off-peak hours: on weekends (Saturdays and Sundays UTC) and between 04:00 and 09:00 UTC before North American and European financial markets open.</p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-300">How can I reduce high Ethereum gas fees?</h3>
                <p className="text-slate-400 mt-1">You can reduce gas fees by executing transactions during off-peak weekend hours, setting custom maximum priority tips in your Web3 wallet, or using Ethereum Layer-2 rollups like Arbitrum, Optimism, Base, and Polygon where gas fees are up to 95% cheaper.</p>
              </div>
            </div>
          </div>
        </article>
      )}

    </div>
  );
};
