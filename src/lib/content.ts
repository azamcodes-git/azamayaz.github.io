import { site } from '@/data/site';
import { projects } from '@/data/projects';
import { products } from '@/data/products';
import { services } from '@/data/services';
import { research } from '@/data/research';
import { caseStudies } from '@/data/caseStudies';
import { technologies } from '@/data/technologies';
import { timeline } from '@/data/timeline';
import { testimonials } from '@/data/testimonials';
import { faqs } from '@/data/faqs';
import type {
  CaseStudy,
  FaqItem,
  Product,
  Project,
  ResearchArea,
  Service,
  SiteInfo,
  TechGroup,
  Testimonial,
  TimelineEntry,
} from '@/data/types';

/** The full editable content of the site — what /admin manages as one JSON document. */
export interface ContentData {
  site: SiteInfo;
  projects: Project[];
  products: Product[];
  services: Service[];
  research: ResearchArea[];
  caseStudies: CaseStudy[];
  technologies: TechGroup[];
  timeline: TimelineEntry[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
}

/** Live references to the bundled data modules (the defaults). */
const live: ContentData = {
  site,
  projects,
  products,
  services,
  research,
  caseStudies,
  technologies,
  timeline,
  testimonials,
  faqs,
};

/** Snapshot of the current (possibly overridden) content — used to seed the admin editor. */
export function contentSnapshot(): ContentData {
  return structuredClone(live);
}

function replaceArray<T>(target: T[], source: T[] | undefined) {
  if (!Array.isArray(source)) return;
  target.splice(0, target.length, ...source);
}

/**
 * Overrides the bundled defaults in place so every existing `import { projects }…`
 * keeps working untouched. Called once before the app renders, so components
 * never see stale data.
 */
export function applyContent(remote: Partial<ContentData>) {
  if (remote.site && typeof remote.site === 'object') Object.assign(site, remote.site);
  replaceArray(projects, remote.projects);
  replaceArray(products, remote.products);
  replaceArray(services, remote.services);
  replaceArray(research, remote.research);
  replaceArray(caseStudies, remote.caseStudies);
  replaceArray(technologies, remote.technologies);
  replaceArray(timeline, remote.timeline);
  replaceArray(testimonials, remote.testimonials);
  replaceArray(faqs, remote.faqs);
}

/**
 * Fetches the deployed content.json (published from the /admin panel) and applies
 * it over the bundled defaults. Silently falls back to the defaults when the file
 * doesn't exist yet or the network fails.
 */
export async function loadContent(): Promise<void> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}content.json`, { cache: 'no-store' });
    if (!res.ok) return;
    const type = res.headers.get('content-type') ?? '';
    if (!type.includes('json')) return; // SPA 404 fallback returns HTML — ignore it
    applyContent((await res.json()) as Partial<ContentData>);
  } catch {
    /* offline or missing — bundled defaults remain */
  }
}
