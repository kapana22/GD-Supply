import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";

const KA_FILTERS = ["ყველა", "ბრტყელი სახურავი", "ტერასა", "საძირკველი", "ინდუსტრიული იატაკი", "კომერციული"];

const KA_PROJECTS = [
  {
    name: "ამბასადორი კახეთი",
    work: "სახურავის ჰიდროიზოლაცია",
    area: "2,400 მ²",
    material: "ბიტუმური მემბრანა",
    duration: "3 კვირა",
    tags: ["ბრტყელი სახურავი", "კომერციული"],
    image: "/assets/portfolio/ambasodri.jpg",
  },
  {
    name: "ამბასადორი თბილისი",
    work: "ტერასის ჰიდროიზოლაცია",
    area: "800 მ²",
    material: "TPO მემბრანა",
    duration: "2 კვირა",
    tags: ["ტერასა", "კომერციული"],
    image: "/assets/portfolio/ambasadori.jpg",
  },
  {
    name: "ნიუტონის თავისუფალი სკოლა",
    work: "ეპოქსიდური იატაკი",
    area: "1,200 მ²",
    material: "2-კომპონენტიანი ეპოქსიდი",
    duration: "2 კვირა",
    tags: ["ინდუსტრიული იატაკი", "კომერციული"],
    image: "/assets/portfolio/niutonisskola.jpg",
  },
  {
    name: "ბაქსვუდის საერთაშორისო სკოლა",
    work: "სახურავის სისტემა",
    area: "1,800 მ²",
    material: "PVC სისტემა",
    duration: "3 კვირა",
    tags: ["ბრტყელი სახურავი", "კომერციული"],
    image: "/assets/portfolio/buqsvidisskola.jpg",
  },
  {
    name: "ბაქსვუდის სკოლა (პოლიურეთანი)",
    work: "პოლიურეთანის საფარი",
    area: "600 მ²",
    material: "პოლიურეთანი",
    duration: "10 დღე",
    tags: ["ინდუსტრიული იატაკი", "კომერციული"],
    image: "/assets/portfolio/ბაქსვუდის სკოლა-პოლიურეთანი 600 კვ.მ.jpg",
  },
  {
    name: "სავაჭრო ცენტრი მერანი",
    work: "სახურავის ჰიდროიზოლაცია",
    area: "3,500 მ²",
    material: "მემბრანული სისტემა",
    duration: "4 კვირა",
    tags: ["ბრტყელი სახურავი", "კომერციული"],
    image: "/assets/portfolio/sajarocentrimerani.webp",
  },
  {
    name: "სასტუმრო როიალ პალასი",
    work: "ტერასის ჰიდროიზოლაცია",
    area: "450 მ²",
    material: "ელასტიური სისტემა",
    duration: "8 დღე",
    tags: ["ტერასა", "კომერციული"],
    image: "/assets/portfolio/roialhoause.jpg",
  },
  {
    name: "საჯარო რეესტრის ეროვნული სააგენტო",
    work: "საპარკინგე საფარი",
    area: "—",
    material: "ეპოქსიდური",
    duration: "12 დღე",
    tags: ["ინდუსტრიული იატაკი", "კომერციული"],
    image: "/assets/portfolio/sajaroreestri.jpg",
  },
  {
    name: "საჯარო სკოლა",
    work: "სახურავის ჰიდროიზოლაცია",
    area: "800 მ²",
    material: "მემბრანული სისტემა",
    duration: "2 კვირა",
    tags: ["ბრტყელი სახურავი", "კომერციული"],
    image: "/assets/portfolio/საჯარო სკოლა - 800 კვ.მ.png",
  },
  {
    name: "კერძო სახლი თელავში",
    work: "სახურავის ჰიდროიზოლაცია",
    area: "600 მ²",
    material: "მემბრანული სისტემა",
    duration: "2 კვირა",
    tags: ["ბრტყელი სახურავი"],
    image: "/assets/portfolio/კერძო სახლი თელავში - 600კვ.მ.png",
  },
  {
    name: "კერძო სახლი წყნეთში",
    work: "სახურავის ჰიდროიზოლაცია",
    area: "500 მ²",
    material: "მემბრანული სისტემა",
    duration: "10 დღე",
    tags: ["ბრტყელი სახურავი"],
    image: "/assets/portfolio/კერძო სახლი წყნეთში - 500კვ.მ.jpg",
  },
  {
    name: "კერძო სახლი წყნეთში",
    work: "ტერასის მოწყობა",
    area: "600 მ²",
    material: "ელასტიური სისტემა",
    duration: "12 დღე",
    tags: ["ტერასა"],
    image: "/assets/portfolio/კერძო სახლი წყნეთში-600კვ.მ.jpg",
  },
  {
    name: "ტერასა ნუცუბიძეზე",
    work: "ტერასის ჰიდროიზოლაცია",
    area: "—",
    material: "ელასტიური სისტემა",
    duration: "—",
    tags: ["ტერასა"],
    image: "/assets/portfolio/ტერასა ნუცუბიძეზე.jpg",
  },
  {
    name: "ტერასა ოქროყანაში",
    work: "ტერასის ჰიდროიზოლაცია",
    area: "—",
    material: "ელასტიური სისტემა",
    duration: "—",
    tags: ["ტერასა"],
    image: "/assets/portfolio/ტერასა ოქროყანაში.jpg",
  },
  {
    name: "ტერასა საგურამოში",
    work: "ტერასის ჰიდროიზოლაცია",
    area: "—",
    material: "ელასტიური სისტემა",
    duration: "—",
    tags: ["ტერასა"],
    image: "/assets/portfolio/ტერასა საგურამოში.jpg",
  },
  {
    name: "ტერასა წავკისში",
    work: "ტერასის ჰიდროიზოლაცია",
    area: "—",
    material: "ელასტიური სისტემა",
    duration: "—",
    tags: ["ტერასა"],
    image: "/assets/portfolio/ტერასა წავკისში.jpg",
  },
  {
    name: "კერძო სახლის ტერასა წავკისში",
    work: "ტერასის მოწყობა",
    area: "—",
    material: "ელასტიური სისტემა",
    duration: "—",
    tags: ["ტერასა"],
    image: "/assets/portfolio/კერძო სახლის ტერასა წავკისში.jpg",
  },
  {
    name: "სახურავი ლისზე",
    work: "სახურავის ჰიდროიზოლაცია",
    area: "—",
    material: "მემბრანული სისტემა",
    duration: "—",
    tags: ["ბრტყელი სახურავი"],
    image: "/assets/portfolio/სახურავი ლისზე.jpg",
  },
  {
    name: "ვერტმფრენის დასაჯდომი",
    work: "პოლიურეთანის საფარი",
    area: "300 მ²",
    material: "პოლიურეთანი",
    duration: "—",
    tags: ["ინდუსტრიული იატაკი", "კომერციული"],
    image: "/assets/portfolio/ვერტმფრენის დასაჯდომი - 300კვ.მ.jpg",
  },
  {
    name: "14 ვილა თხინვალაში",
    work: "პოლიურეთანის საფარი",
    area: "—",
    material: "პოლიურეთანი",
    duration: "—",
    tags: ["ინდუსტრიული იატაკი", "კომერციული"],
    image: "/assets/portfolio/14 ვილა თხინვალაში-პოლიურეთანი.png",
  },
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
        image?: string;
      }>);

  return (
    <main className="gd-page-shell relative">
      <PageHero
        locale={params.locale}
        eyebrow={isKa ? "რეფერენსები" : t("title")}
        title={isKa ? "რეფერენსები" : t("title")}
        subtitle={isKa ? "ჩვენი შესრულებული ობიექტები და რეალური შედეგები." : t("subtitle")}
        breadcrumbs={[
          { label: "მთავარი", href: `/${params.locale}` },
          { label: isKa ? "რეფერენსები" : t("title") },
        ]}
        backgroundTheme="portfolio"
        compact
      />
      <PortfolioGrid
        title={isKa ? "რეფერენსები" : t("title")}
        subtitle={isKa ? "ყველა ობიექტი რეალური შესრულებული სამუშაოებიდან." : t("subtitle")}
        filters={filters}
        projects={projects}
        showHeader={false}
      />
    </main>
  );
}
