export type ServiceUsageKey = "home" | "commercial" | "industrial" | "hotel";

export type ServiceMaterial = {
  name: string;
  description: string;
};

export type ServicePageData = {
  slug: string;
  order: number;
  key: string;
  cardTitle: string;
  title: string;
  heroTitle: string;
  subtitle: string;
  cardSummary: string;
  heroImage: string;
  cardImage: string;
  usage: ServiceUsageKey[];
  materials: ServiceMaterial[];
  gallery: string[];
};

export const SERVICE_USAGE_OPTIONS: Record<
  ServiceUsageKey,
  { labelKey: string; descriptionKey: string }
> = {
  home: {
    labelKey: "usage.home.label",
    descriptionKey: "usage.home.description",
  },
  commercial: {
    labelKey: "usage.commercial.label",
    descriptionKey: "usage.commercial.description",
  },
  industrial: {
    labelKey: "usage.industrial.label",
    descriptionKey: "usage.industrial.description",
  },
  hotel: {
    labelKey: "usage.hotel.label",
    descriptionKey: "usage.hotel.description",
  },
};

export const SERVICE_PROCESS_STEPS = [
  {
    step: "1",
    titleKey: "process.1.title",
    bodyKey: "process.1.body",
  },
  {
    step: "2",
    titleKey: "process.2.title",
    bodyKey: "process.2.body",
  },
  {
    step: "3",
    titleKey: "process.3.title",
    bodyKey: "process.3.body",
  },
  {
    step: "4",
    titleKey: "process.4.title",
    bodyKey: "process.4.body",
  },
  {
    step: "5",
    titleKey: "process.5.title",
    bodyKey: "process.5.body",
  },
] as const;

export const SERVICES_CATALOG: ServicePageData[] = [
  {
    slug: "flat-roof",
    key: "flat_roof",
    order: 1,
    cardTitle: "flat_roof.cardTitle",
    title: "flat_roof.title",
    heroTitle: "flat_roof.heroTitle",
    subtitle: "flat_roof.subtitle",
    cardSummary: "flat_roof.cardSummary",
    heroImage: "/assets/services/flat-roof.jpg",
    cardImage: "/assets/services/flat-roof.jpg",
    usage: ["home", "commercial", "hotel"],
    materials: [
      {
        name: "flat_roof.materials.0.name",
        description: "flat_roof.materials.0.description",
      },
      {
        name: "flat_roof.materials.1.name",
        description: "flat_roof.materials.1.description",
      },
      {
        name: "flat_roof.materials.2.name",
        description: "flat_roof.materials.2.description",
      },
      {
        name: "flat_roof.materials.3.name",
        description: "flat_roof.materials.3.description",
      },
    ],
    gallery: ["/assets/services/flat-roof.jpg"],
  },
  {
    slug: "terrace",
    key: "terrace",
    order: 2,
    cardTitle: "terrace.cardTitle",
    title: "terrace.title",
    heroTitle: "terrace.heroTitle",
    subtitle: "terrace.subtitle",
    cardSummary: "terrace.cardSummary",
    heroImage: "/assets/services/terrace.jpg",
    cardImage: "/assets/services/terrace.jpg",
    usage: ["home", "commercial", "hotel"],
    materials: [
      {
        name: "terrace.materials.0.name",
        description: "terrace.materials.0.description",
      },
      {
        name: "terrace.materials.1.name",
        description: "terrace.materials.1.description",
      },
      {
        name: "terrace.materials.2.name",
        description: "terrace.materials.2.description",
      },
      {
        name: "terrace.materials.3.name",
        description: "terrace.materials.3.description",
      },
    ],
    gallery: ["/assets/services/terrace.jpg"],
  },
  {
    slug: "foundation",
    key: "foundation",
    order: 3,
    cardTitle: "foundation.cardTitle",
    title: "foundation.title",
    heroTitle: "foundation.heroTitle",
    subtitle: "foundation.subtitle",
    cardSummary: "foundation.cardSummary",
    heroImage: "/assets/services/foundation.jpg",
    cardImage: "/assets/services/foundation.jpg",
    usage: ["home", "commercial", "industrial"],
    materials: [
      {
        name: "foundation.materials.0.name",
        description: "foundation.materials.0.description",
      },
      {
        name: "foundation.materials.1.name",
        description: "foundation.materials.1.description",
      },
      {
        name: "foundation.materials.2.name",
        description: "foundation.materials.2.description",
      },
      {
        name: "foundation.materials.3.name",
        description: "foundation.materials.3.description",
      },
      {
        name: "foundation.materials.4.name",
        description: "foundation.materials.4.description",
      },
    ],
    gallery: ["/assets/services/foundation.jpg"],
  },
  {
    slug: "industrial-floor",
    key: "industrial_floor",
    order: 5,
    cardTitle: "industrial_floor.cardTitle",
    title: "industrial_floor.title",
    heroTitle: "industrial_floor.heroTitle",
    subtitle: "industrial_floor.subtitle",
    cardSummary: "industrial_floor.cardSummary",
    heroImage: "/assets/services/industrial-floor.jpg",
    cardImage: "/assets/services/industrial-floor.jpg",
    usage: ["commercial", "industrial", "hotel"],
    materials: [
      {
        name: "industrial_floor.materials.0.name",
        description: "industrial_floor.materials.0.description",
      },
      {
        name: "industrial_floor.materials.1.name",
        description: "industrial_floor.materials.1.description",
      },
    ],
    gallery: ["/assets/services/industrial-floor.jpg"],
  },
  {
    slug: "materials",
    key: "materials",
    order: 6,
    cardTitle: "materials.cardTitle",
    title: "materials.title",
    heroTitle: "materials.heroTitle",
    subtitle: "materials.subtitle",
    cardSummary: "materials.cardSummary",
    heroImage: "/assets/services/materials.jpg",
    cardImage: "/assets/services/materials.jpg",
    usage: ["home", "commercial", "industrial", "hotel"],
    materials: [
      {
        name: "materials.materials.0.name",
        description: "materials.materials.0.description",
      },
      {
        name: "materials.materials.1.name",
        description: "materials.materials.1.description",
      },
      {
        name: "materials.materials.2.name",
        description: "materials.materials.2.description",
      },
    ],
    gallery: ["/assets/services/materials.jpg"],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES_CATALOG.find((service) => service.slug === slug) ?? null;
}
