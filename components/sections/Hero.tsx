"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import StatCounter from "@/components/StatCounter";

type HeroStat = { value: string; label: string };

type HeroProps = {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: HeroStat[];
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero({ title, subtitle, ctaPrimary, ctaSecondary, stats }: HeroProps) {
  const locale = useLocale();

  const parsedStats = stats.slice(0, 4).map((item) => {
    const match = item.value.match(/(\d+)(.*)/);
    const value = match ? Number(match[1]) : 0;
    const suffix = match ? match[2] : "";
    return { value, suffix, label: item.label };
  });

  return (
    <section className="relative min-h-[680px] overflow-hidden bg-primary-navy md:min-h-[720px]">
      <div className="hero-video-wrapper is-visible" aria-hidden="true">
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

      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-[60px] md:px-10 md:py-[100px]">
        <div className="max-w-3xl space-y-7">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center rounded-full border border-primary-green/70 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-white/85 backdrop-blur">
              დაარსდა 2014 წელს • 500+ პროექტი
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.15)}
            className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl md:leading-[1.03] lg:text-[72px]"
          >
            {title}
          </motion.h1>

          <motion.p {...fadeUp(0.3)} className="max-w-2xl text-base leading-relaxed text-gd-muted md:text-lg">
            {subtitle}
          </motion.p>

          <motion.div {...fadeUp(0.42)} className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/contact`}
              className="btn-primary inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold"
            >
              {ctaPrimary} →
            </Link>
            <Link
              href={`/${locale}/portfolio`}
              className="inline-flex items-center justify-center rounded-lg border border-white/14 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
            >
              {ctaSecondary}
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp(0.55)}
            className="rounded-xl border border-white/10 bg-white/[0.04] shadow-elevated backdrop-blur"
          >
            <div className="grid grid-cols-2 divide-y divide-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
              {parsedStats.map((item) => (
                <div key={item.label} className="px-5 py-4 md:px-6 md:py-5">
                  <StatCounter value={item.value} suffix={item.suffix} label={item.label} duration={1600} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
