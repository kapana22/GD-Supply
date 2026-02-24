import Image from "next/image";
import Link from "next/link";
import {
  SERVICE_PROCESS_STEPS,
  SERVICE_USAGE_OPTIONS,
  type ServicePageData,
} from "@/lib/servicesCatalog";

export function ServiceDetailPage({
  locale,
  service,
}: {
  locale: string;
  service: ServicePageData;
}) {
  return (
    <main className="bg-primary-navy text-white">
      <ServiceHero locale={locale} service={service} />

      <section className="border-t border-white/10 py-12 md:py-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <SectionHeading index="02" title="სად გამოიყენება" />
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
                    <p className="text-base font-bold text-white">{usage.label}</p>
                  </div>
                  <p className="tt-detail mt-3 text-sm text-gd-muted">
                    {usage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-12 md:py-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <SectionHeading index="03" title="გამოყენებული მასალები" />
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {service.materials.map((material) => (
              <div
                key={`${service.slug}-${material.name}`}
                className="rounded-2xl border border-primary-green/25 bg-gd-panel p-5 shadow-elevated"
              >
                <div className="tt-label mb-3 inline-flex rounded-full border border-primary-green/30 bg-primary-green/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-primary-green">
                  მასალა
                </div>
                <h3 className="tt-heading-md text-lg font-extrabold text-white">
                  {material.name}
                </h3>
                <p className="tt-detail mt-3 text-sm text-gd-muted">
                  {material.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-12 md:py-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <SectionHeading index="04" title="სამუშაოს ეტაპები" />
          <p className="tt-detail mt-3 max-w-3xl text-sm text-gd-muted md:text-base md:text-justify">
            პროექტის ყველა ეტაპი წინასწარ არის შეთანხმებული — შეფასებიდან საბოლოო ჩაბარებამდე.
          </p>

          <div className="mt-8 md:hidden">
            <div className="relative pl-6">
              <div className="absolute bottom-0 left-[15px] top-0 w-px bg-white/10" />
              <div className="grid gap-4">
                {SERVICE_PROCESS_STEPS.map((step) => (
                  <div
                    key={`${service.slug}-mobile-step-${step.step}`}
                    className="relative rounded-xl border border-white/10 bg-gd-panel p-4"
                  >
                    <span className="absolute -left-[14px] top-5 grid h-7 w-7 place-items-center rounded-full border border-primary-green/40 bg-primary-navy text-xs font-extrabold text-primary-green">
                      {step.step}
                    </span>
                    <p className="text-sm font-extrabold text-white">{step.title}</p>
                    <p className="tt-detail mt-2 text-sm text-gd-muted">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-8 hidden md:block">
            <div className="absolute left-0 right-0 top-5 h-px bg-white/10" />
            <div className="grid grid-cols-5 gap-4">
              {SERVICE_PROCESS_STEPS.map((step) => (
                <div key={`${service.slug}-desktop-step-${step.step}`} className="relative pt-10">
                  <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-primary-green/40 bg-primary-navy text-sm font-extrabold text-primary-green">
                    {step.step}
                  </span>
                  <div className="rounded-xl border border-white/10 bg-gd-panel p-4">
                    <p className="text-sm font-extrabold text-white">{step.title}</p>
                    <p className="tt-detail mt-2 text-sm text-gd-muted">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-12 md:py-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <SectionHeading index="05" title="ფოტოგალერეა" />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {service.gallery.map((image, idx) => (
              <div
                key={`${service.slug}-gallery-${idx}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gd-panel"
              >
                <Image
                  src={image}
                  alt={`${service.title} ფოტო ${idx + 1}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.06]"
                  sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 py-12 md:py-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="rounded-2xl border border-primary-green/20 bg-gradient-to-br from-primary-green/10 via-gd-panel/60 to-transparent p-6 md:p-8 shadow-elevated">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="tt-label text-xs font-extrabold uppercase tracking-[0.08em] text-primary-green">
                  კონსულტაცია
                </p>
                <h2 className="tt-heading-lg mt-3 text-2xl font-extrabold text-white md:text-3xl">
                  უფასო კონსულტაცია გამოითხოვე
                </h2>
                <p className="tt-detail mt-3 text-base text-gd-muted">
                  სპეციალისტი 2 საათში დაგიკავშირდება
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  href={`/${locale}/contact`}
                  className="btn-primary tt-ui inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white"
                >
                  კონსულტაცია →
                </Link>
                <Link
                  href={`/${locale}/calculator`}
                  className="btn-secondary tt-ui inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white"
                >
                  ფასის კალკულატორი →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceHero({ locale, service }: { locale: string; service: ServicePageData }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="relative h-[360px] md:h-[440px] xl:h-[520px]">
        <Image
          src={service.heroImage}
          alt={service.heroTitle}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/55 to-primary-navy" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(23,109,72,0.18),transparent_45%)]" />
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-[1440px] px-5 pb-8 md:px-10 md:pb-12">
          <div className="max-w-3xl rounded-2xl border border-white/10 bg-primary-navy/35 p-5 backdrop-blur-sm md:p-7">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-white/70">
              <Link href={`/${locale}/services`} className="transition hover:text-white">
                სერვისები
              </Link>
              <span className="text-white/35">→</span>
              <span className="text-white">{service.title}</span>
            </div>
            <h1 className="tt-heading-xl max-w-[16ch] text-3xl font-black text-white md:text-5xl">
              {service.heroTitle}
            </h1>
            <p className="tt-detail mt-4 text-base text-white/85 md:text-lg md:text-justify">
              {service.subtitle}
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
      <h2 className="tt-heading-lg text-2xl font-extrabold text-white md:text-3xl">
        {title}
      </h2>
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
