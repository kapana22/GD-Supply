import { getTranslations } from "next-intl/server";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";

const KA_FILTERS = ["ყველა", "ბრტყელი სახურავი", "ტერასა", "საძირკველი", "აუზი", "ინდუსტრიული იატაკი", "კომერციული"];

const KA_PROJECTS = [
  { name: "ამბასადორი კახეთი", work: "სახურავის ჰიდროიზოლაცია", area: "2,400 მ²", material: "—", duration: "—", tags: ["ბრტყელი სახურავი", "კომერციული"] },
  { name: "ამბასადორი თბილისი", work: "ტერასის ჰიდროიზოლაცია", area: "800 მ²", material: "—", duration: "—", tags: ["ტერასა", "კომერციული"] },
  { name: "ნიუტონის თავისუფალი სკოლა", work: "ეპოქსიდური იატაკი", area: "1,200 მ²", material: "—", duration: "—", tags: ["ინდუსტრიული იატაკი", "კომერციული"] },
  { name: "საჯარო რეესტრის ეროვნული სააგენტო", work: "საპარკინგე საფარი", area: "—", material: "—", duration: "—", tags: ["ინდუსტრიული იატაკი", "კომერციული"] },
  { name: "ბაქსვუდის საერთაშორისო სკოლა", work: "ბრტყელი სახურავის მოწყობა", area: "1,800 მ²", material: "—", duration: "—", tags: ["ბრტყელი სახურავი", "კომერციული"] },
  { name: "ანაკლიის აქვა-პარკი", work: "აუზის ჰიდროიზოლაცია", area: "600 მ²", material: "—", duration: "—", tags: ["აუზი", "კომერციული"] },
  { name: "სავაჭრო ცენტრი „მერანი“", work: "სახურავის ჰიდროიზოლაცია", area: "3,500 მ²", material: "—", duration: "—", tags: ["ბრტყელი სახურავი", "კომერციული"] },
  { name: "სასტუმრო „როიალ პალასი“", work: "ტერასის ჰიდროიზოლაცია", area: "450 მ²", material: "—", duration: "—", tags: ["ტერასა", "კომერციული"] },
  { name: "კერძო სახლი საგურამოში", work: "სახურავის ჰიდროიზოლაცია", area: "—", material: "—", duration: "—", tags: ["ბრტყელი სახურავი"] },
  { name: "კერძო სახლი საგურამოში", work: "ტერასის მოწყობა", area: "—", material: "—", duration: "—", tags: ["ტერასა"] },
  { name: "სახლი საბურთალოზე", work: "ტერასის ჰიდროიზოლაცია", area: "—", material: "—", duration: "—", tags: ["ტერასა"] },
  { name: "სკოლა დიღომში", work: "სახურავის ჰიდროიზოლაცია", area: "—", material: "—", duration: "—", tags: ["ბრტყელი სახურავი", "კომერციული"] },
  { name: "კერძო სახლი წყნეთში", work: "სახურავისა და ტერასის მოწყობა", area: "—", material: "—", duration: "—", tags: ["ბრტყელი სახურავი", "ტერასა"] },
  { name: "კერძო სახლი ვაკეში", work: "ტერასის მოწყობა", area: "—", material: "—", duration: "—", tags: ["ტერასა"] },
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

