"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

type GalleryItem = {
  title: string;
  tag: string;
  image: string;
};

const items: GalleryItem[] = [
  {
    title: "Podium slab waterproofing",
    tag: "roof",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Tunnel injection sealing",
    tag: "injection",
    image: "https://images.unsplash.com/photo-1529429617124-aee1f1650a5c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Reservoir lining",
    tag: "tank",
    image: "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Green roof assembly",
    tag: "roof",
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Basement negative-side sealing",
    tag: "injection",
    image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Parking deck expansion joint",
    tag: "roof",
    image: "https://images.unsplash.com/photo-1531846802986-4942a5c3dd08?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Water feature waterproofing",
    tag: "tank",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Elevator pit injection",
    tag: "injection",
    image: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?auto=format&fit=crop&w=1200&q=80",
  },
];

export function Gallery() {
  const t = useTranslations("gallery");
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.tag === filter)),
    [filter],
  );

  return (
    <section className="rounded-3xl border border-primary-navy/8 bg-white px-6 py-10 shadow-xl shadow-primary-navy/5 md:px-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary-green">Portfolio</p>
          <h2 className="text-3xl font-semibold text-primary-navy md:text-4xl">
            Recent waterproofing work
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: t("filter_all") },
            { key: "roof", label: t("filter_roof") },
            { key: "injection", label: t("filter_injection") },
            { key: "tank", label: t("filter_tank") },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                filter === f.key
                  ? "border-primary-navy bg-primary-navy text-white"
                  : "border-primary-navy/15 bg-white text-primary-navy hover:border-primary-navy/30"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {visible.map((item, idx) => (
          <motion.button
            key={item.title}
            onClick={() => setActive(item)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="group overflow-hidden rounded-2xl border border-primary-navy/10 bg-primary-navy/5 text-left shadow hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-navy/15"
          >
            <div className="relative h-56 w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-base font-semibold text-primary-navy">{item.title}</p>
              <span className="text-xs uppercase tracking-[0.15em] text-primary-navy/60">
                {item.tag}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[420px] w-full">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-lg font-semibold text-primary-navy">{active.title}</p>
                  <p className="text-sm text-primary-navy/70 uppercase tracking-[0.18em]">
                    {active.tag}
                  </p>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="rounded-full border border-primary-navy/20 px-3 py-1 text-sm font-semibold text-primary-navy"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
