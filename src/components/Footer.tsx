import Link from "next/link";
import { TELEGRAM_URL, PHONE } from "@/lib/constants";
import { CONTAINER } from "@/lib/styles";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className={`${CONTAINER} flex flex-col sm:flex-row items-center justify-between gap-4`}>
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} Limiter studio
        </p>
        <div className="flex items-center gap-6">
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white transition-colors">
            Telegram
          </a>
          <a href={`tel:${PHONE.replace(/\s|\(|\)|-/g, "")}`} className="text-xs text-white/40 hover:text-white transition-colors">
            {PHONE}
          </a>
          <Link href="/privacy/" className="text-xs text-white/40 hover:text-white transition-colors">
            Конфіденційність
          </Link>
        </div>
      </div>
    </footer>
  );
}
