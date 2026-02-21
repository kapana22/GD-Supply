"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { locales } from "@/lib/i18n";

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams() as { locale: string };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || "/");
  };

  return (
    <select
      onChange={handleChange}
      value={params.locale}
      className="rounded-full border border-primary-navy/15 bg-white/80 px-3 py-2 text-xs font-semibold text-primary-navy shadow-inner shadow-primary-navy/5"
      aria-label="Select language"
    >
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {loc.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
