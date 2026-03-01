"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function ContactCta({
  title,
  subtitle,
  phone,
  email,
  location,
  whatsapp,
  hours,
}: {
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  location: string;
  whatsapp: string;
  hours: string[];
}) {
  const locale = useLocale();
  const t = useTranslations("contact_cta");
  const waHref = t("whatsapp_prefill_link", { phone: whatsapp.replace(/\s+/g, "") });

  return (
    <section className="rounded-3xl border border-white/10 bg-gd-surface/55 px-6 py-10 shadow-2xl shadow-black/40 backdrop-blur md:px-10">
      <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-start">
        <div className="space-y-4">
          <p className="tt-label text-xs font-semibold uppercase tracking-[0.2em] text-primary-green">
            {t("eyebrow")}
          </p>
          <h2 className="tt-heading-lg text-white">{title}</h2>
          <p className="tt-detail text-white/75">{subtitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/contact`}
              className="btn-primary tt-ui inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white"
            >
              {t("cta_form")}
            </Link>
            <a
              href={waHref}
              className="btn-secondary tt-ui inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
            >
              {t("cta_whatsapp")}
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-black/30"
        >
          <div className="grid gap-3 text-sm text-white/80">
            <Row label={t("labels.phone")} value={phone} href={`tel:${phone.replaceAll(" ", "")}`} />
            <Row label={t("labels.email")} value={email} href={`mailto:${email}`} />
            <Row label={t("labels.location")} value={location} />
            <Row label="WhatsApp" value={whatsapp} href={waHref} />
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="tt-label text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
              {t("labels.hours")}
            </p>
            <ul className="mt-2 space-y-1 text-sm text-white/75">
              {hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Row({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <span className="tt-label text-xs font-semibold uppercase tracking-[0.18em] text-white/55">{label}</span>
      <span className="tt-ui text-sm font-extrabold text-white">{value}</span>
    </div>
  );

  return href ? (
    <a href={href} className="block transition hover:brightness-110">
      {content}
    </a>
  ) : (
    content
  );
}
