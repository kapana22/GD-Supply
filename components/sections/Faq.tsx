"use client";

import FadeUp from "@/components/FadeUp";
import FAQAccordion from "@/components/FAQAccordion";

type QA = { q: string; a: string };

export function Faq({ title, items }: { title: string; items: QA[] }) {
  return (
    <section id="faq" className="bg-primary-navy py-[60px] md:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeUp>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">FAQ</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">{title}</h2>
        </FadeUp>

        <div className="mt-10">
          <FAQAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
