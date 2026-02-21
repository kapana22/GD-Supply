import { AboutPage } from "@/components/sections/AboutPage";

export default function AboutRoute({ params }: { params: { locale: string } }) {
  return (
    <main className="relative">
      <AboutPage locale={params.locale} />
    </main>
  );
}
