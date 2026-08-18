"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadForm } from "@/components/LeadForm";
import { leadMagnet } from "@/data/lp";
import { EASE } from "@/lib/motion";

const SHOWN_KEY = "lp:popup-shown";
/** Той самий ключ, що пише leads.ts після успішної відправки. */
const LEAD_KEY = "lp:last-lead";
const SCROLL_TRIGGER = 0.6;

function alreadyHandled() {
  try {
    return (
      sessionStorage.getItem(SHOWN_KEY) === "1" ||
      localStorage.getItem(LEAD_KEY) !== null
    );
  } catch {
    // Сховище заблоковане — краще не показувати, ніж показувати на кожен скрол.
    return true;
  }
}

function markShown() {
  try {
    sessionStorage.setItem(SHOWN_KEY, "1");
  } catch {
    /* не критично */
  }
}

/**
 * Показується один раз за сесію: на десктопі — коли курсор іде за верхню межу
 * вікна, на мобільному — після 60% прокрутки. Не показується тим, хто вже
 * залишив заявку.
 */
export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  const show = useCallback(() => {
    if (alreadyHandled()) return;
    markShown();
    returnFocusTo.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    returnFocusTo.current?.focus?.();
  }, []);

  // Тригери показу
  useEffect(() => {
    if (alreadyHandled()) return;

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) show();
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > SCROLL_TRIGGER) show();
    };

    const fine = window.matchMedia("(hover: hover)").matches;
    if (fine) document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, [show]);

  // Escape, блокування прокрутки, фокус усередині вікна
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;

      // Утримуємо фокус усередині діалогу.
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    dialogRef.current?.querySelector<HTMLElement>("input")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 lg:backdrop-blur-sm overflow-y-auto"
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-popup-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="relative w-full max-w-lg my-auto rounded-2xl bg-panel border border-white/[0.15] p-7 sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Закрити"
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/[0.15] text-white/50 hover:text-white hover:border-white/40 transition-colors text-lg leading-none"
            >
              ×
            </button>

            <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-3">
              {leadMagnet.badge}
            </p>

            <h2
              id="lead-popup-title"
              className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-3 pr-10"
            >
              {leadMagnet.title}
            </h2>

            <p className="text-sm text-white/60 leading-relaxed mb-6">
              {leadMagnet.text}
            </p>

            <LeadForm formId="popup" withNiche={false} submitLabel="Отримати макет" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
