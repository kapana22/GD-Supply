import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { posts } from "@/lib/posts";
import { SERVICES_CATALOG } from "@/lib/servicesCatalog";

const baseUrl = "https://gdsupply.ge";
const staticRoutes = ["", "services", "portfolio", "about", "contact", "calculator"] as const;

function parseDate(value?: string) {
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getLatestContentDate() {
  return posts.reduce<Date>((latest, post) => {
    const nextDate = parseDate(post.updated ?? post.date);
    if (!nextDate) return latest;
    return nextDate > latest ? nextDate : latest;
  }, new Date("2025-01-01"));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestContentDate = getLatestContentDate();

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
    posts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: parseDate(post.updated ?? post.date) ?? latestContentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...localizedStaticPages, ...servicePages, ...blogIndex, ...blogPosts];
}
