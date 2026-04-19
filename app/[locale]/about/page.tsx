import { getTranslations } from "next-intl/server";
import { AboutPage } from "@/components/sections/AboutPage";
import { locales } from "@/lib/i18n";

const baseUrl = "https://gdsupply.ge";
const buildAlternates = (locale: string) => ({
  canonical: `${baseUrl}/${locale}/about`,
  languages: Object.fromEntries(locales.map((loc) => [loc, `${baseUrl}/${loc}/about`] )),
});

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations("about_page.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(params.locale),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}/${params.locale}/about`,
    },
  };
}

export default function AboutRoute({ params }: { params: { locale: string } }) {
  return (
    <main className="gd-page-shell relative">
      <AboutPage locale={params.locale} />
    </main>
  );
}
