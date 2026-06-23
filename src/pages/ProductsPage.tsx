import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/sections/PageHeader';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/sections/CtaBand';
import { ProductCard } from '@/components/cards/ProductCard';
import { Icon } from '@/components/Icon';
import { products } from '@/data/products';
import { site } from '@/data/site';

const valueProps = [
  { icon: 'rocket' as const, title: 'Ship faster', text: 'Start from a finished system, not a blank repo.' },
  { icon: 'code' as const, title: 'Own the code', text: 'Full, documented source with every purchase.' },
  { icon: 'layers' as const, title: 'Built to extend', text: 'Clean architecture made to customize and grow.' },
  { icon: 'shield' as const, title: 'Production-grade', text: 'Real systems, not demos or thin templates.' },
];

export default function ProductsPage() {
  return (
    <>
      <Seo
        title="Software Marketplace — Ready-Made Systems"
        description="Buy or license production-ready software by Azam Ayaz: inventory & POS, payroll automation, AI voice agents, and dashboard kits. Full source code, customizable, and built to ship."
        path="/products"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Software Marketplace',
          url: `${site.url}/products`,
        }}
      />

      <PageHeader
        eyebrow="Marketplace"
        title="Ready-made software, ready to ship"
        description="Production-grade systems you can buy, license, or have customized. Each comes with full source code and the polish of a commercial product — so you launch in days, not months."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Products' }]}
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05} className="card p-5">
              <Icon name={v.icon} size={22} className="text-brand" />
              <h3 className="mt-3 font-semibold text-ink">{v.title}</h3>
              <p className="mt-1 text-sm text-muted text-pretty">{v.text}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <Reveal className="mt-12 rounded-2xl border border-dashed border-border bg-surface/40 p-8 text-center">
          <h2 className="font-display text-xl font-semibold">Don’t see what you need?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted text-pretty">
            The catalog is growing — and most products can be tailored to your exact requirements.
            Tell me what you’re after and I’ll point you to the best fit or build it.
          </p>
        </Reveal>
      </Section>

      <CtaBand
        title="Need a custom version?"
        description="Every product can be adapted to your business — branding, features, integrations, and more. Let’s talk about what you need."
        primary={{ label: 'Request a custom build', to: '/contact' }}
        secondary={{ label: 'See services', to: '/services' }}
      />
    </>
  );
}
