import type { SiteInfo } from './types';

/**
 * Global site configuration — single source of truth for identity & links.
 * These are the bundled defaults; a deployed /content.json (managed from the
 * /admin panel) overrides them at boot. Mutable by design — see lib/content.ts.
 */
export const site: SiteInfo = {
  name: 'Azam Ayaz',
  role: 'Software Engineer & Founder',
  shortBio:
    'I design and build AI-powered applications, full-stack web systems, and scalable business software.',
  url: 'https://azamayaz.com',
  email: 'muhammad.azam.dev@gmail.com',
  location: 'Available worldwide · Remote-first',
  availability: 'Open to select projects',
  social: {
    github: { label: 'GitHub', href: '#', handle: '@azamayaz' },
    linkedin: { label: 'LinkedIn', href: '#', handle: 'azamayaz' },
    x: { label: 'X', href: '#', handle: '@azamayaz' },
    email: { label: 'Email', href: 'mailto:muhammad.azam.dev@gmail.com', handle: 'muhammad.azam.dev@gmail.com' },
  },
  nav: [
    { label: 'Work', to: '/projects' },
    { label: 'Products', to: '/products' },
    { label: 'Services', to: '/services' },
    { label: 'Research', to: '/research' },
    { label: 'Case Studies', to: '/case-studies' },
    { label: 'About', to: '/about' },
  ],
  stats: [
    { value: '20+', label: 'Systems shipped' },
    { value: '8', label: 'Domains covered' },
    { value: '100%', label: 'Ownership mindset' },
    { value: 'AI-first', label: 'Engineering approach' },
  ],
};
