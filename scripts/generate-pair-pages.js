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

function formatRate(num) {
  if (num < 0.0001) return num.toFixed(8);
  if (num < 1) return num.toFixed(4);
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function generatePairPages() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('Error: dist/index.html does not exist. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');
  const today = '2026-11-02';
  const sitemapUrls = [
    `  <url>
    <loc>https://www.coinrates.live/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`
  ];

  for (const pair of PAIRS) {
    const slug = `${pair.fromSym.toLowerCase()}-to-${pair.toSym.toLowerCase()}`;
    const canonicalUrl = `https://www.coinrates.live/convert/${slug}`;
    const pageTitle = `1 ${pair.fromSym} to ${pair.toSym}: Live ${pair.fromName} to ${pair.toName} Rate | CoinRates`;
    const metaDesc = `Convert 1 ${pair.fromName} (${pair.fromSym}) to ${pair.toName} (${pair.toSym}) at live fiat-to-crypto exchange rates. Real-time chart, zero fees, and conversion calculator on CoinRates.live.`;

    let html = baseHtml;

    // 1. Replace Title & Meta Description
    html = html.replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`);
    html = html.replace(/<meta name="title" content=".*?" \/>/i, `<meta name="title" content="${pageTitle}" />`);
    html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${metaDesc}" />`);
    html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

    // 2. Open Graph & Twitter
    html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
    html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${pageTitle}" />`);
    html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${metaDesc}" />`);
    html = html.replace(/<meta property="twitter:url" content=".*?" \/>/i, `<meta property="twitter:url" content="${canonicalUrl}" />`);
    html = html.replace(/<meta property="twitter:title" content=".*?" \/>/i, `<meta property="twitter:title" content="${pageTitle}" />`);
    html = html.replace(/<meta property="twitter:description" content=".*?" \/>/i, `<meta property="twitter:description" content="${metaDesc}" />`);

    // 3. Pre-rendered JSON-LD schema for pair
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

    // 4. Pre-rendered HTML inside <div id="root">
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

        <footer style="margin-top: 32px; border-top: 1px solid #334155; padding-top: 16px;">
          <p style="font-size: 13px; color: #94a3b8;">
            Popular Pairs: 
            <a href="https://www.coinrates.live/convert/btc-to-usd" style="color: #818cf8; margin: 0 4px;">BTC to USD</a> |
            <a href="https://www.coinrates.live/convert/eth-to-usd" style="color: #818cf8; margin: 0 4px;">ETH to USD</a> |
            <a href="https://www.coinrates.live/convert/sol-to-usd" style="color: #818cf8; margin: 0 4px;">SOL to USD</a> |
            <a href="https://www.coinrates.live/convert/doge-to-usd" style="color: #818cf8; margin: 0 4px;">DOGE to USD</a> |
            <a href="https://www.coinrates.live/convert/btc-to-inr" style="color: #818cf8; margin: 0 4px;">BTC to INR</a>
          </p>
        </footer>
      </main>
    `;

    html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${preRenderedContent}</div>`);

    // 5. Output file to dist/convert/[slug]/index.html
    const pairDir = path.join(DIST_DIR, 'convert', slug);
    fs.mkdirSync(pairDir, { recursive: true });
    fs.writeFileSync(path.join(pairDir, 'index.html'), html, 'utf-8');

    // Also output to dist/[slug]/index.html for root path alias
    const directDir = path.join(DIST_DIR, slug);
    fs.mkdirSync(directDir, { recursive: true });
    fs.writeFileSync(path.join(directDir, 'index.html'), html, 'utf-8');

    // Add to sitemap
    sitemapUrls.push(`  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`);
  }

  // 6. Generate Complete Sitemap
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join('\n')}
</urlset>`;

  fs.writeFileSync(SITEMAP_PUBLIC_PATH, sitemapXml, 'utf-8');
  fs.writeFileSync(SITEMAP_DIST_PATH, sitemapXml, 'utf-8');

  console.log(`Successfully generated ${PAIRS.length} dedicated pair pages!`);
  console.log(`Updated sitemap.xml with ${sitemapUrls.length} total canonical URLs.`);
}

generatePairPages();
