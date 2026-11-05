/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  LineChart as LineIcon,
  Activity,
  Layers,
  Zap,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  RefreshCw,
} from 'lucide-react';

interface AssetConfig {
  symbol: string;
  name: string;
  basePrice: number;
  currency: string;
  category: string;
  volume: string;
  marketCap: string;
  peRatio: string;
  high24h: string;
  low24h: string;
}

const ASSETS: AssetConfig[] = [
  {
    symbol: 'ORCL',
    name: 'Oracle Corporation (NYSE: ORCL)',
    basePrice: 188.40,
    currency: '$',
    category: 'Enterprise Fusion Cloud & OIC Partner',
    volume: '8.4M shares',
    marketCap: '$518.2B',
    peRatio: '38.2',
    high24h: '$191.20',
    low24h: '$186.10',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation (NASDAQ: NVDA)',
    basePrice: 148.20,
    currency: '$',
    category: 'Enterprise AI & GPU Accelerator Architecture',
    volume: '42.1M shares',
    marketCap: '$3.64T',
    peRatio: '64.5',
    high24h: '$150.50',
    low24h: '$145.80',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc (NASDAQ: AMZN)',
    basePrice: 208.60,
    currency: '$',
    category: 'AWS Cloud & SparkDeals Fulfillment',
    volume: '28.5M shares',
    marketCap: '$2.18T',
    peRatio: '42.1',
    high24h: '$211.40',
    low24h: '$205.20',
  },
  {
    symbol: 'S&P 500',
    name: 'S&P 500 Index (SPX)',
    basePrice: 5920.40,
    currency: 'Pts ',
    category: 'US Benchmark Equity Market',
    volume: '$120B Vol',
    marketCap: '$48.2T',
    peRatio: '26.4',
    high24h: '5,945.10',
    low24h: '5,890.20',
  },
  {
    symbol: 'NIFTY 50',
    name: 'NSE Nifty 50 Index (INDIA)',
    basePrice: 24350.20,
    currency: 'Pts ',
    category: 'India National Stock Exchange Benchmark',
    volume: '₹45,200 Cr',
    marketCap: '₹420L Cr',
    peRatio: '22.8',
    high24h: '24,480.00',
    low24h: '24,210.00',
  },
];

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

interface TradeExecution {
  id: string;
  time: string;
  price: number;
  amount: number;
  type: 'buy' | 'sell';
}

