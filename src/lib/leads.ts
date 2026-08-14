/**
 * Відправка заявок у Google Таблицю через Apps Script Web App.
 *
 * Сайт статичний (`output: "export"`), сервера немає — тому URL ендпоінта неминуче
 * потрапляє в клієнтський бандл. Захист нижче відсікає ботів, але не цілеспрямований
 * спам. Валідація на боці Apps Script обов'язкова, див. docs/leads-apps-script.md.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_LEADS_ENDPOINT ?? "";
/** Не робить ендпоінт приватним — лише відсікає ботів, що б'ють у знайдений URL. */
const SECRET = process.env.NEXT_PUBLIC_LEADS_SECRET ?? "";

/** Швидше за це форму заповнює тільки бот. */
const MIN_FILL_MS = 3000;
/** Не більше однієї заявки на хвилину з одного браузера. */
const THROTTLE_MS = 60_000;
const THROTTLE_KEY = "lp:last-lead";

export interface LeadPayload {
  name: string;
  contact: string;
  niche?: string;
  form: string;
}

export class LeadError extends Error {
  constructor(
    message: string,
    readonly kind: "throttled" | "bot" | "network" | "not-configured",
  ) {
    super(message);
    this.name = "LeadError";
  }
}

function readTracking() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const pick = (k: string) => p.get(k) ?? "";
  return {
    utm_source: pick("utm_source"),
    utm_medium: pick("utm_medium"),
    utm_campaign: pick("utm_campaign"),
    utm_content: pick("utm_content"),
    utm_term: pick("utm_term"),
    fbclid: pick("fbclid"),
    referrer: document.referrer,
    page: window.location.pathname,
  };
}

function throttled() {
  try {
    const last = Number(localStorage.getItem(THROTTLE_KEY) ?? 0);
    return Date.now() - last < THROTTLE_MS;
  } catch {
    // приватний режим або заблоковане сховище — просто пропускаємо перевірку
    return false;
  }
}

function markSent() {
  try {
    localStorage.setItem(THROTTLE_KEY, String(Date.now()));
  } catch {
    /* нічого страшного */
  }
}

/**
 * @param honeypot значення прихованого поля — у людини воно завжди порожнє
 * @param openedAt час показу форми (мс), щоб відсіяти миттєві відправки
 */
export async function submitLead(
  payload: LeadPayload,
  honeypot: string,
  openedAt: number,
): Promise<void> {
  if (honeypot.trim() !== "") {
    // Бот заповнив приховане поле. Мовчки вдаємо успіх, щоб не підказувати йому правило.
    return;
  }

  if (Date.now() - openedAt < MIN_FILL_MS) {
    throw new LeadError("Форма заповнена надто швидко", "bot");
  }

  if (throttled()) {
    throw new LeadError("Заявку вже надіслано. Зачекайте хвилину.", "throttled");
  }

  if (!ENDPOINT) {
    throw new LeadError("NEXT_PUBLIC_LEADS_ENDPOINT не налаштовано", "not-configured");
  }

  const body = JSON.stringify({
    ...payload,
    ...readTracking(),
    secret: SECRET,
    sentAt: new Date().toISOString(),
  });

  try {
    // text/plain — щоб браузер не слав preflight, який Apps Script не обробляє.
    await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
    });
  } catch {
    throw new LeadError("Не вдалося надіслати заявку", "network");
  }

  markSent();
}
