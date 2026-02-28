"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useCountUp } from "@/hooks/useCountUp";

type StoryHighlight = {
  label: string;
  value: string;
};

type IntroStatItem = {
  value: number;
  suffix: string;
  label: string;
};

type ValueIconKey = "shield" | "medal" | "eye" | "warranty";

type ValueItem = {
  title: string;
  body: string;
  icon: ValueIconKey;
};

type ProcessStep = {
  title: string;
  body: string;
};

type TeamMember = {
  initials: string;
  role: string;
  description: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const STAT_CLASSES = [
  "border-b border-r border-white/12 md:border-b-0 xl:border-b xl:border-r",
  "border-b border-white/12 md:border-b-0 md:border-r md:border-white/12 xl:border-b xl:border-r-0 xl:border-white/12",
  "border-r border-white/12 md:border-r xl:border-r",
  "",
] as const;

const VALUE_ICONS: Record<ValueIconKey, () => JSX.Element> = {
  shield: ShieldIcon,
  medal: MedalIcon,
  eye: EyeIcon,
  warranty: WarrantyIcon,
};

export function AboutPage({ locale }: { locale: string }) {
  const t = useTranslations("about_page");

  const storyHighlights = normalizeStoryHighlights(t.raw("story.highlights"));
  const introStats = normalizeIntroStats(t.raw("intro_stats.items"));
  const values = normalizeValues(t.raw("values.items"), t.raw("values"));
  const processSteps = normalizeProcessSteps(t.raw("process.steps"));
  const team = normalizeTeamMembers(t.raw("team.items"));
  const partners = normalizePartnerNames(t.raw("partners.items"));

  return (
    <div className="relative">
      <motion.section {...fadeUp} className="gd-section-divider-bottom py-16 md:py-24">
        <div className="gd-container">
          <p className="text-sm text-white/60">
            <Link href={`/${locale}`} className="hover:text-white">
              {t("breadcrumbs.home")}
            </Link>{" "}
            <span className="mx-2 text-white/35">/</span>
            <span className="text-white/85">{t("breadcrumbs.current")}</span>
          </p>
          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">{t("hero.title")}</h1>
          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-white/65">{t("hero.subtitle")}</p>
        </div>
      </motion.section>

      <motion.section id="about-story" {...fadeUp} className="gd-section-divider py-16 md:py-24">
        <div className="gd-container grid items-stretch gap-6 xl:grid-cols-12 xl:gap-8">
          <div className="relative h-full overflow-hidden rounded-2xl border border-white/18 bg-[linear-gradient(180deg,rgba(11,16,31,0.88),rgba(11,16,31,0.72))] p-6 shadow-[0_24px_60px_rgba(3,6,16,0.4),inset_0_1px_0_rgba(255,255,255,0.08),0_0_38px_rgba(23,109,72,0.10)] backdrop-blur-xl md:p-8 lg:p-10 xl:col-span-7">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(640px_200px_at_8%_0%,rgba(255,255,255,0.08),transparent_72%),radial-gradient(540px_220px_at_95%_6%,rgba(23,109,72,0.20),transparent_76%),linear-gradient(120deg,rgba(255,255,255,0.03)_0%,transparent_36%,transparent_64%,rgba(28,184,121,0.06)_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)]" />
            <div className="pointer-events-none absolute inset-x-[12%] bottom-0 h-[2px] bg-[linear-gradient(90deg,transparent,rgba(28,184,121,0.0),rgba(28,184,121,0.75),rgba(28,184,121,0.0),transparent)]" />

            <p className="relative text-xs font-extrabold uppercase tracking-[0.18em] text-[#1CB879]">
              {t("story.eyebrow")}
            </p>
            <h2 className="relative mt-3 text-2xl font-black text-white md:text-3xl">{t("story.title")}</h2>
            <p className="relative mt-4 text-base leading-relaxed text-white/82">{t("story.body")}</p>

            <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
              {storyHighlights.map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/60">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/90">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-full xl:col-span-5">
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-[linear-gradient(180deg,rgba(11,16,31,0.9),rgba(11,16,31,0.74))] shadow-[0_24px_60px_rgba(3,6,16,0.46),inset_0_1px_0_rgba(255,255,255,0.11),0_0_44px_rgba(23,109,72,0.12)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(620px_220px_at_5%_0%,rgba(255,255,255,0.08),transparent_72%),radial-gradient(520px_220px_at_96%_8%,rgba(23,109,72,0.22),transparent_74%),linear-gradient(120deg,rgba(255,255,255,0.03)_0%,transparent_40%,transparent_62%,rgba(23,109,72,0.06)_100%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.10),rgba(28,184,121,0.35),rgba(255,255,255,0.10),transparent)]" />
              <div className="pointer-events-none absolute left-[18%] right-[18%] bottom-0 h-[2px] bg-[linear-gradient(90deg,transparent,rgba(28,184,121,0.0),rgba(28,184,121,0.7),rgba(28,184,121,0.0),transparent)]" />

              <div className="relative px-5 pb-2 pt-4 md:px-6">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary-green">
                  {t("intro_stats.eyebrow")}
                </p>
                <p className="mt-1 text-sm text-white/68">{t("intro_stats.subtitle")}</p>
              </div>

              <div className="relative grid grow grid-cols-2 md:grid-cols-4 xl:grid-cols-2">
                {introStats.map((item, index) => (
                  <IntroStat
                    key={`${item.label}-${index}`}
                    value={item.value}
                    suffix={item.suffix}
                    label={item.label}
                    duration={1500 + index * 180}
                    className={STAT_CLASSES[index] ?? ""}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section id="about-values" {...fadeUp} className="gd-section-divider py-16 md:py-24">
        <div className="gd-container">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#1CB879]">{t("values.eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">{t("values.title")}</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {values.map((item) => {
              const Icon = VALUE_ICONS[item.icon] ?? ShieldIcon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1.5"
                >
                  <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-primary-green transition duration-300 group-hover:scale-x-100" />
                  <div className="text-white/90">
                    <Icon />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{item.body}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section id="about-process" {...fadeUp} className="gd-section-divider py-16 md:py-24">
        <div className="gd-container">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#1CB879]">{t("process.eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">{t("process.title")}</h2>

          <div className="relative mt-10 hidden md:block">
            <div className="absolute left-0 right-0 top-4 h-px bg-white/20" />
            <motion.div
              className="absolute left-0 top-4 h-px bg-primary-green"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1 }}
              style={{ width: "100%" }}
            />

            <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${processSteps.length}, minmax(0, 1fr))` }}>
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative pt-10">
                  <div className="absolute left-0 top-0 h-8 w-8 rounded-full border border-primary-green bg-[#1A1C33] text-center text-sm font-bold leading-8 text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-8 md:hidden">
            <div className="absolute left-4 top-0 h-full w-px bg-white/20" />
            <motion.div
              className="absolute left-4 top-0 w-px bg-primary-green"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1 }}
              style={{ height: "100%" }}
            />

            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative pl-12">
                  <div className="absolute left-0 top-0 h-8 w-8 rounded-full border border-primary-green bg-[#1A1C33] text-center text-sm font-bold leading-8 text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section id="about-team" {...fadeUp} className="gd-section-divider py-16 md:py-24">
        <div className="gd-container">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#1CB879]">{t("team.eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">{t("team.title")}</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {team.map((member) => (
              <motion.article
                key={member.role}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="grid h-14 w-14 place-items-center rounded-full border border-primary-green bg-primary-green/20 text-lg font-black text-white">
                  {member.initials}
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">{member.role}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{member.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="gd-section-divider py-16 md:py-24">
        <div className="gd-container">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#1CB879]">
            {t("partners.title")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {partners.map((brand) => (
              <span
                key={brand}
                className="text-lg font-semibold text-white/35 grayscale transition hover:text-white hover:grayscale-0"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp} className="gd-section-divider py-16 md:py-24">
        <div className="gd-container">
          <div className="rounded-3xl px-6 py-12 md:px-12" style={{ background: "linear-gradient(135deg, #176D48, #0f4d34)" }}>
            <h2 className="text-3xl font-black text-white md:text-5xl">{t("cta.title")}</h2>
            <p className="mt-4 max-w-2xl text-base text-white/85">{t("cta.body")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/contact`}
                className="btn-primary inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-bold text-white"
              >
                {t("cta.primary")}
              </Link>
              <Link
                href={`/${locale}/services`}
                className="btn-secondary inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-bold text-white"
              >
                {t("cta.secondary")}
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

const FALLBACK_STORY_HIGHLIGHTS: StoryHighlight[] = [
  { label: "გამოცდილება", value: "6+ წელი" },
  { label: "პროექტები", value: "300+" },
  { label: "გარანტია", value: "10 წელი" },
];

const FALLBACK_INTRO_STATS: IntroStatItem[] = [
  { value: 6, suffix: "+", label: "გამოცდილება" },
  { value: 300, suffix: "+", label: "პროექტი" },
  { value: 10, suffix: "+", label: "წელი გარანტია" },
  { value: 100, suffix: "%", label: "კმაყოფილება" },
];

const FALLBACK_VALUES: ValueItem[] = [
  {
    title: "სისტემური მიდგომა",
    body: "ვმუშაობთ სტანდარტებით და დეტალური კონტროლით.",
    icon: "shield",
  },
  {
    title: "პროფესიონალური გუნდი",
    body: "მრავალწლიანი პრაქტიკა საცხოვრებელ და კომერციულ პროექტებში.",
    icon: "medal",
  },
  {
    title: "სრული გამჭვირვალობა",
    body: "ეტაპები, ვადები და ბიუჯეტი შეთანხმებულია წინასწარ.",
    icon: "eye",
  },
  {
    title: "რეალური გარანტია",
    body: "სამუშაოს ჩაბარების შემდეგ იღებთ ოფიციალურ 10-წლიან გარანტიას.",
    icon: "warranty",
  },
];

const FALLBACK_PROCESS_STEPS: ProcessStep[] = [
  { title: "ინსპექცია", body: "ობიექტის შეფასება და პრობლემის დიაგნოსტიკა." },
  { title: "სისტემის შერჩევა", body: "ობიექტისთვის ოპტიმალური ტექნოლოგიის განსაზღვრა." },
  { title: "მომზადება", body: "ზედაპირის ტექნოლოგიურად სწორი დამუშავება." },
  { title: "შესრულება", body: "სისტემის მონტაჟი ხარისხის კონტროლით." },
  { title: "ჩაბარება", body: "ფინალური ტესტირება და გარანტიის დოკუმენტაცია." },
];

const FALLBACK_TEAM: TeamMember[] = [
  {
    initials: "GD",
    role: "ტექნიკური გუნდი",
    description: "პრაქტიკული გამოცდილება სხვადასხვა ტიპის ობიექტებზე.",
  },
  {
    initials: "PM",
    role: "პროექტ მენეჯმენტი",
    description: "ვადების, რესურსებისა და ხარისხის მკაცრი კონტროლი.",
  },
  {
    initials: "QA",
    role: "ხარისხის კონტროლი",
    description: "ფინალური შედეგის შემოწმება ჩაბარებამდე.",
  },
];

const FALLBACK_PARTNERS = ["Tekno", "Sika", "Baumit", "Mapei", "Ceresit", "Weber"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeStoryHighlights(raw: unknown): StoryHighlight[] {
  if (!Array.isArray(raw)) return FALLBACK_STORY_HIGHLIGHTS;

  const next = raw
    .filter(isRecord)
    .map((item) => ({
      label: typeof item.label === "string" ? item.label : "",
      value: typeof item.value === "string" ? item.value : "",
    }))
    .filter((item) => item.label || item.value);

  return next.length > 0 ? next : FALLBACK_STORY_HIGHLIGHTS;
}

function normalizeIntroStats(raw: unknown): IntroStatItem[] {
  if (!Array.isArray(raw)) return FALLBACK_INTRO_STATS;

  const next = raw
    .filter(isRecord)
    .map((item) => ({
      value: typeof item.value === "number" ? item.value : Number(item.value ?? 0),
      suffix: typeof item.suffix === "string" ? item.suffix : "",
      label: typeof item.label === "string" ? item.label : "",
    }))
    .filter((item) => Number.isFinite(item.value) && item.label);

  return next.length > 0 ? next : FALLBACK_INTRO_STATS;
}

function normalizeValues(rawItems: unknown, rawLegacy?: unknown): ValueItem[] {
  if (Array.isArray(rawItems)) {
    const next = rawItems
      .filter(isRecord)
      .map((item) => ({
        title: typeof item.title === "string" ? item.title : "",
        body: typeof item.body === "string" ? item.body : "",
        icon: typeof item.icon === "string" && item.icon in VALUE_ICONS ? (item.icon as ValueIconKey) : "shield",
      }))
      .filter((item) => item.title);

    if (next.length > 0) return next;
  }

  if (Array.isArray(rawLegacy)) {
    const iconKeys: ValueIconKey[] = ["shield", "medal", "eye", "warranty"];
    const next = rawLegacy
      .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
      .slice(0, 4)
      .map((title, index) => ({
        title,
        body: "",
        icon: iconKeys[index % iconKeys.length],
      }));

    if (next.length > 0) return next;
  }

  return FALLBACK_VALUES;
}

function normalizeProcessSteps(raw: unknown): ProcessStep[] {
  if (!Array.isArray(raw)) return FALLBACK_PROCESS_STEPS;

  const next = raw
    .filter(isRecord)
    .map((item) => ({
      title: typeof item.title === "string" ? item.title : "",
      body: typeof item.body === "string" ? item.body : "",
    }))
    .filter((item) => item.title);

  return next.length > 0 ? next : FALLBACK_PROCESS_STEPS;
}

function normalizeTeamMembers(raw: unknown): TeamMember[] {
  if (!Array.isArray(raw)) return FALLBACK_TEAM;

  const next = raw
    .filter(isRecord)
    .map((item) => ({
      initials: typeof item.initials === "string" ? item.initials : "GD",
      role: typeof item.role === "string" ? item.role : "",
      description: typeof item.description === "string" ? item.description : "",
    }))
    .filter((item) => item.role);

  return next.length > 0 ? next : FALLBACK_TEAM;
}

function normalizePartnerNames(raw: unknown): string[] {
  if (!Array.isArray(raw)) return FALLBACK_PARTNERS;

  const next = raw.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  return next.length > 0 ? next : FALLBACK_PARTNERS;
}

function IntroStat({
  value,
  suffix,
  label,
  duration,
  className = "",
}: {
  value: number;
  suffix: string;
  label: string;
  duration: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { count, trigger } = useCountUp(value, duration);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [trigger]);

  return (
    <div
      ref={ref}
      className={`group relative flex min-h-[104px] flex-col items-center justify-center bg-transparent px-4 py-5 text-center md:min-h-[118px] md:px-5 md:py-6 ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="flex items-baseline justify-center gap-0.5">
        <span className="font-sans text-[34px] font-black leading-none tracking-tight text-[var(--gd-accent-bright)] drop-shadow-[0_6px_20px_rgba(23,109,72,0.44)] tabular-nums md:text-[46px]">
          {count}
        </span>
        {suffix ? (
          <span className="font-sans text-[22px] font-black leading-none tracking-tight text-[var(--gd-accent-bright)] drop-shadow-[0_4px_16px_rgba(23,109,72,0.34)] md:text-[28px]">
            {suffix}
          </span>
        ) : null}
      </div>
      <p className="tt-label mt-1.5 text-white/88">{label}</p>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3l7 3v6c0 4.5-2.8 7.7-7 9-4.2-1.3-7-4.5-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function MedalIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="9" r="4.5" />
      <path d="M9 14.8 7 21l5-2.2L17 21l-2-6.2" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
      <path d="M16.5 5.5 19 3" />
    </svg>
  );
}

