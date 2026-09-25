import { defineConfig } from "astro/config";

export default defineConfig({
  site:
    process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || "https://niu.io",
  base: process.env.BASE_PATH || "/",
  output: "static",
  devToolbar: { enabled: false },
});
