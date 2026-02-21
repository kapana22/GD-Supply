"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Insight = { title: string; tag: string; image: string; summary: string };

export function Insights({ items }: { items: Insight[] }) {
  return (
    <section className="rounded-3xl border border-primary-navy/8 bg-white px-6 py-10 shadow-xl shadow-primary-navy/5 md:px-10">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary-green">Insights</p>
          <h2 className="text-3xl font-semibold text-primary-navy md:text-4xl">
            Waterproofing know-how
          </h2>
          <p className="text-primary-navy/65">
            Case studies, failure modes, and details that keep structures dry.
          </p>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((item, idx) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="overflow-hidden rounded-2xl border border-primary-navy/10 bg-gradient-to-b from-white to-[#f7f9fc] shadow-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-navy/10 transition"
          >
            <div className="relative h-40 w-full">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>
            <div className="space-y-2 px-4 py-4">
              <span className="inline-flex rounded-full bg-primary-navy/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-navy/70">
                {item.tag}
              </span>
              <h3 className="text-lg font-semibold text-primary-navy">{item.title}</h3>
              <p className="text-sm text-primary-navy/70 leading-relaxed">{item.summary}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
