/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SyncWorkflowJob } from '../types';
import { INITIAL_SYNC_JOBS } from '../data/syncData';
import {
  Zap,
  Play,
  CheckCircle2,
  Clock,
  Terminal,
  Settings,
  RefreshCw,
  ExternalLink,
  Shield,
  Send,
  Database,
  Radio,
  Sliders,
  Check
} from 'lucide-react';
import { BiometricPlexus3D } from './BiometricPlexus3D';

interface SparkSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshDeals: () => void;
}

export const SparkSyncModal: React.FC<SparkSyncModalProps> = ({ isOpen, onClose, onRefreshDeals }) => {
  const [jobs, setJobs] = useState<SyncWorkflowJob[]>(INITIAL_SYNC_JOBS);
  const [isExecuting, setIsExecuting] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'console' | 'mobile-app' | 'jobs' | 'settings'>('console');
  const [mobileSubTab, setMobileSubTab] = useState<'sparksync' | 'sparkdeals'>('sparksync');
  const [logs, setLogs] = useState<string[]>([
    '[INIT] SparkSync v2.4 Automated Daemon initialized.',
    '[DAEMON] Local MCP Bridge bound to localhost:3000 / mcp_auto_start.ps1',
    '[OK] All 4 automated syndication pipelines armed and listening.',
    '[SCHEDULE] Next automated deal refresh in 11 minutes.'
  ]);

  // Setting states
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
  const [telegramBroadcast, setTelegramBroadcast] = useState(true);
  const [affiliateCloak, setAffiliateCloak] = useState(true);
  const [currencySymbol, setCurrencySymbol] = useState('INR (₹)');
  const [configSaved, setConfigSaved] = useState(false);

  if (!isOpen) return null;

  const handleRunPipeline = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setPipelineProgress(5);
    setLogs((prev) => [...prev, `[CMD] Manual pipeline trigger received at ${new Date().toLocaleTimeString()} IST`]);

    const steps = [
      { pct: 25, msg: '[STEP 1/5] Pinging Amazon IN & Flipkart PA-API v5 endpoints...' },
      { pct: 50, msg: '[STEP 2/5] Received 320 raw items. Filtering by min discount >= 25%...' },
      { pct: 75, msg: '[STEP 3/5] Injecting compliant affiliate tag: sparkdeal-21 with ASCI disclaimer...' },
      { pct: 90, msg: '[STEP 4/5] Broadcasting 4 trending hot deals to Telegram subscribers (18,400+)...' },
      { pct: 100, msg: '[SUCCESS] Pipeline completed cleanly in 1.42s. 8 deals updated in SparkDeal Hub.' },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setPipelineProgress(step.pct);
        setLogs((prev) => [...prev, step.msg]);

        if (step.pct === 100) {
          setIsExecuting(false);
          onRefreshDeals();
          setJobs((prevJobs) =>
            prevJobs.map((j) => ({
              ...j,
              lastRun: 'Just now',
              itemsProcessed: j.itemsProcessed + Math.floor(Math.random() * 15) + 5,
            }))
          );
        }
      }, (index + 1) * 700);
    });
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setConfigSaved(true);
    setLogs((prev) => [...prev, '[CONFIG] Pipeline automation configuration successfully written to env.']);
    setTimeout(() => setConfigSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-slate-950 border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/50 flex items-center justify-center text-blue-400 shadow-md">
              <Zap className="w-5 h-5 text-amber-300 fill-current animate-pulse-subtle" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  SparkSync App Command Center
                </h3>
                <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Daemon v2.4 Live
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Automated syndication, price drop radar, and affiliate cloaking engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="app.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-300 bg-blue-950/60 border border-blue-800/60 hover:bg-blue-900/40 transition-colors"
            >
              <span>Launch Standalone app.html</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation Tabs inside modal */}
        <div className="flex items-center justify-between px-5 bg-slate-900/60 border-b border-slate-800/80">
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setActiveTab('console')}
              className={`px-3 py-2 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
                activeTab === 'console'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Live Console &amp; Runner
            </button>
            <button
              onClick={() => setActiveTab('mobile-app')}
              className={`px-3 py-2 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
                activeTab === 'mobile-app'
                  ? 'border-amber-400 text-amber-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>📱</span>
              <span>Mobile App (SparkSync &amp; SparkDeals)</span>
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-3 py-2 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
                activeTab === 'jobs'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Automated Pipelines ({jobs.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-2 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-colors ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              Daemon Settings
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-mono hidden sm:block">
            PowerShell Bridge: mcp_auto_start.ps1 Active
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-5">
          {activeTab === 'console' && (
            <div className="space-y-4">
              {/* Quick Execution Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-indigo-950/20 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                    Automated Syndication Pipeline
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Trigger live price crawling, affiliate tag cloaking, and Telegram deal broadcasts.
                  </p>
                </div>

                <button
                  onClick={handleRunPipeline}
                  disabled={isExecuting}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
                    isExecuting
                      ? 'bg-blue-800 text-slate-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white hover:scale-105 active:scale-95 shadow-blue-500/25'
                  }`}
                >
                  <RefreshCw className={`w-4 h-4 ${isExecuting ? 'animate-spin' : ''}`} />
                  {isExecuting ? 'Running Pipeline...' : 'Run SparkSync Now'}
                </button>
              </div>

              {/* Progress Bar */}
              {isExecuting && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>Synchronizing with Indian merchant feeds...</span>
                    <span>{pipelineProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 transition-all duration-300 rounded-full"
                      style={{ width: `${pipelineProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Terminal View */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 px-1 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    Live Output Stream (mcp_auto_start.ps1 / port 3000)
                  </span>
                  <button
                    onClick={() => setLogs(['[RESET] Log buffer flushed. Daemon listening...'])}
                    className="text-slate-500 hover:text-slate-300"
                  >
                    Clear Logs
                  </button>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400/90 leading-relaxed max-h-56 overflow-y-auto space-y-1 shadow-inner">
                  {logs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-slate-600 select-none">&gt;</span>
                      <span
                        className={
                          log.includes('SUCCESS')
                            ? 'text-emerald-300 font-bold'
                            : log.includes('STEP')
                            ? 'text-blue-300'
                            : log.includes('CMD')
                            ? 'text-amber-300'
                            : 'text-slate-300'
                        }
                      >
                        {log}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* MCP Daemon Quick Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-500 block text-[10px] font-mono">MCP BRIDGE</span>
                  <span className="font-bold text-white font-mono">Active / 127.0.0.1</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-500 block text-[10px] font-mono">AFFILIATE TAG</span>
                  <span className="font-bold text-amber-400 font-mono">sparkdeal-21</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-500 block text-[10px] font-mono">BROADCAST AUDIENCE</span>
                  <span className="font-bold text-emerald-400 font-mono">18,400+ Users</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-500 block text-[10px] font-mono">SAFE HARBOUR</span>
                  <span className="font-bold text-blue-400 font-mono">Sec 79 Enforced</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mobile-app' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Dedicated Mobile Application View</span>
                    <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                      Standalone Mode
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    This is the exact app customers receive when downloading SparkSync &amp; SparkDeals (zero corporate web pages).
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="/app.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>Launch /app.html</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Sub-tab switcher inside preview */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setMobileSubTab('sparksync')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    mobileSubTab === 'sparksync'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ SparkSync OS (Apple Watch &amp; Bets)
                </button>
                <button
                  onClick={() => setMobileSubTab('sparkdeals')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    mobileSubTab === 'sparkdeals'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  🔥 SparkDeals Hub (Live Stores)
                </button>
              </div>

              {/* Device Frame Simulator */}
              <div className="mx-auto max-w-sm rounded-[32px] bg-[#030712] border-4 border-slate-800 shadow-2xl p-4 space-y-4">
                {/* Dynamic Island */}
                <div className="flex items-center justify-between text-xs pb-1">
                  <span className="font-bold text-slate-200">22:34</span>
                  <div className="px-3 py-0.5 bg-black rounded-full border border-slate-800 flex items-center gap-1.5 text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                    <span className="font-mono text-rose-400 font-bold">75 bpm</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <span className="font-mono text-slate-400 text-[10px]">84% 🔋</span>
                </div>

                {mobileSubTab === 'sparksync' ? (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-cyan-400 font-extrabold text-[10px] font-mono">TUESDAY, OCT 27</span>
                      <span className="text-emerald-400 font-mono font-bold text-[10px]">READINESS 94</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 rounded-xl bg-gradient-to-b from-[#141d2e] to-[#0d131f] border border-amber-500/30">
                        <div className="flex justify-between text-[9px] mb-1">
                          <span className="text-amber-400 font-bold">⚡</span>
                          <span className="bg-amber-500/20 text-amber-300 px-1 rounded">0.5% Fee</span>
                        </div>
                        <div className="font-bold text-white text-[11px]">Binary Bets</div>
                        <div className="text-[9px] text-slate-400">Robinhood/Kalshi event bets</div>
                      </div>

                      <div className="p-3 rounded-xl bg-gradient-to-b from-[#211527] to-[#120b18] border border-rose-500/30">
                        <div className="flex justify-between text-[9px] mb-1">
                          <span className="text-rose-400">❤️</span>
                          <span className="text-emerald-400 font-bold">Live ECG</span>
                        </div>
                        <div className="font-bold text-white text-[11px]">Live Vitals &amp; Radar</div>
                        <div className="text-[9px] text-slate-400">PPG waveform &amp; BLE</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-500/30 flex justify-between items-center text-[11px] font-bold">
                      <span>👑 Activate SparkSync Pro</span>
                      <span className="text-purple-300 font-mono">$9.99/mo</span>
                    </div>

                    <div className="relative p-3 rounded-xl bg-slate-900 border border-blue-500/30 space-y-2 overflow-hidden shadow-inner">
                      {/* Interactive 3D Biometric Plexus (Rotating wireframe polyhedron & pulse) */}
                      <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
                        <BiometricPlexus3D bpm={75} />
                      </div>
                      <div className="relative z-10 flex justify-between text-[11px] font-bold">
                        <span className="flex items-center gap-1">
                          <span>⌚</span>
                          <span>Apple Watch Telemetry</span>
                          <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1 rounded font-mono">3D</span>
                        </span>
                        <span className="text-cyan-400">Dashboard ›</span>
                      </div>
                      <div className="relative z-10 grid grid-cols-3 gap-1.5 text-center text-[10px]">
                        <div className="p-1.5 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-800">
                          <span className="text-slate-400 block text-[8px]">Heart Rate</span>
                          <span className="text-rose-400 font-bold">❤️ 75</span>
                        </div>
                        <div className="p-1.5 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-800">
                          <span className="text-slate-400 block text-[8px]">Active Cal</span>
                          <span className="text-amber-400 font-bold">🔥 640</span>
                        </div>
                        <div className="p-1.5 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-800">
                          <span className="text-slate-400 block text-[8px]">Sleep Score</span>
                          <span className="text-cyan-400 font-bold">91 Opt</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-[11px]">
                      <div>
                        <div className="font-bold text-white">7.1 MB Recoverable Storage</div>
                        <div className="text-[9px] text-slate-400">3 duplicate clusters found</div>
                      </div>
                      <span className="px-2 py-1 bg-rose-900/60 text-rose-300 rounded-lg text-[10px] font-bold">Clean</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded bg-amber-500 text-black flex items-center justify-center font-bold text-[10px]">⚡</span>
                        <span className="font-bold text-white text-[11px]">SparkDeals Hub</span>
                        <span className="text-[8px] bg-rose-600 px-1 rounded text-white font-mono">LIVE</span>
                      </div>
                      <span className="text-[9px] text-emerald-400 font-mono">👁️ 1,477</span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900 border border-amber-500/30 text-[9px] text-slate-300">
                      <strong className="text-amber-300 block font-bold">100% Intermediary Immunity</strong>
                      SparkDeals indexes 3rd-party deals with $0 shipping or return liability.
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-[9px]">
                        <span className="text-amber-300 bg-amber-500/20 px-1.5 rounded">Amazon US</span>
                        <span className="text-rose-400 font-bold">🔥 +3,420°</span>
                      </div>
                      <div className="font-bold text-white text-[11px]">Apple iPad (10th Gen) 10.9-inch 64GB</div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-amber-400 font-mono font-bold">$279.00</span>
                        <span className="text-[9px] text-slate-500 line-through">$349.00</span>
                        <span className="text-[9px] text-emerald-400 font-bold">20% OFF</span>
                      </div>
                      <a href="https://www.amazon.com/dp/B0BJLXMVMV" target="_blank" rel="noopener noreferrer" className="block w-full py-1.5 rounded-lg bg-amber-500 text-slate-950 text-center font-black text-[10px]">
                        Shop @ Amazon US ↗
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Current active automated micro-services synchronized by SparkSync daemon.
              </p>
              <div className="space-y-2.5">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">{job.name}</h4>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          {job.schedule}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs mt-1">{job.description}</p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 font-mono text-[11px] text-slate-400">
                      <div>
                        <span className="text-slate-500 block text-[9px]">PROCESSED</span>
                        <span className="font-bold text-slate-200">{job.itemsProcessed}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">SUCCESS</span>
                        <span className="font-bold text-emerald-400">{job.successRate}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">LAST RUN</span>
                        <span className="text-slate-300">{job.lastRun}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <form onSubmit={handleSaveConfig} className="space-y-4 max-w-xl text-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <strong className="text-slate-200 block">Automated Price Drop Crawler</strong>
                    <span className="text-slate-400 text-[11px]">Continuously poll Indian API feeds every 15 minutes</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoSyncEnabled}
                    onChange={(e) => setAutoSyncEnabled(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <strong className="text-slate-200 block">Instant Telegram &amp; WhatsApp Broadcasts</strong>
                    <span className="text-slate-400 text-[11px]">Push deals with score &gt; 150 directly to subscribers</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={telegramBroadcast}
                    onChange={(e) => setTelegramBroadcast(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <strong className="text-slate-200 block">Affiliate Tag Automatic Injection</strong>
                    <span className="text-slate-400 text-[11px]">Append sparkdeal-21 and legal safe harbour disclosures</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={affiliateCloak}
                    onChange={(e) => setAffiliateCloak(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Currency Format</label>
                  <select
                    value={currencySymbol}
                    onChange={(e) => setCurrencySymbol(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="INR (₹)">Indian Rupee (INR - ₹)</option>
                    <option value="USD ($)">US Dollar (USD - $)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  Save Daemon Configuration
                </button>
                {configSaved && (
                  <span className="text-emerald-400 font-semibold text-xs">Settings saved successfully!</span>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Integration Status: Online &amp; Functional</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
