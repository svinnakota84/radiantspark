/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CountryView } from '../types';
import { LanguageCode } from '../utils/translations';
import { Zap, Menu, X, Globe, Sparkles, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentView: CountryView;
  currentLang: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onSelectView: (view: CountryView) => void;
  onOpenSparkSync: () => void;
  onOpenAssistant: () => void;
  onOpenLegalShield: () => void;
  onOpenDownloadApp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  currentLang,
  onSelectLanguage,
  onSelectView,
  onOpenSparkSync,
  onOpenAssistant,
  onOpenLegalShield,
  onOpenDownloadApp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);

  const handleNavClick = (view: CountryView) => {
    onSelectView(view);
    setMobileMenuOpen(false);
    setCompanyDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompanyNav = (sectionId: string) => {
    setCompanyDropdownOpen(false);
    setMobileMenuOpen(false);
    if (currentView !== 'global') {
      onSelectView('global');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-6 pt-3 pb-2 transition-all">
      <div className="max-w-7xl mx-auto">
        {/* Floating Capsule Dock matching image_75289c42.png */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#030712]/80 backdrop-blur-xl border border-slate-800/80 shadow-2xl px-3 sm:px-4 py-2 flex items-center justify-between">

          {/* Left Brand Badge */}
          <button
            onClick={() => handleNavClick('global')}
            className="flex items-center gap-3 text-left focus:outline-none group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center p-1.5 shadow-md group-hover:border-blue-500/50 transition-colors">
              <img
                src="./assets/icon.svg"
                alt="Radiant Spark Symbol"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="leading-tight">
              <span className="font-extrabold text-sm sm:text-base text-white tracking-tight group-hover:text-blue-300 transition-colors block">
                Radiant Spark Global
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold block">
                UNITED STATES · INDIA
              </span>
            </div>
          </button>

          {/* Desktop Center Navigation Pills */}
          <nav className="hidden xl:flex items-center gap-1">
            <button
              onClick={() => handleNavClick('global')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all ${
                currentView === 'global'
                  ? 'bg-amber-500/15 text-amber-300 border-2 border-amber-500/80 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              RADIANT SPARK GLOBAL
            </button>

            <button
              onClick={() => handleNavClick('usa')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                currentView === 'usa'
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/50 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              TECHNOLOGY USA
            </button>

            <button
              onClick={() => handleNavClick('india')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                currentView === 'india'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              INDUSTRIES INDIA
            </button>

            <button
              onClick={() => handleNavClick('sparkdeals')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1 ${
                currentView === 'sparkdeals'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
              }`}
            >
              <span>🔥</span>
              <span>SPARKDEALS PORTAL</span>
            </button>

            <button
              onClick={() => handleNavClick('brain')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                currentView === 'brain'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-cyan-300 hover:text-white hover:bg-cyan-500/10'
              }`}
            >
              <span>🧠</span>
              <span>OPERATIONS PLANNER</span>
            </button>

            <button
              onClick={() => handleNavClick('lifestyle')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1 ${
                currentView === 'lifestyle'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10'
              }`}
            >
              <span>🌿</span>
              <span>LIFESTYLE &amp; DIET</span>
            </button>

            <button
              onClick={onOpenDownloadApp}
              className="px-2.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-cyan-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>📲</span>
              <span>MOBILE APPS</span>
            </button>

            {/* Single Consolidated Company & Legal Dropdown Tab */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  companyDropdownOpen
                    ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <span>🏢 COMPANY</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${companyDropdownOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'}`} />
              </button>

              {companyDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setCompanyDropdownOpen(false)} />
                  <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-slate-800/90 p-2 shadow-2xl z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800/80 mb-1">
                      Corporate &amp; Legal Hub
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCompanyNav('about')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-900/90 flex items-center gap-2.5 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-sm group-hover:scale-105 transition-transform">
                        🏢
                      </div>
                      <div>
                        <strong className="block text-white group-hover:text-blue-300">About Us</strong>
                        <span className="text-[10px] text-slate-400 font-normal">Dual Corporate Overview</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCompanyNav('careers')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-900/90 flex items-center gap-2.5 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-sm group-hover:scale-105 transition-transform">
                        💼
                      </div>
                      <div>
                        <strong className="block text-white group-hover:text-amber-300">Careers</strong>
                        <span className="text-[10px] text-slate-400 font-normal">Global Talent Network</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCompanyNav('contact')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-900/90 flex items-center gap-2.5 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-sm group-hover:scale-105 transition-transform">
                        📞
                      </div>
                      <div>
                        <strong className="block text-white group-hover:text-emerald-300">Contact Us</strong>
                        <span className="text-[10px] text-slate-400 font-normal">US &amp; India HQ Enquiries</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCompanyDropdownOpen(false);
                        onOpenLegalShield();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-900/90 flex items-center gap-2.5 transition-colors group border-t border-slate-800/80 mt-1 pt-2"
                    >
                      <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-sm group-hover:scale-105 transition-transform">
                        🛡️
                      </div>
                      <div>
                        <strong className="block text-white group-hover:text-purple-300">Privacy &amp; Legal</strong>
                        <span className="text-[10px] text-slate-400 font-normal">Sec 79 IT Act &amp; FSSAI Shield</span>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Right Action: Language Switcher, Mobile website, ZIP, and Launch SparkSync App Buttons */}
          <div className="flex items-center gap-2">
            {/* Prominent Mobile website Button */}
            <button
              type="button"
              onClick={onOpenDownloadApp}
              className="inline-flex items-center gap-1 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-extrabold text-amber-300 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 shadow-md shadow-amber-950/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Mobile website access information"
            >
              <span>📲</span>
              <span className="hidden sm:inline">Mobile website</span>
              <span className="sm:hidden">Apps</span>
            </button>

            <button
              type="button"
              onClick={onOpenSparkSync}
              className="group px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-wider shadow-lg shadow-blue-600/30 border border-blue-400/40 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Launch SparkSync App"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <div className="text-left leading-tight font-extrabold">
                <span className="block text-[9px] text-blue-200">LAUNCH</span>
                <span className="block">SPARKSYNC APP</span>
              </div>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-2 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-slate-800 p-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2">
            <div className="grid grid-cols-1 gap-1.5">
              <button
                onClick={() => handleNavClick('global')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between ${
                  currentView === 'global' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 bg-slate-900/60'
                }`}
              >
                <span>Radiant Spark Global</span>
                <Globe className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNavClick('usa')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between ${
                  currentView === 'usa' ? 'bg-blue-600 text-white' : 'text-slate-300 bg-slate-900/60'
                }`}
              >
                <span>Technology USA</span>
                <span>🇺🇸</span>
              </button>

              <button
                onClick={() => handleNavClick('india')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between ${
                  currentView === 'india' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 bg-slate-900/60'
                }`}
              >
                <span>Industries India</span>
                <span>🇮🇳</span>
              </button>

              <button
                onClick={() => handleNavClick('sparkdeals')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between ${
                  currentView === 'sparkdeals'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black'
                    : 'text-amber-400 bg-amber-950/40 border border-amber-500/30'
                }`}
              >
                <span>🔥 SparkDeals Portal</span>
                <span>⚡</span>
              </button>

              <button
                onClick={() => handleNavClick('brain')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between ${
                  currentView === 'brain'
                    ? 'bg-cyan-500 text-slate-950 font-black'
                    : 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30'
                }`}
              >
                <span>🧠 AI Enterprise Brain (10 Agents)</span>
                <span>⚡</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block px-1">
                🏢 Company &amp; Legal Hub
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => handleCompanyNav('about')}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 text-slate-200 text-left font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>🏢</span> About Us
                </button>
                <button
                  onClick={() => handleCompanyNav('careers')}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-slate-200 text-left font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>💼</span> Careers
                </button>
                <button
                  onClick={() => handleCompanyNav('contact')}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-slate-200 text-left font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>📞</span> Contact
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLegalShield();
                  }}
                  className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-300 text-left font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>🛡️</span> Privacy &amp; Legal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
