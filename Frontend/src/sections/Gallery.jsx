import { useState } from "react";
import { Maximize2, ArrowLeft, MessageCircle } from "lucide-react";
import { waLink } from "../config/contact";
import { PROJECTS, GALLERY_FILTERS } from "../data/content";

export default function Gallery({ onOpenConsultation }) {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const projects = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      <section id="gallery" className="py-20 bg-[#0b0c0e] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              إبداعات <span className="gold-gradient-text">خشبي WOODEN</span> على أرض الواقع
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              شاهد نماذج لمشاريع حقيقية تم تسليمها في الرياض، جدة، العلا، وأبها لمنتجعات واستراحات وفلل خاصة.
            </p>
          </div>

          {/* الفلاتر */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {GALLERY_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  filter === f.id
                    ? "gold-gradient-bg text-black shadow-lg shadow-[#cba157]/20"
                    : "bg-[#14171d] text-neutral-300 border border-neutral-800 hover:border-[#cba157]/40"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* البطاقات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl bg-[#12151b] border border-[#cba157]/20 overflow-hidden flex flex-col justify-between group hover:border-[#cba157] transition-all hover:-translate-y-1 duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 cursor-pointer" onClick={() => setSelected(p)}>
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151b] via-transparent to-transparent opacity-70" />
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#0b0c0e]/80 text-[#f7dfa5] border border-[#cba157]/30">
                    {p.categoryLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelected(p)}
                    className="absolute bottom-3 left-3 p-1.5 rounded-lg bg-black/60 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    title="تكبير ومعاينة"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 text-right space-y-2">
                  <h4 className="text-base font-bold text-white group-hover:text-[#f7dfa5] transition-colors">{p.title}</h4>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{p.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-800">
                    <span>
                      المساحة: <strong className="text-[#f7dfa5]">{p.area}</strong>
                    </span>
                    <span>
                      مدة التنفيذ: <strong className="text-emerald-400">{p.duration}</strong>
                    </span>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    type="button"
                    onClick={() => onOpenConsultation(`مشروع مشابه لـ: ${p.title}`)}
                    className="w-full py-2 rounded-xl bg-[#191d26] hover:bg-[#cba157] text-[#f7dfa5] hover:text-black font-bold text-xs border border-[#cba157]/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>طلب تصميم وتنفيذ مماثل</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* أرسل تصميمك */}
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#141820] border border-[#cba157]/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
            <div>
              <h4 className="text-xl font-bold text-white">هل لديك صورة أو مخطط من بنترست أو تصميم خاص؟</h4>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                أرسل لنا صورتك المفضلة عبر الواتساب وسنقوم بدراستها وتحويلها إلى مخطط تنفيذي دقيق مع عرض سعر فوري.
              </p>
            </div>
            <a
              href={waLink("مرحباً مؤسسة خشبي WOODEN، لدي صورة/تصميم خاص أرغب في الاستفسار عن إمكانية تنفيذه وتكلفته.")}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>إرسال تصميمك عبر الواتساب</span>
            </a>
          </div>
        </div>
      </section>

      {/* نافذة معاينة المشروع */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-w-4xl w-full max-h-[92vh] overflow-y-auto bg-[#12151b] border border-[#cba157]/40 rounded-3xl shadow-2xl relative text-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-black">
              <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-black"
              >
                ✕
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#cba157] text-black">{selected.categoryLabel}</span>
                <span className="text-xs text-neutral-400">
                  المساحة: {selected.area} • التنفيذ: {selected.duration}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white">{selected.title}</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">{selected.description}</p>
              <div className="pt-3 flex flex-wrap gap-2">
                {selected.features.map((f, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-lg bg-[#191d26] border border-neutral-700 text-[#f7dfa5]">
                    ✓ {f}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const title = selected.title;
                    setSelected(null);
                    onOpenConsultation(`مشروع: ${title}`);
                  }}
                  className="sm:flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md gold-gradient-bg text-black font-bold h-11 text-sm transition-all"
                >
                  طلب تفاصيل وسعر هذا المشروع
                </button>
                <a
                  href={waLink(`مرحباً مؤسسة خشبي WOODEN، أرغب في الاستفسار عن تفاصيل مشروع: ${selected.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  واتساب
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
