import Script from "next/script";
import { GA_ID } from "@/lib/gtag";

/**
 * Без NEXT_PUBLIC_GA_ID не рендериться нічого — жодного зайвого байта
 * ні в дев-режимі, ні до того, як заведуть ресурс у GA4.
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
