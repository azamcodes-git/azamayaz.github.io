import { Link } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { Hero } from '@/components/sections/Hero';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/Icon';
import { CtaBand } from '@/components/sections/CtaBand';
import { Testimonials } from '@/components/sections/Testimonials';
import { TechStack } from '@/components/sections/TechStack';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { ProductCard } from '@/components/cards/ProductCard';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Faq, buildFaqSchema } from '@/components/sections/Faq';
import { projects } from '@/data/projects';
import { products } from '@/data/products';
import { services } from '@/data/services';
import { research } from '@/data/research';
import { faqs } from '@/data/faqs';
import { site } from '@/data/site';

function SectionLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition hover:gap-2.5"
    >
      {label} <Icon name="arrow-right" size={15} />
    </Link>
  );
}

export default function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const homeFaqs = faqs.slice(0, 6);

  // Built at render time so admin-published content is always reflected.
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    email: site.email,
    description: site.shortBio,
    knowsAbout: [
      'Software Engineering',
      'Artificial Intelligence',
      'Full-Stack Development',
      'React',
      'Python',
      'Django',
      'Computer Vision',
      'Hyperspectral Imaging',
    ],
    sameAs: [],
  };

  return (
    <>
      <Seo
        title="Azam Ayaz — Software Engineer & Founder building AI-first systems"
        description={site.shortBio}
        path="/"
        schema={[personSchema, buildFaqSchema(homeFaqs)]}
      />

      <Hero />

      <TechMarquee />

      {/* What I do — capability overview */}
      <Section className="border-b border-border bg-surface/30">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="What I do"
            title="From idea to production-grade software"
            description="Three ways I help founders and teams ship: intelligent products, complete builds, and systems that run the business."
          />
          <SectionLink to="/services" label="All services" />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <Link to={`/services#${s.slug}`} className="block h-full">
                <ServiceCard service={s} />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Featured work */}
      <Section id="work">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Selected work"
            title="Systems built to ship and scale"
            description="A selection of real builds — AI agents, ERP platforms, and data products — presented as the commercial systems they are."
          />
          <SectionLink to="/projects" label="View all projects" />
        </div>
        <div className="mt-12 grid gap-6">
          {featured[0] && <ProjectCard project={featured[0]} featured />}
          <div className="grid gap-6 md:grid-cols-3">
            {featured.slice(1, 4).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </Section>

      {/* Products marketplace teaser */}
      <Section className="border-y border-border bg-surface/30">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Software marketplace"
            title="Ready-made software you can ship today"
            description="Production-grade systems available to buy, license, or customize — skip months of groundwork and launch faster."
          />
          <SectionLink to="/products" label="Browse products" />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>

      {/* Research */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Research & innovation"
            title="Where engineering meets the frontier"
            description="Applied research in imaging, vision, and AI — exploring what’s next and bringing it into practical systems."
          />
          <SectionLink to="/research" label="Explore research" />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {research.map((r, i) => (
            <Reveal as="article" key={r.slug} delay={i * 0.06} className="card card-hover p-6">
              <div className="flex items-center justify-between">
                <span className="chip">{r.field}</span>
                <span className="text-2xs font-semibold uppercase tracking-wider text-accent">
                  {r.status}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm text-muted text-pretty">{r.summary}</p>
              <Link
                to={`/research#${r.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
              >
                Read more <Icon name="arrow-right" size={14} />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Tech stack */}
      <Section className="border-t border-border bg-surface/30">
        <SectionHeading
          align="center"
          eyebrow="Capabilities"
          title="A modern, full-stack toolkit"
          description="The technologies behind the work — chosen for reliability, speed, and the ability to ship serious software."
        />
        <div className="mt-12">
          <TechStack />
        </div>
      </Section>

      <Testimonials />

      {/* FAQ preview */}
      <Section>
        <SectionHeading
          align="center"
          eyebrow="FAQ"
          title="Answers before you ask"
          description="Common questions about working together, technologies, and what’s possible."
        />
        <div className="mt-12">
          <Faq items={homeFaqs} />
          <div className="mt-8 text-center">
            <SectionLink to="/contact#faq" label="See all FAQs" />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
