import { Link } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/sections/PageHeader';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/sections/CtaBand';
import { Icon, type IconName } from '@/components/Icon';
import { services } from '@/data/services';
import { site } from '@/data/site';

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services — Custom Software, AI & Full-Stack Development"
        description="Premium software services by Azam Ayaz: AI-powered applications, full-stack and React development, Django backends, REST APIs, business automation, and enterprise/ERP systems."
        path="/services"
        schema={services.map((s) => ({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: s.title,
          description: s.description,
          provider: { '@type': 'Person', name: site.name },
          areaServed: 'Worldwide',
          url: `${site.url}/services#${s.slug}`,
        }))}
      />

      <PageHeader
        eyebrow="Services"
        title="Engineering services built around outcomes"
        description="From a single AI feature to a complete operational platform — clear scope, senior execution, and software that actually ships."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      >
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="chip transition hover:border-brand/50 hover:text-ink">
              {s.title}
            </a>
          ))}
        </div>
      </PageHeader>

      <Section>
        <div className="space-y-8">
          {services.map((service, i) => (
            <Reveal
              as="article"
              key={service.slug}
              id={service.slug}
              delay={(i % 2) * 0.05}
              className="card scroll-mt-24 overflow-hidden"
            >
              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-brand">
                    <Icon name={service.icon as IconName} size={24} />
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-bold">{service.title}</h2>
                  <p className="mt-3 text-muted text-pretty">{service.description}</p>
                  <Link
                    to={`/contact?subject=${encodeURIComponent(`Service enquiry: ${service.title}`)}`}
                    className="btn-primary mt-5"
                  >
                    Enquire <Icon name="arrow-right" size={15} />
                  </Link>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                      Benefits
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {service.benefits.map((b) => (
                        <li key={b} className="flex gap-2 text-sm text-muted">
                          <Icon name="check" size={15} className="mt-0.5 shrink-0 text-accent" />
                          <span className="text-pretty">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                      Deliverables
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex gap-2 text-sm text-muted">
                          <Icon name="layers" size={15} className="mt-0.5 shrink-0 text-brand" />
                          <span className="text-pretty">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                      Engagement flow
                    </h3>
                    <ol className="mt-3 space-y-3">
                      {service.engagement.map((e, idx) => (
                        <li key={e.step} className="flex gap-3 text-sm">
                          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-2xs font-bold text-white">
                            {idx + 1}
                          </span>
                          <span>
                            <span className="block font-medium text-ink">{e.step}</span>
                            <span className="block text-subtle text-pretty">{e.detail}</span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Not sure which service fits?"
        description="Tell me the problem you’re solving and I’ll recommend the right approach — no jargon, no pressure."
      />
    </>
  );
}
