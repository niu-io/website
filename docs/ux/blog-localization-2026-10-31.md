# Blog localization and editorial review

Verified October 31, 2026. Tracking reference: niu-94d.

## Purpose and decisions

The index helps readers recognize the two key articles, choose one and read it in English or Simplified Chinese. Previously the index displayed English article metadata and large article outlines even when the shell was Chinese; the article body stayed English. The comparison existed as a separate tool page, so an editorial comparison article now links to that tool rather than replacing it.

The inspected reference was the actual [OpenRouter blog](https://openrouter.ai/blog/): prominent landscape covers followed by category/date, title and summary. The local composition uses two equal article columns because there are two key posts, preserves the Niu header and theme, and collapses to one column. No unsupported categories, results or newsletter controls were added. Per the user's final direction, covers are abstract, text-free, ivory/graphite/orange artwork. The gateway cover suggests convergence and distribution; the benchmark cover suggests rhythm, density and speed. They are editorial illustrations, not measured benchmark results. Final prompts and file names are recorded in [the generation record](blog-cover-generation.json).

English articles remain in `src/content/blog`; matching Chinese translations live in `src/content/blog-translations` with the same ID. Both collections share validation and publication filtering. Translation records do not create duplicate index entries or routes. Readers use the existing shared language menu. Metadata, body, contents, category, dates and reading time change together; linked sections map by corresponding section order. Missing translations fall back to the original article. New translations must preserve section order to retain this mapping. The main website's article previews use translated title, summary, category, date and reading time.

The shared locale hook initially rendered saved Chinese state over English server markup, causing hydration errors in the header and article footer. Its canonical public source now starts with the server locale and restores the saved/browser preference after hydration. Only the locale snapshot was refreshed, with its source revision, modified-state marker and exact hash; other public-shell snapshots were preserved.

## Review criteria and observed evidence

The [NN/g visual design principles](https://www.nngroup.com/articles/principles-visual-design/), cited by the ux-review skill, inform the hierarchy/grouping judgment: equal cover proportions, aligned article metadata and titles, quieter summaries, and nearby reading actions distinguish the two choices without repeating large contents panels. This is an observed composition judgment, not a user-research result. Niu theme tokens remain authoritative for color and geometry.

The skill's [NN/g usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) support consistent language, state and control: the existing language selection translates the complete article and the document title, survives article navigation/reload, and maintains a selected contents section across languages. English and Chinese comparison sections link to the existing detailed comparisons and benchmark guide.

The skill's selected [WCAG 2.2](https://www.w3.org/TR/WCAG22/) keyboard/reflow checks were exercised through the shared menu: keyboard End/Enter selected Chinese and returned focus to the trigger; contents links moved to headings; Copy link displayed success; Back to top returned to main. This is bounded verification, not a full WCAG audit.

| Surface/state | Observed evidence |
| --- | --- |
| Index, 1280×900, light Chinese / dark English | Two 574px article columns inside an 1184px main region; landscape images loaded; title/summary/action hierarchy visually inspected; scroll width equals viewport. |
| Article, 900×900, Chinese | 680px reading column inside 768px main region; header and image align; no horizontal overflow. |
| Index and article, 390×844 | One article column, readable wrapped headings and summaries, full image aspect ratio; floating navigation/language menu fits and dismisses after selection. |
| Why Niu, English/Chinese | Complete body and translated contents; headings navigate; saved Chinese preference survives navigation. |
| Comparison, English/Chinese | Five matching sections; keyboard language switch mapped benchmark section hash to its Chinese counterpart. |
| Locale/menu rendering | Initial hydration error corrected; later observed console entries contain no new errors. |

Task completeness, visual composition and interaction correctness passed the scoped checks above. Existing independent compare-tool changes were left intact. Live upstream model conformance, publication/deployment and full site accessibility were outside this local blog verification.

## Validation

- Website `pnpm check`: zero errors, warnings or hints.
- Website `pnpm test`: two publication-policy tests passed.
- Website `pnpm build`: public-shell verification and static build passed, including both blog routes and the sitemap.
- Canonical dashboard locale suite: four tests passed using the installed Vitest binary. The package-manager entry initially attempted an unrelated network dependency check; that run was stopped, and the installed runner completed successfully.
- Generated article HTML: both language variants present, no duplicate element IDs.
- Git whitespace checks passed. Source changes are uncommitted and unpublished.
