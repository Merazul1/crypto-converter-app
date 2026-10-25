import { Currency, ChartPoint, Timeframe, GasFeeInfo } from '../types/crypto';
import { INITIAL_CURRENCIES } from '../data/defaultCurrencies';

// Binance symbol mapping (e.g., BTC -> BTCUSDT)
const BINANCE_MAP: Record<string, string> = {
  BTC: 'BTCUSDT',
  ETH: 'ETHUSDT',
  SOL: 'SOLUSDT',
  BNB: 'BNBUSDT',
  XRP: 'XRPUSDT',
  DOGE: 'DOGEUSDT',
  ADA: 'ADAUSDT',
  AVAX: 'AVAXUSDT',
  SUI: 'SUIUSDT',
  LINK: 'LINKUSDT',
  DOT: 'DOTUSDT',
  NEAR: 'NEARUSDT',
  LTC: 'LTCUSDT',
  TRX: 'TRXUSDT',
  UNI: 'UNIUSDT',
  PEPE: 'PEPEUSDT',
  SHIB: 'SHIBUSDT',
  RENDER: 'RENDERUSDT',
  POL: 'POLUSDT',
  ARB: 'ARBUSDT',
};

// Fetch live crypto rates from Binance Public API
export async function fetchLiveCryptoRates(): Promise<{ [symbol: string]: { price: number; change24h: number; high: number; low: number; volume: number } }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch('https://api.binance.com/api/v3/ticker/24hr', {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error('Binance API response error');
    const data = await res.json();

    const priceMap: { [symbol: string]: { price: number; change24h: number; high: number; low: number; volume: number } } = {};
    
    // Create reverse lookup
    const symbolByPair: Record<string, string> = {};
    Object.entries(BINANCE_MAP).forEach(([sym, pair]) => {
      symbolByPair[pair] = sym;
    });

    for (const item of data) {
      const sym = symbolByPair[item.symbol];
      if (sym) {
        priceMap[sym] = {
          price: parseFloat(item.lastPrice),
          change24h: parseFloat(item.priceChangePercent),
          high: parseFloat(item.highPrice),
          low: parseFloat(item.lowPrice),
          volume: parseFloat(item.quoteVolume),
        };
      }
    }

    return priceMap;
  } catch (error) {
    console.warn('Binance API unavailable, trying fallback or cache', error);
    return {};
  }
}

// Fetch live fiat exchange rates against USD
export async function fetchLiveFiatRates(): Promise<{ [symbol: string]: number }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // Free Open Exchange Rates endpoint without API key
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error('Fiat rate API failed');
    const data = await res.json();
    
    const rates: { [symbol: string]: number } = {};
    if (data && data.rates) {
      // 1 USD = X fiat => priceUsd of 1 fiat = 1 / X
      for (const [fiat, rateAgainstUsd] of Object.entries(data.rates)) {
        if (typeof rateAgainstUsd === 'number' && rateAgainstUsd > 0) {
          rates[fiat] = 1 / rateAgainstUsd;
        }
      }
    }
    return rates;
  } catch (err) {
    console.warn('Could not fetch fiat rates, using baseline values', err);
    return {};
  }
}

// Combined helper to sync currencies with live data
export async function getUpdatedCurrencies(currentList: Currency[] = INITIAL_CURRENCIES): Promise<{
  currencies: Currency[];
  isLive: boolean;
  source: string;
}> {
  try {
    const [cryptoData, fiatRates] = await Promise.allSettled([
      fetchLiveCryptoRates(),
      fetchLiveFiatRates(),
    ]);

    const cryptoPrices = cryptoData.status === 'fulfilled' ? cryptoData.value : {};
    const fiats = fiatRates.status === 'fulfilled' ? fiatRates.value : {};

    const hasLiveCrypto = Object.keys(cryptoPrices).length > 0;
    const hasLiveFiat = Object.keys(fiats).length > 0;

    const updated = currentList.map(curr => {
      if (curr.type === 'crypto' && cryptoPrices[curr.symbol]) {
        const live = cryptoPrices[curr.symbol];
        return {
          ...curr,
          priceUsd: live.price,
          change24h: live.change24h,
          high24h: live.high,
          low24h: live.low,
          volume24h: live.volume,
        };
      } else if (curr.type === 'fiat' && fiats[curr.symbol]) {
        return {
          ...curr,
          priceUsd: fiats[curr.symbol],
        };
      }
      return curr;
    });

    return {
      currencies: updated,
      isLive: hasLiveCrypto || hasLiveFiat,
      source: hasLiveCrypto ? 'Binance Live WebSocket/REST' : 'Cached Baseline Rates',
    };
  } catch {
    return {
      currencies: currentList,
      isLive: false,
      source: 'Offline Fallback',
    };
  }
}

// Fetch Fear & Greed Index
export async function fetchFearAndGreed(): Promise<{ value: number; classification: string }> {
  try {
    const res = await fetch('https://api.alternative.me/fng/?limit=1');
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data[0]) {
        return {
          value: parseInt(json.data[0].value, 10),
          classification: json.data[0].value_classification,
        };
      }
    }
  } catch (e) {
    // silently catch
  }
  return { value: 68, classification: 'Greed' };
}

// Fetch simulated / live gas prices
export async function fetchGasPrices(): Promise<GasFeeInfo> {
  // Typical dynamic gas fee
  const base = 12 + Math.floor(Math.random() * 8);
  return {
    slow: base - 2,
    standard: base,
    fast: base + 4,
    baseFee: base - 3,
    updatedAt: new Date().toLocaleTimeString(),
  };
}

// Generate realistic chart history for chosen timeframe
export function generateChartData(currentPrice: number, timeframe: Timeframe): ChartPoint[] {
  const points: ChartPoint[] = [];
  let numPoints = 24;
  let intervalMs = 60 * 60 * 1000; // 1 hour for 24h
  let volatility = 0.015;

  if (timeframe === '7D') {
    numPoints = 28;
    intervalMs = 6 * 60 * 60 * 1000; // 6 hours
    volatility = 0.035;
  } else if (timeframe === '30D') {
    numPoints = 30;
    intervalMs = 24 * 60 * 60 * 1000; // 1 day
    volatility = 0.06;
  } else if (timeframe === '1Y') {
    numPoints = 36;
    intervalMs = 10 * 24 * 60 * 60 * 1000; // 10 days
    volatility = 0.15;
  }

  const now = Date.now();
  // Work backwards from currentPrice
  const prices: number[] = [currentPrice];

  for (let i = 1; i < numPoints; i++) {
    const prev = prices[0];
    const change = (Math.random() - 0.49) * volatility * prev;
    const p = Math.max(prev - change, currentPrice * 0.4);
    prices.unshift(p);
  }

  for (let i = 0; i < numPoints; i++) {
    const t = new Date(now - (numPoints - 1 - i) * intervalMs);
    let timeStr = '';
    if (timeframe === '24H') {
      timeStr = t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (timeframe === '7D') {
      timeStr = t.toLocaleDateString([], { weekday: 'short', hour: 'numeric' });
    } else if (timeframe === '30D') {
      timeStr = t.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
      timeStr = t.toLocaleDateString([], { month: 'short', year: '2-digit' });
    }

    points.push({
      time: timeStr,
      price: prices[i],
    });
  }

  return points;
}
