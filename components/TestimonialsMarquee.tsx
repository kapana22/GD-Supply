"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

type Testimonial = {
  quote: string;
  author: string;
  meta?: string;
};

function QuoteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 11H6.5A2.5 2.5 0 0 1 9 8.5V7a4 4 0 0 0-4 4v6h7v-6Zm9 0h-3.5A2.5 2.5 0 0 1 18 8.5V7a4 4 0 0 0-4 4v6h7v-6Z" fill="currentColor" />
    </svg>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="group mx-3 w-[86vw] max-w-[380px] flex-shrink-0 select-none rounded-2xl border border-white/10 bg-[#1E2140]/92 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary-green/35 hover:shadow-[0_14px_34px_rgba(23,109,72,0.14)] md:w-[360px]">
      <div className="mb-4 flex items-center justify-between">
        <div className="grid h-9 w-9 place-items-center rounded-full border border-primary-green/30 bg-primary-green/10 text-primary-green/90">
          <QuoteIcon />
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      </div>

      <p className="mb-5 min-h-[88px] text-sm italic leading-relaxed text-white/72 md:min-h-[96px]">
        &ldquo;{item.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-green/45 text-xs font-bold text-white ring-1 ring-primary-green/20">
          {item.author[0]}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{item.author}</div>
          {item.meta ? <div className="text-xs text-primary-green">{item.meta}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsMarquee({ items }: { items?: Testimonial[] }) {
  const t = useTranslations("testimonials");
  const defaultTestimonials = t.raw("items") as Testimonial[];
  const [paused, setPaused] = useState(false);
  const testimonials = items && items.length ? items : defaultTestimonials;
  const loopItems = useMemo(() => [...testimonials, ...testimonials], [testimonials]);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex w-max animate-marquee"
        style={{
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {loopItems.map((item, index) => (
          <TestimonialCard key={`${item.author}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}
