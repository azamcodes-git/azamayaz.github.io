import { technologies } from '@/data/technologies';
import { Reveal } from '@/components/ui/Reveal';

/** Skills shown as labeled capability cards — no percentage bars, by design. */
export function TechStack() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {technologies.map((group, gi) => (
        <Reveal key={group.category} delay={gi * 0.06} className="card p-6">
          <h3 className="font-display text-lg font-semibold text-ink">{group.category}</h3>
          <ul className="mt-4 grid gap-2.5">
            {group.items.map((item) => (
              <li
                key={item.name}
                className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2.5 last:border-0 last:pb-0"
              >
                <span className="text-sm font-medium text-ink">{item.name}</span>
                <span className="text-right text-xs text-subtle">{item.note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
