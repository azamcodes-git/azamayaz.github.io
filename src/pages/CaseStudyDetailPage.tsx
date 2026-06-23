import { useParams, Link, Navigate } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/sections/CtaBand';
import { Icon, type IconName } from '@/components/Icon';
import { getCaseStudy } from '@/data/caseStudies';
import { site } from '@/data/site';

function Narrative({ title, body }: { title: string; body: string }) {
  return (
    <Reveal>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-muted text-pretty">{body}</p>
    </Reveal>
  );
}

function PointList({ title, items, icon }: { title: string; items: string[]; icon: IconName }) {
  return (
    <Reveal>
      <h2 className="text-2xl font-bold">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-muted">
            <Icon name={icon} size={18} className="mt-0.5 shrink-0 text-brand" />
            <span className="text-pretty">{item}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const study = slug ? getCaseStudy(slug) : undefined;
  if (!study) return <Navigate to="/case-studies" replace />;

  return (
    <>
      <Seo
        title={study.title}
        description={study.summary}
        path={`/case-studies/${study.slug}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: study.title,
          description: study.summary,
          author: { '@type': 'Person', name: site.name },
          about: study.industry,
          url: `${site.url}/case-studies/${study.slug}`,
        }}
      />

      <section className="border-b border-border">
        <div className="container py-14">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-subtle">
            <Link to="/case-studies" className="hover:text-ink">
              Case Studies
            </Link>
            <span className="mx-2">/</span>
            <span className="text-muted">{study.client}</span>
          </nav>
          <Reveal>
            <div className="flex flex-wrap gap-2">
              <span className="chip">{study.industry}</span>
              <span className="chip">{study.client}</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold sm:text-5xl">{study.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted text-pretty">{study.summary}</p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {study.outcomes.map((o) => (
              <div key={o.label} className="rounded-xl border border-border bg-surface p-5">
                <div className="font-display text-3xl font-bold text-brand">{o.metric}</div>
                <div className="mt-1 text-sm text-subtle">{o.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <Narrative title="The problem" body={study.problem} />
            <Narrative title="The solution" body={study.solution} />
            <Narrative title="Architecture" body={study.architecture} />
            <PointList title="Key decisions" items={study.decisions} icon="check" />
            <PointList title="Obstacles" items={study.obstacles} icon="shield" />
            <PointList title="Lessons learned" items={study.lessons} icon="sparkles" />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h3 className="font-display text-lg font-semibold">At a glance</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-subtle">Client</dt>
                  <dd className="text-right font-medium text-ink">{study.client}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-subtle">Industry</dt>
                  <dd className="text-right font-medium text-ink">{study.industry}</dd>
                </div>
              </dl>
            </div>
            <div className="card p-6">
              <h3 className="font-display text-lg font-semibold">Technology</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {study.stack.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
