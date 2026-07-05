import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Magnetic } from '@/components/ui/Magnetic';

interface CtaBandProps {
  title?: string;
  description?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
}

/** Reusable conversion band — appears at the foot of most pages. */
export function CtaBand({
  title = 'Have a project in mind?',
  description = 'Whether it’s an AI feature, a full product, or a system to run your business — let’s scope it and build something that ships.',
  primary = { label: 'Start a conversation', to: '/contact' },
  secondary = { label: 'See the work', to: '/projects' },
}: CtaBandProps) {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl border border-border bg-surface px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.12]" />
            <div
              className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl animate-aurora-slow"
              style={{ background: 'radial-gradient(closest-side, rgb(var(--brand) / 0.55), transparent)' }}
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted text-pretty">{description}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Magnetic className="w-full sm:w-auto">
                  <Link to={primary.to} className="btn-primary w-full sm:w-auto">
                    {primary.label} <Icon name="arrow-right" size={16} />
                  </Link>
                </Magnetic>
                <Link to={secondary.to} className="btn-secondary w-full sm:w-auto">
                  {secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
