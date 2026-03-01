import { getTranslations } from "next-intl/server";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageHero } from "@/components/sections/PageHero";

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
      />
      <ContactSection />
    </main>
  );
}
