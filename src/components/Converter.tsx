import React, { useState } from 'react';
import { Currency } from '../types/crypto';
import { CoinIcon } from './CoinIcon';
import { CurrencyModal } from './CurrencyModal';
import { formatNumber, copyToClipboard } from '../utils/formatters';
import { 
  ArrowDownUp, 
  Copy, 
  Check, 
  RotateCw, 
  Share2, 
  Star, 
  SlidersHorizontal,
  Sparkles,
  Info
} from 'lucide-react';

interface ConverterProps {
  currencies: Currency[];
  fromCurrency: Currency;
  toCurrency: Currency;
  onFromCurrencyChange: (c: Currency) => void;
  onToCurrencyChange: (c: Currency) => void;
  onSwap: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: string;
  isLive: boolean;
  onSaveFavorite?: (from: string, to: string) => void;
  isFavorite?: boolean;
}

export const Converter: React.FC<ConverterProps> = ({
  currencies,
  fromCurrency,
  toCurrency,
  onFromCurrencyChange,
  onToCurrencyChange,
  onSwap,
  onRefresh,
  isRefreshing,
  lastUpdated,
  isLive,
  onSaveFavorite,
  isFavorite = false,
}) => {
  const [fromAmount, setFromAmount] = useState<string>('1');
  const [feeRate, setFeeRate] = useState<number>(0); // 0, 0.1, 0.5, 1.0 %
  const [showFeeSettings, setShowFeeSettings] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'from' | 'to' | null>(null);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [invertedRateView, setInvertedRateView] = useState(false);

  // Compute exchange rate: 1 fromCurrency = X toCurrency
  // fromCurrency.priceUsd / toCurrency.priceUsd
  const rate = fromCurrency.priceUsd / toCurrency.priceUsd;
  const inverseRate = toCurrency.priceUsd / fromCurrency.priceUsd;

  // Calculate toAmount based on input
  const numericAmount = parseFloat(fromAmount) || 0;
  const rawConverted = numericAmount * rate;
  const feeAmount = rawConverted * (feeRate / 100);
  const finalConverted = Math.max(0, rawConverted - feeAmount);

  // Handle amount change with sanitizer
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
      setFromAmount(val);
    }
  };

  const setPresetAmount = (val: number) => {
    setFromAmount(val.toString());
  };

  const handleCopy = async () => {
    const textToCopy = `${fromAmount} ${fromCurrency.symbol} = ${formatNumber(finalConverted, toCurrency.decimals || 6)} ${toCurrency.symbol}`;
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleShare = async () => {
    const shareUrl = `https://coinrates.live/?from=${fromCurrency.symbol}&to=${toCurrency.symbol}`;
    const shareText = `Convert ${fromAmount} ${fromCurrency.symbol} = ${formatNumber(finalConverted, toCurrency.decimals || 6)} ${toCurrency.symbol} on CoinRates.live: ${shareUrl}`;
    const success = await copyToClipboard(shareText);
    if (success) {
      setShared(true);
      setTimeout(() => setShared(false), 2200);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Glass Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Glow backdrop behind converter */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Controls & Status Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800/80 gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isLive ? 'bg-emerald-400' : 'bg-amber-400'
              }`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isLive ? 'bg-emerald-500' : 'bg-amber-500'
              }`} />
            </span>
            <span className="text-xs font-semibold text-slate-300">
              {isLive ? 'Live Exchange Rates' : 'Cached Baseline Rates'}
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              • Updated: {lastUpdated}
            </span>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh live prices"
              className="p-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-400 hover:text-white transition disabled:opacity-50"
            >
              <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
            </button>

            {/* Fee toggle */}
            <button
              onClick={() => setShowFeeSettings(!showFeeSettings)}
              title="Toggle slippage/fee simulator"
              className={`p-2 rounded-xl border transition ${
                showFeeSettings || feeRate > 0
                  ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300'
                  : 'bg-slate-800/70 border-transparent hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Favorite Star */}
            {onSaveFavorite && (
              <button
                onClick={() => onSaveFavorite(fromCurrency.symbol, toCurrency.symbol)}
                title={isFavorite ? 'Saved in favorites' : 'Save this conversion pair'}
                className={`p-2 rounded-xl border transition ${
                  isFavorite
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                    : 'bg-slate-800/70 border-transparent hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
              </button>
            )}

            {/* Share */}
            <button
              onClick={handleShare}
              title="Share conversion"
              className="p-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-400 hover:text-white transition relative"
            >
              {shared ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Optional Fee / Slippage Slider Bar */}
        {showFeeSettings && (
          <div className="mt-4 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                Exchange Fee / Slippage Deduction
              </span>
              <span className="font-mono font-bold text-indigo-400">{feeRate}%</span>
            </div>
            <div className="flex items-center gap-2">
              {[0, 0.1, 0.25, 0.5, 1.0].map((rateOption) => (
                <button
                  key={rateOption}
                  onClick={() => setFeeRate(rateOption)}
                  className={`flex-1 py-1 rounded-lg font-semibold transition ${
                    feeRate === rateOption
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {rateOption === 0 ? 'Pure (0%)' : `${rateOption}%`}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
              <Info className="w-3 h-3 text-slate-400" />
              Simulates network or exchange fees deducted from converted payout.
            </p>
          </div>
        )}

        {/* CONVERTER INPUTS */}
        <div className="mt-6 space-y-3 relative">
          
          {/* FROM BOX */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 transition focus-within:border-indigo-500/70 focus-within:ring-1 focus-within:ring-indigo-500/50">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span>You Convert (From)</span>
              <span>1 {fromCurrency.symbol} ≈ ${formatNumber(fromCurrency.priceUsd, fromCurrency.decimals || 2)}</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <input
                type="text"
                inputMode="decimal"
                value={fromAmount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="w-full bg-transparent text-2xl sm:text-3xl font-black text-white font-mono focus:outline-none placeholder-slate-600"
              />

              {/* Currency Selector Button */}
              <button
                type="button"
                onClick={() => setModalMode('from')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700/80 text-white font-bold text-sm shrink-0 transition shadow-sm hover:scale-[1.02]"
              >
                <CoinIcon symbol={fromCurrency.symbol} size="sm" />
                <span>{fromCurrency.symbol}</span>
                <span className="text-slate-400 text-xs">▼</span>
              </button>
            </div>

            {/* Quick multiplier pills */}
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-800/60 overflow-x-auto no-scrollbar">
              <span className="text-[11px] text-slate-500 font-medium mr-1">Quick:</span>
              {[0.5, 1, 5, 10, 100, 500].map((num) => (
                <button
                  key={num}
                  onClick={() => setPresetAmount(num)}
                  className="px-2 py-0.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-mono transition"
                >
                  +{num}
                </button>
              ))}
              <button
                onClick={() => setFromAmount('1')}
                className="px-2 py-0.5 rounded-md bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 text-[11px] font-mono transition ml-auto"
              >
                Reset
              </button>
            </div>
          </div>

          {/* SWAP BUTTON */}
          <div className="flex justify-center -my-3 z-10 relative">
            <button
              type="button"
              onClick={onSwap}
              className="p-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg hover:shadow-indigo-500/30 hover:scale-110 active:scale-95 transition duration-200 border-2 border-slate-950"
              aria-label="Swap currencies"
              title="Swap currencies"
            >
              <ArrowDownUp className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* TO BOX */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 transition">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span className="flex items-center gap-1">
                <span>You Receive (To)</span>
                {feeRate > 0 && <span className="text-indigo-400 text-[10px]">(-{feeRate}% fee)</span>}
              </span>
              <span>1 {toCurrency.symbol} ≈ ${formatNumber(toCurrency.priceUsd, toCurrency.decimals || 2)}</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="w-full text-2xl sm:text-3xl font-black text-emerald-400 font-mono truncate select-all">
                {formatNumber(finalConverted, toCurrency.decimals || 6)}
              </div>

              {/* Currency Selector Button */}
              <button
                type="button"
                onClick={() => setModalMode('to')}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700/80 text-white font-bold text-sm shrink-0 transition shadow-sm hover:scale-[1.02]"
              >
                <CoinIcon symbol={toCurrency.symbol} size="sm" />
                <span>{toCurrency.symbol}</span>
                <span className="text-slate-400 text-xs">▼</span>
              </button>
            </div>

            {/* Estimated USD Value */}
            <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
              <span>Estimated USD Equivalent:</span>
              <span className="font-semibold text-slate-200 font-mono">
                ≈ ${formatNumber(finalConverted * toCurrency.priceUsd, 2)} USD
              </span>
            </div>
          </div>
        </div>

        {/* EXCHANGE RATE BANNER & INVERT */}
        <div className="mt-5 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <div className="text-xs">
              <span className="text-slate-400">Real-time Conversion Rate: </span>
              <span className="font-mono font-bold text-slate-100">
                {invertedRateView ? (
                  <>1 {toCurrency.symbol} = {formatNumber(inverseRate, fromCurrency.decimals || 6)} {fromCurrency.symbol}</>
                ) : (
                  <>1 {fromCurrency.symbol} = {formatNumber(rate, toCurrency.decimals || 6)} {toCurrency.symbol}</>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setInvertedRateView(!invertedRateView)}
              className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition underline underline-offset-2"
            >
              Invert rate
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* MODAL FOR PICKING CURRENCY */}
      {modalMode && (
        <CurrencyModal
          isOpen={true}
          onClose={() => setModalMode(null)}
          currencies={currencies}
          selectedCurrency={modalMode === 'from' ? fromCurrency : toCurrency}
          onSelect={(curr) => {
            if (modalMode === 'from') {
              onFromCurrencyChange(curr);
            } else {
              onToCurrencyChange(curr);
            }
          }}
          title={modalMode === 'from' ? 'Select Asset to Convert From' : 'Select Target Asset to Receive'}
        />
      )}
    </div>
  );
};
