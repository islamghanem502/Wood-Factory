import { useEffect, useRef } from "react";
import { CONTACT, waLink, telLink } from "../config/contact";
import { ABOUT } from "../data/content";
import { trackContact, trackCall, sourceLine } from "../lib/analytics";

/*
  صفحة «من نحن» بشكل مقالة: عمود قراءة واحد ضيق، نص متصل بعناوين فرعية،
  اقتباس وقوائم بسيطة، بلا بطاقات ولا أزرار كبيرة.
  المحتوى كله في ABOUT.blocks داخل src/data/content.js.
*/

/* شريط رفيع أعلى الصفحة يوضح مقدار ما قُرئ من المقالة */
function ReadingProgress({ target }) {
  const barRef = useRef(null);
  useEffect(() => {
    const bar = barRef.current;
    const el = target.current;
    if (!bar || !el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      bar.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [target]);
  return (
    <div className="fixed top-0 inset-x-0 z-50 h-0.5 pointer-events-none" aria-hidden>
      <div ref={barRef} className="h-full bg-walnut origin-right" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-14 sm:mt-16 mb-4 font-display font-bold text-[1.45rem] sm:text-[1.9rem] text-ink">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-9 mb-2 font-display font-semibold text-lg sm:text-xl text-ink">{block.text}</h3>;
    case "quote":
      return (
        <blockquote className="my-9 sm:my-10 border-s-2 border-walnut ps-5 sm:ps-7 font-display font-medium text-xl sm:text-[1.6rem] leading-relaxed text-walnut">
          «{block.text}»
        </blockquote>
      );
    case "ol":
      return (
        <ol className="my-6 space-y-4 list-none ps-0">
          {block.items.map((item, i) => (
            <li key={item.title} className="flex gap-4">
              <span className="num shrink-0 w-7 pt-0.5 text-walnut font-semibold">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <strong className="font-bold text-ink">{item.title}</strong> {item.text}
              </span>
            </li>
          ))}
        </ol>
      );
    case "ul":
      return (
        <ul className="my-5 space-y-2 ps-0 list-none">
          {block.items.map((item) => (
            <li key={item} className="relative ps-6 before:content-[''] before:absolute before:start-1 before:top-[0.85em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-oak">
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return <p className="mt-5 first:mt-0">{block.text}</p>;
  }
}

export default function About() {
  const articleRef = useRef(null);
  const { contact } = ABOUT;

  return (
    <>
      <ReadingProgress target={articleRef} />
      <article ref={articleRef} className="bg-white pt-28 sm:pt-36 pb-20 sm:pb-28">
        <div className="mx-auto max-w-[44rem] px-5 sm:px-8 text-right">
          {/* ── رأس المقالة ── */}
          <header>
            <nav aria-label="مسار التصفح" className="flex items-center gap-2 text-xs sm:text-sm text-ink/50">
              <a href="/" className="link-underline hover:text-ink">الرئيسية</a>
              <span aria-hidden>/</span>
              <span className="text-walnut" aria-current="page">{ABOUT.category}</span>
            </nav>
            <h1 className="mt-5 sm:mt-6 font-display font-bold text-[1.9rem] leading-[1.35] sm:text-5xl sm:leading-[1.25] text-ink">{ABOUT.title}</h1>
            <p className="mt-4 sm:mt-5 text-lg sm:text-xl text-ink/65 leading-relaxed">{ABOUT.dek}</p>
            <div className="mt-7 sm:mt-8 py-4 border-y border-line flex items-center gap-3 text-sm text-ink/60">
              <img src="/images/logo-mark.png" alt="" className="h-7 w-auto" width="28" height="32" />
              <span className="font-medium text-ink">{ABOUT.byline}</span>
              <span aria-hidden>·</span>
              <span>{ABOUT.readTime}</span>
            </div>
          </header>

          {/* ── متن المقالة ── */}
          <div className="mt-10 sm:mt-12 text-[17px] sm:text-[19px] leading-[2] text-ink/80">
            {ABOUT.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          {/* ── خاتمة التواصل: سطر بسيط، لا زر كبير ── */}
          <footer className="mt-14 sm:mt-16 pt-6 border-t border-line">
            <span className="block font-display font-semibold text-ink">{contact.title}</span>
            <p className="mt-2 text-[15px] sm:text-base text-ink/70 leading-loose">
              <a
                href={waLink(contact.whatsapp + sourceLine())}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact("about_article")}
                data-placement="about_article"
                className="text-walnut font-medium underline underline-offset-4 decoration-walnut/30 hover:decoration-walnut"
              >
                {contact.whatsappLabel}
              </a>
              <span className="mx-2 text-ink/30" aria-hidden>·</span>
              أو اتصل على{" "}
              <a
                href={telLink}
                onClick={() => trackCall("about_article")}
                data-placement="about_article"
                className="num text-walnut font-medium underline underline-offset-4 decoration-walnut/30 hover:decoration-walnut"
                dir="ltr"
              >
                {CONTACT.phoneDisplay}
              </a>
            </p>
          </footer>
        </div>
      </article>
    </>
  );
}
