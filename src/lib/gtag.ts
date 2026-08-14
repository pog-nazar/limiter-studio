export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

type Gtag = (
  command: "event" | "config" | "js",
  target: string | Date,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

/** Тихо нічого не робить, якщо GA не підключений або скрипт заблокований. */
export function gaEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}

/** Стандартна подія GA4 для заявки — щоб конверсія була видима і в Meta, і в GA. */
export function gaLead(form: string) {
  gaEvent("generate_lead", { form });
}

export function gaContact(channel: string) {
  gaEvent("contact", { channel });
}
