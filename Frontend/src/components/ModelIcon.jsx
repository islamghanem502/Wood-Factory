/* أيقونات خطية لكل نوع (viewBox 32×24) */
const ICONS = {
  aframe: (
    <>
      <path d="M3 21 16 3l13 18Z" />
      <path d="M13 21v-6h6v6M9.5 12h13" />
    </>
  ),
  twofloor: (
    <>
      <path d="M4 11 16 3l12 8" />
      <path d="M6 11v10h20V11M6 16h20" />
      <path d="M10 16v-2.5h12V16M9.5 19h3M19.5 19h3" />
    </>
  ),
  single: (
    <>
      <path d="M2 8h28" />
      <path d="M5 8v13h22V8" />
      <path d="M8 11h11v10M22 13h3v8" />
    </>
  ),
  kiosk: (
    <>
      <path d="M5 10v11h22V10" />
      <path d="M3 10l3-5h20l3 5" />
      <path d="M3 10c1 2.4 3 2.4 4 0 1 2.4 3 2.4 4 0 1 2.4 3 2.4 4 0 1 2.4 3 2.4 4 0 1 2.4 3 2.4 4 0 1 2.4 3 2.4 4 0" />
      <path d="M9 13h14v5H9Z" />
    </>
  ),
  pergola: (
    <>
      <path d="M3 7h26" />
      <path d="M6 7v14M26 7v14" />
      <path d="M10 4v3M14 4v3M18 4v3M22 4v3" />
      <path d="M10 21v-5h12v5" />
    </>
  ),
};

export default function ModelIcon({ id, className = "" }) {
  return (
    <svg viewBox="0 0 32 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
      {ICONS[id]}
    </svg>
  );
}
