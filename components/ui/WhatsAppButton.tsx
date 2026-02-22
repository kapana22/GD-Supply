"use client";

import { useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  const href = "https://wa.me/995555656503?text=%E1%83%92%E1%83%90%E1%83%9B%E1%83%90%E1%83%A0%E1%83%AF%E1%83%9D%E1%83%91%E1%83%90%20GD%20Supply";

  return (
    <div className="whatsapp-float fixed bottom-6 right-6 z-50">
      <a href={href} className="group relative block" aria-label={t("label")}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-gd-whatsapp/35 blur-md animate-pulse-soft"
        />

        <span className="pointer-events-none absolute right-16 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-4 py-2 text-xs font-semibold text-white opacity-0 shadow-elevated backdrop-blur transition group-hover:opacity-100 sm:block">
          {t("label")}
        </span>

        <span className="relative grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-gd-whatsapp text-white shadow-elevated ring-1 ring-black/5 transition group-hover:-translate-y-0.5">
          <span className="pointer-events-none absolute inset-[6px] rounded-full border border-white/12" aria-hidden="true" />
          <WhatsAppIcon className="relative h-7 w-7 drop-shadow-[0_1px_6px_rgba(0,0,0,0.18)]" />
        </span>
      </a>
    </div>
  );
}
