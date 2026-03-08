import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PARTNER_LOGOS } from "@/components/data/partners";
import { PageHero } from "@/components/sections/PageHero";
import { locales } from "@/lib/i18n";

const baseUrl = "https://gdsupply.ge";
const buildAlternates = (locale: string) => ({
  canonical: `${baseUrl}/${locale}/partners`,
  languages: Object.fromEntries(locales.map((loc) => [loc, `${baseUrl}/${loc}/partners`] )),
});

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const tPage = await getTranslations("partnersPage");
  return {
    title: tPage("hero.title"),
    description: tPage("hero.subtitle"),
    alternates: buildAlternates(params.locale),
    openGraph: {
      title: tPage("hero.title"),
      description: tPage("hero.subtitle"),
    },
  };
}

export default async function PartnersPage({ params }: { params: { locale: string } }) {
  const tPage = await getTranslations("partnersPage");
  const tNav = await getTranslations("navigation");
  const tPartners = await getTranslations("partners");

  return (
    <main className="gd-page-shell relative">
      <PageHero
        locale={params.locale}
        eyebrow=""
        title={tPage("hero.title")}
        subtitle={tPage("hero.subtitle")}
        breadcrumbs={[
          { label: tNav("home"), href: `/${params.locale}` },
          { label: tNav("partners") },
        ]}
        backgroundTheme="portfolio"
        compact
      />

      <section className="gd-cv-auto gd-section gd-section-divider relative">
        <div className="gd-container">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {PARTNER_LOGOS.map((logo) => (
              <div
                key={logo.src}
                className="group overflow-hidden rounded-2xl border border-white/14 bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)]"
              >
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src={logo.src}
                    alt={tPartners("logo_alt", { name: logo.alt })}
                    fill
                    sizes="(min-width: 1280px) 220px, (min-width: 768px) 28vw, 45vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: tPage("hero.title"),
            description: tPage("hero.subtitle"),
            url: `${baseUrl}/${params.locale}/partners`,
          }),
        }}
      />
    </main>
  );
}
