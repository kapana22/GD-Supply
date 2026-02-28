"use client";

import FadeUp from "@/components/FadeUp";
import FAQAccordion from "@/components/FAQAccordion";

type QA = { q: string; a: string };

export function Faq({ title, items }: { title: string; items: QA[] }) {
  return (
    <section
      id="faq"
      className="gd-cv-auto gd-bg-main gd-section-divider py-[60px] md:py-[100px]"
    >
      <div className="gd-container grid gap-10 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)] xl:gap-14">
        <div className="xl:pt-1">
          <FadeUp>
            <p className="tt-label text-primary-green">FAQ</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="tt-heading-lg mt-3 font-extrabold text-white">
              {title}
            </h2>
          </FadeUp>
        </div>

        <div className="xl:mt-1">
          <FAQAccordion items={items} />
        </div>
      </div>
    </section>
  );
}

