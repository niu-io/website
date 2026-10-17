import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { publishedPosts } from '../src/content/blog-policy.ts';
const post = (id: string, overrides = {}) => ({ id, data: { status: 'published', pinned: false, pinOrder: 0, publishedAt: '2026-10-01', ...overrides } });
const now = new Date('2026-10-18T00:00:00Z');
test('excludes drafts, archives and future posts from every publication consumer', () => {
  assert.deepEqual(publishedPosts([post('draft', {status:'draft',pinned:true}), post('archive', {status:'archived'}), post('future',{publishedAt:'2026-10-19'}), post('today',{publishedAt:'2026-10-18'})], now).map(p => p.id), ['today']);
});
test('pins before newer posts with stable editorial order without mutating input', () => {
  const posts = [post('new',{publishedAt:'2026-10-18'}), post('pin2',{pinned:true,pinOrder:2}), post('why-niu',{pinned:true}), post('old')];
  assert.deepEqual(publishedPosts(posts,now).map(p => p.id), ['why-niu','pin2','new','old']);
  assert.equal(posts[0].id,'new');
});
