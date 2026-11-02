/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { INDIA_LEGAL_SHIELD_SECTIONS } from '../data/legalData';
import {
  ShieldCheck,
  Scale,
  FileBadge,
  AlertCircle,
  Copy,
  Check,
  Building,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  Download
} from 'lucide-react';

interface IndiaLegalShieldProps {
  onOpenTakedownModal: () => void;
}

export const IndiaLegalShield: React.FC<IndiaLegalShieldProps> = ({ onOpenTakedownModal }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('intermediary-safe-harbour');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeSection = INDIA_LEGAL_SHIELD_SECTIONS.find((s) => s.id === activeSectionId) || INDIA_LEGAL_SHIELD_SECTIONS[0];

  const handleCopyClause = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Scale':
        return <Scale className="w-5 h-5 text-blue-400" />;
      case 'FileBadge':
        return <FileBadge className="w-5 h-5 text-amber-400" />;
      case 'AlertCircle':
        return <AlertCircle className="w-5 h-5 text-rose-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="legal-shield" className="py-16 bg-slate-950 border-t border-slate-800/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Shield Banner Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Statutory Safe Harbour Framework · Republic of India
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              The India <span className="text-emerald-400 font-serif italic">Legal Shield</span>
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Complete multi-tier legal protection engineered for RDNT Sparkle Industries LLP. Full compliance
              with the Information Technology Act (2000), Consumer Protection (E-Commerce) Rules (2020), and ASCI Advertising Guidelines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTakedownModal}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-rose-500/40 hover:bg-rose-950/30 text-rose-300 text-xs font-bold transition-all flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-rose-400" />
              File Section 79 Takedown Notice
            </button>
          </div>
        </div>

        {/* 4 Pillars Quick Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {INDIA_LEGAL_SHIELD_SECTIONS.map((sec) => {
            const isActive = activeSectionId === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSectionId(sec.id)}
                className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/30'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-slate-800/60">{getIcon(sec.icon)}</div>
                    <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase">
                      {sec.id.split('-')[0]}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs text-white line-clamp-1 mb-1">{sec.title}</h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {sec.shortSummary}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-emerald-400 font-medium">
                  <span>View Full Statute</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Statutory Clause Viewer */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 lg:p-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
            <div>
              <div className="text-xs font-mono text-emerald-400 mb-1">
                {activeSection.statuteReference}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                {getIcon(activeSection.icon)}
                {activeSection.title}
              </h3>
            </div>
            <button
              onClick={() => handleCopyClause(activeSection.id, activeSection.fullClause)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              {copiedId === activeSection.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Clause Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Statutory Text</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Clause Body Text */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                Binding Legal Clause &amp; Intermediary Covenant
              </h4>
              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-line max-h-80 overflow-y-auto">
                {activeSection.fullClause}
              </div>
            </div>

            {/* Compliance Checklist Column */}
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                  Compliance Guardrails
                </h4>
                <ul className="space-y-2.5">
                  {activeSection.complianceKeyPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400">
                <span className="font-semibold text-white block mb-1">Official Legal Recourse</span>
                Any disputes are governed strictly under the laws of India and subject to the exclusive jurisdiction of the competent courts in Andhra Pradesh.
              </div>
            </div>
          </div>
        </div>

        {/* Resident Grievance Officer Formal Card */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-6">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase font-mono mb-2">
              <Building className="w-4 h-4" />
              Statutory Grievance Redressal Desk
            </div>
            <h4 className="text-base font-bold text-white">RDNT Sparkle Industries LLP</h4>
            <p className="text-xs text-slate-400 mt-1">
              Designated in compliance with Rule 3(2) of the Information Technology (Intermediary Guidelines) Rules, 2021.
            </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Registered Office</strong>
                <span className="text-slate-400 leading-normal">
                  D.No. 4-12-88, Main Commercial Arterial Road, Guntur, Andhra Pradesh 522002, India
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Compliance Officer Email</strong>
                <a
                  href="mailto:legal@radiantsparkllc.com?subject=Legal%20Grievance%20Notice%20-%20RDNT%20Sparkle%20Industries%20LLP"
                  className="text-emerald-400 hover:underline block"
                >
                  legal@radiantsparkllc.com
                </a>
                <a
                  href="mailto:grievance@radiantsparkllc.com?subject=Consumer%20Affairs%20Grievance"
                  className="text-slate-400 hover:text-slate-200 block text-[11px]"
                >
                  grievance@radiantsparkllc.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Mandatory Response Windows</strong>
                <span className="text-slate-400">
                  Acknowledgement within <strong className="text-white">24 hours</strong> · Complete resolution within <strong className="text-white">15 days</strong>.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Affiliate Code of Conduct</strong>
                <span className="text-slate-400">
                  Section 4 ASCI Self-Regulation Code + FTC 16 CFR § 255.5 commercial endorsement standards.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
