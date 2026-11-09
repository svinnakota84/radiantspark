import React, { useEffect, useState } from 'react';

// Real quotes from Finnhub when VITE_FINNHUB_KEY is set. Without a key, an honest notice is shown.
// Note: a key in browser code is visible to visitors. Use a free/restricted key, or proxy via a serverless function.
const KEY = import.meta.env.VITE_FINNHUB_KEY as string | undefined;
const SYMBOLS = ['SPY', 'QQQ', 'AAPL', 'MSFT', 'NVDA'];

interface Quote { symbol: string; price: number; changePct: number; time: number }

function usSessionOpen(now = new Date()): boolean {
  const p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(now);
  const get = (t: string) => p.find((x) => x.type === t)?.value ?? '';
  if (get('weekday') === 'Sat' || get('weekday') === 'Sun') return false;
  const mins = (parseInt(get('hour'), 10) % 24) * 60 + parseInt(get('minute'), 10);
  return mins >= 570 && mins < 960; // 9:30-16:00 ET; exchange holidays are not modeled
}

export const LiveMarketTickerBar: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(usSessionOpen());

  useEffect(() => {
    if (!KEY) return;
    let stopped = false;
    const load = async () => {
      try {
        const res = await Promise.all(
          SYMBOLS.map(async (s) => {
            const r = await fetch(`https://finnhub.io/api/v1/quote?symbol=${s}&token=${KEY}`);
            if (!r.ok) throw new Error('bad status');
            const q = await r.json();
            return { symbol: s, price: q.c, changePct: q.dp, time: q.t } as Quote;
          })
        );
        if (!stopped) { setQuotes(res.filter((q) => Number.isFinite(q.price) && q.price > 0 && Number.isFinite(q.changePct) && Number.isFinite(q.time) && q.time > 0)); setError(false); }
      } catch {
        if (!stopped) { setError(true); setQuotes([]); }
      }
      if (!stopped) setOpen(usSessionOpen());
    };
    load();
    // Poll every minute while the US session is open; otherwise refresh every 15 minutes.
    const id = setInterval(() => { if (usSessionOpen()) load(); }, 60_000);
    const slow = setInterval(() => { if (!usSessionOpen()) load(); }, 900_000);
    return () => { stopped = true; clearInterval(id); clearInterval(slow); };
  }, []);

  if (!KEY) {
    return <aside className="p-3 bg-slate-950 text-amber-200 text-center text-sm">Market data is not connected on this site. <a href="https://www.nasdaq.com/market-activity" target="_blank" rel="noopener noreferrer" className="underline">View market activity</a></aside>;
  }
  if (error) {
    return <aside className="p-3 bg-slate-950 text-amber-200 text-center text-sm">Market data is temporarily unavailable.</aside>;
  }
  if (quotes.length === 0) return <aside className="p-3 bg-slate-950 text-slate-300 text-center text-sm">Waiting for market quotes. Data may be delayed.</aside>;
  const asOf = quotes[0] ? new Date(quotes[0].time * 1000).toLocaleString() : '';
  return (
    <aside aria-label="Market quotes" className="px-4 py-2 bg-slate-950 text-slate-200 text-sm flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
      <span className={open ? 'text-emerald-400' : 'text-slate-400'}>{open ? 'US regular session hours' : 'Outside regular hours: last quote shown'}</span>
      {quotes.map((q) => (
        <span key={q.symbol}>{q.symbol} {q.price.toFixed(2)} <span className={q.changePct >= 0 ? 'text-emerald-400' : 'text-red-400'}>{q.changePct >= 0 ? '+' : ''}{q.changePct?.toFixed(2)}%</span></span>
      ))}
      <span className="text-xs text-slate-500">Quote timestamp {asOf}. Data may be delayed. For information only, not investment advice.</span>
    </aside>
  );
};
