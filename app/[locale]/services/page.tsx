import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ServicesHubPage } from "@/components/services/ServicesHubPage";
import { PageHero } from "@/components/sections/PageHero";
import { SERVICES_CATALOG } from "@/lib/servicesCatalog";

export default async function ServicesPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations("servicesPage");
  const tNav = await getTranslations("navigation");

  const coreServices = SERVICES_CATALOG.filter((service) => service.slug !== "materials");

  return (
    <main className="gd-page-shell relative">
      <PageHero
        locale={params.locale}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        breadcrumbs={[
          { label: tNav("home"), href: `/${params.locale}` },
          { label: tNav("services") },
        ]}
        backgroundTheme="services"
        compact
      />

      <ServicesHubPage locale={params.locale} services={coreServices} showHeader={false} />

      <section className="gd-cv-auto gd-section-divider relative pb-[56px] pt-[32px] text-white md:pb-[88px] md:pt-[40px]">
        <div className="gd-container">
          <div className="mb-6 md:mb-8">
            <p className="tt-label text-xs font-extrabold uppercase tracking-[0.08em] text-primary-green">
              {t("materials.badge")}
            </p>
            <h2 className="tt-heading-lg mt-2 font-extrabold text-white">
              {t("materials.title")}
            </h2>
          </div>

          <Link
            href={`/${params.locale}/products`}
            className="group block rounded-2xl border border-primary-green/35 bg-gradient-to-r from-gd-panel via-gd-result to-gd-panel p-6 transition hover:border-primary-green/60 hover:shadow-[0_18px_42px_rgba(23,109,72,0.22)] md:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/assets/services/materials.jpg"
                  alt={t("materials.image_alt")}
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              </div>

              <div className="min-w-0">
                <p className="tt-label text-xs font-extrabold uppercase tracking-[0.08em] text-primary-green">
                  {t("materials.badge")}
                </p>
                <p className="tt-detail mt-3 text-base leading-relaxed text-gd-muted">
                  {t("materials.body")}
                </p>

                <span className="tt-ui mt-6 inline-flex items-center gap-2 rounded-lg border border-primary-green/45 bg-primary-green/10 px-5 py-3 text-sm font-semibold text-primary-green transition group-hover:border-primary-green group-hover:bg-primary-green group-hover:text-white">
                  {t("materials.cta")}
                  <span className="transition group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
