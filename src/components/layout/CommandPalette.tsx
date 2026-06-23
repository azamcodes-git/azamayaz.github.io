import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, type IconName } from '@/components/Icon';
import { useBodyScrollLock, useHotkey } from '@/lib/hooks';
import { cn } from '@/lib/cn';
import { site } from '@/data/site';
import { projects } from '@/data/projects';
import { products } from '@/data/products';
import { services } from '@/data/services';
import { research } from '@/data/research';
import { caseStudies } from '@/data/caseStudies';

interface Command {
  id: string;
  label: string;
  group: string;
  to: string;
  icon: IconName;
  keywords?: string;
}

interface PaletteContextValue {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const PaletteContext = createContext<PaletteContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useCommandPalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error('useCommandPalette must be used within CommandPaletteProvider');
  return ctx;
}

function buildCommands(): Command[] {
  const pages: Command[] = [
    { id: 'home', label: 'Home', group: 'Pages', to: '/', icon: 'rocket' },
    { id: 'about', label: 'About', group: 'Pages', to: '/about', icon: 'eye' },
    { id: 'contact', label: 'Contact', group: 'Pages', to: '/contact', icon: 'mail' },
    ...site.nav.map((n) => ({
      id: `nav-${n.to}`,
      label: n.label,
      group: 'Pages',
      to: n.to,
      icon: 'arrow-right' as IconName,
    })),
  ];
  return [
    ...pages,
    ...projects.map((p) => ({
      id: `project-${p.slug}`,
      label: p.title,
      group: 'Projects',
      to: `/projects/${p.slug}`,
      icon: 'code' as IconName,
      keywords: `${p.tagline} ${p.categories.join(' ')}`,
    })),
    ...products.map((p) => ({
      id: `product-${p.slug}`,
      label: p.name,
      group: 'Products',
      to: `/products/${p.slug}`,
      icon: 'layers' as IconName,
      keywords: p.summary,
    })),
    ...services.map((s) => ({
      id: `service-${s.slug}`,
      label: s.title,
      group: 'Services',
      to: `/services#${s.slug}`,
      icon: s.icon as IconName,
      keywords: s.short,
    })),
    ...research.map((r) => ({
      id: `research-${r.slug}`,
      label: r.title,
      group: 'Research',
      to: `/research#${r.slug}`,
      icon: 'cpu' as IconName,
      keywords: r.summary,
    })),
    ...caseStudies.map((c) => ({
      id: `case-${c.slug}`,
      label: c.title,
      group: 'Case Studies',
      to: `/case-studies/${c.slug}`,
      icon: 'shield' as IconName,
      keywords: c.summary,
    })),
  ];
}

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands = useMemo(buildCommands, []);
  useBodyScrollLock(isOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setActive(0);
  }, []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  // Ctrl/Cmd + K toggles; "/" opens when not typing in a field.
  useHotkey(
    (e) => (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)),
    (e) => {
      e.preventDefault();
      toggle();
    },
  );
  useHotkey(
    (e) =>
      e.key === '/' &&
      !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName) &&
      !(e.target as HTMLElement)?.isContentEditable,
    (e) => {
      e.preventDefault();
      open();
    },
  );

  useEffect(() => {
    if (isOpen) requestAnimationFrame(() => inputRef.current?.focus());
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.group} ${c.keywords ?? ''}`.toLowerCase().includes(q),
    );
  }, [query, commands]);

  useEffect(() => setActive(0), [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Command[]>();
    results.forEach((c) => {
      const arr = map.get(c.group) ?? [];
      arr.push(c);
      map.set(c.group, arr);
    });
    return Array.from(map.entries());
  }, [results]);

  const go = useCallback(
    (cmd: Command) => {
      close();
      navigate(cmd.to);
    },
    [close, navigate],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]');
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const value = useMemo(() => ({ open, close, toggle }), [open, close, toggle]);

  let flatIndex = -1;

  return (
    <PaletteContext.Provider value={value}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-[12vh] sm:pt-[18vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <button
            type="button"
            aria-label="Close command palette"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fade-up_.2s_ease]"
            onClick={close}
          />
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-card animate-fade-up"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Icon name="search" size={18} className="text-subtle" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, products, services…"
                className="w-full bg-transparent py-4 text-sm text-ink placeholder:text-subtle focus:outline-none"
                aria-label="Search"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-2xs text-subtle sm:block">
                ESC
              </kbd>
            </div>
            <div ref={listRef} className="max-h-[55vh] overflow-y-auto p-2 scrollbar-none">
              {results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted">
                  No results for “{query}”.
                </p>
              )}
              {grouped.map(([group, items]) => (
                <div key={group} className="mb-1">
                  <p className="px-3 py-2 text-2xs font-semibold uppercase tracking-wider text-subtle">
                    {group}
                  </p>
                  {items.map((cmd) => {
                    flatIndex += 1;
                    const isActive = flatIndex === active;
                    const idx = flatIndex;
                    return (
                      <button
                        key={cmd.id}
                        type="button"
                        data-active={isActive}
                        onMouseEnter={() => setActive(idx)}
                        onClick={() => go(cmd)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition',
                          isActive ? 'bg-brand text-white' : 'text-ink hover:bg-surface-2',
                        )}
                      >
                        <Icon
                          name={cmd.icon}
                          size={16}
                          className={isActive ? 'text-white' : 'text-subtle'}
                        />
                        <span className="flex-1 truncate">{cmd.label}</span>
                        <Icon
                          name="arrow-right"
                          size={14}
                          className={isActive ? 'text-white/80' : 'text-transparent'}
                        />
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </PaletteContext.Provider>
  );
}
