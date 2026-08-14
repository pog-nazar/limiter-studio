import { ImageResponse } from "next/og";

export const alt = "Сайт, який приносить заявки — за 3–5 днів";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
/** Обов'язково при output: "export" — інакше білд падає на збиранні даних маршруту. */
export const dynamic = "force-static";

/** Окрема картинка під рекламний трафік: акцент на оферті, а не на бренді. */
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
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "10px 22px",
            borderRadius: 999,
            border: "2px solid rgba(245,158,11,0.4)",
            background: "rgba(245,158,11,0.1)",
            fontSize: 24,
            fontWeight: 700,
            color: "#f59e0b",
          }}
        >
          Безкоштовний макет за 1 день
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.02,
              letterSpacing: -3,
            }}
          >
            Сайт, який приносить
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.02,
              letterSpacing: -3,
            }}
          >
            заявки — за 3–5 днів
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 26,
              fontSize: 34,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <span>Від</span>
            <span style={{ color: "#f59e0b", fontWeight: 700 }}>6 000 грн</span>
            <span>·</span>
            <span>Фіксована ціна</span>
            <span>·</span>
            <span>Домен ваш</span>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "rgba(255,255,255,0.4)" }}>
          Limiter studio
        </div>
      </div>
    ),
    size,
  );
}
