"use client";

import FadeUp from "@/components/FadeUp";
import FAQAccordion from "@/components/FAQAccordion";

type QA = { q: string; a: string };

export function Faq({ title, items }: { title: string; items: QA[] }) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="gd-cv-auto gd-bg-main gd-section gd-section-divider"
    >
      <div className="gd-container grid gap-10 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)] xl:gap-14">
        <div className="gd-section-header-tight xl:pt-1">
          <FadeUp>
            <p className="tt-label text-primary-green">FAQ</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="tt-heading-lg font-extrabold text-white">
              {title}
            </h2>
          </FadeUp>
        </div>

        <div className="xl:mt-1">
          <FAQAccordion items={items} />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </section>
  );
}
