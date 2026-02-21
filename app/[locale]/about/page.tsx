import { getTranslations } from "next-intl/server";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { Faq } from "@/components/sections/Faq";

export default async function AboutPage() {
  const tAbout = await getTranslations("about");
  const tStats = await getTranslations("stats");
  const tFaq = await getTranslations("faq");

  const values = tAbout.raw("values") as Array<{ title: string; body: string }>;
  const stats = tStats.raw("items") as Array<{ value: string; label: string }>;
  const faq = tFaq.raw("items") as Array<{ q: string; a: string }>;

  return (
    <main className="relative">
      <About
        title={tAbout("title")}
        body={tAbout("body")}
        teamTitle={tAbout("team_title")}
        teamBody={tAbout("team_body")}
        valuesTitle={tAbout("values_title")}
        values={values}
      />
      <Stats title={tStats("title")} items={stats} />
      <Faq title={tFaq("title")} items={faq} />
    </main>
  );
}