export const RealTimeMarketTerminal: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('ORCL');
  const [chartMode, setChartMode] = useState<'candlestick' | 'line'>('candlestick');
  const [timeframe, setTimeframe] = useState<'1M' | '5M' | '15M' | '1H' | '1D'>('1D');
  const [showMA, setShowMA] = useState(true);
  const [showRSI, setShowRSI] = useState(true);

  const activeAsset = ASSETS.find((a) => a.symbol === selectedSymbol) || ASSETS[0];

  // Dynamic state for live price, candles, order book, and trade stream
  const [currentPrice, setCurrentPrice] = useState<number>(activeAsset.basePrice);
  const [priceChangePct, setPriceChangePct] = useState<number>(3.85);
  const [candles, setCandles] = useState<CandleData[]>([]);
  const [bids, setBids] = useState<OrderBookEntry[]>([]);
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [trades, setTrades] = useState<TradeExecution[]>([]);
  const [orderQuantity, setOrderQuantity] = useState<number>(100);
  const [orderNotification, setOrderNotification] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Re-initialize asset data when symbol changes
  useEffect(() => {
    setCurrentPrice(activeAsset.basePrice);
    setPriceChangePct(3.85);

    // Generate 35 initial candles
    let lastPrice = activeAsset.basePrice * 0.94;
    const initialCandles: CandleData[] = [];
    const now = new Date();

    for (let i = 35; i >= 0; i--) {
      const t = new Date(now.getTime() - i * 60000);
      const timeStr = `${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}`;
      const delta = (Math.random() * 2 - 0.95) * (activeAsset.basePrice * 0.008);
      const open = lastPrice;
      const close = open + delta;
      const high = Math.max(open, close) + Math.random() * (activeAsset.basePrice * 0.004);
      const low = Math.min(open, close) - Math.random() * (activeAsset.basePrice * 0.004);
      const volume = Math.floor(Math.random() * 4000 + 1000);

      initialCandles.push({ time: timeStr, open, high, low, close, volume });
      lastPrice = close;
    }

    setCandles(initialCandles);

    // Generate initial order book
    generateOrderBook(activeAsset.basePrice);

    // Initial trades
    setTrades([
      { id: '1', time: new Date().toLocaleTimeString(), price: activeAsset.basePrice, amount: 250, type: 'buy' },
      { id: '2', time: new Date(Date.now() - 3000).toLocaleTimeString(), price: activeAsset.basePrice - 0.1, amount: 500, type: 'buy' },
      { id: '3', time: new Date(Date.now() - 7000).toLocaleTimeString(), price: activeAsset.basePrice + 0.15, amount: 150, type: 'sell' },
    ]);
  }, [selectedSymbol]);

  const generateOrderBook = (price: number) => {
    const newBids: OrderBookEntry[] = [];
    const newAsks: OrderBookEntry[] = [];
    let bTotal = 0;
    let aTotal = 0;

    for (let i = 1; i <= 6; i++) {
      const bPrice = price - i * (price * 0.001);
      const bAmt = Math.floor(Math.random() * 800 + 150);
      bTotal += bAmt;
      newBids.push({ price: bPrice, amount: bAmt, total: bTotal });

      const aPrice = price + i * (price * 0.001);
      const aAmt = Math.floor(Math.random() * 800 + 150);
      aTotal += aAmt;
      newAsks.push({ price: aPrice, amount: aAmt, total: aTotal });
    }

    setBids(newBids);
    setAsks(newAsks);
  };

  // Real-time live chart loop (Webull ticker ticks)
  useEffect(() => {
    const interval = setInterval(() => {
      const tickChangePct = (Math.random() * 0.6 - 0.28);
      setCurrentPrice((prev) => {
        const nextPrice = Math.max(1, prev * (1 + tickChangePct / 100));
        setPriceChangePct((cp) => parseFloat((cp + tickChangePct * 0.2).toFixed(2)));

        // Update latest candle or push new candle
        setCandles((prevCandles) => {
          if (prevCandles.length === 0) return prevCandles;
          const updated = [...prevCandles];
          const lastCandle = { ...updated[updated.length - 1] };
          lastCandle.close = nextPrice;
          lastCandle.high = Math.max(lastCandle.high, nextPrice);
          lastCandle.low = Math.min(lastCandle.low, nextPrice);
          lastCandle.volume += Math.floor(Math.random() * 50 + 10);
          updated[updated.length - 1] = lastCandle;
          return updated;
        });

        // Add new trade execution
        const newTrade: TradeExecution = {
          id: Math.random().toString(),
          time: new Date().toLocaleTimeString(),
          price: nextPrice,
          amount: Math.floor(Math.random() * 600 + 50),
          type: tickChangePct >= 0 ? 'buy' : 'sell',
        };

        setTrades((prevTrades) => [newTrade, ...prevTrades.slice(0, 14)]);
        generateOrderBook(nextPrice);

        return nextPrice;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  // Draw Webull Candlestick / Line Canvas Chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || candles.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI crispness
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    // Chart dimensions
    const mainChartHeight = showRSI ? height * 0.72 : height - 25;
    const padding = 45;

    // Price range calculation
    let minPrice = Math.min(...candles.map((c) => c.low));
    let maxPrice = Math.max(...candles.map((c) => c.high));
    if (minPrice === maxPrice) {
      minPrice -= 1;
      maxPrice += 1;
    }
    const priceRange = maxPrice - minPrice;

    const getY = (p: number) => mainChartHeight - padding - ((p - minPrice) / priceRange) * (mainChartHeight - padding * 2);
    const candleWidth = (width - padding - 20) / candles.length;

    // Background Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;

    for (let i = 1; i <= 5; i++) {
      const y = (mainChartHeight / 6) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      // Right Axis Price Label
      const pVal = maxPrice - (i / 6) * priceRange;
      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.fillText(`${activeAsset.currency}${pVal.toFixed(2)}`, width - padding + 5, y + 3);
    }

    // Render Candlesticks or Line Chart
    if (chartMode === 'candlestick') {
      candles.forEach((c, idx) => {
        const x = idx * candleWidth + candleWidth / 2;
        const isGreen = c.close >= c.open;
        const color = isGreen ? '#10b981' : '#f43f5e';

        // Wick
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, getY(c.high));
        ctx.lineTo(x, getY(c.low));
        ctx.stroke();

        // Candle Body
        const bodyY = getY(Math.max(c.open, c.close));
        const bodyH = Math.max(2, Math.abs(getY(c.open) - getY(c.close)));
        ctx.fillStyle = color;
        ctx.fillRect(x - candleWidth * 0.35, bodyY, candleWidth * 0.7, bodyH);
      });
    } else {
      // Smooth Line Chart Mode with Gradient Fill
      ctx.beginPath();
      candles.forEach((c, idx) => {
        const x = idx * candleWidth + candleWidth / 2;
        const y = getY(c.close);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Fill Gradient under line
      const gradient = ctx.createLinearGradient(0, 0, 0, mainChartHeight);
      gradient.addColorStop(0, 'rgba(56, 189, 248, 0.3)');
      gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');

      ctx.lineTo((candles.length - 1) * candleWidth + candleWidth / 2, mainChartHeight);
      ctx.lineTo(candleWidth / 2, mainChartHeight);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Draw Moving Averages if enabled
    if (showMA && candles.length > 5) {
      // MA20 (Green)
      ctx.beginPath();
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 1.5;
      candles.forEach((_, idx) => {
        if (idx < 5) return;
        const slice = candles.slice(idx - 5, idx);
        const avg = slice.reduce((acc, curr) => acc + curr.close, 0) / slice.length;
        const x = idx * candleWidth + candleWidth / 2;
        const y = getY(avg);
        if (idx === 5) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    // Sub-chart: Volume Bars & RSI Oscillator Panel
    if (showRSI) {
      const subY = mainChartHeight + 10;
      const subH = height - subY - 15;

      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, subY, width, subH);

      ctx.strokeStyle = '#334155';
      ctx.strokeRect(0, subY, width - padding, subH);

      // Label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px monospace';
      ctx.fillText('RSI (14) & VOL DEPTH', 10, subY + 12);

      // Volume Bars
      const maxVol = Math.max(...candles.map((c) => c.volume));
      candles.forEach((c, idx) => {
        const x = idx * candleWidth + candleWidth / 2;
        const vH = (c.volume / maxVol) * (subH - 15);
        const color = c.close >= c.open ? 'rgba(16, 185, 129, 0.6)' : 'rgba(244, 63, 94, 0.6)';
        ctx.fillStyle = color;
        ctx.fillRect(x - candleWidth * 0.3, subY + subH - vH, candleWidth * 0.6, vH);
      });
    }
  }, [candles, chartMode, showMA, showRSI]);

  const handleExecuteOrder = (type: 'buy' | 'sell') => {
    const totalVal = (currentPrice * orderQuantity).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setOrderNotification(
      `⚡ SIMULATED ${type.toUpperCase()} EXECUTED: ${orderQuantity} units of ${activeAsset.symbol} @ ${activeAsset.currency}${currentPrice.toFixed(
        2
      )} (Total: ${activeAsset.currency}${totalVal})`
    );
    setTimeout(() => setOrderNotification(null), 5000);
  };

  return (
    <div className="rounded-3xl bg-[#030712] border-2 border-slate-800 shadow-2xl overflow-hidden font-sans">
      {/* Top Header Bar: Webull/LiveTrades Asset Selector & Market Overview */}
      <div className="bg-slate-950 p-4 sm:p-6 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Asset Selection Buttons */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              WEBULL &amp; LIVETRADES INTERACTIVE TERMINAL
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {ASSETS.map((asset) => (
              <button
                key={asset.symbol}
                onClick={() => setSelectedSymbol(asset.symbol)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedSymbol === asset.symbol
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.02]'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{asset.symbol}</span>
                <span className="text-[10px] opacity-70 font-mono">
                  {asset.currency}
                  {asset.basePrice.toFixed(2)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Asset Price Display */}
        <div className="flex items-center gap-6 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 shrink-0">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
              {activeAsset.name}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono tracking-tight">
                {activeAsset.currency}
                {currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span
                className={`text-xs font-mono font-bold flex items-center gap-0.5 ${
                  priceChangePct >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {priceChangePct >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {priceChangePct >= 0 ? '+' : ''}
                {priceChangePct.toFixed(2)}%
              </span>
            </div>
          </div>

          <div className="hidden sm:grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-mono border-l border-slate-800 pl-4 text-slate-300">
            <div>
              <span className="text-slate-500">24h High: </span>
              <span className="text-emerald-400 font-bold">{activeAsset.high24h}</span>
            </div>
            <div>
              <span className="text-slate-500">24h Vol: </span>
              <span className="text-white font-bold">{activeAsset.volume}</span>
            </div>
            <div>
              <span className="text-slate-500">24h Low: </span>
              <span className="text-rose-400 font-bold">{activeAsset.low24h}</span>
            </div>
            <div>
              <span className="text-slate-500">Mkt Cap: </span>
              <span className="text-amber-400 font-bold">{activeAsset.marketCap}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Notification Banner */}
      {orderNotification && (
        <div className="bg-emerald-950/90 border-b border-emerald-500/50 p-3 px-6 text-xs text-emerald-200 font-mono font-bold flex items-center justify-between animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{orderNotification}</span>
          </div>
          <button onClick={() => setOrderNotification(null)} className="text-emerald-400 hover:text-white text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Main Terminal Body: 3 Column Layout (Chart + Order Book + Trade Stream / Control) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left / Center Panel (8 cols): Real-Time Canvas Chart */}
        <div className="lg:col-span-8 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-4">
          {/* Chart Controls Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            {/* Chart Type Toggle */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1">
              <button
                onClick={() => setChartMode('candlestick')}
                className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                  chartMode === 'candlestick' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Candles</span>
              </button>
              <button
                onClick={() => setChartMode('line')}
                className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                  chartMode === 'line' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <LineIcon className="w-3.5 h-3.5" />
                <span>Line</span>
              </button>
            </div>

            {/* Timeframe Buttons */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1">
              {(['1M', '5M', '15M', '1H', '1D'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                    timeframe === tf ? 'bg-slate-800 text-amber-300' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Technical Indicator Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMA(!showMA)}
                className={`px-2.5 py-1 rounded-lg border font-bold transition-colors ${
                  showMA ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                MA20
              </button>
              <button
                onClick={() => setShowRSI(!showRSI)}
                className={`px-2.5 py-1 rounded-lg border font-bold transition-colors ${
                  showRSI ? 'bg-purple-950/60 border-purple-500/50 text-purple-300' : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                RSI &amp; Vol
              </button>
            </div>
          </div>

          {/* HTML5 Canvas Chart Viewport */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Overlay Watermark */}
            <div className="absolute top-3 left-4 pointer-events-none text-[11px] font-mono text-slate-600 font-bold uppercase">
              RADIANT SPARK GLOBAL · LIVE STREAMING FEED
            </div>
          </div>

          {/* Live Market Sentiment Bar */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 font-mono">
              <span className="text-slate-400 font-bold">Market Sentiment:</span>
              <span className="text-emerald-400 font-extrabold">82% Bullish</span>
              <span className="text-slate-600">|</span>
              <span className="text-rose-400">18% Bearish</span>
            </div>

            <div className="w-full sm:w-48 h-2 rounded-full bg-slate-800 overflow-hidden flex">
              <div className="h-full bg-emerald-500 w-[82%]"></div>
              <div className="h-full bg-rose-500 w-[18%]"></div>
            </div>
          </div>
        </div>

        {/* Right Panel (4 cols): Webull Order Book & Live Execution Simulator */}
        <div className="lg:col-span-4 p-4 sm:p-6 space-y-5 bg-slate-950/50">
          {/* Level 2 Depth Order Book */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                Level 2 Order Book Depth
              </span>
              <span className="text-[10px] text-slate-400">Spread: 0.05</span>
            </div>

            {/* Asks (Sell Orders - Red) */}
            <div className="space-y-1 font-mono text-[11px]">
              <div className="grid grid-cols-3 text-slate-500 font-bold pb-1 text-[10px] uppercase">
                <span>Price</span>
                <span className="text-right">Size</span>
                <span className="text-right">Total</span>
              </div>

              {asks.slice(0, 4).reverse().map((ask, idx) => (
                <div key={`ask-${idx}`} className="grid grid-cols-3 relative py-0.5 px-1 rounded hover:bg-rose-950/30">
                  <span className="text-rose-400 font-bold">
                    {activeAsset.currency}{ask.price.toFixed(2)}
                  </span>
                  <span className="text-right text-slate-300">{ask.amount}</span>
                  <span className="text-right text-slate-400">{ask.total}</span>
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-rose-500/15 pointer-events-none rounded"
                    style={{ width: `${Math.min(100, (ask.amount / 1000) * 100)}%` }}
                  />
                </div>
              ))}
            </div>

            {/* Current Price Banner */}
            <div className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400 font-bold">Last Executed:</span>
              <span className="text-white font-extrabold text-sm">
                {activeAsset.currency}{currentPrice.toFixed(2)}
              </span>
            </div>

            {/* Bids (Buy Orders - Green) */}
            <div className="space-y-1 font-mono text-[11px]">
              {bids.slice(0, 4).map((bid, idx) => (
                <div key={`bid-${idx}`} className="grid grid-cols-3 relative py-0.5 px-1 rounded hover:bg-emerald-950/30">
                  <span className="text-emerald-400 font-bold">
                    {activeAsset.currency}{bid.price.toFixed(2)}
                  </span>
                  <span className="text-right text-slate-300">{bid.amount}</span>
                  <span className="text-right text-slate-400">{bid.total}</span>
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-emerald-500/15 pointer-events-none rounded"
                    style={{ width: `${Math.min(100, (bid.amount / 1000) * 100)}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Trade Order Placement Simulator */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5 uppercase">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulate Webull Execution</span>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Quantity (Units / Shares / Cases)
              </label>
              <input
                type="number"
                min="1"
                max="50000"
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value || '100', 10)))}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="text-[11px] font-mono flex justify-between text-slate-400 border-t border-slate-800 pt-2">
              <span>Estimated Value:</span>
              <span className="text-white font-bold">
                {activeAsset.currency}
                {(currentPrice * orderQuantity).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
              <button
                type="button"
                onClick={() => handleExecuteOrder('buy')}
                className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase shadow-md shadow-emerald-600/30 transition-transform active:scale-95"
              >
                BUY / LONG ↗
              </button>
              <button
                type="button"
                onClick={() => handleExecuteOrder('sell')}
                className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase shadow-md shadow-rose-600/30 transition-transform active:scale-95"
              >
                SELL / SHORT ↘
              </button>
            </div>
          </div>

          {/* Time & Sales Trade Stream */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 border-b border-slate-800 pb-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-purple-400" />
                Time &amp; Sales Stream
              </span>
              <span className="text-[10px]">Real-Time Feed</span>
            </div>

            <div className="max-h-36 overflow-y-auto space-y-1 font-mono text-[10px] pr-1">
              {trades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between py-1 border-b border-slate-900 text-slate-300">
                  <span className="text-slate-500">{trade.time}</span>
                  <span className="font-bold text-slate-200">
                    {activeAsset.currency}{trade.price.toFixed(2)}
                  </span>
                  <span className={`font-bold ${trade.type === 'buy' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {trade.amount} {trade.type.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
