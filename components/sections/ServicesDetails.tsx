"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";

type ServiceSubsection = {
  title: string;
  description?: string;
  products?: string[];
  image?: string;
};

type ServiceItem = {
  key: string;
  group?: string;
  tabLabel?: string;
  title: string;
  body: string;
  image?: string;
  materials?: string[];
  includes?: string[];
  variants?: string[];
  subsections?: ServiceSubsection[];
};

type ProcessStep = { title: string; body: string };

const SERVICE_IMAGE_MAP: Record<string, string> = {
  roof_terrace: "/assets/services/flat-roof.jpg",
  flat_roof: "/assets/services/flat-roof.jpg",
  terrace: "/assets/services/terrace.jpg",
  foundation: "/assets/services/foundation.jpg",
  pool: "/assets/services/pool.jpg",
  industrial_floor: "/assets/services/industrial-floor.jpg",
  materials: "/assets/services/materials.jpg",
};

export function ServicesDetails({
  title,
  subtitle,
  items,
  processTitle,
  processSubtitle,
  steps,
}: {
  title: string;
  subtitle: string;
  items: ServiceItem[];
  processTitle: string;
  processSubtitle: string;
  steps: ProcessStep[];
}) {
  const locale = useLocale();
  const [activeKey, setActiveKey] = useState(items[0]?.key ?? "");

  useEffect(() => {
    if (!items.length) return;
    if (!items.some((item) => item.key === activeKey)) {
      setActiveKey(items[0].key);
    }
  }, [items, activeKey]);

  const activeItem = items.find((item) => item.key === activeKey) ?? items[0] ?? null;

  return (
    <div className="relative">
      <section className="py-[60px] md:py-[100px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="mb-10 md:mb-12">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
              სერვისები
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-4xl text-base leading-relaxed text-gd-muted">
              {subtitle}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gd-panel p-4 shadow-elevated md:p-6">
            <div className="overflow-x-auto pb-1">
              <div className="inline-flex min-w-full gap-2">
                {items.map((item) => {
                  const isActive = item.key === activeKey;

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActiveKey(item.key)}
                      className="relative shrink-0 overflow-hidden rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-primary-green/40 hover:text-white"
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="services-tab-active"
                          className="absolute inset-0 border border-primary-green/40 bg-primary-green/15"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      ) : null}
                      <span className={`relative whitespace-nowrap ${isActive ? "text-white" : ""}`}>
                        {item.tabLabel ?? item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-gd-surface p-4 md:p-6">
              <AnimatePresence mode="wait" initial={false}>
                {activeItem ? (
                  <motion.div
                    key={activeItem.key}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ServiceTabContent item={activeItem} locale={locale} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-gd-surface py-[60px] md:py-[100px]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.10] bg-dots [background-size:18px_18px]" />
        <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="mb-10 md:mb-12">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
              პროცესი
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {processTitle}
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-gd-muted">
              {processSubtitle}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {steps.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="rounded-xl border border-white/10 bg-gd-panel p-6 shadow-elevated"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">
                    ეტაპი {idx + 1}
                  </p>
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-green text-xs font-extrabold text-white shadow-glow-green">
                    {idx + 1}
                  </span>
                </div>
                <p className="mt-4 text-sm font-extrabold text-white">{s.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-gd-muted">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceTabContent({ item, locale }: { item: ServiceItem; locale: string }) {
  const hasSubsections = Boolean(item.subsections && item.subsections.length > 0);

  if (hasSubsections) {
    return <CompositeServiceTab item={item} locale={locale} />;
  }

  return <SplitServiceTab item={item} locale={locale} />;
}

function SplitServiceTab({ item, locale }: { item: ServiceItem; locale: string }) {
  const image = item.image ?? SERVICE_IMAGE_MAP[item.key] ?? "/assets/services/flat-roof.jpg";

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <div className="relative h-[240px] overflow-hidden rounded-xl border border-white/10 shadow-elevated md:h-[320px]">
        <Image
          src={image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      </div>

      <div className="flex h-full flex-col">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
            {item.tabLabel ?? "სერვისი"}
          </p>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            {item.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-white/85">{item.body}</p>
        </div>

        <MaterialsBadges items={item.materials} className="mt-5" />
        <ServiceDetailLists item={item} className="mt-5" />

        <div className="mt-6">
          <Link
            href={`/${locale}/calculator`}
            className="inline-flex items-center justify-center rounded-lg border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
          >
            ფასის კალკულატორი →
          </Link>
        </div>
      </div>
    </div>
  );
}

function CompositeServiceTab({ item, locale }: { item: ServiceItem; locale: string }) {
  const subsections = item.subsections ?? [];
  const isMaterialsImport = item.key === "materials";
  const showBadges = (item.materials?.length ?? 0) > 0 && !isMaterialsImport;
  const columnsClass =
    subsections.length >= 3 ? "lg:grid-cols-3" : subsections.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1";

  return (
    <div className="grid gap-6">
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
          {item.tabLabel ?? "სერვისი"}
        </p>
        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
          {item.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-white/85">{item.body}</p>

        {showBadges ? <MaterialsBadges items={item.materials} className="mt-5" /> : null}
        <ServiceDetailLists item={item} className="mt-5" />
      </div>

      {subsections.length > 0 ? (
        <div className={`grid gap-4 ${columnsClass}`}>
          {subsections.map((sub) => (
            <SubsectionCard key={`${item.key}-${sub.title}`} sub={sub} fallbackImage={item.image} />
          ))}
        </div>
      ) : null}

      <div>
        <Link
          href={`/${locale}/calculator`}
          className="inline-flex items-center justify-center rounded-lg border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
        >
          ფასის კალკულატორი →
        </Link>
      </div>
    </div>
  );
}

function MaterialsBadges({ items, className = "" }: { items?: string[]; className?: string }) {
  if (!items || items.length === 0) return null;

  return (
    <div className={className}>
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">
        მასალები
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((material) => (
          <span
            key={material}
            className="rounded-full border border-primary-green/25 bg-primary-green/10 px-3 py-1.5 text-xs font-semibold text-white/90"
          >
            {material}
          </span>
        ))}
      </div>
    </div>
  );
}

function ServiceDetailLists({ item, className = "" }: { item: ServiceItem; className?: string }) {
  const hasIncludes = Boolean(item.includes && item.includes.length > 0);
  const hasVariants = Boolean(item.variants && item.variants.length > 0);

  if (!hasIncludes && !hasVariants) return null;

  return (
    <div className={`grid gap-4 ${className}`}>
      {hasIncludes ? <TextBulletList title="რას მოიცავს" items={item.includes ?? []} /> : null}
      {hasVariants ? <TextBulletList title="სახეობები" items={item.variants ?? []} /> : null}
    </div>
  );
}

function TextBulletList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">
        {title}
      </p>
      <ul className="mt-3 grid gap-2 text-sm text-white/85">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary-green" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SubsectionCard({
  sub,
  fallbackImage,
}: {
  sub: ServiceSubsection;
  fallbackImage?: string;
}) {
  const image = sub.image ?? fallbackImage ?? "/assets/hero-poster.jpg";
  const body = sub.description ?? (sub.products && sub.products.length > 0 ? sub.products.join(", ") : "");

  return (
    <article className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-elevated">
      <div className="relative h-48">
        <Image
          src={image}
          alt={sub.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
      <div className="p-5">
        <h4 className="text-lg font-extrabold text-white">{sub.title}</h4>
        {body ? (
          <p className="mt-3 text-sm leading-relaxed text-white/75">{body}</p>
        ) : null}
      </div>
    </article>
  );
}
