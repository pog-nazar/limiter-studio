"use client";

import { MotionConfig } from "framer-motion";

/**
 * `reducedMotion="user"` змушує framer-motion читати системне налаштування
 * «зменшити рух»: transform-анімації вимикаються, opacity лишається, тож
 * контент не зникає. Одного CSS для цього не досить — motion анімує інлайн-стилями.
 *
 * Children приходять із серверного layout і серверними й лишаються — клієнтська
 * межа тут тільки навколо самого провайдера.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
