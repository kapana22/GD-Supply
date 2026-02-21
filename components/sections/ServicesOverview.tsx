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
  flat_roof: "/assets/services/flat-roof.jpg",
  terrace: "/assets/services/terrace.jpg",
  foundation: "/assets/services/foundation.jpg",
  pool: "/assets/services/pool.jpg",
  industrial_floor: "/assets/services/industrial-floor.jpg",
  materials: "/assets/services/materials.jpg",
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
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">სერვისები</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">{title}</h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-gd-muted">{subtitle}</p>
            </FadeUp>
          </div>

          <Link
            href={`/${locale}/services`}
            className="inline-flex w-fit items-center justify-center rounded-lg border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 shadow-elevated backdrop-blur transition hover:bg-white/10"
          >
            სრული სერვისების სია →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard
                className="group h-full overflow-hidden rounded-2xl"
                style={{
                  background: "#1E2140",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="relative h-[200px] w-full">
                  <Image
                    src={SERVICE_IMAGES[service.key] ?? "/assets/hero-poster.jpg"}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-extrabold text-white md:text-xl">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gd-muted">
                    {SHORT_SERVICE_BODIES[service.key] ?? service.body}
                  </p>
                  <Link
                    href={`/${locale}/services#${service.key}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-green transition hover:text-white"
                  >
                    გაიგე მეტი <span className="transition group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
