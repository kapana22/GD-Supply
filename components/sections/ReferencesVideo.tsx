"use client";

import { useTranslations } from "next-intl";

const YOUTUBE_SRC = "https://www.youtube.com/embed/Bp8nbesDVEQ";

export function ReferencesVideo() {
  const t = useTranslations("portfolio");

  return (
    <section className="gd-section-divider py-[68px] md:py-[96px]">
      <div className="gd-container space-y-6 md:space-y-8">
        <div className="space-y-3 md:space-y-4">
          <h2 className="tt-heading-lg font-extrabold text-white">{t("video.title")}</h2>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/12 bg-[#0f1124]/75 shadow-[0_24px_60px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur">
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={YOUTUBE_SRC}
              title="GD Supply process video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
