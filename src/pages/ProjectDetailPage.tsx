import { useParams, Link, Navigate } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { CoverArt } from '@/components/ui/CoverArt';
import { CtaBand } from '@/components/sections/CtaBand';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Icon, type IconName } from '@/components/Icon';
import { getProject, projects } from '@/data/projects';
import { site } from '@/data/site';

const linkMeta: { key: 'demo' | 'github' | 'docs'; label: string; icon: IconName }[] = [
  { key: 'demo', label: 'Live demo', icon: 'external' },
  { key: 'github', label: 'Source', icon: 'github' },
  { key: 'docs', label: 'Documentation', icon: 'code' },
];

function ListBlock({ title, items, icon }: { title: string; items: string[]; icon: IconName }) {
  return (
    <div className="card p-6">
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
        <Icon name={icon} size={18} className="text-brand" /> {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm text-muted">
            <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent" />
            <span className="text-pretty">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;
  if (!project) return <Navigate to="/projects" replace />;

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${project.title} — ${project.tagline}`}
        description={project.overview}
        path={`/projects/${project.slug}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.overview,
          url: `${site.url}/projects/${project.slug}`,
          author: { '@type': 'Person', name: site.name },
          keywords: project.categories.join(', '),
          dateCreated: String(project.year),
        }}
      />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="container py-14">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-subtle">
              <li>
                <Link to="/" className="hover:text-ink">
                  Home
                </Link>
              </li>
              <li>
                <Icon name="chevron-down" size={14} className="-rotate-90" />
              </li>
              <li>
                <Link to="/projects" className="hover:text-ink">
                  Projects
                </Link>
              </li>
              <li>
                <Icon name="chevron-down" size={14} className="-rotate-90" />
              </li>
              <li className="text-muted">{project.title}</li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="flex flex-wrap gap-2">
                {project.categories.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
                <span className="chip">{project.year}</span>
              </div>
              <h1 className="mt-5 text-4xl font-bold sm:text-5xl">{project.title}</h1>
              <p className="mt-4 text-lg text-muted text-pretty">{project.tagline}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {linkMeta.map((l) =>
                  project.links[l.key] ? (
                    <a
                      key={l.key}
                      href={project.links[l.key]}
                      target="_blank"
                      rel="noreferrer"
                      className={l.key === 'demo' ? 'btn-primary' : 'btn-secondary'}
                    >
                      <Icon name={l.icon} size={16} /> {l.label}
                    </a>
                  ) : null,
                )}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <CoverArt
                from={project.cover.from}
                to={project.cover.to}
                label={project.title}
                aspect="aspect-[16/11]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Narrative */}
          <div className="space-y-10 lg:col-span-2">
            <Reveal>
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="mt-3 text-muted text-pretty">{project.overview}</p>
            </Reveal>
            <Reveal>
              <h2 className="text-2xl font-bold">The business problem</h2>
              <p className="mt-3 text-muted text-pretty">{project.problem}</p>
            </Reveal>
            <Reveal>
              <h2 className="text-2xl font-bold">The solution</h2>
              <p className="mt-3 text-muted text-pretty">{project.solution}</p>
            </Reveal>
            <Reveal>
              <h2 className="text-2xl font-bold">Architecture</h2>
              <p className="mt-3 text-muted text-pretty">{project.architecture}</p>
            </Reveal>

            {/* Gallery */}
            <Reveal>
              <h2 className="text-2xl font-bold">Screenshots</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {project.gallery.map((g, i) => (
                  <figure key={g.caption}>
                    <CoverArt
                      from={project.cover.from}
                      to={project.cover.to}
                      aspect="aspect-video"
                      compact
                      label={`${project.title} screenshot ${i + 1}`}
                    />
                    <figcaption className="mt-2 text-xs text-subtle">{g.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h3 className="font-display text-lg font-semibold">Technology stack</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <ListBlock title="Key features" items={project.features} icon="check" />
          </aside>
        </div>

        {/* Lower grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <ListBlock title="Challenges solved" items={project.challenges} icon="shield" />
          <ListBlock title="Development highlights" items={project.highlights} icon="sparkles" />
          <ListBlock title="Future improvements" items={project.futureWork} icon="rocket" />
        </div>
      </Section>

      {/* Related */}
      <Section className="border-t border-border bg-surface/30">
        <h2 className="text-2xl font-bold">More work</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
