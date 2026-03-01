"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { PhoneCall } from "@phosphor-icons/react";

export function MobileCallBar() {
  const t = useTranslations("mobile_call");
  const phone = t("phone_number");
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 1500);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      if (window.innerWidth > 768) return;

      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      if (isScrollingDown && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="mobileCallBar"
      className={[
        "mobile-call-bar",
        ready ? "is-ready" : "",
        hidden ? "is-hidden" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <a
        href={`tel:${phone.replace(/\s+/g, "")}`}
        className="mobile-call-btn tt-ui"
        aria-label={t("aria_label", { phone })}
      >
        <PhoneCall size={18} weight="duotone" aria-hidden="true" />
        <span>{t("cta", { phone })}</span>
      </a>
    </div>
  );
}
