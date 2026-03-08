"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type HeroCrumb = {
  label: string;
  href?: string;
};

type HeroAction = {
  label: string;
  href: string;
};

type PageHeroBackgroundTheme = "default" | "about" | "services" | "portfolio" | "calculator" | "contact" | "blog";

type PageHeroProps = {
  locale: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  showEyebrow?: boolean;
  breadcrumbs?: HeroCrumb[];
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  backgroundImage?: string;
  backgroundTheme?: PageHeroBackgroundTheme;
  compact?: boolean;
  fullWidthTitle?: boolean;
};

export function PageHero({
  title,
  subtitle,
  eyebrow = "GD Supply",
  showEyebrow = false,
  breadcrumbs = [],
  primaryAction,
  secondaryAction,
  compact = false,
  fullWidthTitle = false,
}: PageHeroProps) {
  const shouldShowEyebrow = showEyebrow && eyebrow.trim() && eyebrow.trim() !== title.trim();
  const [breadcrumbLd, setBreadcrumbLd] = useState<string | null>(null);

  useEffect(() => {
    if (breadcrumbs.length === 0) return;
    const origin = typeof window !== "undefined" ? window.location.origin : "https://gdsupply.ge";
    const items = breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: crumb.href ? `${origin}${crumb.href}` : `${origin}${typeof window !== "undefined" ? window.location.pathname : ""}`,
    }));
    setBreadcrumbLd(
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items,
      }),
    );
  }, [breadcrumbs]);

  return (
    <section
      className={`relative -mt-[72px] overflow-hidden pt-[72px] ${compact ? "pb-5 md:pb-7" : "pb-7 md:pb-9"} ${
        compact ? "min-h-[240px] md:min-h-[320px]" : "min-h-[300px] md:min-h-[400px]"
      }`}
    >
      <div className="absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 gd-container">
        <div className="max-w-4xl">
          {breadcrumbs.length > 0 ? (
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/65">
              {breadcrumbs.map((crumb, index) => (
                <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-2">
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/90">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 ? <span className="text-white/30">/</span> : null}
                </span>
              ))}
            </div>
          ) : null}

          <div className={compact ? "gd-section-header-tight" : "gd-section-header"}>
            {shouldShowEyebrow ? (
              <span className="tt-label inline-flex items-center rounded-full border border-primary-green/70 bg-white/5 px-4 py-2 text-white/85 backdrop-blur">
                {eyebrow}
              </span>
            ) : null}

            <h1
              className={`tt-heading-xl ${
                fullWidthTitle ? "max-w-none whitespace-nowrap" : "max-w-[18ch]"
              } font-extrabold text-white`}
            >
              {title}
            </h1>

            {subtitle?.trim() ? (
              <p className="tt-detail max-w-3xl text-gd-muted md:text-lg">
                {subtitle}
              </p>
            ) : null}
          </div>

          {primaryAction || secondaryAction ? (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {primaryAction ? (
                <Link
                  href={primaryAction.href}
                  className="btn-primary tt-ui inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold"
                >
                  {primaryAction.label}
                </Link>
              ) : null}
              {secondaryAction ? (
                <Link
                  href={secondaryAction.href}
                  className="btn-secondary tt-ui inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold"
                >
                  {secondaryAction.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {breadcrumbLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbLd }} />
      ) : null}
    </section>
  );
}
