"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const ROOF_SHOWCASE_VIDEO =
  "/assets/%E1%83%A1%E1%83%90%E1%83%AE%E1%83%A3%E1%83%A0%E1%83%90%E1%83%95%E1%83%94%E1%83%91%E1%83%98%E1%83%A1%E1%83%95%E1%83%98%E1%83%93%E1%83%94%E1%83%9D.mp4";

export default function RoofVideoSection() {
  const locale = useLocale();
  const t = useTranslations("roof_video");

  const heading = locale === "ka" ? "სახურავისა და ტერასის ჰიდროიზოლაცია" : t("title");
  const primaryCta = locale === "ka" ? "დაგვიკავშირდით!" : t("cta_primary");
  const secondaryCta = locale === "ka" ? "იხილე სერვისები" : t("cta_secondary");

  return (
    <section className="gd-section-divider relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-[360px] overflow-hidden md:h-[440px] lg:h-[520px]"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/hero-poster.jpg"
        >
          <source src={ROOF_SHOWCASE_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,20,52,0.26)_0%,rgba(7,29,78,0.48)_44%,rgba(8,18,46,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(74%_72%_at_50%_46%,rgba(46,146,255,0.22),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(56%_54%_at_14%_18%,rgba(130,193,255,0.18),transparent_72%)]" />

        <div className="relative z-10 gd-container flex h-full flex-col items-center justify-center text-center">
          <h2 className="tt-heading-xl max-w-none text-white drop-shadow-[0_8px_24px_rgba(4,10,28,0.55)] md:whitespace-nowrap">
            {heading}
          </h2>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <a
              href={`/${locale}/contact`}
              className="btn-primary tt-ui inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold"
            >
              {primaryCta}
            </a>
            <a
              href={`/${locale}/services`}
              className="btn-secondary tt-ui inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold"
            >
              {secondaryCta}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
