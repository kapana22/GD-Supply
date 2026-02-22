"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function TiltCard({ children, className = "", style }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [enabled, setEnabled] = useState(true);

  const rotateX = useSpring(0, { stiffness: 220, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 24 });
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const noHover = window.matchMedia("(hover: none)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!(noHover || reducedMotion));
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled) return;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    rotateX.set((y - 0.5) * -8);
    rotateY.set((x - 0.5) * 8);
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseEnter = () => {
    if (!enabled) return;
    scale.set(1.012);
  };

  const handleMouseLeave = () => {
    if (!enabled) return;
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    setGlowPos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: enabled ? rotateX : 0,
        rotateY: enabled ? rotateY : 0,
        scale: enabled ? scale : 1,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
        willChange: "transform",
        ...style,
      }}
      className={`relative ${className}`}
    >
      {enabled ? (
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(200px circle at ${glowPos.x}% ${glowPos.y}%, rgba(23,109,72,0.12) 0%, transparent 70%)`,
          }}
        />
      ) : null}
      {children}
    </motion.div>
  );
}
