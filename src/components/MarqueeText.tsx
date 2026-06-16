const items = [
  "LANDING PAGE",
  "САЙТ-ВІЗИТКА",
  "КОРПОРАТИВНИЙ САЙТ",
  "ІНТЕРНЕТ-МАГАЗИН",
  "TELEGRAM-БОТ",
  "UI/UX ДИЗАЙН",
  "АДМІН-ПАНЕЛЬ",
  "ОНЛАЙН-ОПЛАТА",
];

export function MarqueeText({ className = "" }: { className?: string }) {
  const repeated = [...items, ...items];

  return (
    <div className={`overflow-hidden border-y border-white/15 py-3 ${className}`}>
      <div className="marquee-track flex gap-0 whitespace-nowrap w-max">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-white/50 px-8">
            {item}
            <span className="ml-8 w-1 h-1 rounded-full bg-white/30 inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
