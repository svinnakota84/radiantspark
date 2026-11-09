import { DealItem } from '../types';

// Affiliate tags come from environment variables. Without them, links are plain
// merchant searches (no commission is claimed or earned).
const TAG_US = import.meta.env.VITE_AMAZON_US_TAG as string | undefined;
const TAG_IN = import.meta.env.VITE_AMAZON_IN_TAG as string | undefined;
export const HAS_AFFILIATE_TAGS = Boolean(TAG_US || TAG_IN);

const enc = encodeURIComponent;
const amazonUs = (q: string) => `https://www.amazon.com/s?k=${enc(q)}${TAG_US ? `&tag=${enc(TAG_US)}` : ''}`;
const amazonIn = (q: string) => `https://www.amazon.in/s?k=${enc(q)}${TAG_IN ? `&tag=${enc(TAG_IN)}` : ''}`;
const walmart = (q: string) => `https://www.walmart.com/search?q=${enc(q)}`;
const flipkart = (q: string) => `https://www.flipkart.com/search?q=${enc(q)}`;

/**
 * Curated product searches. No prices, discounts, coupon codes or stock claims:
 * the merchant's page is the only source of those. To show real prices, publish a
 * verified feed (see README "Live deals feed") and set VITE_DEALS_FEED_URL.
 */
export const INITIAL_DEALS: DealItem[] = [
  { id: 'ipad', title: 'Apple iPad (10th generation)', category: 'electronics',
    description: 'Compare current iPad listings, storage options and seller ratings.',
    amazonUsaUrl: amazonUs('Apple iPad 10th generation'), amazonIndiaUrl: amazonIn('Apple iPad 10th generation'), walmartUrl: walmart('Apple iPad 10th generation'), flipkartUrl: flipkart('Apple iPad 10th generation') },
  { id: 'airpods-pro', title: 'Apple AirPods Pro (2nd generation)', category: 'electronics',
    description: 'Check current offers on AirPods Pro and confirm the seller is authorized.',
    amazonUsaUrl: amazonUs('AirPods Pro 2nd generation'), amazonIndiaUrl: amazonIn('AirPods Pro 2nd generation'), walmartUrl: walmart('AirPods Pro 2nd generation') },
  { id: 'noise-cancelling', title: 'Noise-cancelling headphones', category: 'electronics',
    description: 'Search Sony, Bose and other noise-cancelling headphones across stores.',
    amazonUsaUrl: amazonUs('noise cancelling headphones'), amazonIndiaUrl: amazonIn('noise cancelling headphones'), flipkartUrl: flipkart('noise cancelling headphones') },
  { id: 'gan-charger', title: '65W GaN multi-port charger', category: 'electronics',
    description: 'Compact chargers for laptops and phones. Look for BIS certification in India.',
    amazonUsaUrl: amazonUs('65W GaN charger USB-C'), amazonIndiaUrl: amazonIn('65W GaN charger USB-C'), flipkartUrl: flipkart('65W GaN charger') },
  { id: 'fitness-watch', title: 'GPS fitness smartwatch', category: 'electronics',
    description: 'Compare GPS watches by battery life, display and workout tracking.',
    amazonUsaUrl: amazonUs('GPS fitness smartwatch'), amazonIndiaUrl: amazonIn('GPS fitness smartwatch'), flipkartUrl: flipkart('GPS smartwatch') },
  { id: 'rooftop-solar', title: 'Home solar starter kit', category: 'energy',
    description: 'Browse small solar kits. Installation, grid connection and subsidies need a qualified installer.',
    amazonUsaUrl: amazonUs('solar panel kit'), amazonIndiaUrl: amazonIn('solar panel kit 3kW') },
  { id: 'ev-charger', title: 'Level 2 EV charger', category: 'energy',
    description: 'Compare home EV chargers by amperage and connector type. Have a licensed electrician install it.',
    amazonUsaUrl: amazonUs('level 2 EV charger 32A'), amazonIndiaUrl: amazonIn('Type 2 EV charger 7.4kW') },
  { id: 'label-printer', title: 'Thermal shipping label printer', category: 'logistics',
    description: 'A 4x6 thermal printer for small-business shipping labels.',
    amazonUsaUrl: amazonUs('4x6 thermal label printer'), amazonIndiaUrl: amazonIn('4x6 thermal label printer'), walmartUrl: walmart('4x6 thermal label printer') },
  { id: 'cashew-almonds', title: 'Roasted cashews and almonds', category: 'food',
    description: 'Compare dry-fruit packs. Check the packed-on date and FSSAI number on the label.',
    amazonIndiaUrl: amazonIn('roasted cashews almonds 1kg'), flipkartUrl: flipkart('cashews almonds 1kg') },
];
