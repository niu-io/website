import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { publishedPosts } from '../content/blog-policy';

export const prerender = true;
const escapeXml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

export const GET: APIRoute = async ({ site }) => {
  const paths = ['/', '/models/', '/docs/', '/compare/', '/compare/new-api/', '/compare/openrouter/', '/blog/'];
  const posts = publishedPosts(await getCollection('blog'));
  paths.push(...posts.map(post => `/blog/${post.id}/`));
  const urls = paths.map(path => `<url><loc>${escapeXml(new URL(path, site ?? 'https://niu.io').href)}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
