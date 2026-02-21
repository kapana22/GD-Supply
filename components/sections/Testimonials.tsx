"use client";

import { motion } from "framer-motion";

type Testimonial = { quote: string; author: string; meta: string };

export function Testimonials({
  title,
  items,
}: {
  title: string;
  items: Testimonial[];
}) {
  return (
    <section id="testimonials" className="relative py-[60px] md:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
              შეფასებები
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {title}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-gd-muted">
            რეალური გამოცდილება ჩვენი კლიენტებისგან. გადაასრიალე და ნახე მეტი.
          </p>
        </div>

        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((t, idx) => (
            <motion.figure
              key={`${t.author}-${idx}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="snap-start"
            >
              <div className="flex h-full w-[92vw] flex-col justify-between rounded-xl border border-white/10 bg-gd-panel p-6 shadow-elevated sm:w-[72vw] md:w-[calc(50vw-40px)] xl:w-[calc(33.333vw-44px)]">
                <div>
                  <QuoteMark />
                  <blockquote className="mt-4 text-base italic leading-relaxed text-white/90">
                    “{t.quote}”
                  </blockquote>
                </div>

                <figcaption className="mt-7 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-extrabold text-white">{t.author}</p>
                    <p className="mt-1 text-xs text-gd-muted">{t.meta}</p>
                  </div>
                  <Stars />
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteMark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      className="text-primary-green"
      aria-hidden="true"
    >
      <path
        d="M10 11c0 4-2 7-6 7v-2c2 0 3-2 3-5H4V4h6v7Zm10 0c0 4-2 7-6 7v-2c2 0 3-2 3-5h-3V4h6v7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-1 text-[#F5C54B]" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, idx) => (
        <svg
          key={idx}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.77 5.82 21l1.18-6.87-5-4.87 6.91-1L12 2Z" />
        </svg>
      ))}
    </div>
  );
}
