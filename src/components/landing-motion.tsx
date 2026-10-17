import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveals `[data-reveal]` elements as they enter the viewport and drives the
 * card spotlight. Content stays visible without JavaScript: elements are only
 * hidden while `html.motion-ready` is set (by the inline head script).
 */
export function useLandingMotion(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const html = document.documentElement;
    if (prefersReducedMotion()) {
      html.classList.remove('motion-ready');
      return;
    }
    html.classList.add('motion-ready');
    (window as Window & { __niuMotion?: boolean }).__niuMotion = true;
    const targets = Array.from(scope.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    targets.forEach((el) => observer.observe(el));

    const onPointerMove = (event: PointerEvent) => {
      const card = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-spotlight]');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };
    scope.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      observer.disconnect();
      scope.removeEventListener('pointermove', onPointerMove);
    };
  }, [root]);
}

/** Counts a formatted metric (for example `3,239`, `10.7×`, `31.5 ms`) up from zero once visible. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const match = value.match(/^([\d,]+(?:\.\d+)?)(.*)$/);
    const el = ref.current;
    if (!match || !el || prefersReducedMotion()) return;
    const [, numeric, suffix] = match;
    const target = Number(numeric.replaceAll(',', ''));
    const decimals = numeric.includes('.') ? numeric.split('.')[1].length : 0;
    const grouped = numeric.includes(',');
    const format = (n: number) =>
      `${n.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: grouped,
      })}${suffix}`;
    setDisplay(format(0));
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(t < 1 ? format(target * eased) : value);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
