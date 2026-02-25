"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type FaqItem = {
  q: string;
  a: string;
};

const DEFAULT_FAQS: FaqItem[] = [
  {
    q: "რამდენი ხნით გაძლებს ჰიდროიზოლაცია?",
    a: "10-დან 25 წლამდე — სისტემის სახეობიდან გამომდინარე. ბიტუმური მემბრანა: 10–15 წელი. TPO/PVC: 20–25 წელი. ჩვენ ვიძლევით 10+ წლიან სამუშაო გარანტიას.",
  },
  {
    q: "რა ვადაში სრულდება სამუშაო?",
    a: "100–300 მ² — 3–5 სამუშაო დღე. 500–1000 მ² — 1–2 კვირა. მსხვილი კომერციული ობიექტები — ინდივიდუალურად.",
  },
  {
    q: "შეგიძლიათ ასრულოთ სამუშაო ზამთარში?",
    a: "დიახ. +5°C-ზე ქვევით ვირჩევთ სეზონზე ადაპტირებულ სპეციალურ მასალებს.",
  },
  {
    q: "იმუშავებთ თბილისის გარეთ?",
    a: "დიახ. ვასრულებთ სამუშაოებს საქართველოს მასშტაბით. ლოჯისტიკა ინდივიდუალურად შეთანხმდება.",
  },
  {
    q: "რა განსხვავებაა ბიტუმსა და TPO-ს შორის?",
    a: "ბიტუმი — კარგი ფასი/ხარისხი, კლასიკური გამოსავალი. TPO — გრძელვადიანი, UV-მდგრადი, ეკოლოგიური.",
  },
  {
    q: "არის თუ არა საჭირო ნებართვა?",
    a: "ჩვეულებრივ — არა. ისტორიული შენობები ან ახალი მშენებლობა შეიძლება საჭიროებდეს დამატებით შეთანხმებას.",
  },
  {
    q: "რა ღირს ინსპექცია?",
    a: "ობიექტის ინსპექცია და სავარაუდო ბიუჯეტი — სრულიად უფასოა.",
  },
];

export default function FAQAccordion({ items }: { items?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = items && items.length ? items : DEFAULT_FAQS;

  return (
    <div className="w-full max-w-4xl space-y-3 xl:ml-auto">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="overflow-hidden rounded-2xl transition-all duration-300"
            style={{
              background: "var(--gd-panel)",
              border: isOpen
                ? "1px solid rgba(23,109,72,0.45)"
                : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left md:px-7 md:py-5"
            >
              <span
                className={`tt-ui pr-2 text-base font-semibold leading-tight transition-colors duration-300 md:text-lg ${
                  isOpen ? "text-white" : "text-white/80"
                }`}
              >
                {faq.q}
              </span>

              <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300"
                style={{
                  background: isOpen ? "#176D48" : "rgba(255,255,255,0.09)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1v10M1 6h10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="tt-detail border-t border-white/[0.05] px-6 pb-5 pt-3 text-sm leading-relaxed text-white/60 md:px-7 md:text-[15px]">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
