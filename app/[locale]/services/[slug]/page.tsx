import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
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
    return { title: "Service | GD Supply" };
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

export default async function ServiceSlugPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const service = getServiceBySlug(params.slug);
  const tNav = await getTranslations("navigation");
  const tServices = await getTranslations("servicesPage");
  const tCatalog = await getTranslations("servicesCatalog");

  if (!service) {
    notFound();
  }

  const heroTitle = tCatalog(service.heroTitle);
  const subtitle = tCatalog(service.subtitle);
  const title = tCatalog(service.title);

  return (
    <>
      <PageHero
        locale={params.locale}
        eyebrow={tServices("hero.eyebrow")}
        title={heroTitle}
        subtitle={subtitle}
        backgroundImage={service.heroImage}
        backgroundTheme="services"
        breadcrumbs={[
          { label: tNav("home"), href: `/${params.locale}` },
          { label: tNav("services"), href: `/${params.locale}/services` },
          { label: title },
        ]}
        compact
      />
      <ServiceDetailPage locale={params.locale} service={service} hideHero />
    </>
  );
}
