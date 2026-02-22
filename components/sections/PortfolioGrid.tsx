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

type EnrichedProject = PortfolioProject & { tags: string[] };

const PROJECT_IMAGES = [
  "https://static.wixstatic.com/media/d7b296_9d374e9e02774693981e6baa862508e2~mv2.jpg",
  "https://static.wixstatic.com/media/d7b296_6e9ece30eebe4e72854dc414fa71b1d7~mv2.jpg",
  "https://static.wixstatic.com/media/d7b296_702406dd4a404d80b5a23fc94dffb385~mv2.jpg",
  "https://static.wixstatic.com/media/d7b296_d98ff4d2fe044b66b7864bb2af75a9fd~mv2.jpg",
  "https://static.wixstatic.com/media/d7b296_a79d086fe005479e940ff5bbfbad984c~mv2.jpg",
  "https://static.wixstatic.com/media/d7b296_af418acb60e94ce6825a0a9764f9bbc6~mv2.jpg",
  "https://static.wixstatic.com/media/d7b296_7271b151b30e4c6db5ec5b8d03dd4478~mv2.jpg",
  "https://static.wixstatic.com/media/d7b296_011d0f6ecd0e4600b4ef423ff7e479ac~mv2.webp",
  "https://static.wixstatic.com/media/d7b296_30ec8e14b0484984b8a4ebe8c7604f1d~mv2.jpg",
  "https://static.wixstatic.com/media/d7b296_d6ccb14d9d474e72bef71b1ca5495ca8~mv2.jpg",
  "https://static.wixstatic.com/media/d7b296_769e2857aa374c5a817a43f8744d8be1~mv2.jpg",
  "https://static.wixstatic.com/media/d7b296_42b9b6ce57dd472bb6f7c28087fb5291~mv2.jpg",
  "https://static.wixstatic.com/media/d7b296_516b68d958234423810c91f489d54895~mv2.jpg",
  "https://static.wixstatic.com/media/d7b296_1eac59bc825f453fa619d31547a4b6e6~mv2.jpg",
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

  const enriched = useMemo<EnrichedProject[]>(
    () =>
      projects.map((project, idx) => ({
        title: project.name,
        type: project.work,
        area: project.area || "—",
        category: getPrimaryCategory(project.tags),
        image: PROJECT_IMAGES[idx % PROJECT_IMAGES.length],
        tags: project.tags ?? [],
      })),
    [projects],
  );

  const visible = useMemo(() => {
    if (!filter || filter === "ყველა") return enriched;
    return enriched.filter((project) => project.tags.includes(filter));
  }, [enriched, filter]);

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
