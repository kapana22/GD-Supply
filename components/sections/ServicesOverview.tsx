"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

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
  materials: "ევროპული ბრენდების ოფიციალური იმპორტი. სამშენებლო ქიმია და სპეციალური საფარები.",
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
    <section id="services" className="fade-up relative py-[60px] md:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">სერვისები</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">{title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gd-muted">{subtitle}</p>
          </div>

          <Link
            href={`/${locale}/services`}
            className="inline-flex w-fit items-center justify-center rounded-lg border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 shadow-elevated backdrop-blur transition hover:bg-white/10"
          >
            სრული სერვისების სია →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s, idx) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-gd-result shadow-elevated transition hover:-translate-y-1.5 hover:border-primary-green/50"
            >
              <div className="relative h-[200px] w-full">
                <Image
                  src={SERVICE_IMAGES[s.key] ?? "/assets/hero-poster.jpg"}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-extrabold text-white md:text-xl">{s.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gd-muted">
                  {SHORT_SERVICE_BODIES[s.key] ?? s.body}
                </p>
                <Link
                  href={`/${locale}/services#${s.key}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-green hover:text-white"
                >
                  გაიგე მეტი <span className="transition group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
