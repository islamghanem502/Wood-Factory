import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import seo from "./scripts/seo.mjs";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), seo()],
  // صفحتان: الرئيسية و«من نحن». بناء SSR يأخذ مدخله من سطر الأوامر.
  build: isSsrBuild
    ? {}
    : {
        rollupOptions: {
          input: {
            main: resolve(import.meta.dirname, "index.html"),
            about: resolve(import.meta.dirname, "about/index.html"),
          },
        },
      },
}));
