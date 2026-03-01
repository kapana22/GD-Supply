"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import FadeUp from "@/components/FadeUp";

type ServiceItem = {
  key: string;
  title: string;
  body: string;
};

const SERVICE_IMAGE_MAP: Record<string, string> = {
  flat_roof: "/assets/services/flat-roof.jpg",
  terrace: "/assets/services/terrace.jpg",
  foundation: "/assets/services/foundation.jpg",
  industrial_floor: "/assets/services/industrial-floor.jpg",
  materials: "/assets/services/materials.jpg",
};

const SERVICE_SLUG_MAP: Record<string, string> = {
  flat_roof: "flat-roof",
  terrace: "terrace",
  foundation: "foundation",
  industrial_floor: "industrial-floor",
  materials: "materials",
};

export function ServicesField({ items }: { items: ServiceItem[] }) {
  const locale = useLocale();
  const t = useTranslations("servicesField");

  return (
    <section className="relative py-[36px] md:py-[52px]">
      <div className="gd-container">
        <FadeUp>
          <p className="tt-label text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">{t("eyebrow")}</p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="tt-heading-lg mt-3 text-white">{t("title")}</h2>
        </FadeUp>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.slice(0, 4).map((item) => (
            <Link
              key={item.key}
              href={
                SERVICE_SLUG_MAP[item.key]
                  ? `/${locale}/services/${SERVICE_SLUG_MAP[item.key]}`
                  : `/${locale}/services`
              }
              className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:-translate-y-0.5 hover:border-primary-green/60 hover:bg-white/10"
            >
              <div className="relative h-36 w-full">
                <Image
                  src={SERVICE_IMAGE_MAP[item.key] ?? "/assets/services/flat-roof.jpg"}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
              </div>

              <div className="p-4">
                <p className="tt-heading-md text-[17px] font-extrabold text-white sm:text-[18px] md:text-[20px]">
                  {item.title}
                </p>
                <p className="tt-small mt-1 line-clamp-2 text-white/70 sm:text-[13px]">{item.body}</p>
                <p className="tt-ui mt-3 text-sm font-semibold text-primary-green transition group-hover:text-white sm:text-[13px] md:text-sm">
                  {t("cta")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
