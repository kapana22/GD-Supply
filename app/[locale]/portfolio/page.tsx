import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";

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
    </main>
  );
}
