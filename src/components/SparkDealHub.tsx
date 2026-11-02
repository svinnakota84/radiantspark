/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { DealItem } from '../types';
import { CATEGORIES } from '../data/dealsData';
import {
  Flame,
  Search,
  ExternalLink,
  Copy,
  Check,
  Tag,
  ShieldCheck,
  Clock,
  Sparkles,
  Info,
  DollarSign,
  PlusCircle,
  Zap,
  TrendingUp,
  Percent
} from 'lucide-react';

interface SparkDealHubProps {
  deals: DealItem[];
  onVoteDeal: (dealId: string) => void;
  onSelectDealModal: (deal: DealItem) => void;
  onOpenLegalShield: () => void;
}

export const SparkDealHub: React.FC<SparkDealHubProps> = ({
  deals,
  onVoteDeal,
  onSelectDealModal,
  onOpenLegalShield,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'hot' | 'discount' | 'priceAsc' | 'priceDesc'>('hot');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [showAffiliateModelInfo, setShowAffiliateModelInfo] = useState<boolean>(false);
  const [dealSubmissionSuccess, setDealSubmissionSuccess] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // New deal proposal state
  const [newDealTitle, setNewDealTitle] = useState('');
  const [newDealPrice, setNewDealPrice] = useState('');
  const [newDealMerchant, setNewDealMerchant] = useState('');

  const filteredDeals = useMemo(() => {
    return deals
      .filter((d) => {
        const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
        const matchesSearch =
          d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'hot') return b.score - a.score;
        if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
        if (sortBy === 'priceAsc') return a.currentPrice - b.currentPrice;
        if (sortBy === 'priceDesc') return b.currentPrice - a.currentPrice;
        return 0;
      });
  }, [deals, selectedCategory, searchQuery, sortBy]);

  const handleCopyCode = (dealId: string, code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCodeId(dealId);
    setTimeout(() => {
      setCopiedCodeId(null);
    }, 2500);
  };

  const handleOpenAffiliateLink = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmitDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDealTitle.trim()) return;
    setDealSubmissionSuccess(true);
    setTimeout(() => {
      setShowSubmitModal(false);
      setDealSubmissionSuccess(false);
      setNewDealTitle('');
      setNewDealPrice('');
      setNewDealMerchant('');
    }, 2000);
  };

  return (
    <section id="sparkdeal-hub" className="py-12 border-t border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Flame className="w-4 h-4 fill-amber-400" />
                India Curated Steals &amp; Syndication
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">Revenue-Generating Affiliate Model</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              SparkDeal Hub <span className="text-amber-400 font-serif italic">for India</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Hand-picked and verified steals across Clean Energy, Electronics, Sparkle Beverages, and Organics.
              Real savings, verified coupon codes, and ASCI-compliant commercial transparency.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowAffiliateModelInfo(!showAffiliateModelInfo)}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5 text-blue-400" />
              Affiliate Model Disclosure
            </button>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Submit a Deal
            </button>
          </div>
        </div>

        {/* Affiliate Model Transparent Explainer Banner */}
        {showAffiliateModelInfo && (
          <div className="mb-8 p-5 rounded-2xl bg-slate-900/90 border border-blue-500/30 text-xs text-slate-300 relative">
            <button
              onClick={() => setShowAffiliateModelInfo(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                  Transparent Revenue-Generating Affiliate Model (Zero Extra Cost to You)
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 uppercase font-mono">
                    ASCI Compliant
                  </span>
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  SparkDeal Hub operates on a <strong>revenue-generating performance affiliate model</strong>. When you click our
                  affiliate referral links (such as Amazon India, Flipkart, or Tata Neu) and complete a qualified purchase,
                  the merchant pays us a commission (typically 1.5% - 8%) from their marketing budget.
                  <strong> It never costs you a single rupee extra.</strong> In fact, our verified coupon codes provide net price reductions.
                  Our editorial curation remains 100% independent of affiliate rates.
                </p>
                <div className="mt-3 flex items-center gap-4 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> Intermediary Safe Harbour Active
                  </span>
                  <span>·</span>
                  <button
                    onClick={onOpenLegalShield}
                    className="text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    Read India Legal Shield &amp; CPA 2019 Terms ↗
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search, Filter Tabs & Sort Controls */}
        <div className="space-y-4 mb-8">
          {/* Top row: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search deals by title, keyword, or merchant (e.g. Solar, GaN, Tata, Earbuds)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <span className="text-xs text-slate-400 shrink-0">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort deals"
                className="w-full sm:w-auto bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="hot">🔥 Most Popular (Hot Deals)</option>
                <option value="discount">⚡ Highest Discount %</option>
                <option value="priceAsc">₹ Price: Low to High</option>
                <option value="priceDesc">₹ Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-1">
          <div>
            Showing <span className="font-semibold text-white">{filteredDeals.length}</span> verified deals in India
          </div>
          <div className="flex items-center gap-1 text-[11px] text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            Live sync updated 4 minutes ago via SparkSync
          </div>
        </div>

        {/* Curated Deal Grid */}
        {filteredDeals.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
            <Tag className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-semibold text-sm">No deals found matching your criteria</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for other terms or reset the category filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredDeals.map((deal) => {
              const savingsAmount = deal.originalPrice - deal.currentPrice;
              const hasUpvoted = deal.upvoted;

              return (
                <article
                  key={deal.id}
                  onClick={() => onSelectDealModal(deal)}
                  className="group rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 hover:bg-slate-900/90 transition-all duration-200 flex flex-col overflow-hidden cursor-pointer shadow-lg hover:shadow-amber-500/5 relative"
                >
                  {/* Image Container with Badges */}
                  <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                    <img
                      src={deal.imageUrl}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

                    {/* Top Discount Tag */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="bg-rose-600 text-white font-extrabold text-[11px] px-2 py-0.5 rounded-lg shadow-md font-mono">
                        {deal.discountPercent}% OFF
                      </span>
                      {deal.badges[0] && (
                        <span className="bg-slate-900/90 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-lg border border-amber-400/20 backdrop-blur-sm">
                          {deal.badges[0]}
                        </span>
                      )}
                    </div>

                    {/* Expiry Badge */}
                    <div className="absolute bottom-2 left-2.5 text-[10px] text-slate-300 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {deal.expiresInHours}h left
                    </div>

                    {/* Merchant Tag */}
                    <div className="absolute top-2.5 right-2.5 text-[10px] font-medium text-slate-200 bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-700/50 backdrop-blur-sm">
                      {deal.merchant.split('/')[0].trim()}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h3 className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                        {deal.title}
                      </h3>

                      {/* Pricing block */}
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-xl font-black text-amber-400 font-mono tracking-tight">
                          ₹{deal.currentPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-500 line-through font-mono">
                          ₹{deal.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-400 font-mono bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/40">
                          Save ₹{savingsAmount.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {deal.description}
                      </p>
                    </div>

                    {/* Interactive Bottom Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      {/* Fire Upvote Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onVoteDeal(deal.id);
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1 border ${
                          hasUpvoted
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-sm'
                            : 'bg-slate-800/70 text-slate-300 border-slate-700 hover:bg-amber-500/10 hover:text-amber-300 hover:border-amber-400/30'
                        }`}
                        title="Upvote this deal"
                      >
                        <Flame className={`w-3.5 h-3.5 ${hasUpvoted ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
                        <span>{deal.score}</span>
                      </button>

                      {/* Coupon Code Pill */}
                      {deal.couponCode && (
                        <button
                          type="button"
                          onClick={(e) => handleCopyCode(deal.id, deal.couponCode!, e)}
                          className="px-2 py-1 rounded-lg text-[10px] font-mono text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 flex items-center gap-1 transition-colors"
                          title="Click to copy coupon code"
                        >
                          {copiedCodeId === deal.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-slate-400" />
                              <span>{deal.couponCode}</span>
                            </>
                          )}
                        </button>
                      )}

                      {/* Direct Store Action Buttons (Amazon India / Amazon USA / Merchant) */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {deal.amazonIndiaUrl && (
                          <button
                            type="button"
                            onClick={(e) => handleOpenAffiliateLink(deal.amazonIndiaUrl!, e)}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all flex items-center gap-1 shadow-sm"
                            title="Direct Product Page on Amazon India"
                          >
                            <span>🇮🇳 Amazon IN</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                        {deal.amazonUsaUrl && (
                          <button
                            type="button"
                            onClick={(e) => handleOpenAffiliateLink(deal.amazonUsaUrl!, e)}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-1 shadow-sm"
                            title="Direct Product Page on Amazon USA"
                          >
                            <span>🇺🇸 Amazon US</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                        {!deal.amazonIndiaUrl && !deal.amazonUsaUrl && (
                          <button
                            type="button"
                            onClick={(e) => handleOpenAffiliateLink(deal.affiliateUrl, e)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-1 shadow-sm"
                            title="Go to merchant deal page"
                          >
                            <span>Get Deal</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Affiliate Bottom Notice & Safe Harbour Badge */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300 font-mono">ASCI &amp; FTC DISCLOSURE:</span>
            <span>Outbound affiliate links support platform operations at 0 extra consumer cost.</span>
          </div>
          <button
            onClick={onOpenLegalShield}
            className="text-amber-400 hover:text-amber-300 font-semibold underline shrink-0"
          >
            Review India Intermediary &amp; Legal Shield ↗
          </button>
        </div>

        {/* Deal Submission Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl relative">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                ✕
              </button>
              <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                Submit a Curated Deal for India
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Share a hot deal with the Radiant Spark community. Our automated engine checks prices before syndication.
              </p>

              {dealSubmissionSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-600/40 text-center py-6">
                  <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-emerald-300">Deal Queued for Verification!</p>
                  <p className="text-xs text-emerald-400/80 mt-1">
                    SparkSync engine is validating merchant stock and price history.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitDeal} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Deal Title or Product Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5kW Bifacial Solar Panel Combo..."
                      value={newDealTitle}
                      onChange={(e) => setNewDealTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Deal Price (₹ INR)</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 1999"
                        value={newDealPrice}
                        onChange={(e) => setNewDealPrice(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Merchant Store</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Amazon IN, Flipkart"
                        value={newDealMerchant}
                        onChange={(e) => setNewDealMerchant(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Product URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
                    >
                      Submit for Automated Syndication
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
