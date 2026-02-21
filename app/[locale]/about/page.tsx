import { getTranslations } from "next-intl/server";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { Faq } from "@/components/sections/Faq";

const KA_VALUES = [
  { title: "სანდოობა", body: "ვასრულებთ იმას, რასაც ვპირდებით და ვმუშაობთ შეთანხმებული ვადებით." },
  { title: "ხარისხი", body: "ვიყენებთ მხოლოდ სერტიფიცირებულ მასალებს და სტანდარტულ ტექნოლოგიებს." },
  { title: "გამჭვირვალობა", body: "კლიენტი იღებს სრულ ინფორმაციას ყველა ეტაპზე — რისკების და ვადების ჩათვლით." },
  { title: "გარანტია", body: "ყველა სამუშაოზე გაძლევთ 3 წლიან გარანტიას." },
];

const KA_STATS = [
  { value: "10+", label: "წლიანი გამოცდილება" },
  { value: "500+", label: "დასრულებული პროექტი" },
  { value: "50+", label: "კომერციული ობიექტი" },
  { value: "3", label: "წლიანი გარანტია" },
  { value: "100%", label: "კლიენტთა კმაყოფილება" },
];

const KA_FAQ = [
  { q: "რამდენი ხნით გაძლებს ჰიდროიზოლაცია?", a: "სისტემის ტიპიდან გამომდინარე 10-დან 25 წლამდე." },
  { q: "რა ვადაში სრულდება სამუშაო?", a: "100–300 მ²: 3–5 დღე; 500–1000 მ²: 1–2 კვირა." },
  { q: "ზამთარში შეგიძლიათ შესრულება?", a: "დიახ, შესაბამის ტემპერატურულ პირობებზე მორგებული სისტემებით." },
  { q: "იმუშავებთ თბილისის გარეთ?", a: "დიახ, საქართველოს მასშტაბით." },
  { q: "რა ღირს ინსპექცია?", a: "ინსპექცია და სავარაუდო ბიუჯეტი უფასოა." },
];

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const tAbout = await getTranslations("about");
  const tStats = await getTranslations("stats");
  const tFaq = await getTranslations("faq");
  const isKa = params.locale === "ka";

  const values = isKa ? KA_VALUES : (tAbout.raw("values") as Array<{ title: string; body: string }>);
  const stats = isKa ? KA_STATS : (tStats.raw("items") as Array<{ value: string; label: string }>);
  const faq = isKa ? KA_FAQ : (tFaq.raw("items") as Array<{ q: string; a: string }>);

  return (
    <main className="relative">
      <About
        title={isKa ? "GD Supply — ვინ ვართ ჩვენ" : tAbout("title")}
        body={
          isKa
            ? "GD Supply დაარსდა 2014 წელს, როგორც სპეციალიზებული ჰიდროიზოლაციის კომპანია. დღეს ჩვენ ვართ საქართველოს ერთ-ერთი ყველაზე გამოცდილი კონტრაქტორი ამ სფეროში — 500-ზე მეტი დასრულებული პროექტით."
            : tAbout("body")
        }
        teamTitle={isKa ? "ჩვენი გუნდი" : tAbout("team_title")}
        teamBody={
          isKa
            ? "ჩვენი სპეციალისტები რეგულარულად გადიან ტრენინგებს ევროპულ მწარმოებლებთან. თითოეულ პროექტს მართავს გამოცდილი პროექტის მენეჯერი — ვადებისა და ხარისხის სრული კონტროლით."
            : tAbout("team_body")
        }
        valuesTitle={isKa ? "ჩვენი ფასეულობები" : tAbout("values_title")}
        values={values}
      />
      <Stats title={isKa ? "რიცხვებში" : tStats("title")} items={stats} />
      <Faq title={isKa ? "ხშირად დასმული კითხვები" : tFaq("title")} items={faq} />
    </main>
  );
}
