"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { PageHero } from "@/components/sections/PageHero";
import type { BlogPost, BlogPostMeta } from "@/lib/posts";

const BLOG_ACCENT = "var(--gd-accent)";
const BLOG_PANEL = "var(--gd-panel)";

export default function PostPageClient({
  post,
  related,
  locale,
  source,
}: {
  post: BlogPost;
  related: BlogPostMeta[];
  locale: string;
  source: MDXRemoteSerializeResult;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const element = document.documentElement;
      const scrolled = element.scrollTop;
      const total = element.scrollHeight - element.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="gd-page-shell min-h-screen bg-transparent">
      <div className="fixed left-0 right-0 top-0 z-[60] h-[3px] bg-white/10">
        <motion.div className="h-full bg-[#176D48]" style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
      </div>

      <PageHero
        locale={locale}
        eyebrow={post.category}
        title={post.title}
        subtitle={post.excerpt}
        backgroundImage={post.image}
        backgroundTheme="blog"
        compact
        breadcrumbs={[
          { label: "მთავარი", href: `/${locale}` },
          { label: "ბლოგი", href: `/${locale}/blog` },
          { label: post.title },
        ]}
      />

      <div className="relative mx-auto max-w-3xl px-6 pb-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 flex flex-wrap items-center gap-2"
        >
          <span
            className="rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{
              color: BLOG_ACCENT,
              background: "rgba(var(--gd-accent-rgb), 0.12)",
              border: "1px solid rgba(var(--gd-accent-rgb), 0.25)",
            }}
          >
            {post.category}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/65">
            {post.updated ?? post.date}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/65">
            {post.readTime}
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mx-auto mb-12 max-w-3xl px-6"
      >
        <div
          className="relative h-72 overflow-hidden rounded-2xl md:h-80"
          style={{ boxShadow: "0 0 0 1px rgba(var(--gd-accent-rgb),0.16), 0 20px 48px rgba(0,0,0,0.32)" }}
        >
          <Image src={post.image} alt={post.title} fill className="object-cover" />
        </div>
      </motion.div>

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="blog-content mx-auto max-w-3xl px-6 pb-16"
      >
        <MDXRemote {...source} />

        <div className="mt-12 flex flex-wrap gap-2 border-t border-white/[0.08] pt-8">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1.5 text-xs text-white/70"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.article>

      <section className="mx-auto mb-20 max-w-3xl px-6">
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: "rgba(var(--gd-accent-rgb),0.09)",
            border: "1px solid rgba(var(--gd-accent-rgb),0.20)",
            boxShadow: "0 14px 32px rgba(0,0,0,0.18)",
          }}
        >
          <p className="mb-2 text-xl font-bold text-white">კითხვა გაქვს სტატიაზე?</p>
          <p className="mb-6 text-sm text-white/66">ჩვენი სპეციალისტი 2 საათში გიპასუხებს.</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--gd-accent)] px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1f8f61] hover:shadow-[0_0_20px_rgba(23,109,72,0.32)]"
          >
            უფასო კონსულტაცია →
          </Link>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <h2 className="mb-8 text-2xl font-black text-white">სხვა სტატიები</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((item, index) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <RelatedCard post={item} locale={locale} />
              </motion.div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function RelatedCard({ post, locale }: { post: BlogPostMeta; locale: string }) {
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block h-full">
      <article
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 transition group-hover:-translate-y-1"
        style={{ background: BLOG_PANEL }}
      >
        <div className="relative h-44 overflow-hidden">
          <Image src={post.image} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--gd-panel)]/80 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="line-clamp-2 text-lg font-bold text-white transition group-hover:text-[var(--gd-accent)]">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/68">{post.excerpt}</p>
          <p className="mt-4 text-sm font-semibold text-[var(--gd-accent)]">წაკითხვა →</p>
        </div>
      </article>
    </Link>
  );
}
