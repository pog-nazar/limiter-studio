import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/** Обов'язково при output: "export". */
export const dynamic = "force-static";

/**
 * /lp свідомо НЕ вноситься в Disallow, хоч це й здається логічним для рекламної
 * посадкової: заборона обходу не дає краулеру прочитати сам тег noindex, і сторінка
 * може потрапити у видачу голим посиланням без опису. Дозволяємо обхід — а з індексу
 * її тримає `robots: { index: false }` у метаданих самої сторінки.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
