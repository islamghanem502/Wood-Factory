import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import Cabin from "../components/Cabin";
import { CONTACT, telLink } from "../config/contact";
import WhatsAppButton from "../components/WhatsAppButton";
import { HERO } from "../data/content";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export default function Hero() {
  const sectionRef = useRef(null);
  const cabinRef = useRef(null);
  const textRef = useRef(null);
  const hintRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // دخول النص عند التحميل
      gsap.from(textRef.current.querySelectorAll("[data-line]"), {
        y: 26,
        opacity: 0,
        duration: 1.1,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.15,
      });

      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (c) => {
          const q = gsap.utils.selector(cabinRef);
          const part = (n) => q(`[data-part="${n}"]`);
          const seams = q('[data-part="seams"] path');

          if (c.conditions.reduced) {
            gsap.set(seams, { opacity: 0 });
            return;
          }

          // ── الحالة المفككة ──
          gsap.set(part("ridge"), { y: -150 });
          gsap.set(part("roofL"), { rotation: -12, x: -120, y: -22, svgOrigin: "500 40" });
          gsap.set(part("roofR"), { rotation: 12, x: 120, y: -22, svgOrigin: "500 40" });
          gsap.set(part("glassTop"), { scale: 0.72, opacity: 0.85, svgOrigin: "500 380" });
          gsap.set(part("beam"), { y: 80 });
          gsap.set(part("glassBottom"), { y: 100, opacity: 0.85 });
          gsap.set(part("deck"), { y: 120, opacity: 0.6 });
          gsap.set(part("props"), { y: 120, opacity: 0 });
          gsap.set(part("shadow"), { opacity: 0, scaleX: 0.5, svgOrigin: "500 772" });
          gsap.set([part("lights"), part("glow")], { opacity: 0 });
          gsap.set(seams, { drawSVG: "0%", opacity: 0 });

          // ── التركيب ──
          const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, paused: true });
          tl.to(part("ridge"), { y: 0, duration: 1 }, 0)
            .to(part("roofL"), { rotation: 0, x: 0, y: 0, duration: 1.5 }, 0.15)
            .to(part("roofR"), { rotation: 0, x: 0, y: 0, duration: 1.5 }, 0.3)
            .to(part("beam"), { y: 0, duration: 0.9 }, 1.4)
            .to(part("glassTop"), { scale: 1, opacity: 1, duration: 0.9 }, 1.6)
            .to(part("glassBottom"), { y: 0, opacity: 1, duration: 0.9 }, 2.0)
            .to(part("deck"), { y: 0, opacity: 1, duration: 0.9 }, 2.3)
            .to(part("props"), { y: 0, opacity: 1, duration: 0.7 }, 2.6)
            .to(part("shadow"), { opacity: 0.1, scaleX: 1, duration: 0.8 }, 2.5)
            // اللحام: خطوط ضوء تمر على الوصلات ثم تختفي
            .to(seams, { drawSVG: "100%", opacity: 1, duration: 0.55, stagger: 0.06, ease: "power1.out" }, 3.1)
            .to(seams, { opacity: 0, duration: 0.5, ease: "power1.in" }, 3.9)
            .to(part("lights"), { opacity: 1, duration: 0.5 }, 3.8)
            .to(part("glow"), { opacity: 1, duration: 0.9 }, 3.9);

          if (c.conditions.desktop) {
            tl.to(hintRef.current, { opacity: 0, duration: 0.4 }, 0);
            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: "top top",
              end: "+=140%",
              pin: true,
              scrub: 0.8,
              animation: tl,
              anticipatePin: 1,
            });
          } else {
            // الجوال: يتركّب تلقائياً عند ظهوره
            tl.timeScale(1.15);
            ScrollTrigger.create({
              trigger: cabinRef.current,
              start: "top 80%",
              once: true,
              onEnter: () => tl.play(),
            });
          }
        },
      );
    }, sectionRef);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 min-h-screen grid lg:grid-cols-12 items-center gap-10 lg:gap-8 pt-28 pb-16 lg:pt-20 lg:pb-0">
        {/* النص — على اليمين */}
        <div ref={textRef} className="lg:col-span-5 text-right">
          <p data-line className="text-xs sm:text-sm text-walnut font-medium tracking-wide">
            {HERO.kicker}
          </p>
          <h1 className="mt-5 text-[2.5rem] leading-[1.2] sm:text-6xl lg:text-[3.6rem] font-bold text-ink">
            {HERO.title.map((line) => (
              <span data-line key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p data-line className="mt-6 max-w-md text-base sm:text-lg text-ink/70 leading-relaxed">
            {HERO.text}
          </p>

          <div data-line className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <WhatsAppButton message={HERO.whatsapp} size="lg">محادثة واتساب</WhatsAppButton>
            <a href={telLink} className="link-underline text-ink font-medium num" dir="ltr">
              {CONTACT.phoneDisplay}
            </a>
          </div>

        </div>

        {/* الكوخ — على اليسار */}
        <div ref={cabinRef} className="lg:col-span-7 lg:pl-4">
          <Cabin className="w-full h-auto max-h-[66vh]" />
        </div>
      </div>

      {/* تلميح الاسكرول — خارج تدفّق النص حتى لا يُخِلّ بالتوسيط */}
      <div ref={hintRef} className="hidden lg:flex absolute bottom-8 right-8 items-center gap-3 text-xs text-walnut">
        <span className="block w-px h-10 bg-walnut/40" />
        <span>{HERO.scrollHint}</span>
      </div>
    </section>
  );
}
