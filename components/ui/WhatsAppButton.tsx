"use client";

import { useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function WhatsAppButton() {
  const t = useTranslations("whatsapp");
  const href = "https://wa.me/995599705697?text=გამარჯობა%20GD%20Supply";

  return (
    <div className="whatsapp-float fixed bottom-6 right-6 z-50">
      <a
        href={href}
        className="group relative block"
        aria-label={`${t("label")} • ${t("subtext")}`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-gd-whatsapp/35 blur-md animate-pulse-soft"
        />

        <span className="pointer-events-none absolute right-16 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-4 py-2 text-xs font-semibold text-white opacity-0 shadow-elevated backdrop-blur transition group-hover:opacity-100 sm:block">
          {t("label")} • {t("subtext")}
        </span>

        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gd-whatsapp text-white shadow-elevated transition group-hover:-translate-y-0.5">
          <WhatsAppIcon className="h-6 w-6" />
        </span>
      </a>
    </div>
  );
}
