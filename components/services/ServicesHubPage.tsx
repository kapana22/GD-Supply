"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ServicePageData } from "@/lib/servicesCatalog";

export function ServicesHubPage({
  locale,
  services,
  showHeader = true,
}: {
  locale: string;
  services: ServicePageData[];
  showHeader?: boolean;
}) {
  const tHub = useTranslations("servicesHub");
  const tCatalog = useTranslations("servicesCatalog");

  const gridClass = "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4";
  const imageAspectClass = "aspect-[16/10]";
  const imageSizes = "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw";

  return (
    <section className="gd-cv-auto bg-transparent py-[56px] text-white md:py-[88px]">
      <div className="gd-container">
        {showHeader ? (
          <div className="mb-10 md:mb-14">
            <p className="tt-label text-xs font-extrabold uppercase tracking-[0.08em] text-primary-green">
              {tHub("badge")}
            </p>
            <h1 className="tt-heading-xl mt-3 max-w-[12ch] font-black">
              {tHub("title")}
            </h1>
            <p className="tt-detail mt-4 max-w-3xl text-base text-gd-muted md:text-lg md:text-justify">
              {tHub("subtitle")}
            </p>
          </div>
        ) : null}

        <div className={gridClass}>
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <Link
                href={`/${locale}/services/${service.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-white/10 bg-gd-panel shadow-elevated transition duration-300 hover:border-primary-green/70"
              >
                <div className={`relative ${imageAspectClass} overflow-hidden`}>
                  <Image
                    src={service.cardImage}
                    alt={tCatalog(service.cardTitle)}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.05]"
                    sizes={imageSizes}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/90 via-primary-navy/20 to-transparent" />
                </div>

                <div className="flex h-full flex-col p-5 md:p-6">
                  <h2 className="tt-heading-md text-[18px] font-extrabold text-white md:text-[20px]">
                    {tCatalog(service.cardTitle)}
                  </h2>
                  <p className="tt-detail mt-3 line-clamp-3 text-[15px] leading-relaxed text-gd-muted">
                    {tCatalog(service.cardSummary)}
                  </p>

                  <span className="btn-secondary tt-ui mt-auto inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold">
                    {tHub("cta")}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



