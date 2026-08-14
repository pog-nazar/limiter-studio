"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";
import { TELEGRAM_URL } from "@/lib/constants";
import { trackContact } from "@/lib/fbq";

/**
 * Нижня панель на мобільному: з'являється, коли людина проскролила перший екран,
 * і ховається, коли форма вже на екрані — щоб не перекривати її кнопкою.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [orderVisible, setOrderVisible] = useState(false);
  useEffect(() => {
    const order = document.getElementById("order");
    if (!order) return;
    const obs = new IntersectionObserver(
      ([entry]) => setOrderVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    obs.observe(order);
    return () => obs.disconnect();
  }, []);

  const show = visible && !orderVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.3, ease: EASE }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ink/95 backdrop-blur-md border-t border-white/[0.12] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <div className="flex items-center gap-3">
            <a
              href="#order"
              className="flex-1 py-3.5 rounded-full bg-white text-black text-sm font-bold text-center"
            >
              Безкоштовний макет →
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("sticky-telegram")}
              aria-label="Написати в Telegram"
              className="w-12 h-12 shrink-0 rounded-full border border-white/25 flex items-center justify-center text-white text-lg"
            >
              ✈
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
