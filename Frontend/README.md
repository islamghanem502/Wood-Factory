# خشبي | WOODEN — الواجهة الأمامية

موقع تعريفي (فرونت إند فقط) مبني بـ **React + Vite + Tailwind CSS v4 + GSAP**.
كل أزرار التواصل تفتح نفس رقم الواتساب/الهاتف المعرّف في ملف واحد.

## التشغيل

```bash
npm install     # مرة واحدة فقط
npm run dev     # تشغيل محلي على http://localhost:5173
npm run build   # إنتاج الملفات النهائية في مجلد dist/
npm run preview # معاينة نسخة الإنتاج
```

## هيكل الملفات

```
Frontend/
├── index.html                  ← الصفحة الأساسية + الخطوط (Alexandria, IBM Plex Sans Arabic)
├── public/
│   ├── 404.html                ← صفحة الخطأ 404 (ثابتة)
│   ├── images/                 ← الصور (WebP) + الشعار بنسختيه (بني / كريمي)
│   └── textures/               ← نسيج الخشب (SVG إجرائي بدون صور)
└── src/
    ├── main.jsx                ← نقطة الدخول
    ├── App.jsx                 ← ترتيب الأقسام وإيقاع الألوان
    ├── index.css               ← الألوان (أبيض × إسبريسو)، الخطوط، نظام الكشف عند التمرير، نسيج الخشب
    │
    ├── config/
    │   └── contact.js          ← ★ رقم الواتساب والهاتف (المكان الوحيد للتغيير)
    │
    ├── data/
    │   └── content.js          ← كل النصوص: الهيرو، الأرقام، المواصفات، الأفكار (التصاميم)، الآراء، الأسئلة، الحاسبة
    │
    ├── lib/
    │   └── motion.jsx          ← <Reveal/> للكشف عند التمرير (يحترم prefers-reduced-motion)
    │
    ├── components/
    │   ├── Navbar.jsx          ← الهيدر + قائمة الجوال
    │   ├── Footer.jsx          ← التذييل بكلمة "خشبي" بنسيج الخشب
    │   ├── Cabin.jsx           ← رسم الكوخ A-Frame (SVG بأجزاء منفصلة)
    │   ├── SectionHeader.jsx   ← ترويسة الأقسام (رقم + تسمية + عنوان)
    │   ├── FloatingActions.jsx ← زرا الواتساب والاتصال العائمان
    │   └── CostCalculator.jsx  ← حاسبة من 3 خطوات (نوع/مساحة/إضافات) مع تقدير حي → واتساب
    │
    └── sections/               ← أقسام الصفحة بالترتيب
        ├── Hero.jsx            ← النص يمين + الكوخ يسار يتركّب مع الاسكرول (GSAP ScrollTrigger)
        ├── Numbers.jsx         ← شريط الأرقام (بني داكن)
        ├── Offer.jsx           ← العرض الخاص (يُخفى بـ OFFER.active = false في content.js)
        ├── Specs.jsx           ← الجدران 12 سم، طبقات السقف (تتراكب مع الاسكرول)، الزجاج
        ├── Ideas.jsx           ← أفكار: صف بطاقات يتحرك وحده ببطء نحو اليمين (حلقة مستقلة عن الاسكرول)
        ├── Process.jsx         ← كيف نعمل: أربع خطوات (بني خشبي)
        ├── Testimonials.jsx    ← آراء العملاء (مخفي حالياً — فعّله بـ SECTIONS.reviews = true في content.js)
        └── Faq.jsx             ← الأسئلة الشائعة
```

## SEO والتتبع

- كل إعدادات الـ SEO في `src/config/site.js` (العنوان، الوصف، الكلمات المفتاحية، مناطق الخدمة).
- النطاق ومعرّفات التتبع في ملف `.env` (انسخ `.env.example`) أو في Vercel → Environment Variables:
  - `VITE_SITE_URL` — النطاق النهائي (canonical / Open Graph / sitemap)
  - `VITE_GTM_ID` — Google Tag Manager (الأفضل: كل البكسلات من داخله)
  - أو مباشرة: `VITE_GA4_ID` · `VITE_META_PIXEL_ID` · `VITE_SNAP_PIXEL_ID` · `VITE_TIKTOK_PIXEL_ID`
- وقت البناء (`scripts/seo.mjs`): وسوم الوصف وOpen Graph وJSON-LD (LocalBusiness + FAQPage + Offer)، و`sitemap.xml` و`robots.txt` و`site.webmanifest`.
- Prerender: `npm run build` يولّد HTML كاملاً داخل `dist/index.html` (React SSR) ثم يرطّبه المتصفح.
- الأحداث (`src/lib/analytics.js`): `contact` (واتساب) · `call` (اتصال) · `lead` (تقدير الحاسبة) · `view_offer` — تُرسل إلى `dataLayer` وإلى Meta/Snap/TikTok إن كانت محمّلة. كل زر يحمل `data-placement`.
- مصدر الإعلان: إذا وصل الزائر بـ `?utm_source=snapchat` يُحفظ ويُضاف سطر «قادم من إعلان سناب شات» إلى رسالة الواتساب.
- صورة المشاركة: `public/og.jpg` (1200×630). صفحة الخصوصية: `public/privacy.html`.

## تغيير رقم الواتساب

افتح `src/config/contact.js` وغيّر السطر:

```js
const WHATSAPP_NUMBER = "966502190921"; // بدون + وبدون مسافات
```

وغيّر `phoneDisplay` للرقم الذي يظهر للزائر. كل الأزرار تتحدث تلقائياً.

## تغيير النصوص أو الصور

- النصوص: `src/data/content.js`
- الصور: ضع الصورة (يفضّل WebP بعرض 1800px) في `public/images/` ثم حدّث المسار في `IMAGES` داخل `content.js`

## الحركة

- الهيرو: على الشاشات الكبيرة يُثبَّت القسم ويتركّب الكوخ مع الاسكرول؛ على الجوال يتركّب تلقائياً عند ظهوره.
- كل الحركات تتوقف تلقائياً عند تفعيل "تقليل الحركة" في نظام التشغيل.
