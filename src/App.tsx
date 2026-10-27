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
import { Zap, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  // Main currencies list
  const [currencies, setCurrencies] = useState<Currency[]>(INITIAL_CURRENCIES);
  
  // Active conversion pair with URL query params support (?from=ETH&to=USD)
  const [fromCurrency, setFromCurrency] = useState<Currency>(() => {
    try {
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

  // Sync active conversion pair to URL & update dynamic SEO Title/Meta
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('from', fromCurrency.symbol);
      url.searchParams.set('to', toCurrency.symbol);
      window.history.replaceState({}, '', url.toString());

      // Dynamic SEO Title & Description for the active pair
      document.title = `1 ${fromCurrency.symbol} to ${toCurrency.symbol}: Live ${fromCurrency.name} to ${toCurrency.name} Converter | CoinRates.live`;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `Convert ${fromCurrency.name} (${fromCurrency.symbol}) to ${toCurrency.name} (${toCurrency.symbol}) at free real-time exchange rates. Instant conversion, live charts, and fee simulator on CoinRates.live.`
        );
      }
    } catch {
      // ignore
    }
  }, [fromCurrency, toCurrency]);

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
      <Navbar isLive={isLive} onScrollTo={scrollToSection} />

      {/* Live Continuous Ticker Tape */}
      <LiveTicker currencies={currencies} onSelectCoin={handleSelectSingleCoin} />

      {/* Hero Header */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>CoinRates.live • Free Real-Time Cryptocurrency Converter</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Cryptocurrency Exchange Rates <br className="hidden sm:inline" />
            <span className="gradient-text">& Digital Currency Converter</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Track real-time <strong className="text-slate-200">cryptocurrency exchange rates</strong> and calculate live digital currency conversion with zero fees on <strong className="text-slate-200">CoinRates.live</strong>.
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
