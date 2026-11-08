import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const SITEMAP_PUBLIC_PATH = path.resolve(__dirname, '../public/sitemap.xml');
const SITEMAP_DIST_PATH = path.resolve(__dirname, '../dist/sitemap.xml');

// High-impact pairs with estimated baseline prices for pre-rendered tables
const PAIRS = [
  { fromSym: 'BTC', fromName: 'Bitcoin', toSym: 'USD', toName: 'US Dollar', rate: 68450, isCryptoToCrypto: false },
  { fromSym: 'ETH', fromName: 'Ethereum', toSym: 'USD', toName: 'US Dollar', rate: 2680, isCryptoToCrypto: false },
  { fromSym: 'SOL', fromName: 'Solana', toSym: 'USD', toName: 'US Dollar', rate: 182, isCryptoToCrypto: false },
  { fromSym: 'BNB', fromName: 'BNB', toSym: 'USD', toName: 'US Dollar', rate: 595, isCryptoToCrypto: false },
  { fromSym: 'XRP', fromName: 'XRP', toSym: 'USD', toName: 'US Dollar', rate: 0.54, isCryptoToCrypto: false },
  { fromSym: 'DOGE', fromName: 'Dogecoin', toSym: 'USD', toName: 'US Dollar', rate: 0.145, isCryptoToCrypto: false },
  { fromSym: 'ADA', fromName: 'Cardano', toSym: 'USD', toName: 'US Dollar', rate: 0.365, isCryptoToCrypto: false },
  { fromSym: 'AVAX', fromName: 'Avalanche', toSym: 'USD', toName: 'US Dollar', rate: 26.50, isCryptoToCrypto: false },
  { fromSym: 'SHIB', fromName: 'Shiba Inu', toSym: 'USD', toName: 'US Dollar', rate: 0.0000185, isCryptoToCrypto: false },
  { fromSym: 'PEPE', fromName: 'Pepe', toSym: 'USD', toName: 'US Dollar', rate: 0.0000098, isCryptoToCrypto: false },
  { fromSym: 'SUI', fromName: 'Sui', toSym: 'USD', toName: 'US Dollar', rate: 2.15, isCryptoToCrypto: false },
  { fromSym: 'LINK', fromName: 'Chainlink', toSym: 'USD', toName: 'US Dollar', rate: 11.80, isCryptoToCrypto: false },
  { fromSym: 'LTC', fromName: 'Litecoin', toSym: 'USD', toName: 'US Dollar', rate: 71.20, isCryptoToCrypto: false },
  { fromSym: 'TRX', fromName: 'TRON', toSym: 'USD', toName: 'US Dollar', rate: 0.165, isCryptoToCrypto: false },
  
  // Fiat Pairs: EUR, GBP, INR, CAD, AUD
  { fromSym: 'BTC', fromName: 'Bitcoin', toSym: 'EUR', toName: 'Euro', rate: 63200, isCryptoToCrypto: false },
  { fromSym: 'ETH', fromName: 'Ethereum', toSym: 'EUR', toName: 'Euro', rate: 2470, isCryptoToCrypto: false },
  { fromSym: 'SOL', fromName: 'Solana', toSym: 'EUR', toName: 'Euro', rate: 168, isCryptoToCrypto: false },
  { fromSym: 'BTC', fromName: 'Bitcoin', toSym: 'GBP', toName: 'British Pound', rate: 52800, isCryptoToCrypto: false },
  { fromSym: 'ETH', fromName: 'Ethereum', toSym: 'GBP', toName: 'British Pound', rate: 2060, isCryptoToCrypto: false },
  { fromSym: 'BTC', fromName: 'Bitcoin', toSym: 'INR', toName: 'Indian Rupee', rate: 5740000, isCryptoToCrypto: false },
  { fromSym: 'ETH', fromName: 'Ethereum', toSym: 'INR', toName: 'Indian Rupee', rate: 224000, isCryptoToCrypto: false },
  { fromSym: 'SOL', fromName: 'Solana', toSym: 'INR', toName: 'Indian Rupee', rate: 15200, isCryptoToCrypto: false },
  { fromSym: 'BTC', fromName: 'Bitcoin', toSym: 'CAD', toName: 'Canadian Dollar', rate: 94800, isCryptoToCrypto: false },
  { fromSym: 'BTC', fromName: 'Bitcoin', toSym: 'AUD', toName: 'Australian Dollar', rate: 104200, isCryptoToCrypto: false },
  
  // Crypto-to-Crypto
  { fromSym: 'ETH', fromName: 'Ethereum', toSym: 'BTC', toName: 'Bitcoin', rate: 0.039, isCryptoToCrypto: true },
];

