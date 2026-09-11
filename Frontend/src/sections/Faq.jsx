import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "../data/content";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-20 bg-[#0e1015] border-t border-[#cba157]/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-right">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold text-[#cba157] uppercase tracking-wider block">كل ما تحتاج معرفته</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">الأسئلة الشائعة حول بناء الأكواخ الخشبية</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="rounded-2xl bg-[#12151b] border border-[#cba157]/25 overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-[#f7dfa5] transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#cba157] transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 animate-in fade-in-50">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
