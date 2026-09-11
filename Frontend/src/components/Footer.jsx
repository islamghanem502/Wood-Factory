import { Phone, MessageCircle, MapPin, ShieldCheck, Award, Clock, ArrowUp } from "lucide-react";
import { CONTACT, waLink, telLink } from "../config/contact";
import { IMAGES } from "../data/content";

const SITE_LINKS = [
  { href: "#hero", label: "الرئيسية ومقدمة المشروع" },
  { href: "#products", label: "باقات ونماذج الأكواخ (A-Frame، دورين، دور واحد)" },
  { href: "#gallery", label: "معرض الأعمال والمشاريع المنفذة" },
  { href: "#calculator", label: "حاسبة التكاليف التفاعلية الفورية" },
  { href: "#why-us", label: "المواصفات الفنية والمميزات الهندسية" },
  { href: "#faq", label: "الأسئلة الشائعة وإجابات الخبراء" },
];

export default function Footer({ onOpenConsultation }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#08090b] text-[#f4ede4] border-t border-[#cba157]/20 pt-16 pb-28 sm:pb-12 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#cba157]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* بطاقة CTA */}
        <div className="rounded-3xl p-6 sm:p-12 mb-16 bg-gradient-to-r from-[#171a22] via-[#212632] to-[#171a22] border border-[#cba157]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-right">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-[#cba157] tracking-wider uppercase block">
              جاهز لتحويل أرضك أو مزرعتك أو حديقتك إلى ملاذ ريفي استثنائي؟
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              ابدأ مشروعك اليوم مع <span className="gold-gradient-text">خشبي WOODEN</span>
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              استفد من استشارة هندسية أولية مجانية تشمل دراسة المساحة، توزيع المخطط المقترح، وتكلفة تقريبية شاملة للتوريد والتركيب والضمان.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center whitespace-nowrap gold-gradient-bg text-black font-extrabold h-12 px-6 rounded-xl hover:brightness-110 shadow-lg shadow-[#cba157]/25 text-sm transition-all"
            >
              اطلب استشارتك المجانية
            </button>
            <a
              href={waLink("مرحباً مؤسسة خشبي WOODEN، أرغب في البدء في مشروع كوخ خشبي.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 px-6 rounded-xl text-sm transition-all shadow-md shadow-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              محادثة واتساب فورية
            </a>
          </div>
        </div>

        {/* الأعمدة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-right pb-12 border-b border-neutral-800">
          {/* عن الشركة */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#cba157]/40 p-0.5 bg-[#121418]">
                <img src={IMAGES.logo} alt="شعار الشركة" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white">خشبي | WOODEN</h4>
                <p className="text-xs text-[#cba157]">فخامة البناء الخشبي والأكواخ</p>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              الوجهة السعودية الأولى المتخصصة في هندسة وتصنيع وتشييد الأكواخ الريفية، الشاليهات، والمظلات الخشبية بتقنية CNC الحديثة ومطابقة الكود الأوروبي.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-[#cba157]">
              <ShieldCheck className="w-4 h-4" />
              <span>ضمان شامل حتى 15 سنة • معتمد وموثق</span>
            </div>
          </div>

          {/* أقسام الموقع */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold text-white border-r-2 border-[#cba157] pr-2.5">أقسام الموقع</h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-[#f7dfa5] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* قنوات التواصل */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold text-white border-r-2 border-[#cba157] pr-2.5">قنوات التواصل السريع</h5>
            <ul className="space-y-3 text-xs text-neutral-300">
              <li>
                <a href={telLink} className="flex items-center gap-2.5 hover:text-[#f7dfa5] transition-colors group">
                  <div className="w-7 h-7 rounded-lg bg-[#181c24] border border-[#cba157]/30 flex items-center justify-center text-[#cba157] group-hover:border-[#cba157]">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-500">الاتصال الهاتفي المباشر</span>
                    <span className="font-bold font-mono text-sm">{CONTACT.phoneDisplay}</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={waLink("مرحباً مؤسسة خشبي WOODEN، أرغب في استفسار.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#181c24] border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-500">محادثة واتساب مخصصة</span>
                    <span className="font-bold text-emerald-400">بدء محادثة فورية الآن</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-neutral-400">
                <div className="w-7 h-7 rounded-lg bg-[#181c24] border border-neutral-800 flex items-center justify-center text-neutral-400 shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-500">مناطق الخدمة والتنفيذ</span>
                  <span>الرياض • جدة • مكة المكرمة • العلا • عسير • القصيم وكافة مدن المملكة</span>
                </div>
              </li>
            </ul>
          </div>

          {/* معايير الجودة */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold text-white border-r-2 border-[#cba157] pr-2.5">معايير الجودة والاعتماد</h5>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="p-3 rounded-xl bg-[#12151b] border border-[#cba157]/20 flex items-center gap-2.5">
                <Award className="w-5 h-5 text-[#cba157] shrink-0" />
                <span>تصنيع آلي متقدم بتقنية CNC بدون أخطاء نجارة يدوية</span>
              </div>
              <div className="p-3 rounded-xl bg-[#12151b] border border-[#cba157]/20 flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#cba157] shrink-0" />
                <span>سرعة تركيب قياسية وتسليم على المفتاح مع التجهيز الكامل</span>
              </div>
            </div>
          </div>
        </div>

        {/* الحقوق */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 text-center sm:text-right">
          <p>© {new Date().getFullYear()} مؤسسة خشبي WOODEN للأعمال الخشبية والأكواخ الريفية. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <span className="text-neutral-400">مصنوع بأعلى مواصفات الإتقان والفخامة 🇸🇦</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#151821] hover:bg-[#202532] text-[#cba157] border border-[#cba157]/30 transition-all"
              title="العودة لأعلى الصفحة"
              aria-label="العودة لأعلى الصفحة"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
