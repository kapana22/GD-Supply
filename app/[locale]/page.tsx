import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Calculator } from "@/components/sections/Calculator";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { ContactSection } from "@/components/sections/ContactSection";

const KA_SERVICES = [
  { key: "flat_roof", title: "ბრტყელი სახურავი", body: "ბიტუმური მემბრანა, TPO და PVC სისტემები. 15–20 წლიანი დაცვა ნებისმიერ სეზონში." },
  { key: "terrace", title: "ტერასა და ბალკონი", body: "ელასტიური სისტემები ფილის ან ხის საფარის ქვეშ. სეზონური ტემპერატურის მდგრადი." },
  { key: "foundation", title: "საძირკველი და სარდაფი", body: "ნეგატიური და პოზიტიური ჰიდროიზოლაცია. მიწისქვეშა ტენის სრული ბლოკირება." },
  { key: "pool", title: "აუზი და რეზერვუარი", body: "ეპოქსიდური, ცემენტური და PVC სისტემები. საცხოვრებელი და კომერციული ობიექტები." },
  { key: "industrial_floor", title: "ინდუსტრიული იატაკი", body: "ეპოქსიდური და პოლიურეთანის საფარი. ქიმიური და მექანიკური დატვირთვის მდგრადი." },
  { key: "materials", title: "სამშენებლო მასალები", body: "ევროპული ბრენდების ოფიციალური იმპორტი. სამშენებლო ქიმია და სპეციალიზებული საფარები." },
];

const KA_FILTERS = ["ყველა", "ბრტყელი სახურავი", "ტერასა", "საძირკველი", "აუზი", "ინდუსტრიული იატაკი", "კომერციული"];

const KA_PROJECTS = [
  { name: "სასტუმრო ამბასადორი - კახეთი", work: "სახურავის ჰიდროიზოლაცია", area: "2,400 მ²", material: "ბიტუმური მემბრანა + სითხური საფარი", duration: "3 კვირა", tags: ["ბრტყელი სახურავი", "კომერციული"] },
  { name: "სასტუმრო ამბასადორი - თბილისი", work: "ტერასის ჰიდროიზოლაცია", area: "800 მ²", material: "TPO მემბრანა", duration: "2 კვირა", tags: ["ტერასა", "კომერციული"] },
  { name: "ნიუტონის თავისუფალი სკოლა", work: "ეპოქსიდური იატაკი", area: "1,200 მ²", material: "2-კომპონენტიანი ეპოქსიდი", duration: "2 კვირა", tags: ["ინდუსტრიული იატაკი", "კომერციული"] },
  { name: "ბაქსვუდის საერთაშორისო სკოლა", work: "ბრტყელი სახურავის მოწყობა", area: "1,800 მ²", material: "PVC სისტემა", duration: "3 კვირა", tags: ["ბრტყელი სახურავი", "კომერციული"] },
  { name: "ანაკლიის აქვა-პარკი", work: "აუზის ჰიდროიზოლაცია", area: "600 მ²", material: "ეპოქსიდური + PVC", duration: "10 დღე", tags: ["აუზი", "კომერციული"] },
  { name: "სავაჭრო ცენტრი მერანი", work: "სახურავის ჰიდროიზოლაცია", area: "3,500 მ²", material: "მემბრანული სისტემა", duration: "4 კვირა", tags: ["ბრტყელი სახურავი", "კომერციული"] },
  { name: "სასტუმრო როიალ პალასი", work: "ტერასის ჰიდროიზოლაცია", area: "450 მ²", material: "ელასტიური სისტემა", duration: "8 დღე", tags: ["ტერასა", "კომერციული"] },
  { name: "საჯარო რეესტრის ეროვნული სააგენტო", work: "საპარკინგე საფარი", area: "—", material: "ეპოქსიდური", duration: "12 დღე", tags: ["ინდუსტრიული იატაკი", "კომერციული"] },
];

