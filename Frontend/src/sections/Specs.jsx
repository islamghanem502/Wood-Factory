import { BrickWall, Layers, AppWindow, Check } from "lucide-react";
import { SPECS } from "../data/content";

export default function Specs() {
  const { walls, roof, glass } = SPECS;

  return (
    <section id="specs" className="py-20 bg-[#0e1015] border-t border-[#cba157]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            المواصفات الفنية لأكواخ <span className="gold-gradient-text">خشبي WOODEN</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            تفاصيل البناء التي تحدد جودة الكوخ ومتانته: الجدران، الأسقف، والزجاج.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-right">
          {/* الجدران */}
          <div className="lg:col-span-4 p-7 rounded-3xl bg-[#12151b] border border-[#cba157]/20 hover:border-[#cba157]/50 transition-all flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#181c24] border border-[#cba157]/30 flex items-center justify-center text-[#cba157]">
                <BrickWall className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">{walls.title}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">{walls.description}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#171a22] border border-[#cba157]/20 flex items-center justify-between gap-4">
              <div>
                <span className="block text-[11px] text-neutral-500">سماكة الجدار</span>
                <span className="text-sm font-bold text-[#f7dfa5]">{walls.material}</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#f7dfa5] tracking-tight whitespace-nowrap">
                {walls.value} <span className="text-base font-bold text-neutral-300">{walls.unit}</span>
              </div>
            </div>
          </div>

          {/* الأسقف */}
          <div className="lg:col-span-8 p-7 rounded-3xl bg-[#12151b] border border-[#cba157]/20 hover:border-[#cba157]/50 transition-all">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 rounded-xl bg-[#181c24] border border-[#cba157]/30 flex items-center justify-center text-[#cba157] shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{roof.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed mt-1">{roof.description}</p>
              </div>
            </div>

            <ol className="space-y-2.5">
              {roof.layers.map((layer, i) => (
                <li
                  key={layer.name}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#171a22] border border-neutral-800 hover:border-[#cba157]/40 transition-all"
                >
                  <span className="w-9 h-9 rounded-xl gold-gradient-bg text-black font-black text-sm flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[11px] text-[#cba157] font-semibold">{layer.label}</span>
                    <span className="block text-sm font-bold text-white">{layer.name}</span>
                  </div>
                  <span className="hidden sm:block text-xs text-neutral-400 shrink-0">{layer.note}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* الزجاج */}
          <div className="lg:col-span-12 p-7 rounded-3xl bg-[#12151b] border border-[#cba157]/20 hover:border-[#cba157]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#181c24] border border-[#cba157]/30 flex items-center justify-center text-[#cba157] shrink-0">
                <AppWindow className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{glass.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed mt-1 max-w-2xl">{glass.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {glass.options.map((opt) => (
                <span
                  key={opt}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#171a22] border border-[#cba157]/30 text-[#f7dfa5] font-black text-lg whitespace-nowrap"
                >
                  <Check className="w-4 h-4 text-[#cba157]" />
                  {opt}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
