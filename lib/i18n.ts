// Keep next-intl routing in place, but ship Georgian-only for now.
export const locales = ["ka", "en", "ru"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ka";
