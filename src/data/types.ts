/**
 * Shared content types. All page content is data-driven so future updates only
 * touch these structured files — never the rendering components.
 */

export type ProjectCategory =
  | 'AI'
  | 'Business Software'
  | 'Web Application'
  | 'Research'
  | 'Automation'
  | 'Computer Vision'
  | 'Dashboard'
  | 'Enterprise';

export interface ProjectLink {
  demo?: string;
  github?: string;
  docs?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  categories: ProjectCategory[];
  year: number;
  featured?: boolean;
  /** Accent gradient pair (Tailwind color stops) for the generated cover art. */
  cover: { from: string; to: string };
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  architecture: string;
  challenges: string[];
  highlights: string[];
  futureWork: string[];
  /** Screenshot placeholders — captions describe planned imagery. */
  gallery: { caption: string }[];
  links: ProjectLink;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  cover: { from: string; to: string };
  features: string[];
  technologies: string[];
  screenshots: { caption: string }[];
  pricing: { label: string; price: string; note: string }[];
  licensing: string;
  faq: FaqItem[];
  badge?: string;
}

export interface Service {
  slug: string;
  title: string;
  icon: string;
  short: string;
  description: string;
  benefits: string[];
  deliverables: string[];
  engagement: { step: string; detail: string }[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface TechGroup {
  category: string;
  items: { name: string; note: string }[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  kind: 'education' | 'milestone' | 'project' | 'growth' | 'venture';
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string;
  decisions: string[];
  obstacles: string[];
  lessons: string[];
  outcomes: { metric: string; label: string }[];
  stack: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Initials shown in the avatar placeholder. */
  initials: string;
}

export interface ResearchArea {
  slug: string;
  title: string;
  field: string;
  summary: string;
  details: string;
  methods: string[];
  status: 'Active' | 'Ongoing' | 'Exploratory';
}
