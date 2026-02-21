"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

type ServiceItem = { key: string; title: string };

export function Footer() {
  const { locale } = useParams() as { locale: string };
  const tFooter = useTranslations("footer");
  const tContact = useTranslations("contact");
  const tServices = useTranslations("services");

  const phone = tContact("alt.phone");
  const email = tContact("alt.email");
  const location = tContact("alt.location");

  const services = (tServices.raw("items") as ServiceItem[]).map((s) => ({
    label: s.title,
    href: `/${locale}/services#${s.key}`,
  }));

  const companyLinks = [
    { label: "ჩვენ შესახებ", href: `/${locale}/about` },
    { label: "პორტფოლიო", href: `/${locale}/portfolio` },
    { label: "FAQ", href: `/${locale}/#faq` },
    { label: "ბლოგი", href: `/${locale}/blog` },
    { label: "კონტაქტი", href: `/${locale}/contact` },
  ];

  return (
    <footer className="border-t border-white/10 bg-gd-surface">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-2 md:px-10 xl:grid-cols-4">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-white shadow-elevated ring-1 ring-black/10">
              <Image
                src="/images/logo.png"
                alt="GD Supply"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>
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
            >
              Facebook
            </a>
            <a
              className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              href="https://www.linkedin.com/"
            >
              LinkedIn
            </a>
            <a
              className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              href="https://www.instagram.com/"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">
            სერვისები
          </p>
          <div className="grid gap-2 text-sm">
            {services.slice(0, 6).map((l) => (
              <Link key={l.href} href={l.href} className="text-white/75 hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">
            კომპანია
          </p>
          <div className="grid gap-2 text-sm">
            {companyLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-white/75 hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/60">
            კონტაქტი
          </p>
          <div className="grid gap-2 text-sm text-white/75">
            <a className="hover:text-white" href={`tel:${phone.replaceAll(" ", "")}`}>
              📞 {phone}
            </a>
            <a className="hover:text-white" href={`mailto:${email}`}>
              📧 {email}
            </a>
            <span>📍 {location}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/55">
        {tFooter("copyright")}
      </div>
    </footer>
  );
}
