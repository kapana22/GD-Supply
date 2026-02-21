"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useCountUp } from "@/hooks/useCountUp";

type ServiceKey = "flat_roof" | "terrace" | "foundation" | "pool" | "industrial_floor";
type Location = "tbilisi" | "region" | "mountain";

const SERVICE_KEYS: ServiceKey[] = [
  "flat_roof",
  "terrace",
  "foundation",
  "pool",
  "industrial_floor",
];

const LOCATION_KEYS: Location[] = ["tbilisi", "region", "mountain"];

const PRICES_GEL_PER_M2: Record<ServiceKey, { min: number; max: number }> = {
  flat_roof: { min: 70, max: 95 },
  terrace: { min: 80, max: 120 },
  foundation: { min: 95, max: 160 },
  pool: { min: 140, max: 220 },
  industrial_floor: { min: 75, max: 155 },
};

const LOCATION_FACTOR: Record<Location, number> = {
  tbilisi: 1,
  region: 1.1,
  mountain: 1.2,
};

function formatNumber(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatGel(n: number) {
  return `${formatNumber(n)} ₾`;
}

export function Calculator() {
  const t = useTranslations("calculator");
  const tNav = useTranslations("navigation");
  const locale = useLocale();

  const serviceLabels = t.raw("service_options") as string[];
  const locationLabels = t.raw("location_options") as string[];

  const [service, setService] = useState<ServiceKey>("flat_roof");
  const [area, setArea] = useState(250);
  const [location, setLocation] = useState<Location>("tbilisi");

  const result = useMemo(() => {
    const base = PRICES_GEL_PER_M2[service];
    const factor = LOCATION_FACTOR[location];

    const perMin = Math.round(base.min * factor);
    const perMax = Math.round(base.max * factor);
    const totalMin = Math.round(perMin * area);
    const totalMax = Math.round(perMax * area);

    return { perMin, perMax, totalMin, totalMax };
  }, [area, location, service]);

  return (
    <section id="calculator" className="fade-up relative py-[60px] md:py-[100px]">
      <div className="pointer-events-none absolute inset-0 bg-gd-surface" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] bg-dots [background-size:18px_18px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_20%,rgba(23,109,72,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-10 md:mb-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
            {tNav("calculator")}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-[40px] md:leading-[1.1]">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gd-muted">{t("subtitle")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-xl border border-white/10 bg-primary-navy/35 p-6 shadow-elevated backdrop-blur md:p-8">
            <div className="grid gap-5">
              <Field label={t("fields.service")}>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value as ServiceKey)}
                  className="w-full rounded border border-white/10 bg-black/25 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/30"
                >
                  {SERVICE_KEYS.map((k, idx) => (
                    <option key={k} value={k}>
                      {serviceLabels?.[idx] ?? k}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label={t("fields.area")}>
                <div className="rounded border border-white/10 bg-black/25 px-4 py-3">
                  <div className="flex items-center justify-between text-sm font-semibold text-white">
                    <span>{formatNumber(area)} მ²</span>
                    <span className="text-xs text-white/55">10–2000</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={2000}
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="gd-range mt-3 w-full"
                  />
                </div>
              </Field>

              <Field label={t("fields.location")}>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value as Location)}
                  className="w-full rounded border border-white/10 bg-black/25 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/30"
                >
                  {LOCATION_KEYS.map((k, idx) => (
                    <option key={k} value={k}>
                      {locationLabels?.[idx] ?? k}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          <div className="rounded-xl border border-primary-green bg-gd-result p-6 shadow-elevated md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">ფასი</p>
            <p className="mt-2 font-sans text-4xl font-extrabold text-white md:text-[56px] md:leading-[1.05]">
              <AnimatedNumber value={result.perMin} suffix="" /> – <AnimatedNumber value={result.perMax} suffix="" /> ₾ / მ²
            </p>

            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">სრული თანხა</p>
              <p className="mt-2 font-sans text-2xl font-extrabold text-primary-green md:text-[32px] md:leading-[1.15]">
                <AnimatedGel value={result.totalMin} /> – <AnimatedGel value={result.totalMax} />
              </p>
            </div>

            <p className="mt-6 text-sm italic leading-relaxed text-gd-muted">{t("note")}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center rounded-lg bg-primary-green px-5 py-3 text-sm font-semibold text-white shadow-glow-green transition hover:translate-y-0.5"
              >
                {t("cta")}
              </Link>
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center justify-center rounded-lg border border-white/14 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                {tNav("services")} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/65">{label}</p>
      {children}
    </div>
  );
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [started, setStarted] = useState(false);
  const [seed, setSeed] = useState(0);
  const count = useCountUp(value, 900, started);

  useEffect(() => {
    setSeed((x) => x + 1);
  }, [value]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.35 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} key={seed}>
      {formatNumber(count)}{suffix}
    </span>
  );
}

function AnimatedGel({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [started, setStarted] = useState(false);
  const [seed, setSeed] = useState(0);
  const count = useCountUp(value, 1000, started);

  useEffect(() => {
    setSeed((x) => x + 1);
  }, [value]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.35 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref} key={seed}>{formatGel(count)}</span>;
}
