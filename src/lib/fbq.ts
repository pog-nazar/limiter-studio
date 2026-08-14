export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "";

type Fbq = (
  action: "track" | "trackCustom" | "init",
  event: string,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

/** Тихо нічого не робить, якщо піксель не підключений або скрипт заблокований. */
export function fbTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, params);
}

/** Ключова подія для оптимізації реклами — форму успішно надіслано. */
export function trackLead(form: string) {
  fbTrack("Lead", { content_name: form });
}

/** Людина натиснула «написати в Telegram» / «подзвонити» — теж корисний сигнал. */
export function trackContact(channel: string) {
  fbTrack("Contact", { content_name: channel });
}
