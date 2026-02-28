"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const ROOF_SHOWCASE_VIDEO = encodeURI("/assets/სახურავებისვიდეო.mp4");

export default function RoofVideoSection() {
  const locale = useLocale();
  const t = useTranslations("roof_video");

  return (
    <section className="relative overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/36 to-[#0f1124]/88" />
        <div className="absolute inset-0 bg-[radial-gradient(72%_68%_at_50%_46%,rgba(28,184,121,0.2),transparent_70%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1180px] flex-col items-center justify-center px-5 text-center md:px-10">
          <p className="tt-label text-primary-green">{t("badge")}</p>
          <h2 className="tt-heading-xl mt-3 text-3xl font-black text-white md:text-5xl">
            {t("title")}
          </h2>
          <p className="tt-detail mt-3 max-w-3xl text-base text-white/85 md:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={`/${locale}/services/flat-roof`}
              className="btn-primary tt-ui inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold"
            >
              {t("cta_primary")}
            </a>
            <a
              href={`/${locale}/contact`}
              className="btn-secondary tt-ui inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold"
            >
              {t("cta_secondary")}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
