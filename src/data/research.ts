import type { ResearchArea } from './types';

/** Research & innovation areas — presented professionally but accessibly. */
export const research: ResearchArea[] = [
  {
    slug: 'hyperspectral-imaging',
    title: 'Hyperspectral Imaging',
    field: 'Imaging Science',
    status: 'Active',
    summary:
      'Extracting meaning from hundreds of spectral bands to reveal material and biological properties invisible to ordinary cameras.',
    details:
      'Hyperspectral sensors capture far more than red, green, and blue — they record a continuous spectrum at every pixel. My work focuses on turning that rich but unwieldy data into reliable classifications: calibration, dimensionality reduction, and machine-learning models that distinguish materials and assess crop health.',
    methods: ['Spectral calibration', 'Dimensionality reduction', 'Pixel-level classification', 'False-color visualization'],
  },
  {
    slug: 'computer-vision',
    title: 'Computer Vision',
    field: 'Machine Perception',
    status: 'Ongoing',
    summary:
      'Teaching software to see — detection, classification, and analysis of visual data for practical, deployable systems.',
    details:
      'I apply computer vision where it solves real problems: extracting structure from images, classifying content, and building inspection and analysis tools. The emphasis is always on robustness and deployability, not just benchmark scores.',
    methods: ['Image preprocessing', 'Feature extraction', 'Classification', 'Pipeline engineering'],
  },
  {
    slug: 'applied-ai',
    title: 'Applied AI & Intelligent Systems',
    field: 'Artificial Intelligence',
    status: 'Active',
    summary:
      'Grounding large language models in real data and tools so they act reliably inside production systems.',
    details:
      'Modern AI is powerful but needs engineering to be trustworthy. I research how to ground LLMs in domain data, give them tools to take action, evaluate their behavior, and add guardrails — turning raw capability into dependable product features and agents.',
    methods: ['Retrieval grounding', 'Tool-calling agents', 'Evaluation & guardrails', 'Prompt & system design'],
  },
  {
    slug: 'machine-learning',
    title: 'Machine Learning Foundations',
    field: 'Statistical Learning',
    status: 'Ongoing',
    summary:
      'Applying classical ML rigor — clean data, sound features, honest evaluation — as the backbone of intelligent products.',
    details:
      'Beneath the hype, durable ML rests on fundamentals: well-prepared data, thoughtful features, appropriate models, and honest evaluation. I keep these fundamentals central, choosing the simplest approach that solves the problem reliably.',
    methods: ['Data preparation', 'Feature engineering', 'Model selection', 'Rigorous evaluation'],
  },
];

export const getResearch = (slug: string) => research.find((r) => r.slug === slug);
