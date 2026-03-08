"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Stat = { value: string; label: string };

export function Stats({ title, items }: { title: string; items: Stat[] }) {
  const t = useTranslations("stats");

  return (
    <section className="relative gd-section gd-section-divider">
      <div className="gd-container">
        <div className="gd-heading-stack mb-10 md:mb-12">
          <p className="tt-label text-primary-green">{t("eyebrow")}</p>
          <h2 className="tt-heading-lg text-white">{title}</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-5">
          {items.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="gd-card gd-card-padding shadow-elevated"
            >
              <p className="font-sans text-3xl font-extrabold text-primary-green md:text-4xl">{s.value}</p>
              <p className="mt-2 text-sm font-semibold text-gd-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
