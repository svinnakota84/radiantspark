/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Pause, Play } from 'lucide-react';

export interface MarketItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isUp: boolean;
  volume: string;
  category: 'stock' | 'commodity' | 'currency' | 'ai_metric';
}

const INITIAL_MARKET_DATA: MarketItem[] = [
  { symbol: 'RDNT.US', name: 'Radiant Spark LLC', price: '$84.50', change: '+3.85%', isUp: true, volume: '1.42M', category: 'stock' },
  { symbol: 'SPARKLE.IN', name: 'RDNT Sparkle Drinks', price: '₹420.50', change: '+5.12%', isUp: true, volume: '850K cs', category: 'stock' },
  { symbol: 'OIC-ERP.CLOUD', name: 'Oracle OIC Hub', price: '99.98%', change: '-0.02%', isUp: true, volume: '1.1s Lat', category: 'ai_metric' },
  { symbol: 'SPARKDEALS.IDX', name: 'Live Price Drop Index', price: '142 Deals', change: '+34% Avg', isUp: true, volume: '12K Views', category: 'ai_metric' },
  { symbol: 'ALUMINUM.FUT', name: 'Beverage Can Futures', price: '$2,640/MT', change: '+1.15%', isUp: true, volume: '45K T', category: 'commodity' },
  { symbol: 'HERBAL.EXTRACT', name: 'Botanical Root Stock', price: '$14.20/KG', change: '-0.40%', isUp: false, volume: '12K KG', category: 'commodity' },
  { symbol: 'USD/INR', name: 'Forex Spot Rate', price: '₹84.32', change: '-0.12%', isUp: false, volume: '$4.2B', category: 'currency' },
  { symbol: 'EV-REEFER.EFF', name: 'Tata Ace Fleet Efficiency', price: '3.2 kWh', change: '+0.80%', isUp: true, volume: '2.8°C', category: 'ai_metric' },
  { symbol: 'BTC/USD', name: 'Bitcoin Spot', price: '$94,850', change: '+4.20%', isUp: true, volume: '$38B', category: 'currency' },
  { symbol: 'S&P 500', name: 'US Tech Index', price: '5,920.40', change: '+0.75%', isUp: true, volume: '$120B', category: 'stock' },
];

export const LiveMarketTickerBar: React.FC = () => {
  const [items, setItems] = useState<MarketItem[]>(INITIAL_MARKET_DATA);
  const [isPaused, setIsPaused] = useState(false);
  const [lastUpdatedSymbol, setLastUpdatedSymbol] = useState<string | null>(null);

  // Simulate real-time live price ticks every 2.5 seconds (Webull / LiveTrades style)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setItems((prevItems) => {
        const randomIndex = Math.floor(Math.random() * prevItems.length);
        const target = prevItems[randomIndex];
        const isNumeric = target.price.includes('$') || target.price.includes('₹');
        
        let newPriceStr = target.price;
        let newChangeStr = target.change;
        let newIsUp = target.isUp;

        if (isNumeric) {
          const isUsd = target.price.includes('$');
          const isInr = target.price.includes('₹');
          const prefix = isUsd ? '$' : isInr ? '₹' : '';
          const numVal = parseFloat(target.price.replace(/[^0-9.]/g, ''));
          
          if (!isNaN(numVal)) {
            const deltaPercent = (Math.random() * 0.8 - 0.35); // -0.35% to +0.45%
            const newNum = numVal * (1 + deltaPercent / 100);
            newIsUp = deltaPercent >= 0;
            newPriceStr = `${prefix}${newNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            newChangeStr = `${newIsUp ? '+' : ''}${deltaPercent.toFixed(2)}%`;
          }
        }

        setLastUpdatedSymbol(target.symbol);
        setTimeout(() => setLastUpdatedSymbol(null), 1200);

        return prevItems.map((item, idx) =>
          idx === randomIndex
            ? { ...item, price: newPriceStr, change: newChangeStr, isUp: newIsUp }
            : item
        );
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Duplicate list for infinite smooth CSS loop
  const tickerItems = [...items, ...items];

  return (
    <div className="bg-slate-950 border-y border-slate-800/80 overflow-hidden relative select-none font-mono text-xs">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Left Live Badge & Control */}
        <div className="z-10 bg-slate-950/95 pr-3 pl-3 py-1.5 border-r border-slate-800 flex items-center gap-2 shrink-0 shadow-lg">
          <div className="flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>LIVE MARKETS</span>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title={isPaused ? 'Resume ticker scrolling' : 'Pause ticker scrolling'}
          >
            {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-slate-400" />}
          </button>
        </div>

        {/* Continuous Smooth Scrolling Ticker Tape Track */}
        <div className="overflow-hidden whitespace-nowrap flex-1 py-1.5 relative">
          <div
            className={`inline-flex items-center gap-6 ${
              isPaused ? '' : 'animate-ticker'
            }`}
            style={{
              animationDuration: '35s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
          >
            {tickerItems.map((item, idx) => {
              const isFlashing = lastUpdatedSymbol === item.symbol;
              return (
                <div
                  key={`${item.symbol}-${idx}`}
                  className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded transition-all duration-300 ${
                    isFlashing
                      ? item.isUp
                        ? 'bg-emerald-500/25 border border-emerald-500/60 scale-105'
                        : 'bg-rose-500/25 border border-rose-500/60 scale-105'
                      : 'hover:bg-slate-900/80 border border-transparent'
                  }`}
                >
                  <span className="font-bold text-slate-200">{item.symbol}</span>
                  <span className="text-[10px] text-slate-400 hidden md:inline">
                    {item.name}
                  </span>
                  <span className="font-bold text-white tracking-tight">
                    {item.price}
                  </span>

                  <span
                    className={`inline-flex items-center gap-0.5 font-bold ${
                      item.isUp ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {item.isUp ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {item.change}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Volume / Status Badge */}
        <div className="hidden lg:flex items-center gap-2 z-10 bg-slate-950/95 pl-3 pr-3 py-1.5 border-l border-slate-800 shrink-0 text-[10px] text-slate-400">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>Stream: <strong className="text-slate-200">20ms WebSocket</strong></span>
        </div>
      </div>
    </div>
  );
};
