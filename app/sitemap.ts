import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { BLOG_META } from "@/lib/blogMeta";
import { SERVICES_CATALOG } from "@/lib/servicesCatalog";
import { BLOG_SLUGS } from "@/lib/blogSlugs";

const baseUrl = "https://gdsupply.ge";
const staticRoutes = ["", "services", "portfolio", "partners", "products", "about", "contact", "calculator"] as const;

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
  }, new Date("2025-01-01")) ?? new Date("2025-01-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedStaticPages = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${baseUrl}/${locale}${route ? `/${route}` : ""}`,
      lastModified: latestContentDate,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    })),
  );

  const servicePages = locales.flatMap((locale) =>
    SERVICES_CATALOG.map((service) => ({
      url: `${baseUrl}/${locale}/services/${service.slug}`,
      lastModified: latestContentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  const blogIndex = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/blog`,
    lastModified: latestContentDate,
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
