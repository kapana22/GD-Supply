export type ServiceUsageKey = "home" | "commercial" | "industrial" | "hotel";

export type ServiceMaterial = {
  name: string;
  description: string;
};

export type ServicePageData = {
  slug: string;
  order: number;
  cardTitle: string;
  title: string;
  heroTitle: string;
  subtitle: string;
  cardSummary: string;
  heroImage: string;
  cardImage: string;
  usage: ServiceUsageKey[];
  materials: ServiceMaterial[];
  gallery: string[];
};

export const SERVICE_USAGE_OPTIONS: Record<
  ServiceUsageKey,
  { label: string; description: string }
> = {
  home: {
    label: "სახლი",
    description: "კერძო სახლები, კოტეჯები და საცხოვრებელი ტერასები.",
  },
  commercial: {
    label: "კომერციული",
    description: "ოფისები, სავაჭრო ობიექტები და მრავალფუნქციური შენობები.",
  },
  industrial: {
    label: "ინდუსტრიული",
    description: "საწარმოო და მაღალი დატვირთვის მქონე ინდუსტრიული ობიექტები.",
  },
  hotel: {
    label: "სასტუმრო",
    description: "სასტუმროები, სპა-სივრცეები და პრემიუმ სტუმართმასპინძლობის პროექტები.",
  },
};

export const SERVICE_PROCESS_STEPS = [
  {
    step: "1",
    title: "კონსულტაცია და ინსპექცია",
    body: "ობიექტის ადგილზე შეფასება, უფასო ბიუჯეტი",
  },
  {
    step: "2",
    title: "სისტემის შერჩევა",
    body: "ობიექტის ტიპისა და პირობების მიხედვით",
  },
  {
    step: "3",
    title: "ხელშეკრულება",
    body: "ვადები, ფასი და გარანტია წერილობით",
  },
  {
    step: "4",
    title: "სამუშაოს შესრულება",
    body: "გამოცდილი ბრიგადა, სტანდარტების დაცვით",
  },
  {
    step: "5",
    title: "ჩაბარება და გარანტია",
    body: "საბოლოო ინსპექცია + 3 წლიანი გარანტია",
  },
] as const;

