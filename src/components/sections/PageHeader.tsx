import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/ui/Reveal';

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}

/** Consistent top-of-page hero band for inner routes. */
export function PageHeader({ eyebrow, title, description, crumbs, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.15] mask-fade-b" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--brand) / 0.6), transparent)' }}
      />
      <div className="container relative py-16 sm:py-20">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-subtle">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {c.to ? (
                    <Link to={c.to} className="transition hover:text-ink">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-muted">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <Icon name="chevron-down" size={14} className="-rotate-90" />}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="max-w-3xl text-4xl font-bold sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted text-pretty">{description}</p>
        </Reveal>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
