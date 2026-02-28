"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
  const isCompactGrid = services.length <= 4;
  const gridClass = isCompactGrid
    ? "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 xl:gap-7"
    : "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3";
  const imageAspectClass = isCompactGrid ? "aspect-[16/10]" : "aspect-[16/9]";
  const imageSizes = isCompactGrid
    ? "(min-width: 1280px) 560px, (min-width: 768px) 50vw, 100vw"
    : "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw";

  return (
    <section className="gd-cv-auto bg-transparent py-[56px] text-white md:py-[88px]">
      <div className="gd-container">
        {showHeader ? (
          <div className="mb-10 md:mb-14">
            <p className="tt-label text-xs font-extrabold uppercase tracking-[0.08em] text-primary-green">
              სერვისები
            </p>
            <h1 className="tt-heading-xl mt-3 max-w-[12ch] font-black">
              რას ვაკეთებთ
            </h1>
            <p className="tt-detail mt-4 max-w-3xl text-base text-gd-muted md:text-lg md:text-justify">
              GD Supply — 2014 წლიდან, 300+ პროექტი, 10+ წლიანი გარანტია
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
                    alt={service.cardTitle}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.05]"
                    sizes={imageSizes}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/90 via-primary-navy/20 to-transparent" />
                </div>

                <div className="p-5 md:p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-primary-green/30 bg-primary-green/10 px-2 text-xs font-extrabold tracking-[0.08em] text-primary-green">
                      {String(service.order).padStart(2, "0")}
                    </span>
                    <span className="tt-label text-xs font-semibold uppercase tracking-[0.06em] text-white/45">
                      სერვისი
                    </span>
                  </div>

                  <h2 className="tt-heading-md font-extrabold text-white">
                    {service.cardTitle}
                  </h2>
                  <p className="tt-detail mt-3 line-clamp-2 text-sm text-gd-muted">
                    {service.cardSummary}
                  </p>

                  <span className="tt-ui mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-green transition group-hover:gap-3">
                    დეტალურად →
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



