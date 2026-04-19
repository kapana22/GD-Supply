import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import PostPageClient from "./PostPageClient";
import { BLOG_SLUGS } from "@/lib/blogSlugs";
import { getPost, getPostMeta } from "@/lib/blogPosts";
import { locales } from "@/lib/i18n";

const baseUrl = "https://gdsupply.ge";
const buildAlternates = (locale: string, slug: string) => ({
  canonical: `${baseUrl}/${locale}/blog/${slug}`,
  languages: Object.fromEntries(locales.map((loc) => [loc, `${baseUrl}/${loc}/blog/${slug}`])),
});

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const post = await getPost(params.locale, params.slug);
  if (!post) return {};
  const canonical = `${baseUrl}/${params.locale}/blog/${post.slug}`;

  return {
    title: `${post.title} | GD Supply`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      url: canonical,
    },
    alternates: buildAlternates(params.locale, params.slug),
  };
}

export default async function PostPage({ params }: { params: { locale: string; slug: string } }) {
  const post = await getPost(params.locale, params.slug);
  if (!post) notFound();

  const source = await serialize(post.content ?? "");
  const related = (await getPostMeta(params.locale))
    .filter((item) => item.slug !== params.slug)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image ? `${baseUrl}${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Organization",
      name: "GD Supply",
      url: baseUrl,
    },
    mainEntityOfPage: `${baseUrl}/${params.locale}/blog/${post.slug}`,
  };

  return (
    <>
      <PostPageClient post={post} related={related} source={source} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
    </>
  );
}
