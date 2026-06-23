import type { Product } from './types';

/** Software marketplace catalog — ready-made systems available to buy or license. */
export const products: Product[] = [
  {
    slug: 'inventory-suite',
    name: 'Inventory & POS Suite',
    category: 'Business Software',
    summary: 'Production-ready inventory, purchasing, and point-of-sale system for retail and wholesale.',
    description:
      'A complete, battle-tested inventory and POS platform you can deploy for a client this week. Clean architecture, documented code, and a polished UI mean it is ready to brand and ship — not a starting-from-scratch template.',
    cover: { from: 'teal-500', to: 'emerald-400' },
    badge: 'Best seller',
    features: [
      'Multi-warehouse inventory with stock movements',
      'Barcode-driven point of sale',
      'Purchasing, suppliers, and goods receipt',
      'Role-based access control',
      'Sales & inventory reporting',
      'Clean, documented, extensible codebase',
    ],
    technologies: ['Django', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    screenshots: [
      { caption: 'POS checkout' },
      { caption: 'Inventory dashboard' },
      { caption: 'Reporting suite' },
    ],
    pricing: [
      { label: 'Single license', price: 'Contact', note: 'Source code + 1 deployment' },
      { label: 'Extended license', price: 'Contact', note: 'Resale / multi-client rights' },
    ],
    licensing:
      'Licenses cover source code delivery and the right to deploy. Extended licensing for resale and white-labeling is available. Final terms confirmed per purchase.',
    faq: [
      {
        question: 'Do I get full source code?',
        answer: 'Yes — every purchase includes the complete, documented source code and setup instructions.',
      },
      {
        question: 'Can it be customized for my client?',
        answer: 'Absolutely. The codebase is built to extend, and custom-version development is available as a service.',
      },
      {
        question: 'Is support included?',
        answer: 'Setup guidance is included; ongoing maintenance and support plans are available separately.',
      },
    ],
  },
  {
    slug: 'payroll-engine',
    name: 'Payroll Engine',
    category: 'Business Software',
    summary: 'Configurable payroll automation with payslip generation and compliance reports.',
    description:
      'Drop-in payroll automation built around a flexible rules engine. Configure salary components, run a cycle in minutes, and generate branded payslips and compliance summaries automatically.',
    cover: { from: 'violet-500', to: 'fuchsia-400' },
    features: [
      'Configurable components, allowances & deductions',
      'Dry-run preview before committing',
      'Automated PDF payslip generation',
      'Compliance & tax summary reports',
      'Multi-entity and multi-currency',
      'Full audit trail',
    ],
    technologies: ['Django', 'Celery', 'PostgreSQL', 'React', 'TypeScript'],
    screenshots: [
      { caption: 'Payroll run preview' },
      { caption: 'Payslip template' },
      { caption: 'Compliance report' },
    ],
    pricing: [
      { label: 'Single license', price: 'Contact', note: 'Source code + 1 deployment' },
      { label: 'Custom build', price: 'Contact', note: 'Tailored to your policies' },
    ],
    licensing:
      'Source-code license with single-deployment rights by default. Custom builds adapt the rules engine to your jurisdiction and policies.',
    faq: [
      {
        question: 'Can it match my country’s tax rules?',
        answer: 'The rules engine is configuration-driven and can be adapted to most jurisdictions as a custom build.',
      },
      {
        question: 'Does it generate payslips?',
        answer: 'Yes — branded PDF payslips are generated automatically for every run.',
      },
    ],
  },
  {
    slug: 'voice-agent-starter',
    name: 'AI Voice Agent Starter',
    category: 'AI',
    summary: 'A foundation for building AI voice agents that book, qualify, and support.',
    description:
      'A production-grade starting point for AI voice agents: streaming speech pipeline, LLM tool-calling, and a configuration dashboard. Skip months of plumbing and focus on your use case.',
    cover: { from: 'sky-500', to: 'indigo-400' },
    badge: 'New',
    features: [
      'Streaming STT → LLM → TTS pipeline',
      'Tool-calling for real actions (calendar, CRM)',
      'Per-business knowledge grounding',
      'Transcript and summary capture',
      'Configuration dashboard',
    ],
    technologies: ['Python', 'FastAPI', 'LLM APIs', 'React', 'TypeScript'],
    screenshots: [
      { caption: 'Agent configuration' },
      { caption: 'Live transcript' },
      { caption: 'Analytics' },
    ],
    pricing: [
      { label: 'Starter license', price: 'Contact', note: 'Source code + integration guide' },
      { label: 'Done-for-you', price: 'Contact', note: 'We build it for your business' },
    ],
    licensing:
      'Source-code license for the agent framework. Third-party model and telephony costs are billed by their providers. Done-for-you builds available.',
    faq: [
      {
        question: 'Which AI models does it use?',
        answer: 'It is model-agnostic and built to use the latest capable LLMs via their APIs, with the latest Claude models recommended.',
      },
      {
        question: 'Can it integrate with my calendar/CRM?',
        answer: 'Yes — the tool-calling layer is designed for exactly these integrations.',
      },
    ],
  },
  {
    slug: 'analytics-dashboard-kit',
    name: 'Analytics Dashboard Kit',
    category: 'Dashboard',
    summary: 'A composable dashboard system for building branded BI portals fast.',
    description:
      'A reusable dashboard foundation with a widget registry, drill-downs, and a clean design system. Stand up a client-ready analytics portal in days, not months.',
    cover: { from: 'rose-500', to: 'orange-400' },
    features: [
      'Composable widget registry',
      'KPI-to-detail drill-downs',
      'Responsive, accessible charts',
      'Permissioned, shareable dashboards',
      'Themeable design system',
    ],
    technologies: ['React', 'TypeScript', 'Django', 'Tailwind CSS'],
    screenshots: [
      { caption: 'KPI overview' },
      { caption: 'Drill-down view' },
      { caption: 'Theme editor' },
    ],
    pricing: [
      { label: 'Single license', price: 'Contact', note: 'Source code + 1 deployment' },
      { label: 'Extended license', price: 'Contact', note: 'Multi-client rights' },
    ],
    licensing:
      'Source-code license with single-deployment rights; extended licensing available for agencies building multiple client portals.',
    faq: [
      {
        question: 'Can I rebrand it?',
        answer: 'Yes — the design system is fully themeable for white-label use.',
      },
      {
        question: 'Does it connect to my data?',
        answer: 'It ships with a clean data adapter layer; connecting your sources is straightforward or available as a service.',
      },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
