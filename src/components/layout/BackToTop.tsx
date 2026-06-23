import { useScrolledPast } from '@/lib/hooks';
import { Icon } from '@/components/Icon';
import { cn } from '@/lib/cn';

export function BackToTop() {
  const show = useScrolledPast(600);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={cn(
        'fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-full',
        'border border-border bg-surface/80 text-ink shadow-card backdrop-blur',
        'transition-all duration-300 hover:border-brand/60 hover:text-brand',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <Icon name="arrow-up" size={18} />
    </button>
  );
}
