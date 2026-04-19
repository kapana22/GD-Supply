import { getTranslations } from "next-intl/server";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageHero } from "@/components/sections/PageHero";
import { locales } from "@/lib/i18n";

const baseUrl = "https://gdsupply.ge";
const buildAlternates = (locale: string) => ({
  canonical: `${baseUrl}/${locale}/contact`,
  languages: Object.fromEntries(locales.map((loc) => [loc, `${baseUrl}/${loc}/contact`] )),
});

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const tPage = await getTranslations("contactPage.meta");
  return {
    title: tPage("title"),
    description: tPage("description"),
    alternates: buildAlternates(params.locale),
    openGraph: {
      title: tPage("title"),
      description: tPage("description"),
      url: `${baseUrl}/${params.locale}/contact`,
    },
  };
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const tPage = await getTranslations("contactPage");

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
        backgroundTheme="contact"
        compact
        currentPath={`/${params.locale}/contact`}
      />
      <ContactSection />
    </main>
  );
}
