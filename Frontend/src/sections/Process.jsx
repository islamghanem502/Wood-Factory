import SectionHeader from "../components/SectionHeader";
import { PROCESS } from "../data/content";
import { Reveal } from "../lib/motion";

/* كيف نعمل: أربع خطوات على خلفية إسبريسو بنسيج خشب، بأرقام مُعبّأة بالخشب */
export default function Process() {
  return (
    <section id="process" className="relative bg-espresso wood-overlay text-white py-16 sm:py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader number="04" label="كيف نعمل" title={PROCESS.title} intro={PROCESS.intro} dark />

        <ol className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 lg:gap-x-10 text-right">
          {PROCESS.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 110} className="relative lg:pe-6">
              {/* خط الربط بين الخطوات على الشاشات الكبيرة */}
              {i < PROCESS.steps.length - 1 && <span className="hidden lg:block absolute top-7 left-0 w-6 h-px bg-white/20" aria-hidden />}
              <span className="wood-text font-display font-bold text-5xl sm:text-6xl leading-none num block">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display font-semibold text-lg sm:text-xl">{step.title}</h3>
              <p className="mt-2 text-sm sm:text-[15px] text-white/65 leading-relaxed max-w-xs">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
