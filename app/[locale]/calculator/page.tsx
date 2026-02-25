import { getTranslations } from "next-intl/server";
import { Calculator } from "@/components/sections/Calculator";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";

export default async function CalculatorPage({ params }: { params: { locale: string } }) {
  const tPortfolio = await getTranslations("portfolio");

  const filters = tPortfolio.raw("filters") as string[];
  const projects = tPortfolio.raw("projects") as Array<{
    name: string;
    work: string;
    area: string;
    material: string;
    duration: string;
    tags: string[];
  }>;

  return (
    <main className="gd-page-shell relative">
      <PageHero
        locale={params.locale}
        eyebrow="კალკულატორი"
        title="ფასის კალკულატორი"
        subtitle="სწრაფი დიაპაზონი, სერვისის ტიპი და შესაბამისი პორტფოლიოს მაგალითები."
        breadcrumbs={[
          { label: "მთავარი", href: `/${params.locale}` },
          { label: "კალკულატორი" },
        ]}
        backgroundTheme="calculator"
        compact
      />
      <Calculator showHeader={false} />
      <PortfolioGrid
        title={tPortfolio("title")}
        subtitle={tPortfolio("subtitle")}
        filters={filters}
        projects={projects}
        showHeader={false}
      />
    </main>
  );
}
