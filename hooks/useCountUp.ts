import { useCallback, useEffect, useState } from "react";

export function useCountUp(
  target: number,
  duration = 1500,
  startOnMount = false,
) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(startOnMount);

  const trigger = useCallback(() => setTriggered(true), []);

  useEffect(() => {
    if (!triggered) return;

    let raf = 0;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [triggered, target, duration]);

  return { count, trigger };
}
