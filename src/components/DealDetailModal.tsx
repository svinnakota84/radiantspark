import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { DealItem } from '../types';
import { storeLinks } from './SparkDealsView';

interface Props {
  deal: DealItem | null;
  onClose: () => void;
  onOpenLegalShield: () => void;
}

export const DealDetailModal: React.FC<Props> = ({ deal, onClose, onOpenLegalShield }) => {
  if (!deal) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={deal.title} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={onClose}>
      <div className="w-full max-w-lg p-6 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold text-white">{deal.title}</h2>
          <button autoFocus aria-label="Close" onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <p className="mt-3 text-sm">{deal.description}</p>
        {deal.price && deal.priceCheckedAt && (
          <p className="mt-3 text-sm"><strong>{deal.price}</strong> <span className="text-slate-500">· checked {deal.priceCheckedAt}</span></p>
        )}
        <p className="mt-4 text-sm text-slate-400">
          Price, stock, delivery, taxes and returns are set by the seller and can change at any time. Check them on the store page before you buy.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {storeLinks(deal).map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-semibold">
              {s.label} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
        <button onClick={() => { onClose(); onOpenLegalShield(); }} className="mt-5 text-sm underline text-amber-300">Customer information and affiliate disclosure</button>
      </div>
    </div>
  );
};
