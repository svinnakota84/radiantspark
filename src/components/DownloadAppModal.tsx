import React from 'react';
export const DownloadAppModal = ({isOpen,onClose}:{isOpen:boolean;onClose:()=>void}) => !isOpen ? null : (
  <div role="dialog" aria-modal="true" aria-label="Mobile website" className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
    <section className="max-w-lg p-8 rounded-2xl bg-slate-900 text-slate-200 border border-slate-700">
      <h2 className="text-2xl font-bold text-white">Use Radiant Spark on mobile</h2>
      <p className="my-4">Open this responsive website on your phone or tablet. Native app downloads and offline support are not available.</p>
      <p className="my-4">You can add a shortcut using your browser’s Add to Home Screen option, where supported.</p>
      <button autoFocus onClick={onClose} className="px-5 py-3 rounded-lg bg-amber-500 text-black font-semibold">Close</button>
    </section>
  </div>
);
