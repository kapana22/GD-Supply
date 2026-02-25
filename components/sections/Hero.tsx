"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, BriefcaseBusiness, Clock3, ShieldCheck } from "lucide-react";
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

  const statIcons = [
    <BriefcaseBusiness key="briefcase" className="h-5 w-5" strokeWidth={1.8} />,
    <ShieldCheck key="shield" className="h-5 w-5" strokeWidth={1.8} />,
    <BadgeCheck key="badge" className="h-5 w-5" strokeWidth={1.8} />,
    <Clock3 key="clock" className="h-5 w-5" strokeWidth={1.8} />,
  ] as const;

  return (
    <section className="relative -mt-[84px] min-h-[680px] overflow-hidden pt-[84px] md:min-h-[720px]">
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

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(26,28,51,0)_0px,rgba(26,28,51,0)_96px,rgba(26,28,51,0.12)_160px,rgba(26,28,51,0.46)_52%,rgba(26,28,51,0.94))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(980px_560px_at_74%_28%,rgba(28,184,121,0.14),transparent_62%),radial-gradient(760px_420px_at_14%_22%,rgba(255,255,255,0.07),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[linear-gradient(115deg,rgba(255,255,255,0.06)_0%,transparent_36%,transparent_64%,rgba(28,184,121,0.06)_100%)]" />

      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-[60px] md:px-10 md:py-[100px]">
        <div className="max-w-3xl space-y-7">
          <motion.div {...fadeUp(0)}>
            <span className="tt-label inline-flex items-center rounded-full border border-primary-green/70 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.08em] text-white/85 backdrop-blur">
              დაარსდა 2014 წელს • 300+ პროექტი
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.15)}
            className="tt-heading-xl max-w-[12ch] text-4xl font-extrabold text-white md:text-6xl lg:text-[72px]"
          >
            {title}
          </motion.h1>

          <motion.p {...fadeUp(0.3)} className="tt-detail max-w-2xl text-base text-gd-muted md:text-lg">
            {subtitle}
          </motion.p>

          <motion.div {...fadeUp(0.42)} className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/contact`}
              className="btn-primary tt-ui inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold"
            >
              {ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/portfolio`}
              className="btn-secondary tt-ui inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold"
            >
              {ctaSecondary}
            </Link>
          </motion.div>

        </div>

        <motion.div
          {...fadeUp(0.55)}
          className="relative mt-8 max-w-[1180px] overflow-hidden rounded-2xl border border-white/20 bg-[linear-gradient(180deg,rgba(11,16,31,0.86),rgba(11,16,31,0.68))] shadow-[0_24px_60px_rgba(3,6,16,0.46),inset_0_1px_0_rgba(255,255,255,0.11),0_0_44px_rgba(23,109,72,0.14)] backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(680px_240px_at_10%_0%,rgba(255,255,255,0.09),transparent_72%),radial-gradient(700px_260px_at_92%_2%,rgba(23,109,72,0.24),transparent_74%),linear-gradient(120deg,rgba(255,255,255,0.035)_0%,transparent_34%,transparent_60%,rgba(23,109,72,0.06)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.40),transparent)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),rgba(28,184,121,0.35),rgba(255,255,255,0.12),transparent)]" />
          <div className="pointer-events-none absolute left-[18%] right-[18%] bottom-0 h-[2px] bg-[linear-gradient(90deg,transparent,rgba(28,184,121,0.0)_0%,rgba(28,184,121,0.75)_50%,rgba(28,184,121,0.0)_100%)]" />
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white/[0.03] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-primary-green/[0.08] to-transparent" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {parsedStats.map((item, index) => (
              <div
                key={item.label}
                className={`px-4 py-4 md:px-5 md:py-5 xl:px-6 ${
                  index !== parsedStats.length - 1
                    ? "border-b border-white/14 md:[&:nth-child(2)]:border-b xl:border-b-0 xl:border-r xl:border-white/14"
                    : ""
                }`}
              >
                <StatCounter
                  value={item.value}
                  suffix={item.suffix}
                  label={item.label}
                  duration={1600}
                  icon={statIcons[index]}
                  variant="hero-strip"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
