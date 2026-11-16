import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhatsAppButton from "../components/WhatsAppButton";
import { trackViewOffer } from "../lib/analytics";
import { OFFER } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

const fmt = (n) => Math.round(n).toLocaleString("en-US");

// useLayoutEffect في المتصفح فقط (يتجنب التحذير أثناء التصيير المسبق)
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* شارة دائرية بنص يدور حول رقم الخصم */
function SpinBadge({ percent }) {
  // النص الدائري بالإنجليزية: توزيع الحروف على المحيط يفصل الحروف العربية المتصلة
  const label = `${OFFER.kicker} ✦ `.repeat(3);
  return (
    <div data-anim="badge" className="relative w-24 h-24 sm:w-32 sm:h-32">
      <svg data-anim="badge-ring" viewBox="0 0 120 120" className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <path id="offer-circle" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
        </defs>
        <circle cx="60" cy="60" r="59" fill="#ffffff" />
        {/* direction="ltr": في صفحة RTL يُزاح النص خارج المسار؛ textLength يوزّعه على المحيط كاملاً */}
        <text fill="#14100d" fontSize="10" fontWeight="700" direction="ltr" style={{ unicodeBidi: "plaintext" }}>
          <textPath href="#offer-circle" textLength="292" lengthAdjust="spacing">{label}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="w-[58%] h-[58%] rounded-full bg-espresso text-white flex flex-col items-center justify-center leading-none">
          <span className="font-display font-bold text-xl sm:text-3xl num" dir="ltr">-{percent}%</span>
          <span className="mt-0.5 text-[9px] sm:text-[10px] text-white/60">خصم</span>
        </span>
      </div>
    </div>
  );
}

