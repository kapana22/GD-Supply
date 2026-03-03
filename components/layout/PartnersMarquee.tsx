"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { PARTNER_LOGOS } from "@/components/data/partners";

const LOOP_LOGOS = [...PARTNER_LOGOS, ...PARTNER_LOGOS];
const MARQUEE_DURATION_S = Math.max(42, PARTNER_LOGOS.length * 4.2);

export function PartnersMarquee() {
  const t = useTranslations("partners");
  const { locale } = useParams() as { locale: string };

  return (
    <section className="gd-cv-auto gd-section-divider relative py-10 md:py-12">
      <div className="gd-container">
        <p className="tt-label text-xs font-extrabold uppercase tracking-[0.08em] text-primary-green">
          {t("eyebrow")}
        </p>
        <h2 className="tt-heading-lg mt-2 font-extrabold text-white">
          {t("title")}
        </h2>

        <div className="partners-marquee-mask mt-6">
          <div
            className="partners-marquee-track"
            style={{ ["--partners-marquee-duration" as string]: `${MARQUEE_DURATION_S}s` }}
          >
            {LOOP_LOGOS.map((logo, index) => (
              <div key={`${logo.src}-${index}`} className="partners-logo-tile">
                <div className="partners-logo-frame bg-white">
                  <Image
                    src={logo.src}
                    alt={t("logo_alt", { name: logo.alt })}
                    fill
                    sizes="180px"
                    className="partners-logo-image"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-start">
          <Link
            href={`/${locale}/partners`}
            className="btn-secondary tt-ui inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold"
          >
            {t("view_all")}
          </Link>
        </div>
      </div>
    </section>
  );
}
