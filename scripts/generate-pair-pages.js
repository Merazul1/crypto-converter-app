import { getGuidesData } from './guides-data.js';
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

// Dynamic conversion amounts matching real GSC search queries
function getConversionAmounts(pair) {
  if (pair.fromSym === 'SOL') {
    return [0.01, 0.04, 0.1, 0.5, 1, 2, 5, 10, 50, 100, 500];
  }
  if (pair.fromSym === 'DOGE' || pair.fromSym === 'SHIB' || pair.fromSym === 'PEPE') {
    return [1, 10, 50, 100, 250, 500, 1000, 5000, 10000];
  }
  if (pair.fromSym === 'BTC') {
    return [0.001, 0.005, 0.01, 0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10];
  }
  if (pair.fromSym === 'ETH') {
    return [0.01, 0.05, 0.1, 0.5, 1, 2, 3, 5, 10];
  }
  return [0.1, 0.5, 1, 2, 5, 10, 25, 50, 100];
}

// Reverse conversion amounts (Fiat or quote asset to base crypto)
function getReverseConversionAmounts(pair) {
  if (['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(pair.toSym)) {
    return [5, 10, 25, 50, 100, 250, 500, 1000, 5000];
  }
  if (pair.toSym === 'INR') {
    return [500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];
  }
  if (pair.toSym === 'BTC') {
    return [0.001, 0.005, 0.01, 0.05, 0.1, 0.25, 0.5, 1];
  }
  return [1, 5, 10, 25, 50, 100, 500];
}

// Format crypto amounts cleanly without unnecessary trailing decimals
function formatCryptoAmount(num) {
  if (num < 0.0001) return num.toFixed(8);
  if (num < 0.01) return num.toFixed(6);
  if (num < 1) return num.toFixed(4);
  if (Number.isInteger(num)) return num.toString();
  return num.toFixed(2);
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
const RELATED_GUIDES_HTML = `
        <div style="margin-top: 36px; padding: 20px; background: rgba(15, 23, 42, 0.6); border-radius: 12px; border: 1px solid #334155;">
          <h3 style="color: #f8fafc; font-size: 18px; margin-bottom: 12px;">Related Crypto Guides &amp; Research</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 2;">
            <li><a href="https://www.coinrates.live/guides/how-crypto-exchange-rates-work" style="color: #818cf8; font-weight: bold;">How Crypto Exchange Rates Are Determined: Order Books &amp; Bid-Ask Spreads</a></li>
            <li><a href="https://www.coinrates.live/guides/fiat-to-crypto-conversion-guide" style="color: #818cf8; font-weight: bold;">Safest Way to Convert Bitcoin to US Dollars &amp; Fiat Rates</a></li>
            <li><a href="https://www.coinrates.live/guides/crypto-market-cap-vs-volume" style="color: #818cf8; font-weight: bold;">Market Capitalization vs. 24h Trading Volume: What Smart Traders Watch</a></li>
            <li><a href="https://www.coinrates.live/guides/understanding-ethereum-gas-fees" style="color: #818cf8; font-weight: bold;">Understanding Ethereum Gas Fees (Gwei &amp; EIP-1559)</a></li>
            <li><a href="https://www.coinrates.live/guides/crypto-tax-guide-conversions" style="color: #818cf8; font-weight: bold;">Cryptocurrency Tax Guide: How Conversions &amp; Swaps Are Taxed</a></li>
            <li><a href="https://www.coinrates.live/guides/cex-vs-dex-exchange-comparison" style="color: #818cf8; font-weight: bold;">Centralized (CEX) vs. Decentralized (DEX) Exchanges: Security &amp; Slippage</a></li>
            <li><a href="https://www.coinrates.live/guides/understanding-stablecoins-pegs" style="color: #818cf8; font-weight: bold;">Understanding Stablecoins: Fiat-Backed vs. Algorithmic Peg Mechanics</a></li>
            <li><a href="https://www.coinrates.live/guides/crypto-transaction-fees-and-spreads" style="color: #818cf8; font-weight: bold;">Crypto Transaction Fees: Network Gas, Maker/Taker Fees &amp; Hidden Spreads</a></li>
          </ul>
        </div>
`;

const STATIC_EDITORIAL_PAGES = [
  {
    slug: 'about',
    isArticle: false,
    title: 'About CoinRates: Real-Time Crypto Converter & Rates',
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
    title: 'Contact CoinRates: Technical Support & Pair Inquiries',
    desc: 'Get in touch with the CoinRates.live team for technical support, partnership inquiries, currency feed questions, and fast customer assistance.',
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
    title: 'Terms of Service & Usage Agreement | CoinRates.live',
    desc: 'Read the Terms of Service for using CoinRates.live real-time cryptocurrency conversion, streaming price feeds, and free financial calculation tools.',
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
    title: 'Financial & Digital Asset Risk Disclaimer | CoinRates',
    desc: 'Financial and risk disclaimer for CoinRates.live. Learn about cryptocurrency market volatility, non-advisory calculations, and risk disclosures.',
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
          <li><a href="https://www.coinrates.live/guides/crypto-tax-guide-conversions" style="color: #818cf8; font-weight: bold;">Cryptocurrency Tax Guide: How Conversions & Swaps Are Taxed</a></li>
          <li><a href="https://www.coinrates.live/guides/cex-vs-dex-exchange-comparison" style="color: #818cf8; font-weight: bold;">Centralized (CEX) vs. Decentralized (DEX) Exchanges: Security & Slippage</a></li>
          <li><a href="https://www.coinrates.live/guides/understanding-stablecoins-pegs" style="color: #818cf8; font-weight: bold;">Understanding Stablecoins: Fiat-Backed vs. Algorithmic Peg Mechanics</a></li>
          <li><a href="https://www.coinrates.live/guides/crypto-transaction-fees-and-spreads" style="color: #818cf8; font-weight: bold;">Crypto Transaction Fees: Network Gas, Maker/Taker Fees & Hidden Spreads</a></li>
        </ul>
${SHARED_FOOTER}
      </article>
    `
  },
  ...getGuidesData(RELATED_GUIDES_HTML, SHARED_FOOTER)
];

function generatePages() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('Error: dist/index.html does not exist. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');
  const today = new Date().toISOString().split('T')[0];
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

    // Inject Article Schema and FAQPage Schema for guides
    if (page.isArticle) {
      const graph = [
        {
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
          "dateModified": "2026-11-10T00:00:00Z",
          "mainEntityOfPage": canonicalUrl
        }
      ];

      if (page.faqs && page.faqs.length > 0) {
        graph.push({
          "@type": "FAQPage",
          "mainEntity": page.faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        });
      }

      const schemaObj = {
        "@context": "https://schema.org",
        "@graph": graph
      };

      html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n</script>`);
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
    let pageTitle = `1 ${pair.fromSym} to ${pair.toSym}: Live ${pair.fromName} to ${pair.toName} Rate | CoinRates`;
    if (pageTitle.length > 60) {
      pageTitle = `1 ${pair.fromSym} to ${pair.toSym}: Live ${pair.fromSym}/${pair.toSym} Rate & Chart | CoinRates`;
    }
    
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

    const forwardAmounts = getConversionAmounts(pair);
    const reverseAmounts = getReverseConversionAmounts(pair);

    const forwardRowsHtml = forwardAmounts.map(amt => {
      const val = pair.rate * amt;
      return `<tr style="border-bottom: 1px solid #334155;"><td style="padding: 8px 12px;">${amt} ${pair.fromSym}</td><td style="padding: 8px 12px; color: #10b981; font-weight: 600;">${formatRate(val)} ${pair.toSym}</td></tr>`;
    }).join('\n');

    const reverseRowsHtml = reverseAmounts.map(fiatAmt => {
      const cryptoVal = fiatAmt / pair.rate;
      return `<tr style="border-bottom: 1px solid #334155;"><td style="padding: 8px 12px;">${fiatAmt.toLocaleString()} ${pair.toSym}</td><td style="padding: 8px 12px; color: #818cf8; font-weight: 600;">${formatCryptoAmount(cryptoVal)} ${pair.fromSym}</td></tr>`;
    }).join('\n');

    const pairFaqs = [
      {
        q: `What is 1 ${pair.fromName} (${pair.fromSym}) to ${pair.toName} (${pair.toSym}) today?`,
        a: `As of today, you can convert 1 ${pair.fromName} (${pair.fromSym}) to ${pair.toName} (${pair.toSym}) at real-time rates updated continuously every 25 seconds from live Binance and global forex order books. Current benchmark is approximately ${formatRate(pair.rate)} ${pair.toSym}.`
      },
      {
        q: `How do I convert ${pair.fromSym} to ${pair.toSym} without fees?`,
        a: `Simply enter your desired ${pair.fromSym} amount into our free live calculator card on CoinRates.live to see the net ${pair.toSym} conversion. There are zero transaction fees, no registration, and no KYC required.`
      },
      {
        q: `What is the 24-hour high and low for ${pair.fromSym}/${pair.toSym}?`,
        a: `The ${pair.fromSym} to ${pair.toSym} conversion rate fluctuates based on 24-hour global trading volume and order book depth. You can monitor intraday high, low, and candlestick volatility directly on our live interactive chart.`
      },
      {
        q: `Can I convert small fractions like 0.1 or 0.01 ${pair.fromSym} to ${pair.toSym}?`,
        a: `Yes, CoinRates.live supports fractional conversions down to 8 decimal places, allowing you to instantly calculate micro amounts such as 0.01, 0.04, 0.1, or 0.5 ${pair.fromSym} to ${pair.toSym}.`
      }
    ];

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
          "mainEntity": pairFaqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
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

        <!-- Instant Multi-Amount Quick Conversion Tables -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 28px;">
          <!-- Forward Table -->
          <section style="background: rgba(15, 23, 42, 0.6); padding: 20px; border-radius: 12px; border: 1px solid #334155;">
            <h2 style="color: #f8fafc; font-size: 18px; margin-bottom: 12px;">${pair.fromSym} to ${pair.toSym} Quick Conversion Table</h2>
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
              <thead>
                <tr style="border-bottom: 1px solid #475569; color: #94a3b8;">
                  <th style="padding: 8px 10px;">Amount (${pair.fromSym})</th>
                  <th style="padding: 8px 10px;">Value (${pair.toSym})</th>
                </tr>
              </thead>
              <tbody>
                ${forwardRowsHtml}
              </tbody>
            </table>
          </section>

          <!-- Reverse Table -->
          <section style="background: rgba(15, 23, 42, 0.6); padding: 20px; border-radius: 12px; border: 1px solid #334155;">
            <h2 style="color: #f8fafc; font-size: 18px; margin-bottom: 12px;">${pair.toSym} to ${pair.fromSym} Reverse Table</h2>
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
              <thead>
                <tr style="border-bottom: 1px solid #475569; color: #94a3b8;">
                  <th style="padding: 8px 10px;">Amount (${pair.toSym})</th>
                  <th style="padding: 8px 10px;">Value (${pair.fromSym})</th>
                </tr>
              </thead>
              <tbody>
                ${reverseRowsHtml}
              </tbody>
            </table>
          </section>
        </div>

        <!-- FAQ Section for Pair -->
        <section style="margin-top: 28px; background: rgba(15, 23, 42, 0.7); padding: 24px; border-radius: 12px; border: 1px solid #334155;">
          <h2 style="color: #f8fafc; font-size: 20px; margin-bottom: 16px;">Frequently Asked Questions About ${pair.fromSym} to ${pair.toSym}</h2>
          ${pairFaqs.map(f => `
            <div style="margin-bottom: 16px;">
              <h3 style="color: #818cf8; font-size: 15px; font-weight: bold; margin-bottom: 4px;">${f.q}</h3>
              <p style="font-size: 14px; margin: 0; color: #cbd5e1;">${f.a}</p>
            </div>
          `).join('')}
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
