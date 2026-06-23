import type { TechGroup } from './types';

/** Skills organized by category — presented as capabilities, never as percentage bars. */
export const technologies: TechGroup[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', note: 'Component architecture & SPAs' },
      { name: 'TypeScript', note: 'Type-safe applications' },
      { name: 'JavaScript', note: 'Modern ES standards' },
      { name: 'Tailwind CSS', note: 'Design systems at speed' },
      { name: 'HTML', note: 'Semantic, accessible markup' },
      { name: 'CSS', note: 'Responsive, modern layouts' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Python', note: 'Primary backend & data language' },
      { name: 'Django', note: 'Full-featured web framework' },
      { name: 'Flask', note: 'Lightweight services & APIs' },
      { name: 'REST APIs', note: 'Clean, versioned contracts' },
      { name: 'SQL', note: 'Relational data modeling' },
    ],
  },
  {
    category: 'AI & Data',
    items: [
      { name: 'AI Integration', note: 'LLMs, agents & tool-calling' },
      { name: 'Machine Learning', note: 'Classical ML fundamentals' },
      { name: 'Computer Vision', note: 'Image & spectral analysis' },
      { name: 'Hyperspectral Imaging', note: 'Applied research' },
    ],
  },
  {
    category: 'Tooling & Practice',
    items: [
      { name: 'Git', note: 'Version control & collaboration' },
      { name: 'Architecture', note: 'Scalable system design' },
      { name: 'Performance', note: 'Core Web Vitals & profiling' },
      { name: 'Accessibility', note: 'WCAG-aware engineering' },
    ],
  },
];
