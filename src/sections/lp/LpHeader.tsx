import { CONTAINER } from "@/lib/styles";

/**
 * Шапка посадкової: логотип і одна дія. Навігації свідомо немає —
 * кожне зайве посилання це шлях геть від форми.
 */
export function LpHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className={`${CONTAINER} h-20 flex items-center justify-between`}>
        <span className="font-black text-white text-base tracking-tight">
          Limiter<span className="text-white/40 font-light"> studio</span>
        </span>
        <a
          href="#order"
          className="px-5 py-2.5 rounded-full border border-white/25 text-white text-xs font-bold hover:border-white/60 transition-colors"
        >
          Безкоштовний макет
        </a>
      </div>
    </header>
  );
}
