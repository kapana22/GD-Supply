"use client";

import FadeUp from "@/components/FadeUp";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";

type Testimonial = {
  quote: string;
  author: string;
  meta: string;
};

export function Testimonials({
  title,
  items,
}: {
  title: string;
  items: Testimonial[];
}) {
  return (
    <section id="testimonials" className="gd-cv-auto relative py-[60px] md:py-[100px]">
      <div className="gd-container">
        <FadeUp>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">შეფასებები</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">{title}</h2>
        </FadeUp>

        <div className="mt-10">
          <TestimonialsMarquee items={items} />
        </div>
      </div>
    </section>
  );
}

