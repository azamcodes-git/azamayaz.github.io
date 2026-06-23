import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { site } from '@/data/site';
import { Icon } from '@/components/Icon';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/cn';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const MV = reduced ? 'div' : motion.div;
  const animProps = reduced
    ? {}
    : { variants: container, initial: 'hidden' as const, animate: 'show' as const };

  return (
    <section className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.18] mask-fade-b" />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--brand) / 0.55), transparent)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 left-[-10%] h-[32rem] w-[32rem] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--accent) / 0.5), transparent)' }}
      />

      <div className="container relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-8">
        <MV {...animProps} className="lg:col-span-7">
          <MV variants={reduced ? undefined : item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {site.availability}
            </span>
          </MV>

          <MV variants={reduced ? undefined : item}>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
              Engineering <span className="gradient-text">AI-first software</span> that runs real businesses.
            </h1>
          </MV>

          <MV variants={reduced ? undefined : item}>
            <p className="mt-6 max-w-xl text-lg text-muted text-pretty sm:text-xl">
              I’m {site.name} — a software engineer and founder. I design and build AI-powered
              applications, full-stack web systems, and scalable products that ship, perform, and
              earn their keep.
            </p>
          </MV>

          <MV variants={reduced ? undefined : item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="btn-primary">
              Start a project <Icon name="arrow-right" size={16} />
            </Link>
            <Link to="/projects" className="btn-secondary">
              Explore the work
            </Link>
          </MV>

          <MV
            variants={reduced ? undefined : item}
            className="mt-10 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4"
          >
            {site.stats.map((s) => (
              <div key={s.label} className="bg-surface px-4 py-4 text-center">
                <div className="font-display text-xl font-bold text-ink">{s.value}</div>
                <div className="mt-1 text-2xs text-subtle">{s.label}</div>
              </div>
            ))}
          </MV>
        </MV>

        {/* Portrait + floating cards */}
        <MV
          {...(reduced ? {} : { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } })}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-brand/30 to-accent/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface shadow-card">
              {/* Portrait placeholder */}
              <div className="relative aspect-[4/5] bg-gradient-to-br from-surface-2 to-surface">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-brand to-accent font-display text-4xl font-bold text-white shadow-glow">
                      AA
                    </div>
                    <p className="mt-4 text-sm font-medium text-muted">{site.name}</p>
                    <p className="text-xs text-subtle">Portrait placeholder</p>
                  </div>
                </div>
              </div>
            </div>

            <FloatingCard
              className="absolute -left-6 top-10 hidden sm:block"
              icon="sparkles"
              title="AI Integration"
              subtitle="Agents & LLMs"
              reduced={reduced}
              delay={0.2}
            />
            <FloatingCard
              className="absolute -right-4 bottom-12 hidden sm:block"
              icon="layers"
              title="Full-Stack"
              subtitle="React · Django"
              reduced={reduced}
              delay={0.4}
            />
          </div>
        </MV>
      </div>
    </section>
  );
}

function FloatingCard({
  className,
  icon,
  title,
  subtitle,
  reduced,
  delay,
}: {
  className?: string;
  icon: 'sparkles' | 'layers';
  title: string;
  subtitle: string;
  reduced: boolean;
  delay: number;
}) {
  const inner = (
    <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-card">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand to-accent text-white">
        <Icon name={icon} size={18} />
      </span>
      <span>
        <span className="block text-sm font-semibold text-ink">{title}</span>
        <span className="block text-2xs text-subtle">{subtitle}</span>
      </span>
    </div>
  );
  if (reduced) return <div className={className}>{inner}</div>;
  return (
    <motion.div
      className={cn(className, 'animate-float')}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      {inner}
    </motion.div>
  );
}
