import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import { posts } from "@/lib/posts";
import { getPostBySlug } from "@/lib/posts.server";
import PostPageClient from "./PostPageClient";

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
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

export default async function PostPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const source = await serialize(post.content);
  const sameCategory = posts
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const fallback = posts
    .filter((item) => item.slug !== post.slug && item.category !== post.category)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const related = [...sameCategory, ...fallback].slice(0, 3);

  return (
    <PostPageClient post={post} related={related} locale={params.locale} source={source} />
  );
}
