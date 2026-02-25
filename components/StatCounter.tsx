"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";

interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
  duration?: number;
  icon?: ReactNode;
  variant?: "default" | "hero-strip";
}

export default function StatCounter({
  value,
  suffix,
  label,
  duration = 1500,
  icon,
  variant = "default",
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

  if (variant === "hero-strip") {
    return (
      <div ref={ref} className="flex min-h-[84px] items-center gap-3 md:min-h-[92px] md:gap-4">
        {icon ? (
          <span className="relative grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border border-primary-green/35 bg-[linear-gradient(180deg,rgba(23,109,72,0.28),rgba(23,109,72,0.12))] text-[var(--gd-accent-bright)] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_10px_22px_rgba(0,0,0,0.22),0_0_24px_rgba(23,109,72,0.18)] md:h-11 md:w-11">
            <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.12),transparent_62%)]" />
            <span className="relative">{icon}</span>
          </span>
        ) : null}
        <div className="min-w-0">
          <div className="flex items-baseline gap-0.5">
            <span className="font-sans text-[34px] font-black leading-none tracking-tight text-[var(--gd-accent-bright)] drop-shadow-[0_6px_20px_rgba(23,109,72,0.44)] tabular-nums md:text-[46px]">
              {count}
            </span>
            <span className="font-sans text-[22px] font-black leading-none tracking-tight text-[var(--gd-accent-bright)] drop-shadow-[0_4px_16px_rgba(23,109,72,0.34)] md:text-[28px]">
              {suffix}
            </span>
          </div>
          <span className="tt-label mt-1.5 block text-[11px] font-semibold tracking-[0.05em] text-white/88 md:text-xs">
            {label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex flex-col items-center">
      <span className="font-sans text-4xl font-black leading-none tracking-tight text-[#1CB879] drop-shadow-[0_4px_18px_rgba(23,109,72,0.35)] tabular-nums xl:text-5xl">
        {count}
        {suffix}
      </span>
      <span className="tt-label mt-2 text-xs font-semibold uppercase tracking-[0.05em] text-white/60">
        {label}
      </span>
    </div>
  );
}
