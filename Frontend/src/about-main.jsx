import { createRoot, hydrateRoot } from "react-dom/client";
import AboutApp from "./AboutApp.jsx";
import "./index.css";
import { captureSource } from "./lib/analytics";

captureSource();

// صفحة «من نحن»: مُصيَّرة مسبقاً في الإنتاج فنُرطّبها؛ في التطوير نصيّر من الصفر
const root = document.getElementById("root");
if (root.hasChildNodes()) {
  hydrateRoot(root, <AboutApp />);
} else {
  createRoot(root).render(<AboutApp />);
}
