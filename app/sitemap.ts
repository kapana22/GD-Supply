import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { locales } from "@/lib/i18n";
import { BLOG_META } from "@/lib/blogMeta";
import { SERVICES_CATALOG } from "@/lib/servicesCatalog";
import { BLOG_SLUGS } from "@/lib/blogSlugs";

const baseUrl = "https://gdsupply.ge";
const staticRoutes = ["", "services", "portfolio", "partners", "products", "about", "contact", "calculator"] as const;
const defaultLastModified = new Date("2025-01-01");

function parseDate(value?: string) {
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

const latestContentDate =
  BLOG_META.reduce<Date>((latest, post) => {
    const nextDate = parseDate(post.updated ?? post.date);
    if (!nextDate) return latest;
    return nextDate > latest ? nextDate : latest;
  }, defaultLastModified) ?? defaultLastModified;

function sourceMtime(files: string[]) {
  let latest: Date | null = null;

  for (const file of files) {
    try {
      const stat = fs.statSync(path.join(process.cwd(), file));
      const candidate = new Date(stat.mtimeMs);
      if (!latest || candidate > latest) {
        latest = candidate;
      }
    } catch {
      // Ignore missing files and fall back to content dates.
    }
  }

  return latest ?? latestContentDate;
}

const routeLastModified = {
  home: sourceMtime([
    "app/[locale]/page.tsx",
    "components/sections/Hero.tsx",
    "components/sections/ServicesOverview.tsx",
    "components/sections/PortfolioGrid.tsx",
    "components/sections/Faq.tsx",
    "components/sections/ContactSection.tsx",
    "components/sections/RoofVideoSection.tsx",
    "components/sections/ReferencesVideo.tsx",
    "components/layout/PartnersMarquee.tsx",
  ]),
  services: sourceMtime([
    "app/[locale]/services/page.tsx",
    "components/services/ServicesHubPage.tsx",
    "components/sections/PageHero.tsx",
    "lib/servicesCatalog.ts",
  ]),
  portfolio: sourceMtime([
    "app/[locale]/portfolio/page.tsx",
    "components/sections/PortfolioGrid.tsx",
  ]),
  partners: sourceMtime([
    "app/[locale]/partners/page.tsx",
    "components/data/partners.ts",
    "components/layout/PartnersMarquee.tsx",
  ]),
  products: sourceMtime([
    "app/[locale]/products/page.tsx",
    "lib/servicesCatalog.ts",
  ]),
  about: sourceMtime([
    "app/[locale]/about/page.tsx",
    "components/sections/AboutPage.tsx",
  ]),
  contact: sourceMtime([
    "app/[locale]/contact/page.tsx",
    "components/sections/ContactSection.tsx",
  ]),
  calculator: sourceMtime([
    "app/[locale]/calculator/page.tsx",
    "components/sections/Calculator.tsx",
  ]),
  blogIndex: sourceMtime([
    "app/[locale]/blog/page.tsx",
    "lib/blogPosts.ts",
    "lib/blogMeta.ts",
  ]),
  blog: sourceMtime([
    "app/[locale]/blog/[slug]/page.tsx",
    "lib/blogPosts.ts",
    "lib/blogMeta.ts",
  ]),
  service: sourceMtime([
    "app/[locale]/services/[slug]/page.tsx",
    "lib/servicesCatalog.ts",
  ]),
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedStaticPages = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${baseUrl}/${locale}${route ? `/${route}` : ""}`,
      lastModified:
        route === ""
          ? routeLastModified.home
          : route === "services"
            ? routeLastModified.services
            : route === "portfolio"
              ? routeLastModified.portfolio
              : route === "partners"
                ? routeLastModified.partners
                : route === "products"
                  ? routeLastModified.products
                  : route === "about"
                    ? routeLastModified.about
                    : route === "contact"
                      ? routeLastModified.contact
                      : routeLastModified.calculator,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    })),
  );

  const servicePages = locales.flatMap((locale) =>
    SERVICES_CATALOG.map((service) => ({
      url: `${baseUrl}/${locale}/services/${service.slug}`,
      lastModified: routeLastModified.service,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  const blogIndex = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/blog`,
    lastModified: routeLastModified.blogIndex,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogPosts = locales.flatMap((locale) =>
    BLOG_SLUGS.map((slug) => {
      const post = BLOG_META.find((p) => p.slug === slug);
      const last = post ? parseDate(post.updated ?? post.date) ?? latestContentDate : latestContentDate;
      return {
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: last,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    }),
  );

  return [...localizedStaticPages, ...servicePages, ...blogIndex, ...blogPosts];
}
