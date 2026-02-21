"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

type HeroStat = { value: string; label: string };

type HeroProps = {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: HeroStat[];
};

const STAT_META = [
  { count: 10, suffix: "+", duration: 1500 },
  { count: 500, suffix: "+", duration: 2000 },
  { count: 3, suffix: "", duration: 800 },
  { count: 100, suffix: "%", duration: 1800 },
] as const;

export function Hero({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  stats,
}: HeroProps) {
  const { locale } = useParams() as { locale: string };
  const rootRef = useRef<HTMLElement | null>(null);
  const countersStarted = useRef(false);

  const statLabels = useMemo(() => stats.slice(0, 4), [stats]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          el.classList.add("is-visible");

          if (el.classList.contains("hero-stats-row") && !countersStarted.current) {
            countersStarted.current = true;
            startCounters(el);
          }
        });
      },
      { threshold: 0.2 },
    );

    root
      .querySelectorAll<HTMLElement>(".hero-video-wrapper, .hero-text-block, .hero-stats-row")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[680px] overflow-hidden bg-primary-navy md:min-h-[720px]"
    >
      {/* Background video */}
      <div className="hero-video-wrapper" aria-hidden="true">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/hero-poster.jpg"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(26,28,51,0.52),rgba(26,28,51,0.72)_45%,rgba(26,28,51,0.96))]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.16] bg-grid-strong [background-size:56px_56px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_70%_30%,rgba(23,109,72,0.22),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] animate-rain [background-image:repeating-linear-gradient(115deg,rgba(255,255,255,0.10)_0,rgba(255,255,255,0.10)_1px,transparent_1px,transparent_14px)] [background-size:220px_420px]" />

        <div className="video-overlay-badge">პროფ. ჰიდროიზოლაცია • 2014 →</div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-[60px] md:px-10 md:py-[100px]">
        <div className="hero-text-block max-w-3xl space-y-7">
          <div className="hero-anim-badge inline-flex items-center rounded-full border border-primary-green/70 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-white/85 backdrop-blur">
            დაარსდა 2014 წელს • 500+ პროექტი
          </div>

          <h1 className="hero-anim-h1 text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl md:leading-[1.03] lg:text-[72px]">
            {title}
          </h1>

          <p className="hero-anim-subtext max-w-2xl text-base leading-relaxed text-gd-muted md:text-lg">
            {subtitle}
          </p>

          <div className="hero-anim-cta flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center rounded-lg bg-primary-green px-6 py-3 text-sm font-semibold text-white shadow-glow-green transition hover:translate-y-0.5"
            >
              {ctaPrimary} →
            </Link>
            <Link
              href={`/${locale}/portfolio`}
              className="inline-flex items-center justify-center rounded-lg border border-white/14 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
            >
              {ctaSecondary}
            </Link>
          </div>

          <div className="hero-stats-row rounded-xl border border-white/10 bg-white/[0.04] shadow-elevated backdrop-blur">
            <div className="grid grid-cols-2 divide-y divide-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
              {statLabels.map((s, idx) => {
                const meta = STAT_META[idx] ?? STAT_META[0];
                const initialText = `0${meta.suffix}`;
                return (
                  <div key={s.label} className="hero-stat px-5 py-4 md:px-6 md:py-5">
                    <p className="font-sans text-3xl font-extrabold text-primary-green md:text-5xl">
                      <span
                        data-count={meta.count}
                        data-suffix={meta.suffix}
                        data-duration={meta.duration}
                      >
                        {initialText}
                      </span>
                    </p>
                    <p className="mt-1 text-xs font-semibold tracking-[0.14em] text-white/65">
                      {s.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function startCounters(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    if (el.dataset.started === "true") return;
    el.dataset.started = "true";

    const target = parseInt(el.dataset.count || "0", 10);
    const duration = parseInt(el.dataset.duration || "1500", 10);
    const suffix = el.dataset.suffix || "";

    let start = 0;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = `${Math.floor(eased * target)}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  });
}
