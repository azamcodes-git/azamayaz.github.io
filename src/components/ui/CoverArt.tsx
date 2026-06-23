import { cn } from '@/lib/cn';

interface CoverArtProps {
  from: string;
  to: string;
  label?: string;
  className?: string;
  /** Aspect helper; pass a Tailwind aspect class. */
  aspect?: string;
  compact?: boolean;
}

/**
 * Generated gradient cover art — a tasteful, brand-consistent placeholder that
 * stands in for real screenshots without looking like a broken image. Uses
 * Tailwind color stop names from the data (e.g. "indigo-500").
 */
export function CoverArt({
  from,
  to,
  label,
  className,
  aspect = 'aspect-[16/10]',
  compact,
}: CoverArtProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border',
        `bg-gradient-to-br from-${from} to-${to}`,
        aspect,
        className,
      )}
      role="img"
      aria-label={label ? `Cover artwork for ${label}` : 'Decorative cover artwork'}
    >
      {/* depth + texture */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-black/20 blur-2xl" />
      {label && !compact && (
        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="text-2xs font-semibold uppercase tracking-[0.25em] text-white/80">
            {label}
          </span>
        </div>
      )}
      {/* faux window chrome for product/screenshot feel */}
      <div className="absolute left-4 top-4 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
      </div>
    </div>
  );
}
