import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';

/** Scroll-through-page progress as 0..1, throttled to animation frames. */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return progress;
}

/** True once the user has scrolled past `threshold` px. */
export function useScrolledPast(threshold = 8): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return past;
}

/** Lock body scroll while `locked` is true (for modals / mobile menus). */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

/** Tracks which section id is currently active in the viewport. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

/** Returns whether the user prefers reduced motion (reactively). */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/**
 * Mouse-driven 3D tilt + spotlight tracking. Spread the returned handlers on an
 * element carrying the `tilt` / `spotlight` CSS classes — the handlers write
 * `--rx/--ry/--mx/--my` custom properties the CSS reads. No-ops for reduced motion.
 */
export function useTilt(maxDeg = 5) {
  const reduced = usePrefersReducedMotion();

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
      if (reduced) return;
      el.style.setProperty('--rx', `${((0.5 - py) * maxDeg * 2).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${((px - 0.5) * maxDeg * 2).toFixed(2)}deg`);
    },
    [maxDeg, reduced],
  );

  const onMouseLeave = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }, []);

  return { onMouseMove, onMouseLeave };
}

/** Generic keyboard shortcut binding. Combine with modifiers via the predicate. */
export function useHotkey(predicate: (e: KeyboardEvent) => boolean, handler: (e: KeyboardEvent) => void): void {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (predicate(e)) handlerRef.current(e);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
