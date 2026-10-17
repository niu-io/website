# Niu website

The composed Gateway serves this repository’s landing page, blog, and comparison pages for Niu, a model API gateway focused on model access, transparent usage and customer billing, workspace spending controls, and text/video generation management.

Built with Astro and the existing Niu brand assets and theme tokens. This is a static marketing site; the product documentation and implementation live in [niu-io/niu](https://github.com/niu-io/niu).

## Development

Use Node.js 22.12 or newer and pnpm 11.25.0.

```sh
pnpm install
pnpm dev
```

## Validate and build

```sh
pnpm check
pnpm build
pnpm preview
```

The production output is in `dist/`. The landing page uses the current model-access product boundary, native FAQ disclosures and generated-documentation entry points. React renders the installed shadcn controls and comparison filters. Fonts are bundled locally through Fontsource.

## Composed deployment

There is no standalone production deployment for this repository. The composed Niu Gateway consumes the website build as its marketing artifact through `NIU_SITE_DIR`.

Pin consumption to a reviewed immutable website commit, not a moving branch. Build from that checkout with the locked dependencies, then retain the commit SHA and the archive SHA-256 in the release record:

```sh
git checkout --detach <reviewed-website-commit-sha>
pnpm install --frozen-lockfile
pnpm check
pnpm build
tar -czf niu-website-dist.tar.gz -C dist .
shasum -a 256 niu-website-dist.tar.gz
```

The release image extracts the pinned artifact and sets `NIU_SITE_DIR` to its root. The Gateway serves `/`, `/blog/`, `/blog/*`, `/compare/`, and `/_astro/` from that directory while its catalog and documentation artifacts own their respective routes. Keep the website commit and artifact digest with the composed Gateway release evidence.

The GitHub Actions workflow checks the build and verifies its output layout; it does not publish a separate website deployment.

## Content and branding

- `src/pages/index.astro` and `src/components/LandingContent.tsx`: landing layout and current product narrative.
- `src/pages/blog/` and `src/content/blog/*.md`: `/blog/` channel and Markdown articles (collected via `src/content.config.ts`).
- `src/content/landing.ts`: public links, capabilities, FAQ and request example.
- `src/content/comparisons.ts`: sourced feature comparisons and selection guidance.
- `src/components/PublicHeader.tsx`: public navigation shell with installed shadcn controls.
- `src/styles/public-header.css`, `src/content/public-navigation.json`, `src/styles/tokens.css`: snapshots of the public Niu shell contracts.
- `CONTENT.md`: positioning and public-claim rules.
- `public/site-assets/brand/`: approved assets and source attribution.

Docs and catalog consume the canonical navigation/style definitions in Niu's `branding` directory. This separate website snapshots them, along with the Niu-specific public header composition, so its build never depends on an adjacent checkout. Website headers add the editorial “Blog” entry through `src/content/website-navigation.ts`; the sync adapter preserves this website-specific composition. Synchronize with `node scripts/sync-public-shell.mjs --source <public-niu-checkout>`; `--check --source <public-niu-checkout>` verifies the snapshots against that checkout. Default `--check` verifies the recorded snapshot hashes.

Keep copy accurate about implemented workflows and qualification scope. Do not present agent orchestration, external agent telemetry, task benchmarking, model fusion or subscription pooling as current product features.

## Attribution

Niu-owned website code is MIT licensed. Brand assets and theme tokens are reused unchanged from [Niu's branding directory](https://github.com/niu-io/niu/tree/main/branding); their original attribution is retained in [public/site-assets/brand/SOURCE-LICENSE.txt](public/site-assets/brand/SOURCE-LICENSE.txt). No LiteLLM marketing copy is included.

## Typography

Geist Sans and Geist Mono are bundled locally through Fontsource under the SIL Open Font License. Font notices are available in `public/site-assets/fonts/`. The public shell shares Niu theme preferences with Docs and catalog.

## Original marketing-source provenance

The marketing source and brand snapshot were carried back from public Niu commit `287be5bee3dce511cdf76582548e1655914d3e89`, including website fixes through `0d494d92aded07105d0faa2be57e72e1f63ccbd0`. Current shared-shell provenance is recorded in `src/content/public-shell-manifest.json`.

## Blog publishing

Manage articles in `src/content/blog/*.md`; the filename is the permanent URL slug.
The homepage, blog index and generated article routes share one publication policy.

```yaml
---
title: "Article title"
description: "A concise summary for the article list and search previews."
status: "draft" # draft | published | archived
publishedAt: "2026-10-18"
category: "Product"
author: "Niu"
pinned: false
pinOrder: 0
---
```

- New articles default to `draft`. Only `published` articles with a publication date
  on or before the build date (UTC) are included in the site, including direct URLs.
- Set `pinned: true` to place an article before other posts. Lower `pinOrder` values
  come first among pinned posts; dates break ties. Other articles sort newest first.
- Set `status: archived` to remove an article from the next build without deleting
  its source. An archived URL returns 404; no redirect is created automatically.
- Keep `publishedAt` stable and set `updatedAt` when making substantive edits.
- This is a static site: content changes and future publication dates require a
  new build and deployment. There is no automatic scheduler or browser admin yet.
- Run `node --test test/blog-policy.test.ts` and `pnpm check` before publishing.
