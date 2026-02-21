"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { categories, type BlogPostMeta } from "@/lib/posts";

export default function BlogPageClient({ posts }: { posts: BlogPostMeta[] }) {
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "ka";
  const [activeCategory, setActiveCategory] = useState("ყველა");

  const filtered = useMemo(
    () =>
      activeCategory === "ყველა"
        ? posts
        : posts.filter((post) => post.category === activeCategory),
    [activeCategory, posts],
  );

  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);

  return (
    <main className="min-h-screen bg-[#1A1C33]">
      <section className="relative overflow-hidden px-6 pb-20 pt-32">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(23,109,72,1) 1px, transparent 1px), linear-gradient(90deg, rgba(23,109,72,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(23,109,72,0.12) 0%, transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex items-center justify-center gap-2 text-sm text-white/40">
              <Link href={`/${locale}`} className="transition-colors hover:text-white">
                მთავარი
              </Link>
              <span>/</span>
              <span className="text-[#176D48]">ბლოგი</span>
            </div>

            <h1 className="mb-4 text-5xl font-black text-white xl:text-6xl">ბლოგი</h1>
            <p className="mx-auto max-w-xl text-lg text-white/50">
              სტატიები ჰიდროიზოლაციაზე, სახურავის ტიპებსა და სამშენებლო ტექნოლოგიებზე
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300"
                style={{
                  background: activeCategory === category ? "#176D48" : "rgba(255,255,255,0.06)",
                  color: activeCategory === category ? "#ffffff" : "rgba(255,255,255,0.5)",
                  border:
                    activeCategory === category
                      ? "1px solid #176D48"
                      : "1px solid rgba(255,255,255,0.08)",
                  boxShadow:
                    activeCategory === category
                      ? "0 0 16px rgba(23,109,72,0.35)"
                      : "none",
                }}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.length === 0 ? (
                <div className="py-20 text-center text-lg text-white/30">ამ კატეგორიაში სტატიები არ მოიძებნა</div>
              ) : (
                <>
                  {featured ? (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55 }}
                      className="mb-8"
                    >
                      <FeaturedCard post={featured} locale={locale} />
                    </motion.div>
                  ) : null}

                  {rest.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {rest.map((post, index) => (
                        <motion.div
                          key={post.slug}
                          initial={{ opacity: 0, y: 28 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.08 }}
                        >
                          <PostCard post={post} locale={locale} />
                        </motion.div>
                      ))}
                    </div>
                  ) : null}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div
          className="mx-auto max-w-3xl rounded-3xl p-12 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(23,109,72,0.15) 0%, rgba(26,28,51,0.8) 100%)",
            border: "1px solid rgba(23,109,72,0.25)",
          }}
        >
          <h2 className="mb-4 text-3xl font-black text-white">კითხვა გაქვს? გვიკითხე პირდაპირ.</h2>
          <p className="mb-8 text-lg text-white/50">ჩვენი სპეციალისტი პასუხობს 2 საათის განმავლობაში.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="rounded-xl bg-[#176D48] px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1a8055] hover:shadow-[0_0_24px_rgba(23,109,72,0.45)]"
            >
              უფასო კონსულტაცია →
            </Link>
            <a
              href="tel:+995599705697"
              className="rounded-xl border border-white/20 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:border-[#176D48]/60 hover:bg-[#176D48]/10"
            >
              +995 599 705 697
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeaturedCard({ post, locale }: { post: BlogPostMeta; locale: string }) {
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block">
      <div
        className="relative grid gap-0 overflow-hidden rounded-2xl transition-all duration-300 lg:grid-cols-2 group-hover:shadow-[0_0_0_1px_rgba(23,109,72,0.4),0_0_40px_rgba(23,109,72,0.12)]"
        style={{ background: "#1E2140", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="relative h-64 overflow-hidden lg:h-auto">
          <Image src={post.image} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent to-[#1E2140]/60 lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2140]/80 to-transparent lg:hidden" />

          <div
            className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold text-white"
            style={{ background: "rgba(23,109,72,0.9)", backdropFilter: "blur(8px)" }}
          >
            ⭐ გამორჩეული
          </div>
        </div>

        <div className="flex flex-col justify-center p-8 lg:p-10">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold text-[#176D48]"
              style={{
                background: "rgba(23,109,72,0.12)",
                border: "1px solid rgba(23,109,72,0.25)",
              }}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/30">
              <ClockIcon className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          <h2 className="mb-4 line-clamp-2 text-2xl font-black leading-snug text-white transition-colors duration-300 group-hover:text-[#176D48] xl:text-3xl">
            {post.title}
          </h2>

          <p className="mb-6 line-clamp-3 text-base leading-relaxed text-white/50">{post.excerpt}</p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-white/30">
              {new Date(post.date).toLocaleDateString("ka-GE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold text-[#176D48] transition-all duration-300 group-hover:gap-3">
              სრულად წაკითხვა
              <ArrowIcon className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function PostCard({ post, locale }: { post: BlogPostMeta; locale: string }) {
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block h-full">
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_0_0_1px_rgba(23,109,72,0.35),0_20px_40px_rgba(0,0,0,0.3)]"
        style={{ background: "#1E2140", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="relative h-48 overflow-hidden">
          <Image src={post.image} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E2140]/70 to-transparent" />

          <div
            className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-[#176D48]"
            style={{
              background: "rgba(26,28,51,0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(23,109,72,0.3)",
            }}
          >
            {post.category}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-3 text-xs text-white/30">
            <span>
              {new Date(post.date).toLocaleDateString("ka-GE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <ClockIcon className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[#176D48]">
            {post.title}
          </h3>

          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-white/45">{post.excerpt}</p>

          <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4 text-sm font-semibold text-[#176D48]">
            წაკითხვა
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#176D48] transition-transform duration-400 group-hover:scale-x-100" />
      </div>
    </Link>
  );
}

function ArrowIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
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
