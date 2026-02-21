"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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

  const phone = tContact("alt.phone");
  const email = tContact("alt.email");
  const location = tContact("alt.location");

  const services = (tServices.raw("items") as ServiceItem[]).map((service) => ({
    label: service.title,
    href: `/${locale}/services#${service.key}`,
  }));

  const companyLinks = [
    { label: "ჩვენ შესახებ", href: `/${locale}/about` },
    { label: "პორტფოლიო", href: `/${locale}/portfolio` },
    { label: "FAQ", href: `/${locale}/#faq` },
    { label: "ბლოგი", href: `/${locale}/blog` },
    { label: "კონტაქტი", href: `/${locale}/contact` },
  ];

  const contacts: FooterContact[] = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11 19.79 19.79 0 01.12 2.38 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
        </svg>
      ),
      text: phone,
      href: `tel:${phone.replaceAll(" ", "")}`,
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      text: email,
      href: `mailto:${email}`,
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      text: location,
      href: "#",
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-gd-surface">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-2 md:px-10 xl:grid-cols-4">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="GD Supply" width={40} height={40} className="h-10 w-10 object-contain" />
            <div className="leading-tight">
              <p className="text-sm font-extrabold tracking-[0.14em] text-white">GD SUPPLY</p>
              <p className="text-xs text-white/60">{tFooter("tagline")}</p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-gd-muted">
            Premium Dark Construction სტილი, ევროპული მასალები და QA/QC ყველა ეტაპზე.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <a
              className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">სერვისები</p>
          <div className="grid gap-2 text-sm">
            {services.slice(0, 6).map((item) => (
              <Link key={item.href} href={item.href} className="text-white/75 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">კომპანია</p>
          <div className="grid gap-2 text-sm">
            {companyLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-white/75 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">კონტაქტი</p>
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

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/55">{tFooter("copyright")}</div>
    </footer>
  );
}
