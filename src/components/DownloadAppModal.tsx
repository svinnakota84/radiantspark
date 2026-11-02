/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Download,
  Smartphone,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
  Flame,
  ArrowRight,
  Share2,
  X
} from 'lucide-react';
import { BiometricPlexus3D } from './BiometricPlexus3D';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installedSuccess, setInstalledSuccess] = useState(false);
  const [apkDownloading, setApkDownloading] = useState(false);
  const [previewMode, setPreviewMode] = useState<'sync' | 'deals'>('sync');
  const [downloadingZip, setDownloadingZip] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  if (!isOpen) return null;

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalledSuccess(true);
        setDeferredPrompt(null);
      }
    } else {
      // Fallback: direct to standalone app or show instructions
      window.location.href = '/app.html';
    }
  };

  const handleDownloadZip = async (filename: string) => {
    setDownloadingZip(true);
    const { downloadZipFile } = await import('../utils/downloadZip');
    await downloadZipFile(filename);
    setInstalledSuccess(true);
    setDownloadingZip(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-950 border border-blue-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-950/70 via-slate-900 to-amber-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/50 flex items-center justify-center text-blue-300 font-black shadow-md">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  Mobile App Setup: Unified Super-App or Deals Only
                </h3>
                <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Zero Corporate Bloat
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Launches exclusively into your mobile interface. Never opens desktop corporate pages.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Important Clarity Banner */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-emerald-300 block mb-0.5 font-bold">
                Why 1 Unified App is the Best Architecture:
              </strong>
              Having <strong>ONE unified app (SparkSync)</strong> gives your users tasks, health telemetry, markets, AND the live <strong>SparkDeals Hub</strong> via a seamless 1-tap bottom tab. If a user only wants deals, the dedicated Deals direct URL (<code>/app.html#deals</code>) opens solely the Deals interface for instant merchant checkout!
            </div>
          </div>

          {/* Download & Installation Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Option 1: 1 Unified Super-App (Recommended) */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-blue-950/40 to-slate-900 border border-blue-500/30 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Smartphone className="w-5 h-5 text-blue-400" />
                  <span className="text-[10px] font-mono font-bold uppercase bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">
                    ★ Recommended
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">1 Unified Super-App</h4>
                <p className="text-xs text-slate-400 mt-1">
                  SparkSync OS + SparkDeals Hub combined. One single download for iOS, Android, and Windows.
                </p>
              </div>

              <div className="space-y-1.5">
                <button
                  onClick={handleInstallPWA}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Install Unified App (PWA)</span>
                </button>
                <a
                  href="/app.html"
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-semibold text-[11px] flex items-center justify-center gap-1.5 border border-slate-800 transition-colors"
                >
                  <span>Open Full Mobile App ↗</span>
                </a>
              </div>
            </div>

            {/* Option 2: Dedicated SparkDeals Only */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-950/30 to-slate-900 border border-amber-500/30 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                    Shopper Shortcut
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">SparkDeals Direct App</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Opens directly into the Deals Hub with store filters (Amazon, Walmart, Best Buy) and instant checkout.
                </p>
              </div>

              <div className="space-y-1.5">
                <a
                  href="/app.html#deals"
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all active:scale-95"
                >
                  <Flame className="w-4 h-4" />
                  <span>Launch SparkDeals Direct ↗</span>
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin + '/app.html#deals');
                    alert('Direct SparkDeals link copied to clipboard!');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-semibold text-[11px] flex items-center justify-center gap-1.5 border border-slate-800 transition-colors"
                >
                  <span>Copy Deal App Share Link</span>
                </button>
              </div>
            </div>
          </div>

          {/* Windows & iOS Guidance Card */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 text-xs text-slate-300">
            <h5 className="font-bold text-white flex items-center gap-2">
              <span>💡</span> Device Installation Guidelines (No App Store Delays)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-400">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <strong className="text-slate-200 block mb-1">🍎 iOS Safari (iPhone / iPad):</strong>
                Open <code className="text-cyan-400">/app.html</code>, tap the <strong>Share (⎋)</strong> button at the bottom of Safari, and select <strong>"Add to Home Screen"</strong>. It launches in standalone full-screen mode without any browser or website headers.
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <strong className="text-slate-200 block mb-1">🪟 Windows 11 / macOS / Android:</strong>
                In Chrome or Edge, click the <strong>Install App icon (⊕)</strong> in the top address bar. This creates a native desktop app icon and starts instantly without needing a raw APK or App Installer package.
              </div>
            </div>
          </div>

          {/* Single GitHub Repository Package Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/40 border border-emerald-500/50 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📦</span>
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    Single Complete GitHub Package
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono border border-emerald-500/30">
                      ★ All-In-One (.ZIP)
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    One single file ready to upload directly into your GitHub repository root.
                  </p>
                </div>
              </div>
            </div>

            {/* Big 1-Click Download Button */}
            <button
              type="button"
              disabled={downloadingZip}
              onClick={() => handleDownloadZip('radiantspark-final.zip')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.01] active:scale-[0.98]"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>{downloadingZip ? 'Preparing Download...' : 'Download radiantspark-final.zip'}</span>
            </button>

            {/* Quick 3-Step GitHub Pages Instructions */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
              <strong className="text-emerald-400 block font-bold">
                Deploying to GitHub Pages in 30 Seconds:
              </strong>
              <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px]">
                <li>Unzip <code className="text-emerald-300">radiantspark-final.zip</code> on your computer.</li>
                <li>Go to GitHub ➔ <strong>Upload files</strong> and drop all unzipped files into your repository.</li>
                <li>Go to repository <strong>Settings ➔ Pages</strong>, select <strong>Deploy from a branch</strong>, choose <strong>main</strong> / <strong>(root)</strong>, and click <strong>Save</strong>.</li>
              </ol>
            </div>
          </div>

          {/* Interactive Screen Previews */}
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                App Interface Preview:
              </span>
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setPreviewMode('sync')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                    previewMode === 'sync' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ SparkSync OS
                </button>
                <button
                  onClick={() => setPreviewMode('deals')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                    previewMode === 'deals' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🔥 SparkDeals Hub
                </button>
              </div>
            </div>

            <div className="relative p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-4 overflow-hidden">
              {/* If SparkSync, show real-time 3D Biometric Plexus in background */}
              {previewMode === 'sync' && (
                <div className="absolute right-24 top-0 bottom-0 w-44 pointer-events-none opacity-40 z-0">
                  <BiometricPlexus3D bpm={75} />
                </div>
              )}
              <div className="relative z-10 space-y-1">
                <div className="flex items-center gap-2">
                  <h5 className="text-xs font-bold text-white">
                    {previewMode === 'sync'
                      ? 'Screen 1: SparkSync Life & Work OS'
                      : 'Screen 2: SparkDeals Hub (10+ Stores)'}
                  </h5>
                  {previewMode === 'sync' && (
                    <span className="text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.5 rounded-full font-mono font-bold">
                      3D Plexus Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">
                  {previewMode === 'sync'
                    ? 'Includes 3D rotating biometric plexus, Apple Watch vitals telemetry, binary prediction bets, duplicate cleaner, and market pulse.'
                    : 'Includes real-time price drops from Amazon US/India, Walmart, Best Buy, Temu, SHEIN, with 100% safe harbor.'}
                </p>
              </div>
              <a
                href={`/app.html#${previewMode === 'sync' ? 'tasks' : 'deals'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs whitespace-nowrap flex items-center gap-1 border border-slate-700 shrink-0"
              >
                <span>Open /app.html</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* iOS Safari Home Screen Guide */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
            <Share2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200">iOS Safari Users:</strong> Open{' '}
              <a href="/app.html" className="text-blue-400 underline font-semibold">
                app.html
              </a>
              , tap the <strong>Share icon (⎋)</strong>, and select <strong>"Add to Home Screen"</strong>. It will launch full-screen like a native app.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Standalone Package v2.4 Certified</span>
          </div>
          <a
            href="/app.html"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs flex items-center gap-1.5 hover:scale-105 transition-all shadow-md"
          >
            <span>Launch Standalone Mobile App ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};
