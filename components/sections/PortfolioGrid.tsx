"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Project = {
  name: string;
  work: string;
  area: string;
  material: string;
  duration: string;
  tags: string[];
};

export function PortfolioGrid({
  title,
  subtitle,
  filters,
  projects,
}: {
  title: string;
  subtitle: string;
  filters: string[];
  projects: Project[];
}) {
  const [filter, setFilter] = useState(filters[0] ?? "ყველა");
  const [active, setActive] = useState<(Project & { image: string; aspect: string }) | null>(null);

  const enriched = useMemo(() => {
    return projects.map((p, idx) => ({
      ...p,
      image: pickImage(p),
      aspect: pickAspect(idx),
    }));
  }, [projects]);

  const visible = useMemo(() => {
    if (!filter || filter === "ყველა") return enriched;
    return enriched.filter((p) => p.tags?.includes(filter));
  }, [enriched, filter]);

  return (
    <section id="portfolio" className="relative py-[60px] md:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
              პორტფოლიო
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gd-muted">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] transition ${
                  filter === f
                    ? "border-primary-green bg-primary-green/15 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 columns-1 [column-gap:20px] md:columns-2 xl:columns-3">
          {visible.map((p, idx) => (
            <motion.button
              key={`${p.name}-${idx}`}
              onClick={() => setActive(p)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: idx * 0.03 }}
              className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left shadow-elevated transition hover:-translate-y-1"
            >
              <div className={`relative w-full ${p.aspect}`}>
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-green/45 via-black/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 transition group-hover:opacity-100">
                  <p className="text-sm font-extrabold text-white md:text-base">{p.name}</p>
                  <p className="mt-1 text-sm text-white/75">{p.work}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-green">
                    {p.area}
                  </p>
                </div>
              </div>

              <div className="space-y-1 px-5 py-4">
                <p className="text-base font-extrabold text-white">{p.name}</p>
                <p className="text-sm text-white/70">{p.work}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-gd-surface shadow-elevated"
            >
              <div className="relative h-[420px] w-full">
                <Image src={active.image} alt={active.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <button
                  onClick={() => setActive(null)}
                  className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur"
                >
                  დახურვა
                </button>
              </div>

              <div className="space-y-4 p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white">{active.name}</h3>
                    <p className="mt-1 text-base text-white/70">{active.work}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(active.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/75 md:grid-cols-2">
                  {active.area ? <div>ფართობი: {active.area}</div> : null}
                  {active.duration ? <div>ვადა: {active.duration}</div> : null}
                  {active.material ? <div className="md:col-span-2">მასალა: {active.material}</div> : null}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function pickAspect(idx: number) {
  const aspects = ["aspect-[4/3]", "aspect-[16/10]", "aspect-[3/4]", "aspect-[16/9]"];
  return aspects[idx % aspects.length]!;
}

function pickImage(p: Project) {
  const tag = (p.tags || [])[0] || "";
  // Unsplash placeholders. Replace with real project images later.
  if (tag.includes("ტერასა")) {
    return "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1400&q=80";
  }
  if (tag.includes("აუზი")) {
    return "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1400&q=80";
  }
  if (tag.includes("საძირკველი")) {
    return "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1400&q=80";
  }
  if (tag.includes("ინდუსტრიული")) {
    return "https://images.unsplash.com/photo-1529429617124-aee1f1650a5c?auto=format&fit=crop&w=1400&q=80";
  }
  return "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80";
}
