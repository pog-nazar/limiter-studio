import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/** Обов'язково при output: "export" — дата фіксується на момент білду. */
export const dynamic = "force-static";

/** Тільки публічні сторінки. Посадкової під рекламу в мапі немає — вона noindex. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacy/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];
}
