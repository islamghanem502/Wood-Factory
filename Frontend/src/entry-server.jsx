import { renderToString } from "react-dom/server";
import App from "./App.jsx";

/* يُستخدم وقت البناء فقط لتوليد HTML كامل (prerender) */
export function render() {
  return renderToString(<App />);
}
