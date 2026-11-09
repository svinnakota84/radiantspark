# Radiant Spark Global

Preserves the earlier Radiant Spark visual design and navigation, with corrected functionality. A responsive customer-facing website for technology services, India business inquiries, retailer discovery, Lifestyle Hub and a ten-role Composio workspace.

## Build
Node 24: `npm ci`, `npm test`, `npm run lint`, `npm run build`. GitHub Actions publishes only `dist`. No source archives or database schemas are public build assets.

## What is live
The site navigation, retailer search and filtering, product details, division pages and Lifestyle Hub link work without service credentials. No invented price, discount, stock, transaction or agent activity metrics are displayed. The owner contact channel appears only when `VITE_CONTACT_EMAIL` is configured.

Product-feed settings are public `VITE_AMAZON_US_TAG`, `VITE_AMAZON_IN_TAG` and `VITE_DEALS_FEED_URL`. Without them, curated retailer search links work with no price claims. Approved Amazon tags enable the Associate disclosure. Feed links are restricted to their named retailers; a price requires a valid check timestamp within 24 hours. The website does not independently verify feed prices.

## Composio agents
The backend implementation is in `netlify/functions/agents.mjs`. It uses the actual Composio SDK and OpenAI Responses API, with ten role policies and restricted read-only tools. It is **not connected** until the backend host, server credentials and approved app connections are configured. GitHub Pages cannot execute serverless functions. See [setup](docs/COMPOSIO-SETUP.md). No keys are requested in chat or committed.

Public build variables are `VITE_AGENT_API_URL`, `VITE_LIFESTYLE_URL`, `VITE_CONTACT_EMAIL`, the Amazon tags and `VITE_DEALS_FEED_URL`. Set these in GitHub Actions Variables for Pages, then rebuild. Backend-only credentials are described in `.env.example` and belong in the serverless host's secret settings.

## Boundaries
The site does not take orders, execute payments, provide medical or legal services, certify registrations, or run unattended business operations. Business divisions are owner-described inquiry areas; product imagery is illustrative. Actual direct work needs a verified inquiry channel and agreed scope. Customer rights remain in force.

See [archive review](docs/ARCHIVE-REVIEW.md) and `public/business-readiness.html`.
