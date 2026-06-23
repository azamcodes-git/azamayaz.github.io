import { useEffect } from 'react';
import { site } from '@/data/site';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  /** Optional JSON-LD structured data object(s) for this route. */
  schema?: object | object[];
  image?: string;
}

const FULL_TITLE = (t: string) => (t.includes(site.name) ? t : `${t} — ${site.name}`);

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Imperative head manager — keeps title, meta, canonical, and JSON-LD in sync
 * with the active route without an extra dependency. Cleans up its schema node.
 */
export function Seo({ title, description, path = '/', schema, image }: SeoProps) {
  const fullTitle = FULL_TITLE(title);
  const url = `${site.url}${path}`;
  const img = image ?? `${site.url}/og-image.svg`;

  useEffect(() => {
    document.title = fullTitle;
    upsertMeta('meta[name="description"]', 'name', 'description', description);
    upsertLink('canonical', url);

    upsertMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', url);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', img);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', img);
  }, [fullTitle, description, url, img]);

  useEffect(() => {
    if (!schema) return;
    const node = document.createElement('script');
    node.type = 'application/ld+json';
    node.text = JSON.stringify(schema);
    node.dataset.seoRoute = 'true';
    document.head.appendChild(node);
    return () => {
      node.remove();
    };
  }, [schema]);

  return null;
}