// Helper to format rates safely
function formatRate(num) {
  if (num < 0.0001) return num.toFixed(8);
  if (num < 1) return num.toFixed(4);
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

// Generate HTML links string for all 25 pairs to eliminate orphan pages
const allPairsLinksHtml = PAIRS.map(p => {
  const pSlug = `${p.fromSym.toLowerCase()}-to-${p.toSym.toLowerCase()}`;
  return `<a href="https://www.coinrates.live/convert/${pSlug}" style="color: #818cf8; margin: 4px 8px; display: inline-block;">${p.fromSym} to ${p.toSym}</a>`;
}).join(' • ');

// Shared Sitewide Footer for Static and Editorial Pages
const SHARED_FOOTER = `
        <footer style="margin-top: 36px; padding-top: 20px; border-top: 1px solid #334155; font-size: 14px;">
          <a href="https://www.coinrates.live/" style="color: #818cf8; margin-right: 16px;">Home</a>
          <a href="https://www.coinrates.live/about" style="color: #818cf8; margin-right: 16px;">About Us</a>
          <a href="https://www.coinrates.live/contact" style="color: #818cf8; margin-right: 16px;">Contact</a>
          <a href="https://www.coinrates.live/privacy-policy" style="color: #818cf8; margin-right: 16px;">Privacy Policy</a>
          <a href="https://www.coinrates.live/terms" style="color: #818cf8; margin-right: 16px;">Terms of Service</a>
          <a href="https://www.coinrates.live/disclaimer" style="color: #818cf8; margin-right: 16px;">Disclaimer</a>
          <a href="https://www.coinrates.live/guides" style="color: #818cf8;">Crypto Guides</a>
        </footer>
`;

// Standalone Editorial & Trust Pages with Schema
const STATIC_EDITORIAL_PAGES = [
  {
    slug: 'about',
    isArticle: false,
    title: 'About CoinRates.live — Free Real-Time Cryptocurrency Converter',
    desc: 'Learn about CoinRates.live, our real-time market data methodology, zero-fee commitment, and independent crypto rate tracking platform.',
    content: `
      <article style="max-width: 860px; margin: 40px auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #cbd5e1;">
        <nav style="font-size: 13px; margin-bottom: 20px;"><a href="https://www.coinrates.live/" style="color: #818cf8;">← Back to Live Converter</a></nav>
        <h1 style="color: #f8fafc; font-size: 32px; margin-bottom: 16px;">About CoinRates.live</h1>
        <p style="font-size: 16px;"><strong>CoinRates.live</strong> is an independent, free, real-time cryptocurrency conversion and exchange rate platform. Our mission is to provide cryptocurrency traders, Web3 developers, global freelancers, and digital currency investors with instantaneous, accurate, and completely transparent financial conversion tools without mandatory registrations, paid subscriptions, or intrusive popups.</p>
        <h2 style="color: #f8fafc; font-size: 22px; margin-top: 28px;">Our Market Data Methodology</h2>
        <p>Unlike static calculators that cache prices once every few hours, CoinRates.live streams live market prices continuously from premier global liquidity order books (including Binance REST and WebSocket endpoints) and decentralized FX benchmarks. Prices refresh automatically every 25 seconds to capture volatile micro-swings across Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and over 50 global fiat currencies.</p>
        <h2 style="color: #f8fafc; font-size: 22px; margin-top: 28px;">Editorial & Integrity Standards</h2>
        <p>CoinRates.live does not provide financial or investment advice. All rates, calculations, sparkline charts, and market metrics are generated algorithmically for educational and informational utility. We maintain strict editorial independence and do not manipulate conversion rates for third-party sponsors.</p>
${SHARED_FOOTER}
      </article>
    `
  },
  {
    slug: 'contact',
    isArticle: false,
    title: 'Contact Us & Technical Support | CoinRates.live',
    desc: 'Get in touch with the CoinRates.live team for technical support, partnership inquiries, and feedback.',
    content: `
      <article style="max-width: 860px; margin: 40px auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #cbd5e1;">
        <nav style="font-size: 13px; margin-bottom: 20px;"><a href="https://www.coinrates.live/" style="color: #818cf8;">← Back to Live Converter</a></nav>
        <h1 style="color: #f8fafc; font-size: 32px; margin-bottom: 16px;">Contact Us</h1>
        <p style="font-size: 16px;">Have questions about our exchange rates, feature suggestions, API partnerships, or bug reports? The CoinRates.live team is here to help.</p>
        <h2 style="color: #f8fafc; font-size: 22px; margin-top: 28px;">Direct Email Inquiries</h2>
        <p>You can email our engineering and support inbox directly at: <a href="mailto:support@coinrates.live" style="color: #818cf8; font-weight: bold;">support@coinrates.live</a>. We typically respond within 24 business hours.</p>
        <h2 style="color: #f8fafc; font-size: 22px; margin-top: 28px;">Technical Support & Listing Inquiries</h2>
        <p>Notice an issue with a currency feed or want to request a new altcoin listing? Reach out directly with the pair name and exchange details.</p>
${SHARED_FOOTER}
      </article>
    `
  },
  {
    slug: 'privacy-policy',
    isArticle: false,
    title: 'Privacy Policy & Cookies Disclosure | CoinRates.live',
    desc: 'Our complete privacy policy detailing Google AdSense cookies, DAA WebChoices, log files, and GDPR compliance on CoinRates.live.',
    content: `
      <article style="max-width: 860px; margin: 40px auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #cbd5e1;">
        <nav style="font-size: 13px; margin-bottom: 20px;"><a href="https://www.coinrates.live/" style="color: #818cf8;">← Back to Live Converter</a></nav>
        <h1 style="color: #f8fafc; font-size: 32px; margin-bottom: 16px;">Privacy Policy</h1>
        <p>At <strong>CoinRates.live</strong>, accessible from https://www.coinrates.live, the privacy of our visitors is of paramount importance to us. This Privacy Policy outlines the types of personal information collected by CoinRates.live and how it is used.</p>
        <h2 style="color: #f8fafc; font-size: 22px; margin-top: 28px;">Cookies, Web Beacons & Google AdSense</h2>
        <p>Google, as a third-party vendor, uses cookies to serve ads on CoinRates.live. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to CoinRates.live and other sites across the internet. Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style="color: #818cf8;">Google Ads Settings</a> and the <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" style="color: #818cf8;">DAA WebChoices Tool</a>.</p>
        <h2 style="color: #f8fafc; font-size: 22px; margin-top: 28px;">Log Files & Analytics</h2>
        <p>Like many websites, CoinRates.live makes use of log files and privacy-focused analytics. The information inside log files includes IP addresses, browser types, Internet Service Providers (ISP), date/time stamps, and referring pages to analyze trends and optimize technical performance.</p>
${SHARED_FOOTER}
      </article>
    `
  },
  {
    slug: 'terms',
    isArticle: false,
    title: 'Terms of Service | CoinRates.live',
    desc: 'Read the Terms of Service for using CoinRates.live real-time cryptocurrency conversion and market data tools.',
    content: `
      <article style="max-width: 860px; margin: 40px auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #cbd5e1;">
        <nav style="font-size: 13px; margin-bottom: 20px;"><a href="https://www.coinrates.live/" style="color: #818cf8;">← Back to Live Converter</a></nav>
        <h1 style="color: #f8fafc; font-size: 32px; margin-bottom: 16px;">Terms of Service</h1>
        <p>Welcome to CoinRates.live. By accessing and using this website, you agree to comply with and be bound by these terms and conditions.</p>
        <h2 style="color: #f8fafc; font-size: 22px; margin-top: 28px;">Permitted Use</h2>
        <p>CoinRates.live provides real-time digital currency conversion for personal, educational, and non-commercial business reference. You may not scrape or overload our streaming endpoints without explicit written authorization.</p>
${SHARED_FOOTER}
      </article>
    `
  },
  {
    slug: 'disclaimer',
    isArticle: false,
    title: 'Financial & Risk Disclaimer | CoinRates.live',
    desc: 'Financial disclaimer for CoinRates.live. Learn about cryptocurrency market risks and non-advisory calculations.',
    content: `
      <article style="max-width: 860px; margin: 40px auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #cbd5e1;">
        <nav style="font-size: 13px; margin-bottom: 20px;"><a href="https://www.coinrates.live/" style="color: #818cf8;">← Back to Live Converter</a></nav>
        <h1 style="color: #f8fafc; font-size: 32px; margin-bottom: 16px;">Financial & Risk Disclaimer</h1>
        <p>Cryptocurrency trading and digital asset investments involve substantial risk of financial loss. Prices are highly volatile and can fluctuate dramatically within seconds. The content and conversion calculations provided on CoinRates.live are for informational and educational purposes only. Nothing on this website constitutes investment, financial, or legal advice.</p>
${SHARED_FOOTER}
      </article>
    `
  },
  {
    slug: 'guides',
    isArticle: false,
    title: 'Crypto Market Guides & Knowledge Base | CoinRates.live',
    desc: 'Explore comprehensive cryptocurrency guides explaining exchange rates, fiat conversions, market capitalization, and Ethereum gas fees.',
    content: `
      <article style="max-width: 860px; margin: 40px auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #cbd5e1;">
        <nav style="font-size: 13px; margin-bottom: 20px;"><a href="https://www.coinrates.live/" style="color: #818cf8;">← Back to Live Converter</a></nav>
        <h1 style="color: #f8fafc; font-size: 32px; margin-bottom: 16px;">Crypto Guides & Knowledge Base</h1>
        <p style="font-size: 16px;">In-depth, comprehensive educational guides on how cryptocurrency exchange rates work, fiat conversions, market cap dynamics, and exchange liquidity.</p>
        <ul style="margin-top: 24px; font-size: 16px; line-height: 2.2;">
          <li><a href="https://www.coinrates.live/guides/how-crypto-exchange-rates-work" style="color: #818cf8; font-weight: bold;">How Crypto Exchange Rates Are Determined: Order Books & Bid-Ask Spreads</a></li>
          <li><a href="https://www.coinrates.live/guides/fiat-to-crypto-conversion-guide" style="color: #818cf8; font-weight: bold;">The Complete Guide to Fiat-to-Crypto Exchange Rates & Banking Rails</a></li>
          <li><a href="https://www.coinrates.live/guides/crypto-market-cap-vs-volume" style="color: #818cf8; font-weight: bold;">Market Capitalization vs. 24h Trading Volume: What Smart Traders Watch</a></li>
          <li><a href="https://www.coinrates.live/guides/understanding-ethereum-gas-fees" style="color: #818cf8; font-weight: bold;">Understanding Ethereum Gas Fees (Gwei & EIP-1559)</a></li>
        </ul>
${SHARED_FOOTER}
      </article>
    `
  },
  {
    slug: 'guides/how-crypto-exchange-rates-work',
    isArticle: true,
    title: 'How Crypto Exchange Rates Are Determined | CoinRates.live',
    desc: 'Understand how order book depth, bid-ask spreads, and market arbitrage determine real-time cryptocurrency exchange rates.',
    content: `
      <article style="max-width: 860px; margin: 40px auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #cbd5e1;">
        <nav style="font-size: 13px; margin-bottom: 20px;"><a href="https://www.coinrates.live/guides" style="color: #818cf8;">← Back to Guides</a> | <a href="https://www.coinrates.live/" style="color: #818cf8;">Live Converter</a></nav>
        <h1 style="color: #f8fafc; font-size: 32px; margin-bottom: 16px;">How Crypto Exchange Rates Are Determined</h1>
        <p style="font-size: 16px;">Unlike fiat currencies managed by central banks, cryptocurrency exchange rates are governed purely by decentralized market forces: supply and demand across global liquidity order books.</p>
        <h2 style="color: #f8fafc; font-size: 22px; margin-top: 28px;">1. Order Books & The Bid-Ask Spread</h2>
        <p>On centralized cryptocurrency exchanges like Binance, Coinbase, and Kraken, market participants place limit orders. Bids represent buyers' desired prices, while Asks represent sellers' minimum acceptable prices. The midpoint between the highest bid and lowest ask constitutes the live market spot rate.</p>
        <h2 style="color: #f8fafc; font-size: 22px; margin-top: 28px;">2. Cross-Exchange Arbitrage</h2>
        <p>Because cryptocurrency trades globally 24 hours a day across hundreds of independent exchanges, prices can momentarily diverge. Automated trading bots exploit these micro-differences through arbitrage, swiftly pulling global prices back into equilibrium.</p>
        <h2 style="color: #f8fafc; font-size: 22px; margin-top: 28px;">3. How CoinRates.live Aggregates Benchmark Prices</h2>
        <p>CoinRates.live connects directly to high-volume order book tickers, filtering out illiquid anomalies to deliver an accurate consolidated rate. This ensures your calculations reflect true global clearing value.</p>
        <div style="margin-top: 36px; padding: 20px; background: rgba(15, 23, 42, 0.6); border-radius: 12px; border: 1px solid #334155;">
          <h3 style="color: #f8fafc; font-size: 18px; margin-bottom: 10px;">Related Guides & Resources</h3>
          <p style="font-size: 14px; line-height: 1.8;">
            • <a href="https://www.coinrates.live/guides/fiat-to-crypto-conversion-guide" style="color: #818cf8;">The Complete Guide to Fiat-to-Crypto Exchange Rates</a><br/>
            • <a href="https://www.coinrates.live/guides/crypto-market-cap-vs-volume" style="color: #818cf8;">Market Capitalization vs. 24h Trading Volume</a><br/>
            • <a href="https://www.coinrates.live/guides/understanding-ethereum-gas-fees" style="color: #818cf8;">Understanding Ethereum Gas Fees (Gwei)</a>
          </p>
        </div>
${SHARED_FOOTER}
      </article>
    `
  },
  {
    slug: 'guides/fiat-to-crypto-conversion-guide',
    isArticle: true,
    title: 'Guide to Fiat-to-Crypto Exchange Rates | CoinRates.live',
    desc: 'A complete breakdown of how fiat-to-crypto exchange rates are calculated across USD, EUR, GBP, and INR without hidden fees.',
    content: `
      <article style="max-width: 860px; margin: 40px auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #cbd5e1;">
        <nav style="font-size: 13px; margin-bottom: 20px;"><a href="https://www.coinrates.live/guides" style="color: #818cf8;">← Back to Guides</a> | <a href="https://www.coinrates.live/" style="color: #818cf8;">Live Converter</a></nav>
        <h1 style="color: #f8fafc; font-size: 32px; margin-bottom: 16px;">The Complete Guide to Fiat-to-Crypto Exchange Rates</h1>
        <p style="font-size: 16px;">Converting fiat currency (government-issued cash like USD, EUR, GBP, INR, JPY) into cryptocurrency is the foundational gateway to Web3 and decentralized finance.</p>
        <h2 style="color: #f8fafc; font-size: 22px; margin-top: 28px;">1. Foreign Exchange Benchmarks</h2>
        <p>Cryptocurrency assets are primarily paired against the US Dollar (USD) or USD-pegged stablecoins (USDT, USDC). When converting a local fiat currency like Euro or Indian Rupee into Bitcoin, the calculation involves two simultaneous exchange rate benchmarks: the crypto spot rate in USD, and the USD to local fiat forex benchmark.</p>
        <h2 style="color: #f8fafc; font-size: 22px; margin-top: 28px;">2. Avoiding Hidden Brokerage Markups</h2>
        <p>Many credit card on-ramps advertise 'zero commission' while quietly embedding a 2% to 4% markup inside an artificial exchange rate. Always use an independent rate checker like CoinRates.live to verify fair market spot prices before executing a trade.</p>
        <div style="margin-top: 36px; padding: 20px; background: rgba(15, 23, 42, 0.6); border-radius: 12px; border: 1px solid #334155;">
          <h3 style="color: #f8fafc; font-size: 18px; margin-bottom: 10px;">Related Guides & Resources</h3>
          <p style="font-size: 14px; line-height: 1.8;">
            • <a href="https://www.coinrates.live/guides/how-crypto-exchange-rates-work" style="color: #818cf8;">How Crypto Exchange Rates Are Determined</a><br/>
            • <a href="https://www.coinrates.live/guides/crypto-market-cap-vs-volume" style="color: #818cf8;">Market Capitalization vs. 24h Trading Volume</a><br/>
            • <a href="https://www.coinrates.live/guides/understanding-ethereum-gas-fees" style="color: #818cf8;">Understanding Ethereum Gas Fees (Gwei)</a>
          </p>
        </div>
${SHARED_FOOTER}
      </article>
    `
  },
  {
    slug: 'guides/crypto-market-cap-vs-volume',
    isArticle: true,
    title: 'Market Cap vs. 24h Trading Volume | CoinRates.live',
    desc: 'Why market capitalization alone can be misleading without evaluating 24-hour liquidity and exchange volume.',
    content: `
      <article style="max-width: 860px; margin: 40px auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #cbd5e1;">
        <nav style="font-size: 13px; margin-bottom: 20px;"><a href="https://www.coinrates.live/guides" style="color: #818cf8;">← Back to Guides</a> | <a href="https://www.coinrates.live/" style="color: #818cf8;">Live Converter</a></nav>
        <h1 style="color: #f8fafc; font-size: 32px; margin-bottom: 16px;">Market Capitalization vs. 24h Trading Volume</h1>
        <p style="font-size: 16px;">In crypto investing, high market capitalization does not always guarantee safety. To evaluate true asset strength, investors must analyze the critical interplay between Market Cap and 24-Hour Trading Volume.</p>
        <h2 style="color: #f8fafc; font-size: 22px; margin-top: 28px;">1. Market Cap: A Snapshot of Valuation</h2>
        <p>Market capitalization is calculated by multiplying an asset's current unit price by its total circulating coin supply. Bitcoin maintains a market cap exceeding $1.3 Trillion, reflecting broad institutional adoption.</p>
        <h2 style="color: #f8fafc; font-size: 22px; margin-top: 28px;">2. 24-Hour Volume: The True Measure of Liquidity</h2>
        <p>An altcoin can boast a $100 Million market cap, but if its 24-hour trading volume is only $5,000, any moderate sell order will cause the price to crater. High trading volume ensures tight bid-ask spreads and low trade slippage.</p>
        <div style="margin-top: 36px; padding: 20px; background: rgba(15, 23, 42, 0.6); border-radius: 12px; border: 1px solid #334155;">
          <h3 style="color: #f8fafc; font-size: 18px; margin-bottom: 10px;">Related Guides & Resources</h3>
          <p style="font-size: 14px; line-height: 1.8;">
            • <a href="https://www.coinrates.live/guides/how-crypto-exchange-rates-work" style="color: #818cf8;">How Crypto Exchange Rates Are Determined</a><br/>
            • <a href="https://www.coinrates.live/guides/fiat-to-crypto-conversion-guide" style="color: #818cf8;">The Complete Guide to Fiat-to-Crypto Exchange Rates</a><br/>
            • <a href="https://www.coinrates.live/guides/understanding-ethereum-gas-fees" style="color: #818cf8;">Understanding Ethereum Gas Fees (Gwei)</a>
          </p>
        </div>
${SHARED_FOOTER}
      </article>
    `
  },
  {
    slug: 'guides/understanding-ethereum-gas-fees',
    isArticle: true,
    title: 'Understanding Ethereum Gas Fees (Gwei & EIP-1559) | CoinRates.live',
    desc: 'Learn how Ethereum network gas fees are calculated in Gwei, how EIP-1559 burns base fees, and how to save money on transaction fees.',
    content: `
      <article style="max-width: 860px; margin: 40px auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #cbd5e1;">
        <nav style="font-size: 13px; margin-bottom: 20px;"><a href="https://www.coinrates.live/guides" style="color: #818cf8;">← Back to Guides</a> | <a href="https://www.coinrates.live/" style="color: #818cf8;">Live Converter</a></nav>
        <h1 style="color: #f8fafc; font-size: 32px; margin-bottom: 16px;">Understanding Ethereum Gas Fees (Gwei & EIP-1559)</h1>
        <p style="font-size: 16px;">Every transaction executed on the Ethereum blockchain requires computational fuel called gas. Learn how to track and optimize gas costs before sending transactions.</p>
        <h2 style="color: #f8fafc; font-size: 22px; margin-top: 28px;">1. What is Gwei?</h2>
        <p>Gwei is a denomination of Ether (ETH), where 1 Gwei equals 0.000000001 ETH (10⁻⁹ ETH). Gas fees are priced in Gwei to keep micro-calculations readable instead of dealing with ten decimal places.</p>
        <h2 style="color: #f8fafc; font-size: 22px; margin-top: 28px;">2. How EIP-1559 Works</h2>
        <p>Under Ethereum's EIP-1559 upgrade, gas fees consist of a mandatory Base Fee (which is burned by the protocol) and an optional Priority Tip paid to block validators during periods of heavy on-chain congestion.</p>
        <div style="margin-top: 36px; padding: 20px; background: rgba(15, 23, 42, 0.6); border-radius: 12px; border: 1px solid #334155;">
          <h3 style="color: #f8fafc; font-size: 18px; margin-bottom: 10px;">Related Guides & Resources</h3>
          <p style="font-size: 14px; line-height: 1.8;">
            • <a href="https://www.coinrates.live/guides/how-crypto-exchange-rates-work" style="color: #818cf8;">How Crypto Exchange Rates Are Determined</a><br/>
            • <a href="https://www.coinrates.live/guides/fiat-to-crypto-conversion-guide" style="color: #818cf8;">The Complete Guide to Fiat-to-Crypto Exchange Rates</a><br/>
            • <a href="https://www.coinrates.live/guides/crypto-market-cap-vs-volume" style="color: #818cf8;">Market Capitalization vs. 24h Trading Volume</a>
          </p>
        </div>
${SHARED_FOOTER}
      </article>
    `
  }
];

function generatePages() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('Error: dist/index.html does not exist. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');
  const today = '2026-11-09';
  const sitemapUrls = [
    `  <url>
    <loc>https://www.coinrates.live/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`
  ];

  // 1. Generate Static Editorial & Trust Pages (About, Contact, Privacy, Terms, Disclaimer, Guides)
  for (const page of STATIC_EDITORIAL_PAGES) {
    const canonicalUrl = `https://www.coinrates.live/${page.slug}`;
    let html = baseHtml;

    html = html.replace(/<title>.*?<\/title>/i, `<title>${page.title}</title>`);
    html = html.replace(/<meta name="title" content=".*?" \/>/i, `<meta name="title" content="${page.title}" />`);
    html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${page.desc}" />`);
    html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
    html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
    html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${page.title}" />`);
    html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${page.desc}" />`);
    html = html.replace(/<meta property="twitter:url" content=".*?" \/>/i, `<meta property="twitter:url" content="${canonicalUrl}" />`);
    html = html.replace(/<meta property="twitter:title" content=".*?" \/>/i, `<meta property="twitter:title" content="${page.title}" />`);
    html = html.replace(/<meta property="twitter:description" content=".*?" \/>/i, `<meta property="twitter:description" content="${page.desc}" />`);

    // Inject Article Schema for guides
    if (page.isArticle) {
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": page.title,
        "description": page.desc,
        "image": "https://www.coinrates.live/producthunt-gallery-1.png",
        "author": {
          "@type": "Organization",
          "name": "CoinRates.live",
          "url": "https://www.coinrates.live/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "CoinRates.live",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.coinrates.live/producthunt-gallery-1.png"
          }
        },
        "datePublished": "2026-11-06T00:00:00Z",
        "dateModified": "2026-11-09T00:00:00Z",
        "mainEntityOfPage": canonicalUrl
      };
      html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script type="application/ld+json">\n${JSON.stringify(articleSchema, null, 2)}\n</script>`);
    }

    html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${page.content}</div>`);

    const pageDir = path.join(DIST_DIR, page.slug);
    fs.mkdirSync(pageDir, { recursive: true });
    fs.writeFileSync(path.join(pageDir, 'index.html'), html, 'utf-8');

    // Add alias for privacy -> privacy-policy
    if (page.slug === 'privacy-policy') {
      const aliasDir = path.join(DIST_DIR, 'privacy');
      fs.mkdirSync(aliasDir, { recursive: true });
      fs.writeFileSync(path.join(aliasDir, 'index.html'), html, 'utf-8');
    }

    sitemapUrls.push(`  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  // 2. Generate Dedicated Conversion Pair Pages
  for (const pair of PAIRS) {
    const slug = `${pair.fromSym.toLowerCase()}-to-${pair.toSym.toLowerCase()}`;
    const canonicalUrl = `https://www.coinrates.live/convert/${slug}`;
    const pageTitle = `1 ${pair.fromSym} to ${pair.toSym}: Live ${pair.fromName} to ${pair.toName} Rate | CoinRates`;
    
    // Kept under 150 chars to prevent "Meta description too long"
    const metaDesc = `Convert 1 ${pair.fromName} (${pair.fromSym}) to ${pair.toName} (${pair.toSym}) at live crypto rates. Real-time chart, zero fees, and calculator on CoinRates.live.`;

    let html = baseHtml;

    html = html.replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`);
    html = html.replace(/<meta name="title" content=".*?" \/>/i, `<meta name="title" content="${pageTitle}" />`);
    html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${metaDesc}" />`);
    html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
    html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
    html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${pageTitle}" />`);
    html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${metaDesc}" />`);
    html = html.replace(/<meta property="twitter:url" content=".*?" \/>/i, `<meta property="twitter:url" content="${canonicalUrl}" />`);
    html = html.replace(/<meta property="twitter:title" content=".*?" \/>/i, `<meta property="twitter:title" content="${pageTitle}" />`);
    html = html.replace(/<meta property="twitter:description" content=".*?" \/>/i, `<meta property="twitter:description" content="${metaDesc}" />`);

    const pairSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.coinrates.live/" },
            { "@type": "ListItem", "position": 2, "name": "Convert", "item": "https://www.coinrates.live/#converter" },
            { "@type": "ListItem", "position": 3, "name": `${pair.fromSym} to ${pair.toSym}`, "item": canonicalUrl }
          ]
        },
        {
          "@type": "WebApplication",
          "name": `CoinRates 1 ${pair.fromSym} to ${pair.toSym} Converter`,
          "url": canonicalUrl,
          "description": metaDesc,
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": `How much is 1 ${pair.fromName} (${pair.fromSym}) in ${pair.toName} (${pair.toSym})?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `As of today, 1 ${pair.fromName} (${pair.fromSym}) is approximately ${formatRate(pair.rate)} ${pair.toSym}. Rates update continuously on CoinRates.live every 25 seconds directly from Binance market order books.`
              }
            },
            {
              "@type": "Question",
              "name": `How do I convert ${pair.fromSym} to ${pair.toSym} with 0% fees?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `Simply enter your desired ${pair.fromSym} quantity into the CoinRates.live converter card to see the exact net ${pair.toSym} value. No registration, sign-up, or hidden charges.`
              }
            },
            {
              "@type": "Question",
              "name": `Where do live ${pair.fromSym} to ${pair.toSym} exchange rates come from?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `Rates stream directly from Binance's public REST ticker feed and global fiat currency benchmarks.`
              }
            }
          ]
        }
      ]
    };

    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script type="application/ld+json">\n${JSON.stringify(pairSchema, null, 2)}\n</script>`);

    const preRenderedContent = `
      <main style="max-width: 960px; margin: 40px auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #cbd5e1;">
        <nav style="font-size: 13px; margin-bottom: 20px; color: #94a3b8;">
          <a href="https://www.coinrates.live/" style="color: #818cf8; text-decoration: none;">Home</a> &gt; 
          <a href="https://www.coinrates.live/#converter" style="color: #818cf8; text-decoration: none;">Crypto Converter</a> &gt; 
          <span style="color: #e2e8f0;">${pair.fromSym} to ${pair.toSym}</span>
        </nav>

        <header>
          <h1 style="color: #f8fafc; font-size: 28px; margin-bottom: 12px;">1 ${pair.fromSym} to ${pair.toSym} - Live ${pair.fromName} to ${pair.toName} Exchange Rate</h1>
          <p style="font-size: 16px;">
            The current real-time exchange rate for <strong>1 ${pair.fromName} (${pair.fromSym})</strong> is approximately <strong style="color: #38bdf8;">${formatRate(pair.rate)} ${pair.toSym}</strong>. Convert between ${pair.fromName} and ${pair.toName} instantly with zero transaction fees, real-time interactive charts, and live order book tracking on <a href="https://www.coinrates.live/" style="color: #818cf8;">CoinRates.live</a>.
          </p>
        </header>

        <section style="margin-top: 28px; background: rgba(15, 23, 42, 0.6); padding: 20px; border-radius: 12px; border: 1px solid #334155;">
          <h2 style="color: #f8fafc; font-size: 20px; margin-bottom: 12px;">${pair.fromSym} to ${pair.toSym} Quick Conversion Table</h2>
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 14px;">
            <thead>
              <tr style="border-bottom: 1px solid #475569; color: #94a3b8;">
                <th style="padding: 8px 12px;">Amount (${pair.fromSym})</th>
                <th style="padding: 8px 12px;">Converted Value (${pair.toSym})</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #334155;"><td style="padding: 8px 12px;">1 ${pair.fromSym}</td><td style="padding: 8px 12px; color: #10b981; font-weight: 600;">${formatRate(pair.rate * 1)} ${pair.toSym}</td></tr>
              <tr style="border-bottom: 1px solid #334155;"><td style="padding: 8px 12px;">5 ${pair.fromSym}</td><td style="padding: 8px 12px; color: #10b981; font-weight: 600;">${formatRate(pair.rate * 5)} ${pair.toSym}</td></tr>
              <tr style="border-bottom: 1px solid #334155;"><td style="padding: 8px 12px;">10 ${pair.fromSym}</td><td style="padding: 8px 12px; color: #10b981; font-weight: 600;">${formatRate(pair.rate * 10)} ${pair.toSym}</td></tr>
              <tr style="border-bottom: 1px solid #334155;"><td style="padding: 8px 12px;">25 ${pair.fromSym}</td><td style="padding: 8px 12px; color: #10b981; font-weight: 600;">${formatRate(pair.rate * 25)} ${pair.toSym}</td></tr>
              <tr style="border-bottom: 1px solid #334155;"><td style="padding: 8px 12px;">50 ${pair.fromSym}</td><td style="padding: 8px 12px; color: #10b981; font-weight: 600;">${formatRate(pair.rate * 50)} ${pair.toSym}</td></tr>
              <tr><td style="padding: 8px 12px;">100 ${pair.fromSym}</td><td style="padding: 8px 12px; color: #10b981; font-weight: 600;">${formatRate(pair.rate * 100)} ${pair.toSym}</td></tr>
            </tbody>
          </table>
        </section>

        <section style="margin-top: 28px;">
          <h2 style="color: #f8fafc; font-size: 20px;">Why Use CoinRates for ${pair.fromSym} to ${pair.toSym} Conversions?</h2>
          <p>
            CoinRates.live fetches streaming liquidity directly from leading exchanges like <a href="https://www.binance.com" target="_blank" rel="noopener noreferrer" style="color: #818cf8;">Binance</a>. Whether you need fast BTC to USD conversion, exchange rate tracking for crypto, or historical 24h market analysis, our platform delivers sub-second calculations without user registration or intrusive ads.
          </p>
        </section>

        <!-- Internal Links: All Supported Pairs (Eliminates Orphan Pages) -->
        <section style="margin-top: 32px; padding: 20px; background: rgba(15, 23, 42, 0.4); border-radius: 12px; border: 1px solid #1e293b;">
          <h2 style="color: #f8fafc; font-size: 16px; margin-bottom: 12px;">All Supported Currency Pairs</h2>
          <p style="font-size: 13px; line-height: 2;">
            ${allPairsLinksHtml}
          </p>
        </section>

        <footer style="margin-top: 32px; border-top: 1px solid #334155; padding-top: 16px; font-size: 13px;">
          <a href="https://www.coinrates.live/" style="color: #818cf8; margin-right: 14px;">Home</a>
          <a href="https://www.coinrates.live/about" style="color: #818cf8; margin-right: 14px;">About</a>
          <a href="https://www.coinrates.live/contact" style="color: #818cf8; margin-right: 14px;">Contact</a>
          <a href="https://www.coinrates.live/privacy-policy" style="color: #818cf8; margin-right: 14px;">Privacy Policy</a>
          <a href="https://www.coinrates.live/terms" style="color: #818cf8; margin-right: 14px;">Terms</a>
          <a href="https://www.coinrates.live/disclaimer" style="color: #818cf8; margin-right: 14px;">Disclaimer</a>
          <a href="https://www.coinrates.live/guides" style="color: #818cf8;">Guides</a>
        </footer>
      </main>
    `;

    html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${preRenderedContent}</div>`);

    const pairDir = path.join(DIST_DIR, 'convert', slug);
    fs.mkdirSync(pairDir, { recursive: true });
    fs.writeFileSync(path.join(pairDir, 'index.html'), html, 'utf-8');

    const directDir = path.join(DIST_DIR, slug);
    fs.mkdirSync(directDir, { recursive: true });
    fs.writeFileSync(path.join(directDir, 'index.html'), html, 'utf-8');

    sitemapUrls.push(`  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`);
  }

  // 3. Generate Complete Sitemap
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join('\n')}
</urlset>`;

  fs.writeFileSync(SITEMAP_PUBLIC_PATH, sitemapXml, 'utf-8');
  fs.writeFileSync(SITEMAP_DIST_PATH, sitemapXml, 'utf-8');

  console.log(`Successfully generated ${STATIC_EDITORIAL_PAGES.length} editorial pages and ${PAIRS.length} dedicated pair pages!`);
  console.log(`Updated sitemap.xml with ${sitemapUrls.length} total canonical URLs.`);
}

generatePages();
