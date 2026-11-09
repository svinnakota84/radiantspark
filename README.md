# Radiant Spark LLC website

React + Vite site. Build with Node 24: `npm ci`, `npm run lint`, `npm run build`. GitHub Actions deploys `dist` to Pages on `main` (Settings > Pages > Source: GitHub Actions).

## What is real and what is a demo
- **SparkDeals**: product finder. Links go to the store; no prices, discounts or coupons are shown unless a verified feed supplies them with a checked-at time.
- **Payments**: no card form. Plans open a Stripe Payment Link (`VITE_STRIPE_LINKS`); without one, the site says checkout is not open.
- **Markets ticker**: real quotes only when `VITE_FINNHUB_KEY` is set; otherwise a "not connected" notice.
- **Operations planner**: fictional planning roles and browser-local tasks. No AI, ERP, invoicing, WhatsApp or fulfillment service is connected.

## Live deals feed
Host a JSON array at an HTTPS URL and set `VITE_DEALS_FEED_URL`:
`[{"id":"x1","title":"...","category":"electronics","description":"...","amazonIndiaUrl":"https://...","price":"₹1,799","priceCheckedAt":"2026-11-09T03:00:00Z"}]`
A price is displayed only with a valid checked-at timestamp from the last 24 hours. The owner must authorize and verify the feed; this site does not independently verify merchant prices. Follow each affiliate program's rules on price freshness.

## Before going live
Confirm you own the domain (`public/CNAME` is `radiantsparkllc.com`; delete it if not), set your approved affiliate tags, have a lawyer review the legal pages, and verify tax rates (beverage tax classification needs professional confirmation) and licences with an Indian CA.

## GitHub Actions configuration
Set public build settings under Settings > Secrets and variables > Actions > Variables. The workflow reads VITE_STRIPE_LINKS, VITE_AMAZON_US_TAG, VITE_AMAZON_IN_TAG, VITE_DEALS_FEED_URL and VITE_CONTACT_EMAIL. Set VITE_FINNHUB_KEY under Actions Secrets; it is still visible in the compiled browser app. Changes require a new build. Never add a Stripe secret key to a VITE_ variable.

Lifestyle member access, personalized coaching and WhatsApp delivery remain unavailable. Hosted checkout does not create an authenticated subscription on this static site; fulfillment needs a server-verified webhook and member backend.

## Checks
Run `npm test`, `npm run lint` (TypeScript), and `npm run build`. Product-feed tests cover merchant impersonation, unsafe URLs, duplicates and stale/future prices. The production build excludes internal SQL, archived site copies and obsolete downloadable ZIPs. Browser testing and real service activation are separate from a passing build.
