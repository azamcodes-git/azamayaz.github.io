import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/sections/PageHeader';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/sections/CtaBand';
import { Icon } from '@/components/Icon';
import { research } from '@/data/research';
import { site } from '@/data/site';

export default function ResearchPage() {
  return (
    <>
      <Seo
        title="Research & Innovation — AI, Computer Vision & Hyperspectral Imaging"
        description="Applied research by Azam Ayaz across hyperspectral imaging, computer vision, machine learning, and intelligent systems — bringing emerging technology into practical, deployable software."
        path="/research"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Research & Innovation',
          url: `${site.url}/research`,
          about: ['Hyperspectral Imaging', 'Computer Vision', 'Machine Learning', 'Applied AI'],
        }}
      />

      <PageHeader
        eyebrow="Research & Innovation"
        title="Bringing the frontier into production"
        description="I work at the intersection of scientific imaging, machine perception, and applied AI — turning research-grade techniques into systems that solve real problems."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Research' }]}
      />

      <Section>
        <div className="space-y-6">
          {research.map((r, i) => (
            <Reveal
              as="article"
              key={r.slug}
              id={r.slug}
              delay={(i % 2) * 0.05}
              className="card scroll-mt-24 p-6 sm:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip">{r.field}</span>
                    <span className="rounded-full border border-accent/40 px-2.5 py-1 text-2xs font-semibold uppercase tracking-wider text-accent">
                      {r.status}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold">{r.title}</h2>
                  <p className="mt-3 text-muted text-pretty">{r.summary}</p>
                  <p className="mt-4 text-sm leading-relaxed text-subtle text-pretty">{r.details}</p>
                </div>
                <div className="lg:col-span-1">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                    Methods & techniques
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {r.methods.map((m) => (
                      <li key={m} className="flex gap-2 text-sm text-muted">
                        <Icon name="cpu" size={15} className="mt-0.5 shrink-0 text-brand" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Researching something ambitious?"
        description="If you’re exploring AI, imaging, or vision and need an engineer who can take it from paper to product, let’s talk."
        primary={{ label: 'Discuss a collaboration', to: '/contact' }}
        secondary={{ label: 'See applied work', to: '/projects' }}
      />
    </>
  );
}
