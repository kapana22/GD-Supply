"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  SERVICE_PROCESS_STEPS,
  SERVICE_USAGE_OPTIONS,
  type ServicePageData,
} from "@/lib/servicesCatalog";

export function ServiceDetailPage({
  locale,
  service,
  hideHero = false,
}: {
  locale: string;
  service: ServicePageData;
  hideHero?: boolean;
}) {
  const tCatalog = useTranslations("servicesCatalog");
  const tNav = useTranslations("navigation");

  const heroTitle = tCatalog(service.heroTitle);
  const subtitle = tCatalog(service.subtitle);
  const title = tCatalog(service.title);

  return (
    <main className="gd-page-shell bg-transparent text-white">
      {hideHero ? null : (
        <ServiceHero
          locale={locale}
          service={service}
          heroTitle={heroTitle}
          subtitle={subtitle}
          title={title}
          breadcrumbHome={tNav("home")}
          breadcrumbServices={tNav("services")}
        />
      )}

      <section className="gd-section-divider py-12 md:py-16">
        <div className="gd-container">
          <SectionHeading index="02" title={tCatalog("sections.usage")} />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {service.usage.map((usageKey) => {
              const usage = SERVICE_USAGE_OPTIONS[usageKey];
              return (
                <div
                  key={`${service.slug}-${usageKey}`}
                  className="rounded-2xl border border-white/10 bg-gd-panel p-5 shadow-elevated"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-gd-surface text-white/80">
                      <UsageIcon usageKey={usageKey} />
                    </span>
                    <p className="text-base font-bold text-white">{tCatalog(usage.labelKey)}</p>
                  </div>
                  <p className="tt-detail mt-3 text-sm text-gd-muted">
                    {tCatalog(usage.descriptionKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="gd-section-divider py-12 md:py-16">
        <div className="gd-container">
          <SectionHeading index="03" title={tCatalog("sections.materials")} />
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {service.materials.map((material) => (
              <div
                key={`${service.slug}-${material.name}`}
                className="rounded-2xl border border-primary-green/25 bg-gd-panel p-5 shadow-elevated"
              >
                <div className="tt-label mb-3 inline-flex rounded-full border border-primary-green/30 bg-primary-green/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-primary-green">
                  {tCatalog("labels.material")}
                </div>
                <h3 className="tt-heading-md font-extrabold text-white">
                  {tCatalog(material.name)}
                </h3>
                <p className="tt-detail mt-3 text-sm text-gd-muted">
                  {tCatalog(material.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gd-section-divider py-12 md:py-16">
        <div className="gd-container">
          <SectionHeading index="04" title={tCatalog("sections.process")} />
          <p className="tt-detail mt-3 max-w-3xl text-sm text-gd-muted md:text-base md:text-justify">
            {tCatalog("processIntro")}
          </p>

          <div className="mt-8 grid gap-4 md:hidden">
            {SERVICE_PROCESS_STEPS.map((step) => (
              <div
                key={`${service.slug}-mobile-step-${step.step}`}
                className="rounded-2xl border border-white/12 bg-gradient-to-br from-[#1f243a] via-[#1a1d33] to-[#141729] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.32)]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-primary-green/45 bg-primary-green/10 text-xs font-extrabold text-primary-green shadow-[0_6px_14px_rgba(23,109,72,0.28)]">
                    {step.step}
                  </span>
                  <p className="text-sm font-extrabold text-white">{tCatalog(step.titleKey)}</p>
                </div>
                <p className="tt-detail mt-3 text-sm text-gd-muted">
                  {tCatalog(step.bodyKey)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-5">
            {SERVICE_PROCESS_STEPS.map((step) => (
              <div
                key={`${service.slug}-desktop-step-${step.step}`}
                className="group flex h-full flex-col items-stretch gap-3"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-primary-green/45 bg-primary-green/10 text-sm font-extrabold text-primary-green shadow-[0_6px_16px_rgba(23,109,72,0.30)]">
                    {step.step}
                  </span>
                  <div className="h-px flex-1 rounded-full bg-white/12" />
                </div>
                <div className="flex flex-1 flex-col rounded-2xl border border-white/12 bg-gradient-to-br from-[#1f243a] via-[#1a1d33] to-[#141729] p-5 shadow-[0_14px_32px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:-translate-y-1">
                  <p className="text-base font-extrabold text-white">{tCatalog(step.titleKey)}</p>
                  <p className="tt-detail mt-3 text-sm leading-relaxed text-gd-muted">
                    {tCatalog(step.bodyKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gd-section-divider-y py-12 md:py-16">
        <div className="gd-container">
          <div className="rounded-2xl border border-primary-green/20 bg-gradient-to-br from-primary-green/10 via-gd-panel/60 to-transparent p-6 md:p-8 shadow-elevated">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="tt-label text-xs font-extrabold uppercase tracking-[0.08em] text-primary-green">
                  {tCatalog("cta.badge")}
                </p>
                <h2 className="tt-heading-lg mt-3 font-extrabold text-white">
                  {tCatalog("cta.title")}
                </h2>
                <p className="tt-detail mt-3 text-base text-gd-muted">
                  {tCatalog("cta.body")}
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  href={`/${locale}/contact`}
                  className="btn-primary tt-ui inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white"
                >
                  {tCatalog("cta.primary")} →
                </Link>
                <Link
                  href={`/${locale}/calculator`}
                  className="btn-secondary tt-ui inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white"
                >
                  {tCatalog("cta.secondary")} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceHero({
  locale,
  service,
  heroTitle,
  subtitle,
  title,
  breadcrumbHome,
  breadcrumbServices,
}: {
  locale: string;
  service: ServicePageData;
  heroTitle: string;
  subtitle: string;
  title: string;
  breadcrumbHome: string;
  breadcrumbServices: string;
}) {
  return (
    <section className="gd-section-divider-bottom relative overflow-hidden">
      <div className="relative h-[360px] md:h-[440px] xl:h-[520px]">
        <Image
          src={service.heroImage}
          alt={heroTitle}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/55 to-primary-navy" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(23,109,72,0.18),transparent_45%)]" />
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="gd-container pb-8 md:pb-12">
          <div className="max-w-3xl rounded-2xl border border-white/10 bg-primary-navy/35 p-5 backdrop-blur-sm md:p-7">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-white/70">
              <Link href={`/${locale}`} className="transition hover:text-white">
                {breadcrumbHome}
              </Link>
              <span className="text-white/35">→</span>
              <Link href={`/${locale}/services`} className="transition hover:text-white">
                {breadcrumbServices}
              </Link>
              <span className="text-white/35">→</span>
              <span className="text-white">{title}</span>
            </div>
            <h1 className="tt-heading-xl max-w-full font-black text-white">
              {heroTitle}
            </h1>
            <p className="tt-detail mt-4 text-base text-white/85 md:text-lg md:text-justify">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-primary-green/30 bg-primary-green/10 px-2 text-xs font-extrabold tracking-[0.08em] text-primary-green">
        {index}
      </span>
      <h2 className="tt-heading-lg font-extrabold text-white">{title}</h2>
    </div>
  );
}

function UsageIcon({
  usageKey,
}: {
  usageKey: keyof typeof SERVICE_USAGE_OPTIONS;
}) {
  switch (usageKey) {
    case "home":
      return <HomeOutlineIcon />;
    case "commercial":
      return <BuildingOutlineIcon />;
    case "industrial":
      return <FactoryOutlineIcon />;
    case "hotel":
      return <HotelOutlineIcon />;
    default:
      return null;
  }
}

function HomeOutlineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 10.5 12 3l9 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 9.5V21h14V9.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 21v-6h4v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BuildingOutlineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h8A1.5 1.5 0 0 1 15 5.5V21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 8.5h3.5A1.5 1.5 0 0 1 20 10v11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8h1M11 8h1M8 11.5h1M11 11.5h1M8 15h1M11 15h1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10 21v-3h2v3M3 21h18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FactoryOutlineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 21V9l6 3V9l6 3V5h6v16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 21h18M7 21v-4M11 21v-3M16 21v-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HotelOutlineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 21V6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5V21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 21v-5h6v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 9h1M11.5 9h1M15 9h1M8 12.5h1M11.5 12.5h1M15 12.5h1M3 21h18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
