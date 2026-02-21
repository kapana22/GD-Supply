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
    image:
      "https://static.wixstatic.com/media/d7b296_be277ec0988b4fc49e02e220ea2bfc26~mv2.png",
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
    image:
      "https://static.wixstatic.com/media/d7b296_f57a0560ab3642419dae9b03bce69578~mv2.png",
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
    image:
      "https://static.wixstatic.com/media/d7b296_5fa380397997469ba66b8c51bfafb2ce~mv2.jpg",
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
    image:
      "https://static.wixstatic.com/media/d7b296_3fa320b5c1164e63a7ae4ee3958240b9~mv2.png",
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
    image:
      "https://static.wixstatic.com/media/d7b296_139a74897cf8400f8e09dc9caa414b3e~mv2.png",
    readTime: "3 წუთი",
    author: "GD Supply",
  },
];

export const categories = ["ყველა", "სახურავი", "მასალები", "ზოგადი"];

export function getSortedPosts() {
  return [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
