import type { ContentData } from '@/lib/content';

/** Field descriptor consumed by the schema-driven form renderer. */
export type FieldDef =
  | { path: string; label: string; type: 'text' | 'textarea' | 'number' | 'checkbox'; hint?: string; rows?: number }
  | { path: string; label: string; type: 'select'; options: string[]; hint?: string }
  | { path: string; label: string; type: 'lines'; hint?: string; rows?: number }
  | { path: string; label: string; type: 'pairs'; keys: string[]; hint?: string; rows?: number };

export interface CollectionDef {
  key: Exclude<keyof ContentData, 'site'>;
  label: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemLabel: (item: any) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  template: () => any;
  fields: FieldDef[];
}

const COVER_COLORS = [
  'indigo-500', 'indigo-400', 'cyan-500', 'cyan-400', 'emerald-500', 'emerald-400',
  'lime-500', 'lime-400', 'violet-500', 'violet-400', 'fuchsia-500', 'fuchsia-400',
  'sky-500', 'sky-400', 'rose-500', 'rose-400', 'orange-500', 'orange-400',
  'teal-500', 'teal-400',
];

const ICONS = [
  'sparkles', 'layers', 'globe', 'server', 'workflow', 'building',
  'code', 'cpu', 'eye', 'rocket', 'shield',
];

const CATEGORIES_HINT =
  'One per line. Known filters: AI, Business Software, Web Application, Research, Automation, Computer Vision, Dashboard, Enterprise';

/** Fields for the singleton “Site & Identity” tab. */
export const siteFields: FieldDef[] = [
  { path: 'name', label: 'Name', type: 'text' },
  { path: 'role', label: 'Role / headline', type: 'text' },
  { path: 'shortBio', label: 'Short bio', type: 'textarea', rows: 3, hint: 'Used in the footer, SEO description, and hero.' },
  { path: 'url', label: 'Canonical site URL', type: 'text', hint: 'Used for SEO tags and structured data.' },
  { path: 'email', label: 'Contact email', type: 'text' },
  { path: 'location', label: 'Location line', type: 'text' },
  { path: 'availability', label: 'Availability badge', type: 'text', hint: 'Shown with the pulsing dot in the hero.' },
  { path: 'social.github.href', label: 'GitHub URL', type: 'text' },
  { path: 'social.github.handle', label: 'GitHub handle', type: 'text' },
  { path: 'social.linkedin.href', label: 'LinkedIn URL', type: 'text' },
  { path: 'social.linkedin.handle', label: 'LinkedIn handle', type: 'text' },
  { path: 'social.x.href', label: 'X / Twitter URL', type: 'text' },
  { path: 'social.x.handle', label: 'X handle', type: 'text' },
  { path: 'nav', label: 'Navigation links', type: 'pairs', keys: ['label', 'to'], hint: 'One per line — format: Label | /path' },
  { path: 'stats', label: 'Hero stats', type: 'pairs', keys: ['value', 'label'], hint: 'One per line — format: Value | Label (e.g. 20+ | Systems shipped)' },
];

