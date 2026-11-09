import React, { useMemo, useState } from 'react';
import { Search, ExternalLink, Info } from 'lucide-react';
import { DealItem } from '../types';
import { HAS_AFFILIATE_TAGS } from '../data/dealsData';

interface Props {
  deals: DealItem[];
  isLiveFeed: boolean;
  onSelectDealModal: (deal: DealItem) => void;
  onOpenLegalShield: () => void;
}

const STORES = [
  { id: 'all', label: 'All stores' },
  { id: 'amazonUsaUrl', label: 'Amazon US' },
  { id: 'amazonIndiaUrl', label: 'Amazon India' },
  { id: 'walmartUrl', label: 'Walmart' },
  { id: 'flipkartUrl', label: 'Flipkart' },
] as const;

const CATEGORIES = ['all', 'electronics', 'energy', 'logistics', 'food', 'beverages'];

export const storeLinks = (d: DealItem) =>
  [
    { label: 'Amazon US', url: d.amazonUsaUrl },
    { label: 'Amazon India', url: d.amazonIndiaUrl },
    { label: 'Walmart', url: d.walmartUrl },
    { label: 'Flipkart', url: d.flipkartUrl },
  ].filter((s): s is { label: string; url: string } => Boolean(s.url));

export const SparkDealsView: React.FC<Props> = ({ deals, isLiveFeed, onSelectDealModal, onOpenLegalShield }) => {
  const [store, setStore] = useState<string>('all');
  const [category, setCategory] = useState<string>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      deals.filter((d) => {
        if (store !== 'all' && !(d as any)[store]) return false;
        if (category !== 'all' && d.category !== category) return false;
        const q = query.trim().toLowerCase();
        return !q || `${d.title} ${d.description}`.toLowerCase().includes(q);
      }),
    [deals, store, category, query]
  );

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white">SparkDeals</h1>
      <p className="mt-3 max-w-2xl text-slate-300">
        Find products and jump straight to the store that sells them. Prices change constantly, so we send you to the
        seller’s page for the current price, stock, delivery and returns.
      </p>
      <p className="mt-3 flex items-start gap-2 text-sm text-slate-400 max-w-2xl">
        <Info className="w-4 h-4 mt-0.5 shrink-0" />
        <span>
          {HAS_AFFILIATE_TAGS
            ? 'Some links are affiliate links: if you buy through them we may earn a commission at no extra cost to you. As an Amazon Associate we earn from qualifying purchases.'
            : 'No Amazon affiliate tags are configured for curated search links. External feed links may have their own referral parameters.'}{' '}
          <button className="underline text-amber-300" onClick={onOpenLegalShield}>Read our customer information</button>
        </span>
      </p>

      <div className="mt-8 flex flex-wrap gap-3 items-center">
        <label className="relative flex-1 min-w-[220px] max-w-md">
          <span className="sr-only">Search products</span>
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products"
            className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-amber-400 focus:outline-none"
          />
        </label>
        <select aria-label="Store" value={store} onChange={(e) => setStore(e.target.value)} className="px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white">
          {STORES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        <select aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white capitalize">
          {CATEGORIES.map((c) => <option key={c} value={c}>{c === 'all' ? 'All categories' : c}</option>)}
        </select>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        {isLiveFeed ? 'Showing the configured product feed. Prices include the supplied check time; confirm current terms with the seller.' : 'No live price feed is connected, so no prices are shown.'}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 text-slate-400">No products match. Clear the search or choose another store.</p>
      ) : (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <li key={d.id} className="flex flex-col p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              {d.imageUrl && <img src={d.imageUrl} alt="" loading="lazy" className="w-full h-40 object-contain rounded-lg bg-white mb-4" />}
              <span className="text-xs text-amber-300 capitalize">{d.category}</span>
              <h2 className="mt-1 text-lg font-bold text-white leading-snug">{d.title}</h2>
              <p className="mt-2 text-sm text-slate-400 flex-1">{d.description}</p>
              {d.price && d.priceCheckedAt && (
                <p className="mt-3 text-sm text-slate-200">
                  <strong>{d.price}</strong> <span className="text-slate-500">· checked {d.priceCheckedAt}. Confirm on the store page.</span>
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {storeLinks(d).map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer sponsored"
                     className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-semibold">
                    {s.label} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
                <button onClick={() => onSelectDealModal(d)} className="px-3 py-2 rounded-lg border border-slate-600 text-slate-200 text-sm hover:border-slate-400">
                  Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
