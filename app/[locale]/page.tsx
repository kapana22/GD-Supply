import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Calculator } from "@/components/sections/Calculator";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
// import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { ContactSection } from "@/components/sections/ContactSection";
import RoofVideoSection from "@/components/sections/RoofVideoSection";

export default async function HomePage() {
  const tHero = await getTranslations("hero");
  const tServices = await getTranslations("services");
  const tPortfolio = await getTranslations("portfolio");
  const tNav = await getTranslations("navigation");
  // const tTestimonials = await getTranslations("testimonials");
  const tFaq = await getTranslations("faq");

  const heroStats = tHero.raw("stats") as Array<{ value: string; label: string }>;
  const services = tServices.raw("items") as Array<{ key: string; title: string; body: string }>;
  const filters = tPortfolio.raw("filters") as string[];
  const projects = tPortfolio.raw("projects") as Array<{
    name: string;
    work: string;
    area: string;
    material: string;
    duration: string;
    tags: string[];
    image?: string;
  }>;
  // const testimonials = tTestimonials.raw("items") as Array<{ quote: string; author: string; meta: string }>;
  const faq = tFaq.raw("items") as Array<{ q: string; a: string }>;

  return (
    <main className="relative">
      <Hero
        eyebrow={tHero("badge")}
        title={tHero("title")}
        subtitle={tHero("subtitle")}
        ctaPrimary={tHero("cta_estimate")}
        ctaSecondary={tHero("cta_projects")}
        stats={heroStats}
      />

      <ServicesOverview title={tServices("title")} subtitle={tServices("subtitle")} items={services} />

      <Calculator />

      <PortfolioGrid
        title={tPortfolio("title")}
        subtitle={tPortfolio("subtitle")}
        label={tNav("portfolio")}
        filters={filters}
        projects={projects}
        maxItems={6}
        showFilters={false}
        enableModal={false}
      />

      <RoofVideoSection />

      {/* <Testimonials title={tTestimonials("title")} items={testimonials} /> */}

      <Faq title={tFaq("title")} items={faq} />

      <ContactSection />
    </main>
  );
}
