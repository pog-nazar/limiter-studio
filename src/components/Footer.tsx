import { TELEGRAM_URL, GITHUB_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} Limiter studio
        </p>
        <div className="flex items-center gap-6">
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white transition-colors">
            Telegram
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
