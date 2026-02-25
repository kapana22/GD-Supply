import { ContactSection } from "@/components/sections/ContactSection";
import { PageHero } from "@/components/sections/PageHero";

export default async function ContactPage({ params }: { params: { locale: string } }) {
  return (
    <main className="gd-page-shell relative">
      <PageHero
        locale={params.locale}
        eyebrow="კონტაქტი"
        title="დაგვიკავშირდით"
        subtitle="უფასო კონსულტაცია, ინსპექციის დაგეგმვა და სწრაფი უკუკავშირი."
        breadcrumbs={[
          { label: "მთავარი", href: `/${params.locale}` },
          { label: "კონტაქტი" },
        ]}
        backgroundTheme="contact"
        compact
      />
      <ContactSection />
    </main>
  );
}
