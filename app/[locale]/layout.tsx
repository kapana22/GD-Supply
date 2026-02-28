import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getMessages, setRequestLocale } from "next-intl/server";
import { defaultLocale, locales } from "@/lib/i18n";
import { notoSansGeorgian } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { SiteAmbientBackground } from "@/components/layout/SiteAmbientBackground";
import { PartnersMarquee } from "@/components/layout/PartnersMarquee";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MobileCallBar } from "@/components/ui/MobileCallBar";
import "../globals.css";

const StartupLoader = dynamic(
  () => import("@/components/ui/StartupLoader").then((mod) => mod.StartupLoader),
  { ssr: false },
);

export const metadata: Metadata = {
  metadataBase: new URL("https://gdsupply.ge"),
  title: {
    default:
      "GD Supply — ჰიდროიზოლაცია თბილისი | სახურავი, ტერასა, საძირკველი",
    template: "%s | GD Supply",
  },
  description:
    "GD Supply — 6+ წლიანი გამოცდილების მქონე ჰიდროიზოლაციის კომპანია საქართველოში. სახურავი, ტერასა, საძირკველი, ინდუსტრიული იატაკი. უფასო ინსპექცია. 10+ წლიანი გარანტია.",
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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-LRNX71WTRT"
        strategy="afterInteractive"
      />
      <Script id="ga-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LRNX71WTRT');
        `}
      </Script>
      <body
        className={`${notoSansGeorgian.variable} relative min-h-screen font-sans antialiased`}
      >
        <StartupLoader />
        <SiteAmbientBackground />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="relative z-10">
            <Navbar />
            <div className="relative pt-[84px]">{children}</div>
            <PartnersMarquee />
            <Footer />
            <WhatsAppButton />
            <MobileCallBar />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

