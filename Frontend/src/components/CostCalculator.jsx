import { useMemo, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { Sparkles, Check, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { CONTACT, telLink } from "../config/contact";
import { CALC_MODELS, CALC_ADDONS } from "../data/content";

const fmt = (n) => n.toLocaleString("ar-SA");

export default function CostCalculator({ onOpenConsultation }) {
  const [modelId, setModelId] = useState(CALC_MODELS[0].id);
  const [area, setArea] = useState(80);
  const [addons, setAddons] = useState(["terrace", "glass"]);

  const model = useMemo(() => CALC_MODELS.find((m) => m.id === modelId) || CALC_MODELS[0], [modelId]);

  const toggleAddon = (id) =>
    setAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  const structureCost = useMemo(() => area * model.ratePerMeter, [area, model]);
  const addonsCost = useMemo(
    () => addons.reduce((sum, id) => sum + (CALC_ADDONS.find((a) => a.id === id)?.cost || 0), 0),
    [addons],
  );
  const total = structureCost + addonsCost;
  const minCost = Math.round(total * 0.95);
  const maxCost = Math.round(total * 1.08);

  const sendToWhatsApp = () => {
    const addonNames = addons
      .map((id) => CALC_ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ");
    const message =
      `مرحباً خشبي WOODEN 👋%0A%0Aاستخدمت حاسبة التكاليف التفاعلية في موقعكم وأرغب في تثبيت هذا العرض التقديري:` +
      `%0A- النموذج المختار: ${model.name}` +
      `%0A- المساحة: ${area} متر مربع` +
      `%0A- الإضافات المختارة: ${addonNames || "بدون إضافات"}` +
      `%0A- التكلفة التقديرية المحسوبة: ${fmt(minCost)} - ${fmt(maxCost)} ر.س` +
      `%0A%0Aأرجو تزويدي بدراسة تفصيلية وموعد بدء التنفيذ.`;
    window.open(`${CONTACT.whatsappUrl}?text=${message}`, "_blank");
  };

  return (
    <div className="relative rounded-3xl p-4 sm:p-10 gold-glass border border-[#cba157]/30 shadow-2xl overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#cba157]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* الترويسة */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-[#cba157]/20 pb-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">احسب تكلفة كوخك أو برجولتك المستقبلية بدقة</h3>
            <p className="text-sm text-neutral-400 mt-1">حدد النموذج والمساحة والمميزات للحصول على تقدير استثماري فوري وشفاف</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#cba157]">
            <Sparkles className="w-4 h-4" />
            <span>تسعير بالريال السعودي شامل التوريد والتركيب</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* المدخلات */}
          <div className="lg:col-span-7 space-y-6 text-right">
            {/* 1. النموذج */}
            <div>
              <label className="block text-sm font-bold text-white mb-3">1. اختر نوع النموذج الخشبي:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CALC_MODELS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setModelId(m.id)}
                    className={`p-3.5 rounded-xl border text-right transition-all flex flex-col justify-between ${
                      modelId === m.id
                        ? "bg-[#cba157]/20 border-[#cba157] text-white shadow-lg shadow-[#cba157]/10 ring-1 ring-[#cba157]"
                        : "bg-[#14171d] border-neutral-800 text-neutral-300 hover:border-[#cba157]/40 hover:bg-[#1a1f27]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-[#f7dfa5]">{m.name}</span>
                      {modelId === m.id && <Check className="w-4 h-4 text-[#cba157]" />}
                    </div>
                    <span className="text-[11px] text-neutral-400 leading-relaxed mb-2">{m.desc}</span>
                    <span className="text-xs font-semibold text-[#cba157]">{m.ratePerMeter} ر.س / م² تقريباً</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. المساحة */}
            <div className="bg-[#14171d] p-5 rounded-2xl border border-neutral-800 space-y-4">
              <div className="flex justify-between items-center gap-3">
                <span className="text-sm font-bold text-white">2. المساحة الإجمالية المطلوبة:</span>
                <span className="text-xl font-black text-[#f7dfa5] px-3 py-1 bg-[#cba157]/15 rounded-lg border border-[#cba157]/30 whitespace-nowrap shrink-0">
                  {area} <span className="text-xs font-normal text-neutral-300">متر مربع</span>
                </span>
              </div>
              <Slider.Root
                value={[area]}
                onValueChange={(v) => setArea(v[0])}
                min={25}
                max={400}
                step={5}
                dir="rtl"
                className="relative flex w-full touch-none items-center select-none py-2"
              >
                <Slider.Track className="bg-muted relative grow overflow-hidden rounded-full h-1.5 w-full">
                  <Slider.Range className="bg-primary absolute h-full" />
                </Slider.Track>
                <Slider.Thumb className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden" />
              </Slider.Root>
              <div className="flex justify-between text-[11px] text-neutral-500 font-medium">
                <span>25 م² (كوخ حديقة صغير)</span>
                <span className="hidden sm:inline">120 م² (كوخ متوسط)</span>
                <span>400 م² (قصر ريفي متكامل)</span>
              </div>
            </div>

            {/* 3. الملحقات */}
            <div>
              <label className="block text-sm font-bold text-white mb-3">3. ملحقات وتجهيزات استثنائية (اختياري):</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CALC_ADDONS.map((addon) => {
                  const active = addons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border text-right transition-all flex items-center justify-between ${
                        active
                          ? "bg-[#cba157]/15 border-[#cba157] text-white"
                          : "bg-[#14171d] border-neutral-800 text-neutral-400 hover:border-neutral-700"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            active ? "bg-[#cba157] border-[#cba157] text-black" : "border-neutral-600"
                          }`}
                        >
                          {active && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium text-neutral-200">{addon.name}</span>
                      </div>
                      <span className="text-xs text-[#cba157] font-semibold">+{fmt(addon.cost)} ر.س</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* النتيجة */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#181c24] to-[#0f1115] border-2 border-[#cba157]/40 rounded-3xl p-4 sm:p-7 shadow-2xl space-y-6 relative">
            <div className="text-right">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#cba157]">التقدير المالي المبدئي للمشروع</span>
              <h4 className="text-xl font-black text-white mt-1">{model.name}</h4>
              <p className="text-xs text-neutral-400">مساحة إجمالية: {area} متر مربع</p>
            </div>

            <div className="space-y-3 border-y border-neutral-800 py-4 text-xs text-neutral-300">
              <div className="flex justify-between items-center">
                <span>تكلفة الهيكل الخشبي والتصنيع:</span>
                <span className="font-bold text-white">{fmt(structureCost)} ر.س</span>
              </div>
              <div className="flex justify-between items-center">
                <span>قيمة الملحقات المختارة ({addons.length}):</span>
                <span className="font-bold text-white">+{fmt(addonsCost)} ر.س</span>
              </div>
              <div className="flex justify-between items-center text-emerald-400">
                <span>خصم خاص لمشاريع اليوم الوطني وعروض الموسم:</span>
                <span className="font-bold">مشمول بالاستشارة</span>
              </div>
            </div>

            <div className="bg-[#0b0c0e]/80 border border-[#cba157]/30 rounded-2xl p-4 text-center">
              <span className="text-xs text-neutral-400 block mb-1">متوسط التكلفة التقديرية</span>
              <div className="text-2xl sm:text-4xl font-black text-[#f7dfa5] tracking-tight">
                <span className="whitespace-nowrap">{fmt(minCost)} - {fmt(maxCost)}</span>
                <span className="block sm:inline text-sm font-normal text-neutral-400 sm:mr-2 mt-1 sm:mt-0">ريال سعودي</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-2">
                * التكلفة نهائية تعتمد على المخطط التفصيلي، الموقع الجغرافي، ونوعية التشطيب الداخلي
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={sendToWhatsApp}
                className="w-full inline-flex items-center justify-center whitespace-nowrap bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 text-sm sm:text-base px-3 shadow-lg shadow-emerald-950/50 gap-2 rounded-xl transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                تثبيت الحسبة والمحادثة عبر الواتساب
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onOpenConsultation(model.name)}
                  className="inline-flex items-center justify-center whitespace-nowrap border bg-transparent border-[#cba157] text-[#f7dfa5] hover:bg-[#cba157]/15 font-bold h-11 text-xs gap-1.5 px-2 rounded-xl transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#cba157]" />
                  طلب استشارة مجانية
                </button>
                <a
                  href={telLink}
                  className="inline-flex items-center justify-center whitespace-nowrap border bg-transparent border-neutral-700 text-white hover:bg-neutral-800 font-bold h-11 text-xs gap-1.5 px-2 rounded-xl transition-all"
                >
                  <Phone className="w-4 h-4 text-[#cba157]" />
                  اتصال هاتفي مباشر
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#cba157]" />
              <span>ضمان 15 سنة • جدران خشب سنوبر 12 سم • أسقف 5 طبقات</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
