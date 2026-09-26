# niu.io website

The public landing page for Niu, an open-source Agent Gateway for model access, execution visibility and evidence-based model choices. The page presents implemented evaluation workflows separately from first-release targets.

Built with Astro and the existing niu.io brand assets and theme tokens. This is a static marketing site; the product documentation and implementation live in [niu-io/niu](https://github.com/niu-io/niu).

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

The production output is in `dist/`. The page includes responsive navigation, an interactive hypothetical coding-agent cost comparison, a labeled synthetic task investigation preview, native FAQ disclosures, metadata, and reduced-motion support. It does not use analytics, third-party font requests, or a client framework runtime. Geist Sans and Geist Mono are self-hosted through Fontsource; headings, copy, and technical labels share a consistent type scale.

## Deployment

### Render

`render.yaml` defines a static site named `niu-website`, built from `main` with Node.js 24 and pnpm 11.25.0. It installs the locked dependencies, runs Astro's checks, and publishes `dist/` at the domain root.

Create a Render Blueprint connected to this repository to apply the configuration. The site uses Render's assigned URL for canonical and social metadata until a custom domain is configured.

To move to `niu.io`, add and verify the custom domain in Render, configure the DNS records Render supplies, and set `SITE_URL=https://niu.io` in the service environment. Redeploy after changing this value. `BASE_PATH` stays `/`.

### GitHub Pages preview

The GitHub Actions workflow validates pull requests and maintains the existing preview at `https://niu-io.github.io/website/`. Its build explicitly overrides `SITE_URL` and `BASE_PATH`; this does not affect the Render deployment.

### Other static hosts

Build with the desired origin and path, then publish `dist/`:

```sh
SITE_URL=https://niu.io BASE_PATH=/ pnpm build
```

Domain and DNS configuration are managed separately.

## Content and branding

- `src/pages/index.astro`: page structure, task illustration, and accessible navigation.
- `src/components/ValueSlider.astro`: manually controlled value slides with touch, keyboard and reduced-motion support.
- `src/components/Benchmark.astro`: keyboard-accessible scenario comparison; no inference is executed.
- `src/content/benchmarks.ts`: hypothetical cohorts and shared cost arithmetic.
- `src/content/landing.ts`: shared links, capability descriptions, FAQs, and request example.
- `CONTENT.md`: positioning, claim sources, and release-copy update rules.
- `src/styles/global.css`: responsive page styles.
- `src/styles/tokens.css`: unchanged niu.io theme tokens.
- `public/brand/`: approved niu.io assets and retained source license.

Keep public copy accurate about implementation status. Product plans must not be presented as shipped capabilities. Link to public repositories and avoid private source paths, customer information, and secrets.

## Attribution

Niu-owned website code is MIT licensed. Brand assets and theme tokens are reused unchanged from [Niu's branding directory](https://github.com/niu-io/niu/tree/main/branding); their original attribution is retained in [public/brand/SOURCE-LICENSE.txt](public/brand/SOURCE-LICENSE.txt). No LiteLLM marketing copy is included.

## Typography

Geist Sans and Geist Mono are bundled locally through Fontsource under the SIL Open Font License. Font notices are available in `public/fonts/`. The page uses the niu.io light theme, a larger body-text scale, and monospace labels for technical details.
