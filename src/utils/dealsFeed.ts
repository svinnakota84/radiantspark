import { DealItem } from '../types';

const CATEGORIES = ['energy', 'electronics', 'beverages', 'food', 'logistics'];
const STORES = {
  amazonUsaUrl: 'amazon.com',
  amazonIndiaUrl: 'amazon.in',
  walmartUrl: 'walmart.com',
  flipkartUrl: 'flipkart.com',
} as const;

function httpsUrl(value: unknown, domain?: string): string | undefined {
  if (typeof value !== 'string') return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return undefined;
    if (domain && url.hostname !== domain && !url.hostname.endsWith(`.${domain}`)) return undefined;
    return url.href;
  } catch { return undefined; }
}

// An owner-supplied feed is not independently verified by the website.
export function parseDealsFeed(data: unknown, now = Date.now()): DealItem[] | null {
  if (!Array.isArray(data)) return null;
  const items: DealItem[] = [];
  const ids = new Set<string>();
  for (const d of data.slice(0, 500)) {
    if (!d || typeof d.id !== 'string' || !d.id.trim() || typeof d.title !== 'string' || !d.title.trim()) continue;
    const id = d.id.slice(0, 80);
    if (ids.has(id)) continue;
    const links = Object.fromEntries(Object.entries(STORES).map(([field, domain]) => [field, httpsUrl(d[field], domain)]));
    if (!Object.values(links).some(Boolean)) continue;
    const checked = typeof d.priceCheckedAt === 'string' ? Date.parse(d.priceCheckedAt) : NaN;
    const fresh = Number.isFinite(checked) && checked <= now && now - checked <= 86_400_000;
    const hasPrice = typeof d.price === 'string' && d.price.trim() && fresh;
    ids.add(id);
    items.push({
      id,
      title: d.title.slice(0, 160),
      category: CATEGORIES.includes(d.category) ? d.category : 'electronics',
      description: typeof d.description === 'string' ? d.description.slice(0, 300) : '',
      ...links,
      imageUrl: httpsUrl(d.imageUrl),
      price: hasPrice ? d.price.slice(0, 40) : undefined,
      priceCheckedAt: hasPrice ? new Date(checked).toISOString() : undefined,
    });
  }
  return items.length ? items : null;
}

export async function loadDealsFeed(): Promise<DealItem[] | null> {
  const url = httpsUrl(import.meta.env.VITE_DEALS_FEED_URL);
  if (!url) return null;
  try {
    const res = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(10_000) });
    if (!res.ok) return null;
    return parseDealsFeed(await res.json());
  } catch { return null; }
}
