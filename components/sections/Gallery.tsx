"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

type GalleryItem = {
  title: string;
  tag: string;
  image: string;
};

export function Gallery() {
  const tPortfolio = useTranslations("portfolio");

  const projects =
    (tPortfolio.raw("projects") as Array<{
      name: string;
      image: string;
      tags?: string[];
    }>) ?? [];

  const items: GalleryItem[] = projects.map((p) => ({
    title: p.name,
    tag: p.tags?.[0] ?? tPortfolio("default_category"),
    image: p.image,
  }));

  const filterOptions = useMemo(() => {
    const tags = Array.from(new Set(items.flatMap((i) => (i.tag ? [i.tag] : []))));
    return ["all", ...tags];
  }, [items]);

  const [filter, setFilter] = useState<string>("all");

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.tag === filter)),
    [filter, items],
  );

  return (
    <section className="rounded-3xl border border-primary-navy/8 bg-white px-6 py-10 shadow-xl shadow-primary-navy/5 md:px-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="tt-label text-xs uppercase tracking-[0.2em] text-primary-green">
            {tPortfolio("title")}
          </p>
          <h2 className="tt-heading-lg text-primary-navy">{tPortfolio("subtitle")}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`tt-ui rounded-full border px-4 py-2 text-sm font-semibold transition ${
                filter === key
                  ? "border-primary-navy bg-primary-navy text-white"
                  : "border-primary-navy/15 bg-white text-primary-navy hover:border-primary-navy/30"
              }`}
            >
              {key === "all" ? tPortfolio("filters_all") : key}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {visible.map((item, idx) => (
          <motion.div
            key={`${item.title}-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="overflow-hidden rounded-2xl border border-primary-navy/10 bg-primary-navy/5 text-left shadow"
          >
            <div className="relative h-56 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 45vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <p className="tt-heading-md text-primary-navy">{item.title}</p>
              <span className="tt-label text-xs uppercase tracking-[0.15em] text-primary-navy/60">
                {item.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
