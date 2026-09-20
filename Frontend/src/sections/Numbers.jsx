import { NUMBERS } from "../data/content";
import { Reveal } from "../lib/motion";

/* شريط الأرقام — بني داكن، الأرقام مُعبّأة بنسيج الخشب */
export default function Numbers() {
  return (
    <section className="bg-walnut-deep text-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {NUMBERS.map((n, i) => (
            <Reveal
              key={n.label}
              delay={i * 90}
              className={`py-12 sm:py-16 text-right ${i % 2 === 1 ? "ps-8 border-s border-line-dark" : ""} ${
                i >= 2 ? "border-t border-line-dark lg:border-t-0" : ""
              } ${i === 2 ? "lg:ps-8 lg:border-s" : ""}`}
            >
              <div className="flex items-baseline gap-2">
                <span className="wood-text font-display font-bold text-6xl sm:text-7xl leading-none num">{n.value}</span>
                <span className="font-display text-xl sm:text-2xl text-oak-light">{n.unit}</span>
              </div>
              <p className="mt-3 text-sm text-cream/60">{n.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
