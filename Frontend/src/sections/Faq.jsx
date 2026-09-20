import { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { FAQS } from "../data/content";
import { Reveal } from "../lib/motion";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-cream-2 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader number="05" label="الأسئلة" title="أسئلة شائعة" />

        <div className="mt-14 border-t border-line text-right">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal as="div" key={i} delay={i * 50} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full py-6 flex items-start gap-5 sm:gap-8 text-right group"
                >
                  <span className="num text-sm text-walnut pt-1 w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-display font-medium text-lg sm:text-2xl text-ink group-hover:text-walnut transition-colors">
                    {item.q}
                  </span>
                  <span
                    className={`relative w-6 h-6 shrink-0 mt-1 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden
                  >
                    <span className="absolute inset-x-0 top-1/2 h-px bg-ink" />
                    <span className="absolute inset-y-0 left-1/2 w-px bg-ink" />
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="ps-11 sm:ps-14 pb-7 max-w-2xl text-ink/70 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
