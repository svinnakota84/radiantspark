import React from 'react';
const configuredEmail = import.meta.env.VITE_CONTACT_EMAIL;
const email = typeof configuredEmail === 'string' && /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(configuredEmail) ? configuredEmail : null;
export const ContactLink = () => email ? <a className="inline-block underline text-amber-300 py-2" href={`mailto:${email}`}>Email Radiant Spark</a> : <p className="text-slate-400">A public contact address has not been configured yet.</p>;
