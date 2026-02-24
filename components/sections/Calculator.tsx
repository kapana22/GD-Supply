"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import FadeUp from "@/components/FadeUp";

type CategoryKey = "roof" | "terrace" | "basement";
type SystemKey =
  | "coating_insulation"
  | "pvc_epdm"
  | "toli"
  | "acryl_cement"
  | "polyurethane"
  | "polyurea"
  | "liquid_bitumen";

type CalculatorRow = {
  id: SystemKey;
  category: CategoryKey;
  priceMin: number;
  priceMax: number;
  warrantyMin: number;
  warrantyMax: number;
};

const CATEGORY_KEYS: CategoryKey[] = ["roof", "terrace", "basement"];

const CALCULATOR_ROWS: CalculatorRow[] = [
  {
    id: "coating_insulation",
    category: "roof",
    priceMin: 90,
    priceMax: 120,
    warrantyMin: 5,
    warrantyMax: 7,
  },
  {
    id: "pvc_epdm",
    category: "roof",
    priceMin: 80,
    priceMax: 120,
    warrantyMin: 10,
    warrantyMax: 15,
  },
  {
    id: "toli",
    category: "roof",
    priceMin: 40,
    priceMax: 70,
    warrantyMin: 1,
    warrantyMax: 2,
  },
  {
    id: "acryl_cement",
    category: "terrace",
    priceMin: 80,
    priceMax: 80,
    warrantyMin: 3,
    warrantyMax: 5,
  },
  {
    id: "polyurethane",
    category: "terrace",
    priceMin: 100,
    priceMax: 120,
    warrantyMin: 7,
    warrantyMax: 7,
  },
  {
    id: "polyurea",
    category: "terrace",
    priceMin: 150,
    priceMax: 150,
    warrantyMin: 10,
    warrantyMax: 10,
  },
  {
    id: "liquid_bitumen",
    category: "basement",
    priceMin: 75,
    priceMax: 75,
    warrantyMin: 5,
    warrantyMax: 5,
  },
];

