import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDealsFeed } from '../src/utils/dealsFeed';
const now = Date.parse('2026-11-09T04:00:00Z');
const item = { id: 'one', title: 'Product', amazonUsaUrl: 'https://www.amazon.com/s?k=product', price: '$10', priceCheckedAt: '2026-11-09T03:00:00Z' };
test('feed accepts retailer links and fresh supplied prices', () => {
  const [result] = parseDealsFeed([item], now)!;
  assert.equal(result.price, '$10');
  assert.equal(Date.parse(result.priceCheckedAt!), Date.parse(item.priceCheckedAt));
});
test('feed rejects retailer impersonation, script URLs and URL credentials', () => {
  for (const url of ['https://amazon.com.evil.example/x', 'javascript:alert(1)', 'https://amazon.com@evil.example/x', 'http://amazon.com/x', 'https://user:pass@amazon.com/x']) {
    assert.equal(parseDealsFeed([{...item, amazonUsaUrl: url}], now), null);
  }
});
test('feed suppresses stale, future, missing and invalid price timestamps', () => {
  for (const timestamp of ['2026-11-07T03:00:00Z', '2026-11-10T03:00:00Z', '', 'invalid', undefined]) {
    assert.equal(parseDealsFeed([{...item, priceCheckedAt: timestamp}], now)![0].price, undefined);
  }
});
test('feed ignores malformed records and duplicate IDs', () => {
  assert.equal(parseDealsFeed(null, now), null);
  assert.equal(parseDealsFeed([null, {}, item, item], now)!.length, 1);
});
