import { posts } from "@/lib/posts";

export default function sitemap() {
  const baseUrl = "https://gdsupply.ge";
  const locales = ["ka", "en", "ru"];

  const blogPosts = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: post.updated ?? post.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  const blogIndex = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/blog`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...blogIndex, ...blogPosts];
}
