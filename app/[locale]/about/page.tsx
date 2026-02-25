import { AboutPage } from "@/components/sections/AboutPage";

export default function AboutRoute({ params }: { params: { locale: string } }) {
  return (
    <main className="gd-page-shell relative">
      <AboutPage locale={params.locale} />
    </main>
  );
}
