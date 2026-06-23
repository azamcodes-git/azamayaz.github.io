import { useScrollProgress } from '@/lib/hooks';

/** Thin gradient bar pinned to the top edge, tracking page scroll. */
export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent" aria-hidden="true">
      <div
        className="h-full origin-left bg-gradient-to-r from-brand to-accent transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
