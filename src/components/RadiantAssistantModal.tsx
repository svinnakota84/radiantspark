/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User, ShieldCheck, Zap } from 'lucide-react';

interface RadiantAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToView: (view: 'global' | 'india' | 'usa') => void;
  onOpenSparkSync: () => void;
  onOpenLegalShield: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

const PRESET_QUESTIONS = [
  'Tell me about U.S. Spark IT Consulting & Oracle services',
  'Explain Spark EV and solar clean energy in India',
  'How does the SparkDeal revenue affiliate model work?',
  'What is the India Legal Shield & Intermediary clause?',
  'How do I run SparkSync automated workflows?',
];

export const RadiantAssistantModal: React.FC<RadiantAssistantModalProps> = ({
  isOpen,
  onClose,
  onNavigateToView,
  onOpenSparkSync,
  onOpenLegalShield,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hello! I am Radiant Intelligence, the company and platform guide for Radiant Spark Global. I can assist with information regarding our U.S. technology services under Radiant Spark LLC, our India divisions under RDNT Sparkle Industries LLP, our SparkDeal Hub affiliate model, and our India Legal Shield.'
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('oracle') || lower.includes('it') || lower.includes('us') || lower.includes('technology')) {
        reply = 'Radiant Spark LLC operates in the United States and leads Spark IT Consulting. Key practices include: 1) Business Transformation, 2) Digital Modernization, 3) Enterprise Artificial Intelligence, 4) Systems Integration, 5) Custom Software Engineering, and 6) Oracle Fusion HCM advisory, BIP reports, and elite tech talent staffing.';
      } else if (lower.includes('spark ev') || lower.includes('solar') || lower.includes('clean energy')) {
        reply = 'Spark EV is a core clean-energy division of RDNT Sparkle Industries LLP in Andhra Pradesh, India. It focuses on residential and commercial solar power solutions, EV charging infrastructure planning, LiFePO4 battery storage, and South India clean-energy roadmaps.';
      } else if (lower.includes('affiliate') || lower.includes('sparkdeal') || lower.includes('revenue') || lower.includes('slickdeals')) {
        reply = 'SparkDeal Hub is our curated deal syndication grid for India ("Slickdeals for India"). It generates revenue through performance marketing agreements with verified vendors (Amazon India, Flipkart, Tata Neu). When users purchase through our links, the merchant pays a commission without increasing the consumer’s cost.';
      } else if (lower.includes('legal') || lower.includes('shield') || lower.includes('intermediary') || lower.includes('consumer')) {
        reply = 'The India Legal Shield provides complete statutory protection for RDNT Sparkle Industries LLP. It includes Safe Harbour Intermediary status under Section 79 of the Information Technology Act (2000), strict Consumer Protection (E-Commerce) Rules (2020) compliance, ASCI/FTC affiliate disclosures, and a designated Resident Grievance Officer in Andhra Pradesh.';
      } else if (lower.includes('sparksync') || lower.includes('sync') || lower.includes('automate')) {
        reply = 'SparkSync is our automated workflow hub. It runs background crawlers for Indian e-commerce price drops, automatically generates cloaked affiliate tracking links (sparkdeal-21), and broadcasts instant flash deals to 18,400+ subscribers across Telegram and WhatsApp.';
      } else {
        reply = `Radiant Spark Global bridges two distinct enterprises: Radiant Spark LLC in the United States (enterprise IT consulting & Oracle Cloud) and RDNT Sparkle Industries LLP in Andhra Pradesh, India (Spark EV, Sparkle Drinks, Spicy Sparkle Naturals, Sparkle Distribution Network, and the SparkDeal Hub). Feel free to ask about any division!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: reply
        }
      ]);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[580px]">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                Radiant Intelligence
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
              </h3>
              <p className="text-[11px] text-slate-400">Company &amp; Platform Guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Message Stream */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-6 h-6 rounded-md bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Suggestion Prompts */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] whitespace-nowrap transition-colors border border-slate-700/60"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Quick actions bar */}
        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onNavigateToView('india');
              }}
              className="text-amber-400 hover:underline"
            >
              Switch to India ↗
            </button>
            <span>·</span>
            <button
              onClick={() => {
                onClose();
                onNavigateToView('usa');
              }}
              className="text-cyan-400 hover:underline"
            >
              Switch to USA ↗
            </button>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenSparkSync();
            }}
            className="text-blue-400 font-semibold hover:underline flex items-center gap-1"
          >
            <Zap className="w-3 h-3 text-amber-400" />
            Open SparkSync App ↗
          </button>
        </div>

        {/* Input box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask about U.S. IT, India EV, SparkDeal Hub, or Legal Shield..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
