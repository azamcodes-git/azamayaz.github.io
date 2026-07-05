import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';

interface AnimatedCounterProps {
  /** e.g. "20+", "100%", "8" — non-numeric values render as-is. */
  value: string;
  duration?: number;
}

/** Counts up from 0 when scrolled into view. Skips animation for reduced motion. */
export function AnimatedCounter({ value, duration = 1400 }: AnimatedCounterProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : '';
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (target === null) return;
    if (reduced) {
      setDisplay(target);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
          setDisplay(Math.round(eased * target));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration, reduced]);

  if (target === null) return <span>{value}</span>;
  return (
    <span ref={ref} aria-label={value}>
      {display}
      {suffix}
    </span>
  );
}
