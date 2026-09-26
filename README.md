# niu.io marketing website

This Astro project builds the Niu marketing homepage. The Niu Gateway serves the built artifact at `/` alongside product routes on the same origin. This repository does not build or deploy `/models/`, `/docs/`, or `/workspaces/`; links to those routes are owned by the composed Gateway.

## Development

Use Node.js 22.12 or newer and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Astro serves the homepage at `http://127.0.0.1:4321/`. Product links resolve when the page is served through the Niu Gateway composition. Set `SITE_URL` only when generating canonical and social metadata for a non-production preview; the deployed origin is `https://niu.io`.

## Check and build

```sh
pnpm check
pnpm build
pnpm preview
```

The build output is a root-mounted static artifact in `dist/`:

- `dist/index.html` is the marketing homepage.
- `dist/_astro/` contains generated CSS, font and script assets.
- `dist/site-assets/` contains approved Niu brand art, attribution and font license notices.

The artifact intentionally contains no `/models`, `/docs`, `/workspaces`, `/_catalog`, or catalog API output. The public model catalog and all product routes belong to the Niu Gateway.

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

The release image extracts the pinned artifact and sets `NIU_SITE_DIR` to its root. The Gateway serves `/` and `/_astro/` from that directory while its catalog and documentation artifacts own their respective routes. Keep the website commit and artifact digest with the composed Gateway release evidence.

The GitHub Actions workflow checks the build and verifies its output layout; it does not publish a separate website deployment.

## Source and attribution

- `src/pages/index.astro`: homepage structure and task illustration.
- `src/layouts/SiteLayout.astro`: metadata, theme and shared page shell.
- `src/components/`: navigation, value slider, task mockups and hypothetical benchmark interaction.
- `src/content/`: reviewed public page copy and synthetic benchmark arithmetic.
- `CONTENT.md`: public claim sources, benchmark assumptions and release-copy guidance.
- `src/styles/global.css`: responsive page presentation and Ox palette.
- `src/styles/tokens.css`: the Niu theme token source, retained for the homepage.
- `public/site-assets/`: Niu brand assets and required attribution/license notices.

Niu-authored website code is MIT licensed in `LICENSE`. Brand artwork attribution is retained in [public/site-assets/brand/SOURCE-LICENSE.txt](public/site-assets/brand/SOURCE-LICENSE.txt). Geist fonts are bundled locally through Fontsource and retain their SIL Open Font License notices in `public/site-assets/fonts/`. Product claims distinguish current implementation from planned work.
