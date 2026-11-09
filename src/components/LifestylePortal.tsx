import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

interface LifestylePortalProps {
  onOpenStripeModal?: (planName: string, priceUsd: number) => void;
}

export const LifestylePortal: React.FC<LifestylePortalProps> = ({ onOpenStripeModal }) => (
  <section className="max-w-3xl mx-auto py-12 px-6 space-y-6">
    <Sparkles className="w-10 h-10 text-emerald-400" />
    <h1 className="text-3xl sm:text-5xl font-bold text-white">Lifestyle & wellness</h1>
    <p className="text-slate-300 text-lg">Explore Radiant Spark’s lifestyle subscription offering.</p>
    <div className="rounded-2xl border border-amber-500/40 bg-slate-900 p-6 space-y-4">
      <h2 className="text-xl font-semibold text-white">Service availability</h2>
      <p className="text-slate-300">Personalized diet plans, AI coaching, member accounts and automated WhatsApp updates are not connected on this website. We are not collecting health details here.</p>
      <p className="text-slate-300">If checkout is available, review the service description, price, billing frequency and cancellation terms on Stripe before paying. Payment alone does not activate a member account here.</p>
      <button type="button" disabled={!onOpenStripeModal} onClick={() => onOpenStripeModal?.('Pro Lifestyle & Diet Subscription', 29)} className="rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 px-6 py-3 font-semibold text-white">Check subscription availability</button>
    </div>
    <a className="inline-flex items-center gap-2 text-emerald-300 underline" href="https://lifestyle.radiantsparkllc.com" target="_blank" rel="noopener noreferrer">Visit Lifestyle Hub <ExternalLink className="w-4 h-4" /></a>
  </section>
);
