import { getTranslations } from "next-intl/server";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";

export default async function PortfolioPage() {
  const t = await getTranslations("portfolio");

  const filters = t.raw("filters") as string[];
  const projects = t.raw("projects") as Array<{
    name: string;
    work: string;
    area: string;
    material: string;
    duration: string;
    tags: string[];
  }>;

  return (
    <main className="relative">
      <PortfolioGrid
        title={t("title")}
        subtitle={t("subtitle")}
        filters={filters}
        projects={projects}
      />
    </main>
  );
}
