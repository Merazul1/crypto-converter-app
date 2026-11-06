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
              <h2 className="text-lg font-bold text-white">The Complete Guide to Fiat-to-Crypto Exchange Rates</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Understand how government currencies (USD, EUR, GBP, INR) are priced against crypto assets, banking settlement rails, and how to avoid hidden fees.
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
              <h2 className="text-lg font-bold text-white">Understanding Ethereum Gas Fees (Gwei & EIP-1559)</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                A breakdown of base fees, priority tips, block congestion, and how to execute on-chain token swaps during low gas periods to save money.
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
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Currency Conversion</span>
            <h1 className="text-3xl font-black text-white mt-1">The Complete Guide to Fiat-to-Crypto Exchange Rates</h1>
            <p className="text-xs text-slate-500 mt-1">Published by CoinRates.live Research</p>
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            Converting fiat currency (government-issued cash like USD, EUR, GBP, INR, JPY) into cryptocurrency is the foundational gateway to Web3 and decentralized finance.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">1. Understanding the Foreign Exchange Benchmark</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Cryptocurrency assets are primarily paired against the US Dollar (USD) or USD-pegged stablecoins (USDT, USDC). When converting a local fiat currency like Euro or Indian Rupee into Bitcoin, the calculation involves two simultaneous exchange rate benchmarks:
          </p>
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 border border-slate-800 max-w-lg">
            Local Rate = (Crypto Price in USD) × (USD to Local Fiat FX Rate)
          </div>

          <h2 className="text-xl font-bold text-white pt-2">2. How to Avoid Hidden Exchange Markup Fees</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Many credit card on-ramps and payment processors advertise "0% commission" while quietly embedding a 2% to 4% markup inside an artificial exchange rate. Always use an independent rate checker like <strong>CoinRates.live</strong> to compare the real market spot price against what a broker quotes you before executing a trade.
          </p>
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
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Ethereum Blockchain</span>
            <h1 className="text-3xl font-black text-white mt-1">Understanding Ethereum Gas Fees (Gwei & EIP-1559)</h1>
          </div>

          <p className="text-base text-slate-300 leading-relaxed">
            Every transaction executed on the Ethereum blockchain—whether sending ETH, minting an NFT, or swapping tokens on Uniswap—requires computational fuel called <strong>gas</strong>.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">1. What is Gwei?</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Gwei is a denomination of Ether (ETH), where 1 Gwei equals 0.000000001 ETH (10⁻⁹ ETH). Gas fees are priced in Gwei to keep micro-calculations readable instead of dealing with ten decimal places.
          </p>

          <h2 className="text-xl font-bold text-white pt-2">2. How EIP-1559 Works</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Under Ethereum's EIP-1559 upgrade, gas fees consist of a mandatory <strong>Base Fee</strong> (which is automatically burned by the protocol) and an optional <strong>Priority Tip</strong> paid to block validators to incentivize faster inclusion during periods of heavy on-chain congestion.
          </p>
        </article>
      )}

    </div>
  );
};
