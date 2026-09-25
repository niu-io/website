# NIU.IO website

The public landing page for Niu, an open-source AI gateway focused on performance and cost, with security as its foundation.

Built with Astro and the existing NIU.IO brand assets and theme tokens. This is a static marketing site; the product documentation and implementation live in [niu-io/niu](https://github.com/niu-io/niu).

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

The production output is in `dist/`. The page includes responsive navigation, keyboard-accessible approach tabs, native FAQ disclosures, metadata, and reduced-motion support. It does not use analytics, external fonts, or a client framework runtime.

## Deployment

The GitHub Actions workflow validates pull requests and deploys `main` to GitHub Pages. Enable Pages with GitHub Actions as the source in repository settings. The workflow builds for `https://niu-io.github.io/website/` by setting `SITE_URL` and `BASE_PATH`.

For a custom domain or another static host, build with the desired origin and path:

```sh
SITE_URL=https://niu.io BASE_PATH=/ pnpm build
```

Domain and DNS configuration are managed separately. No custom domain is claimed by this repository.

## Content and branding

- `src/pages/index.astro`: landing-page content and accessible interactions.
- `src/styles/global.css`: responsive page styles.
- `src/styles/tokens.css`: unchanged NIU.IO theme tokens.
- `public/brand/`: approved NIU.IO assets and retained source license.

Keep public copy accurate about implementation status. Product plans must not be presented as shipped capabilities. Link to public repositories and avoid private source paths, customer information, and secrets.

## Attribution

Niu-owned website code is MIT licensed. Brand assets and theme tokens are reused unchanged from [Niu's branding directory](https://github.com/niu-io/niu/tree/main/branding); their original attribution is retained in [public/brand/SOURCE-LICENSE.txt](public/brand/SOURCE-LICENSE.txt). No LiteLLM marketing copy is included.
