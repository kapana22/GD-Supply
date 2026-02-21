"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import type { BlogPost, BlogPostMeta } from "@/lib/posts";

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
    <main className="min-h-screen bg-[#1A1C33]">
      <div className="fixed left-0 right-0 top-0 z-[60] h-[3px] bg-white/10">
        <motion.div className="h-full bg-[#176D48]" style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
      </div>

      <section className="relative pb-0 pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <Image src={post.image} alt="" fill className="object-cover opacity-10 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1C33]/50 via-[#1A1C33]/80 to-[#1A1C33]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 pb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center gap-2 text-sm text-white/35"
          >
            <Link href={`/${locale}`} className="transition-colors hover:text-white">
              მთავარი
            </Link>
            <span>/</span>
            <Link href={`/${locale}/blog`} className="transition-colors hover:text-white">
              ბლოგი
            </Link>
            <span>/</span>
            <span className="line-clamp-1 text-white/60">{post.title}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-5 flex items-center gap-3"
          >
            <span
              className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#176D48]"
              style={{ background: "rgba(23,109,72,0.15)", border: "1px solid rgba(23,109,72,0.3)" }}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/35">
              <ClockIcon className="h-3 w-3" />
              {post.readTime}
            </span>
            <span className="text-xs text-white/35">
              {new Date(post.date).toLocaleDateString("ka-GE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-6 text-4xl font-black leading-tight text-white xl:text-5xl"
          >
            {post.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="border-l-2 border-[#176D48] pl-5 text-xl leading-relaxed text-white/55"
          >
            {post.excerpt}
          </motion.p>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mx-auto mb-12 max-w-3xl px-6"
      >
        <div className="relative h-80 overflow-hidden rounded-2xl" style={{ boxShadow: "0 0 0 1px rgba(23,109,72,0.2), 0 0 40px rgba(0,0,0,0.4)" }}>
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

        <div className="mt-12 flex flex-wrap gap-2 border-t border-white/[0.07] pt-8">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1.5 text-xs text-white/50"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.article>

      <section className="mx-auto mb-20 max-w-3xl px-6">
        <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(23,109,72,0.1)", border: "1px solid rgba(23,109,72,0.25)" }}>
          <p className="mb-2 text-xl font-bold text-white">კითხვა გაქვს სტატიაზე?</p>
          <p className="mb-6 text-sm text-white/50">ჩვენი სპეციალისტი 2 საათში გიპასუხებს.</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#176D48] px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1a8055] hover:shadow-[0_0_20px_rgba(23,109,72,0.45)]"
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
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1E2140] transition group-hover:-translate-y-1">
        <div className="relative h-44 overflow-hidden">
          <Image src={post.image} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2140]/75 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs text-white/40">{post.readTime}</p>
          <h3 className="mt-2 line-clamp-2 text-lg font-bold text-white transition group-hover:text-[#176D48]">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm text-white/55">{post.excerpt}</p>
          <p className="mt-4 text-sm font-semibold text-[#176D48]">წაკითხვა →</p>
        </div>
      </article>
    </Link>
  );
}

function ClockIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
