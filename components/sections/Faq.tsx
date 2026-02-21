"use client";

import { useState } from "react";

type QA = { q: string; a: string };

export function Faq({ title, items }: { title: string; items: QA[] }) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="bg-primary-navy py-[60px] md:py-[100px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-10 md:mb-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary-green">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {title}
          </h2>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => {
            const active = openIndex === idx;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-elevated"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(active ? -1 : idx)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={active}
                >
                  <span className="text-base font-extrabold text-white md:text-lg">
                    {item.q}
                  </span>
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-black/20 text-primary-green transition ${
                      active ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <Chevron />
                  </span>
                </button>

                {active ? (
                  <div className="px-6 pb-6">
                    <p className="text-base leading-relaxed text-gd-muted">
                      {item.a}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Chevron() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
