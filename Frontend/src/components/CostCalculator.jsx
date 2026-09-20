import { useEffect, useMemo, useRef, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import gsap from "gsap";
import SectionHeader from "./SectionHeader";
import { CONTACT, telLink } from "../config/contact";
import { CALC, CALC_MODELS, CALC_ADDONS } from "../data/content";
import { Reveal, prefersReducedMotion } from "../lib/motion";

const fmt = (n) => Math.round(n).toLocaleString("en-US");

/* أيقونات خطية بسيطة لكل نموذج */
const ICONS = {
  aframe: (
    <>
      <path d="M4 40 L32 6 L60 40 Z" />
      <path d="M26 40 V26 H38 V40" />
    </>
  ),
  twofloor: (
    <>
      <path d="M8 22 L32 6 L56 22" />
      <rect x="12" y="22" width="40" height="18" />
      <path d="M12 31 H52" />
      <path d="M20 26 h6 M38 26 h6 M20 35 h6 M38 35 h6" />
    </>
  ),
  single: (
    <>
      <path d="M4 18 H60" />
      <rect x="10" y="18" width="44" height="22" />
      <rect x="16" y="24" width="18" height="16" />
      <path d="M42 24 h6 v8 h-6 Z" />
    </>
  ),
  kiosk: (
    <>
      <rect x="10" y="18" width="44" height="22" />
      <path d="M6 18 L10 10 H54 L58 18" />
      <path d="M6 18 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5" />
      <rect x="20" y="24" width="24" height="9" />
    </>
  ),
  pergola: (
    <>
      <path d="M6 14 H58" />
      <path d="M10 14 V40 M54 14 V40" />
      <path d="M14 10 V14 M22 10 V14 M30 10 V14 M38 10 V14 M46 10 V14" />
      <path d="M18 40 V30 H46 V40" />
    </>
  ),
};

function ModelIcon({ id, className = "" }) {
  return (
    <svg viewBox="0 0 64 46" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
      {ICONS[id]}
    </svg>
  );
}

/* رقم يتحرك نحو قيمته الجديدة */
function CountUp({ value, className = "" }) {
  const ref = useRef(null);
  const state = useRef({ v: value });
  useEffect(() => {
    const el = ref.current;
    if (prefersReducedMotion()) {
      el.textContent = fmt(value);
      state.current.v = value;
      return;
    }
    const tween = gsap.to(state.current, {
      v: value,
      duration: 0.7,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = fmt(state.current.v);
      },
    });
    return () => tween.kill();
  }, [value]);
  return (
    <span ref={ref} className={className}>
      {fmt(value)}
    </span>
  );
}

/* خطوة مرقّمة */
function Step({ n, title, children }) {
  return (
    <Reveal delay={n * 60}>
      <div className="flex items-baseline gap-3 mb-5">
        <span className="w-7 h-7 rounded-full bg-espresso text-white text-xs num flex items-center justify-center shrink-0">{n}</span>
        <h3 className="font-display font-semibold text-xl text-ink">{title}</h3>
      </div>
      {children}
    </Reveal>
  );
}

