import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { site } from '@/data/site';
import { Icon } from '@/components/Icon';
import { cn } from '@/lib/cn';
import { useScrolledPast, useBodyScrollLock } from '@/lib/hooks';
import { ThemeToggle } from './ThemeToggle';
import { useCommandPalette } from './CommandPalette';

const linkBase =
  'relative px-3 py-2 text-sm font-medium transition-colors rounded-lg';

export function Navbar() {
  const scrolled = useScrolledPast(12);
  const [mobileOpen, setMobileOpen] = useState(false);
  const palette = useCommandPalette();
  useBodyScrollLock(mobileOpen);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-border bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <nav className="container flex h-16 items-center justify-between gap-4" aria-label="Primary">
        <Link to="/" className="group flex items-center gap-2.5" aria-label={`${site.name} — home`}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-accent font-display text-base font-bold text-white shadow-glow">
            A
          </span>
          <span className="hidden font-display text-base font-semibold tracking-tight sm:block">
            {site.name}
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {site.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  linkBase,
                  isActive ? 'text-ink' : 'text-muted hover:text-ink',
                  'after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-brand after:transition-all',
                  isActive ? 'after:opacity-100' : 'after:opacity-0',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={palette.open}
            className="hidden items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-subtle transition hover:border-brand/60 hover:text-ink sm:flex"
            aria-label="Open search (Command or Control + K)"
          >
            <Icon name="search" size={15} />
            <span>Search</span>
            <kbd className="ml-1 rounded border border-border px-1.5 text-2xs">⌘K</kbd>
          </button>
          <ThemeToggle />
          <Link to="/contact" className="btn-primary hidden h-9 px-4 py-0 sm:inline-flex">
            Let’s talk
          </Link>

          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-ink lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-x-0 top-16 z-50 origin-top animate-fade-up border-b border-border bg-bg p-4 shadow-card">
            <div className="grid gap-1">
              {[{ label: 'Home', to: '/' }, ...site.nav, { label: 'Contact', to: '/contact' }].map(
                (item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition',
                        isActive ? 'bg-surface-2 text-ink' : 'text-muted hover:bg-surface-2 hover:text-ink',
                      )
                    }
                  >
                    {item.label}
                    <Icon name="arrow-right" size={16} className="text-subtle" />
                  </NavLink>
                ),
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                palette.open();
              }}
              className="btn-secondary mt-3 w-full"
            >
              <Icon name="search" size={16} /> Search the site
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
