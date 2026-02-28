import Image from "next/image";
import Link from "next/link";
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

const IMAGES = {
  chemicalsMain: "/assets/services/materials.jpg",
  chemicalsPolyurethane: "/assets/portfolio/14 ვილა თხინვალაში-პოლიურეთანი.png",
  chemicalsEpoxy: "/assets/services/industrial-floor.jpg",
  membranePvc: "/assets/services/flat-roof.jpg",
  membraneEpdm: "/assets/services/terrace.jpg",
  membraneTpo: "/assets/portfolio/სახურავი ლისზე.jpg",
  soundHdpe: "/assets/portfolio/საჯარო სკოლა - 800 კვ.მ.png",
  soundVibration: "/assets/portfolio/niutonisskola.jpg",
  soundUnderlay: "/assets/portfolio/buqsvidisskola.jpg",
} as const;

const COPY = {
  ka: {
    title: "პროდუქტების ჩამონათვალი",
    subtitle: "ძირითადი კატეგორიები და პროდუქცია, ფოტოებით.",
    eyebrow: "მასალები",
    home: "მთავარი",
    products: "პროდუქტები",
    itemLabel: "პროდუქტი",
    cta: "კონსულტაცია",
    categories: [
      {
        title: "სამშენებლო ქიმია",
        description: "სარემონტო, დამცავი და ჰიდროიზოლაციური ქიმიური სისტემები.",
        items: [
          {
            name: "ცემენტ-აკრილის სისტემა",
            description: "მინერალური ზედაპირებისთვის მაღალი ადჰეზიის დაცვა.",
            image: IMAGES.chemicalsMain,
          },
          {
            name: "პოლიურეთანის ჰიდროიზოლაცია",
            description: "ელასტიური თხევადი სისტემა რთული კვანძებისთვის.",
            image: IMAGES.chemicalsPolyurethane,
          },
          {
            name: "ეპოქსიდური სისტემა",
            description: "ქიმიური და მექანიკური დატვირთვის მიმართ გამძლე ფენა.",
            image: IMAGES.chemicalsEpoxy,
          },
        ],
      },
      {
        title: "ჰიდროსაიზოლაციო მემბრანები",
        description: "სახურავისა და ტერასის მემბრანული სისტემები.",
        items: [
          {
            name: "PVC მემბრანა",
            description: "შედუღებადი სისტემა დიდი ფართობის სწრაფი მონტაჟისთვის.",
            image: IMAGES.membranePvc,
          },
          {
            name: "EPDM მემბრანა",
            description: "ელასტიური მემბრანა ხანგრძლივი ექსპლუატაციისთვის.",
            image: IMAGES.membraneEpdm,
          },
          {
            name: "TPO მემბრანა",
            description: "თანამედროვე UV-გამძლე გადაწყვეტა ბრტყელი სახურავისთვის.",
            image: IMAGES.membraneTpo,
          },
        ],
      },
      {
        title: "ხმის საიზოლაციო მასალები",
        description: "აკუსტიკური კომფორტისთვის და ხმაურის შემცირებისთვის.",
        items: [
          {
            name: "HDPE ხმის საიზოლაციო მემბრანა",
            description: "სტიაშკის ქვეშ დასაგები ფენა დარტყმითი ხმაურის შესამცირებლად.",
            image: IMAGES.soundHdpe,
          },
          {
            name: "ვიბროდამხშობი ფენა",
            description: "ვიბრაციისა და ხმაურის გადაცემის შემცირება კონსტრუქციაში.",
            image: IMAGES.soundVibration,
          },
          {
            name: "აკუსტიკური ქვესაფარი",
            description: "იატაკისა და კედლის სისტემებში დამატებითი იზოლაცია.",
            image: IMAGES.soundUnderlay,
          },
        ],
      },
    ] as ProductCategory[],
  },
  en: {
    title: "Product List",
    subtitle: "Main categories and products, presented with images.",
    eyebrow: "Materials",
    home: "Home",
    products: "Products",
    itemLabel: "Product",
    cta: "Consultation",
    categories: [
      {
        title: "Construction Chemicals",
        description: "Repair, protective and waterproofing chemical systems.",
        items: [
          {
            name: "Cement-Acrylic System",
            description: "High-adhesion layer for mineral surfaces.",
            image: IMAGES.chemicalsMain,
          },
          {
            name: "Polyurethane Waterproofing",
            description: "Elastic liquid system for critical details.",
            image: IMAGES.chemicalsPolyurethane,
          },
          {
            name: "Epoxy System",
            description: "Durable layer for chemical and mechanical loads.",
            image: IMAGES.chemicalsEpoxy,
          },
        ],
      },
      {
        title: "Waterproofing Membranes",
        description: "Membrane systems for roofs and terraces.",
        items: [
          {
            name: "PVC Membrane",
            description: "Weldable system for fast installation on large areas.",
            image: IMAGES.membranePvc,
          },
          {
            name: "EPDM Membrane",
            description: "Elastic long-life membrane solution.",
            image: IMAGES.membraneEpdm,
          },
          {
            name: "TPO Membrane",
            description: "Modern UV-resistant solution for flat roofs.",
            image: IMAGES.membraneTpo,
          },
        ],
      },
      {
        title: "Sound Insulation Materials",
        description: "For acoustic comfort and noise reduction.",
        items: [
          {
            name: "HDPE Acoustic Membrane",
            description: "Under-screed layer for reducing impact noise.",
            image: IMAGES.soundHdpe,
          },
          {
            name: "Vibration Damping Layer",
            description: "Reduces vibration and structure-borne noise transfer.",
            image: IMAGES.soundVibration,
          },
          {
            name: "Acoustic Underlay",
            description: "Additional insulation in floor and wall systems.",
            image: IMAGES.soundUnderlay,
          },
        ],
      },
    ] as ProductCategory[],
  },
  ru: {
    title: "Список продуктов",
    subtitle: "Основные категории и продукты с фото.",
    eyebrow: "Материалы",
    home: "Главная",
    products: "Продукты",
    itemLabel: "Продукт",
    cta: "Консультация",
    categories: [
      {
        title: "Строительная химия",
        description: "Ремонтные, защитные и гидроизоляционные химические системы.",
        items: [
          {
            name: "Цементно-акриловая система",
            description: "Высокая адгезия к минеральным поверхностям.",
            image: IMAGES.chemicalsMain,
          },
          {
            name: "Полиуретановая гидроизоляция",
            description: "Эластичная жидкая система для сложных узлов.",
            image: IMAGES.chemicalsPolyurethane,
          },
          {
            name: "Эпоксидная система",
            description: "Стойкий слой к химическим и механическим нагрузкам.",
            image: IMAGES.chemicalsEpoxy,
          },
        ],
      },
      {
        title: "Гидроизоляционные мембраны",
        description: "Мембранные системы для кровли и террас.",
        items: [
          {
            name: "PVC мембрана",
            description: "Свариваемая система для больших площадей.",
            image: IMAGES.membranePvc,
          },
          {
            name: "EPDM мембрана",
            description: "Эластичная долговечная мембрана.",
            image: IMAGES.membraneEpdm,
          },
          {
            name: "TPO мембрана",
            description: "Современное UV-стойкое решение для плоской кровли.",
            image: IMAGES.membraneTpo,
          },
        ],
      },
      {
        title: "Звукоизоляционные материалы",
        description: "Для акустического комфорта и снижения шума.",
        items: [
          {
            name: "HDPE звукоизоляционная мембрана",
            description: "Под стяжку для снижения ударного шума.",
            image: IMAGES.soundHdpe,
          },
          {
            name: "Вибродемпфирующий слой",
            description: "Снижение передачи вибрации и шума в конструкции.",
            image: IMAGES.soundVibration,
          },
          {
            name: "Акустическая подложка",
            description: "Дополнительная изоляция в системах пола и стен.",
            image: IMAGES.soundUnderlay,
          },
        ],
      },
    ] as ProductCategory[],
  },
} as const;

export default function ProductsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === "en" || params.locale === "ru" ? params.locale : "ka";
  const t = COPY[locale];

  return (
    <main className="gd-page-shell relative">
      <PageHero
        locale={params.locale}
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
        breadcrumbs={[
          { label: t.home, href: `/${params.locale}` },
          { label: t.products },
        ]}
        backgroundTheme="services"
        compact
      />

      <section className="gd-cv-auto relative py-[56px] md:py-[88px]">
        <div className="gd-container">
          <div className="space-y-10">
            {t.categories.map((category) => (
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
                          {t.itemLabel}
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
              {t.cta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


