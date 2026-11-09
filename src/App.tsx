/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CountryView, DealItem } from './types';
import { LanguageCode } from './utils/translations';
import { INITIAL_DEALS } from './data/dealsData';
import { loadDealsFeed } from './utils/dealsFeed';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GlobalView } from './components/GlobalView';
import { IndiaView } from './components/IndiaView';
import { UsaView } from './components/UsaView';
import { SparkSyncModal } from './components/SparkSyncModal';
import { DealDetailModal } from './components/DealDetailModal';
import { RadiantAssistantModal } from './components/RadiantAssistantModal';
import { TakedownModal } from './components/TakedownModal';
import { DownloadAppModal } from './components/DownloadAppModal';
import { CinematicOrb3D } from './components/CinematicOrb3D';
import { SparkDealsView } from './components/SparkDealsView';
import { AiBrainView } from './components/AiBrainView';
import { LiveMarketTickerBar } from './components/LiveMarketTickerBar';
import { LifestylePortal } from './components/LifestylePortal';
import { StripeSubscriptionModal } from './components/StripeSubscriptionModal';
import { Zap, HelpCircle, ShieldCheck, Check, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<CountryView>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'india' || hash === 'usa' || hash === 'sparkdeals' || hash === 'brain' || hash === 'lifestyle') return hash as CountryView;
    return 'global';
  });
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [deals, setDeals] = useState<DealItem[]>(INITIAL_DEALS);
  const [isLiveFeed, setIsLiveFeed] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<DealItem | null>(null);
  const [isSparkSyncOpen, setIsSparkSyncOpen] = useState(false);
  const [isDownloadAppOpen, setIsDownloadAppOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isTakedownOpen, setIsTakedownOpen] = useState(false);
  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);
  const [stripePlanName, setStripePlanName] = useState('Pro Lifestyle Subscription');
  const [stripePriceUsd, setStripePriceUsd] = useState(29);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    loadDealsFeed().then((feed) => {
      if (feed) { setDeals(feed); setIsLiveFeed(true); }
    });
  }, []);

  React.useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'india' || hash === 'usa' || hash === 'sparkdeals' || hash === 'brain' || hash === 'lifestyle' || hash === 'global') {
        setCurrentView(hash as CountryView);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleNavigateView = (view: CountryView) => {
    setCurrentView(view);
    if (view === 'global') {
      history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLegalShieldSection = () => {
    if (currentView !== 'india') {
      setCurrentView('india');
      setTimeout(() => {
        const el = document.getElementById('legal-shield');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('legal-shield');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712]/75 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative">
      {/* 3D Cinematic Atmosphere Orb Background (Cross-device normalized) */}
      {currentView !== 'global' && <CinematicOrb3D variant={currentView} />}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 border border-blue-500/50 shadow-2xl text-xs font-semibold text-white flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentView={currentView}
        currentLang={currentLang}
        onSelectLanguage={setCurrentLang}
        onSelectView={handleNavigateView}
        onOpenSparkSync={() => setIsSparkSyncOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenLegalShield={handleOpenLegalShieldSection}
        onOpenDownloadApp={() => setIsDownloadAppOpen(true)}
      />

      {/* Real-Time Live Market Ticker Tape (Webull & LiveTrades Style) */}
      <LiveMarketTickerBar />

      {/* Main Content with Animated View Transition */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'global' && (
            <motion.div
              key="global"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <GlobalView
                onSwitchView={handleNavigateView}
                onOpenSparkSync={() => setIsSparkSyncOpen(true)}
                onOpenAssistant={() => setIsAssistantOpen(true)}
                onOpenLegalShield={handleOpenLegalShieldSection}
                onOpenDownloadApp={() => setIsDownloadAppOpen(true)}
              />
            </motion.div>
          )}

          {currentView === 'india' && (
            <motion.div
              key="india"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <IndiaView
                deals={deals}
                onSelectDealModal={(deal: DealItem) => setSelectedDeal(deal)}
                onOpenSparkSync={() => setIsSparkSyncOpen(true)}
                onOpenTakedownModal={() => setIsTakedownOpen(true)}
                onSwitchToUsa={() => handleNavigateView('usa')}
              />
            </motion.div>
          )}

          {currentView === 'usa' && (
            <motion.div
              key="usa"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <UsaView
                onOpenSparkSync={() => setIsSparkSyncOpen(true)}
                onSwitchToIndia={() => handleNavigateView('india')}
              />
            </motion.div>
          )}

          {currentView === 'sparkdeals' && (
            <motion.div
              key="sparkdeals"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <SparkDealsView
                deals={deals}
                isLiveFeed={isLiveFeed}
                onSelectDealModal={(deal: DealItem) => setSelectedDeal(deal)}
                onOpenLegalShield={handleOpenLegalShieldSection}
              />
            </motion.div>
          )}

          {currentView === 'brain' && (
            <motion.div
              key="brain"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <AiBrainView
                onOpenSparkSync={() => setIsSparkSyncOpen(true)}
                onNavigateToView={handleNavigateView}
              />
            </motion.div>
          )}

          {currentView === 'lifestyle' && (
            <motion.div
              key="lifestyle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <LifestylePortal
                onOpenStripeModal={(planName, priceUsd) => {
                  setStripePlanName(planName);
                  setStripePriceUsd(priceUsd);
                  setIsStripeModalOpen(true);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        currentView={currentView}
        onSelectView={handleNavigateView}
        onOpenSparkSync={() => setIsSparkSyncOpen(true)}
        onOpenLegalShield={handleOpenLegalShieldSection}
        onOpenTakedownModal={() => setIsTakedownOpen(true)}
      />

      {/* Persistent Floating Controls (Download App, SparkSync & Radiant Intelligence Guide) */}
      {/* Persistent Floating Controls matching image_ff37cf94.png */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Floating Download Dedicated App Button (image_ff37cf94.png) */}
        <button
          onClick={() => setIsDownloadAppOpen(true)}
          className="group px-4 py-2.5 rounded-full bg-[#1b1409]/90 hover:bg-[#251b0b] text-[#f59e0b] border border-[#f59e0b]/50 font-bold text-xs shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all backdrop-blur-md"
          title="Mobile website access information"
        >
          <span>📲</span>
          <span>Mobile website</span>
        </button>

        {/* Floating SparkSync App Launcher (image_ff37cf94.png) */}
        <button
          onClick={() => setIsSparkSyncOpen(true)}
          className="group px-4 py-2.5 rounded-full bg-[#0e1e3e]/90 hover:bg-[#132854] text-[#93c5fd] border border-[#3b82f6]/40 font-bold text-xs shadow-xl shadow-blue-500/20 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all backdrop-blur-md"
          title="Open the local operations planner"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
          <span>Launch SparkSync</span>
        </button>

        {/* Floating Guide Assistant Button (image_ff37cf94.png) */}
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="px-4 py-2 rounded-full bg-[#0a0f1d]/90 hover:bg-[#10172a] text-slate-300 hover:text-white font-medium text-xs shadow-lg border border-slate-700/80 backdrop-blur-md flex items-center gap-1.5 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
          <span>Ask Radiant Intelligence</span>
        </button>
      </div>

      {/* Interactive Modals */}
      <DownloadAppModal
        isOpen={isDownloadAppOpen}
        onClose={() => setIsDownloadAppOpen(false)}
      />

      <SparkSyncModal
        isOpen={isSparkSyncOpen}
        onClose={() => setIsSparkSyncOpen(false)}
      />

      <DealDetailModal
        deal={selectedDeal}
        onClose={() => setSelectedDeal(null)}
        onOpenLegalShield={handleOpenLegalShieldSection}
      />

      <RadiantAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onNavigateToView={handleNavigateView}
        onOpenSparkSync={() => setIsSparkSyncOpen(true)}
        onOpenLegalShield={handleOpenLegalShieldSection}
      />

      <TakedownModal
        isOpen={isTakedownOpen}
        onClose={() => setIsTakedownOpen(false)}
      />

      <StripeSubscriptionModal
        isOpen={isStripeModalOpen}
        onClose={() => setIsStripeModalOpen(false)}
        planName={stripePlanName}
        priceUsd={stripePriceUsd}
      />
    </div>
  );
}
