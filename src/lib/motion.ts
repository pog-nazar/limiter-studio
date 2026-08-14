import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** Заголовки та одиночні блоки — вʼїжджають одразу, як тільки секція в кадрі. */
export const viewportOnce = { once: true } as const;

/** Списки карток — трохи раніше, щоб стагер встиг відпрацювати до появи. */
export const viewportCards = { once: true, margin: "-40px" } as const;

export const headingFade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

/** Затримка в секундах передається через проп `custom={0.15}`. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay },
  }),
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Індекс картки передається через проп `custom={i}`. */
export const cardEntry: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.07 },
  }),
};

export const cardHover = { y: -6, transition: { duration: 0.22 } };
