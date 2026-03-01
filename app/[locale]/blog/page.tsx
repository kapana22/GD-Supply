import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import BlogPageClient from "./BlogPageClient";
import { getPostMeta } from "@/lib/blogPosts";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      type: "website",
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
      />
      <BlogPageClient posts={posts} hideTopHero />
    </>
  );
}
