import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { waLink } from "../config/contact";
import { PROJECTS, GALLERY_FILTERS } from "../data/content";
import { Reveal } from "../lib/motion";

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const projects = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  // إغلاق المعاينة بزر Escape وقفل التمرير
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      <section id="gallery" className="bg-walnut-deep text-cream py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader number="02" label="المشاريع" title="مشاريع منفّذة" intro="نماذج من أعمالنا في الرياض وجدة والعلا وأبها." dark />

          {/* الفلاتر — نص بخط سفلي */}
          <Reveal className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-sm border-b border-line-dark pb-4">
            {GALLERY_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-current={filter === f.id}
                className={`link-underline pb-1 transition-colors ${filter === f.id ? "text-cream" : "text-cream/55 hover:text-cream"}`}
              >
                {f.label}
              </button>
            ))}
          </Reveal>

          {/* الشبكة — أول مشروع كبير */}
          <div key={filter} className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {projects.map((p, i) => {
              const big = i === 0;
              return (
                <article key={p.id} className={`text-right ${big ? "sm:col-span-2 lg:row-span-2" : ""}`}>
                  <button type="button" onClick={() => setSelected(p)} className="block w-full text-right group">
                    <Reveal variant="clip" delay={(i % 3) * 90}>
                      <div className={`overflow-hidden rounded-lg ${big ? "aspect-[16/11]" : "aspect-[4/3]"}`}>
                        <img
                          src={p.image}
                          alt={p.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
                        />
                      </div>
                    </Reveal>
                    <Reveal delay={(i % 3) * 90 + 120} className="mt-4 flex items-baseline justify-between gap-4">
                      <h3 className={`font-display font-semibold text-cream ${big ? "text-2xl sm:text-3xl" : "text-lg"}`}>{p.title}</h3>
                      <span className="text-xs text-cream/50 whitespace-nowrap">{p.categoryLabel}</span>
                    </Reveal>
                    <Reveal delay={(i % 3) * 90 + 160} className="mt-1.5 text-sm text-cream/60 flex gap-4">
                      <span>{p.area}</span>
                      <span>·</span>
                      <span>{p.duration}</span>
                    </Reveal>
                  </button>
                </article>
              );
            })}
          </div>

          {/* أرسل تصميمك */}
          <Reveal className="mt-20 pt-10 border-t border-line-dark flex flex-col md:flex-row md:items-center justify-between gap-6 text-right">
            <p className="text-lg sm:text-xl text-cream/85 max-w-xl leading-relaxed">
              لديك صورة أو مخطط لتصميم تريده؟ أرسله لنا على الواتساب ونعود إليك بتقدير مبدئي.
            </p>
            <a
              href={waLink("مرحباً خشبي WOODEN، لدي صورة/تصميم أرغب في الاستفسار عن تنفيذه.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-md bg-cream text-ink font-medium hover:bg-cream-2 transition-colors shrink-0"
            >
              إرسال التصميم
              <span aria-hidden>←</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* معاينة المشروع */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] bg-ink/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <div
            className="w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-cream text-ink rounded-t-2xl sm:rounded-lg text-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-cream-2">
              <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute top-4 left-4 w-10 h-10 rounded-full bg-cream/90 text-ink flex items-center justify-center hover:bg-cream"
                aria-label="إغلاق"
              >
                ✕
              </button>
            </div>
            <div className="p-6 sm:p-8 grid sm:grid-cols-12 gap-6">
              <div className="sm:col-span-8">
                <span className="text-xs tracking-widest text-walnut">{selected.categoryLabel}</span>
                <h3 className="mt-2 font-display font-bold text-3xl">{selected.title}</h3>
                <p className="mt-3 text-ink/75 leading-relaxed">{selected.description}</p>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/70">
                  {selected.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-walnut" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sm:col-span-4 sm:border-s sm:border-line sm:ps-6 flex flex-col justify-between gap-6">
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/55">المساحة</dt>
                    <dd className="font-medium num">{selected.area}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink/55">مدة التنفيذ</dt>
                    <dd className="font-medium num">{selected.duration}</dd>
                  </div>
                </dl>
                <a
                  href={waLink(`مرحباً خشبي WOODEN، أرغب في الاستفسار عن مشروع مشابه لـ: ${selected.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-md bg-walnut-deep text-cream font-medium hover:bg-walnut transition-colors"
                >
                  اطلب مشروعاً مشابهاً
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
