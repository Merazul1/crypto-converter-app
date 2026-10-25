import React, { useState, useMemo } from 'react';
import { Currency, Timeframe, ChartPoint } from '../types/crypto';
import { generateChartData } from '../services/cryptoApi';
import { CoinIcon } from './CoinIcon';
import { formatNumber, formatCompact } from '../utils/formatters';
import { TrendingUp, TrendingDown, Clock, Activity } from 'lucide-react';

interface PriceChartProps {
  currency: Currency;
  vsCurrency?: Currency;
}

export const PriceChart: React.FC<PriceChartProps> = ({ currency }) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('24H');
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);

  // Generate chart points based on current price & timeframe
  const data = useMemo(() => {
    return generateChartData(currency.priceUsd, timeframe);
  }, [currency.priceUsd, timeframe]);

  // Calculate min, max, change for current timeframe
  const prices = data.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  const firstPrice = data[0]?.price || currency.priceUsd;
  const lastPrice = data[data.length - 1]?.price || currency.priceUsd;
  const periodChangePercent = ((lastPrice - firstPrice) / firstPrice) * 100;
  const isPositive = periodChangePercent >= 0;

  // Active display price (either hovered or latest)
  const displayPrice = hoveredPoint ? hoveredPoint.price : lastPrice;
  const displayTime = hoveredPoint ? hoveredPoint.time : 'Current Live';

  // SVG dimensions
  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 20;
  const paddingY = 25;

  // Calculate SVG polyline and polygon points
  const points = data.map((point, index) => {
    const x = paddingX + (index / (data.length - 1)) * (svgWidth - paddingX * 2);
    const normalizedY = (point.price - minPrice) / priceRange;
    const y = svgHeight - paddingY - normalizedY * (svgHeight - paddingY * 2);
    return { x, y, point };
  });

  const pathD = points.reduce((acc, curr, index) => {
    return index === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z`;

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Background glow */}
      <div 
        className={`absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-20 ${
          isPositive ? 'bg-emerald-500' : 'bg-rose-500'
        }`} 
      />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <CoinIcon symbol={currency.symbol} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base sm:text-lg">
                {currency.name} Price Chart
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {currency.symbol}/USD
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-slate-100 font-mono">
                ${formatNumber(displayPrice, 4)}
              </span>
              <span
                className={`text-xs font-semibold flex items-center gap-0.5 ${
                  isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {isPositive ? '+' : ''}{periodChangePercent.toFixed(2)}% ({timeframe})
              </span>
            </div>
          </div>
        </div>

        {/* Timeframe Selectors */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          {(['24H', '7D', '30D', '1Y'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                timeframe === tf
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 my-2 border-b border-slate-800/60 text-xs">
        <div>
          <span className="text-slate-500 block">Period High</span>
          <span className="font-semibold text-slate-200 font-mono">
            ${formatNumber(maxPrice, 2)}
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">Period Low</span>
          <span className="font-semibold text-slate-200 font-mono">
            ${formatNumber(minPrice, 2)}
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">24h Volume</span>
          <span className="font-semibold text-slate-200 font-mono">
            {formatCompact(currency.volume24h)}
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">Market Cap</span>
          <span className="font-semibold text-slate-200 font-mono">
            {formatCompact(currency.marketCap)}
          </span>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative pt-2">
        {/* Tooltip Overlay */}
        <div className="h-6 flex items-center justify-between text-xs text-slate-400 px-1 mb-1">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-indigo-400" />
            {displayTime}
          </span>
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-slate-500" />
            Interactive Sparkline
          </span>
        </div>

        <div className="w-full overflow-hidden relative">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-48 sm:h-56 overflow-visible"
            preserveAspectRatio="none"
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <defs>
              <linearGradient id={`chart-grad-${currency.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={isPositive ? '#10b981' : '#f43f5e'}
                  stopOpacity="0.35"
                />
                <stop
                  offset="100%"
                  stopColor={isPositive ? '#10b981' : '#f43f5e'}
                  stopOpacity="0.0"
                />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            <line
              x1="0"
              y1={paddingY}
              x2={svgWidth}
              y2={paddingY}
              stroke="rgba(148, 163, 184, 0.08)"
              strokeDasharray="4 4"
            />
            <line
              x1="0"
              y1={svgHeight / 2}
              x2={svgWidth}
              y2={svgHeight / 2}
              stroke="rgba(148, 163, 184, 0.08)"
              strokeDasharray="4 4"
            />
            <line
              x1="0"
              y1={svgHeight - paddingY}
              x2={svgWidth}
              y2={svgHeight - paddingY}
              stroke="rgba(148, 163, 184, 0.08)"
              strokeDasharray="4 4"
            />

            {/* Area Fill */}
            <path
              d={areaD}
              fill={`url(#chart-grad-${currency.id})`}
            />

            {/* Price Line */}
            <path
              d={pathD}
              fill="none"
              stroke={isPositive ? '#10b981' : '#f43f5e'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive hover markers */}
            {points.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r="6"
                className="cursor-pointer fill-transparent hover:fill-indigo-400 stroke-transparent hover:stroke-white transition-all"
                strokeWidth="2"
                onMouseEnter={() => setHoveredPoint(pt.point)}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};
