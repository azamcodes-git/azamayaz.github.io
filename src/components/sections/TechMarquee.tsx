import { technologies } from '@/data/technologies';

const names = Array.from(new Set(technologies.flatMap((g) => g.items.map((i) => i.name))));

/** Infinite scrolling strip of technologies. Pauses on hover; frozen for reduced motion. */
export function TechMarquee() {
  return (
    <div className="border-y border-border bg-surface/40 py-5" aria-label="Technologies I work with">
      <div className="marquee mask-fade-x overflow-hidden">
        <div className="marquee-track items-center gap-3 pr-3">
          {/* Track duplicated once so the -50% translate loops seamlessly */}
          {[...names, ...names].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="chip whitespace-nowrap px-4 py-1.5 text-sm"
              aria-hidden={i >= names.length}
            >
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand to-accent" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
