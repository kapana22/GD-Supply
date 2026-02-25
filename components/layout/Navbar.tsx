"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  ka: "GE",
  en: "EN",
  ru: "RU",
};

const LOCALE_FLAG_FILES: Record<string, string> = {
  ka: "/flags/ge.svg",
  en: "/flags/gb.svg",
  ru: "/flags/ru.svg",
};

const LOCALE_OPTION_ORDER = ["en", "ru", "ka"] as const;

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
  const [scrolled, setScrolled] = useState(false);

  const phone = tHeader("phone");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
        background: scrolled
          ? "linear-gradient(180deg, rgba(8,12,26,0.78) 0%, rgba(9,13,28,0.66) 52%, rgba(10,14,30,0.62) 100%)"
          : "linear-gradient(180deg, rgba(8,12,26,0.36) 0%, rgba(9,13,28,0.22) 55%, rgba(10,14,30,0.16) 100%)",
        backdropFilter: scrolled ? "blur(24px) saturate(1.45)" : "blur(17px) saturate(1.18)",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.45)" : "blur(17px) saturate(1.18)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.12)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: scrolled
          ? "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(255,255,255,0.03), 0 16px 38px rgba(4,8,18,0.32), 0 0 56px rgba(28,184,121,0.09)"
          : "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(255,255,255,0.02), 0 0 42px rgba(28,184,121,0.10)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: scrolled ? 0.92 : 0.68,
          background:
            "radial-gradient(34% 120% at 14% 0%, rgba(255,255,255,0.12) 0%, transparent 66%), radial-gradient(42% 120% at 50% -8%, rgba(255,255,255,0.06) 0%, transparent 70%), radial-gradient(48% 120% at 84% 0%, rgba(28,184,121,0.12) 0%, transparent 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full transition-opacity duration-500"
        style={{
          opacity: scrolled ? 0.26 : 0.16,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 34%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.10) 66%, transparent 100%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-500"
        style={{
          opacity: scrolled ? 0.96 : 0.78,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.24) 10%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.22) 90%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-500"
        style={{
          opacity: scrolled ? 0.9 : 0.72,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 14%, rgba(255,255,255,0.20) 42%, rgba(28,184,121,0.34) 58%, rgba(255,255,255,0.14) 86%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-6 h-10 blur-2xl transition-opacity duration-500"
        style={{
          opacity: scrolled ? 0.22 : 0.14,
          background:
            "radial-gradient(58% 100% at 52% 0%, rgba(28,184,121,0.34) 0%, rgba(28,184,121,0.0) 76%)",
        }}
      />
      <div
        className="relative mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 transition-[height,padding] duration-500 md:px-10"
        style={{ height: scrolled ? 74 : 78 }}
      >
        <Link
          href={`/${locale}`}
          className="relative z-[1] flex shrink-0 items-center gap-2.5"
          aria-label="GD Supply"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-5 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55 blur-[18px] opacity-70"
          />
          <Image
            src="/images/logo.png"
            alt="GD Supply"
            width={44}
            height={44}
            className="relative h-11 w-11 object-contain"
            priority
          />
          <div className="relative leading-tight">
            <p className="tt-label text-sm font-black leading-none tracking-[0.02em] text-white">
              GD SUPPLY
            </p>
          </div>
        </Link>

        <nav className="relative z-[1] hidden min-w-0 items-center justify-center gap-1 lg:flex">
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

        <div className="relative z-[1] hidden shrink-0 items-center gap-3 lg:flex">
          <LanguageDropdown locale={locale} onChange={setLocale} />

          <a
            href={`tel:${phone.replaceAll(" ", "")}`}
            className="btn-primary tt-ui relative inline-flex h-11 items-center justify-center rounded-full px-5 py-0 text-sm font-bold leading-none tracking-normal tabular-nums text-white whitespace-nowrap"
            style={SYSTEM_CONTROL_FONT_STYLE}
          >
            {phone}
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          className="gd-control-icon relative z-[1] grid h-11 w-11 place-items-center rounded-lg text-white lg:hidden"
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
                <LanguageDropdown locale={locale} onChange={setLocale} mobile />
              </div>

              <div className="mt-3 grid gap-2">
                <a
                  href={`tel:${phone.replaceAll(" ", "")}`}
                  className="btn-primary tt-ui inline-flex h-11 items-center justify-center rounded-lg px-4 py-0 text-sm font-bold leading-none tracking-normal tabular-nums text-white"
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

function LanguageDropdown({
  locale,
  onChange,
  mobile = false,
}: {
  locale: string;
  onChange: (nextLocale: string) => void;
  mobile?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const activeLabel = LOCALE_LABELS[locale] ?? locale.toUpperCase();
  return (
    <div ref={rootRef} className={`relative ${mobile ? "w-[132px]" : ""}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`gd-control tt-ui inline-flex h-10 items-center justify-between gap-2 rounded-full px-3 text-xs font-bold text-white/90 ${
          mobile ? "w-full" : "min-w-[90px]"
        }`}
        data-active={isOpen ? "true" : "false"}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        style={SYSTEM_CONTROL_FONT_STYLE}
      >
        <span className="inline-flex items-center gap-1.5">
          <FlagIcon locale={locale} />
          <span>{activeLabel}</span>
        </span>
        <svg
          viewBox="0 0 20 20"
          className={`h-4 w-4 text-white/70 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m5 7.5 5 5 5-5" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="gd-dropdown-panel absolute right-0 top-[calc(100%+8px)] z-[70] w-[132px] rounded-xl p-1.5"
          >
            <div role="listbox" aria-label="Select language" className="space-y-1">
              {LOCALE_OPTION_ORDER.map((loc) => {
                const active = loc === locale;
                const supported = locales.includes(loc);
                const label = LOCALE_LABELS[loc] ?? loc.toUpperCase();

                return (
                  <button
                    key={loc}
                    type="button"
                    role="option"
                    aria-selected={active}
                    disabled={!supported}
                    onClick={() => {
                      if (!supported) return;
                      setIsOpen(false);
                      onChange(loc);
                    }}
                    className={`tt-ui flex h-9 w-full items-center justify-between rounded-lg px-3 text-xs font-bold transition ${
                      active
                        ? "gd-option gd-option-active shadow-glow-green"
                        : supported
                          ? "gd-option"
                          : "cursor-not-allowed text-white/35"
                    }`}
                    style={SYSTEM_CONTROL_FONT_STYLE}
                  >
                    <span className="inline-flex items-center gap-2">
                      <FlagIcon locale={loc} />
                      <span>{label}</span>
                    </span>
                    {active ? (
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m3.5 8.5 3 3 6-7" />
                      </svg>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FlagIcon({
  locale,
  className = "h-3.5 w-5",
}: {
  locale: string;
  className?: string;
}) {
  const src = LOCALE_FLAG_FILES[locale] ?? "/flags/ge.svg";

  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex overflow-hidden rounded-[4px] ring-1 ring-white/20 shadow-[0_1px_8px_rgba(0,0,0,0.28)] ${className}`}
    >
      <Image
        src={src}
        alt=""
        width={20}
        height={14}
        className="h-full w-full object-cover"
        unoptimized
      />
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.0) 55%)",
        }}
      />
    </span>
  );
}
