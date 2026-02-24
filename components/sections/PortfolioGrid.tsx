"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
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

type EnrichedProject = PortfolioProject & {
  key: string;
  tags: string[];
  material: string;
  duration: string;
};

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
  const [activeProject, setActiveProject] = useState<EnrichedProject | null>(null);

  const enriched = useMemo<EnrichedProject[]>(
    () =>
      projects.map((project, idx) => ({
        key: `${idx}-${project.name}-${project.work}`,
        title: project.name,
        type: project.work,
        area: project.area || "—",
        category: getPrimaryCategory(project.tags),
        image: PROJECT_IMAGES[idx % PROJECT_IMAGES.length],
        tags: project.tags ?? [],
        material: project.material || "—",
        duration: project.duration || "—",
      })),
    [projects],
  );

  const visible = useMemo(() => {
    if (!filter || filter === "ყველა") return enriched;
    return enriched.filter((project) => project.tags.includes(filter));
  }, [enriched, filter]);

  useEffect(() => {
    if (!activeProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProject]);

  return (
    <section id="portfolio" className="relative py-[60px] md:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="tt-label text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
            პორტფოლიო
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="tt-heading-lg mt-3 text-3xl font-extrabold text-white md:text-4xl">{title}</h2>
        </FadeUp>
        {subtitle?.trim() ? (
          <FadeUp delay={0.2}>
            <p className="tt-detail mt-4 max-w-3xl text-base leading-relaxed text-gd-muted">{subtitle}</p>
          </FadeUp>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((item) => {
            const active = item === filter;
            return (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`tt-ui rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] transition ${
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
            <PortfolioCard
              key={project.key}
              project={project}
              index={idx}
              onSelect={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-[#06080f]/85 p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#12162a] shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="tt-ui absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
                aria-label="დახურვა"
              >
                <CloseIcon />
              </button>

              <div className="relative aspect-[16/10] w-full md:aspect-[16/9]">
                <Image
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  sizes="(min-width: 1280px) 1200px, 95vw"
                  className="object-cover"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1124]/90 via-[#0f1124]/30 to-transparent" />
              </div>

              <div className="grid gap-4 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:p-6">
                <div>
                  <p className="tt-label text-xs font-semibold uppercase tracking-[0.08em] text-primary-green">
                    {activeProject.type}
                  </p>
                  <h3 className="tt-heading-md mt-2 text-xl font-extrabold text-white md:text-2xl">
                    {activeProject.title}
                  </h3>
                </div>
                <div className="tt-ui rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85">
                  {activeProject.area}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function getPrimaryCategory(tags: string[]) {
  if (!tags || tags.length === 0) return "პროექტი";
  const nonCommercial = tags.find((tag) => tag !== "კომერციული");
  return nonCommercial ?? tags[0];
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
