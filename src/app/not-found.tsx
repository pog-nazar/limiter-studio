import type { Metadata } from "next";
import Link from "next/link";
import { CONTAINER } from "@/lib/styles";
import { TELEGRAM_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Сторінку не знайдено — Limiter studio",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center">
      <div className={`${CONTAINER} py-24`}>
        <p className="text-[clamp(5rem,18vw,12rem)] font-black tracking-tight leading-none text-white/[0.08] select-none">
          404
        </p>

        <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
          Такої сторінки немає
        </h1>

        <p className="mt-6 text-base text-white/60 max-w-md leading-relaxed">
          Можливо, адреса застаріла або в ній помилка. Актуальні послуги, ціни й
          роботи — на головній.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="px-6 py-3.5 rounded-full bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors"
          >
            На головну →
          </Link>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full border border-white/30 text-white text-sm font-semibold hover:border-white/60 transition-colors"
          >
            Написати в Telegram
          </a>
        </div>
      </div>
    </main>
  );
}
