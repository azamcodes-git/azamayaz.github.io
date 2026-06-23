import type { FaqItem } from './types';

/**
 * FAQ content written to be useful to both humans and AI assistants — direct,
 * specific answers that double as SEO and answer-engine fodder.
 */
export const faqs: FaqItem[] = [
  {
    category: 'Technology',
    question: 'What technologies does Azam Ayaz work with?',
    answer:
      'Azam builds with React and TypeScript on the frontend, and Python, Django, and Flask on the backend, using SQL/PostgreSQL for data and REST APIs to connect systems. He also works extensively with AI integration, machine learning, computer vision, and hyperspectral imaging.',
  },
  {
    category: 'Projects',
    question: 'What kinds of projects do you take on?',
    answer:
      'Custom web applications, AI-powered features and agents, full-stack products, business automation, and operational software such as inventory, payroll, dashboards, and ERP-style systems. The best-fit projects are ones where thoughtful engineering creates clear business value.',
  },
  {
    category: 'AI',
    question: 'What AI capabilities can you deliver?',
    answer:
      'Production AI features grounded in your data: LLM-powered assistants, tool-calling agents that take real actions, AI voice agents, document understanding, and intelligent automation. The focus is on reliability — grounding, evaluation, and guardrails — not just demos.',
  },
  {
    category: 'Process',
    question: 'What is your development process?',
    answer:
      'Discovery to define the real problem and success metrics, architecture to design the system, iterative building in reviewable slices, and a clean launch with documentation. You stay in the loop throughout, with frequent, working checkpoints rather than a black box.',
  },
  {
    category: 'Custom Software',
    question: 'Can you build fully custom software for my business?',
    answer:
      'Yes. Custom software is a core offering — operational platforms, internal tools, and AI features modeled on how your business actually works, delivered with the polish of a commercial product.',
  },
  {
    category: 'Source Code',
    question: 'Do I get the source code?',
    answer:
      'For custom builds, you own the source code. For marketplace products, every purchase includes the complete, documented source code along with setup instructions; extended licensing is available for resale or white-labeling.',
  },
  {
    category: 'Collaboration',
    question: 'How do we collaborate during a project?',
    answer:
      'Remotely and asynchronously by default, with regular checkpoints and working demos. Communication is clear and frequent, and you always have visibility into progress and decisions.',
  },
  {
    category: 'Maintenance',
    question: 'Do you offer maintenance and support after launch?',
    answer:
      'Yes. Ongoing maintenance and support plans are available, covering updates, monitoring, bug fixes, and incremental improvements so your software keeps working as your needs evolve.',
  },
  {
    category: 'Consulting',
    question: 'Do you offer consulting or technical advisory?',
    answer:
      'Yes — architecture reviews, AI feasibility and strategy, technology selection, and engineering guidance for teams that want a second senior opinion before committing to a direction.',
  },
  {
    category: 'Engagement',
    question: 'How do I get started?',
    answer:
      'Reach out through the contact form with a short description of your goal. You will get a direct response outlining how it could work, a suggested approach, and next steps — no obligation.',
  },
];