export const collections: CollectionDef[] = [
  {
    key: 'projects',
    label: 'Projects',
    description: 'Portfolio case pages shown under /projects.',
    itemLabel: (p) => p.title || p.slug || 'Untitled project',
    template: () => ({
      slug: 'new-project',
      title: 'New Project',
      tagline: '',
      categories: ['Web Application'],
      year: new Date().getFullYear(),
      featured: false,
      cover: { from: 'indigo-500', to: 'cyan-400' },
      overview: '', problem: '', solution: '', architecture: '',
      features: [], stack: [], challenges: [], highlights: [], futureWork: [],
      gallery: [], links: { demo: '#', github: '#', docs: '#' },
    }),
    fields: [
      { path: 'title', label: 'Title', type: 'text' },
      { path: 'slug', label: 'Slug', type: 'text', hint: 'URL id — lowercase-with-dashes, must be unique.' },
      { path: 'tagline', label: 'Tagline', type: 'text' },
      { path: 'year', label: 'Year', type: 'number' },
      { path: 'featured', label: 'Featured on homepage', type: 'checkbox' },
      { path: 'cover.from', label: 'Cover gradient — from', type: 'select', options: COVER_COLORS },
      { path: 'cover.to', label: 'Cover gradient — to', type: 'select', options: COVER_COLORS },
      { path: 'categories', label: 'Categories', type: 'lines', rows: 3, hint: CATEGORIES_HINT },
      { path: 'overview', label: 'Overview', type: 'textarea' },
      { path: 'problem', label: 'Business problem', type: 'textarea' },
      { path: 'solution', label: 'Solution', type: 'textarea' },
      { path: 'architecture', label: 'Architecture', type: 'textarea' },
      { path: 'features', label: 'Key features', type: 'lines' },
      { path: 'stack', label: 'Technology stack', type: 'lines' },
      { path: 'challenges', label: 'Challenges solved', type: 'lines', rows: 4 },
      { path: 'highlights', label: 'Development highlights', type: 'lines', rows: 4 },
      { path: 'futureWork', label: 'Future improvements', type: 'lines', rows: 4 },
      { path: 'gallery', label: 'Screenshot captions', type: 'pairs', keys: ['caption'], rows: 4, hint: 'One caption per line.' },
      { path: 'links.demo', label: 'Demo URL', type: 'text', hint: 'Use # as a placeholder.' },
      { path: 'links.github', label: 'GitHub URL', type: 'text' },
      { path: 'links.docs', label: 'Docs URL', type: 'text' },
    ],
  },
  {
    key: 'products',
    label: 'Products',
    description: 'Marketplace items shown under /products.',
    itemLabel: (p) => p.name || p.slug || 'Untitled product',
    template: () => ({
      slug: 'new-product',
      name: 'New Product',
      category: 'Business Software',
      badge: '',
      summary: '', description: '',
      cover: { from: 'teal-500', to: 'emerald-400' },
      features: [], technologies: [], screenshots: [],
      pricing: [{ label: 'Single license', price: 'Contact', note: 'Source code + 1 deployment' }],
      licensing: '', faq: [],
    }),
    fields: [
      { path: 'name', label: 'Name', type: 'text' },
      { path: 'slug', label: 'Slug', type: 'text', hint: 'URL id — unique.' },
      { path: 'category', label: 'Category', type: 'text' },
      { path: 'badge', label: 'Badge', type: 'text', hint: 'Optional, e.g. “Best seller”. Leave empty for none.' },
      { path: 'cover.from', label: 'Cover gradient — from', type: 'select', options: COVER_COLORS },
      { path: 'cover.to', label: 'Cover gradient — to', type: 'select', options: COVER_COLORS },
      { path: 'summary', label: 'Card summary', type: 'textarea', rows: 2 },
      { path: 'description', label: 'Full description', type: 'textarea' },
      { path: 'features', label: 'Features', type: 'lines' },
      { path: 'technologies', label: 'Technologies', type: 'lines', rows: 3 },
      { path: 'screenshots', label: 'Screenshot captions', type: 'pairs', keys: ['caption'], rows: 3, hint: 'One caption per line.' },
      { path: 'pricing', label: 'Pricing tiers', type: 'pairs', keys: ['label', 'price', 'note'], rows: 3 },
      { path: 'licensing', label: 'Licensing text', type: 'textarea', rows: 3 },
      { path: 'faq', label: 'Product FAQ', type: 'pairs', keys: ['question', 'answer'], rows: 5 },
    ],
  },
  {
    key: 'services',
    label: 'Services',
    description: 'Offerings shown under /services.',
    itemLabel: (s) => s.title || s.slug || 'Untitled service',
    template: () => ({
      slug: 'new-service', title: 'New Service', icon: 'sparkles',
      short: '', description: '', benefits: [], deliverables: [], engagement: [],
    }),
    fields: [
      { path: 'title', label: 'Title', type: 'text' },
      { path: 'slug', label: 'Slug', type: 'text' },
      { path: 'icon', label: 'Icon', type: 'select', options: ICONS },
      { path: 'short', label: 'Short pitch', type: 'text' },
      { path: 'description', label: 'Description', type: 'textarea' },
      { path: 'benefits', label: 'Benefits', type: 'lines', rows: 4 },
      { path: 'deliverables', label: 'Deliverables', type: 'lines', rows: 4 },
      { path: 'engagement', label: 'Engagement flow', type: 'pairs', keys: ['step', 'detail'], rows: 4 },
    ],
  },
  {
    key: 'research',
    label: 'Research',
    description: 'Research areas shown under /research.',
    itemLabel: (r) => r.title || r.slug || 'Untitled area',
    template: () => ({
      slug: 'new-area', title: 'New Research Area', field: 'Artificial Intelligence',
      status: 'Exploratory', summary: '', details: '', methods: [],
    }),
    fields: [
      { path: 'title', label: 'Title', type: 'text' },
      { path: 'slug', label: 'Slug', type: 'text' },
      { path: 'field', label: 'Field', type: 'text' },
      { path: 'status', label: 'Status', type: 'select', options: ['Active', 'Ongoing', 'Exploratory'] },
      { path: 'summary', label: 'Summary', type: 'textarea', rows: 2 },
      { path: 'details', label: 'Details', type: 'textarea' },
      { path: 'methods', label: 'Methods & techniques', type: 'lines', rows: 4 },
    ],
  },
  {
    key: 'caseStudies',
    label: 'Case Studies',
    description: 'Long-form stories shown under /case-studies.',
    itemLabel: (c) => c.title || c.slug || 'Untitled case study',
    template: () => ({
      slug: 'new-case-study', title: 'New Case Study', client: 'Client', industry: 'Industry',
      summary: '', problem: '', solution: '', architecture: '',
      decisions: [], obstacles: [], lessons: [], outcomes: [], stack: [],
    }),
    fields: [
      { path: 'title', label: 'Title', type: 'text' },
      { path: 'slug', label: 'Slug', type: 'text' },
      { path: 'client', label: 'Client', type: 'text' },
      { path: 'industry', label: 'Industry', type: 'text' },
      { path: 'summary', label: 'Summary', type: 'textarea', rows: 2 },
      { path: 'problem', label: 'The problem', type: 'textarea' },
      { path: 'solution', label: 'The solution', type: 'textarea' },
      { path: 'architecture', label: 'Architecture', type: 'textarea' },
      { path: 'decisions', label: 'Key decisions', type: 'lines', rows: 4 },
      { path: 'obstacles', label: 'Obstacles', type: 'lines', rows: 4 },
      { path: 'lessons', label: 'Lessons learned', type: 'lines', rows: 4 },
      { path: 'outcomes', label: 'Outcome stats', type: 'pairs', keys: ['metric', 'label'], rows: 3, hint: 'e.g. 90% | less time on manual reporting' },
      { path: 'stack', label: 'Stack', type: 'lines', rows: 3 },
    ],
  },
  {
    key: 'technologies',
    label: 'Technologies',
    description: 'Skill groups shown on the homepage, About page, and marquee.',
    itemLabel: (g) => g.category || 'Untitled group',
    template: () => ({ category: 'New Category', items: [] }),
    fields: [
      { path: 'category', label: 'Category', type: 'text' },
      { path: 'items', label: 'Items', type: 'pairs', keys: ['name', 'note'], rows: 7, hint: 'e.g. React | Component architecture & SPAs' },
    ],
  },
  {
    key: 'timeline',
    label: 'Timeline',
    description: 'Career timeline shown on the About page (newest first).',
    itemLabel: (t) => `${t.period ?? ''} — ${t.title ?? ''}`,
    template: () => ({
      period: '2026', title: 'New Milestone', org: '', kind: 'milestone', description: '',
    }),
    fields: [
      { path: 'period', label: 'Period', type: 'text', hint: 'e.g. 2025 — Present' },
      { path: 'title', label: 'Title', type: 'text' },
      { path: 'org', label: 'Organization', type: 'text' },
      { path: 'kind', label: 'Kind', type: 'select', options: ['education', 'milestone', 'project', 'growth', 'venture'] },
      { path: 'description', label: 'Description', type: 'textarea', rows: 3 },
    ],
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    description: 'Client quotes shown on the homepage.',
    itemLabel: (t) => `${t.name ?? ''} (${t.company ?? ''})`,
    template: () => ({ quote: '', name: 'Client Name', role: 'Role', company: 'Company', initials: 'CN' }),
    fields: [
      { path: 'quote', label: 'Quote', type: 'textarea' },
      { path: 'name', label: 'Name', type: 'text' },
      { path: 'role', label: 'Role', type: 'text' },
      { path: 'company', label: 'Company', type: 'text' },
      { path: 'initials', label: 'Avatar initials', type: 'text', hint: '2 letters shown in the avatar circle.' },
    ],
  },
  {
    key: 'faqs',
    label: 'FAQs',
    description: 'Questions shown on the homepage and contact page.',
    itemLabel: (f) => f.question || 'Untitled question',
    template: () => ({ category: 'General', question: 'New question?', answer: '' }),
    fields: [
      { path: 'category', label: 'Category', type: 'text' },
      { path: 'question', label: 'Question', type: 'text' },
      { path: 'answer', label: 'Answer', type: 'textarea' },
    ],
  },
];
