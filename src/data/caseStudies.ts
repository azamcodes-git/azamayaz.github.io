import type { CaseStudy } from './types';

/** Long-form case studies. Outcomes use illustrative figures pending client sign-off. */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'manufacturer-erp-rollout',
    title: 'From Spreadsheets to a Single Source of Truth',
    client: 'Mid-size manufacturer',
    industry: 'Manufacturing',
    summary:
      'How a growing manufacturer replaced a fragile spreadsheet stack with a modular ERP — and got real-time visibility into operations for the first time.',
    problem:
      'The business ran inventory, purchasing, and production across a dozen disconnected spreadsheets. Stock counts were perpetually wrong, purchase orders slipped through the cracks, and leadership had no live view of operations. Every report was a manual, error-prone exercise.',
    solution:
      'A modular ERP unifying inventory, purchasing, and production on a shared, auditable ledger. Each operational area became its own module, while real-time dashboards gave leadership the picture they had been missing. Adoption was phased to avoid disrupting the business.',
    architecture:
      'A Django REST backend with isolated modules over a shared domain layer and PostgreSQL. An event-sourced inventory ledger guarantees reconstructable balances. A React SPA with optimistic updates and normalized caching provides a fast, desktop-grade experience.',
    decisions: [
      'Event-sourced inventory over mutable counters, for auditability and correctness',
      'Phased module rollout to reduce change-management risk',
      'API versioning from day one to allow safe iteration',
    ],
    obstacles: [
      'Migrating messy historical spreadsheet data without losing fidelity',
      'Earning trust from a team comfortable with the old way of working',
      'Reconciling stock discrepancies during cutover',
    ],
    lessons: [
      'Change management matters as much as code — the rollout plan was half the project',
      'An auditable ledger pays for itself the first time numbers are questioned',
      'Phased adoption beats a big-bang launch for operational software',
    ],
    outcomes: [
      { metric: '90%', label: 'less time on manual reporting' },
      { metric: 'Real-time', label: 'operational visibility' },
      { metric: 'Single', label: 'source of truth across teams' },
    ],
    stack: ['React', 'TypeScript', 'Django', 'PostgreSQL', 'Redis'],
  },
  {
    slug: 'ai-voice-agent-deployment',
    title: 'Never Miss Another Call: An AI Voice Agent in Production',
    client: 'Service business',
    industry: 'Local services',
    summary:
      'Deploying an AI voice agent that answers every call, books appointments, and captures leads around the clock — recovering revenue lost to missed calls.',
    problem:
      'A busy service business was missing a large share of inbound calls — during jobs, after hours, and at peak times. Each missed call was a lost booking, and 24/7 human reception was not economical.',
    solution:
      'An AI voice agent built on a streaming speech pipeline and an LLM reasoning layer with tool-calling. It answers naturally, books appointments directly into the calendar, qualifies leads, and hands off to a human when needed — with a full transcript every time.',
    architecture:
      'Telephony streams into speech-to-text, then an LLM orchestration layer with tools for calendar and CRM, then text-to-speech — all latency-optimized for natural turn-taking. Conversation state is server-managed; a dashboard handles configuration and transcript review.',
    decisions: [
      'Tool-calling over free-form chat, so the agent completes tasks',
      'Per-business knowledge grounding to keep answers accurate',
      'Always-available human hand-off to preserve trust',
    ],
    obstacles: [
      'Driving end-to-end latency low enough for natural conversation',
      'Keeping the agent on-task and grounded',
      'Handling interruptions and unclear speech gracefully',
    ],
    lessons: [
      'Latency is a product feature — it makes or breaks the experience',
      'Grounding and tools matter more than raw model size',
      'Transparent transcripts build trust in AI-handled interactions',
    ],
    outcomes: [
      { metric: '24/7', label: 'call coverage' },
      { metric: '0', label: 'missed enquiries' },
      { metric: 'Auto', label: 'booking & lead capture' },
    ],
    stack: ['Python', 'FastAPI', 'LLM APIs', 'React'],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
