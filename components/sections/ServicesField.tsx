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
    <section className="relative gd-section-tight gd-section-divider">
      <div className="gd-container">
        <div className="gd-heading-stack-tight">
          <FadeUp>
            <p className="tt-label text-primary-green">{t("eyebrow")}</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="tt-heading-lg text-white">{t("title")}</h2>
          </FadeUp>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.slice(0, 4).map((item) => (
            <Link
              key={item.key}
              href={
                SERVICE_SLUG_MAP[item.key]
                  ? `/${locale}/services/${SERVICE_SLUG_MAP[item.key]}`
                  : `/${locale}/services`
              }
              className="gd-card group overflow-hidden transition hover:-translate-y-0.5 hover:border-primary-green/60 hover:shadow-[0_12px_36px_rgba(23,109,72,0.18)]"
            >
              <div className="gd-img-frame relative h-36 w-full">
                <Image
                  src={SERVICE_IMAGE_MAP[item.key] ?? "/assets/services/flat-roof.jpg"}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
              </div>

              <div className="gd-card-padding pt-4">
                <p className="tt-heading-md font-extrabold text-white">{item.title}</p>
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
