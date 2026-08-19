import Script from "next/script";
import { FB_PIXEL_ID } from "@/lib/fbq";

/**
 * Meta Pixel. ID вшитий у код (див. lib/fbq.ts) — жодних змінних оточення.
 * Порожній ID лишає компонент вимкненим, тож піксель легко тимчасово зняти.
 *
 * strategy="beforeInteractive" — снипет виконується до гідратації, раніше за
 * будь-який наш код. Працює лише з кореневого layout, не переносити у сторінку.
 *
 * Увага: при output: "export" Next кладе його не в <head>, як обіцяє
 * документація, а в кінець <body>. Перевірено на збірці. На роботу пікселя це
 * не впливає — PageView і Lead фіксуються, — але «як рекомендує Meta» це не є.
 */
export function FacebookPixel() {
  if (!FB_PIXEL_ID) return null;

  return (
    <>
      <Script id="fb-pixel" strategy="beforeInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