export const SERVICES_CATALOG: ServicePageData[] = [
  {
    slug: "flat-roof",
    order: 1,
    cardTitle: "ბრტყელი სახურავი",
    title: "ბრტყელი სახურავი",
    heroTitle: "ბრტყელი სახურავი",
    subtitle:
      "ბრტყელი სახურავი ყველაზე მოწყვლადი ადგილია. ვიყენებთ მრავალფენოვან სისტემებს — 15–20 წლიანი დაცვა.",
    cardSummary:
      "მრავალფენოვანი ჰიდროიზოლაცია ბრტყელი სახურავისთვის, გრძელვადიანი დაცვით და ობიექტზე მორგებული სისტემით.",
    heroImage:
      "https://static.wixstatic.com/media/d7b296_bffa29332f054919b86edfeddc8c990a~mv2.jpg",
    cardImage:
      "https://static.wixstatic.com/media/d7b296_bffa29332f054919b86edfeddc8c990a~mv2.jpg",
    usage: ["home", "commercial", "hotel"],
    materials: [
      {
        name: "ბიტუმის ბაზაზე თხევადი მემბრანა",
        description:
          "ელასტიური ფენა, რომელიც რთულ კვანძებსა და არათანაბარ ზედაპირებზე უწყვეტ ჰიდროიზოლაციას ქმნის.",
      },
      {
        name: "ცემენტ-აკრილი",
        description:
          "ცემენტური ბაზის ელასტიური სისტემა, რომელიც კარგად მუშაობს ბეტონზე და იცავს ზედაპირს ტენისგან.",
      },
      {
        name: "PVC მემბრანა",
        description:
          "მაღალი გამძლეობის მემბრანული სისტემა დიდი ფართობების სწრაფი და საიმედო ჰიდროიზოლაციისთვის.",
      },
      {
        name: "EPDM მემბრანა",
        description:
          "გამძლე სინთეზური მემბრანა, რომელიც გამოირჩევა ამინდისა და UV ზემოქმედების მიმართ მდგრადობით.",
      },
    ],
    gallery: [
      "https://static.wixstatic.com/media/d7b296_bffa29332f054919b86edfeddc8c990a~mv2.jpg",
      "https://static.wixstatic.com/media/d7b296_30ec8e14b0484984b8a4ebe8c7604f1d~mv2.jpg",
      "https://static.wixstatic.com/media/d7b296_42b9b6ce57dd472bb6f7c28087fb5291~mv2.jpg",
    ],
  },
  {
    slug: "terrace",
    order: 2,
    cardTitle: "ტერასა და ბალკონი",
    title: "ტერასა და ბალკონი",
    heroTitle: "ტერასა და ბალკონი",
    subtitle:
      "ტერასა მუდმივად ატმოსფერული გავლენის ქვეშაა. ვაყენებთ სისტემებს რომლებიც გაუძლებს სეზონურ ცვლილებებს.",
    cardSummary:
      "ტერასისა და ბალკონის ჰიდროიზოლაცია სეზონური ტემპერატურის ცვლილებებისა და ტენის გათვალისწინებით.",
    heroImage:
      "https://static.wixstatic.com/media/d7b296_6b8a962c24a34cb784b6b8ed0c422a9e~mv2.jpg",
    cardImage:
      "https://static.wixstatic.com/media/d7b296_6b8a962c24a34cb784b6b8ed0c422a9e~mv2.jpg",
    usage: ["home", "commercial", "hotel"],
    materials: [
      {
        name: "ბიტუმის მემბრანა",
        description:
          "ტენგამძლე მემბრანული სისტემა ტერასის ზედაპირისთვის, რომელიც იცავს ნალექისა და ჩაჟონვისგან.",
      },
      {
        name: "ცემენტ-აკრილი",
        description:
          "ელასტიური ცემენტური საფარი, რომელიც კარგად ერგება ბეტონისა და კერამიკული ზედაპირების კვანძებს.",
      },
      {
        name: "PVC მემბრანა",
        description:
          "მდგრადი სისტემა ფართო ტერასების ჰიდროიზოლაციისთვის და სწრაფი მონტაჟისთვის.",
      },
      {
        name: "EPDM მემბრანა",
        description:
          "ხანგრძლივი ექსპლუატაციის მქონე მემბრანა, რომელიც კარგად მუშაობს გარე კლიმატურ პირობებში.",
      },
    ],
    gallery: [
      "https://static.wixstatic.com/media/d7b296_6b8a962c24a34cb784b6b8ed0c422a9e~mv2.jpg",
      "https://static.wixstatic.com/media/d7b296_702406dd4a404d80b5a23fc94dffb385~mv2.jpg",
      "https://static.wixstatic.com/media/d7b296_fe44a4e1561d4e88921eaa059ae0f6d5~mv2.jpg",
    ],
  },
  {
    slug: "foundation",
    order: 3,
    cardTitle: "საძირკველი და სარდაფი",
    title: "საძირკველი და სარდაფი",
    heroTitle: "საძირკველი და სარდაფი",
    subtitle:
      "მიწისქვეშა ტენი და გრუნტის წყალი ყველაზე სერიოზული საფრთხეა. ნეგატიური და პოზიტიური სისტემები.",
    cardSummary:
      "საძირკვლისა და სარდაფის ჰიდროიზოლაცია ნეგატიური და პოზიტიური სისტემებით ახალი და არსებული შენობებისთვის.",
    heroImage:
      "https://static.wixstatic.com/media/d7b296_9d374e9e02774693981e6baa862508e2~mv2.jpg",
    cardImage:
      "https://static.wixstatic.com/media/d7b296_9d374e9e02774693981e6baa862508e2~mv2.jpg",
    usage: ["home", "commercial", "industrial"],
    materials: [
      {
        name: "ცემენტ-აკრილი",
        description:
          "მინერალურ ზედაპირზე მჭიდროდ მიმაგრებადი ჰიდროიზოლაცია სარდაფისა და საძირკვლის კვანძებისთვის.",
      },
      {
        name: "აკრილი",
        description:
          "დამცავი საფარი ტენისა და ზედაპირული წყლის ზემოქმედების შესამცირებლად.",
      },
      {
        name: "პოლიურეთანი",
        description:
          "მაღალი ელასტიურობის მქონე მასალა ნაპრალებისა და დეფორმაციისადმი მგრძნობიარე ზონებისთვის.",
      },
      {
        name: "PVC მემბრანა",
        description:
          "მემბრანული სისტემა მიწისქვეშა კონსტრუქციების მასშტაბური დაცვისთვის.",
      },
      {
        name: "EPDM მემბრანა",
        description:
          "გრძელვადიანი ჰიდროიზოლაციის გადაწყვეტა მაღალი ტენიანობის პირობებში.",
      },
    ],
    gallery: [
      "https://static.wixstatic.com/media/d7b296_9d374e9e02774693981e6baa862508e2~mv2.jpg",
      "https://static.wixstatic.com/media/d7b296_6b8a962c24a34cb784b6b8ed0c422a9e~mv2.jpg",
      "https://static.wixstatic.com/media/d7b296_1eac59bc825f453fa619d31547a4b6e6~mv2.jpg",
    ],
  },
  {
    slug: "pool",
    order: 4,
    cardTitle: "აუზი და წყლის რეზერვუარი",
    title: "აუზი და წყლის რეზერვუარი",
    heroTitle: "აუზი და წყლის რეზერვუარი",
    subtitle:
      "მუდმივ წყალჩაკირულ გარემოში მომუშავე სისტემები. საცხოვრებელი და კომერციული აუზები.",
    cardSummary:
      "აუზებისა და წყლის რეზერვუარებისთვის მუდმივ წყალჩაკირულ გარემოზე გათვლილი ჰიდროიზოლაციის სისტემები.",
    heroImage:
      "https://static.wixstatic.com/media/d7b296_702406dd4a404d80b5a23fc94dffb385~mv2.jpg",
    cardImage:
      "https://static.wixstatic.com/media/d7b296_702406dd4a404d80b5a23fc94dffb385~mv2.jpg",
    usage: ["home", "commercial", "hotel"],
    materials: [
      {
        name: "ორ-კომპონენტიანი ცემენტი",
        description:
          "წყალთან მუდმივი კონტაქტისთვის განკუთვნილი ცემენტური ჰიდროიზოლაცია აუზის თასისა და შიდა კვანძებისთვის.",
      },
      {
        name: "ეპოქსიდური ფისები",
        description:
          "ქიმიურად მედეგი სისტემა წყლის რეზერვუარებისა და სპეციალური დატვირთვის ზონებისთვის.",
      },
      {
        name: "PVC ფოლია",
        description:
          "აუზის ჰერმეტული შიდა ფენა, რომელიც უზრუნველყოფს უწყვეტ დაცვასა და მოვლის სიმარტივეს.",
      },
    ],
    gallery: [
      "https://static.wixstatic.com/media/d7b296_702406dd4a404d80b5a23fc94dffb385~mv2.jpg",
      "https://static.wixstatic.com/media/d7b296_af418acb60e94ce6825a0a9764f9bbc6~mv2.jpg",
    ],
  },
  {
    slug: "industrial-floor",
    order: 5,
    cardTitle: "ინდუსტრიული იატაკი",
    title: "ინდუსტრიული იატაკი",
    heroTitle: "ინდუსტრიული იატაკი",
    subtitle:
      "საწარმოო სახელოსნოები, სავაჭრო ცენტრები, საპარკინგეები. მაღალი მდგრადობა და ქიმიური მედეგობა.",
    cardSummary:
      "ეპოქსიდური და პოლიურეთანის იატაკის სისტემები ინდუსტრიული და კომერციული მაღალი დატვირთვისთვის.",
    heroImage:
      "https://static.wixstatic.com/media/d7b296_3ae08ec07f15496aa33aff2970bdd18f~mv2.jpg",
    cardImage:
      "https://static.wixstatic.com/media/d7b296_3ae08ec07f15496aa33aff2970bdd18f~mv2.jpg",
    usage: ["commercial", "industrial", "hotel"],
    materials: [
      {
        name: "ეპოქსიდური საფარი",
        description:
          "მაღალი მდგრადობა ქიმიური დატვირთვისას და სტაბილური ზედაპირი ინდუსტრიული/კომერციული გამოყენებისთვის.",
      },
      {
        name: "პოლიურეთანის საფარი",
        description:
          "განსაკუთრებით მძიმე ფიზიკური დატვირთვისთვის და დინამიკური ექსპლუატაციის მქონე სივრცეებისთვის.",
      },
    ],
    gallery: [
      "https://static.wixstatic.com/media/d7b296_3ae08ec07f15496aa33aff2970bdd18f~mv2.jpg",
      "https://static.wixstatic.com/media/d7b296_f3023136b7014c71b3ddf2b3e907c949~mv2.jpg",
      "https://static.wixstatic.com/media/d7b296_d98ff4d2fe044b66b7864bb2af75a9fd~mv2.jpg",
    ],
  },
  {
    slug: "materials",
    order: 6,
    cardTitle: "მასალები და იმპორტი",
    title: "მასალები და იმპორტი",
    heroTitle: "მასალები და იმპორტი",
    subtitle:
      "ევროპული ბრენდების ოფიციალური წარმომადგენელი. Hilton, Radisson, Holiday Inn პროექტებზე გამოყენებული მასალები.",
    cardSummary:
      "ევროპული მასალების იმპორტი: სამშენებლო ქიმია, HDPE ხმის იზოლაცია და პრემიუმ პროექტების კარები/ხალიჩები.",
    heroImage:
      "https://static.wixstatic.com/media/d7b296_780357b87f4c4a3fbb3fd09f9be9d3c8~mv2.jpg",
    cardImage:
      "https://static.wixstatic.com/media/d7b296_780357b87f4c4a3fbb3fd09f9be9d3c8~mv2.jpg",
    usage: ["home", "commercial", "industrial", "hotel"],
    materials: [
      {
        name: "სამშენებლო ქიმია",
        description:
          "აკრილი, პოლიურეთანი, ეპოქსიდი და ბეტონის ამღდგენები სხვადასხვა სამშენებლო ამოცანისთვის.",
      },
      {
        name: "ხმის საიზოლაციო HDPE მემბრანა",
        description:
          "HDPE მემბრანა სტიაშკის ქვეშ ჩასაფენად, გამოყენებული Hilton, Radisson, Holiday Inn და სხვა პროექტებზე.",
      },
      {
        name: "კარები და ხალიჩები",
        description:
          "სასტუმრო და პრემიუმ კლასის პროექტებისთვის შერჩეული გადაწყვეტილებები.",
      },
    ],
    gallery: [
      "https://static.wixstatic.com/media/d7b296_780357b87f4c4a3fbb3fd09f9be9d3c8~mv2.jpg",
      "https://static.wixstatic.com/media/d7b296_3cbc8321c26046b786e66d4daf0e8f1e~mv2.jpeg",
      "https://static.wixstatic.com/media/d7b296_7a46eb5e1a95413b94acd25f5f6fda2d~mv2.jpg",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES_CATALOG.find((service) => service.slug === slug) ?? null;
}
