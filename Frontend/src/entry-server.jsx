import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import AboutApp from "./AboutApp.jsx";

/* يُستخدم وقت البناء فقط لتوليد HTML كامل لكل صفحة (prerender) */
const PAGES = { home: App, about: AboutApp };

export function render(page = "home") {
  const Page = PAGES[page];
  return renderToString(<Page />);
}
