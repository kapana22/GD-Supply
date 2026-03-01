import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";

type ProductItem = {
  name: string;
  description: string;
  image: string;
};

type ProductCategory = {
  title: string;
  description: string;
  items: ProductItem[];
};

export default async function ProductsPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations("products");
  const categories = t.raw("categories") as ProductCategory[];

  return (
    <main className="gd-page-shell relative">
      <PageHero
        locale={params.locale}
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[
          { label: t("breadcrumbs.home"), href: `/${params.locale}` },
          { label: t("breadcrumbs.current") },
        ]}
        backgroundTheme="services"
        compact
      />

      <section className="gd-cv-auto relative py-[56px] md:py-[88px]">
        <div className="gd-container">
          <div className="space-y-10">
            {categories.map((category) => (
              <section key={category.title} className="rounded-2xl border border-white/10 bg-gd-panel p-5 md:p-6">
                <p className="tt-label inline-flex rounded-full border border-primary-green/30 bg-primary-green/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-primary-green">
                  {category.title}
                </p>
                <p className="tt-detail mt-3 max-w-4xl text-sm leading-relaxed text-gd-muted">{category.description}</p>

                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {category.items.map((item) => (
                    <article
                      key={`${category.title}-${item.name}`}
                      className="overflow-hidden rounded-xl border border-white/10 bg-gd-result"
                    >
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                          className="object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                      </div>
                      <div className="p-4">
                        <p className="tt-label text-xs font-semibold uppercase tracking-[0.08em] text-white/55">
                          {t("item_label")}
                        </p>
                        <h2 className="tt-heading-md mt-1 font-extrabold text-white">{item.name}</h2>
                        <p className="tt-detail mt-2 text-sm leading-relaxed text-gd-muted">{item.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href={`/${params.locale}/contact`}
              className="btn-primary tt-ui inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
