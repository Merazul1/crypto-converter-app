export type CurrencyType = 'crypto' | 'fiat';

export interface Currency {
  id: string;              // e.g. 'bitcoin', 'ethereum', 'usd'
  symbol: string;          // e.g. 'BTC', 'ETH', 'USD'
  name: string;            // e.g. 'Bitcoin', 'Ethereum', 'US Dollar'
  type: CurrencyType;
  priceUsd: number;        // Rate in USD (1 USD = 1 for fiat USD)
  change24h?: number;      // 24hr price change percentage
  volume24h?: number;      // 24hr volume in USD
  high24h?: number;        // 24hr high in USD
  low24h?: number;         // 24hr low in USD
  marketCap?: number;      // Market cap
  iconColor?: string;      // Accent color for fallback badge
  decimals?: number;       // Recommended display decimals
  popular?: boolean;       // Shown in quick-pick shortcuts
}

export interface ConversionState {
  fromCurrency: Currency;
  toCurrency: Currency;
  fromAmount: string;
  toAmount: string;
  feePercentage: number;   // 0, 0.1, 0.5, 1.0%
}

export interface ChartPoint {
  time: string;
  price: number;
}

export type Timeframe = '24H' | '7D' | '30D' | '1Y';

export interface GasFeeInfo {
  slow: number;     // in Gwei
  standard: number;
  fast: number;
  baseFee: number;
  updatedAt: string;
}

export interface MarketOverview {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  ethDominance: number;
  fearAndGreedIndex: {
    value: number;
    classification: string;
  };
}

export interface SavedPair {
  id: string;
  fromSymbol: string;
  toSymbol: string;
  name: string;
}
