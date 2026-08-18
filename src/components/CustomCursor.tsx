"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const QUERY = "(hover: hover)";

/** Чи є в пристрою справжній курсор. На сервері вважаємо, що ні. */
function usePointerFine() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

export function CustomCursor() {
  /**
   * На тачскріні не рендеримо НІЧОГО. Раніше вимикались лише обробники,
   * а самі елементи лишались — і фіксований шар із mix-blend-difference
   * змушував Safari перемальовувати всю сторінку окремим композитним шаром.
   * Це була головна причина повільного завантаження на iPhone.
   */
  const pointerFine = usePointerFine();

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const ringSpringX = useSpring(ringX, { stiffness: 120, damping: 20 });
  const ringSpringY = useSpring(ringY, { stiffness: 120, damping: 20 });

  const isHovering = useRef(false);
  const ringSize = useMotionValue(32);
  const ringSizeSpring = useSpring(ringSize, { stiffness: 200, damping: 22 });

  useEffect(() => {
    if (!pointerFine) return;

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const onEnter = () => {
      isHovering.current = true;
      ringSize.set(56);
    };
    const onLeave = () => {
      isHovering.current = false;
      ringSize.set(32);
    };

    window.addEventListener("mousemove", onMove);

    const interactables = document.querySelectorAll("a, button, [data-cursor]");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll("a, button, [data-cursor]");
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, [pointerFine, dotX, dotY, ringX, ringY, ringSize]);

  if (!pointerFine) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{
          x: ringSpringX,
          y: ringSpringY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSizeSpring,
          height: ringSizeSpring,
        }}
      >
        <div className="w-full h-full border border-white rounded-full opacity-60" />
      </motion.div>
    </>
  );
}
