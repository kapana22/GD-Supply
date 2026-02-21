import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <main className="relative py-[60px] md:py-[100px]">
      <div className="mx-auto max-w-[980px] px-5 md:px-10">
        <Link
          href="../"
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 shadow-elevated transition hover:bg-white/10 hover:text-white"
        >
          ← ბლოგი
        </Link>

        <article className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-gd-surface shadow-elevated">
          <div className="relative h-72 w-full">
            <Image src={post.cover} alt={post.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute left-6 bottom-6 space-y-2">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur">
                {post.tag}
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                {post.title}
              </h1>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                {post.date}
              </p>
            </div>
          </div>

          <div className="space-y-5 p-6 md:p-10">
            <p className="text-base leading-relaxed text-gd-muted">{post.excerpt}</p>
            <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="space-y-4">
              {post.content.map((p, idx) => (
                <p key={idx} className="text-sm leading-relaxed text-white/85 md:text-base">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
