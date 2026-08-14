/**
 * Адреса сайту. Коли з'явиться власний домен — міняється лише змінна в Netlify,
 * код не чіпається. Потрібна для metadataBase, sitemap і robots.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://limiter-studio.netlify.app";

export const TELEGRAM_URL = "https://t.me/pog_Nazar";
export const PHONE = "+38 (098) 100-86-55";

export const NAV_LINKS = [
  { label: "Послуги", href: "#services" },
  { label: "Портфоліо", href: "#portfolio" },
  { label: "Контакт", href: "#contact" },
];
