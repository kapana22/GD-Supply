"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Project = {
  name: string;
  work: string;
  area: string;
  material: string;
  duration: string;
  tags: string[];
};

const CATEGORY_IMAGES: Record<string, string> = {
  ყველა: "/assets/portfolio/commercial.jpg",
  "ბრტყელი სახურავი": "/assets/portfolio/flat-roof.jpg",
  ტერასა: "/assets/portfolio/terrace.jpg",
  საძირკველი: "/assets/portfolio/foundation.jpg",
  აუზი: "/assets/portfolio/pool.jpg",
  "ინდუსტრიული იატაკი": "/assets/portfolio/floor.jpg",
  კომერციული: "/assets/portfolio/commercial.jpg",
};

const PROJECT_IMAGES = [
  "/assets/portfolio/flat-roof.jpg",
  "/assets/portfolio/terrace.jpg",
  "/assets/portfolio/floor.jpg",
  "/assets/portfolio/flat-roof.jpg",
  "/assets/portfolio/pool.jpg",
  "/assets/portfolio/commercial.jpg",
  "/assets/portfolio/terrace.jpg",
  "/assets/portfolio/floor.jpg",
] as const;

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
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const enriched = useMemo(
    () =>
      projects.map((p, idx) => ({
        ...p,
        image: PROJECT_IMAGES[idx % PROJECT_IMAGES.length] ?? "/assets/portfolio/commercial.jpg",
        aspect: pickAspect(idx),
      })),
    [projects],
  );

  const visible = useMemo(() => {
    if (!filter || filter === "ყველა") return enriched;
    return enriched.filter((p) => p.tags?.includes(filter));
  }, [enriched, filter]);

  function scrollByAmount(amount: number) {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section id="portfolio" className="fade-up relative py-[60px] md:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
              პორტფოლიო
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gd-muted">{subtitle}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {filters.filter((f) => f !== "ყველა").map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`group relative overflow-hidden rounded-xl border text-left transition ${
                filter === f
                  ? "border-primary-green shadow-glow-green"
                  : "border-white/10 hover:border-primary-green/60"
              }`}
            >
              <div className="relative h-28 w-full">
                <Image
                  src={CATEGORY_IMAGES[f] ?? "/assets/portfolio/commercial.jpg"}
                  alt={f}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              </div>
              <p className="absolute bottom-2 left-3 text-xs font-extrabold text-white">{f}</p>
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter("ყველა")}
            className={`rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] transition ${
              filter === "ყველა"
                ? "border-primary-green bg-primary-green/15 text-white"
                : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            ყველა
          </button>
          <button
            onClick={() => scrollByAmount(-320)}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/80 hover:text-white"
          >
            ←
          </button>
          <button
            onClick={() => scrollByAmount(320)}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/80 hover:text-white"
          >
            →
          </button>
        </div>

        <div
          ref={scrollRef}
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visible.map((p, idx) => (
            <motion.button
              key={`${p.name}-${idx}`}
              onClick={() => setActive(p)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: idx * 0.03 }}
              className="group snap-start w-[88vw] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left shadow-elevated transition hover:-translate-y-1 sm:w-[65vw] md:w-[46vw] xl:w-[31%]"
            >
              <div className={`relative w-full ${p.aspect}`}>
                <Image src={p.image} alt={p.name} fill className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-green/45 via-black/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 transition group-hover:opacity-100">
                  <p className="text-sm font-extrabold text-white md:text-base">{p.name}</p>
                  <p className="mt-1 text-sm text-white/75">{p.work}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-green">{p.area}</p>
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
                      <span key={tag} className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
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
