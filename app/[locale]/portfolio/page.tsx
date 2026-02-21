import { getTranslations } from "next-intl/server";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";

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

export default async function PortfolioPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations("portfolio");
  const isKa = params.locale === "ka";

  const filters = isKa ? KA_FILTERS : (t.raw("filters") as string[]);
  const projects = isKa
    ? KA_PROJECTS
    : (t.raw("projects") as Array<{
        name: string;
        work: string;
        area: string;
        material: string;
        duration: string;
        tags: string[];
      }>);

  return (
    <main className="relative">
      <PortfolioGrid
        title={isKa ? "ჩვენი პროექტები" : t("title")}
        subtitle={isKa ? "ყოველი პროექტი — ეს არის ჩვენი ნამუშევარი, რომელსაც სახელი ადევს." : t("subtitle")}
        filters={filters}
        projects={projects}
      />
    </main>
  );
}

