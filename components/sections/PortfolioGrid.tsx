"use client";

import { useMemo, useState } from "react";
import FadeUp from "@/components/FadeUp";
import PortfolioCard, { PortfolioProject } from "@/components/PortfolioCard";

type Project = {
  name: string;
  work: string;
  area: string;
  material: string;
  duration: string;
  tags: string[];
};

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1400&q=80",
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

  const enriched = useMemo<PortfolioProject[]>(
    () =>
      projects.map((project, idx) => ({
        title: project.name,
        type: project.work,
        area: project.area || "—",
        category: getPrimaryCategory(project.tags),
        image: PROJECT_IMAGES[idx % PROJECT_IMAGES.length],
      })),
    [projects],
  );

  const visible = useMemo(() => {
    if (!filter || filter === "ყველა") return enriched;
    return enriched.filter((project) => {
      const source = projects.find((p) => p.name === project.title);
      return source?.tags?.includes(filter);
    });
  }, [enriched, filter, projects]);

  return (
    <section id="portfolio" className="relative py-[60px] md:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">პორტფოლიო</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">{title}</h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gd-muted">{subtitle}</p>
        </FadeUp>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((item) => {
            const active = item === filter;
            return (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] transition ${
                  active
                    ? "border-primary-green bg-primary-green/15 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project, idx) => (
            <PortfolioCard key={`${project.title}-${idx}`} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function getPrimaryCategory(tags: string[]) {
  if (!tags || tags.length === 0) return "პროექტი";
  const nonCommercial = tags.find((tag) => tag !== "კომერციული");
  return nonCommercial ?? tags[0];
}
