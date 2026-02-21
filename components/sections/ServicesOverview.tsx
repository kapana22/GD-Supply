"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

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

export function ServicesOverview({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}) {
  const { locale } = useParams() as { locale: string };

  return (
    <section id="services" className="relative py-[60px] md:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
              სერვისები
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gd-muted">
              {subtitle}
            </p>
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
                <div className="mb-4 h-10 w-10 text-white/85">
                  <ServiceIcon name={s.key} />
                </div>
                <h3 className="text-lg font-extrabold text-white md:text-xl">{s.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gd-muted">
                  {s.body}
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

function ServiceIcon({ name }: { name: string }) {
  // Premium line-art icons (SVG) for each service key.
  switch (name) {
    case "flat_roof":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 12.5L12 6l8 6.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 10.5V18h10v-7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 20h12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "terrace":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 9h14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M6 9l2 11h8l2-11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 14h6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "foundation":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 7h12v5H6V7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M8 12v7h8v-7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M5 20h14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "pool":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 9h12v9H6V9Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 12c1.2.8 2.4.8 3.6 0s2.4-.8 3.6 0 2.4.8 3.6 0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "industrial_floor":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 17l8-4 8 4-8 4-8-4Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M4 12l8-4 8 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 8v13"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.65"
          />
        </svg>
      );
    case "materials":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 7h10v10H7V7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 10h6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M9 14h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M18.5 9.5l2.5 2.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 7h10v10H7V7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 9h6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}
