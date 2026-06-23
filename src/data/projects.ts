import type { Project } from './types';

/**
 * Project portfolio. Each entry is presented as a commercial-grade system,
 * not a coursework assignment. Add new work by appending to this array.
 */
export const projects: Project[] = [
  {
    slug: 'aurora-erp',
    title: 'Aurora ERP',
    tagline: 'Unified operations platform for small-to-mid manufacturers',
    categories: ['Enterprise', 'Business Software', 'Dashboard'],
    year: 2025,
    featured: true,
    cover: { from: 'indigo-500', to: 'cyan-400' },
    overview:
      'Aurora is a modular ERP that brings inventory, purchasing, production, and finance into one coherent system. It replaces a patchwork of spreadsheets with a single, auditable source of truth.',
    problem:
      'Growing manufacturers outgrow spreadsheets but find enterprise ERPs too heavy, too expensive, and too slow to adopt. Stock levels drift, purchase orders slip, and leadership lacks a real-time picture of the business.',
    solution:
      'A role-based, modular platform where each operational area is its own bounded module sharing a common ledger. Real-time dashboards surface the metrics that matter, while an audit trail keeps every change accountable.',
    features: [
      'Real-time inventory with multi-warehouse stock movements',
      'Purchase orders, goods receipt, and supplier ledgers',
      'Bill-of-materials and production work orders',
      'Role-based access control with granular permissions',
      'Financial summaries and exportable reports',
      'Audit log capturing every state transition',
    ],
    stack: ['React', 'TypeScript', 'Django', 'Django REST Framework', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    architecture:
      'A Django REST backend exposes a versioned API consumed by a React SPA. Modules are isolated Django apps communicating through a shared domain layer; Redis backs caching and background task queues. The frontend uses a normalized data cache and optimistic updates for a desktop-app feel.',
    challenges: [
      'Modeling stock movements so balances are always derivable and never corrupted by race conditions',
      'Designing permissions flexible enough for real org charts without becoming unusable',
      'Keeping the SPA responsive against large, relational datasets',
    ],
    highlights: [
      'Event-sourced inventory ledger guarantees reconstructable balances',
      'Sub-100ms list views via server-side pagination and indexed queries',
      'Zero-downtime schema migrations with backward-compatible API versioning',
    ],
    futureWork: [
      'AI demand forecasting to recommend reorder points',
      'Mobile companion app for warehouse floor scanning',
      'Pluggable accounting integrations (QuickBooks, Xero)',
    ],
    gallery: [
      { caption: 'Operations dashboard with live KPIs' },
      { caption: 'Inventory movement ledger view' },
      { caption: 'Purchase order workflow' },
      { caption: 'Role & permission management' },
    ],
    links: { demo: '#', github: '#', docs: '#' },
  },
  {
    slug: 'spectravision',
    title: 'SpectraVision',
    tagline: 'Hyperspectral imaging pipeline for crop & material analysis',
    categories: ['Computer Vision', 'AI', 'Research'],
    year: 2025,
    featured: true,
    cover: { from: 'emerald-500', to: 'lime-400' },
    overview:
      'SpectraVision turns raw hyperspectral cubes into actionable classifications. It ingests sensor data, calibrates it, and applies machine learning to detect material composition and crop health invisible to the naked eye.',
    problem:
      'Hyperspectral data is high-dimensional, noisy, and hard to work with. Researchers spend more time wrangling formats and calibration than extracting insight.',
    solution:
      'An end-to-end pipeline: ingestion and calibration, dimensionality reduction, model training, and an interactive viewer for inspecting per-pixel classifications across spectral bands.',
    features: [
      'Spectral cube ingestion with calibration & noise reduction',
      'Dimensionality reduction (PCA / band selection)',
      'Pixel-level classification with trained ML models',
      'Interactive band explorer and false-color rendering',
      'Exportable classification maps and reports',
    ],
    stack: ['Python', 'NumPy', 'scikit-learn', 'OpenCV', 'Flask', 'React', 'TypeScript'],
    architecture:
      'A Python processing core handles heavy numerical work and model inference, exposed through a Flask API. Pre-processing and training run as offline jobs; results are cached and streamed to a React viewer that renders band composites on canvas.',
    challenges: [
      'Managing memory for large spectral cubes without thrashing',
      'Choosing band-selection strategies that preserve signal while cutting dimensionality',
      'Making dense scientific output legible to non-specialists',
    ],
    highlights: [
      'Reproducible pipeline with versioned calibration profiles',
      'Configurable model registry for swapping classifiers',
      'Canvas-based viewer renders multi-band composites smoothly',
    ],
    futureWork: [
      'Deep-learning segmentation models for finer classification',
      'Real-time inference on streaming sensor input',
      'Cloud batch processing for large surveys',
    ],
    gallery: [
      { caption: 'False-color spectral composite' },
      { caption: 'Per-pixel classification overlay' },
      { caption: 'Band explorer with spectral signature plot' },
    ],
    links: { demo: '#', github: '#', docs: '#' },
  },
  {
    slug: 'ledgerflow',
    title: 'LedgerFlow Payroll',
    tagline: 'Automated payroll & compliance for distributed teams',
    categories: ['Business Software', 'Automation', 'Enterprise'],
    year: 2024,
    featured: true,
    cover: { from: 'violet-500', to: 'fuchsia-400' },
    overview:
      'LedgerFlow automates the full payroll cycle — from attendance and deductions to payslip generation and reporting — with rules that adapt to each organization.',
    problem:
      'Manual payroll is error-prone, time-consuming, and risky. Teams juggle attendance sheets, tax rules, and ad-hoc deductions, then hand-build payslips every cycle.',
    solution:
      'A rules engine computes net pay from configurable components, generates branded payslips, and produces compliance-ready summaries — turning a multi-day process into minutes.',
    features: [
      'Configurable salary components, allowances, and deductions',
      'Attendance and leave integration',
      'Automated payslip generation (PDF)',
      'Tax and compliance summary reports',
      'Multi-currency and multi-entity support',
      'Audit trail for every payroll run',
    ],
    stack: ['Django', 'Django REST Framework', 'PostgreSQL', 'Celery', 'React', 'TypeScript'],
    architecture:
      'A declarative rules engine evaluates pay components per employee; Celery workers handle batch runs and PDF generation asynchronously. The React dashboard provides previews and approvals before any run is committed.',
    challenges: [
      'Encoding diverse, changing payroll rules without hard-coding',
      'Guaranteeing idempotent, repeatable payroll runs',
      'Generating accurate, branded documents at scale',
    ],
    highlights: [
      'Dry-run mode previews an entire cycle before committing',
      'Component-based rules engine adapts to new policies via config',
      'Asynchronous batch processing keeps the UI responsive',
    ],
    futureWork: [
      'Direct bank-disbursement integrations',
      'Employee self-service portal',
      'AI anomaly detection for payroll errors',
    ],
    gallery: [
      { caption: 'Payroll run preview & approval' },
      { caption: 'Generated payslip template' },
      { caption: 'Compliance summary report' },
    ],
    links: { demo: '#', github: '#', docs: '#' },
  },
  {
    slug: 'helix-voice',
    title: 'Helix Voice Agent',
    tagline: 'AI voice agent for bookings, support, and lead capture',
    categories: ['AI', 'Automation'],
    year: 2025,
    featured: true,
    cover: { from: 'sky-500', to: 'indigo-400' },
    overview:
      'Helix is a configurable AI voice agent that answers calls, qualifies leads, books appointments, and hands off to humans when needed — available around the clock.',
    problem:
      'Small businesses lose revenue to missed calls and after-hours enquiries. Hiring 24/7 reception is expensive and hard to scale.',
    solution:
      'A voice agent built on speech-to-text, an LLM reasoning layer with business-specific knowledge, and text-to-speech — wired to calendars and CRMs so it actually completes tasks, not just chats.',
    features: [
      'Natural, low-latency voice conversations',
      'Appointment booking with calendar sync',
      'Lead qualification and capture to CRM',
      'Configurable knowledge base per business',
      'Graceful human hand-off and call summaries',
    ],
    stack: ['Python', 'FastAPI', 'LLM APIs', 'Speech-to-Text', 'Text-to-Speech', 'React'],
    architecture:
      'A streaming pipeline links telephony to STT, an LLM orchestration layer with tool-calling (calendar, CRM, knowledge base), and TTS. Conversation state is managed server-side; a dashboard configures prompts, tools, and reviews transcripts.',
    challenges: [
      'Minimizing end-to-end latency for natural turn-taking',
      'Keeping the agent grounded and on-task with tool-calling',
      'Handling interruptions and ambiguous speech gracefully',
    ],
    highlights: [
      'Tool-calling architecture lets the agent take real actions',
      'Per-business knowledge grounding reduces hallucination',
      'Full transcripts and summaries for every call',
    ],
    futureWork: [
      'Multilingual support',
      'Sentiment-aware routing',
      'Outbound campaign mode',
    ],
    gallery: [
      { caption: 'Agent configuration & knowledge base' },
      { caption: 'Live call transcript view' },
      { caption: 'Lead capture dashboard' },
    ],
    links: { demo: '#', github: '#', docs: '#' },
  },
  {
    slug: 'pulse-analytics',
    title: 'Pulse Analytics',
    tagline: 'Real-time business intelligence dashboards',
    categories: ['Dashboard', 'Web Application', 'Business Software'],
    year: 2024,
    cover: { from: 'rose-500', to: 'orange-400' },
    overview:
      'Pulse unifies scattered business data into clean, real-time dashboards that decision-makers actually use — with drill-downs from headline KPIs to row-level detail.',
    problem:
      'Data lives in silos. Leadership waits days for reports that are stale on arrival, and analysts burn hours stitching exports together.',
    solution:
      'A configurable dashboard layer over a unified data model, with scheduled refreshes, custom widgets, and shareable views — insight without the spreadsheet gymnastics.',
    features: [
      'Drag-and-configure dashboard widgets',
      'Drill-down from KPI to detail',
      'Scheduled data refresh and alerts',
      'Shareable, permissioned dashboards',
      'Exportable charts and tables',
    ],
    stack: ['React', 'TypeScript', 'Django', 'PostgreSQL', 'Tailwind CSS'],
    architecture:
      'A query/aggregation service exposes pre-computed metrics over an API; the React frontend composes widgets from a registry. Heavy aggregations are materialized on a schedule to keep dashboards instant.',
    challenges: [
      'Balancing query freshness against dashboard speed',
      'Designing a widget system flexible enough for any metric',
      'Keeping charts performant with large datasets',
    ],
    highlights: [
      'Materialized metrics deliver instant dashboard loads',
      'Composable widget registry for rapid new views',
      'Responsive charts that work on mobile',
    ],
    futureWork: [
      'Natural-language querying ("ask your data")',
      'Anomaly detection and smart alerts',
      'Embeddable dashboards for client portals',
    ],
    gallery: [
      { caption: 'Executive KPI overview' },
      { caption: 'Drill-down detail view' },
      { caption: 'Alert configuration' },
    ],
    links: { demo: '#', github: '#', docs: '#' },
  },
  {
    slug: 'stockwise',
    title: 'StockWise Inventory',
    tagline: 'Smart inventory & point-of-sale for retail',
    categories: ['Business Software', 'Web Application'],
    year: 2024,
    cover: { from: 'teal-500', to: 'emerald-400' },
    overview:
      'StockWise is a retail-ready inventory and POS system: barcode-driven stock control, fast checkout, and reporting that tells owners what to restock and what to drop.',
    problem:
      'Independent retailers rely on memory and paper. They overstock slow movers, run out of bestsellers, and have no clear view of margins.',
    solution:
      'A fast, barcode-first system covering purchasing, stock, sales, and reporting — designed for the counter, not the boardroom.',
    features: [
      'Barcode scanning for stock and checkout',
      'Low-stock alerts and reorder suggestions',
      'Sales reporting with best/worst sellers',
      'Supplier and purchase management',
      'Receipt printing and daily cash-up',
    ],
    stack: ['Django', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    architecture:
      'A transactional backend keeps stock and sales consistent under concurrent counter use; the frontend is keyboard- and scanner-optimized for speed. Reports run off indexed sales data.',
    challenges: [
      'Keeping stock accurate under concurrent sales',
      'Designing a checkout flow fast enough for a busy counter',
      'Making reports meaningful for non-technical owners',
    ],
    highlights: [
      'Scanner-first UI with full keyboard operation',
      'Transactional integrity under concurrent use',
      'Owner-friendly reporting that drives decisions',
    ],
    futureWork: [
      'Offline-first mode with sync',
      'Multi-branch consolidation',
      'AI restock forecasting',
    ],
    gallery: [
      { caption: 'Point-of-sale checkout screen' },
      { caption: 'Inventory management grid' },
      { caption: 'Sales analytics report' },
    ],
    links: { demo: '#', github: '#', docs: '#' },
  },
];

export const projectCategories = [
  'All',
  'AI',
  'Business Software',
  'Web Application',
  'Research',
  'Automation',
  'Computer Vision',
  'Dashboard',
  'Enterprise',
] as const;

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
