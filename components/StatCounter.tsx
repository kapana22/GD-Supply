"use client";

import { useEffect, useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";

interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
  duration?: number;
}

export default function StatCounter({
  value,
  suffix,
  label,
  duration = 1500,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { count, trigger } = useCountUp(value, duration);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <span className="font-sans text-4xl font-black leading-none text-[#176D48] tabular-nums xl:text-5xl">
        {count}
        {suffix}
      </span>
      <span className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-white/40">
        {label}
      </span>
    </div>
  );
}
