/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ShieldCheck, Mail, Send } from 'lucide-react';

interface TakedownModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TakedownModal: React.FC<TakedownModalProps> = ({ isOpen, onClose }) => {
  const [complaintType, setComplaintType] = useState('ip_infringement');
  const [complainantName, setComplainantName] = useState('');
  const [complainantEmail, setComplainantEmail] = useState('');
  const [urlOrItem, setUrlOrItem] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedTicket = `RDNT-GRV-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketNumber(generatedTicket);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setComplainantName('');
    setComplainantEmail('');
    setUrlOrItem('');
    setDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Statutory Takedown Notice &amp; Grievance Filing
            </h3>
            <p className="text-xs text-slate-400">
              Pursuant to Rule 3(2) of the IT (Intermediary Guidelines) Rules, 2021
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white">Notice Successfully Registered</h4>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300">
              Official Grievance Ticket: <strong className="text-white">{ticketNumber}</strong>
            </div>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Your grievance has been lodged with the Resident Grievance Officer in Andhra Pradesh.
              A formal acknowledgment will be transmitted to <strong>{complainantEmail}</strong> within 24 hours.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Type of Grievance</label>
              <select
                value={complaintType}
                onChange={(e) => setComplaintType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-400"
              >
                <option value="ip_infringement">Trademark / Intellectual Property Notice</option>
                <option value="pricing_dispute">Third-Party Price Gouging or Inaccurate Listing</option>
                <option value="consumer_complaint">Consumer Protection Act Inquiry</option>
                <option value="intermediary_takedown">Court Order or Law Enforcement Direction</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={complainantName}
                  onChange={(e) => setComplainantName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-400"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="legal@brand.com"
                  value={complainantEmail}
                  onChange={(e) => setComplainantEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Specific Deal URL or Product ID</label>
              <input
                type="text"
                required
                placeholder="e.g. /#sparkdeal-hub or deal-solar-kit-1"
                value={urlOrItem}
                onChange={(e) => setUrlOrItem(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Factual Grounds &amp; Claim Summary</label>
              <textarea
                required
                rows={3}
                placeholder="State the statutory grounds, registration numbers, or facts..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-400"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                As an Intermediary under Section 79, RDNT Sparkle Industries LLP acts upon receipt of formal notice in accordance with Indian statutory due diligence rules.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Formal Notice
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
