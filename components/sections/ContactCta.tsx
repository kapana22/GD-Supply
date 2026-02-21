"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
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
  const waHref = "https://wa.me/995599705697?text=გამარჯობა%20GD%20Supply";

  return (
    <section className="rounded-3xl border border-white/10 bg-gd-surface/55 px-6 py-10 shadow-2xl shadow-black/40 backdrop-blur md:px-10">
      <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-start">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-green">კონტაქტი</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">{title}</h2>
          <p className="text-sm leading-relaxed text-white/70 md:text-base">{subtitle}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center rounded-full bg-primary-green px-6 py-3 text-sm font-semibold text-white shadow-glow-green transition hover:translate-y-0.5"
            >
              კონტაქტის ფორმა →
            </Link>
            <a
              href={waHref}
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              WhatsApp →
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
            <Row label="ტელეფონი" value={phone} href={`tel:${phone.replaceAll(" ", "")}`} />
            <Row label="ელ-ფოსტა" value={email} href={`mailto:${email}`} />
            <Row label="ლოკაცია" value={location} />
            <Row label="WhatsApp" value={whatsapp} href={waHref} />
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">სამუშაო საათები</p>
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
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">{label}</span>
      <span className="text-sm font-extrabold text-white">{value}</span>
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