export default function CostCalculator() {
  const [modelId, setModelId] = useState(CALC_MODELS[0].id);
  const [area, setArea] = useState(80);
  const [addons, setAddons] = useState([]);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // الشريط السفلي على الجوال يظهر فقط أثناء وجود الحاسبة على الشاشة
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  const model = useMemo(() => CALC_MODELS.find((m) => m.id === modelId) || CALC_MODELS[0], [modelId]);
  const toggleAddon = (id) => setAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  const structureCost = area * model.ratePerMeter;
  const addonsCost = addons.reduce((sum, id) => sum + (CALC_ADDONS.find((a) => a.id === id)?.cost || 0), 0);
  const total = structureCost + addonsCost;
  const minCost = total * 0.95;
  const maxCost = total * 1.08;
  const addonsShare = total ? (addonsCost / total) * 100 : 0;

  const sendToWhatsApp = () => {
    const addonNames = addons
      .map((id) => CALC_ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join("، ");
    const message =
      CALC.whatsapp +
      `%0A- النموذج: ${model.name}` +
      `%0A- المساحة: ${area} م²` +
      `%0A- الإضافات: ${addonNames || "بدون"}` +
      `%0A- التقدير: ${fmt(minCost)} – ${fmt(maxCost)} ر.س`;
    window.open(`${CONTACT.whatsappUrl}?text=${message}`, "_blank");
  };

  return (
    <section id="calculator" ref={sectionRef} className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader number="03" label="الحاسبة" title={CALC.title} intro={CALC.intro} />

        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-14 text-right">
          {/* الخطوات */}
          <div className="lg:col-span-7 space-y-14">
            {/* 1 — النوع */}
            <Step n={1} title="ما نوع البناء؟">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {CALC_MODELS.map((m) => {
                  const active = m.id === modelId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setModelId(m.id)}
                      aria-pressed={active}
                      className={`group text-right rounded-lg border p-4 transition-all duration-300 ${
                        active ? "bg-espresso border-espresso text-white" : "bg-white border-line text-ink hover:border-ink/40"
                      }`}
                    >
                      <ModelIcon id={m.icon} className={`w-12 h-9 ${active ? "text-oak-light" : "text-walnut"}`} />
                      <span className="block mt-3 font-medium text-sm">{m.name}</span>
                      <span className={`block text-[11px] mt-0.5 leading-snug ${active ? "text-white/60" : "text-ink/50"}`}>{m.desc}</span>
                      <span className={`block mt-2 text-xs num ${active ? "text-oak-light" : "text-ink/70"}`}>{fmt(m.ratePerMeter)} ر.س/م²</span>
                    </button>
                  );
                })}
              </div>
            </Step>

            {/* 2 — المساحة */}
            <Step n={2} title="كم المساحة؟">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  {CALC.areaPresets.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setArea(p)}
                      aria-pressed={area === p}
                      className={`h-10 px-4 rounded-md border text-sm num transition-colors ${
                        area === p ? "bg-espresso border-espresso text-white" : "border-line text-ink hover:border-ink/40"
                      }`}
                    >
                      {p} م²
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setArea((a) => Math.max(25, a - 5))}
                    className="w-10 h-10 rounded-full border border-line text-ink hover:bg-stone transition-colors text-lg"
                    aria-label="تقليل المساحة"
                  >
                    −
                  </button>
                  <span className="font-display font-bold text-4xl num text-ink w-24 text-center tabular-nums">{area}</span>
                  <button
                    type="button"
                    onClick={() => setArea((a) => Math.min(400, a + 5))}
                    className="w-10 h-10 rounded-full border border-line text-ink hover:bg-stone transition-colors text-lg"
                    aria-label="زيادة المساحة"
                  >
                    +
                  </button>
                  <span className="text-sm text-ink/50">م²</span>
                </div>
              </div>
              <Slider.Root
                value={[area]}
                onValueChange={(v) => setArea(v[0])}
                min={25}
                max={400}
                step={5}
                dir="rtl"
                className="relative flex w-full touch-none items-center select-none py-4 mt-2"
                aria-label="المساحة بالمتر المربع"
              >
                <Slider.Track className="relative grow h-1 rounded-full bg-stone">
                  <Slider.Range className="absolute h-full rounded-full bg-espresso" />
                </Slider.Track>
                <Slider.Thumb className="block w-6 h-6 rounded-full bg-white border-2 border-espresso shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-espresso/15" />
              </Slider.Root>
            </Step>

            {/* 3 — الإضافات */}
            <Step n={3} title="إضافات؟ (اختياري)">
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {CALC_ADDONS.map((a) => {
                  const active = addons.includes(a.id);
                  return (
                    <li key={a.id}>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={active}
                        onClick={() => toggleAddon(a.id)}
                        className={`w-full flex items-center justify-between gap-4 rounded-lg border px-4 py-3.5 text-right transition-colors ${
                          active ? "border-espresso bg-stone" : "border-line hover:border-ink/40"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`relative w-10 h-6 rounded-full transition-colors ${active ? "bg-espresso" : "bg-line"}`}>
                            <span
                              className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
                                active ? "right-1 translate-x-0" : "right-1 -translate-x-4"
                              }`}
                            />
                          </span>
                          <span className="text-sm font-medium text-ink">{a.name}</span>
                        </span>
                        <span className="text-xs num text-ink/60 whitespace-nowrap">+{fmt(a.cost)} ر.س</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Step>
          </div>

          {/* النتيجة */}
          <Reveal delay={180} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 rounded-xl bg-espresso text-white p-7 sm:p-9 overflow-hidden">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs tracking-[0.18em] text-white/50">التقدير المبدئي</span>
                  <h4 className="mt-2 font-display font-semibold text-2xl">{model.name}</h4>
                  <p className="text-sm text-white/55 num">{area} م² · {fmt(model.ratePerMeter)} ر.س/م²</p>
                </div>
                <ModelIcon id={model.icon} className="w-16 h-12 text-oak-light shrink-0" />
              </div>

              <div className="mt-8">
                <div className="font-display font-bold text-4xl sm:text-[2.75rem] leading-none num flex flex-wrap items-baseline gap-x-3">
                  <CountUp value={minCost} />
                  <span className="text-white/40 text-2xl">–</span>
                  <CountUp value={maxCost} />
                </div>
                <span className="block mt-2 text-sm text-white/55">ريال سعودي، شامل التوريد والتركيب</span>
              </div>

              {/* شريط التوزيع */}
              <div className="mt-8">
                <div className="h-2 rounded-full bg-white/10 overflow-hidden flex">
                  <span className="h-full bg-oak-light transition-all duration-700" style={{ width: `${100 - addonsShare}%` }} />
                  <span className="h-full bg-oak transition-all duration-700" style={{ width: `${addonsShare}%` }} />
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-sm bg-oak-light" />
                    <dt className="text-white/60">الهيكل</dt>
                    <dd className="num ms-auto">{fmt(structureCost)}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-sm bg-oak" />
                    <dt className="text-white/60">الإضافات</dt>
                    <dd className="num ms-auto">{fmt(addonsCost)}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  type="button"
                  onClick={sendToWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-md bg-white text-ink font-medium hover:bg-stone transition-colors"
                >
                  أرسل التقدير على الواتساب
                  <span aria-hidden>←</span>
                </button>
                <a href={telLink} className="block text-center text-sm text-white/65 link-underline w-fit mx-auto">
                  أو اتصل: <span className="num" dir="ltr">{CONTACT.phoneDisplay}</span>
                </a>
              </div>

              <p className="mt-6 text-[11px] leading-relaxed text-white/40">
                نطاق تقديري. السعر النهائي بعد المخطط التفصيلي والموقع ونوع التشطيب.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* شريط ثابت أسفل الشاشة على الجوال */}
      <div
        className={`lg:hidden fixed bottom-0 inset-x-0 z-30 bg-espresso text-white border-t border-line-dark px-5 py-3 flex items-center justify-between gap-4 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          inView ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
        aria-hidden={!inView}
      >
        <div className="min-w-0">
          <span className="block text-[10px] tracking-widest text-white/50">التقدير</span>
          <span className="block font-display font-semibold num text-lg leading-tight truncate">
            {fmt(minCost)} – {fmt(maxCost)} <span className="text-xs font-normal text-white/60">ر.س</span>
          </span>
        </div>
        <button type="button" onClick={sendToWhatsApp} className="shrink-0 h-10 px-4 rounded-md bg-white text-ink text-sm font-medium">
          واتساب
        </button>
      </div>
    </section>
  );
}
