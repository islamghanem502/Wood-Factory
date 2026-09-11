import { Building2, Check, Sparkles, MessageCircle } from "lucide-react";
import { waLink } from "../config/contact";
import { PRODUCTS } from "../data/content";

export default function Products({ onOpenConsultation }) {
  return (
    <section id="products" className="py-20 bg-[#0b0c0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#cba157]/15 text-[#e5be70] border border-[#cba157]/30">
            <Building2 className="w-3.5 h-3.5" />
            نماذج وتصاميم 2026 الحصرية
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            باقات وتصاميم الأكواخ الخشبية في <span className="gold-gradient-text">خشبي</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            تشكيلة متنوعة تمنحك حرية الاختيار بين الأكواخ الهرمية، الشاليهات متعددة الطوابق، الجلسات والبرجولات الخارجية، أو مشاريع المقاهي الاستثمارية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="rounded-3xl bg-[#12151b] border border-[#cba157]/25 overflow-hidden flex flex-col justify-between hover:border-[#cba157]/60 transition-all duration-300 hover:shadow-2xl hover:shadow-[#cba157]/10 group"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151b] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-[#cba157] text-black shadow-lg">
                    {p.badge}
                  </span>
                  <span className="absolute bottom-3 right-4 text-xs font-semibold text-[#f7dfa5] bg-[#0b0c0e]/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-[#cba157]/30">
                    {p.deliveryTime}
                  </span>
                </div>

                <div className="p-6 text-right space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-[#f7dfa5] transition-colors">{p.title}</h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{p.subtitle}</p>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-neutral-800">
                    <span className="text-[11px] font-bold text-[#cba157] uppercase tracking-wider block">المواصفات الفنية:</span>
                    <ul className="space-y-1.5 text-xs text-neutral-300">
                      {p.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#cba157] shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2.5">
                <div className="p-3 rounded-xl bg-[#171a22] border border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">التسعير التقديري:</span>
                  <span className="font-bold text-[#f7dfa5]">{p.priceEstimate}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenConsultation(p.title)}
                    className="py-2.5 px-3 rounded-xl gold-gradient-bg text-black font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 transition-all shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>طلب استشارة</span>
                  </button>
                  <a
                    href={waLink(`مرحباً مؤسسة خشبي WOODEN، أرغب في الاستفسار عن باقة: ${p.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-950/40"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>واتساب مباشر</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
