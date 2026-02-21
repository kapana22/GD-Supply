"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";

type ServiceItem = {
  key: string;
  title: string;
  body: string;
  includes?: string[];
  variants?: string[];
};

type ProcessStep = { title: string; body: string };

const SERVICE_IMAGE_MAP: Record<string, string> = {
  flat_roof: "/assets/services/flat-roof.jpg",
  terrace: "/assets/services/terrace.jpg",
  foundation: "/assets/services/foundation.jpg",
  pool: "/assets/services/pool.jpg",
  industrial_floor: "/assets/services/industrial-floor.jpg",
  materials: "/assets/services/materials.jpg",
};

export function ServicesDetails({
  title,
  subtitle,
  items,
  processTitle,
  processSubtitle,
  steps,
}: {
  title: string;
  subtitle: string;
  items: ServiceItem[];
  processTitle: string;
  processSubtitle: string;
  steps: ProcessStep[];
}) {
  const locale = useLocale();

  return (
    <div className="relative">
      <section className="py-[60px] md:py-[100px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="mb-10 md:mb-12">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
              სერვისები
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-4xl text-base leading-relaxed text-gd-muted">
              {subtitle}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((s, idx) => (
              <motion.a
                key={s.key}
                href={`#${s.key}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-gd-panel shadow-elevated transition hover:-translate-y-1"
              >
                <div className="relative h-[180px] w-full">
                  <Image
                    src={SERVICE_IMAGE_MAP[s.key] ?? "/assets/hero-poster.jpg"}
                    alt={s.title}
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-extrabold text-white md:text-xl">{s.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gd-muted">
                    {s.body}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-green group-hover:text-white">
                    გაიგე მეტი <span className="transition group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-[60px] md:pb-[100px]">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-5 md:px-10">
          {items.map((s, idx) => (
            <motion.article
              key={s.key}
              id={s.key}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: idx * 0.03 }}
              className="rounded-2xl border border-white/10 bg-gd-surface p-6 shadow-elevated md:p-8"
            >
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div>
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
                        სერვისი
                      </p>
                      <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                        {s.title}
                      </h3>
                    </div>
                    <Link
                      href={`/${locale}/calculator`}
                      className="inline-flex w-fit items-center justify-center rounded-lg border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                    >
                      ფასის კალკულატორი →
                    </Link>
                  </div>

                  <p className="mt-5 text-base leading-relaxed text-white/85">{s.body}</p>

                  {s.includes && s.includes.length > 0 ? (
                    <div className="mt-6 border-t border-white/10 pt-5">
                      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">
                        რას მოიცავს
                      </p>
                      <ul className="mt-4 grid gap-3 text-sm text-white/85 md:grid-cols-2">
                        {s.includes.map((x) => (
                          <li key={x} className="flex gap-2">
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary-green" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {s.variants && s.variants.length > 0 ? (
                    <div className="mt-6 border-t border-white/10 pt-5">
                      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">
                        სახეობები
                      </p>
                      <ul className="mt-4 grid gap-3 text-sm text-white/85 md:grid-cols-2">
                        {s.variants.map((x) => (
                          <li key={x} className="flex gap-2">
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary-green" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                <div className="relative h-[220px] overflow-hidden rounded-xl border border-white/10 shadow-elevated md:h-[260px]">
                  <Image
                    src={SERVICE_IMAGE_MAP[s.key] ?? "/assets/services/flat-roof.jpg"}
                    alt={`${s.title} ფოტო`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <p className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
                    {s.title}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative bg-gd-surface py-[60px] md:py-[100px]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.10] bg-dots [background-size:18px_18px]" />
        <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="mb-10 md:mb-12">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
              პროცესი
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {processTitle}
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-gd-muted">
              {processSubtitle}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {steps.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="rounded-xl border border-white/10 bg-gd-panel p-6 shadow-elevated"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">
                    ეტაპი {idx + 1}
                  </p>
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-green text-xs font-extrabold text-white shadow-glow-green">
                    {idx + 1}
                  </span>
                </div>
                <p className="mt-4 text-sm font-extrabold text-white">{s.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-gd-muted">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