const KA_TESTIMONIALS = [
  { quote: "GD Supply-მ სახურავი 3 კვირაში მოამუშავა — პროფესიონალურად და ვადაში.", author: "ნინო ბ.", meta: "ამბასადორი ჯგუფი" },
  { quote: "წლების პრობლემა გვქონდა სახურავზე — ახლა სრულიად გამართულია.", author: "დავით კ.", meta: "კერძო სახლი" },
  { quote: "სკოლის ეპოქსიდური იატაკი ზუსტად ის აღმოჩნდა, რაც გვჭირდებოდა.", author: "ირაკლი მ.", meta: "სკოლის ადმინისტრაცია" },
];

const KA_FAQ = [
  { q: "რამდენი ხნით გაძლებს ჰიდროიზოლაცია?", a: "სისტემის ტიპიდან გამომდინარე 10-დან 25 წლამდე." },
  { q: "რა ვადაში სრულდება სამუშაო?", a: "100–300 მ²: 3–5 დღე; 500–1000 მ²: 1–2 კვირა." },
  { q: "ზამთარში თუ ასრულებთ სამუშაოს?", a: "დიახ, სეზონურ პირობებზე მორგებული სისტემებით." },
  { q: "იმუშავებთ თბილისის გარეთ?", a: "დიახ, საქართველოს მასშტაბით." },
  { q: "რა ღირს ინსპექცია?", a: "ობიექტის ინსპექცია და სავარაუდო ბიუჯეტის გათვლა უფასოა." },
];

export default async function HomePage({ params }: { params: { locale: string } }) {
  const tHero = await getTranslations("hero");
  const tServices = await getTranslations("services");
  const tPortfolio = await getTranslations("portfolio");
  const tTestimonials = await getTranslations("testimonials");
  const tFaq = await getTranslations("faq");
  const isKa = params.locale === "ka";

  const heroStats = tHero.raw("stats") as Array<{ value: string; label: string }>;

  const services = isKa
    ? KA_SERVICES
    : (tServices.raw("items") as Array<{ key: string; title: string; body: string }>);

  const filters = isKa ? KA_FILTERS : (tPortfolio.raw("filters") as string[]);
  const projects = isKa
    ? KA_PROJECTS
    : (tPortfolio.raw("projects") as Array<{
        name: string;
        work: string;
        area: string;
        material: string;
        duration: string;
        tags: string[];
      }>);

  const testimonials = isKa
    ? KA_TESTIMONIALS
    : (tTestimonials.raw("items") as Array<{ quote: string; author: string; meta: string }>);

  const faq = isKa ? KA_FAQ : (tFaq.raw("items") as Array<{ q: string; a: string }>);

  return (
    <main className="relative">
      <Hero
        title={isKa ? "წყალი შევაჩერეთ. სამუდამოდ." : tHero("title")}
        subtitle={isKa ? "GD Supply — საქართველოს პროფესიონალური ჰიდროიზოლაციის კომპანია. სახურავიდან საძირკვლამდე." : tHero("subtitle")}
        ctaPrimary={isKa ? "უფასო შეფასება" : tHero("cta_estimate")}
        ctaSecondary={isKa ? "ჩვენი პროექტები" : tHero("cta_projects")}
        stats={heroStats}
      />

      <ServicesOverview
        title={isKa ? "რას ვაკეთებთ" : tServices("title")}
        subtitle={isKa ? "ვთავაზობთ სრულ ციკლს — კონსულტაციიდან ჩაბარებამდე." : tServices("subtitle")}
        items={services}
      />

      <Calculator />

      <PortfolioGrid
        title={isKa ? "ჩვენი პროექტები" : tPortfolio("title")}
        subtitle={isKa ? "ყოველი პროექტი — ეს არის ჩვენი ნამუშევარი, რომელსაც სახელი ადევს." : tPortfolio("subtitle")}
        filters={filters}
        projects={projects}
      />

      <Testimonials title={isKa ? "კლიენტები ჩვენ შესახებ" : tTestimonials("title")} items={testimonials} />

      <Faq title={isKa ? "ხშირად დასმული კითხვები" : tFaq("title")} items={faq} />

      <ContactSection />
    </main>
  );
}

