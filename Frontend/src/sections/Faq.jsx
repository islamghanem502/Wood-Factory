import { useState } from "react";
import WhatsAppButton from "../components/WhatsAppButton";
import { FAQS, FAQ } from "../data/content";
import { Reveal } from "../lib/motion";

/*
  الأسئلة: عمودان — ترويسة ثابتة مع دعوة للتواصل على اليمين، والأسئلة على اليسار.
  كل سؤال صف بخط فاصل؛ المفتوح يحمل شريطاً بلوطياً على حافته ويُفتح بحركة ناعمة.
*/
export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-8 lg:gap-16 text-right">
        {/* الترويسة — ثابتة على الشاشات الكبيرة */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal className="flex items-center gap-3 text-[11px] sm:text-xs tracking-[0.18em] text-walnut">
              <span className="num">05</span>
              <span className="w-8 h-px bg-line" />
              <span>الأسئلة</span>
            </Reveal>
            <Reveal as="h2" delay={80} className="mt-3 sm:mt-4 font-display font-bold text-2xl sm:text-5xl text-ink">
              {FAQ.title}
            </Reveal>
            <Reveal as="p" delay={140} className="mt-3 sm:mt-4 text-sm sm:text-base text-ink/65 leading-relaxed max-w-sm">
              {FAQ.intro}
            </Reveal>

            <Reveal delay={200} className="hidden lg:block mt-10 rounded-2xl border border-line p-6">
              <span className="block font-display font-semibold text-lg text-ink">{FAQ.moreTitle}</span>
              <p className="mt-1.5 text-sm text-ink/60 leading-relaxed">{FAQ.moreText}</p>
              <WhatsAppButton message={FAQ.whatsapp} placement="faq" size="sm" className="mt-5">
                اسأل على الواتساب
              </WhatsAppButton>
            </Reveal>
          </div>
        </div>

        {/* الأسئلة */}
        <div className="lg:col-span-8">
          <div className="border-t border-line">
            {FAQS.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <Reveal as="div" key={i} delay={i * 50} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full py-5 sm:py-6 pe-1 sm:pe-2 ps-0 sm:ps-1 flex items-start gap-4 sm:gap-7 text-right group"
                  >
                    <span className="num text-xs text-walnut pt-2 w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={`flex-1 font-display font-medium text-base sm:text-[1.35rem] leading-snug transition-colors ${
                        isOpen ? "text-ink" : "text-ink/85 group-hover:text-ink"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full border flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                        isOpen ? "bg-espresso border-espresso text-white rotate-45" : "border-line text-ink group-hover:border-ink/40"
                      }`}
                      aria-hidden
                    >
                      <span className="absolute w-3.5 h-px bg-current" />
                      <span className="absolute h-3.5 w-px bg-current" />
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`ps-0 sm:ps-1 pe-10 sm:pe-14 pb-6 sm:pb-7 max-w-2xl text-sm sm:text-base text-ink/70 leading-relaxed transition-opacity duration-500 ${
                          isOpen ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={100} className="lg:hidden mt-8 rounded-2xl border border-line p-5">
            <span className="block font-display font-semibold text-base text-ink">{FAQ.moreTitle}</span>
            <p className="mt-1 text-sm text-ink/60 leading-relaxed">{FAQ.moreText}</p>
            <WhatsAppButton message={FAQ.whatsapp} placement="faq" size="sm" className="mt-4">
              اسأل على الواتساب
            </WhatsAppButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
