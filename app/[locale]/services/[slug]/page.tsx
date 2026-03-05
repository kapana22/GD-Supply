import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { SERVICES_CATALOG, getServiceBySlug } from "@/lib/servicesCatalog";
import { locales } from "@/lib/i18n";

export function generateStaticParams() {
  return SERVICES_CATALOG.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Metadata {
  const service = getServiceBySlug(params.slug);
  const base = "https://gdsupply.ge";
  const canonical = `${base}/${params.locale}/services/${params.slug}`;
  const languages = locales.reduce<Record<string, string>>((acc, loc) => {
    acc[loc] = `${base}/${loc}/services/${params.slug}`;
    return acc;
  }, {});

  if (!service) {
    return {
      title: "Service | GD Supply",
      alternates: { canonical, languages },
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
    alternates: {
      canonical,
      languages,
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
  const base = "https://gdsupply.ge";
  const canonical = `${base}/${params.locale}/services/${service.slug}`;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: heroTitle,
    description: subtitle,
    serviceType: title,
    provider: {
      "@type": "Organization",
      name: "GD Supply",
      url: base,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: title,
      itemListElement: service.materials?.map((mat, idx) => ({
        "@type": "Offer",
        position: idx + 1,
        itemOffered: {
          "@type": "Service",
          name: mat.name,
          description: mat.description,
        },
      })),
    },
    areaServed: {
      "@type": "Country",
      name: "Georgia",
    },
    url: canonical,
    image: service.heroImage ? `${base}${service.heroImage}` : undefined,
  };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
    </>
  );
}
