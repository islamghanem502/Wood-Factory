// ─────────────────────────────────────────────────────────────
// بيانات التواصل — المكان الوحيد لتغيير رقم الواتساب والهاتف
// كل الأزرار في الموقع تقرأ من هذا الملف
// ─────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "966502190921"; // بدون + وبدون مسافات

export const CONTACT = {
  phone: `+${WHATSAPP_NUMBER}`,
  phoneDisplay: "0502190921",
  whatsapp: WHATSAPP_NUMBER,
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}`,
};

/** رابط واتساب مع رسالة جاهزة */
export const waLink = (message) =>
  `${CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;

/** رابط الاتصال الهاتفي */
export const telLink = `tel:${CONTACT.phone}`;
