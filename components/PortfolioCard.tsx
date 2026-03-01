"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
  isActive = false,
  onSelect,
}: {
  project: PortfolioProject;
  index: number;
  isActive?: boolean;
  onSelect?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const active = hovered || pressed || isActive;
  const interactive = Boolean(onSelect);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileTap={{ scale: 0.992 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 transition-shadow duration-300"
      style={{ aspectRatio: "3 / 2" }}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-pressed={interactive ? active : undefined}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onTapStart={() => setPressed(true)}
      onTapCancel={() => setPressed(false)}
      onTap={() => setPressed(false)}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (!interactive) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect?.();
        }
      }}
      animate={{
        boxShadow: active
          ? "0 14px 38px rgba(23,109,72,0.18)"
          : "0 8px 24px rgba(0,0,0,0.16)",
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: active ? 1.03 : 1,
          filter: active
            ? "saturate(1.06) brightness(1.06)"
            : "saturate(0.95) brightness(0.94)",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          priority={index < 3}
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A1C33]/90 via-[#1A1C33]/30 to-transparent" />

      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background:
            "linear-gradient(to top, rgba(23,109,72,0.75) 0%, rgba(26,28,51,0.4) 60%, transparent 100%)",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <motion.div
          animate={{ opacity: active ? 0.68 : 0.5, y: active ? -4 : 0 }}
          transition={{ duration: 0.3 }}
          className="mb-1 text-xs uppercase tracking-wider text-white/60"
        >
          {project.type}
        </motion.div>

        <div className="text-base font-bold leading-snug text-white">{project.title}</div>

        <motion.div
          animate={{ opacity: 1, y: active ? -1 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3 flex items-center"
        >
          <span className="text-sm font-semibold text-white/75">{project.area}</span>
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.8 }}
        transition={{ duration: 0.25 }}
        className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white"
        style={{ background: "rgba(23,109,72,0.85)", backdropFilter: "blur(8px)" }}
      >
        {project.category}
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl"
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ boxShadow: "inset 0 0 0 1px rgba(28,184,121,0.45)" }}
      />
    </motion.div>
  );
}
