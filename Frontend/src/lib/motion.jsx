import { useEffect, useRef } from "react";

/* مراقب واحد مشترك لكل عناصر الكشف — يضيف .is-in عند دخول العنصر إلى الشاشة */
let observer = null;
const getObserver = () => {
  if (observer || typeof window === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          observer.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
  );
  return observer;
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * عنصر يظهر عند التمرير.
 * variant: "up" (افتراضي) | "clip" (للصور) | "line" (خط يُرسم)
 * delay: بالمللي ثانية — للتدرج بين العناصر المتجاورة
 */
export function Reveal({ as: Tag = "div", variant = "up", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("is-in");
      return;
    }
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  const base = variant === "clip" ? "reveal-clip" : variant === "line" ? "reveal-line" : "reveal";
  return (
    <Tag ref={ref} className={`${base} ${className}`} style={{ "--d": `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}
