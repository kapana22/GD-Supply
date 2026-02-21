"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

type ServiceItem = {
  key: string;
  title: string;
  body: string;
  includes?: string[];
  variants?: string[];
};

type ProcessStep = { title: string; body: string };

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
  const { locale } = useParams() as { locale: string };

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
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative rounded-xl border border-white/10 bg-gd-panel p-6 shadow-elevated transition hover:-translate-y-1"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-primary-green opacity-0 transition group-hover:opacity-100" />
                <h2 className="text-lg font-extrabold text-white md:text-xl">
                  {s.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gd-muted">
                  {s.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-green group-hover:text-white">
                  გაიგე მეტი <span className="transition group-hover:translate-x-0.5">→</span>
                </span>
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
              className="rounded-xl border border-white/10 bg-gd-surface p-6 shadow-elevated md:p-8"
            >
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

              <p className="mt-5 text-base leading-relaxed text-white/85">
                {s.body}
              </p>

              {s.includes && s.includes.length > 0 ? (
                <div className="mt-7 rounded-xl border border-white/10 bg-white/5 p-5">
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
                <div className="mt-7 rounded-xl border border-white/10 bg-white/5 p-5">
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
                <p className="mt-3 text-sm leading-relaxed text-gd-muted">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
