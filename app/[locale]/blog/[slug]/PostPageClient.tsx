"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { useLocale, useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/PageHero";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  image: string;
  readTime: string;
  author: string;
  content: string;
};

type BlogPostMeta = Omit<BlogPost, "content">;

const BLOG_ACCENT = "var(--gd-accent)";
const BLOG_PANEL = "var(--gd-panel)";

export default function PostPageClient({
  post,
  related,
  source,
}: {
  post: BlogPost;
  related: BlogPostMeta[];
  source: MDXRemoteSerializeResult;
}) {
  const [progress, setProgress] = useState(0);
  const locale = useLocale();
  const t = useTranslations("blog.post");
  const tBlog = useTranslations("blog");

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
          { label: tBlog("breadcrumbs.home"), href: `/${locale}` },
          { label: tBlog("breadcrumbs.blog"), href: `/${locale}/blog` },
          { label: post.title },
        ]}
      />

      <div className="relative gd-container-narrow pb-4 pt-8">
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
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="gd-container-narrow mb-12"
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
        className="blog-content gd-container-narrow pb-16"
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

      <section className="gd-section-divider gd-container-narrow mb-20 pt-10">
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: "rgba(var(--gd-accent-rgb),0.09)",
            border: "1px solid rgba(var(--gd-accent-rgb),0.20)",
            boxShadow: "0 14px 32px rgba(0,0,0,0.18)",
          }}
        >
          <p className="tt-heading-md mb-2 text-white">{t("ask_title")}</p>
          <p className="tt-small mb-6 text-white/70">{t("ask_subtitle")}</p>
          <Link
            href={`/${locale}/contact`}
            className="tt-ui inline-flex items-center gap-2 rounded-xl bg-[var(--gd-accent)] px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1f8f61] hover:shadow-[0_0_20px_rgba(23,109,72,0.32)]"
          >
            {t("ask_cta")} →
          </Link>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="gd-section-divider gd-container-blog pb-24 pt-10">
          <h2 className="tt-heading-md mb-8 text-white">{t("related")}</h2>
          <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((item, index) => (
              <motion.div
                key={item.slug}
                className="h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <RelatedCard post={item} locale={locale} readLabel={t("read_more")} />
              </motion.div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function RelatedCard({ post, locale, readLabel }: { post: BlogPostMeta; locale: string; readLabel: string }) {
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
          <h3 className="tt-heading-md line-clamp-2 text-white transition group-hover:text-[var(--gd-accent)]">{post.title}</h3>
          <p className="tt-small mt-2 line-clamp-3 leading-relaxed text-white/68">{post.excerpt}</p>
          <p className="tt-ui mt-4 text-sm font-semibold text-[var(--gd-accent)]">{readLabel}</p>
        </div>
      </article>
    </Link>
  );
}
