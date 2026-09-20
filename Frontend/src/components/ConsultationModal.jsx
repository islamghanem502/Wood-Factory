import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CircleCheck, MessageCircle, Phone, ShieldCheck, X } from "lucide-react";
import { CONTACT, telLink } from "../config/contact";

const CITIES = [
  { value: "الرياض", label: "الرياض وما حولها" },
  { value: "جدة ومكة", label: "جدة ومكة المكرمة" },
  { value: "العلا", label: "العلا وتبوك" },
  { value: "أبها والباحة", label: "عسير، أبها، والباحة" },
  { value: "المنطقة الشرقية", label: "الدمام والخبر والأحساء" },
  { value: "القصيم وحائل", label: "القصيم وحائل" },
  { value: "مدينة أخرى", label: "مدينة أخرى بالمملكة" },
];

const SERVICES = [
  { value: "أكواخ هرمية A-Frame", label: "كوخ هرمي A-Frame مودرن" },
  { value: "كوخ ريفي دورين", label: "كوخ ريفي دورين" },
  { value: "كوخ دور واحد عصري", label: "كوخ دور واحد أرضي" },
  { value: "كافيه أو منفذ تجاري", label: "كافيه أو مشروع تجاري" },
  { value: "برجولة وجلسات حدائق", label: "برجولة ومظلات خارجية" },
  { value: "ديكورات خشبية وتشطيب", label: "تشطيب وديكور خشبي داخلي" },
];

const AREAS = ["40 م²", "80 م²", "120 م²", "200 م²+", "أحتاج مساعدة"];

const inputClass =
  "h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base md:text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 bg-[#181c24] border-[#cba157]/20 text-white placeholder:text-neutral-500 focus:border-[#cba157]";
const selectClass =
  "w-full h-9 rounded-md bg-[#181c24] border border-[#cba157]/20 text-white text-sm px-3 focus:outline-none focus:border-[#cba157]";
const labelClass = "flex items-center gap-2 text-xs leading-none font-medium select-none text-[#dcd2c4]";

export default function ConsultationModal({ open, onOpenChange, defaultService = "أكواخ هرمية A-Frame" }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("الرياض");
  const [service, setService] = useState(defaultService);
  const [area, setArea] = useState("100");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // عند فتح النافذة من زر باقة/مشروع معيّن، يُحدَّث نوع المشروع تلقائياً
  useEffect(() => {
    if (open) setService(defaultService);
  }, [open, defaultService]);

  const handleSubmit = (channel) => {
    const message =
      `مرحباً مؤسسة خشبي WOODEN 👋%0A%0Aأرغب في طلب استشارة مجانية وعرض سعر تفصيلي:` +
      `%0A- الاسم: ${name || "عميل مهتم"}` +
      `%0A- الجوال: ${phone || "غير محدد"}` +
      `%0A- المدينة: ${city}` +
      `%0A- نوع المشروع: ${service}` +
      `%0A- المساحة التقريبية: ${area} متر مربع` +
      `%0A- ملاحظات إضافية: ${notes || "لا يوجد"}`;

    if (channel === "whatsapp") {
      window.open(`${CONTACT.whatsappUrl}?text=${message}`, "_blank");
    } else {
      window.location.href = telLink;
    }
    setSubmitted(true);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 max-w-lg max-h-[92vh] overflow-y-auto bg-[#111317] border border-[#cba157]/30 text-[#f5eedf] p-6 sm:p-8 rounded-2xl shadow-2xl"
          dir="rtl"
        >
          {/* الترويسة */}
          <div className="flex flex-col gap-2 text-right">
            <Dialog.Title className="text-2xl font-black text-[#f7dfa5] tracking-tight leading-none">
              احصل على دراسة وتكلفة مبدئية لكوخك
            </Dialog.Title>
            <Dialog.Description className="text-sm text-[#b0a79a] mt-1.5">
              تواصل مباشرة مع أحد مهندسينا المختصين لمناقشة التصميم والمقاس والتكلفة المناسبة لموقعك وميزانيتك.
            </Dialog.Description>
          </div>

          {submitted ? (
            /* شاشة النجاح */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CircleCheck className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-bold text-white">تم توجيه طلبك بنجاح!</h4>
              <p className="text-sm text-[#b0a79a] max-w-sm mx-auto">
                تم فتح المحادثة المباشرة مع فريق الاستشارات الهندسية في خشبي WOODEN. سيتواصل معك مهندسنا الآن.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center justify-center whitespace-nowrap h-9 px-4 py-2 rounded-md text-sm font-medium border bg-transparent border-[#cba157]/40 text-[#e5be70] hover:bg-[#cba157]/10 transition-all"
                >
                  تعديل البيانات
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="inline-flex items-center justify-center whitespace-nowrap h-9 px-4 py-2 rounded-md text-sm gold-gradient-bg text-black font-bold transition-all"
                >
                  إغلاق النافذة
                </button>
              </div>
            </div>
          ) : (
            /* النموذج */
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5 text-right">
                  <label htmlFor="c-name" className={labelClass}>الاسم الكريم</label>
                  <input
                    id="c-name"
                    placeholder="مثال: صالح التميمي"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5 text-right">
                  <label htmlFor="c-phone" className={labelClass}>رقم الجوال / الواتساب</label>
                  <input
                    id="c-phone"
                    placeholder="05XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`${inputClass} text-left`}
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1.5 text-right">
                  <label className={labelClass}>المدينة أو المنطقة</label>
                  <select value={city} onChange={(e) => setCity(e.target.value)} className={selectClass}>
                    {CITIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5 text-right">
                  <label className={labelClass}>نوع البناء الخشبي</label>
                  <select value={service} onChange={(e) => setService(e.target.value)} className={selectClass}>
                    {SERVICES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 text-right">
                <label className={labelClass}>المساحة التقديرية (بالمتر المربع)</label>
                <div className="flex flex-wrap gap-2">
                  {AREAS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setArea(a)}
                      className={`flex-1 min-w-[4.5rem] py-1.5 text-xs whitespace-nowrap rounded-md border transition-all ${
                        area === a
                          ? "bg-[#cba157] text-black font-bold border-[#cba157]"
                          : "bg-[#181c24] text-neutral-300 border-neutral-800 hover:border-[#cba157]/40"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 text-right">
                <label htmlFor="c-notes" className={labelClass}>هل لديك ملاحظات أو مخطط جاهز؟ (اختياري)</label>
                <input
                  id="c-notes"
                  placeholder="مثال: موقعي في مزرعة، أرغب في إضافة مسبح وتراس خارجي..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handleSubmit("whatsapp")}
                  className="sm:flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 text-base shadow-lg shadow-emerald-950/40 gap-2 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  تأكيد الاستشارة عبر الواتساب
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit("call")}
                  className="sm:flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md border bg-transparent border-[#cba157] text-[#f7dfa5] hover:bg-[#cba157]/15 font-bold h-11 text-base gap-2 transition-all"
                >
                  <Phone className="w-5 h-5 text-[#cba157]" />
                  اتصال هاتفي مباشر الآن
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1 text-xs text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-[#cba157]" />
                <span>خصوصيتك مضمونة • استشارة هندسية دون أي التزام مالي</span>
              </div>
            </div>
          )}

          {/* زر الإغلاق */}
          <Dialog.Close className="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
