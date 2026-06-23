import { Link } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/sections/PageHeader';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/sections/CtaBand';
import { Icon } from '@/components/Icon';
import { caseStudies } from '@/data/caseStudies';
import { site } from '@/data/site';

export default function CaseStudiesPage() {
  return (
    <>
      <Seo
        title="Case Studies — Software That Delivered Results"
        description="In-depth case studies by Azam Ayaz: the business problem, the technical solution, architecture, decisions, obstacles, and outcomes behind real software projects."
        path="/case-studies"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Case Studies',
          url: `${site.url}/case-studies`,
        }}
      />

      <PageHeader
        eyebrow="Case Studies"
        title="The story behind the software"
        description="Deep dives into how real systems were designed and built — the problems, the trade-offs, the engineering, and the results."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Case Studies' }]}
      />

      <Section>
        <div className="grid gap-8">
          {caseStudies.map((c, i) => (
            <Reveal as="article" key={c.slug} delay={(i % 2) * 0.05}>
              <Link
                to={`/case-studies/${c.slug}`}
                className="group card card-hover block overflow-hidden p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip">{c.industry}</span>
                  <span className="chip">{c.client}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">{c.title}</h2>
                <p className="mt-3 max-w-3xl text-muted text-pretty">{c.summary}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {c.outcomes.map((o) => (
                    <div key={o.label} className="rounded-xl border border-border bg-surface-2/50 p-4">
                      <div className="font-display text-2xl font-bold text-brand">{o.metric}</div>
                      <div className="mt-1 text-xs text-subtle">{o.label}</div>
                    </div>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Read the case study
                  <Icon name="arrow-right" size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
