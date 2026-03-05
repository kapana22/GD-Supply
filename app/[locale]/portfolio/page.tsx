import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { locales } from "@/lib/i18n";

const baseUrl = "https://gdsupply.ge";

const buildAlternates = (locale: string, path = "") => ({
  canonical: `${baseUrl}/${locale}${path}`,
  languages: Object.fromEntries(locales.map((loc) => [loc, `${baseUrl}/${loc}${path}`])),
});

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations("portfolio");
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates(params.locale, "/portfolio"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
    },
  };
}

export default async function PortfolioPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations("portfolio");

  const filters = t.raw("filters") as string[];
  const projects = t.raw("projects") as Array<{
    name: string;
    work: string;
    area: string;
    material: string;
    duration: string;
    tags: string[];
    image?: string;
  }>;

  return (
    <main className="gd-page-shell relative">
      <PageHero
        locale={params.locale}
        eyebrow={t("title")}
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[
          { label: t("breadcrumb_home"), href: `/${params.locale}` },
          { label: t("title") },
        ]}
        backgroundTheme="portfolio"
        compact
      />
      <PortfolioGrid
        title={t("title")}
        subtitle={t("subtitle")}
        filters={filters}
        projects={projects}
        showHeader={false}
        compact
        enableModal={false}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: t("title"),
            description: t("subtitle"),
            url: `${baseUrl}/${params.locale}/portfolio`,
            itemListElement: projects.map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: project.name,
              description: `${project.work}${project.area ? ` • ${project.area}` : ""}`,
              url: `${baseUrl}/${params.locale}/portfolio#project-${index + 1}`,
            })),
          }),
        }}
      />
    </main>
  );
}
