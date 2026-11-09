import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  priceUsd: number;
}

// Card details are never typed into this site. Checkout happens on a Stripe-hosted page
// (Stripe Payment Link). Set VITE_STRIPE_LINKS to JSON: {"Plan name":"https://buy.stripe.com/..."}
function paymentLink(planName: string): string | null {
  try {
    const links = JSON.parse((import.meta.env.VITE_STRIPE_LINKS as string) || '{}');
    const url = links[planName];
    if (typeof url !== 'string') return null;
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname === 'buy.stripe.com' && !parsed.username && !parsed.password && !parsed.port && parsed.pathname.length > 1 && !parsed.pathname.startsWith('/test_') ? parsed.href : null;
  } catch {
    return null;
  }
}

export const StripeSubscriptionModal: React.FC<Props> = ({ isOpen, onClose, planName, priceUsd }) => {
  if (!isOpen) return null;
  const link = paymentLink(planName);
  const email = import.meta.env.VITE_CONTACT_EMAIL as string | undefined;
  return (
    <div role="dialog" aria-modal="true" aria-label={planName} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={onClose}>
      <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold text-white">{planName}</h2>
          <button autoFocus aria-label="Close" onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <p className="mt-2 text-sm">Review the current price, currency, billing frequency and cancellation terms on Stripe before paying. Your bank may apply conversion fees.</p>
        {link ? (
          <>
            <a href={link} target="_blank" rel="noopener noreferrer" className="mt-5 block text-center py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold">
              Continue to secure checkout on Stripe
            </a>
            <p className="mt-3 flex items-center gap-2 text-xs text-slate-400"><ShieldCheck className="w-4 h-4 shrink-0" />You enter card details on Stripe’s page, not on this site.</p>
          </>
        ) : (
          <>
            <p className="mt-5 text-sm text-slate-300">Online checkout is not open yet, so no payment can be taken here.</p>
            {email && <a href={`mailto:${email}?subject=${encodeURIComponent(planName)}`} className="mt-4 block text-center py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold">Email us to join the waitlist</a>}
          </>
        )}
      </div>
    </div>
  );
};
