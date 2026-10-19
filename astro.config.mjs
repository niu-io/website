import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  markdown: {
    shikiConfig: { themes: { light: "github-light", dark: "github-dark" } },
  },
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  site: process.env.SITE_URL || "https://niu.io",
  output: "static",
  trailingSlash: "always",
  build: { assets: "_astro" },
  devToolbar: { enabled: false },
});
