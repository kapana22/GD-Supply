"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const MIN_DURATION_MS = 1600;
const MAX_DURATION_MS = 2400;
const STARTUP_LOADER_SEEN_KEY = "gd-startup-loader-seen";

export function StartupLoader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return window.sessionStorage.getItem(STARTUP_LOADER_SEEN_KEY) !== "1";
    } catch {
      return true;
    }
  });

  const durationMs = useMemo(() => (reduceMotion ? 500 : MIN_DURATION_MS), [reduceMotion]);

  useEffect(() => {
    if (!visible) return;

    try {
      window.sessionStorage.setItem(STARTUP_LOADER_SEEN_KEY, "1");
    } catch {
      // Ignore storage errors and continue showing loader on initial mount.
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    let loadCompleted = document.readyState === "complete";
    let minElapsed = false;

    const close = () => setVisible(false);
    const tryClose = () => {
      if (loadCompleted && minElapsed) close();
    };

    const onLoad = () => {
      loadCompleted = true;
      tryClose();
    };

    const minTimer = window.setTimeout(() => {
      minElapsed = true;
      tryClose();
    }, durationMs);

    const maxTimer = window.setTimeout(close, reduceMotion ? 900 : MAX_DURATION_MS);

    if (!loadCompleted) {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
      window.removeEventListener("load", onLoad);
    };
  }, [durationMs, reduceMotion, visible]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", visible);
    return () => document.body.classList.remove("overflow-hidden");
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="startup-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.2 : 0.45, ease: "easeOut" } }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#090f1d]"
          aria-hidden="true"
        >
          <div className="absolute inset-0">
            <motion.div
              className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-[#1CB879]/20 blur-3xl"
              animate={reduceMotion ? undefined : { x: [0, 18, 0], y: [0, 12, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-[-40px] top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"
              animate={reduceMotion ? undefined : { x: [0, -22, 0], y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_55%,rgba(255,255,255,0.05),transparent_70%)]" />
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:34px_34px]" />
          </div>

          <div className="relative grid h-full place-items-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: reduceMotion ? 0.18 : 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <div className="relative grid h-28 w-28 place-items-center rounded-[28px] border border-white/55 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.5)]">
                <motion.div
                  className="absolute inset-0 rounded-[28px] border border-[#1CB879]/35"
                  animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.3, 0.9, 0.3] }}
                  transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-[2px] rounded-[26px] bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(28,184,121,0.18))]"
                  animate={reduceMotion ? undefined : { opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <Image
                  src="/images/gd-supply-logo.png"
                  alt="GD Supply"
                  width={70}
                  height={70}
                  priority
                  className="relative z-10 h-[70px] w-[70px] object-contain"
                />
              </div>

              <motion.p
                className="mt-5 text-sm font-semibold uppercase tracking-[0.28em] text-white/80"
                animate={reduceMotion ? undefined : { opacity: [0.65, 1, 0.65] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                GD Supply
              </motion.p>

              <div className="mt-4 h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full w-24 rounded-full bg-[linear-gradient(90deg,rgba(28,184,121,0)_0%,rgba(28,184,121,0.95)_45%,rgba(255,255,255,0.9)_100%)]"
                  initial={{ x: -110 }}
                  animate={{ x: 170 }}
                  transition={{
                    duration: reduceMotion ? 0.8 : 1.1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
