import { Sparkles, Clock, ThermometerSnowflake, Award, ShieldCheck, MessageCircle, Phone } from "lucide-react";
import { waLink, telLink } from "../config/contact";
import { IMAGES } from "../data/content";

const HIGHLIGHTS = [
  { icon: Clock, text: "تركيب سريع في أيام معدودة" },
  { icon: ThermometerSnowflake, text: "عزل حراري بنسبة 95%" },
  { icon: Award, text: "مطابق للكود الأوروبي CNC" },
  { icon: ShieldCheck, text: "ضمان شامل يصل إلى 15 سنة" },
];

export default function Hero({ onOpenConsultation }) {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-20 overflow-hidden">
      {/* الخلفية */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="كوخ خشبي فاخر من خشبي WOODEN"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/80 to-[#0b0c0e]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,12,14,0.3)_0%,rgba(11,12,14,0.95)_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-[#161a22]/90 text-[#f7dfa5] border border-[#cba157]/40 shadow-xl mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#cba157]" />
          <span>الريادة السعودية في بناء الأكواخ والشاليهات الخشبية الفاخرة</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-snug sm:leading-snug max-w-5xl mx-auto space-y-2">
          <span className="block">حوّل حلمك إلى واقع ريفي ساحر مع</span>
          <span className="gold-gradient-text inline-flex items-center gap-3 font-serif font-black text-3xl sm:text-5xl md:text-6xl">
            خَـشَـبِـي
            <span className="font-sans text-xl sm:text-3xl md:text-4xl text-[#f7dfa5] font-bold tracking-widest uppercase border-r-2 border-[#cba157] pr-3">
              WOODEN
            </span>
          </span>
        </h1>

        <p className="text-base sm:text-xl text-[#d4cbbe] max-w-3xl mx-auto mt-6 leading-relaxed font-normal">
          أكواخ ريفية اسكندنافية، شاليهات فاخرة، وبرجولات حديثة تُصنّع بأحدث تقنيات{" "}
          <span className="text-[#f7dfa5] font-semibold">CNC الألمانية</span> ومطابقة تامة لـ{" "}
          <span className="text-[#f7dfa5] font-semibold">الكود الأوروبي</span>، مع عزل حراري فائق وضمان حقيقي حتى 15 سنة.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mt-8 text-xs text-neutral-300">
          {HIGHLIGHTS.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="p-3 rounded-xl bg-[#11141a]/80 border border-[#cba157]/20 backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <Icon className="w-4 h-4 text-[#cba157]" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-10 max-w-xl mx-auto">
          <a
            href={waLink("مرحباً مؤسسة خشبي WOODEN، أرغب في استفسار حول بناء كوخ خشبي فاخر.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto sm:flex-1 inline-flex items-center justify-center gap-2.5 h-13 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-xl shadow-emerald-950/60 transition-all active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            <span>محادثة واتساب فورية</span>
          </a>
          <a
            href={telLink}
            className="w-full sm:w-auto sm:flex-1 inline-flex items-center justify-center gap-2.5 h-13 px-6 rounded-2xl bg-[#161a22] hover:bg-[#202532] text-[#f7dfa5] border-2 border-[#cba157]/50 font-bold text-base shadow-xl transition-all active:scale-95"
          >
            <Phone className="w-5 h-5 text-[#cba157]" />
            <span>اتصال هاتفي مباشر</span>
          </a>
          <button
            type="button"
            onClick={() => onOpenConsultation("استشارة شاملة من الصفحة الرئيسية")}
            className="w-full sm:w-auto sm:flex-1 inline-flex items-center justify-center gap-2.5 h-13 px-6 rounded-2xl gold-gradient-bg text-black font-black text-base shadow-xl shadow-[#cba157]/25 hover:brightness-110 transition-all active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-black" />
            <span>طلب استشارة مجانية</span>
          </button>
        </div>

        <p className="text-xs text-neutral-400 mt-4">
          الاستشارة الهندية مجانية 100% وبدون أي التزام مسبق • تواصل فوري خلال دقائق
        </p>
      </div>
    </section>
  );
}
