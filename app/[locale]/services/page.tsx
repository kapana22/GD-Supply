import { ServicesHubPage } from "@/components/services/ServicesHubPage";
import { SERVICES_CATALOG } from "@/lib/servicesCatalog";

export default function ServicesPage({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <main className="relative bg-primary-navy">
      <ServicesHubPage locale={params.locale} services={SERVICES_CATALOG} />
    </main>
  );
}
