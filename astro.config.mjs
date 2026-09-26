import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL || "https://niu.io",
  output: "static",
  trailingSlash: "always",
  build: { assets: "_astro" },
  devToolbar: { enabled: false },
});