const CALCULATOR_LABELS = {
  ka: {
    fields: {
      category: "კატეგორია",
      type: "სისტემის ტიპი",
      price: "ფასი",
      total: "სრული თანხა",
      warranty: "გარანტია",
    },
    categories: {
      roof: "სახურავი",
      terrace: "ტერასა",
      basement: "სარდაფი",
    } satisfies Record<CategoryKey, string>,
    types: {
      coating_insulation: "წასასმელი იზოლაცია",
      pvc_epdm: "PVC / EPDM",
      toli: "ტოლი",
      acryl_cement: "აკრილ-ცემენტი",
      polyurethane: "პოლიურეთანი",
      polyurea: "პოლიურეა",
      liquid_bitumen: "თხევადი ბიტუმი",
    } satisfies Record<SystemKey, string>,
    yearsSuffix: "წელი",
  },
  en: {
    fields: {
      category: "Category",
      type: "System type",
      price: "Price",
      total: "Total",
      warranty: "Warranty",
    },
    categories: {
      roof: "Roof",
      terrace: "Terrace",
      basement: "Basement",
    } satisfies Record<CategoryKey, string>,
    types: {
      coating_insulation: "Coating insulation",
      pvc_epdm: "PVC / EPDM",
      toli: "Torch-on membrane",
      acryl_cement: "Acrylic-cement",
      polyurethane: "Polyurethane",
      polyurea: "Polyurea",
      liquid_bitumen: "Liquid bitumen",
    } satisfies Record<SystemKey, string>,
    yearsSuffix: "years",
  },
  ru: {
    fields: {
      category: "Категория",
      type: "Тип системы",
      price: "Цена",
      total: "Итого",
      warranty: "Гарантия",
    },
    categories: {
      roof: "Крыша",
      terrace: "Терраса",
      basement: "Подвал",
    } satisfies Record<CategoryKey, string>,
    types: {
      coating_insulation: "Обмазочная изоляция",
      pvc_epdm: "PVC / EPDM",
      toli: "Толь",
      acryl_cement: "Акрил-цемент",
      polyurethane: "Полиуретан",
      polyurea: "Полимочевина",
      liquid_bitumen: "Жидкий битум",
    } satisfies Record<SystemKey, string>,
    yearsSuffix: "лет",
  },
} as const;

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export function Calculator() {
  const t = useTranslations("calculator");
  const tNav = useTranslations("navigation");
  const locale = useLocale();

  const localeLabels =
    CALCULATOR_LABELS[(locale as keyof typeof CALCULATOR_LABELS) ?? "ka"] ?? CALCULATOR_LABELS.ka;

  const [category, setCategory] = useState<CategoryKey>("roof");
  const [system, setSystem] = useState<SystemKey>("coating_insulation");
  const [area, setArea] = useState(250);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const resultVisible = useInView(resultRef, { once: true, amount: 0.35 });

  const systemsForCategory = useMemo(
    () => CALCULATOR_ROWS.filter((row) => row.category === category),
    [category],
  );

  useEffect(() => {
    if (!systemsForCategory.some((row) => row.id === system)) {
      setSystem(systemsForCategory[0]?.id ?? "coating_insulation");
    }
  }, [system, systemsForCategory]);

  const selectedSystem = useMemo(
    () => CALCULATOR_ROWS.find((row) => row.id === system) ?? CALCULATOR_ROWS[0],
    [system],
  );

  const result = useMemo(() => {
    const base = selectedSystem;
    const factor = 1;

    const perMin = Math.round(base.priceMin * factor);
    const perMax = Math.round(base.priceMax * factor);
    const totalMin = Math.round(perMin * area);
    const totalMax = Math.round(perMax * area);
    const warrantyMin = base.warrantyMin;
    const warrantyMax = base.warrantyMax;

    return { perMin, perMax, totalMin, totalMax, warrantyMin, warrantyMax };
  }, [area, selectedSystem]);

  const animatedPerMin = useCountTransition(result.perMin, resultVisible, 800);
  const animatedPerMax = useCountTransition(result.perMax, resultVisible, 900);
  const animatedTotalMin = useCountTransition(result.totalMin, resultVisible, 900);
  const animatedTotalMax = useCountTransition(result.totalMax, resultVisible, 1000);
  const animatedWarrantyMin = useCountTransition(result.warrantyMin, resultVisible, 700);
  const animatedWarrantyMax = useCountTransition(result.warrantyMax, resultVisible, 850);

  return (
    <section id="calculator" className="relative py-[60px] md:py-[100px]">
      <div className="pointer-events-none absolute inset-0 bg-gd-surface" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] bg-dots [background-size:18px_18px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_20%,rgba(23,109,72,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">{tNav("calculator")}</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-[40px] md:leading-[1.1]">{t("title")}</h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gd-muted">{t("subtitle")}</p>
        </FadeUp>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-xl border border-white/10 bg-primary-navy/35 p-6 shadow-elevated backdrop-blur md:p-8">
            <div className="grid gap-5">
              <Field label={localeLabels.fields.category}>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {CATEGORY_KEYS.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setCategory(key)}
                      className={[
                        "rounded-lg border px-4 py-3 text-sm font-semibold text-left transition",
                        category === key
                          ? "border-primary-green/80 bg-gradient-to-b from-primary-green/22 to-primary-green/10 text-white shadow-[0_8px_24px_rgba(23,109,72,0.18)]"
                          : "border-white/15 bg-[#131832] text-white/90 hover:border-white/25 hover:bg-[#171d3a] hover:text-white",
                      ].join(" ")}
                      aria-pressed={category === key}
                    >
                      {localeLabels.categories[key]}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label={localeLabels.fields.type}>
                <div className="grid gap-2 sm:grid-cols-2">
                  {systemsForCategory.map((row) => (
                    <button
                      key={row.id}
                      type="button"
                      onClick={() => setSystem(row.id)}
                      className={[
                        "rounded-lg border px-4 py-3 text-left transition",
                        "shadow-[0_6px_18px_rgba(0,0,0,0.18)]",
                        system === row.id
                          ? "border-primary-green/80 bg-gradient-to-b from-primary-green/16 to-transparent ring-1 ring-primary-green/35 shadow-[0_0_0_1px_rgba(23,109,72,0.22),0_10px_28px_rgba(23,109,72,0.12)]"
                          : "border-white/15 bg-[#131832] hover:border-white/25 hover:bg-[#171d3a]",
                      ].join(" ")}
                      aria-pressed={system === row.id}
                    >
                      <div className={`text-[15px] leading-snug font-bold ${system === row.id ? "text-white" : "text-white/90"}`}>
                        {localeLabels.types[row.id]}
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium">
                        <span className="text-primary-green [text-shadow:0_0_12px_rgba(23,109,72,0.25)]">
                          {formatRange(row.priceMin, row.priceMax)} ₾/მ²
                        </span>
                        <span className="text-white/70">
                          {formatRange(row.warrantyMin, row.warrantyMax)} {localeLabels.yearsSuffix}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </Field>

              <Field label={t("fields.area")}>
                <div className="rounded-lg border border-white/15 bg-[#12162d] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-extrabold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
                      {formatNumber(area)} <span className="text-primary-green">მ²</span>
                    </span>
                    <span className="text-xs font-semibold text-white/65">10–2000</span>
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
            </div>
          </div>

          <div
            ref={resultRef}
            className="rounded-xl border border-primary-green/70 bg-gd-result p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35),0_0_0_1px_rgba(23,109,72,0.15)] md:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">{localeLabels.fields.price}</p>
            <p className="mt-2 font-sans text-4xl font-extrabold tracking-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.35)] md:text-[56px] md:leading-[1.02]">
              {formatRange(animatedPerMin, animatedPerMax)} ₾ / მ²
            </p>

            <div className="mt-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">{localeLabels.fields.total}</p>
              <span className="mt-2 block font-sans text-[28px] font-extrabold tracking-tight text-primary-green [text-shadow:0_2px_14px_rgba(23,109,72,0.2)] md:text-[34px] md:leading-[1.1]">
                {formatRange(animatedTotalMin, animatedTotalMax, " ₾")}
              </span>
            </div>

            <div className="mt-6 rounded-lg border border-white/12 bg-[#11162d]/90 px-4 py-3.5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/65">
                    {localeLabels.fields.warranty}
                  </p>
                  <p className="mt-1 text-xl font-extrabold tracking-tight text-white">
                    {formatRange(animatedWarrantyMin, animatedWarrantyMax)} {localeLabels.yearsSuffix}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-white/65">{localeLabels.categories[selectedSystem.category]}</p>
                  <p className="text-sm font-bold text-white">{localeLabels.types[selectedSystem.id]}</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm italic leading-relaxed text-gd-muted">{t("note")}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link
                href={`/${locale}/contact`}
                className="btn-primary inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold"
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

function formatRange(min: number, max: number, suffix = "") {
  if (min === max) return `${formatNumber(min)}${suffix}`;
  return `${formatNumber(min)} – ${formatNumber(max)}${suffix}`;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/75">{label}</p>
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
