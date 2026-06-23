import { useParams, Link, Navigate } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { CoverArt } from '@/components/ui/CoverArt';
import { Faq, buildFaqSchema } from '@/components/sections/Faq';
import { CtaBand } from '@/components/sections/CtaBand';
import { Icon } from '@/components/Icon';
import { getProduct, products } from '@/data/products';
import { site } from '@/data/site';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = slug ? getProduct(slug) : undefined;
  if (!product) return <Navigate to="/products" replace />;

  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const contactWith = (intent: string) => `/contact?subject=${encodeURIComponent(intent)}`;

  return (
    <>
      <Seo
        title={`${product.name} — ${product.category}`}
        description={product.summary}
        path={`/products/${product.slug}`}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            category: product.category,
            brand: { '@type': 'Brand', name: site.name },
            url: `${site.url}/products/${product.slug}`,
          },
          buildFaqSchema(product.faq),
        ]}
      />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="container py-14">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-subtle">
            <Link to="/products" className="hover:text-ink">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-muted">{product.name}</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <CoverArt from={product.cover.from} to={product.cover.to} label={product.name} />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex items-center gap-2">
                <span className="chip">{product.category}</span>
                {product.badge && (
                  <span className="rounded-full bg-brand px-2.5 py-1 text-2xs font-semibold uppercase tracking-wider text-white">
                    {product.badge}
                  </span>
                )}
              </div>
              <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{product.name}</h1>
              <p className="mt-4 text-lg text-muted text-pretty">{product.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to={contactWith(`Buy source code: ${product.name}`)} className="btn-primary">
                  <Icon name="code" size={16} /> Buy source code
                </Link>
                <Link to={contactWith(`Request demo: ${product.name}`)} className="btn-secondary">
                  Request demo
                </Link>
                <Link
                  to={contactWith(`Custom version: ${product.name}`)}
                  className="btn-secondary"
                >
                  Request custom version
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <Reveal>
              <h2 className="text-2xl font-bold">Features</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-muted">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent" />
                    <span className="text-pretty">{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-bold">Screenshots</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {product.screenshots.map((s, i) => (
                  <figure key={s.caption}>
                    <CoverArt
                      from={product.cover.from}
                      to={product.cover.to}
                      aspect="aspect-video"
                      compact
                      label={`${product.name} screenshot ${i + 1}`}
                    />
                    <figcaption className="mt-2 text-xs text-subtle">{s.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-bold">Frequently asked</h2>
              <div className="mt-4">
                <Faq items={product.faq} />
              </div>
            </Reveal>
          </div>

          {/* Sidebar: pricing + tech + licensing */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h3 className="font-display text-lg font-semibold">Pricing</h3>
              <div className="mt-4 space-y-3">
                {product.pricing.map((tier) => (
                  <div key={tier.label} className="rounded-xl border border-border bg-surface-2/50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-ink">{tier.label}</span>
                      <span className="text-sm font-bold text-brand">{tier.price}</span>
                    </div>
                    <p className="mt-1 text-xs text-subtle">{tier.note}</p>
                  </div>
                ))}
              </div>
              <Link
                to={contactWith(`Pricing enquiry: ${product.name}`)}
                className="btn-primary mt-4 w-full"
              >
                Request a quote
              </Link>
            </div>

            <div className="card p-6">
              <h3 className="font-display text-lg font-semibold">Supported technologies</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.technologies.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-display text-lg font-semibold">Licensing</h3>
              <p className="mt-3 text-sm text-muted text-pretty">{product.licensing}</p>
            </div>
          </aside>
        </div>
      </Section>

      <Section className="border-t border-border bg-surface/30">
        <h2 className="text-2xl font-bold">More products</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {others.map((p) => (
            <Link key={p.slug} to={`/products/${p.slug}`} className="card card-hover p-5">
              <span className="chip">{p.category}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted text-pretty">{p.summary}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
