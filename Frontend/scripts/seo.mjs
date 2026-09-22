/*
  إضافة Vite للـ SEO والتتبع:
  - تحقن في <head> وسوم الوصف وOpen Graph وcanonical والأيقونات والبيانات المنظّمة (JSON-LD)
  - تحقن Google Tag Manager (أو البكسلات مباشرة) عند توفر المعرّفات في .env
  - تولّد sitemap.xml وrobots.txt وقت البناء
*/
import { loadEnv } from "vite";
import { buildSite } from "../src/config/site.js";
import { CONTACT } from "../src/config/contact.js";
import { FAQS, OFFER, HERO } from "../src/data/content.js";

let SITE = buildSite();

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const abs = (p) => (p.startsWith("http") ? p : SITE.url + p);

const jsonLd = () => {
  const business = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE.url + "/#business",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    telephone: CONTACT.phone,
    image: abs(SITE.ogImage),
    logo: abs("/images/logo-mark.png"),
    description: SITE.description,
    areaServed: SITE.areas.map((name) => ({ "@type": "City", name })),
    address: { "@type": "PostalAddress", addressCountry: "SA" },
    sameAs: [CONTACT.whatsappUrl],
    makesOffer: OFFER.active
      ? {
          "@type": "Offer",
          name: HERO.kicker,
          description: OFFER.text,
          price: String(OFFER.price),
          priceCurrency: "SAR",
          unitText: "m2",
          availability: "https://schema.org/InStock",
          url: SITE.url + "/#offer",
        }
      : undefined,
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const site = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "ar",
  };
  return [business, faq, site].map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n    ");
};

const headTags = () => {
  const og = abs(SITE.ogImage);
  return `
    <meta name="description" content="${esc(SITE.description)}" />
    <meta name="keywords" content="${esc(SITE.keywords)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${SITE.url}/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(SITE.name)}" />
    <meta property="og:locale" content="${SITE.locale}" />
    <meta property="og:url" content="${SITE.url}/" />
    <meta property="og:title" content="${esc(SITE.title)}" />
    <meta property="og:description" content="${esc(SITE.description)}" />
    <meta property="og:image" content="${og}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(SITE.name)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(SITE.title)}" />
    <meta name="twitter:description" content="${esc(SITE.description)}" />
    <meta name="twitter:image" content="${og}" />
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    ${jsonLd()}`;
};

/*
  التتبع: GTM يُحقن إن وُجد معرّفه، وكل بكسل يُحقن مباشرة إن وُجد معرّفه.
  قاعدة: أي بكسل موضوع هنا مباشرةً يجب ألا يُضاف داخل GTM أيضاً (وإلا يُحسب الحدث مرتين).
  الحالي: جوجل (GA4/Ads) من داخل GTM، وسناب من الكود مباشرة.
*/
const trackingHead = () => {
  let out = "";
  if (SITE.gtmId) {
    out += `
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${SITE.gtmId}');</script>
    <!-- End Google Tag Manager -->`;
  }
  if (SITE.ga4Id) {
    out += `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${SITE.ga4Id}"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${SITE.ga4Id}');</script>`;
  }
  if (SITE.metaPixelId) {
    out += `
    <script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${SITE.metaPixelId}');fbq('track','PageView');</script>`;
  }
  if (SITE.snapPixelId) {
    out += `
    <!-- Snap Pixel Code -->
    <script>(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');snaptr('init','${SITE.snapPixelId}',{});snaptr('track','PAGE_VIEW');</script>
    <!-- End Snap Pixel Code -->`;
  }
  if (SITE.tiktokPixelId) {
    out += `
    <script>!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${SITE.tiktokPixelId}');ttq.page();}(window,document,'ttq');</script>`;
  }
  return out;
};

const trackingBody = () =>
  SITE.gtmId
    ? `
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
    : "";

export default function seoPlugin() {
  return {
    name: "khashabi-seo",
    config(_, { mode }) {
      SITE = buildSite(loadEnv(mode, process.cwd(), "VITE_"));
    },
    transformIndexHtml(html) {
      return html
        .replace("</head>", `${headTags()}${trackingHead()}\n  </head>`)
        .replace(/<body([^>]*)>/, (m) => `${m}${trackingBody()}`);
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE.url}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${SITE.url}/privacy.html</loc><lastmod>${today}</lastmod><changefreq>yearly</changefreq><priority>0.2</priority></url>
</urlset>
`,
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "site.webmanifest",
        source: JSON.stringify(
          {
            name: SITE.name,
            short_name: "وتد الأخشاب",
            lang: "ar",
            dir: "rtl",
            start_url: "/",
            display: "browser",
            background_color: "#ffffff",
            theme_color: "#ffffff",
            icons: [
              { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
              { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
            ],
          },
          null,
          2,
        ),
      });
    },
  };
}
