"use client";

import FadeUp from "@/components/FadeUp";
import FAQAccordion from "@/components/FAQAccordion";

type QA = { q: string; a: string };

export function Faq({ title, items }: { title: string; items: QA[] }) {
  return (
    <section
      id="faq"
      className="gd-cv-auto gd-bg-main border-t border-white/10 py-[60px] md:py-[100px]"
    >
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:px-10 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)] xl:gap-14">
        <div className="xl:pt-1">
          <FadeUp>
            <p className="tt-label text-primary-green">FAQ</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="tt-heading-lg mt-3 text-3xl font-extrabold text-white md:text-4xl">
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
