"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export interface PortfolioProject {
  title: string;
  type: string;
  area: string;
  image: string;
  category: string;
}

export default function PortfolioCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="relative cursor-pointer overflow-hidden rounded-xl"
      style={{ aspectRatio: "4/3" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.img
        src={project.image}
        alt={project.title}
        className="block h-full w-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A1C33]/90 via-[#1A1C33]/30 to-transparent" />

      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background:
            "linear-gradient(to top, rgba(23,109,72,0.75) 0%, rgba(26,28,51,0.4) 60%, transparent 100%)",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <motion.div
          animate={{ opacity: hovered ? 0.6 : 0.5, y: hovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
          className="mb-1 text-xs uppercase tracking-wider text-white/60"
        >
          {project.type}
        </motion.div>

        <div className="text-base font-bold leading-snug text-white">{project.title}</div>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
          transition={{ duration: 0.35, delay: hovered ? 0.05 : 0 }}
          className="mt-3 flex items-center justify-between"
        >
          <span className="text-sm text-white/70">{project.area}</span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-[#176D48]">
            იხილე
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
        transition={{ duration: 0.25 }}
        className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white"
        style={{ background: "rgba(23,109,72,0.85)", backdropFilter: "blur(8px)" }}
      >
        {project.category}
      </motion.div>
    </motion.div>
  );
}
