import { ImageResponse } from "next/og";

export const alt = "Limiter studio — веб-розробка для малого бізнесу";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
/** Обов'язково при output: "export" — інакше білд падає на збиранні даних маршруту. */
export const dynamic = "force-static";

/**
 * Генерується один раз під час білду, тож зі статичним експортом працює.
 * Свідомо без підвантаження Inter: satori малює дефолтним шрифтом, а тягнути
 * woff2 на етапі білду — зайва крихкість заради дрібниці в прев'ю посилання.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f0f0f",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{ width: 12, height: 12, borderRadius: 999, background: "#4ade80" }}
          />
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.55)" }}>
            Limiter studio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.02,
              letterSpacing: -3,
            }}
          >
            Сайти, що продають
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 26,
              fontSize: 34,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <span>Для малого бізнесу — від</span>
            <span style={{ color: "#f59e0b", fontWeight: 700 }}>6 000 грн</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 36,
            fontSize: 24,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <div>Лендінги</div>
          <div>Сайти-візитки</div>
          <div>Інтернет-магазини</div>
        </div>
      </div>
    ),
    size,
  );
}
