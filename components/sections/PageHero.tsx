"use client";

import Link from "next/link";

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
  breadcrumbs?: HeroCrumb[];
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  backgroundImage?: string;
  backgroundTheme?: PageHeroBackgroundTheme;
  compact?: boolean;
};

export function PageHero({
  title,
  subtitle,
  eyebrow = "GD Supply",
  breadcrumbs = [],
  primaryAction,
  secondaryAction,
  compact = false,
}: PageHeroProps) {
  const showEyebrow = eyebrow.trim() && eyebrow.trim() !== title.trim();

  return (
    <section
      className={`relative -mt-[84px] overflow-hidden pt-[84px] ${compact ? "min-h-[340px]" : "min-h-[400px] md:min-h-[440px]"}`}
    >
      <div className="absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-[56px] md:px-10 md:py-[72px]">
        <div className="max-w-4xl">
          {breadcrumbs.length > 0 ? (
            <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/65">
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

          {showEyebrow ? (
            <span className="tt-label inline-flex items-center rounded-full border border-primary-green/70 bg-white/5 px-4 py-2 text-white/85 backdrop-blur">
              {eyebrow}
            </span>
          ) : null}

          <h1 className={`tt-heading-xl ${showEyebrow ? "mt-5" : "mt-1"} font-extrabold text-white ${compact ? "max-w-[16ch] text-3xl md:text-5xl" : "max-w-[14ch] text-4xl md:text-6xl"}`}>
            {title}
          </h1>

          {subtitle?.trim() ? (
            <p className="tt-detail mt-4 max-w-3xl text-base text-gd-muted md:text-lg">
              {subtitle}
            </p>
          ) : null}

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
    </section>
  );
}
