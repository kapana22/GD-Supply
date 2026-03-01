import { getTranslations } from "next-intl/server";
import { Calculator } from "@/components/sections/Calculator";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";

export default async function CalculatorPage({ params }: { params: { locale: string } }) {
  const tPortfolio = await getTranslations("portfolio");
  const tPage = await getTranslations("calculatorPage");

  const filters = tPortfolio.raw("filters") as string[];
  const projects = tPortfolio.raw("projects") as Array<{
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
        eyebrow={tPage("eyebrow")}
        title={tPage("title")}
        subtitle={tPage("subtitle")}
        breadcrumbs={[
          { label: tPage("breadcrumbs.home"), href: `/${params.locale}` },
          { label: tPage("breadcrumbs.current") },
        ]}
        backgroundTheme="calculator"
        compact
        fullWidthTitle
      />
      <Calculator showHeader={false} compact />
      <PortfolioGrid
        title={tPortfolio("title")}
        subtitle={tPortfolio("subtitle")}
        filters={filters}
        projects={projects}
        showHeader={false}
        compact
      />
    </main>
  );
}
