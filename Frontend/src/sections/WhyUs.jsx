import { Award } from "lucide-react";
import { FEATURES, COMPARISON_ROWS } from "../data/content";

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 bg-[#0e1015] border-t border-[#cba157]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#cba157]/15 text-[#e5be70] border border-[#cba157]/30">
            <Award className="w-3.5 h-3.5" />
            المعايير الهندسية والتقنية
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            لماذا تعتبر <span className="gold-gradient-text">خشبي WOODEN</span> الخيار الأول؟
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            نجمع بين عراقة الفن الخشبي وأحدث حلول التكنولوجيا الأوروبية المبتكرة لتناسب مناخ المملكة الاستثنائي.
          </p>
        </div>

        {/* المميزات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.number}
              className="p-7 rounded-3xl bg-[#12151b] border border-[#cba157]/20 hover:border-[#cba157]/50 transition-all text-right relative overflow-hidden group"
            >
              <span className="text-4xl font-black text-[#cba157]/20 absolute top-4 left-5 font-mono select-none">{f.number}</span>
              <div className="relative z-10 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#181c24] border border-[#cba157]/30 flex items-center justify-center text-[#cba157] font-bold">
                  {f.number}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#f7dfa5] transition-colors">{f.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* جدول المقارنة */}
        <div className="mt-16 rounded-3xl bg-[#12151b] border border-[#cba157]/30 p-6 sm:p-10 text-right overflow-x-auto">
          <div className="flex items-center justify-between mb-6 border-b border-neutral-800 pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                مقارنة: أكواخ <span className="gold-gradient-text">خشبي WOODEN</span> مقابل البناء الخرساني التقليدي
              </h3>
              <p className="text-xs text-neutral-400 mt-1">لماذا يتجه المستثمرون وملاك الشاليهات إلى الأكواخ الخشبية المودولار؟</p>
            </div>
          </div>
          <table className="w-full text-right text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#cba157]/20 text-neutral-400">
                <th className="py-3 px-4">وجه المقارنة</th>
                <th className="py-3 px-4 text-[#f7dfa5] font-bold">أكواخ خشبي WOODEN الحديثة</th>
                <th className="py-3 px-4 text-neutral-400">البناء الخرساني التقليدي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.label}>
                  <td className="py-3.5 px-4 font-bold text-white">{row.label}</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">{row.wooden}</td>
                  <td className="py-3.5 px-4 text-neutral-400">{row.concrete}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
