"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  EnvelopeSimple,
  FacebookLogo,
  LinkedinLogo,
  Phone,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

type ServiceItem = { key: string; title: string };

type FooterContact = {
  icon: JSX.Element;
  text: string;
  href: string;
};

export function Footer() {
  const { locale } = useParams() as { locale: string };
  const tFooter = useTranslations("footer");
  const tContact = useTranslations("contact");
  const tServices = useTranslations("services");
  const tNav = useTranslations("navigation");

  const phone = tContact("alt.phone");
  const phoneSecondary = tContact("alt.phone_secondary");
  const email = tContact("alt.email");
  const whatsapp = tContact("alt.whatsapp");

  const SERVICE_SLUG_MAP: Record<string, string> = {
    flat_roof: "flat-roof",
    terrace: "terrace",
    foundation: "foundation",
    industrial_floor: "industrial-floor",
    materials: "materials",
  };

  const services = (tServices.raw("items") as ServiceItem[]).map((service) => ({
    label: service.title,
    href: SERVICE_SLUG_MAP[service.key]
      ? `/${locale}/services/${SERVICE_SLUG_MAP[service.key]}`
      : `/${locale}/services`,
  }));

  const footerLinks = tFooter.raw("links") as string[];
  const companyLinks = footerLinks.map((label, idx) => {
    const hrefs = [
      `/${locale}`,
      `/${locale}/services`,
      `/${locale}/portfolio`,
      `/${locale}/about`,
      `/${locale}/blog`,
      `/${locale}/contact`,
    ];
    return { label, href: hrefs[idx] ?? `/${locale}` };
  });

  const contacts: FooterContact[] = [
    {
      icon: <Phone size={16} weight="duotone" aria-hidden="true" />,
      text: phone,
      href: `tel:${phone.replaceAll(" ", "")}`,
    },
    {
      icon: <Phone size={16} weight="duotone" aria-hidden="true" />,
      text: phoneSecondary,
      href: `tel:${phoneSecondary.replaceAll(" ", "")}`,
    },
    {
      icon: <WhatsappLogo size={16} weight="fill" aria-hidden="true" />,
      text: whatsapp,
      href: "https://wa.me/995555656503?text=Hello%20GD%20Supply",
    },
    {
      icon: <EnvelopeSimple size={16} weight="duotone" aria-hidden="true" />,
      text: email,
      href: `mailto:${email}`,
    },
  ];

  return (
    <footer className="gd-section-divider bg-gd-surface">
      <div className="gd-container grid gap-10 py-14 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="GD Supply" width={40} height={40} className="h-10 w-10 object-contain" />
            <div className="leading-tight">
              <p className="tt-label text-sm font-extrabold leading-none tracking-[0.02em] text-white">
                GD SUPPLY
              </p>
              <p className="tt-ui text-xs text-white/60">{tFooter("tagline")}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              className="tt-ui inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-primary-green/30 hover:bg-white/10 hover:text-white"
              href="https://www.facebook.com/GDSupply1"
              target="_blank"
              rel="noreferrer"
              aria-label={tFooter("social.0")}
            >
              <FacebookLogo size={14} weight="fill" aria-hidden="true" />
              {tFooter("social.0")}
            </a>
            <a
              className="tt-ui inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-primary-green/30 hover:bg-white/10 hover:text-white"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label={tFooter("social.1")}
            >
              <LinkedinLogo size={14} weight="fill" aria-hidden="true" />
              {tFooter("social.1")}
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <p className="tt-label text-xs font-extrabold uppercase tracking-[0.08em] text-white/60">
            {tNav("services")}
          </p>
          <div className="grid gap-2 text-sm">
            {services.slice(0, 6).map((item) => (
              <Link key={item.href} href={item.href} className="text-white/75 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="tt-label text-xs font-extrabold uppercase tracking-[0.08em] text-white/60">
            {tNav("about")}
          </p>
          <div className="grid gap-2 text-sm">
            {companyLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-white/75 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="tt-label text-xs font-extrabold uppercase tracking-[0.08em] text-white/60">
            {tNav("contact")}
          </p>
          <div className="grid gap-2 text-sm text-white/75">
            {contacts.map((item, index) => (
              <a key={index} href={item.href} className="footer-contact-item">
                <span className="footer-icon">{item.icon}</span>
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="gd-section-divider py-5 text-center text-xs text-white/55">{tFooter("copyright")}</div>
    </footer>
  );
}
