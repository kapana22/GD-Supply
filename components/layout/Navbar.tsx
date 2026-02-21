"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { locales } from "@/lib/i18n";

const links = [
  { href: "", key: "home" },
  { href: "services", key: "services" },
  { href: "portfolio", key: "portfolio" },
  { href: "about", key: "about" },
  { href: "blog", key: "blog" },
  { href: "calculator", key: "calculator" },
  { href: "contact", key: "contact" },
] as const;

const LOCALE_LABELS: Record<string, string> = {
  ka: "KA",
  en: "EN",
  ru: "RU",
};

export function Navbar() {
  const tNav = useTranslations("navigation");
  const tHeader = useTranslations("header");

  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams() as { locale: string };

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const phone = tHeader("phone");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeHref = useMemo(() => {
    if (!pathname) return "";
    const cleaned = pathname.replace(`/${locale}`, "");
    const segment = cleaned.split("/").filter(Boolean)[0] || "";
    return segment;
  }, [locale, pathname]);

  function setLocale(nextLocale: string) {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || "/");
    setOpen(false);
  }

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(14,18,40,0.58)" : "rgba(14,18,40,0.14)",
        backdropFilter: scrolled ? "blur(14px) saturate(1.2)" : "blur(8px) saturate(1.05)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 md:px-10">
        <Link href={`/${locale}`} className="flex items-center gap-3" aria-label="GD Supply">
          <Image
            src="/images/logo.png"
            alt="GD Supply"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
            priority
          />
          <div className="leading-tight">
            <p className="text-sm font-extrabold tracking-[0.14em] text-white">GD SUPPLY</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((item) => {
            const isActive = item.href === "" ? activeHref === "" : activeHref === item.href;
            const href = item.href ? `/${locale}/${item.href}` : `/${locale}`;

            return (
              <Link
                key={item.key}
                href={href}
                className={`text-sm font-semibold transition ${
                  isActive ? "text-white" : "text-white/72 hover:text-white"
                }`}
              >
                {tNav(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div
            className="flex items-center rounded-full border border-white/12 bg-white/5 p-1 backdrop-blur"
            role="group"
            aria-label="Language"
          >
            {(["ka", "en", "ru"] as const).map((loc) => {
              const active = loc === locale;
              const supported = locales.includes(loc);

              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => supported && setLocale(loc)}
                  disabled={!supported}
                  className={`rounded-full px-3 py-1 text-[11px] font-extrabold tracking-[0.18em] transition ${
                    active
                      ? "bg-primary-green text-white shadow-glow-green"
                      : supported
                        ? "text-white/72 hover:text-white"
                        : "cursor-not-allowed text-white/35"
                  }`}
                  aria-pressed={active}
                >
                  {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
                </button>
              );
            })}
          </div>

          <a
            href={`tel:${phone.replaceAll(" ", "")}`}
            className="px-2 py-2 text-sm font-semibold text-white transition hover:text-white/80"
          >
            {phone}
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-lg border border-white/12 bg-white/5 text-white backdrop-blur lg:hidden"
        >
          <span className="relative block h-0.5 w-6 bg-current before:absolute before:-top-2 before:h-0.5 before:w-6 before:bg-current after:absolute after:top-2 after:h-0.5 after:w-6 after:bg-current" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mx-auto max-w-[1440px] px-5 pb-4 md:px-10 lg:hidden"
          >
            <div className="rounded-xl border border-white/10 bg-primary-navy/95 p-4 shadow-elevated backdrop-blur">
              <div className="grid gap-2">
                {links.map((item) => {
                  const href = item.href ? `/${locale}/${item.href}` : `/${locale}`;
                  const isActive = item.href === "" ? activeHref === "" : activeHref === item.href;

                  return (
                    <Link
                      key={item.key}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`rounded-lg px-4 py-3 text-base font-semibold transition ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white/75 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {tNav(item.key)}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-2">
                <span className="px-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">ენა</span>
                <div className="flex items-center gap-1">
                  {(["ka", "en", "ru"] as const).map((loc) => {
                    const active = loc === locale;
                    const supported = locales.includes(loc);

                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => supported && setLocale(loc)}
                        disabled={!supported}
                        className={`rounded-full px-3 py-1 text-[11px] font-extrabold tracking-[0.18em] transition ${
                          active
                            ? "bg-primary-green text-white shadow-glow-green"
                            : supported
                              ? "text-white/70 hover:text-white"
                              : "cursor-not-allowed text-white/35"
                        }`}
                        aria-pressed={active}
                      >
                        {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-3 grid gap-2">
                <a
                  href={`tel:${phone.replaceAll(" ", "")}`}
                  className="px-4 py-3 text-sm font-semibold text-white"
                >
                  {phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
