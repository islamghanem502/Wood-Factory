import { Reveal } from "../lib/motion";

/* ترويسة قسم موحّدة: رقم القسم + تسمية صغيرة + عنوان + مقدمة قصيرة */
export default function SectionHeader({ number, label, title, intro, dark = false, size = "lg", className = "" }) {
  const muted = dark ? "text-white/55" : "text-walnut";
  const line = dark ? "bg-line-dark" : "bg-line";
  const heading = dark ? "text-white" : "text-ink";
  const body = dark ? "text-white/70" : "text-ink/70";

  return (
    <div className={`grid lg:grid-cols-12 gap-6 items-end text-right ${className}`}>
      <div className="lg:col-span-8">
        <Reveal className={`flex items-center gap-3 text-[11px] sm:text-xs tracking-[0.18em] ${muted}`}>
          <span className="num">{number}</span>
          <span className={`w-8 h-px ${line}`} />
          <span>{label}</span>
        </Reveal>
        <Reveal
          as="h2"
          delay={80}
          className={`mt-3 sm:mt-4 font-display font-bold ${size === "sm" ? "text-xl sm:text-4xl lg:text-5xl" : "text-2xl sm:text-5xl lg:text-6xl"} ${heading}`}
        >
          {title}
        </Reveal>
      </div>
      {intro && (
        <Reveal as="p" delay={160} className={`lg:col-span-4 lg:pb-2 text-sm sm:text-lg leading-relaxed ${body}`}>
          {intro}
        </Reveal>
      )}
    </div>
  );
}
