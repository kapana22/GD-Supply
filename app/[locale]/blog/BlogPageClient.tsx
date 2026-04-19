"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

type BlogPostMeta = {
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
};

const BLOG_ACCENT = "var(--gd-accent)";
const BLOG_PANEL = "var(--gd-panel)";

export default function BlogPageClient({
  posts,
  hideTopHero = false,
  disableDividers = false,
}: {
  posts: BlogPostMeta[];
  hideTopHero?: boolean;
  disableDividers?: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations("blog");
  const filtered = posts;
  const largePosts = filtered.slice(0, 2);
  const smallPosts = filtered.slice(2);

  const emptyText = t("empty");

  const mainClass = `blog-page ${
    hideTopHero ? "min-h-screen bg-transparent" : "gd-page-shell min-h-screen bg-transparent"
  }${disableDividers ? " no-dividers" : ""}`;

  const contentSectionClass = hideTopHero ? "gd-section-tight gd-section-divider" : "gd-section-compact gd-section-divider";

  return (
    <main className={mainClass}>
      {hideTopHero ? null : (
        <section className="gd-section-compact relative overflow-hidden">
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
            <div>
              <div className="mb-4 flex items-center justify-center gap-2 text-sm text-white/55">
                <Link href={`/${locale}`} className="transition-colors hover:text-white">
                  {t("breadcrumbs.home")}
                </Link>
                <span>/</span>
                <span className="text-[var(--gd-accent)]">{t("breadcrumbs.blog")}</span>
              </div>

              <div className="gd-section-header mx-auto max-w-3xl text-center">
                <h1 className="tt-heading-xl font-black text-white">{t("title")}</h1>
                <p className="text-lg leading-relaxed text-white/66">{t("subtitle")}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className={contentSectionClass}>
        <div className="gd-container-blog">
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-lg text-white/45">{emptyText}</div>
          ) : (
            <div className="space-y-5">
              {largePosts.length > 0 ? (
                <div className="grid auto-rows-fr gap-6 lg:grid-cols-2">
                  {largePosts.map((post) => (
                    <div key={`large-${post.slug}`} className="h-full">
                      <LargePostCard post={post} locale={locale} readLabel={t("list.read_more")} />
                    </div>
                  ))}
                </div>
              ) : null}

              {smallPosts.length > 0 ? (
                <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {smallPosts.map((post) => (
                    <div key={`small-${post.slug}`} className="h-full">
                      <PostCard post={post} locale={locale} readLabel={t("list.read")} />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>

      <section className="gd-section-compact gd-section-divider">
        <div
          className="gd-container-narrow rounded-3xl p-7 text-center md:p-10"
          style={{
            background: "linear-gradient(135deg, rgba(var(--gd-accent-rgb),0.12) 0%, rgba(26,28,51,0.88) 100%)",
            border: "1px solid rgba(var(--gd-accent-rgb),0.20)",
            boxShadow: "0 16px 38px rgba(0,0,0,0.2)",
          }}
        >
          <div className="gd-section-header-tight text-center">
            <h2 className="tt-heading-lg text-white">{t("cta.title")}</h2>
            <p className="tt-detail text-white/70">{t("cta.subtitle")}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="tt-ui rounded-xl bg-[var(--gd-accent)] px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1f8f61] hover:shadow-[0_0_24px_rgba(23,109,72,0.35)]"
            >
              {t("cta.primary")} →
            </Link>
            <a
              href={`tel:${t("cta.phone").replace(/\\s+/g, "")}`}
              className="tt-ui rounded-xl border border-white/18 px-7 py-3.5 font-semibold text-white/90 transition-all duration-300 hover:border-primary-green/45 hover:bg-primary-green/8 hover:text-white"
            >
              {t("cta.phone")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function LargePostCard({ post, locale, readLabel }: { post: BlogPostMeta; locale: string; readLabel: string }) {
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block h-full">
      <article
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_0_0_1px_rgba(23,109,72,0.35),0_20px_44px_rgba(0,0,0,0.32)]"
        style={{ background: BLOG_PANEL }}
      >
        <div className="relative h-56 overflow-hidden md:h-64">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={70}
            className="object-cover transition duration-500 group-hover:scale-105"
          />
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
          <h2 className="tt-heading-md line-clamp-2 leading-tight text-white transition-colors duration-300 group-hover:text-[#176D48]">
            {post.title}
          </h2>
          <p className="mt-3 line-clamp-3 flex-1 text-base leading-relaxed text-white/66">{post.excerpt}</p>
          <div className="mt-6 flex items-center gap-2 border-t border-white/[0.08] pt-4 text-sm font-semibold text-[var(--gd-accent)]">
            {readLabel}
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}

function PostCard({ post, locale, readLabel }: { post: BlogPostMeta; locale: string; readLabel: string }) {
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block h-full">
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_0_0_1px_rgba(23,109,72,0.35),0_20px_40px_rgba(0,0,0,0.3)]"
        style={{ background: BLOG_PANEL, border: "1px solid rgba(255,255,255,0.09)" }}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            quality={70}
            className="object-cover transition duration-500 group-hover:scale-105"
          />
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
          <h3 className="tt-heading-md mb-3 line-clamp-2 leading-snug text-white transition-colors duration-300 group-hover:text-[#176D48]">
            {post.title}
          </h3>

          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-white/62">{post.excerpt}</p>

          <div className="mt-5 flex items-center gap-2 border-t border-white/[0.08] pt-4 text-sm font-semibold text-[var(--gd-accent)]">
            {readLabel}
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
