"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import FadeUp from "@/components/FadeUp";

type CategoryKey = "roof" | "terrace" | "foundation";

type CalculatorRow = {
  category: CategoryKey;
  priceMin: number;
  priceMax: number;
  warrantyMin: number;
  warrantyMax: number;
};

const CATEGORY_KEYS: CategoryKey[] = ["roof", "terrace", "foundation"];

const CALCULATOR_ROWS: CalculatorRow[] = [
  { category: "roof", priceMin: 90, priceMax: 120, warrantyMin: 5, warrantyMax: 7 },
  { category: "roof", priceMin: 80, priceMax: 120, warrantyMin: 10, warrantyMax: 15 },
  { category: "terrace", priceMin: 80, priceMax: 80, warrantyMin: 3, warrantyMax: 5 },
  { category: "terrace", priceMin: 100, priceMax: 120, warrantyMin: 7, warrantyMax: 7 },
  { category: "terrace", priceMin: 150, priceMax: 150, warrantyMin: 10, warrantyMax: 10 },
  { category: "foundation", priceMin: 75, priceMax: 75, warrantyMin: 5, warrantyMax: 5 },
];

const CATEGORY_PRICE_MIN_OVERRIDE: Partial<Record<CategoryKey, number>> = {
  roof: 70,
};

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export function Calculator({ showHeader = true, compact = false }: { showHeader?: boolean; compact?: boolean }) {
  const t = useTranslations("calculator");
  const tNav = useTranslations("navigation");
  const locale = useLocale();

  const fieldLabels = t.raw("matrix.fields") as Record<string, string>;
  const categoryLabels = t.raw("matrix.categories") as Record<CategoryKey, string>;
  const includesLabels = t.raw("matrix.includes") as Record<CategoryKey, string[]>;
  const yearsSuffix = t("matrix.years_suffix");

  const [category, setCategory] = useState<CategoryKey>("roof");
  const [area, setArea] = useState(250);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const resultVisible = useInView(resultRef, { once: true, amount: 0.35 });

  const rowsForCategory = useMemo(
    () => CALCULATOR_ROWS.filter((row) => row.category === category),
    [category],
  );

  const result = useMemo(() => {
    const rawPriceMin = Math.min(...rowsForCategory.map((row) => row.priceMin));
    const priceMax = Math.max(...rowsForCategory.map((row) => row.priceMax));
    const warrantyMin = Math.min(...rowsForCategory.map((row) => row.warrantyMin));
    const warrantyMax = Math.max(...rowsForCategory.map((row) => row.warrantyMax));
    const priceMin = CATEGORY_PRICE_MIN_OVERRIDE[category] ?? rawPriceMin;

    const perMin = Math.round(priceMin);
    const perMax = Math.round(priceMax);
    const totalMin = Math.round(perMin * area);
    const totalMax = Math.round(perMax * area);

    return { perMin, perMax, totalMin, totalMax, warrantyMin, warrantyMax };
  }, [area, category, rowsForCategory]);

  const animatedPerMin = useCountTransition(result.perMin, resultVisible, 800);
  const animatedPerMax = useCountTransition(result.perMax, resultVisible, 900);
  const animatedTotalMin = useCountTransition(result.totalMin, resultVisible, 900);
  const animatedTotalMax = useCountTransition(result.totalMax, resultVisible, 1000);
  const animatedWarrantyMin = useCountTransition(result.warrantyMin, resultVisible, 700);
  const animatedWarrantyMax = useCountTransition(result.warrantyMax, resultVisible, 850);

  const padding = compact ? "py-10 md:py-14" : "py-[72px] md:py-[120px]";

  return (
    <section id="calculator" className={`gd-cv-auto gd-section-divider relative ${padding}`}>
      <div className="pointer-events-none absolute inset-0 gd-bg-main" />

      <div className="relative gd-container">
        {showHeader ? (
          <>
            <FadeUp>
              <p className="tt-label text-primary-green">{tNav("calculator")}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="tt-heading-lg mt-3 text-white">{t("title")}</h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="tt-detail mt-4 max-w-3xl text-base leading-relaxed text-gd-muted">{t("subtitle")}</p>
            </FadeUp>
          </>
        ) : null}

        <div className={`${showHeader ? "mt-12" : "mt-3"} grid gap-7 lg:grid-cols-[1.05fr_0.95fr]`}>
          <div className="rounded-xl border border-white/10 bg-[color:var(--gd-surface)]/55 p-6 shadow-elevated backdrop-blur md:p-8">
            <div className="grid gap-5">
              <Field label={fieldLabels.category}>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {CATEGORY_KEYS.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setCategory(key)}
                      className={[
                        "tt-ui rounded-lg border px-4 py-3 text-sm font-semibold text-left transition",
                        category === key
                          ? "border-primary-green/80 bg-gradient-to-b from-primary-green/22 to-primary-green/10 text-white shadow-[0_8px_24px_rgba(23,109,72,0.18)]"
                          : "border-white/15 bg-[color:var(--gd-surface-soft)] text-white/90 hover:border-white/25 hover:bg-[color:var(--gd-surface)] hover:text-white",
                      ].join(" ")}
                      aria-pressed={category === key}
                    >
                      {categoryLabels[key]}
                    </button>
                  ))}
                </div>
              </Field>

              <div className="rounded-xl border border-white/12 bg-[color:var(--gd-surface-soft)]/95 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="tt-label text-xs font-extrabold uppercase tracking-[0.18em] text-white/75">
                    {fieldLabels.includes}
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {includesLabels[category].map((label) => (
                    <span
                      key={label}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-white/85"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-[color:var(--gd-surface)] px-3 py-2.5">
                    <p className="tt-label text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
                      {fieldLabels.price}
                    </p>
                    <p className="mt-1 text-base font-extrabold text-white">
                      {formatRange(result.perMin, result.perMax)} ₾/m²
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-[color:var(--gd-surface)] px-3 py-2.5">
                    <p className="tt-label text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
                      {fieldLabels.warranty}
                    </p>
                    <p className="mt-1 text-base font-extrabold text-primary-green">
                      {formatRange(result.warrantyMin, result.warrantyMax)} {yearsSuffix}
                    </p>
                  </div>
                </div>
              </div>

              <Field label={t("fields.area")}>
                <div className="rounded-lg border border-white/15 bg-[color:var(--gd-surface-soft)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-extrabold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
                      {formatNumber(area)} <span className="text-primary-green">m²</span>
                    </span>
                    <span className="text-xs font-semibold text-white/65">{t("matrix.area_range")}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={2000}
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="gd-range mt-4 w-full"
                    aria-label={t("matrix.area_range")}
                  />
                  <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-white/45">
                    <span>{t("matrix.area_min")}</span>
                    <span>{t("matrix.area_max")}</span>
                  </div>
                </div>
              </Field>
            </div>
          </div>

          <div
            ref={resultRef}
            className="rounded-xl border border-primary-green/70 bg-gd-result p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35),0_0_0_1px_rgba(23,109,72,0.15)] md:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">{fieldLabels.price}</p>
            <p className="mt-2 font-sans text-4xl font-extrabold tracking-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.35)] md:text-[56px] md:leading-[1.02]">
              {formatRange(animatedPerMin, animatedPerMax)} ₾/m²
            </p>

            <div className="mt-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">{fieldLabels.total}</p>
              <span className="mt-2 block font-sans text-[28px] font-extrabold tracking-tight text-primary-green [text-shadow:0_2px_14px_rgba(23,109,72,0.2)] md:text-[34px] md:leading-[1.1]">
                {formatRange(animatedTotalMin, animatedTotalMax, " ₾")}
              </span>
            </div>

            <div className="mt-6 rounded-lg border border-white/12 bg-[color:var(--gd-surface-soft)]/95 px-4 py-3.5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/65">
                    {fieldLabels.warranty}
                  </p>
                  <p className="mt-1 text-xl font-extrabold tracking-tight text-white">
                    {formatRange(animatedWarrantyMin, animatedWarrantyMax)} {yearsSuffix}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-white/65">{categoryLabels[category]}</p>
                  <p className="text-sm font-bold text-white">{fieldLabels.categoryRange}</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm italic leading-relaxed text-gd-muted">{t("note")}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link
                href={`/${locale}/contact`}
                className="btn-primary tt-ui inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold"
              >
                {t("cta")}
              </Link>
              <Link
                href={`/${locale}/services`}
                className="btn-secondary tt-ui inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold"
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

function formatRange(min: number, max: number, suffix = "") {
  if (min === max) return `${formatNumber(min)}${suffix}`;
  return `${formatNumber(min)} – ${formatNumber(max)}${suffix}`;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="tt-label text-xs font-extrabold uppercase tracking-[0.18em] text-white/75">{label}</p>
      {children}
    </div>
  );
}

function useCountTransition(target: number, enabled: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  const previousRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const from = previousRef.current;
    const to = target;
    let raf = 0;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(from + (to - from) * eased);

      setValue(nextValue);

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        previousRef.current = to;
        setValue(to);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [duration, enabled, target]);

  return value;
}
