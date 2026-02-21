import { getTranslations } from "next-intl/server";
import { Calculator } from "@/components/sections/Calculator";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";

export default async function CalculatorPage() {
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
    <main className="relative">
      <Calculator />
      <PortfolioGrid
        title={tPortfolio("title")}
        subtitle={tPortfolio("subtitle")}
        filters={filters}
        projects={projects}
      />
    </main>
  );
}
