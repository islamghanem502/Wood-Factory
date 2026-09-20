import { useMemo, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import SectionHeader from "./SectionHeader";
import { CONTACT, telLink } from "../config/contact";
import { CALC_MODELS, CALC_ADDONS } from "../data/content";
import { Reveal } from "../lib/motion";

const fmt = (n) => n.toLocaleString("en-US");

export default function CostCalculator() {
  const [modelId, setModelId] = useState(CALC_MODELS[0].id);
  const [area, setArea] = useState(80);
  const [addons, setAddons] = useState(["terrace"]);

  const model = useMemo(() => CALC_MODELS.find((m) => m.id === modelId) || CALC_MODELS[0], [modelId]);

  const toggleAddon = (id) => setAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  const structureCost = area * model.ratePerMeter;
  const addonsCost = addons.reduce((sum, id) => sum + (CALC_ADDONS.find((a) => a.id === id)?.cost || 0), 0);
  const total = structureCost + addonsCost;
  const minCost = Math.round(total * 0.95);
  const maxCost = Math.round(total * 1.08);

  const sendToWhatsApp = () => {
    const addonNames = addons
      .map((id) => CALC_ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join("، ");
    const message =
      `مرحباً خشبي WOODEN، استخدمت حاسبة التكاليف وأرغب في تقدير تفصيلي:` +
      `%0A- النموذج: ${model.name}` +
      `%0A- المساحة: ${area} م²` +
      `%0A- الإضافات: ${addonNames || "بدون"}` +
      `%0A- التقدير: ${fmt(minCost)} – ${fmt(maxCost)} ر.س`;
    window.open(`${CONTACT.whatsappUrl}?text=${message}`, "_blank");
  };

  return (
    <section id="calculator" className="bg-cream-2 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader number="03" label="الحاسبة" title="تقدير التكلفة" intro="اختر النموذج والمساحة والإضافات، واحصل على نطاق سعري مبدئي." />

        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16 text-right">
          {/* المدخلات */}
          <div className="lg:col-span-7 space-y-12">
            {/* النموذج */}
            <Reveal>
              <h3 className="text-xs tracking-[0.18em] text-walnut mb-2">النموذج</h3>
              <ul className="border-t border-line">
                {CALC_MODELS.map((m) => {
                  const active = m.id === modelId;
                  return (
                    <li key={m.id} className="border-b border-line">
                      <button
                        type="button"
                        onClick={() => setModelId(m.id)}
                        aria-pressed={active}
                        className={`w-full flex items-center gap-4 py-4 text-right transition-colors ${active ? "text-ink" : "text-ink/60 hover:text-ink"}`}
                      >
                        <span className={`w-4 h-4 rounded-full border shrink-0 transition-colors ${active ? "bg-walnut-deep border-walnut-deep" : "border-walnut/40"}`} />
                        <span className="flex-1 min-w-0">
                          <span className="block font-medium">{m.name}</span>
                          <span className="block text-sm text-ink/55">{m.desc}</span>
                        </span>
                        <span className="text-sm num whitespace-nowrap">{fmt(m.ratePerMeter)} ر.س / م²</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            {/* المساحة */}
            <Reveal>
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="text-xs tracking-[0.18em] text-walnut">المساحة</h3>
                <span className="font-display text-3xl num text-ink">
                  {area} <span className="text-base text-ink/60">م²</span>
                </span>
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
                <Slider.Track className="relative grow h-px bg-walnut/30">
                  <Slider.Range className="absolute h-full bg-walnut-deep" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 rounded-full bg-cream border-2 border-walnut-deep shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-walnut/20" />
              </Slider.Root>
              <div className="flex justify-between text-xs text-ink/50 num mt-1">
                <span>25 م²</span>
                <span>400 م²</span>
              </div>
            </Reveal>

            {/* الإضافات */}
            <Reveal>
              <h3 className="text-xs tracking-[0.18em] text-walnut mb-2">إضافات (اختياري)</h3>
              <ul className="border-t border-line">
                {CALC_ADDONS.map((a) => {
                  const active = addons.includes(a.id);
                  return (
                    <li key={a.id} className="border-b border-line">
                      <button
                        type="button"
                        onClick={() => toggleAddon(a.id)}
                        aria-pressed={active}
                        className={`w-full flex items-center gap-4 py-4 text-right transition-colors ${active ? "text-ink" : "text-ink/60 hover:text-ink"}`}
                      >
                        <span
                          className={`w-4 h-4 rounded-sm border shrink-0 flex items-center justify-center text-[10px] transition-colors ${
                            active ? "bg-walnut-deep border-walnut-deep text-cream" : "border-walnut/40"
                          }`}
                        >
                          {active && "✓"}
                        </span>
                        <span className="flex-1">{a.name}</span>
                        <span className="text-sm num whitespace-nowrap">+{fmt(a.cost)} ر.س</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* النتيجة — لوحة بنية */}
          <Reveal delay={120} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 bg-walnut-deep text-cream rounded-lg p-7 sm:p-9">
              <span className="text-xs tracking-[0.18em] text-cream/55">التقدير المبدئي</span>
              <h4 className="mt-2 font-display font-semibold text-2xl">{model.name}</h4>
              <p className="text-sm text-cream/60 num">{area} م²</p>

              <dl className="mt-8 space-y-3 text-sm border-y border-line-dark py-5">
                <div className="flex justify-between gap-4">
                  <dt className="text-cream/65">الهيكل الخشبي والتصنيع</dt>
                  <dd className="num">{fmt(structureCost)} ر.س</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-cream/65">الإضافات ({addons.length})</dt>
                  <dd className="num">{fmt(addonsCost)} ر.س</dd>
                </div>
              </dl>

              <div className="mt-7">
                <span className="text-xs text-cream/55">النطاق التقديري</span>
                <div className="mt-1 font-display font-bold text-3xl sm:text-4xl num leading-tight">
                  {fmt(minCost)} – {fmt(maxCost)}
                  <span className="block text-base font-normal text-cream/60 mt-1">ريال سعودي</span>
                </div>
              </div>

              <p className="mt-5 text-xs text-cream/50 leading-relaxed">
                التكلفة النهائية تعتمد على المخطط التفصيلي والموقع ونوع التشطيب.
              </p>

              <div className="mt-8 space-y-3">
                <button
                  type="button"
                  onClick={sendToWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-md bg-cream text-ink font-medium hover:bg-cream-2 transition-colors"
                >
                  إرسال التقدير عبر الواتساب
                  <span aria-hidden>←</span>
                </button>
                <a href={telLink} className="block text-center text-sm text-cream/70 link-underline w-fit mx-auto">
                  أو اتصل على <span className="num" dir="ltr">{CONTACT.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
