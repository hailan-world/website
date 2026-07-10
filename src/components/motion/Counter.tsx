"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: number;
  decimals?: number;
  className?: string;
}

/**
 * Animated count-up. Server-renders the final value (SEO-safe), then
 * counts up from zero once scrolled into view. Uses requestAnimationFrame
 * and a native IntersectionObserver — no animation library.
 */
export function Counter({ value, decimals = 0, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const format = (v: number) =>
    v.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const [text, setText] = useState(() => format(value));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The final value is already server-rendered, so no motion is a no-op.
    if (reduce || !("IntersectionObserver" in window)) return;

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();

        const duration = 1800;
        const easeOutExpo = (t: number) =>
          t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        let start: number | null = null;

        const tick = (now: number) => {
          if (start === null) start = now;
          const p = Math.min((now - start) / duration, 1);
          setText(format(value * easeOutExpo(p)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "-40px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
