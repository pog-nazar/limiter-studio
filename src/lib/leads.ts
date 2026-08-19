/**
 * Відправка заявок у Google Таблицю через Apps Script Web App.
 *
 * Сайт статичний (`output: "export"`), сервера немає — тому URL ендпоінта неминуче
 * потрапляє в клієнтський бандл. Захист нижче відсікає ботів, але не цілеспрямований
 * спам. Валідація на боці Apps Script обов'язкова, див. docs/leads-apps-script.md.
 */

/** Apps Script, який пише заявки в Google Таблицю. Див. docs/leads-apps-script.md */
const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwIJFXB5t-TQsLbrCggEslmj-MRza7GUacQCqFZmsUHHqESGSyM_MuGMhHrY_qb9Ck7/exec";

/**
 * Пароль, який перевіряє скрипт. Не таємниця: він у будь-якому разі потрапляє
 * в код сторінки. Його роль — відсікати ботів, що б'ють у знайдений URL навмання.
 */
const SECRET = "lgh12356lm";

/**
 * Мінімальний час від показу форми до відправки. Швидше заповнює тільки скрипт.
 * Але людину за це НЕ караємо: якщо не вистачило — просто чекаємо залишок
 * і відправляємо. Помилка тут коштувала б реальних заявок.
 */
const MIN_FILL_MS = 3000;
/** Захист від подвійного натискання й від залпу з одного браузера. */
const THROTTLE_MS = 20_000;
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
    readonly kind: "throttled" | "network",
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

  if (throttled()) {
    throw new LeadError("Заявку вже надіслано", "throttled");
  }

  // Не відмова, а пауза: дочікуємо залишок і йдемо далі.
  const waited = Date.now() - openedAt;
  if (waited < MIN_FILL_MS) {
    await new Promise((r) => setTimeout(r, MIN_FILL_MS - waited));
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