/*
  عرض الجمعة البيضاء — بطاقة داكنة بنسيج خشب:
  شريط متحرك في الأعلى، السعر يعدّ تنازلياً من السعر الأصلي إلى سعر العرض ويُشطب القديم،
  شارة توفير، مثال محسوب، وصورة الكوخ-الهدية تطفو وتتبع المؤشر.
  كل الحركات بـ GSAP وتتوقف مع "تقليل الحركة"؛ وبدون JavaScript يظهر كل شيء في حالته النهائية.
*/
export default function Offer() {
  const ref = useRef(null);
  const save = OFFER.listPrice - OFFER.price;
  const percent = Math.round((save / OFFER.listPrice) * 100);
  const exampleSave = save * OFFER.exampleArea;

  // حدث "view_offer" مرة واحدة عند ظهور نصف القسم
  useEffect(() => {
    if (!OFFER.active || !ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          trackViewOffer();
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useIsoLayoutEffect(() => {
    if (!OFFER.active || !ref.current) return;
    const ctx = gsap.context((self) => {
      const q = self.selector;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ── الشريط المتحرك: نسختان متطابقتان، والإزاحة 50% تعيد الحلقة بلا قفزة (RTL: نحو اليمين)
        gsap.to(q('[data-anim="ticker"]'), { xPercent: 50, duration: 26, ease: "none", repeat: -1 });

        // ── الشارة الدائرية تدور ببطء
        gsap.to(q('[data-anim="badge-ring"]'), { rotation: 360, transformOrigin: "50% 50%", duration: 18, ease: "none", repeat: -1 });

        // ── طفو الصورة
        gsap.to(q('[data-anim="float"]'), { y: -12, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });

        // ── الدخول عند الوصول إلى القسم
        const price = q('[data-anim="price"]')[0];
        const counter = { v: OFFER.listPrice };
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
        });
        tl.from(q('[data-anim="card"]'), { y: 40, scale: 0.97, opacity: 0, duration: 1 })
          .from(q('[data-anim="glow"]'), { opacity: 0, scale: 0.6, duration: 1.4 }, 0.2)
          .from(q('[data-anim="image"]'), { y: 70, scale: 0.88, opacity: 0, duration: 1.3 }, 0.25)
          .from(q('[data-anim="badge"]'), { scale: 0, rotation: -90, duration: 0.9, ease: "back.out(1.8)" }, 0.9)
          .from(q('[data-anim="line"]'), { y: 28, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.3)
          .fromTo(
            counter,
            { v: OFFER.listPrice },
            {
              v: OFFER.price,
              duration: 1.6,
              ease: "power2.inOut",
              onUpdate: () => (price.textContent = fmt(counter.v)),
            },
            0.6,
          )
          .from(q('[data-anim="strike"]'), { scaleX: 0, duration: 0.6, ease: "power2.inOut" }, 1.5)
          .from(q('[data-anim="chip"]'), { scale: 0.6, opacity: 0, duration: 0.6, ease: "back.out(2)" }, 1.9);
      });

      // ── ميلان الصورة مع حركة المؤشر (شاشات بمؤشر دقيق فقط)
      mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
        const card = q('[data-anim="card"]')[0];
        const img = q('[data-anim="tilt"]')[0];
        const rx = gsap.quickTo(img, "rotationX", { duration: 0.8, ease: "power3.out" });
        const ry = gsap.quickTo(img, "rotationY", { duration: 0.8, ease: "power3.out" });
        const mx = gsap.quickTo(img, "x", { duration: 0.8, ease: "power3.out" });
        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * 10);
          rx(-py * 8);
          mx(px * 16);
        };
        const onLeave = () => {
          rx(0);
          ry(0);
          mx(0);
        };
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        return () => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        };
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  if (!OFFER.active) return null;

  const tickerItems = [...OFFER.ticker, ...OFFER.ticker];

  return (
    <section id="offer" ref={ref} className="bg-white py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div data-anim="card" className="relative rounded-[1.75rem] sm:rounded-[2rem] bg-ink text-white overflow-hidden isolate">
          {/* نسيج خشب خافت + توهج دافئ خلف الصورة */}
          <div className="absolute inset-0 wood-overlay opacity-60 -z-10" aria-hidden />
          <div
            data-anim="glow"
            className="absolute -z-10 w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] rounded-full left-1/2 top-[32%] lg:top-1/2 lg:left-[26%] -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-60"
            style={{ background: "radial-gradient(circle, rgba(217,189,152,0.55) 0%, rgba(185,138,94,0.25) 40%, transparent 70%)" }}
            aria-hidden
          />

          {/* ── الشريط المتحرك ── */}
          <div className="border-b border-white/10 overflow-hidden py-2.5 sm:py-3" aria-hidden>
            <div data-anim="ticker" className="flex w-max">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0">
                  {tickerItems.map((t, i) => (
                    <span key={`${copy}-${i}`} className="flex items-center gap-5 sm:gap-7 pe-5 sm:pe-7 text-[11px] sm:text-xs tracking-[0.2em] text-white/70 whitespace-nowrap">
                      {t}
                      <span className="text-oak-light">✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 items-center gap-2 lg:gap-6 px-5 sm:px-10 lg:px-12 pt-8 sm:pt-12 pb-8 sm:pb-12">
            {/* ── النص (يمين) ── */}
            <div className="lg:col-span-6 text-right order-2 lg:order-1">
              <div data-anim="line" className="inline-flex items-center gap-2.5 h-8 ps-2 pe-3.5 rounded-full bg-white text-ink text-xs font-semibold">
                <span className="relative flex w-2.5 h-2.5">
                  <span className="absolute inset-0 rounded-full bg-ink/40 animate-ping motion-reduce:hidden" />
                  <span className="relative w-2.5 h-2.5 rounded-full bg-ink" />
                </span>
                {OFFER.badge}
                <span className="text-ink/40 font-normal tracking-[0.18em] text-[10px]">{OFFER.kicker}</span>
              </div>

              <h2 className="mt-5 sm:mt-6 font-display font-bold leading-[1.25]">
                <span data-anim="line" className="block text-[1.75rem] sm:text-[2.6rem] lg:text-[2.5rem] xl:text-[2.75rem] leading-[1.3]">
                  {OFFER.title[0]}
                </span>
                <span data-anim="line" className="block mt-1 text-lg sm:text-2xl lg:text-[1.75rem] font-semibold text-white/55">
                  {OFFER.title[1]}
                </span>
              </h2>

              {/* السعر */}
              <div data-anim="line" className="mt-7 sm:mt-9 flex flex-wrap items-end gap-x-5 gap-y-3">
                <span data-anim="price" className="wood-text font-display font-bold text-[4.2rem] sm:text-8xl lg:text-[7.5rem] leading-[0.85] num">
                  {fmt(OFFER.price)}
                </span>
                <span className="pb-1.5 sm:pb-3">
                  <span className="block text-sm sm:text-base text-white/70">{OFFER.unit}</span>
                  <span className="relative inline-block mt-0.5 text-lg sm:text-xl text-white/40 num">
                    {fmt(OFFER.listPrice)}
                    <span data-anim="strike" className="absolute inset-x-[-4px] top-1/2 h-[2px] bg-oak-light origin-right -rotate-6" aria-hidden />
                    <span className="sr-only">بدلاً من {fmt(OFFER.listPrice)}</span>
                  </span>
                </span>
              </div>

              <div data-anim="chip" className="mt-5 inline-flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-3 gap-y-1 rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur px-4 py-2.5 text-sm">
                <span className="font-semibold text-oak-light">
                  وفّر <span className="num">{fmt(save)}</span> ر.س في كل متر
                </span>
                <span className="hidden sm:block w-px h-4 bg-white/20" aria-hidden />
                <span className="text-white/70">
                  كوخ <span className="num">{OFFER.exampleArea}</span> م² ← توفير <span className="num text-white font-semibold">{fmt(exampleSave)}</span> ر.س
                </span>
              </div>

              <p data-anim="line" className="mt-6 text-[15px] sm:text-lg text-white/70 leading-relaxed max-w-md">
                {OFFER.text}
              </p>

              <div data-anim="line" className="mt-7 sm:mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <WhatsAppButton message={OFFER.whatsapp} placement="offer" size="lg">
                  {OFFER.cta}
                </WhatsAppButton>
                <a href="#calculator" className="link-underline text-white font-medium">
                  {OFFER.secondary}
                </a>
              </div>
              <p data-anim="line" className="mt-4 text-xs sm:text-sm text-white/40">
                {OFFER.note}
              </p>
            </div>

            {/* ── الصورة (يسار) ── */}
            <div className="lg:col-span-6 order-1 lg:order-2 relative [perspective:1200px]">
              <div data-anim="image" className="relative">
                <div data-anim="float">
                  <div data-anim="tilt" className="[transform-style:preserve-3d]">
                    <img
                      src={OFFER.image}
                      alt={OFFER.imageAlt}
                      className="w-full h-auto max-h-[260px] sm:max-h-[420px] object-contain mx-auto drop-shadow-[0_40px_50px_rgba(0,0,0,0.6)]"
                      width="1390"
                      height="1018"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="absolute top-0 left-0 sm:-top-2 sm:left-2">
                  <SpinBadge percent={percent} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
