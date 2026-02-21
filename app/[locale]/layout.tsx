import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { defaultLocale, locales } from "@/lib/i18n";
import { inter, notoSansGeorgian } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MobileCallBar } from "@/components/ui/MobileCallBar";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "GD Supply — ჰიდროიზოლაცია თბილისი | სახურავი, ტერასა, საძირკველი",
    template: "%s | GD Supply",
  },
  description:
    "GD Supply — 10 წლიანი გამოცდილების მქონე ჰიდროიზოლაციის კომპანია საქართველოში. სახურავი, ტერასა, საძირკველი, აუზი, ინდუსტრიული იატაკი. უფასო ინსპექცია. 3 წლიანი გარანტია.",
};

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = params.locale ?? defaultLocale;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  // Enable static rendering by setting the locale for this request
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${notoSansGeorgian.variable} font-georgian antialiased`}
      >
        <div className="pointer-events-none fixed inset-0 bg-grid-faint opacity-[0.10] [background-size:72px_72px]" />
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(900px_600px_at_60%_0%,rgba(23,109,72,0.20),transparent_60%)] opacity-70" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <div className="relative pt-[84px]">{children}</div>
          <Footer />
          <WhatsAppButton />
          <MobileCallBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

