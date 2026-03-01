import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import PostPageClient from "./PostPageClient";
import { BLOG_SLUGS } from "@/lib/blogSlugs";
import { getPost, getPostMeta } from "@/lib/blogPosts";

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const post = await getPost(params.locale, params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | GD Supply`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
    },
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

  return <PostPageClient post={post} related={related} source={source} />;
}
