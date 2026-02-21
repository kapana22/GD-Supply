"use client";

import { motion } from "framer-motion";

type Service = { title: string; desc: string };

type ServicesProps = {
  title: string;
  items: Service[];
};

const catalog = [
  {
    group: "ჰიდროიზოლაციის მოწყობა",
    items: ["ბრტყელი სახურავი", "ტერასა", "საძირკველი"],
  },
  {
    group: "ინდუსტრიული იატაკი",
    items: ["ეპოქსიდური საფარი", "პოლიურეტანის საფარი"],
  },
];

export function Services({ title, items }: ServicesProps) {
  return (
    <section className="space-y-6 rounded-3xl border border-primary-navy/5 bg-white px-8 py-12 shadow-xl shadow-primary-navy/5 md:px-12">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary-green">
            Services
          </p>
          <h2 className="text-3xl font-semibold text-primary-navy md:text-4xl">
            {title}
          </h2>
        </div>
        <div className="text-sm text-primary-navy/60">
          Materials: PVC, TPO, EPDM membranes · Crystalline · Polyurea · PU
          injections · Bentonite · Bitumen | Standards: EN, ASTM, DIN
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-primary-navy/8 bg-gradient-to-br from-white to-[#f7f9fc] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-navy/10"
          >
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-green/10 via-transparent to-primary-navy/10" />
            </div>
            <div className="relative space-y-2">
              <h3 className="text-lg font-semibold text-primary-navy">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-primary-navy/70">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {catalog.map((group) => (
          <div
            key={group.group}
            className="rounded-2xl border border-primary-navy/10 bg-primary-navy/3 px-4 py-4 shadow-inner shadow-primary-navy/10"
          >
            <p className="text-sm font-semibold text-primary-navy">{group.group}</p>
            <ul className="mt-2 space-y-1 text-sm text-primary-navy/80">
              {group.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
