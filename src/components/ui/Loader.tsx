/** Elegant route-level loading state for lazy-loaded pages. */
export function Loader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <span className="relative grid h-12 w-12 place-items-center">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-border border-t-brand" />
          <span className="h-2 w-2 rounded-full bg-brand" />
        </span>
        <span className="text-sm text-subtle">Loading…</span>
      </div>
    </div>
  );
}

/** Generic shimmer block for skeleton states. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-shimmer rounded-lg bg-[length:200%_100%] bg-gradient-to-r from-surface-2 via-surface to-surface-2 ${className ?? ''}`}
    />
  );
}
