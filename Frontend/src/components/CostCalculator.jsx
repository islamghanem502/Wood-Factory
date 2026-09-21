import { useEffect, useMemo, useRef, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import gsap from "gsap";
import SectionHeader from "./SectionHeader";
import { CONTACT, telLink } from "../config/contact";
import { CALC, CALC_MODELS, CALC_ADDONS, OFFER } from "../data/content";
import { Reveal, prefersReducedMotion } from "../lib/motion";
import { WhatsAppIcon, waButtonClass } from "./WhatsAppButton";

const fmt = (n) => Math.round(n).toLocaleString("en-US");

/* أيقونات خطية لكل نوع (viewBox 32×24) */
const ICONS = {
  aframe: (
    <>
      <path d="M3 21 16 3l13 18Z" />
      <path d="M13 21v-6h6v6M9.5 12h13" />
    </>
  ),
  twofloor: (
    <>
      <path d="M4 11 16 3l12 8" />
      <path d="M6 11v10h20V11M6 16h20" />
      <path d="M10 16v-2.5h12V16M9.5 19h3M19.5 19h3" />
    </>
  ),
  single: (
    <>
      <path d="M2 8h28" />
      <path d="M5 8v13h22V8" />
      <path d="M8 11h11v10M22 13h3v8" />
    </>
  ),
  kiosk: (
    <>
      <path d="M5 10v11h22V10" />
      <path d="M3 10l3-5h20l3 5" />
      <path d="M3 10c1 2.4 3 2.4 4 0 1 2.4 3 2.4 4 0 1 2.4 3 2.4 4 0 1 2.4 3 2.4 4 0 1 2.4 3 2.4 4 0 1 2.4 3 2.4 4 0" />
      <path d="M9 13h14v5H9Z" />
    </>
  ),
  pergola: (
    <>
      <path d="M3 7h26" />
      <path d="M6 7v14M26 7v14" />
      <path d="M10 4v3M14 4v3M18 4v3M22 4v3" />
      <path d="M10 21v-5h12v5" />
    </>
  ),
};

function ModelIcon({ id, className = "" }) {
  return (
    <svg viewBox="0 0 32 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
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
      duration: 0.6,
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

const Label = ({ children }) => <span className="block text-[11px] tracking-[0.18em] text-walnut mb-3">{children}</span>;

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
  // أثناء العرض يُحسب بسعر العرض ويظهر السعر الأصلي مشطوباً
  const rate = OFFER.active ? OFFER.price : model.ratePerMeter;
  const toggleAddon = (id) => setAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  const structureCost = area * rate;
  const addonsCost = addons.reduce((sum, id) => sum + (CALC_ADDONS.find((a) => a.id === id)?.cost || 0), 0);
  const total = structureCost + addonsCost;
  const minCost = total * 0.95;
  const maxCost = total * 1.08;

  const sendToWhatsApp = () => {
    const addonNames = addons
      .map((id) => CALC_ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join("، ");
    const message =
      CALC.whatsapp +
      `%0A- النوع: ${model.name}` +
      `%0A- المساحة: ${area} م²` +
      `%0A- الإضافات: ${addonNames || "بدون"}` +
      `%0A- التقدير: ${fmt(minCost)} – ${fmt(maxCost)} ر.س` +
      (OFFER.active ? `%0A- بسعر عرض ${OFFER.badge} (${fmt(OFFER.price)} ر.س/م²)` : "");
    window.open(`${CONTACT.whatsappUrl}?text=${message}`, "_blank");
  };

  return (
    <section id="calculator" ref={sectionRef} className="bg-white py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader number="03" label="الحاسبة" title={CALC.title} intro={CALC.intro} size="sm" />

        <Reveal delay={120} className="mt-8 sm:mt-10">
          <div className="grid lg:grid-cols-12 rounded-3xl border border-line overflow-hidden bg-white text-right">
            {/* ── المدخلات ── */}
            <div className="lg:col-span-8 min-w-0 p-4 sm:p-8 space-y-7 sm:space-y-8">
              {/* النوع */}
              <div>
                <Label>النوع</Label>
                <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
                  {CALC_MODELS.map((m) => {
                    const active = m.id === modelId;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setModelId(m.id)}
                        aria-pressed={active}
                        className={`shrink-0 inline-flex items-center gap-2 sm:gap-2.5 h-11 sm:h-12 ps-3.5 pe-4 sm:ps-4 sm:pe-5 rounded-full border text-[13px] sm:text-sm font-medium transition-colors duration-300 ${
                          active ? "bg-espresso border-espresso text-white" : "border-line text-ink hover:border-ink/40"
                        }`}
                      >
                        <ModelIcon id={m.icon} className={`w-7 h-5 ${active ? "text-oak-light" : "text-walnut"}`} />
                        {m.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* المساحة */}
              <div>
                <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
                  <div>
                    <Label>المساحة</Label>
                    <div className="flex flex-wrap gap-1.5">
                      {CALC.areaPresets.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setArea(p)}
                          aria-pressed={area === p}
                          className={`h-9 px-3.5 rounded-full border text-xs num transition-colors ${
                            area === p ? "bg-espresso border-espresso text-white" : "border-line text-ink/80 hover:border-ink/40"
                          }`}
                        >
                          {p} م²
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setArea((a) => Math.max(25, a - 5))}
                      className="w-9 h-9 rounded-full border border-line text-ink hover:bg-stone transition-colors"
                      aria-label="تقليل المساحة"
                    >
                      −
                    </button>
                    <span className="font-display font-bold text-2xl sm:text-3xl num text-ink w-14 sm:w-16 text-center tabular-nums">{area}</span>
                    <button
                      type="button"
                      onClick={() => setArea((a) => Math.min(400, a + 5))}
                      className="w-9 h-9 rounded-full border border-line text-ink hover:bg-stone transition-colors"
                      aria-label="زيادة المساحة"
                    >
                      +
                    </button>
                    <span className="text-xs text-ink/50">م²</span>
                  </div>
                </div>
                <Slider.Root
                  value={[area]}
                  onValueChange={(v) => setArea(v[0])}
                  min={25}
                  max={400}
                  step={5}
                  dir="rtl"
                  className="relative flex w-full touch-none items-center select-none py-3"
                  aria-label="المساحة بالمتر المربع"
                >
                  <Slider.Track className="relative grow h-1 rounded-full bg-stone">
                    <Slider.Range className="absolute h-full rounded-full bg-espresso" />
                  </Slider.Track>
                  <Slider.Thumb className="block w-5 h-5 rounded-full bg-white border-2 border-espresso shadow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-espresso/15" />
                </Slider.Root>
              </div>

              {/* الإضافات */}
              <div>
                <Label>إضافات مجانية (اختياري)</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CALC_ADDONS.map((a) => {
                    const active = addons.includes(a.id);
                    return (
                      <button
                        key={a.id}
                        type="button"
                        role="checkbox"
                        aria-checked={active}
                        onClick={() => toggleAddon(a.id)}
                        className={`flex items-center justify-between gap-3 h-11 px-3.5 rounded-xl border text-sm transition-colors ${
                          active ? "border-espresso bg-espresso/5 text-ink" : "border-line text-ink/75 hover:border-ink/40"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center text-[10px] transition-colors ${
                              active ? "bg-espresso border-espresso text-white" : "border-ink/30"
                            }`}
                          >
                            {active && "✓"}
                          </span>
                          {a.name}
                        </span>
                        <span className="text-xs num text-ink/50">{a.cost ? `+${fmt(a.cost)}` : "مجاناً"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── النتيجة — بني بنسيج خشب ── */}
            <div className="lg:col-span-4 min-w-0 relative bg-espresso wood-overlay text-white">
              <div className="relative p-5 sm:p-8 h-full flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="block text-[11px] tracking-[0.18em] text-white/50">
                      التقدير
                      {OFFER.active && <span className="ms-2 inline-flex items-center h-5 px-2 rounded-full bg-[#006c35] text-white text-[10px] tracking-normal align-middle">{OFFER.badge}</span>}
                    </span>
                    <span className="block mt-1 font-display font-semibold text-lg">{model.name}</span>
                  </div>
                  <ModelIcon id={model.icon} className="w-12 h-9 text-oak-light shrink-0" />
                </div>

                <div className="mt-7">
                  <div className="font-display font-bold text-[1.7rem] sm:text-3xl xl:text-[2.4rem] leading-none num flex flex-wrap items-baseline gap-x-2">
                    <CountUp value={minCost} />
                    <span className="text-white/35 text-xl">–</span>
                    <CountUp value={maxCost} />
                  </div>
                  <span className="block mt-2 text-xs text-white/55">ر.س · شامل التوريد والتركيب</span>
                </div>

                <dl className="mt-6 pt-5 border-t border-line-dark grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <dt className="text-white/45">المساحة</dt>
                    <dd className="num mt-0.5">{area} م²</dd>
                  </div>
                  <div>
                    <dt className="text-white/45">سعر المتر</dt>
                    <dd className="num mt-0.5">
                      {fmt(rate)}
                      {OFFER.active && <span className="ms-1.5 text-white/40 line-through">{fmt(model.ratePerMeter)}</span>}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-white/45">الإضافات</dt>
                    <dd className="num mt-0.5">{addonsCost ? fmt(addonsCost) : "مجاناً"}</dd>
                  </div>
                </dl>

                <div className="mt-auto pt-7 space-y-3">
                  <button type="button" onClick={sendToWhatsApp} className={waButtonClass("md", "w-full")}>
                    <WhatsAppIcon />
                    أرسل التقدير على الواتساب
                  </button>
                  <a href={telLink} className="block text-center text-xs text-white/60 link-underline w-fit mx-auto">
                    أو اتصل: <span className="num" dir="ltr">{CONTACT.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
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
        <button type="button" onClick={sendToWhatsApp} className={waButtonClass("sm", "shrink-0")}>
          <WhatsAppIcon className="w-4 h-4" />
          واتساب
        </button>
      </div>
    </section>
  );
}
