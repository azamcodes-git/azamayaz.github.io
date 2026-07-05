import { useRef, type MouseEvent, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';

interface MagneticProps {
  children: ReactNode;
  /** How strongly the element leans toward the cursor (0–1). */
  strength?: number;
  className?: string;
}

/** Subtle magnetic pull — the child drifts a few pixels toward the cursor. */
export function Magnetic({ children, strength = 0.22, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    ref.current.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
