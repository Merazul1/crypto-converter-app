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
import { StaticPage } from './components/StaticPages';
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

  // Determine if viewing a static informational/guide page
  let staticPageKey: 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'guides' | 'guide-rates' | 'guide-fiat' | 'guide-marketcap' | 'guide-gas' | null = null;
  if (currentPath.startsWith('/about')) staticPageKey = 'about';
  else if (currentPath.startsWith('/contact')) staticPageKey = 'contact';
  else if (currentPath.startsWith('/privacy')) staticPageKey = 'privacy';
  else if (currentPath.startsWith('/terms')) staticPageKey = 'terms';
  else if (currentPath.startsWith('/disclaimer')) staticPageKey = 'disclaimer';
  else if (currentPath === '/guides/how-crypto-exchange-rates-work') staticPageKey = 'guide-rates';
  else if (currentPath === '/guides/fiat-to-crypto-conversion-guide') staticPageKey = 'guide-fiat';
  else if (currentPath === '/guides/crypto-market-cap-vs-volume') staticPageKey = 'guide-marketcap';
  else if (currentPath === '/guides/understanding-ethereum-gas-fees') staticPageKey = 'guide-gas';
  else if (currentPath.startsWith('/guides')) staticPageKey = 'guides';

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
      }, 150);
    }
  }, [staticPageKey]);

  // Sync active conversion pair to URL & update dynamic SEO Title/Meta
  useEffect(() => {
    if (staticPageKey) {
      if (staticPageKey === 'about') document.title = 'About CoinRates.live — Free Real-Time Cryptocurrency Converter';
      else if (staticPageKey === 'contact') document.title = 'Contact Us & Technical Support | CoinRates.live';
      else if (staticPageKey === 'privacy') document.title = 'Privacy Policy & Cookies Disclosure | CoinRates.live';
      else if (staticPageKey === 'terms') document.title = 'Terms of Service | CoinRates.live';
      else if (staticPageKey === 'disclaimer') document.title = 'Financial Risk Disclaimer | CoinRates.live';
      else if (staticPageKey === 'guides') document.title = 'Crypto Market Guides & Knowledge Base | CoinRates.live';
      else if (staticPageKey === 'guide-rates') document.title = 'How Crypto Exchange Rates Are Determined | CoinRates.live';
      else if (staticPageKey === 'guide-fiat') document.title = 'Guide to Fiat-to-Crypto Exchange Rates | CoinRates.live';
      else if (staticPageKey === 'guide-marketcap') document.title = 'Market Cap vs. 24h Trading Volume | CoinRates.live';
      else if (staticPageKey === 'guide-gas') document.title = 'Understanding Ethereum Gas Fees (Gwei) | CoinRates.live';
      return;
    }

    try {
      const pairPath = `/convert/${fromCurrency.symbol.toLowerCase()}-to-${toCurrency.symbol.toLowerCase()}`;
      if (window.location.pathname.startsWith('/convert/') || window.location.pathname.includes('-to-')) {
        window.history.replaceState({}, '', pairPath);
      } else {
        const url = new URL(window.location.href);
        url.searchParams.set('from', fromCurrency.symbol);
        url.searchParams.set('to', toCurrency.symbol);
        window.history.replaceState({}, '', url.toString());
      }

      // Dynamic SEO Title & Description for the active pair
      document.title = `1 ${fromCurrency.symbol} to ${toCurrency.symbol}: Live ${fromCurrency.name} to ${toCurrency.name} Rate | CoinRates.live`;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `Convert ${fromCurrency.name} (${fromCurrency.symbol}) to ${toCurrency.name} (${toCurrency.symbol}) at free real-time fiat-to-crypto exchange rates. Fast BTC to USD calculator and live charts on CoinRates.live.`
        );
      }
    } catch {
      // ignore
    }
  }, [fromCurrency, toCurrency, staticPageKey]);

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

  // Refresh live rates function
  const refreshRates = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [updatedResult, gasData, fngData] = await Promise.allSettled([
        getUpdatedCurrencies(currencies),
        fetchGasPrices(),
        fetchFearAndGreed(),
      ]);

      if (updatedResult.status === 'fulfilled') {
        const { currencies: updatedList, isLive: liveStatus } = updatedResult.value;
        setCurrencies(updatedList);
        setIsLive(liveStatus);

        // Also update currently selected from/to currency objects
        setFromCurrency((prev) => updatedList.find((c) => c.id === prev.id) || prev);
        setToCurrency((prev) => updatedList.find((c) => c.id === prev.id) || prev);
      }

      if (gasData.status === 'fulfilled') {
        setGasInfo(gasData.value);
      }
      if (fngData.status === 'fulfilled') {
        setFearAndGreed(fngData.value);
      }

      setLastUpdated(new Date().toLocaleTimeString());
    } finally {
      setIsRefreshing(false);
    }
  }, [currencies]);

  // Initial fetch & automated 25-second poll
  useEffect(() => {
    refreshRates();
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
      // Swap to target if already from
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
      <Navbar isLive={isLive} onScrollTo={scrollToSection} onNavigate={handleNavigate} />

      {/* Live Continuous Ticker Tape */}
      <LiveTicker currencies={currencies} onSelectCoin={handleSelectSingleCoin} />

      {/* Render Standalone Page OR Full Converter Dashboard */}
      {staticPageKey ? (
        <main className="flex-1 w-full">
          <StaticPage page={staticPageKey} onNavigate={handleNavigate} />
        </main>
      ) : (
        /* Main Converter Dashboard */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
          {/* Hero Header */}
          <section className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>CoinRates.live • Free Real-Time Cryptocurrency Converter</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Cryptocurrency Exchange Rates <br className="hidden sm:inline" />
              <span className="gradient-text">& Fiat-to-Crypto Converter</span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Track real-time <strong className="text-slate-200">crypto currencies exchange rates</strong> and calculate live <strong className="text-slate-200">fiat-to-crypto exchange rates</strong> with zero fees. Fast, free BTC to USD calculator on <strong className="text-slate-200">CoinRates.live</strong>.
            </p>

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
          </section>

          {/* PRIMARY CONVERTER SECTION */}
          <section id="converter-section">
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
          <section>
            <MarketStats
              gasInfo={gasInfo}
              fearAndGreed={fearAndGreed}
              onSelectPair={handleSelectPair}
              currentFrom={fromCurrency.symbol}
              currentTo={toCurrency.symbol}
            />
          </section>

          {/* INTERACTIVE PRICE CHART */}
          <section id="chart-section">
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
