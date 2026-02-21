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
    <section className="fade-up relative py-[60px] md:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">ჩვენ შესახებ</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gd-muted">{body}</p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
              className="mt-8 rounded-2xl border border-white/10 bg-gd-panel p-6 shadow-elevated md:p-8"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">{teamTitle}</p>
              <p className="mt-4 text-base leading-relaxed text-white/85">{teamBody}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mt-6 rounded-2xl border border-white/10 bg-gd-surface p-6 shadow-elevated md:p-8"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">{valuesTitle}</p>
              <div className="mt-5 grid gap-3">
                {values.map((v, idx) => (
                  <div key={v.title} className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-sm font-extrabold text-white">{idx + 1}. {v.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-gd-muted">{v.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="relative col-span-2 h-[280px] overflow-hidden rounded-2xl border border-white/10 shadow-elevated">
              <Image
                src="/assets/about/team.jpg"
                alt="GD Supply გუნდი"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="relative h-[180px] overflow-hidden rounded-2xl border border-white/10 shadow-elevated">
              <Image
                src="/assets/about/work.jpg"
                alt="ჰიდროიზოლაციის სამუშაო"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative h-[180px] overflow-hidden rounded-2xl border border-white/10 shadow-elevated">
              <Image
                src="/assets/about/inspection.jpg"
                alt="ინსპექცია და ხარისხის კონტროლი"
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
