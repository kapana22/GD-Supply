import { getTranslations } from "next-intl/server";
import { ServicesDetails } from "@/components/sections/ServicesDetails";

export default async function ServicesPage() {
  const t = await getTranslations("services");

  const items = t.raw("items") as Array<{
    key: string;
    title: string;
    body: string;
    includes?: string[];
    variants?: string[];
  }>;

  const steps = t.raw("process.steps") as Array<{ title: string; body: string }>;

  return (
    <main className="relative">
      <ServicesDetails
        title="სრული სერვისების სია"
        subtitle={t("subtitle")}
        items={items}
        processTitle={t("process.title")}
        processSubtitle={t("process.subtitle")}
        steps={steps}
      />
    </main>
  );
}
