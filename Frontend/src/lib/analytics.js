/*
  طبقة التتبع: مصدر واحد للأحداث يرسلها إلى
  - window.dataLayer (Google Tag Manager / GA4)
  - fbq (Meta) · snaptr (Snapchat) · ttq (TikTok) · gtag (Google Ads) إن كانت محمّلة
  الأحداث: contact (واتساب) · call (اتصال) · lead (تقدير من الحاسبة) · view_offer
*/

const w = typeof window !== "undefined" ? window : null;

/* ── مصدر الزيارة (utm) — يُحفظ أول مرة ويُستخدم في الرسائل والأحداث ── */
const SOURCE_KEY = "khashabi_src";
const SOURCE_LABELS = {
  snapchat: "سناب شات",
  snap: "سناب شات",
  facebook: "فيسبوك",
  fb: "فيسبوك",
  instagram: "إنستغرام",
  ig: "إنستغرام",
  meta: "ميتا",
  google: "جوجل",
  tiktok: "تيك توك",
  twitter: "إكس",
  x: "إكس",
  youtube: "يوتيوب",
};

export function captureSource() {
  if (!w) return;
  try {
    const q = new URLSearchParams(w.location.search);
    const src = q.get("utm_source");
    if (!src) return;
    const data = {
      source: src.toLowerCase(),
      medium: q.get("utm_medium") || "",
      campaign: q.get("utm_campaign") || "",
      content: q.get("utm_content") || "",
      at: Date.now(),
    };
    w.sessionStorage.setItem(SOURCE_KEY, JSON.stringify(data));
    w.localStorage.setItem(SOURCE_KEY, JSON.stringify(data));
  } catch {
    /* التخزين قد يكون معطّلاً */
  }
}

export function getSource() {
  if (!w) return null;
  try {
    const raw = w.sessionStorage.getItem(SOURCE_KEY) || w.localStorage.getItem(SOURCE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/* سطر يُضاف إلى رسالة الواتساب حتى يعرف فريق المبيعات مصدر العميل */
export function sourceLine() {
  const s = getSource();
  if (!s) return "";
  const label = SOURCE_LABELS[s.source] || s.source;
  return `\n\n(قادم من إعلان ${label}${s.campaign ? ` — ${s.campaign}` : ""})`;
}

/* ── الإرسال ── */
function push(event, params = {}) {
  if (!w) return;
  const src = getSource();
  const payload = { event, ...params, ...(src ? { utm_source: src.source, utm_campaign: src.campaign } : {}) };
  try {
    (w.dataLayer = w.dataLayer || []).push(payload);
  } catch {
    /* noop */
  }
}

const META = { contact: "Contact", call: "Contact", lead: "Lead", view_offer: "ViewContent" };
const SNAP = { contact: "SIGN_UP", call: "SIGN_UP", lead: "SUBMIT_FORM", view_offer: "VIEW_CONTENT" };
const TIKTOK = { contact: "Contact", call: "Contact", lead: "SubmitForm", view_offer: "ViewContent" };

export function track(event, params = {}) {
  push(event, params);
  if (!w) return;
  try {
    if (w.fbq && META[event]) w.fbq("track", META[event], params);
    if (w.snaptr && SNAP[event]) w.snaptr("track", SNAP[event], params);
    if (w.ttq?.track && TIKTOK[event]) w.ttq.track(TIKTOK[event], params);
  } catch {
    /* بكسل مفقود أو محظور — لا يوقف الصفحة */
  }
}

/* اختصارات */
export const trackContact = (placement, extra = {}) => track("contact", { placement, channel: "whatsapp", ...extra });
export const trackCall = (placement) => track("call", { placement, channel: "phone" });
export const trackLead = (data) => track("lead", { placement: "calculator", currency: "SAR", ...data });
export const trackViewOffer = () => track("view_offer", { placement: "offer" });
