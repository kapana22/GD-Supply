import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { NextIntlClientProvider, createTranslator } from "next-intl";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getMessages, setRequestLocale } from "next-intl/server";
import { defaultLocale, locales } from "@/lib/i18n";
import { notoSansGeorgian, contractica, contracticaCaps } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { SiteAmbientBackground } from "@/components/layout/SiteAmbientBackground";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MobileCallBar } from "@/components/ui/MobileCallBar";
import "../globals.css";

const StartupLoader = dynamic(
  () => import("@/components/ui/StartupLoader").then((mod) => mod.StartupLoader),
  { ssr: false },
);

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale ?? defaultLocale;
  if (!locales.includes(locale as (typeof locales)[number])) return {};

  const messages = await getMessages();
  const t = createTranslator({ locale, messages, namespace: "seo" });
  const base = "https://gdsupply.ge";
  const canonical = `${base}/${locale}`;
  const languages = locales.reduce<Record<string, string>>((acc, loc) => {
    acc[loc] = `${base}/${loc}`;
    return acc;
  }, {});

  return {
    metadataBase: new URL("https://gdsupply.ge"),
    title: {
      default: t("title"),
      template: "%s | GD Supply",
    },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://gdsupply.ge",
      siteName: "GD Supply",
      type: "website",
    },
    alternates: {
      canonical,
      languages,
    },
  };
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = params.locale ?? defaultLocale;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={`${notoSansGeorgian.variable} ${contractica.variable} ${contracticaCaps.variable} relative min-h-screen font-sans antialiased`}
      >
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
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4010055002657501');
            fbq('track', 'PageView');
          `}
        </Script>
        <Script id="gd-ld-json" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "GD Supply",
            url: "https://gdsupply.ge",
            logo: "https://gdsupply.ge/images/logo.png",
            telephone: "+995 599 705 697",
            sameAs: ["https://www.facebook.com/GDSupply1", "https://www.linkedin.com/"],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Tbilisi",
              addressCountry: "GE",
            },
          })}
        </Script>
        <StartupLoader />
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=4010055002657501&ev=PageView&noscript=1"
            alt="facebook pixel"
          />
        </noscript>
      </body>
    </html>
  );
}
