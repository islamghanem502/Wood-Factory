import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { captureSource } from "./lib/analytics";

captureSource();

// في الإنتاج يكون الجذر مُصيَّراً مسبقاً (prerender) فنُرطّبه؛ في التطوير نصيّر من الصفر
const root = document.getElementById("root");
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
