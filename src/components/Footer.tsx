/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CountryView } from '../types';
import { ShieldCheck, Globe, Zap, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  currentView: CountryView;
  onSelectView: (view: CountryView) => void;
  onOpenSparkSync: () => void;
  onOpenLegalShield: () => void;
  onOpenTakedownModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentView,
  onSelectView,
  onOpenSparkSync,
  onOpenLegalShield,
  onOpenTakedownModal,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <img
              src="/assets/icon.svg"
              alt="Radiant Spark"
              className="w-8 h-8 rounded-xl object-contain shadow-sm border border-slate-700/80"
            />
            <div>
              <span className="font-bold text-white text-sm">Radiant Spark Global</span>
              <span className="text-slate-500 block text-[11px]">
                Radiant Spark LLC (USA) · RDNT Sparkle Industries LLP (India)
              </span>
            </div>
          </div>

          {/* Quick View Switches */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onSelectView('global')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'global' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Global Unified
            </button>
            <button
              onClick={() => onSelectView('usa')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'usa' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              🇺🇸 USA · Radiant Spark LLC
            </button>
            <button
              onClick={() => onSelectView('india')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                currentView === 'india' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              🇮🇳 India · RDNT Sparkle &amp; SparkDeal
            </button>
            <button
              onClick={onOpenSparkSync}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 flex items-center gap-1 shadow-sm"
            >
              <Zap className="w-3 h-3 text-amber-300 fill-current" />
              <span>Launch SparkSync</span>
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-[12px]">
          <div>
            <h4 className="font-semibold text-slate-200 mb-2">Corporate Navigation</h4>
            <ul className="space-y-1.5">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Radiant Spark
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition-colors">
                  Careers &amp; Talent Network
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Desks
                </a>
              </li>
              <li>
                <a
                  href="https://radiantsparkllc.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>radiantsparkllc.com</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-amber-400 mb-2">India &amp; SparkDeal Hub</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectView('india')} className="hover:text-white text-left">
                  SparkDeal Curated Steals
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('india')} className="hover:text-white text-left">
                  Spark EV Clean Energy
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('india')} className="hover:text-white text-left">
                  Sparkle Drinks &amp; Naturals
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('india')} className="hover:text-white text-left">
                  Sparkle Distribution Network
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-cyan-400 mb-2">U.S. Technology</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onSelectView('usa')} className="hover:text-white text-left">
                  Spark IT Consulting
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('usa')} className="hover:text-white text-left">
                  Oracle Fusion HCM &amp; BIP
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('usa')} className="hover:text-white text-left">
                  Cloud Modernization (AWS/GCP)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('usa')} className="hover:text-white text-left">
                  Enterprise AI &amp; Systems
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-emerald-400 mb-2 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              India Legal Shield
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={onOpenLegalShield} className="hover:text-white text-left text-emerald-400">
                  Section 79 Safe Harbour Terms
                </button>
              </li>
              <li>
                <button onClick={onOpenLegalShield} className="hover:text-white text-left">
                  Consumer Protection Act 2020
                </button>
              </li>
              <li>
                <button onClick={onOpenLegalShield} className="hover:text-white text-left">
                  ASCI Affiliate Disclosures
                </button>
              </li>
              <li>
                <button onClick={onOpenTakedownModal} className="hover:text-rose-400 text-left">
                  File Takedown / Grievance Notice
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-[11px] leading-relaxed text-slate-400 space-y-1">
          <p>
            <strong className="text-slate-200">Legal Shield &amp; Safe Harbour Declaration:</strong> SparkDeal Hub is an informational curation platform operated by RDNT Sparkle Industries LLP. Under Section 79 of the Information Technology Act, 2000, RDNT Sparkle Industries LLP is an intermediary and is not liable for third-party merchant content, product availability, or pricing discrepancies. Third-party vendor terms, shipping, warranties, and return policies govern all purchases.
          </p>
          <p>
            <strong className="text-slate-200">ASCI Commercial Transparency:</strong> Outbound deals may contain affiliate tracking codes (sparkdeal-21) that generate merchant-paid sales commissions. This incurs no added expense to the consumer.
          </p>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {currentYear} Radiant Spark Global. Radiant Spark LLC (United States) &amp; RDNT Sparkle Industries LLP (India). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.ftc.gov/business-guidance/privacy-security" target="_blank" rel="noopener noreferrer" className="hover:underline">
              U.S. FTC Standards
            </a>
            <span>·</span>
            <a href="https://www.meity.gov.in/documents/act-and-policies" target="_blank" rel="noopener noreferrer" className="hover:underline">
              India MeitY IT Act
            </a>
            <span>·</span>
            <button onClick={onOpenLegalShield} className="hover:underline text-emerald-400">
              Grievance Officer: Guntur, AP
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
