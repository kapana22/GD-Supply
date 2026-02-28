"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { categories, type BlogPostMeta } from "@/lib/posts";

const BLOG_ACCENT = "var(--gd-accent)";
const BLOG_PANEL = "var(--gd-panel)";

export default function BlogPageClient({
  posts,
  hideTopHero = false,
}: {
  posts: BlogPostMeta[];
  hideTopHero?: boolean;
}) {
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "ka";
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filtered = useMemo(
    () =>
      activeCategory === categories[0]
        ? posts
        : posts.filter((post) => post.category === activeCategory),
    [activeCategory, posts],
  );

  const largePosts = filtered.slice(0, 2);
  const smallPosts = filtered.slice(2);

  return (
    <main
      className={`blog-page ${hideTopHero ? "min-h-screen bg-transparent" : "gd-page-shell min-h-screen bg-transparent"}`}
    >
      {hideTopHero ? null : (
      <section className="relative overflow-hidden pb-20 pt-32">
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

        <div className="relative gd-container-blog text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex items-center justify-center gap-2 text-sm text-white/55">
              <Link href={`/${locale}`} className="transition-colors hover:text-white">
                მთავარი
              </Link>
              <span>/</span>
              <span className="text-[var(--gd-accent)]">ბლოგი</span>
            </div>

            <h1 className="tt-heading-xl mb-4 font-black text-white">ბლოგი</h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/66">
              სტატიები ჰიდროიზოლაციაზე, სახურავის ტიპებსა და სამშენებლო ტექნოლოგიებზე
            </p>
          </motion.div>
        </div>
      </section>
      )}

      <section className="gd-section-divider pb-14 pt-8 md:pb-16 md:pt-10">
        <div className="gd-container-blog">
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
                  background:
                    activeCategory === category
                      ? "rgba(var(--gd-accent-rgb), 0.92)"
                      : "rgba(255,255,255,0.05)",
                  color: activeCategory === category ? "#ffffff" : "rgba(255,255,255,0.75)",
                  border:
                    activeCategory === category
                      ? "1px solid rgba(var(--gd-accent-rgb), 0.95)"
                      : "1px solid rgba(255,255,255,0.12)",
                  boxShadow:
                    activeCategory === category
                      ? "0 0 0 1px rgba(23,109,72,0.15), 0 8px 20px rgba(23,109,72,0.22)"
                      : "none",
                }}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="gd-section-divider pb-24 pt-10 md:pt-12">
        <div className="gd-container-blog">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.length === 0 ? (
                <div className="py-20 text-center text-lg text-white/45">
                  ამ კატეგორიაში სტატიები არ მოიძებნა
                </div>
              ) : (
                <div className="space-y-6">
                  {largePosts.length > 0 ? (
                    <div className="grid auto-rows-fr gap-6 lg:grid-cols-2">
                      {largePosts.map((post, index) => (
                        <motion.div
                          key={`large-${post.slug}`}
                          className="h-full"
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: index * 0.08 }}
                        >
                          <LargePostCard post={post} locale={locale} />
                        </motion.div>
                      ))}
                    </div>
                  ) : null}

                  {smallPosts.length > 0 ? (
                    <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {smallPosts.map((post, index) => (
                        <motion.div
                          key={`small-${post.slug}`}
                          className="h-full"
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: index * 0.06 }}
                        >
                          <PostCard post={post} locale={locale} />
                        </motion.div>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="gd-section-divider pb-24 pt-12 md:pt-14">
        <div
          className="gd-container-narrow rounded-3xl p-8 text-center md:p-12"
          style={{
            background:
              "linear-gradient(135deg, rgba(var(--gd-accent-rgb),0.12) 0%, rgba(26,28,51,0.88) 100%)",
            border: "1px solid rgba(var(--gd-accent-rgb),0.20)",
            boxShadow: "0 16px 38px rgba(0,0,0,0.2)",
          }}
        >
          <h2 className="mb-4 text-3xl font-black text-white">კითხვა გაქვს? გვიკითხე პირდაპირ.</h2>
          <p className="mb-8 text-lg text-white/64">
            ჩვენი სპეციალისტი პასუხობს 2 საათის განმავლობაში.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="rounded-xl bg-[var(--gd-accent)] px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1f8f61] hover:shadow-[0_0_24px_rgba(23,109,72,0.35)]"
            >
              უფასო კონსულტაცია →
            </Link>
            <a
              href="tel:+995599705697"
              className="rounded-xl border border-white/18 px-7 py-3.5 font-semibold text-white/90 transition-all duration-300 hover:border-primary-green/45 hover:bg-primary-green/8 hover:text-white"
            >
              +995 599 705 697
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function LargePostCard({ post, locale }: { post: BlogPostMeta; locale: string }) {
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block h-full">
      <article
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_0_0_1px_rgba(23,109,72,0.35),0_20px_44px_rgba(0,0,0,0.32)]"
        style={{ background: BLOG_PANEL }}
      >
        <div className="relative h-56 overflow-hidden md:h-64">
          <Image src={post.image} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--gd-panel)]/75 via-[var(--gd-panel)]/10 to-transparent" />
          <div
            className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{
              color: BLOG_ACCENT,
              background: "rgba(26,28,51,0.9)",
              border: "1px solid rgba(var(--gd-accent-rgb),0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            {post.category}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-7">
          <h2 className="line-clamp-2 text-2xl font-black leading-tight text-white transition-colors duration-300 group-hover:text-[#176D48]">
            {post.title}
          </h2>
          <p className="mt-3 line-clamp-3 flex-1 text-base leading-relaxed text-white/66">{post.excerpt}</p>
          <div className="mt-6 flex items-center gap-2 border-t border-white/[0.08] pt-4 text-sm font-semibold text-[var(--gd-accent)]">
            სრულად წაკითხვა
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}

function PostCard({ post, locale }: { post: BlogPostMeta; locale: string }) {
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block h-full">
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_0_0_1px_rgba(23,109,72,0.35),0_20px_40px_rgba(0,0,0,0.3)]"
        style={{ background: BLOG_PANEL, border: "1px solid rgba(255,255,255,0.09)" }}
      >
        <div className="relative h-48 overflow-hidden">
          <Image src={post.image} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--gd-panel)]/78 to-transparent" />

          <div
            className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-[#176D48]"
            style={{
              color: BLOG_ACCENT,
              background: "rgba(26,28,51,0.9)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(var(--gd-accent-rgb),0.25)",
            }}
          >
            {post.category}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[#176D48]">
            {post.title}
          </h3>

          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-white/62">{post.excerpt}</p>

          <div className="mt-5 flex items-center gap-2 border-t border-white/[0.08] pt-4 text-sm font-semibold text-[var(--gd-accent)]">
            წაკითხვა
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[var(--gd-accent)] transition-transform duration-400 group-hover:scale-x-100" />
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


