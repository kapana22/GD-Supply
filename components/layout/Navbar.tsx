"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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

const SYSTEM_CONTROL_FONT_STYLE = {
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  lineHeight: 1,
  fontKerning: "normal",
  fontFeatureSettings: '"kern" 1',
} as const;

export function Navbar() {
  const tNav = useTranslations("navigation");
  const tHeader = useTranslations("header");

  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams() as { locale: string };

  const [open, setOpen] = useState(false);

  const phone = tHeader("phone");

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
    const nextPath = segments.join("/") || `/${nextLocale}`;
    const suffix =
      typeof window === "undefined"
        ? ""
        : `${window.location.search}${window.location.hash}`;
    router.push(`${nextPath}${suffix}`);
    setOpen(false);
  }

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-500"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between gap-4 px-5 md:px-10">
        <Link
          href={`/${locale}`}
          className="relative flex shrink-0 items-center gap-2.5"
          aria-label="GD Supply"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 h-5 w-36 -translate-x-1/2 translate-y-2 rounded-full bg-white/20 blur-xl"
          />
          <Image
            src="/images/logo.png"
            alt="GD Supply"
            width={44}
            height={44}
            className="relative h-11 w-11 object-contain drop-shadow-[0_6px_16px_rgba(255,255,255,0.22)]"
            priority
          />
          <div className="relative leading-tight">
            <p className="tt-label text-sm font-black leading-none tracking-[0.02em] text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.16)]">
              GD SUPPLY
            </p>
          </div>
        </Link>

        <nav className="hidden min-w-0 items-center justify-center gap-1 lg:flex">
          {links.map((item) => {
            const isActive = item.href === "" ? activeHref === "" : activeHref === item.href;
            const href = item.href ? `/${locale}/${item.href}` : `/${locale}`;

            return (
              <Link
                key={item.key}
                href={href}
                className={`tt-ui inline-flex h-10 items-center rounded-md px-3 text-sm font-semibold leading-none transition ${
                  isActive
                    ? "text-white"
                    : "text-white/72 hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                <span className="translate-y-[0.5px]">{tNav(item.key)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <div className="flex items-center gap-2" role="group" aria-label="Language">
            {(["ka", "en", "ru"] as const).map((loc) => {
              const active = loc === locale;
              const supported = locales.includes(loc);

              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => supported && setLocale(loc)}
                  disabled={!supported}
                  className={`inline-flex h-10 w-11 items-center justify-center rounded-full border px-0 text-[12px] font-bold leading-none tracking-normal transition ${
                    active
                      ? "border-primary-green bg-primary-green text-white shadow-glow-green"
                      : supported
                        ? "border-white/14 bg-white/5 text-white/78 hover:border-white/20 hover:text-white"
                        : "cursor-not-allowed border-white/10 bg-white/[0.03] text-white/35"
                  }`}
                  aria-pressed={active}
                  style={SYSTEM_CONTROL_FONT_STYLE}
                >
                  {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
                </button>
              );
            })}
          </div>

          <a
            href={`tel:${phone.replaceAll(" ", "")}`}
            className="btn-primary relative inline-flex h-11 items-center justify-center rounded-full border border-primary-green/20 px-5 py-0 text-sm font-bold leading-none tracking-normal tabular-nums text-white shadow-glow-green whitespace-nowrap"
            style={SYSTEM_CONTROL_FONT_STYLE}
          >
            {phone}
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-lg border border-white/12 bg-white/5 text-white backdrop-blur lg:hidden"
        >
          {open ? <X className="h-5 w-5" strokeWidth={2.2} /> : <Menu className="h-5 w-5" strokeWidth={2.2} />}
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
                      className={`tt-ui rounded-lg px-4 py-3 text-base font-semibold transition ${
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
                <span className="tt-label px-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/55">ენა</span>
                <div className="flex items-center gap-2">
                  {(["ka", "en", "ru"] as const).map((loc) => {
                    const active = loc === locale;
                    const supported = locales.includes(loc);

                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => supported && setLocale(loc)}
                        disabled={!supported}
                        className={`inline-flex h-10 w-11 items-center justify-center rounded-full border px-0 text-[12px] font-bold leading-none tracking-normal transition ${
                          active
                            ? "border-primary-green bg-primary-green text-white shadow-glow-green"
                            : supported
                              ? "border-white/14 bg-white/5 text-white/78 hover:border-white/20 hover:text-white"
                              : "cursor-not-allowed border-white/10 bg-white/[0.03] text-white/35"
                        }`}
                        aria-pressed={active}
                        style={SYSTEM_CONTROL_FONT_STYLE}
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
                  className="btn-primary relative inline-flex h-11 items-center justify-center rounded-lg border border-primary-green/20 px-4 py-0 text-sm font-bold leading-none tracking-normal tabular-nums text-white shadow-glow-green"
                  style={SYSTEM_CONTROL_FONT_STYLE}
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
