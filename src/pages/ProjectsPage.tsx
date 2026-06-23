import { useMemo, useState } from 'react';
import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/sections/PageHeader';
import { Section } from '@/components/ui/Section';
import { CtaBand } from '@/components/sections/CtaBand';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { Icon } from '@/components/Icon';
import { cn } from '@/lib/cn';
import { projects, projectCategories } from '@/data/projects';
import { site } from '@/data/site';

export default function ProjectsPage() {
  const [category, setCategory] = useState<string>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchCat = category === 'All' || p.categories.includes(category as never);
      const matchQuery =
        !q ||
        `${p.title} ${p.tagline} ${p.overview} ${p.stack.join(' ')} ${p.categories.join(' ')}`
          .toLowerCase()
          .includes(q);
      return matchCat && matchQuery;
    });
  }, [category, query]);

  return (
    <>
      <Seo
        title="Projects & Case Studies"
        description="Explore software systems built by Azam Ayaz — AI applications, ERP and business platforms, dashboards, computer vision, and automation. Filter by category and search the portfolio."
        path="/projects"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Projects',
          url: `${site.url}/projects`,
          about: 'Software engineering projects and case studies',
        }}
      />

      <PageHeader
        eyebrow="Portfolio"
        title="Software built to solve real problems"
        description="Each project here is presented as the commercial system it is — the problem, the architecture, the decisions, and the outcome. Filter or search to find what’s relevant to you."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Projects' }]}
      />

      <Section>
        {/* Controls */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={category === cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-sm font-medium transition',
                  category === cat
                    ? 'bg-brand text-white shadow-glow'
                    : 'border border-border bg-surface text-muted hover:border-brand/50 hover:text-ink',
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative lg:w-72">
            <Icon
              name="search"
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              aria-label="Search projects"
              className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-subtle focus:border-brand focus:outline-none"
            />
          </div>
        </div>

        <p className="mt-6 text-sm text-subtle" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          {category !== 'All' && ` in ${category}`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-muted">No projects match your filters.</p>
            <button
              type="button"
              onClick={() => {
                setCategory('All');
                setQuery('');
              }}
              className="btn-ghost mt-4"
            >
              Clear filters
            </button>
          </div>
        )}
      </Section>

      <CtaBand
        title="Want something like this — or better?"
        description="Tell me what you’re building. I’ll show you how it could work and what it would take to ship."
      />
    </>
  );
}
