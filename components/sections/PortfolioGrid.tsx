"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import FadeUp from "@/components/FadeUp";
import PortfolioCard, { PortfolioProject } from "@/components/PortfolioCard";

type Project = {
  name: string;
  work: string;
  area: string;
  material: string;
  duration: string;
  tags: string[];
  image?: string;
};

type EnrichedProject = PortfolioProject & {
  key: string;
  tags: string[];
  material: string;
  duration: string;
};

export function PortfolioGrid({
  title,
  subtitle,
  filters: _filters = [],
  projects,
  showHeader = true,
  label,
  maxItems = null,
  showFilters: _showFilters = false,
  compact = false,
  enableModal = true,
}: {
  title: string;
  subtitle: string;
  filters?: string[];
  projects: Project[];
  showHeader?: boolean;
  label?: string;
  maxItems?: number | null;
  showFilters?: boolean;
  compact?: boolean;
  enableModal?: boolean;
}) {
  const t = useTranslations("portfolio");
  const filters = _filters ?? [];
  const hasFilters = _showFilters && filters.length > 0;
  const allFilter = hasFilters ? filters[0] ?? t("filters_all") : null;
  const [filter, setFilter] = useState<string | null>(allFilter);
  const [activeProject, setActiveProject] = useState<EnrichedProject | null>(null);

  const enriched = useMemo<EnrichedProject[]>(
    () =>
      projects.map((project, idx) => ({
        key: `${idx}-${project.name}-${project.work}`,
        title: project.name,
        type: project.work,
        area: project.area || t("unknown.area"),
        category: getPrimaryCategory(project.tags, t("default_category")),
        image: project.image || "/assets/services/flat-roof.jpg",
        tags: project.tags ?? [],
        material: project.material || t("unknown.material"),
        duration: project.duration || t("unknown.duration"),
      })),
    [projects, t],
  );

  const visible = useMemo(() => {
    if (!hasFilters || !filter || filter === allFilter) return enriched;
    return enriched.filter((project) => project.tags.includes(filter));
  }, [allFilter, enriched, filter, hasFilters]);

  const limited = useMemo(
    () => (typeof maxItems === "number" ? visible.slice(0, maxItems) : visible),
    [maxItems, visible],
  );

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
    <section
      id="portfolio"
      className={`gd-cv-auto gd-section-divider relative ${compact ? "py-12 md:py-16" : "py-[72px] md:py-[120px]"}`}
    >
      <div className="gd-container">
        {showHeader ? (
          <>
            <FadeUp>
              <p className="tt-label text-primary-green">{label || title}</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="tt-heading-lg mt-3 font-extrabold text-white">{title}</h2>
            </FadeUp>
            {subtitle?.trim() ? (
              <FadeUp delay={0.2}>
                <p className="tt-detail mt-4 max-w-3xl text-base leading-relaxed text-gd-muted">{subtitle}</p>
              </FadeUp>
            ) : null}
          </>
        ) : null}

        {hasFilters ? (
          <div className={`${showHeader ? "mt-10" : "mt-3"} flex flex-wrap gap-2.5`}>
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
        ) : null}

        <div className={`${showHeader ? "mt-10" : "mt-3"} grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
          {limited.map((project, idx) => (
            <PortfolioCard
              key={project.key}
              project={project}
              index={idx}
              onSelect={enableModal ? () => setActiveProject(project) : undefined}
            />
          ))}
        </div>
      </div>

      {enableModal ? (
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
                  aria-label={t("modal.close")}
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
                    <p className="tt-label text-primary-green">{activeProject.type}</p>
                    <h3 className="tt-heading-md mt-2 font-extrabold text-white">{activeProject.title}</h3>
                  </div>
                  <div className="tt-ui rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85">
                    {activeProject.area}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </section>
  );
}

function getPrimaryCategory(tags: string[], fallback: string) {
  if (!tags || tags.length === 0) return fallback;
  const nonCommercial = tags.find((tag) => tag.toLowerCase() !== "commercial");
  return nonCommercial ?? tags[0];
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
