import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import BlogPageClient from "./BlogPageClient";
import { getPostMeta } from "@/lib/blogPosts";
import { locales } from "@/lib/i18n";

const baseUrl = "https://gdsupply.ge";
const buildAlternates = (locale: string) => ({
  canonical: `${baseUrl}/${locale}/blog`,
  languages: Object.fromEntries(locales.map((loc) => [loc, `${baseUrl}/${loc}/blog`] )),
});

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations("blog.meta");
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(params.locale),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      url: `${baseUrl}/${params.locale}/blog`,
    },
  };
}

export default async function BlogPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations("blog");
  const posts = await getPostMeta(params.locale);

  return (
    <>
      <PageHero
        locale={params.locale}
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[
          { label: t("breadcrumbs.home"), href: `/${params.locale}` },
          { label: t("breadcrumbs.blog") },
        ]} 
        backgroundTheme="blog"
        compact
        currentPath={`/${params.locale}/blog`}
      />
      <BlogPageClient posts={posts} hideTopHero />
    </>
  );
}
