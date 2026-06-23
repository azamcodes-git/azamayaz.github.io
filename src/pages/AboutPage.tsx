import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/sections/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Timeline } from '@/components/sections/Timeline';
import { TechStack } from '@/components/sections/TechStack';
import { CtaBand } from '@/components/sections/CtaBand';
import { Icon, type IconName } from '@/components/Icon';
import { site } from '@/data/site';

const principles: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'eye',
    title: 'Problem before code',
    text: 'I start with the real problem and the outcome that matters — then write the least software that solves it well.',
  },
  {
    icon: 'layers',
    title: 'Systems, not scripts',
    text: 'I build for the long run: clean architecture, sensible abstractions, and code the next engineer can read.',
  },
  {
    icon: 'sparkles',
    title: 'AI with judgment',
    text: 'I use AI where it genuinely creates value — grounded, evaluated, and reliable — not as a buzzword.',
  },
  {
    icon: 'rocket',
    title: 'Shipped beats perfect',
    text: 'Working software in users’ hands teaches more than any spec. I ship, learn, and iterate.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Azam Ayaz — Software Engineer & Founder"
        description="The journey, philosophy, and full-stack expertise of Azam Ayaz — a software engineer and founder building AI-powered, production-grade systems with a business mindset."
        path="/about"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Azam Ayaz',
          url: `${site.url}/about`,
          mainEntity: { '@type': 'Person', name: site.name, jobTitle: site.role },
        }}
      />

      <PageHeader
        eyebrow="About"
        title="Engineer by craft, founder by mindset"
        description="I build software the way a founder would — obsessed with the outcome, the user, and whether the thing actually works in the real world."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="prose-custom max-w-none space-y-5 text-lg leading-relaxed text-muted lg:col-span-2">
            <Reveal>
              <p className="text-pretty">
                I’m {site.name}, a software engineer and founder. My work sits where serious
                engineering meets real business value: AI-powered applications, full-stack web
                systems, and the operational software that keeps companies running.
              </p>
            </Reveal>
            <Reveal>
              <p className="text-pretty">
                I started, like many engineers, by falling in love with making things work. That
                curiosity grew into a full-stack practice — React and TypeScript on the front,
                Python and Django on the back — and then into something larger: building complete
                products, not just features. Inventory systems, payroll engines, dashboards, and ERP
                platforms taught me that software is only as good as the problem it solves.
              </p>
            </Reveal>
            <Reveal>
              <p className="text-pretty">
                In parallel, I went deep on AI and applied research — from hyperspectral imaging and
                computer vision to grounding large language models in real data and giving them
                tools to act. The thread connecting it all is a conviction that intelligent systems
                should be practical, reliable, and genuinely useful.
              </p>
            </Reveal>
            <Reveal>
              <p className="text-pretty">
                Today I build with a founder’s mindset: thinking about users, economics, and
                longevity — not just the code. My long-term vision is to create technology that
                outlasts the demo, earns its keep, and makes a measurable difference for the people
                who depend on it.
              </p>
            </Reveal>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h3 className="font-display text-lg font-semibold">At a glance</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-subtle">Role</dt>
                  <dd className="text-right font-medium text-ink">{site.role}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-subtle">Focus</dt>
                  <dd className="text-right font-medium text-ink">AI · Full-stack · Products</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-subtle">Location</dt>
                  <dd className="text-right font-medium text-ink">Remote-first</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-subtle">Status</dt>
                  <dd className="text-right font-medium text-accent">{site.availability}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </Section>

      {/* Principles */}
      <Section className="border-y border-border bg-surface/30">
        <SectionHeading
          eyebrow="Philosophy"
          title="How I approach the work"
          description="A few principles that shape every system I build."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="card p-6">
              <Icon name={p.icon} size={24} className="text-brand" />
              <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted text-pretty">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        <SectionHeading
          eyebrow="Timeline"
          title="The path so far"
          description="Education, milestones, and the steady move from engineer to founder."
        />
        <div className="mt-12 max-w-3xl">
          <Timeline />
        </div>
      </Section>

      {/* Tech */}
      <Section className="border-t border-border bg-surface/30">
        <SectionHeading
          eyebrow="Toolkit"
          title="Technologies I build with"
          description="Organized by where they fit in the stack — capabilities, not scores."
        />
        <div className="mt-12">
          <TechStack />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
