import { ServicesHubPage } from "@/components/services/ServicesHubPage";
import { PageHero } from "@/components/sections/PageHero";
import { SERVICES_CATALOG } from "@/lib/servicesCatalog";

export default function ServicesPage({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <main className="gd-page-shell relative">
      <PageHero
        locale={params.locale}
        eyebrow="სერვისები"
        title="რას ვაკეთებთ"
        subtitle="ჰიდროიზოლაციის ძირითადი მიმართულებები ერთი სტრუქტურირებული სექციით."
        breadcrumbs={[
          { label: "მთავარი", href: `/${params.locale}` },
          { label: "სერვისები" },
        ]}
        backgroundTheme="services"
        compact
      />
      <ServicesHubPage locale={params.locale} services={SERVICES_CATALOG} showHeader={false} />
    </main>
  );
}
