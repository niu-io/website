import { strict as assert } from "node:assert";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("landing interactive preview matches Niu 0.4 navigation, tabs and brand rules", async () => {
  const [landingTsx, landingTs, footerAstro, visualCss] = await Promise.all([
    readFile(path.join(root, "src/components/LandingContent.tsx"), "utf8"),
    readFile(path.join(root, "src/content/landing.ts"), "utf8"),
    readFile(path.join(root, "src/components/SiteFooter.astro"), "utf8"),
    readFile(path.join(root, "src/styles/landing-visual.css"), "utf8"),
  ]);

  // All 7 real Niu 0.4 workspace sidebar items must exist with exact Chinese labels.
  for (const labelZh of [
    "概览",
    "多模态生成",
    "模型",
    "密钥",
    "请求日志",
    "用量",
    "工作空间设置",
  ]) {
    assert.match(
      landingTsx,
      new RegExp(labelZh),
      `Expected Niu 0.4 sidebar label "${labelZh}" in LandingContent.tsx`,
    );
  }

  // Top-bar section tabs for Models | Routing | Evaluations must exist.
  for (const tabLabel of ["模型路由", "评估", "安全护栏", "事件订阅"]) {
    assert.match(
      landingTsx,
      new RegExp(tabLabel),
      `Expected Niu 0.4 section tab "${tabLabel}" in LandingContent.tsx`,
    );
  }

  // Retired / mismatched terminology and trailing button-arrow icons must never reappear.
  for (const retired of [
    "牛刀",
    "牛元(Niu)",
    "生成对话",
    "多模型对话对比",
    "双模型并排对比",
    "PostgreSQL 会话实时同步已启用",
    "v0.2.23",
    "IconArrowUpRight",
    "IconExternalLink",
  ]) {
    assert.ok(
      !landingTsx.includes(retired) &&
        !landingTs.includes(retired) &&
        !footerAstro.includes(retired) &&
        !visualCss.includes(retired),
      `Retired or non-0.4 string "${retired}" must not appear on the landing page`,
    );
  }
});
