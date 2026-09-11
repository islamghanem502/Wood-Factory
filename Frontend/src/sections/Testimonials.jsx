import { TESTIMONIALS } from "../data/content";

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#0b0c0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold text-[#cba157] tracking-wider uppercase block">تجارب تثق بها</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">ماذا يقول عملاؤنا في أنحاء المملكة؟</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-[#12151b] border border-[#cba157]/20 flex flex-col justify-between text-right space-y-4 hover:border-[#cba157]/50 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#cba157]">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <span key={s}>★</span>
                  ))}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed italic">"{t.text}"</p>
              </div>
              <div className="pt-3 border-t border-neutral-800">
                <h5 className="font-bold text-white text-sm">{t.name}</h5>
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-0.5">
                  <span>{t.city}</span>
                  <span className="text-[#cba157]">{t.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
