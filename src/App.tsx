import React, { useState, useEffect, useCallback } from 'react';
import { Currency, GasFeeInfo } from './types/crypto';
import { INITIAL_CURRENCIES } from './data/defaultCurrencies';
import { 
  getUpdatedCurrencies, 
  fetchGasPrices, 
  fetchFearAndGreed 
} from './services/cryptoApi';
import { Navbar } from './components/Navbar';
import { LiveTicker } from './components/LiveTicker';
import { Converter } from './components/Converter';
import { PriceChart } from './components/PriceChart';
import { ConversionMatrix } from './components/ConversionMatrix';
import { MarketStats } from './components/MarketStats';
import { SavedPairs } from './components/SavedPairs';
import { SeoContent } from './components/SeoContent';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { StaticPage, StaticPageKey } from './components/StaticPages';
import { PairSeoSection } from './components/PairSeoSection';
import { Zap, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  // Main currencies list
  const [currencies, setCurrencies] = useState<Currency[]>(INITIAL_CURRENCIES);
  
  // Active conversion pair with URL path (/convert/btc-to-usd) and query params (?from=ETH&to=USD)
  const [fromCurrency, setFromCurrency] = useState<Currency>(() => {
    try {
      const pathname = window.location.pathname.toLowerCase();
      const match = pathname.match(/(?:convert\/)?([a-z0-9]+)-to-([a-z0-9]+)/i);
      if (match) {
        const fromSym = match[1].toUpperCase();
        const found = INITIAL_CURRENCIES.find((c) => c.symbol === fromSym);
        if (found) return found;
      }
      const params = new URLSearchParams(window.location.search);
      const urlFrom = params.get('from')?.toUpperCase();
      if (urlFrom) {
        const found = INITIAL_CURRENCIES.find((c) => c.symbol === urlFrom);
        if (found) return found;
      }
    } catch {
      // ignore
    }
    return INITIAL_CURRENCIES.find((c) => c.symbol === 'BTC') || INITIAL_CURRENCIES[0];
  });

  const [toCurrency, setToCurrency] = useState<Currency>(() => {
    try {
      const pathname = window.location.pathname.toLowerCase();
      const match = pathname.match(/(?:convert\/)?([a-z0-9]+)-to-([a-z0-9]+)/i);
      if (match) {
        const toSym = match[2].toUpperCase();
        const found = INITIAL_CURRENCIES.find((c) => c.symbol === toSym);
        if (found) return found;
      }
      const params = new URLSearchParams(window.location.search);
      const urlTo = params.get('to')?.toUpperCase();
      if (urlTo) {
        const found = INITIAL_CURRENCIES.find((c) => c.symbol === urlTo);
        if (found) return found;
      }
    } catch {
      // ignore
    }
    return INITIAL_CURRENCIES.find((c) => c.symbol === 'USD') || INITIAL_CURRENCIES[1];
  });

  // Standalone pages navigation state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    try {
      return window.location.pathname.toLowerCase();
    } catch {
      return '/';
    }
  });

  const handleNavigate = (path: string) => {
    setCurrentPath(path.toLowerCase());
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname.toLowerCase());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Determine if viewing a static informational or comprehensive guide page
  let staticPageKey: StaticPageKey | null = null;
  if (currentPath.startsWith('/about')) staticPageKey = 'about';
  else if (currentPath.startsWith('/contact')) staticPageKey = 'contact';
  else if (currentPath.startsWith('/privacy')) staticPageKey = 'privacy';
  else if (currentPath.startsWith('/terms')) staticPageKey = 'terms';
  else if (currentPath.startsWith('/disclaimer')) staticPageKey = 'disclaimer';
  else if (currentPath === '/guides/how-crypto-exchange-rates-work') staticPageKey = 'guide-rates';
  else if (currentPath === '/guides/fiat-to-crypto-conversion-guide') staticPageKey = 'guide-fiat';
  else if (currentPath === '/guides/crypto-market-cap-vs-volume') staticPageKey = 'guide-marketcap';
  else if (currentPath === '/guides/understanding-ethereum-gas-fees') staticPageKey = 'guide-gas';
  else if (currentPath === '/guides/crypto-tax-guide-conversions') staticPageKey = 'guide-tax';
  else if (currentPath === '/guides/cex-vs-dex-exchange-comparison') staticPageKey = 'guide-cex-dex';
  else if (currentPath === '/guides/understanding-stablecoins-pegs') staticPageKey = 'guide-stablecoins';
  else if (currentPath === '/guides/crypto-transaction-fees-and-spreads') staticPageKey = 'guide-fees';
  else if (currentPath.startsWith('/guides')) staticPageKey = 'guides';

  // Check if viewing a dedicated conversion pair page
  const isPairPage = !staticPageKey && (
    currentPath.startsWith('/convert/') ||
    window.location.pathname.toLowerCase().startsWith('/convert/') ||
    window.location.pathname.includes('-to-')
  );

  // Handle direct hash navigation (e.g. landing on /guides#converter-section or /#converter-section)
  useEffect(() => {
    if (window.location.hash === '#converter-section' || window.location.hash === '#chart-section') {
      const hash = window.location.hash;
      const id = hash.replace('#', '');
      if (staticPageKey) {
        window.history.replaceState({}, '', '/' + hash);
        setCurrentPath('/');
      }
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    }
  }, [staticPageKey]);

  // Comprehensive Metadata Management Helper (Dynamic canonical, OpenGraph, Twitter, Titles)
  const updateMetaTag = (selector: string, attr: string, value: string) => {
    try {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
        if (selector.includes('canonical')) (el as HTMLLinkElement).rel = 'canonical';
        else if (selector.includes('property')) (el as HTMLMetaElement).setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
        else if (selector.includes('name')) (el as HTMLMetaElement).setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    } catch {
      // ignore
    }
  };

  // Sync active conversion pair to URL & update dynamic SEO Title/Meta/Canonical
  useEffect(() => {
    if (staticPageKey) {
      let title = 'CoinRates: Fiat-to-Crypto Exchange Rates & Converter';
      let desc = 'Track live cryptocurrency exchange rates and convert fiat to crypto with zero fees.';
      const canonical = `https://www.coinrates.live${currentPath}`;

      if (staticPageKey === 'about') {
        title = 'About CoinRates: Real-Time Crypto Converter & Rates';
        desc = 'Learn about CoinRates.live, our real-time market data methodology, zero-fee commitment, and independent crypto rate tracking platform.';
      } else if (staticPageKey === 'contact') {
        title = 'Contact Us: Support & Feedback | CoinRates.live';
        desc = 'Get in touch with the CoinRates.live team for live cryptocurrency rate assistance, technical support, and partnership inquiries.';
      } else if (staticPageKey === 'privacy') {
        title = 'Privacy Policy & Cookies Disclosure | CoinRates.live';
        desc = 'Our complete privacy policy detailing Google AdSense cookies, DAA WebChoices, log files, and GDPR compliance on CoinRates.live.';
      } else if (staticPageKey === 'terms') {
        title = 'Terms of Service & Usage Policy | CoinRates.live';
        desc = 'CoinRates.live terms of service, acceptable usage policy, financial calculation disclaimers, and cryptocurrency tool guidelines.';
      } else if (staticPageKey === 'disclaimer') {
        title = 'Financial & Risk Disclosure Notice | CoinRates.live';
        desc = 'Financial disclaimer for CoinRates.live. Learn about cryptocurrency market risks, exchange volatility, and non-advisory calculations.';
      } else if (staticPageKey === 'guides') {
        title = 'Crypto Market Guides & Knowledge Base | CoinRates.live';
        desc = 'Explore comprehensive cryptocurrency guides explaining exchange rates, fiat conversions, market capitalization, taxes, and network fees.';
      } else if (staticPageKey === 'guide-rates') {
        title = 'How Crypto Exchange Rates Are Determined | CoinRates.live';
        desc = 'Understand how order book depth, bid-ask spreads, and automated market arbitrage determine real-time cryptocurrency exchange rates.';
      } else if (staticPageKey === 'guide-fiat') {
        title = 'Safest Way to Convert BTC to US Dollars | CoinRates';
        desc = 'Compare regulated centralized exchanges, institutional OTC desks, and P2P multi-sig escrow with lowest crypto cashout fees in 2026.';
      } else if (staticPageKey === 'guide-marketcap') {
        title = 'Market Cap vs. 24h Trading Volume | CoinRates.live';
        desc = 'Why high market cap can conceal phantom liquidity. How to evaluate circulating supply, token inflation, and wash trading risks in crypto.';
      } else if (staticPageKey === 'guide-gas') {
        title = 'What is Gwei? Live Ethereum Gas Fee Guide | CoinRates';
        desc = 'Understand Ethereum Gwei, EIP-1559 base fee burning, validator priority tips, and how Layer-2 rollups reduce transaction fees by 95%.';
      } else if (staticPageKey === 'guide-tax') {
        title = 'Crypto Tax Guide: How Token Swaps Are Taxed | CoinRates';
        desc = 'Learn cryptocurrency capital gains tax rules on crypto-to-fiat conversions, token swaps, FIFO vs HIFO cost basis, and tax reporting requirements.';
      } else if (staticPageKey === 'guide-cex-dex') {
        title = 'CEX vs DEX: Crypto Exchange Security Guide | CoinRates';
        desc = 'Compare CEX vs DEX security, proof-of-reserves, private key custody, order books vs AMMs, and conversion slippage on CoinRates.live.';
      } else if (staticPageKey === 'guide-stablecoins') {
        title = 'Stablecoin Guide: USDT, USDC & Peg Models | CoinRates';
        desc = 'How USDT, USDC, and DAI preserve 1:1 USD pegs. Learn about reserve audit attestations, redemption mechanics, and de-pegging risks.';
      } else if (staticPageKey === 'guide-fees') {
        title = 'Crypto Fees Explained: Gas, Spreads & Costs | CoinRates';
        desc = 'How zero-fee crypto apps make money on inflated bid-ask spreads. Calculate your true conversion slippage and save on trading fees.';
      }

      document.title = title;
      updateMetaTag('meta[name="title"]', 'content', title);
      updateMetaTag('meta[name="description"]', 'content', desc);
      updateMetaTag('link[rel="canonical"]', 'href', canonical);
      updateMetaTag('meta[property="og:url"]', 'content', canonical);
      updateMetaTag('meta[property="og:title"]', 'content', title);
      updateMetaTag('meta[property="og:description"]', 'content', desc);
      updateMetaTag('meta[property="twitter:url"]', 'content', canonical);
      updateMetaTag('meta[property="twitter:title"]', 'content', title);
      updateMetaTag('meta[property="twitter:description"]', 'content', desc);
      return;
    }

    try {
      const pairSlug = `${fromCurrency.symbol.toLowerCase()}-to-${toCurrency.symbol.toLowerCase()}`;
      const pairPath = `/convert/${pairSlug}`;

      if (window.location.pathname.startsWith('/convert/') || window.location.pathname.includes('-to-')) {
        window.history.replaceState({}, '', pairPath);
      } else {
        const url = new URL(window.location.href);
        url.searchParams.set('from', fromCurrency.symbol);
        url.searchParams.set('to', toCurrency.symbol);
        window.history.replaceState({}, '', url.toString());
      }

      // Title strictly between 50 and 60 chars, never exceeding 60
      let pageTitle = `1 ${fromCurrency.symbol} to ${toCurrency.symbol}: Live ${fromCurrency.name} to ${toCurrency.name} | CoinRates`;
      if (pageTitle.length > 60) {
        pageTitle = `1 ${fromCurrency.symbol} to ${toCurrency.symbol}: Live ${fromCurrency.name} to ${toCurrency.symbol} Rate | CoinRates`;
      }
      if (pageTitle.length > 60) {
        pageTitle = `1 ${fromCurrency.symbol} to ${toCurrency.symbol}: Live ${fromCurrency.name} Rate | CoinRates`;
      }

      // Description strictly between 130 and 155 chars
      let pageDesc = `Convert 1 ${fromCurrency.name} (${fromCurrency.symbol}) to ${toCurrency.name} (${toCurrency.symbol}) at real-time market rates. Live price charts, 0% fees, and fast calculator on CoinRates.live.`;
      if (pageDesc.length > 155) {
        pageDesc = `Convert 1 ${fromCurrency.symbol} to ${toCurrency.name} (${toCurrency.symbol}) at live rates. Interactive charts, 0% fees, and fast crypto calculator on CoinRates.live.`;
      }

      const canonicalUrl = isPairPage ? `https://www.coinrates.live/convert/${pairSlug}` : 'https://www.coinrates.live/';

      document.title = pageTitle;
      updateMetaTag('meta[name="title"]', 'content', pageTitle);
      updateMetaTag('meta[name="description"]', 'content', pageDesc);
      updateMetaTag('link[rel="canonical"]', 'href', canonicalUrl);
      updateMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
      updateMetaTag('meta[property="og:title"]', 'content', pageTitle);
      updateMetaTag('meta[property="og:description"]', 'content', pageDesc);
      updateMetaTag('meta[property="twitter:url"]', 'content', canonicalUrl);
      updateMetaTag('meta[property="twitter:title"]', 'content', pageTitle);
      updateMetaTag('meta[property="twitter:description"]', 'content', pageDesc);
    } catch {
      // ignore
    }
  }, [fromCurrency, toCurrency, staticPageKey, isPairPage, currentPath]);

  // Live status & refresh state
  const [isLive, setIsLive] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString());

  // Gas and Market Sentiment state
  const [gasInfo, setGasInfo] = useState<GasFeeInfo>({
    slow: 11,
    standard: 14,
    fast: 18,
    baseFee: 10,
    updatedAt: new Date().toLocaleTimeString(),
  });
  const [fearAndGreed, setFearAndGreed] = useState<{ value: number; classification: string }>({
    value: 68,
    classification: 'Greed',
  });

  // Saved / Pinned Favorite Pairs in localStorage
  const [favorites, setFavorites] = useState<{ from: string; to: string }[]>(() => {
    try {
      const saved = localStorage.getItem('cryptoconvert_favs');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [
      { from: 'BTC', to: 'USD' },
      { from: 'ETH', to: 'USD' },
      { from: 'SOL', to: 'USD' },
    ];
  });

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cryptoconvert_favs', JSON.stringify(favorites));
    } catch (e) {
      // ignore
    }
  }, [favorites]);

  // Fetch updated prices
  const refreshRates = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const result = await getUpdatedCurrencies(currencies);
      setCurrencies(result.currencies);

      // Keep active pair reference updated with fresh price
      setFromCurrency((prev) => result.currencies.find((c) => c.id === prev.id) || prev);
      setToCurrency((prev) => result.currencies.find((c) => c.id === prev.id) || prev);
      setLastUpdated(new Date().toLocaleTimeString());
      setIsLive(result.isLive);
    } catch (err) {
      setIsLive(false);
    } finally {
      setIsRefreshing(false);
    }
  }, [currencies]);

  // Initial and periodic polling for prices, gas, sentiment
  useEffect(() => {
    // Initial fetch
    refreshRates();

    fetchGasPrices().then(setGasInfo);
    fetchFearAndGreed().then(setFearAndGreed);

    // 25-second poll interval
    const timer = setInterval(() => {
      refreshRates();
    }, 25000);

    return () => clearInterval(timer);
  }, []);

  // Swap currencies
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Select pair from quick clicks or ticker
  const handleSelectPair = (fromSymbol: string, toSymbol: string) => {
    const fromCoin = currencies.find((c) => c.symbol.toUpperCase() === fromSymbol.toUpperCase());
    const toCoin = currencies.find((c) => c.symbol.toUpperCase() === toSymbol.toUpperCase());
    if (fromCoin) setFromCurrency(fromCoin);
    if (toCoin) setToCurrency(toCoin);
  };

  // Single coin selection from live ticker
  const handleSelectSingleCoin = (coin: Currency) => {
    if (fromCurrency.id === coin.id) {
      setToCurrency(coin);
    } else {
      setFromCurrency(coin);
    }
  };

  // Favorite toggle
  const toggleFavorite = (fromSym: string, toSym: string) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.from === fromSym && p.to === toSym);
      if (exists) {
        return prev.filter((p) => !(p.from === fromSym && p.to === toSym));
      } else {
        return [...prev, { from: fromSym, to: toSym }];
      }
    });
  };

  const isCurrentFavorite = favorites.some(
    (p) => p.from === fromCurrency.symbol && p.to === toCurrency.symbol
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine which asset to display in the chart (prioritize crypto)
  const chartCurrency = fromCurrency.type === 'crypto' ? fromCurrency : toCurrency;

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <div className="google-auto-ads-ignore">
        <Navbar isLive={isLive} onScrollTo={scrollToSection} onNavigate={handleNavigate} />
      </div>

      {/* Live Continuous Ticker Tape */}
      <div className="google-auto-ads-ignore">
        <LiveTicker currencies={currencies} onSelectCoin={handleSelectSingleCoin} />
      </div>

      {/* Render Standalone Page OR Full Converter Dashboard */}
      {staticPageKey ? (
        <main className="flex-1 w-full">
          <StaticPage page={staticPageKey} onNavigate={handleNavigate} />
        </main>
      ) : (
        /* Main Converter Dashboard */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
          {/* Hero Header (Pair-Aware H1 to Prevent Hydration Content Mismatch) */}
          <section className="text-center max-w-3xl mx-auto space-y-4 google-auto-ads-ignore">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>CoinRates.live • Free Real-Time Cryptocurrency Converter</span>
            </div>

            {isPairPage ? (
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  1 {fromCurrency.symbol} to {toCurrency.symbol}: <br className="hidden sm:inline" />
                  <span className="gradient-text">Live {fromCurrency.name} to {toCurrency.name} Rate</span>
                </h1>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  Real-time <strong className="text-slate-200">{fromCurrency.name} ({fromCurrency.symbol})</strong> to <strong className="text-slate-200">{toCurrency.name} ({toCurrency.symbol})</strong> conversion rates updated continuously every 25 seconds with 0% fees on <strong className="text-slate-200">CoinRates.live</strong>.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  Cryptocurrency Exchange Rates <br className="hidden sm:inline" />
                  <span className="gradient-text">& Fiat-to-Crypto Converter</span>
                </h1>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  Track real-time <strong className="text-slate-200">crypto currencies exchange rates</strong> and calculate live <strong className="text-slate-200">fiat-to-crypto exchange rates</strong> with zero fees. Fast, free BTC to USD calculator on <strong className="text-slate-200">CoinRates.live</strong>.
                </p>
              </div>
            )}

            <div className="flex items-center justify-center gap-6 pt-2 text-xs text-slate-400 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Instant Calculations
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Live Market Feed
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400" /> Zero Sign-up Required
              </span>
            </div>

            {/* High-Impact Trending Pairs Quick Links (Passes PageRank to SOL, DOGE, ETH/BTC) */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
                <span>🔥</span> <span className="text-slate-300">Trending Converters:</span>
              </span>
              <a
                href="/convert/sol-to-usd"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectPair('SOL', 'USD');
                  window.history.pushState({}, '', '/convert/sol-to-usd');
                  scrollToSection('converter-section');
                }}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-400 font-semibold transition shadow-sm"
              >
                SOL to USD
              </a>
              <a
                href="/convert/doge-to-usd"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectPair('DOGE', 'USD');
                  window.history.pushState({}, '', '/convert/doge-to-usd');
                  scrollToSection('converter-section');
                }}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 text-amber-300 hover:text-white hover:border-amber-400 font-semibold transition shadow-sm"
              >
                DOGE to USD
              </a>
              <a
                href="/convert/eth-to-btc"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectPair('ETH', 'BTC');
                  window.history.pushState({}, '', '/convert/eth-to-btc');
                  scrollToSection('converter-section');
                }}
                className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 font-semibold transition"
              >
                ETH to BTC
              </a>
              <a
                href="/convert/btc-to-usd"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectPair('BTC', 'USD');
                  window.history.pushState({}, '', '/convert/btc-to-usd');
                  scrollToSection('converter-section');
                }}
                className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 font-semibold transition"
              >
                BTC to USD
              </a>
              <a
                href="/convert/btc-to-cad"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectPair('BTC', 'CAD');
                  window.history.pushState({}, '', '/convert/btc-to-cad');
                  scrollToSection('converter-section');
                }}
                className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 font-semibold transition"
              >
                BTC to CAD
              </a>
              <a
                href="/convert/eth-to-usd"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelectPair('ETH', 'USD');
                  window.history.pushState({}, '', '/convert/eth-to-usd');
                  scrollToSection('converter-section');
                }}
                className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 font-semibold transition"
              >
                ETH to USD
              </a>
            </div>
          </section>

          {/* PRIMARY CONVERTER SECTION (Marked with google-auto-ads-ignore to protect tool UI) */}
          <section id="converter-section" className="google-auto-ads-ignore">
            <Converter
              currencies={currencies}
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              onFromCurrencyChange={setFromCurrency}
              onToCurrencyChange={setToCurrency}
              onSwap={handleSwap}
              onRefresh={refreshRates}
              isRefreshing={isRefreshing}
              lastUpdated={lastUpdated}
              isLive={isLive}
              onSaveFavorite={toggleFavorite}
              isFavorite={isCurrentFavorite}
            />
          </section>

          {/* DYNAMIC PAIR SEO & CONVERSION TABLES (Rendered during pair navigation) */}
          {isPairPage && (
            <section className="pt-2">
              <PairSeoSection fromCurrency={fromCurrency} toCurrency={toCurrency} />
            </section>
          )}

          {/* SAVED PINNED PAIRS */}
          <section>
            <SavedPairs
              favorites={favorites}
              currencies={currencies}
              onSelectPair={handleSelectPair}
              onRemoveFavorite={(from, to) => toggleFavorite(from, to)}
            />
          </section>

          {/* MARKET MICRO WIDGETS & POPULAR PRESETS */}
          <section className="google-auto-ads-ignore">
            <MarketStats
              gasInfo={gasInfo}
              fearAndGreed={fearAndGreed}
              onSelectPair={handleSelectPair}
              currentFrom={fromCurrency.symbol}
              currentTo={toCurrency.symbol}
            />
          </section>

          {/* INTERACTIVE PRICE CHART */}
          <section id="chart-section" className="google-auto-ads-ignore">
            <PriceChart currency={chartCurrency} vsCurrency={toCurrency} />
          </section>

          {/* GLOBAL CONVERSION MATRIX */}
          <section id="matrix-section">
            <ConversionMatrix
              sourceCurrency={fromCurrency}
              currencies={currencies}
              onSelectTarget={(target) => setToCurrency(target)}
            />
          </section>

          {/* EDUCATIONAL SEO CONTENT & GUIDE */}
          <section id="guide-section">
            <SeoContent />
          </section>

          {/* FAQ ACCORDION */}
          <section id="faq-section">
            <FaqSection />
          </section>
        </main>
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
