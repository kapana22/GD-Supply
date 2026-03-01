"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

type ProjectCard = { title: string; tag: string };

type ProjectsProps = {
  title: string;
  cta: string;
  cards: ProjectCard[];
  contactHref?: string;
};

export function Projects({ title, cta, cards, contactHref }: ProjectsProps) {
  const { locale } = useParams() as { locale: string };
  const href = contactHref ?? `/${locale}/contact`;

  return (
    <section
      id="projects"
      className="rounded-3xl border border-primary-navy/6 bg-primary-navy text-white shadow-2xl shadow-primary-navy/20"
    >
      <div className="grid gap-10 p-10 md:grid-cols-[1.1fr_1fr] md:p-12">
        <div className="space-y-4">
          <p className="tt-label text-xs uppercase tracking-[0.2em] text-primary-green">
            Projects
          </p>
          <h2 className="tt-heading-lg text-white">{title}</h2>
          <p className="tt-detail text-white/80">
            Field-tested assemblies, moisture logging, and detailed QA packs keep
            developers, lenders, and operators confident for the long haul.
          </p>
          <Link
            href={href}
            className="tt-ui inline-flex w-fit items-center gap-2 rounded-full bg-primary-green px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-green/40 transition hover:translate-y-0.5 hover:shadow-primary-green/60"
          >
            {cta}
          </Link>
        </div>

        <div className="grid gap-4">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-green/10 via-transparent to-white/5" />
              <div className="relative flex flex-col gap-2">
                <span className="tt-label inline-flex w-fit rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/70">
                  {card.tag}
                </span>
                <p className="tt-heading-md leading-snug text-white">
                  {card.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
