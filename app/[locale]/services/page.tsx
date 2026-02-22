import { getTranslations } from "next-intl/server";
import { ServicesDetails } from "@/components/sections/ServicesDetails";

const KA_SERVICES = [
  {
    key: "roof_terrace",
    group: "hydro",
    tabLabel: "ბრტყელი სახურავი",
    title: "ბრტყელი სახურავი / ტერასა",
    body: "გაიარე კონსულტაცია და მიიღე შენი სამშენებლო ობიექტის საჭიროებაზე მორგებული გადაწყვეტილება. ვიყენებთ მრავალფენოვან სისტემებს რომლებიც 15–20 წლიან დაცვას უზრუნველყოფს.",
    materials: [
      "თხევადი ბიტუმის ბაზაზე მემბრანა",
      "ცემენტ-აკრილი",
      "PVC მემბრანა",
      "EPDM მემბრანა",
    ],
    image:
      "https://static.wixstatic.com/media/d7b296_bffa29332f054919b86edfeddc8c990a~mv2.jpg",
  },
  {
    key: "foundation",
    group: "hydro",
    tabLabel: "საძირკველი",
    title: "საძირკველი და სარდაფი",
    body: "მიწისქვეშა ტენი და გრუნტის წყალი ყველაზე სერიოზული საფრთხეა საძირკვლისთვის. ვასრულებთ როგორც ახალი მშენებლობის, ასევე არსებული შენობების საძირკვლის ჰიდროიზოლაციას.",
    materials: [
      "ცემენტ-აკრილი",
      "აკრილი",
      "პოლიურეთანი",
      "PVC მემბრანა",
      "EPDM მემბრანა",
    ],
    image:
      "https://static.wixstatic.com/media/d7b296_6b8a962c24a34cb784b6b8ed0c422a9e~mv2.jpg",
  },
  {
    key: "industrial_floor",
    group: "floor",
    tabLabel: "ინდუსტრიული იატაკი",
    title: "ინდუსტრიული იატაკი",
    body: "საწარმოო სახელოსნოები, სავაჭრო ცენტრები, საავადმყოფოები, საპარკინგეები — ყველა მათგანს სჭირდება განსხვავებული მიდგომა.",
    materials: ["ეპოქსიდი", "პოლიურეთანი"],
    image:
      "https://static.wixstatic.com/media/d7b296_3ae08ec07f15496aa33aff2970bdd18f~mv2.jpg",
    subsections: [
      {
        title: "ეპოქსიდური საფარი",
        description:
          "იგივე პოლიმერული იატაკი. გამოიყენება ინდუსტრიულ და კომერციულ მშენებლობაში. გამოირჩევა მაღალი მდგრადობით და ქიმიური მედეგობით.",
        image:
          "https://static.wixstatic.com/media/d7b296_3ae08ec07f15496aa33aff2970bdd18f~mv2.jpg",
      },
      {
        title: "პოლიურეთანის საფარი",
        description:
          "გამოიყენება ინდუსტრიულ და კომერციულ მშენებლობაში, განსაკუთრებით მაღალი ფიზიკური და ქიმიური დატვირთვების მქონე ობიექტებზე.",
        image:
          "https://static.wixstatic.com/media/d7b296_f3023136b7014c71b3ddf2b3e907c949~mv2.jpg",
      },
    ],
  },
  {
    key: "materials",
    group: "import",
    tabLabel: "მასალები და იმპორტი",
    title: "მასალები და იმპორტი",
    body: "ჩვენს მიერ იმპორტირებული სამშენებლო მასალები ეხმარება მშენებლობას სხვადასხვა კომპლექსური პრობლემის მოგვარებაში და უზრუნველყოფს ხარისხის შენარჩუნებასა და ამაღლებას.",
    materials: ["სამშენებლო ქიმია", "ხმის იზოლაცია", "კარები და ხალიჩები"],
    image:
      "https://static.wixstatic.com/media/d7b296_780357b87f4c4a3fbb3fd09f9be9d3c8~mv2.jpg",
    subsections: [
      {
        title: "სამშენებლო ქიმია",
        products: [
          "აკრილის ჰიდროიზოლაცია",
          "პოლიურეთანის ჰიდროიზოლაცია",
          "საძირკვლის ჰიდროიზოლაცია",
          "ეპოქსიდის იატაკი",
          "პოლიურეთანის იატაკი",
          "ბეტონის გამამყარებელი ფხვნილები",
          "დაზიანებული ბეტონის ამღდგენები",
        ],
        image:
          "https://static.wixstatic.com/media/d7b296_780357b87f4c4a3fbb3fd09f9be9d3c8~mv2.jpg",
      },
      {
        title: "ხმის იზოლაცია",
        description:
          "ჩვენი ხმის საიზოლაციო HDPE მემბრანა (სტიაშკის ქვეშ ჩასაფენი) გამოიყენება ისეთი სასტუმროების პროექტებზე როგორიცაა Hilton, Holiday Inn, Ramada, Radisson და სხვ.",
        image:
          "https://static.wixstatic.com/media/d7b296_3cbc8321c26046b786e66d4daf0e8f1e~mv2.jpeg",
      },
      {
        title: "კარები და ხალიჩები",
        description:
          "აღნიშნული მიმართულება მუშაობს სასტუმრო და მაღალი კლასის პროექტებზე.",
        image:
          "https://static.wixstatic.com/media/d7b296_7a46eb5e1a95413b94acd25f5f6fda2d~mv2.jpg",
      },
    ],
  },
];

const KA_STEPS = [
  { title: "კონსულტაცია და ინსპექცია", body: "ობიექტის ადგილზე შეფასება და უფასო ბიუჯეტის მომზადება." },
  { title: "სისტემის შერჩევა", body: "ობიექტის ტიპისა და პირობების მიხედვით ოპტიმალური სისტემის არჩევა." },
  { title: "ხელშეკრულება", body: "ვადები, ფასი და გარანტია ფიქსირდება წერილობით." },
  { title: "სამუშაოს შესრულება", body: "გამოცდილი ბრიგადა ასრულებს სამუშაოს სტანდარტების დაცვით." },
  { title: "ჩაბარება და გარანტია", body: "საბოლოო ინსპექცია, ჩაბარება და 3 წლიანი გარანტია." },
];

export default async function ServicesPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations("services");
  const isKa = params.locale === "ka";

  const items = isKa
    ? KA_SERVICES
    : (t.raw("items") as Array<{
        key: string;
        group?: string;
        tabLabel?: string;
        title: string;
        body: string;
        image?: string;
        materials?: string[];
        includes?: string[];
        variants?: string[];
        subsections?: Array<{
          title: string;
          description?: string;
          products?: string[];
          image?: string;
        }>;
      }>);

  const steps = isKa
    ? KA_STEPS
    : (t.raw("process.steps") as Array<{ title: string; body: string }>);

  return (
    <main className="relative">
      <ServicesDetails
        title={isKa ? "სრული სერვისების სია" : t("title")}
        subtitle={isKa ? "GD Supply გთავაზობთ ჰიდროიზოლაციის სისტემების სრულ ციკლს — პირველი ნახვიდან 3 წლიანი გარანტიის ჩათვლით." : t("subtitle")}
        items={items}
        processTitle={isKa ? "პროცესი — ეტაპები" : t("process.title")}
        processSubtitle={isKa ? "ვმუშაობთ მკაფიო, გამჭვირვალე პროცესით — შეფასებიდან საბოლოო ჩაბარებამდე." : t("process.subtitle")}
        steps={steps}
      />
    </main>
  );
}
