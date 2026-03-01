"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import TiltCard from "@/components/TiltCard";
import FadeUp from "@/components/FadeUp";

type ServiceItem = {
  key: string;
  title: string;
  body: string;
  summary?: string;
};

const SERVICE_IMAGES: Record<string, string> = {
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

export function ServicesOverview({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}) {
  const locale = useLocale();
  const t = useTranslations("servicesOverview");
  const coreItems = useMemo(() => items.filter((item) => item.key !== "materials"), [items]);
  const materialsItem = useMemo(() => items.find((item) => item.key === "materials"), [items]);

  return (
    <section id="services" className="gd-cv-auto gd-section-divider relative py-[72px] md:py-[120px]">
      <div className="gd-container">
        <div className="mb-12 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeUp>
              <p className="tt-label text-primary-green">{t("eyebrow")}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="tt-heading-lg mt-3 font-extrabold text-white">{title}</h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="tt-detail mt-4 max-w-3xl text-base text-gd-muted md:text-justify">{subtitle}</p>
            </FadeUp>
          </div>

          <Link
            href={`/${locale}/services`}
            className="btn-secondary tt-ui inline-flex w-fit items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold"
          >
            {t("cta_all")} →
          </Link>
        </div>

        <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {coreItems.map((service, index) => {
            const serviceHref = SERVICE_SLUG_MAP[service.key]
              ? `/${locale}/services/${SERVICE_SLUG_MAP[service.key]}`
              : `/${locale}/services`;

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={serviceHref}
                  className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-green/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-navy"
                  aria-label={service.title}
                >
                  <TiltCard
                    className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-gd-result transition-[border-color,box-shadow] duration-300 hover:border-primary-green/40 hover:shadow-[0_16px_44px_rgba(23,109,72,0.16)]"
                  >
                    <div className="relative h-[150px] w-full overflow-hidden bg-gd-result md:h-[170px]">
                      <div className="absolute inset-0 transition duration-500 will-change-transform [backface-visibility:hidden] [transform:translateZ(0)] group-hover:scale-[1.02]">
                        <Image
                          src={SERVICE_IMAGES[service.key] ?? "/assets/hero-poster.jpg"}
                          alt={service.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                      </div>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gd-result" />
                    </div>

                    <div className="relative -mt-px flex min-h-[150px] flex-col bg-gd-result p-5 md:p-6 before:pointer-events-none before:absolute before:-top-[2px] before:inset-x-0 before:h-[3px] before:bg-gd-result md:min-h-[170px]">
                      <h3 className="tt-heading-md text-[18px] font-extrabold text-white md:text-[20px]">
                        {service.title}
                      </h3>
                      <p className="tt-detail mt-2 line-clamp-3 text-[15px] leading-relaxed text-gd-muted">
                        {service.summary || service.body}
                      </p>
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="gd-section-divider mt-20 pt-14 md:mt-24 md:pt-16">
          <div className="mb-6 md:mb-8">
            <p className="tt-label text-primary-green">{t("materials.eyebrow")}</p>
            <h3 className="tt-heading-lg mt-2 font-extrabold text-white">
              {t("materials.title")}
            </h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={`/${locale}/products`}
              className="group block rounded-2xl border border-primary-green/35 bg-gradient-to-r from-gd-panel via-gd-result to-gd-panel p-6 transition hover:border-primary-green/60 hover:shadow-[0_18px_42px_rgba(23,109,72,0.22)] md:p-8"
              aria-label={t("materials.aria_label")}
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src={SERVICE_IMAGES.materials}
                    alt={materialsItem?.title ?? t("materials.title")}
                    fill
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                </div>

                <div className="min-w-0">
                  <p className="tt-label text-xs font-extrabold uppercase tracking-[0.08em] text-primary-green">
                    {materialsItem?.title ?? t("materials.title")}
                  </p>
                  <p className="tt-detail mt-3 text-base leading-relaxed text-gd-muted">
                    {t("materials.body")}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-white/85">
                    {(t.raw("materials.bullets") as string[]).map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>

                  <span className="tt-ui mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-primary-green/45 bg-primary-green/10 px-5 py-3 text-sm font-semibold text-primary-green transition group-hover:border-primary-green group-hover:bg-primary-green group-hover:text-white">
                    {t("materials.cta")}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
