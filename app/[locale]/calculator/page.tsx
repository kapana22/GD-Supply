import { getTranslations } from "next-intl/server";
import { Calculator } from "@/components/sections/Calculator";
import { PageHero } from "@/components/sections/PageHero";
import { locales } from "@/lib/i18n";

const baseUrl = "https://gdsupply.ge";
const buildAlternates = (locale: string) => ({
  canonical: `${baseUrl}/${locale}/calculator`,
  languages: Object.fromEntries(locales.map((loc) => [loc, `${baseUrl}/${loc}/calculator`] )),
});

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations("calculatorPage.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(params.locale),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}/${params.locale}/calculator`,
    },
  };
}

export default async function CalculatorPage({ params }: { params: { locale: string } }) {
  const tPage = await getTranslations("calculatorPage");

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
        currentPath={`/${params.locale}/calculator`}
      />
      <Calculator showHeader={false} />
    </main>
  );
}
