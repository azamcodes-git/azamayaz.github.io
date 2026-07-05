import { Link } from 'react-router-dom';
import { site } from '@/data/site';
import { Icon, type IconName } from '@/components/Icon';

const socialIcons: { key: keyof typeof site.social; icon: IconName }[] = [
  { key: 'github', icon: 'github' },
  { key: 'linkedin', icon: 'linkedin' },
  { key: 'x', icon: 'x' },
  { key: 'email', icon: 'mail' },
];

const quickLinks = [
  { label: 'Projects', to: '/projects' },
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'Research', to: '/research' },
];

const moreLinks = [
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/contact#faq' },
  { label: 'Contact', to: '/contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-accent font-display text-base font-bold text-white">
                A
              </span>
              <span className="font-display text-base font-semibold">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted text-pretty">{site.shortBio}</p>
            <div className="mt-5 flex gap-2">
              {socialIcons.map(({ key, icon }) => {
                const s = site.social[key];
                return (
                  <a
                    key={key}
                    href={s.href}
                    target={key === 'email' ? undefined : '_blank'}
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-muted transition hover:border-brand/60 hover:text-ink"
                  >
                    <Icon name={icon} size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Explore">
            <h3 className="text-sm font-semibold text-ink">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted transition hover:text-ink link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="More">
            <h3 className="text-sm font-semibold text-ink">More</h3>
            <ul className="mt-4 space-y-2.5">
              {moreLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted transition hover:text-ink link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold text-ink">Start a project</h3>
            <p className="mt-4 text-sm text-muted text-pretty">
              Have something to build? Let’s turn it into real, working software.
            </p>
            <Link to="/contact" className="btn-primary mt-4 w-full">
              Get in touch <Icon name="arrow-right" size={16} />
            </Link>
            <a
              href={site.social.email.href}
              className="mt-3 block text-sm text-muted transition hover:text-ink"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-subtle">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-3 text-sm text-subtle">
            Built with React, TypeScript &amp; Tailwind CSS.
            <Link to="/admin" className="opacity-50 transition hover:opacity-100 hover:text-ink">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
