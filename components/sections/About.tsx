"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Value = { title: string; body: string };

export function About({
  title,
  body,
  teamTitle,
  teamBody,
  valuesTitle,
  values,
}: {
  title: string;
  body: string;
  teamTitle: string;
  teamBody: string;
  valuesTitle: string;
  values: Value[];
}) {
  return (
    <section className="relative py-[60px] md:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
              ჩვენ შესახებ
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gd-muted">
              {body}
            </p>

            <div className="mt-10 grid gap-6">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-white/10 bg-gd-panel p-6 shadow-elevated md:p-8"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">
                  {teamTitle}
                </p>
                <p className="mt-4 text-base leading-relaxed text-white/85">
                  {teamBody}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="rounded-2xl border border-white/10 bg-gd-surface p-6 shadow-elevated md:p-8"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">
                  {valuesTitle}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {values.map((v, idx) => (
                    <div
                      key={v.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-white/85">
                          <ValueIcon index={idx} />
                        </span>
                        <div>
                          <p className="text-sm font-extrabold text-white">{v.title}</p>
                          <p className="mt-2 text-sm leading-relaxed text-gd-muted">
                            {v.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="relative col-span-2 h-[260px] overflow-hidden rounded-2xl border border-white/10 shadow-elevated">
              <Image
                src="/assets/about/team.jpg"
                alt="GD Supply team"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="relative h-[180px] overflow-hidden rounded-2xl border border-white/10 shadow-elevated">
              <Image
                src="/assets/about/work.jpg"
                alt="Waterproofing works"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative h-[180px] overflow-hidden rounded-2xl border border-white/10 shadow-elevated">
              <Image
                src="/assets/about/inspection.jpg"
                alt="Quality control"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ValueIcon({ index }: { index: number }) {
  const common = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (index) {
    case 0: // shield-check
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path {...common} d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4Z" />
          <path {...common} d="M9 12l2 2 4-5" />
        </svg>
      );
    case 1: // medal/badge
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path {...common} d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
          <path {...common} d="M9 14.5 7 22l5-2 5 2-2-7.5" />
        </svg>
      );
    case 2: // eye
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            {...common}
            d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
          />
          <path {...common} d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        </svg>
      );
    default: // warranty clock/arrow
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path {...common} d="M21 12a9 9 0 1 1-2.6-6.4" />
          <path {...common} d="M21 3v5h-5" />
          <path {...common} d="M12 7v5l3 2" />
        </svg>
      );
  }
}
