import type { Service } from './types';

/** Premium service offerings. `icon` maps to a key in the Icon component. */
export const services: Service[] = [
  {
    slug: 'ai-applications',
    title: 'AI-Powered Applications',
    icon: 'sparkles',
    short: 'Production AI features that do real work — not demos.',
    description:
      'I build AI into products where it creates measurable value: assistants, agents, document understanding, and intelligent automation grounded in your data.',
    benefits: [
      'AI grounded in your data to reduce hallucination',
      'Tool-calling agents that take real actions',
      'Pragmatic scoping — AI where it pays off, not everywhere',
    ],
    deliverables: ['Working AI feature or agent', 'Evaluation & guardrails', 'Integration with your stack', 'Documentation'],
    engagement: [
      { step: 'Discovery', detail: 'Identify the highest-leverage AI use case and success metrics.' },
      { step: 'Prototype', detail: 'Build a focused proof of value quickly.' },
      { step: 'Productionize', detail: 'Harden, evaluate, and integrate it into your product.' },
    ],
  },
  {
    slug: 'full-stack',
    title: 'Full-Stack Development',
    icon: 'layers',
    short: 'End-to-end product engineering, from database to UI.',
    description:
      'Complete ownership of the build: data modeling, APIs, frontend, and deployment — delivered as a coherent, maintainable system.',
    benefits: ['One accountable owner end-to-end', 'Coherent architecture', 'Faster iteration with fewer hand-offs'],
    deliverables: ['Architected codebase', 'REST API', 'Responsive frontend', 'Deployment setup'],
    engagement: [
      { step: 'Architecture', detail: 'Design the data model and system boundaries.' },
      { step: 'Build', detail: 'Ship in vertical slices you can review continuously.' },
      { step: 'Launch', detail: 'Deploy, monitor, and hand over cleanly.' },
    ],
  },
  {
    slug: 'web-development',
    title: 'Custom Web Development',
    icon: 'globe',
    short: 'Fast, accessible, conversion-focused web applications.',
    description:
      'Bespoke web apps and marketing sites built with React and TypeScript — performant, accessible, and built to convert.',
    benefits: ['Excellent Core Web Vitals', 'Accessible by default', 'SEO-ready architecture'],
    deliverables: ['React + TypeScript app', 'Responsive design system', 'SEO & performance baseline'],
    engagement: [
      { step: 'Define', detail: 'Clarify goals, audience, and success metrics.' },
      { step: 'Design & build', detail: 'Iterate on a polished, accessible interface.' },
      { step: 'Optimize', detail: 'Tune performance, SEO, and analytics.' },
    ],
  },
  {
    slug: 'backend-apis',
    title: 'Django & REST API Systems',
    icon: 'server',
    short: 'Robust backends and clean APIs that scale.',
    description:
      'Reliable Django and Python backends with well-designed REST APIs, sound data modeling, authentication, and background processing.',
    benefits: ['Clean, documented APIs', 'Secure auth & permissions', 'Scalable data architecture'],
    deliverables: ['Django/DRF backend', 'Versioned REST API', 'Auth & RBAC', 'API documentation'],
    engagement: [
      { step: 'Model', detail: 'Design the schema and API contract.' },
      { step: 'Implement', detail: 'Build endpoints, auth, and background jobs.' },
      { step: 'Document', detail: 'Deliver tested, documented, deployable services.' },
    ],
  },
  {
    slug: 'business-automation',
    title: 'Business Automation',
    icon: 'workflow',
    short: 'Replace manual, repetitive work with reliable software.',
    description:
      'I automate the workflows that drain your team — data entry, reporting, document generation, and cross-system syncing — with auditable, dependable systems.',
    benefits: ['Hours of manual work eliminated', 'Fewer human errors', 'Auditable, repeatable processes'],
    deliverables: ['Automation workflows', 'Integrations', 'Monitoring & logs'],
    engagement: [
      { step: 'Map', detail: 'Document the current manual process.' },
      { step: 'Automate', detail: 'Build and test the automation.' },
      { step: 'Monitor', detail: 'Add logging and alerts for reliability.' },
    ],
  },
  {
    slug: 'enterprise-systems',
    title: 'Enterprise & ERP Solutions',
    icon: 'building',
    short: 'Inventory, payroll, and ERP-style systems tailored to you.',
    description:
      'Custom operational software — inventory, payroll, and ERP-style platforms — modeled on how your business actually runs, with the polish of a commercial product.',
    benefits: ['Fits your real processes', 'Single source of truth', 'Grows with your business'],
    deliverables: ['Custom operational platform', 'Role-based access', 'Reporting & exports', 'Training & docs'],
    engagement: [
      { step: 'Discover', detail: 'Understand your operations and pain points.' },
      { step: 'Build', detail: 'Develop modules iteratively with your feedback.' },
      { step: 'Adopt', detail: 'Roll out with training and support.' },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
