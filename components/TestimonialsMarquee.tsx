"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type Testimonial = {
  quote: string;
  author: string;
  meta?: string;
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote: "GD Supply-მ სრულად გაამართლა ჩვენი მოლოდინი. სახურავი ახლა სრულიად გამართულია. სამუშაო ჩავაბარეთ ვადაში.",
    author: "დავით კ.",
    meta: "კერძო სახლი, საბურთალო",
  },
  {
    quote: "GD Supply-ს გუნდმა 2400 მ² სახურავი 3 კვირაში მოამუშავა — პროფესიონალურად და ხარისხიანად.",
    author: "ნინო ბ.",
    meta: "ამბასადორი სასტუმრო ჯგუფი",
  },
  {
    quote: "ეპოქსიდური საფარი — ზუსტად ის, რაც გვჭირდებოდა. ბავშვებისთვის უსაფრთხო და ადვილად სარეცხი.",
    author: "ირაკლი მ.",
    meta: "სკოლის ადმინისტრაცია, დიღომი",
  },
  {
    quote: "კომპანიამ შეასრულა სამუშაო, რომელზეც სხვა კონტრაქტორები უარს ამბობდნენ. შედეგი შესანიშნავია.",
    author: "გიორგი ც.",
    meta: "კერძო სახლი, წყნეთი",
  },
];

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div
      className="mx-3 w-[86vw] max-w-[380px] flex-shrink-0 select-none rounded-2xl p-6 md:w-[360px]"
      style={{
        background: "#1E2140",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      <p className="mb-5 text-sm italic leading-relaxed text-white/65">&ldquo;{item.quote}&rdquo;</p>

      <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ background: "rgba(23,109,72,0.5)" }}
        >
          {item.author[0]}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{item.author}</div>
          {item.meta ? <div className="text-xs text-[#176D48]">{item.meta}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsMarquee({ items }: { items?: Testimonial[] }) {
  const [paused, setPaused] = useState(false);
  const testimonials = items && items.length ? items : DEFAULT_TESTIMONIALS;

  const doubled = useMemo(
    () => [...testimonials, ...testimonials, ...testimonials],
    [testimonials],
  );

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex"
        animate={{ x: paused ? undefined : [0, -(360 + 24) * testimonials.length] }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          },
        }}
      >
        {doubled.map((item, i) => (
          <TestimonialCard key={`${item.author}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}
