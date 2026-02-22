"use client";

import { useEffect, useState } from "react";
import { PhoneCall } from "@phosphor-icons/react";

export function MobileCallBar() {
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
      <a href="tel:+995599705697" className="mobile-call-btn tt-ui" aria-label="დაგვიკავშირდით +995 599 705 697">
        <PhoneCall size={18} weight="duotone" aria-hidden="true" />
        <span>დაგვიკავშირდით — +995 599 705 697</span>
      </a>
    </div>
  );
}
