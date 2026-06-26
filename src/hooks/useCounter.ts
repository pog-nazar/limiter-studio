"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function useCounter(end: number, duration = 1.2) {
  const start = end * 3;
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start - eased * (start - end)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, start, duration]);

  return { count, ref };
}
