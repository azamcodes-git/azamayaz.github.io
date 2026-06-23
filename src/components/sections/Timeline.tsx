import { timeline } from '@/data/timeline';
import type { TimelineEntry } from '@/data/types';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

const kindLabel: Record<TimelineEntry['kind'], string> = {
  education: 'Education',
  milestone: 'Milestone',
  project: 'Project',
  growth: 'Growth',
  venture: 'Venture',
};

const kindColor: Record<TimelineEntry['kind'], string> = {
  education: 'from-sky-500 to-cyan-400',
  milestone: 'from-emerald-500 to-lime-400',
  project: 'from-indigo-500 to-violet-500',
  growth: 'from-rose-500 to-orange-400',
  venture: 'from-fuchsia-500 to-violet-500',
};

export function Timeline() {
  return (
    <ol className="relative ml-3 border-l border-border">
      {timeline.map((entry, i) => (
        <Reveal as="li" key={entry.title} delay={i * 0.05} className="relative pb-10 pl-8 last:pb-0">
          <span
            className={cn(
              'absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-bg bg-gradient-to-br',
              kindColor[entry.kind],
            )}
          />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              {entry.period}
            </span>
            <span className="chip py-0.5 text-2xs">{kindLabel[entry.kind]}</span>
          </div>
          <h3 className="mt-2 font-display text-lg font-semibold text-ink">{entry.title}</h3>
          <p className="text-sm font-medium text-muted">{entry.org}</p>
          <p className="mt-2 max-w-2xl text-sm text-subtle text-pretty">{entry.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
