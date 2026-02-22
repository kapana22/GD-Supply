"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import TiltCard from "@/components/TiltCard";
import FadeUp from "@/components/FadeUp";

type ServiceItem = {
  key: string;
  title: string;
  body: string;
};

const SERVICE_IMAGES: Record<string, string> = {
  flat_roof:
    "https://static.wixstatic.com/media/d7b296_bffa29332f054919b86edfeddc8c990a~mv2.jpg",
  terrace:
    "https://static.wixstatic.com/media/d7b296_6b8a962c24a34cb784b6b8ed0c422a9e~mv2.jpg",
  foundation:
    "https://static.wixstatic.com/media/d7b296_9d374e9e02774693981e6baa862508e2~mv2.jpg",
  pool:
    "https://static.wixstatic.com/media/d7b296_702406dd4a404d80b5a23fc94dffb385~mv2.jpg",
  industrial_floor:
    "https://static.wixstatic.com/media/d7b296_3ae08ec07f15496aa33aff2970bdd18f~mv2.jpg",
  materials:
    "https://static.wixstatic.com/media/d7b296_780357b87f4c4a3fbb3fd09f9be9d3c8~mv2.jpg",
};

const SERVICE_SLUG_MAP: Record<string, string> = {
  flat_roof: "flat-roof",
  terrace: "terrace",
  foundation: "foundation",
  pool: "pool",
  industrial_floor: "industrial-floor",
  materials: "materials",
};

const SHORT_SERVICE_BODIES: Record<string, string> = {
  flat_roof: "ბიტუმური მემბრანა, TPO და PVC სისტემები. 15–20 წლიანი დაცვა ნებისმიერ სეზონში.",
  terrace: "ელასტიური სისტემები ფილის ან ხის საფარის ქვეშ. სეზონური ტემპერატურის მდგრადი.",
  foundation: "ნეგატიური და პოზიტიური ჰიდროიზოლაცია. მიწისქვეშა ტენის სრული ბლოკირება.",
  pool: "ეპოქსიდური, ცემენტური და PVC სისტემები. საცხოვრებელი და კომერციული ობიექტები.",
  industrial_floor: "ეპოქსიდური და პოლიურეთანის საფარი. ქიმიური და მექანიკური დატვირთვის მდგრადი.",
  materials: "ევროპული ბრენდების ოფიციალური იმპორტი. სამშენებლო ქიმია და სპეც. საფარები.",
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

  return (
    <section id="services" className="relative py-[60px] md:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeUp>
              <p className="tt-label text-xs font-extrabold uppercase tracking-[0.08em] text-primary-green">სერვისები</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="tt-heading-lg mt-3 text-3xl font-extrabold text-white md:text-4xl">{title}</h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="tt-detail mt-4 max-w-3xl text-base text-gd-muted md:text-justify">{subtitle}</p>
            </FadeUp>
          </div>

          <Link
            href={`/${locale}/services`}
            className="tt-ui inline-flex w-fit items-center justify-center rounded-lg border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 shadow-elevated backdrop-blur transition hover:bg-white/10"
          >
            სრული სერვისების სია →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => {
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
                  aria-label={`${service.title} - გაიგე მეტი`}
                >
                  <TiltCard
                    className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-gd-result transition-[border-color,box-shadow] duration-300 hover:border-primary-green/40 hover:shadow-[0_16px_44px_rgba(23,109,72,0.16)]"
                  >
                    <div className="relative h-[200px] w-full">
                      <Image
                        src={SERVICE_IMAGES[service.key] ?? "/assets/hero-poster.jpg"}
                        alt={service.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                    </div>

                    <div className="flex min-h-[188px] flex-col p-6">
                      <h3 className="tt-heading-md text-lg font-extrabold text-white md:text-xl">
                        {service.title}
                      </h3>
                      <p className="tt-detail mt-2 text-sm text-gd-muted">
                        {SHORT_SERVICE_BODIES[service.key] ?? service.body}
                      </p>

                      <div className="mt-auto pt-5">
                        <span className="tt-ui inline-flex items-center gap-2 rounded-lg border border-primary-green/45 bg-primary-green/10 px-4 py-2 text-sm font-semibold text-primary-green shadow-[0_8px_24px_rgba(23,109,72,0.15)] transition group-hover:border-primary-green group-hover:bg-primary-green group-hover:text-white">
                          გაიგე მეტი
                          <span className="transition group-hover:translate-x-0.5">→</span>
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
