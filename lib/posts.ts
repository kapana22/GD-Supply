export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  image: string;
  readTime: string;
  author: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

export const posts: BlogPostMeta[] = [
  {
    slug: "5-ukheshi-shechdoma-brtyeli-gadakhurvis",
    title: "5 უხეში შეცდომა ბრტყელი გადახურვის მოწყობისას",
    excerpt:
      "მშენებლობა საქართველოში ერთ-ერთი ყველაზე სწრაფად განვითარებადი სფეროა. 15 წლის წინ თუ კონკრეტული ნაგებობის აშენებას საშუალოდ 3-5 წელი სჭირდებოდა...",
    date: "2023-11-21",
    updated: "2025-04-02",
    category: "სახურავი",
    tags: ["ბრტყელი სახურავი", "შეცდომები"],
    image: "/assets/services/flat-roof.jpg",
    readTime: "3 წუთი",
    author: "GD Supply",
  },
  {
    slug: "poliuretanis-hidroizolatsia",
    title: "პოლიურეთანის ჰიდროიზოლაცია — უპირატესობები და აღწერა",
    excerpt:
      "პოლიურეთანი ბრტყელი გადახურვის სისტემებს შორის ერთ-ერთი ყველაზე გავრცელებული და სანდო პრემიუმ კლასის ჰიდროსაიზოლაციო მასალაა...",
    date: "2023-10-15",
    updated: "2025-04-02",
    category: "მასალები",
    tags: ["პოლიურეთანი", "მასალები", "ბრტყელი სახურავი"],
    image: "/assets/services/materials.jpg",
    readTime: "4 წუთი",
    author: "GD Supply",
  },
  {
    slug: "hidroizolatsia-istoria-shedereba",
    title: "ჰიდროიზოლაცია — ისტორია და შედარება",
    excerpt:
      "ჰიდროიზოლაცია არის ტექნოლოგია, რომლის მთავარი ფუნქციაც გახლავთ დაიცვას წყლის ზემოქმედებისგან კონკრეტული სამშენებლო კვანძი...",
    date: "2023-09-10",
    updated: "2025-04-02",
    category: "ზოგადი",
    tags: ["ჰიდროიზოლაცია", "ისტორია", "შედარება"],
    image: "/assets/services/foundation.jpg",
    readTime: "5 წუთი",
    author: "GD Supply",
  },
  {
    slug: "brtyeli-sakhuravis-tipebi",
    title: "ბრტყელი სახურავის ტიპები",
    excerpt:
      "როგორ სახურავს ეძახიან ბრტყელს? ბრტყელი სახურავი მხოლოდ ვიზუალურად ჩანს აბსოლუტურად ჰორიზონტალური. თუმცა მინიმალური დახრა მაინც გააჩნია...",
    date: "2023-08-20",
    updated: "2025-04-02",
    category: "სახურავი",
    tags: ["ბრტყელი სახურავი", "ტიპები"],
    image: "/assets/services/flat-roof.jpg",
    readTime: "4 წუთი",
    author: "GD Supply",
  },
  {
    slug: "hidroizolatsiis-tipebi",
    title: "ჰიდროიზოლაციის ტიპები",
    excerpt:
      "როდესაც ბრტყელი სახურავის ჰიდროიზოლირების საკითხი დგება, არჩევანი კეთდება ძირითადი 2 ტიპის გადახურვაზე — მემბრანულსა და თხევად...",
    date: "2023-07-05",
    updated: "2025-04-02",
    category: "ზოგადი",
    tags: ["ჰიდროიზოლაცია", "ტიპები", "მემბრანა"],
    image: "/assets/services/terrace.jpg",
    readTime: "3 წუთი",
    author: "GD Supply",
  },
];

export const categories = ["ყველა", "სახურავი", "მასალები", "ზოგადი"];

export function getSortedPosts() {
  return [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
