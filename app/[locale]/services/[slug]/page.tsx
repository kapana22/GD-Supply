import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { SERVICES_CATALOG, getServiceBySlug } from "@/lib/servicesCatalog";

export function generateStaticParams() {
  return SERVICES_CATALOG.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Metadata {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "სერვისი | GD Supply",
    };
  }

  return {
    title: `${service.title} | GD Supply`,
    description: service.subtitle,
    openGraph: {
      title: `${service.title} | GD Supply`,
      description: service.subtitle,
      images: [service.heroImage],
    },
  };
}

export default function ServiceSlugPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHero
        locale={params.locale}
        eyebrow="სერვისი"
        title={service.heroTitle}
        subtitle={service.subtitle}
        backgroundImage={service.heroImage}
        backgroundTheme="services"
        breadcrumbs={[
          { label: "მთავარი", href: `/${params.locale}` },
          { label: "სერვისები", href: `/${params.locale}/services` },
          { label: service.title },
        ]}
        compact
      />
      <ServiceDetailPage locale={params.locale} service={service} hideHero />
    </>
  );
}
