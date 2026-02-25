import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { defaultLocale, locales } from "@/lib/i18n";
import { contractica, contracticaCaps } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { SiteAmbientBackground } from "@/components/layout/SiteAmbientBackground";
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
    "GD Supply — 6+ წლიანი გამოცდილების მქონე ჰიდროიზოლაციის კომპანია საქართველოში. სახურავი, ტერასა, საძირკველი, აუზი, ინდუსტრიული იატაკი. უფასო ინსპექცია. 10+ წლიანი გარანტია.",
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
        className={`${contractica.variable} ${contracticaCaps.variable} relative min-h-screen font-georgian antialiased`}
      >
        <SiteAmbientBackground />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="relative z-10">
            <Navbar />
            <div className="relative pt-[84px]">{children}</div>
            <Footer />
            <WhatsAppButton />
            <MobileCallBar />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

