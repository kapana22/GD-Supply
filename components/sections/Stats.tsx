"use client";

import { motion } from "framer-motion";

type Stat = { value: string; label: string };

export function Stats({ title, items }: { title: string; items: Stat[] }) {
  return (
    <section className="relative py-[60px] md:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-10 md:mb-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
            სტატისტიკა
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {title}
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-5">
          {items.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="rounded-xl border border-white/10 bg-gd-panel p-6 shadow-elevated"
            >
              <p className="font-sans text-3xl font-extrabold text-primary-green md:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-gd-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

