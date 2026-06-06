# jamjet-docs

Source for [docs.jamjet.dev](https://docs.jamjet.dev) — the official JamJet documentation site, built with [Fumadocs](https://fumadocs.vercel.app) on Next.js.

Licensed under [Apache 2.0](LICENSE).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server hot-reloads on content and code changes.

To verify the production build before opening a PR:

```bash
npm run build
```

This runs a sitemap script then `next build`. Fix any errors it reports before pushing.

## Content structure

All hand-edited content lives under `content/docs/en/`. The top-level sections are:

| Directory | What it covers |
|-----------|----------------|
| `cloud/` | JamJet Cloud (dashboard, governance, telemetry) |
| `open-source/` | Runtime, SDKs, YAML authoring, protocols |
| `integrations/` | Spring Boot, LangChain4j, Vercel AI SDK |
| `reference/` | REST API, glossary, migration guides |

Each section has a `meta.json` that controls sidebar order. Pages are listed by filename without the `.mdx` extension. Lines like `"---Section---"` become sidebar dividers.

Example:

```json
{
  "title": "Reference",
  "pages": [
    "index",
    "rest-api",
    "---Migration Guides---",
    "migrate/langgraph"
  ]
}
```

## Adding or editing a page

1. Create or edit the `.mdx` file under `content/docs/en/<section>/`.
2. Add the filename (no extension) to the section's `meta.json` in the position you want.
3. Run `npm run build` locally and confirm it passes.
4. Open a PR targeting `main`.

Every page needs at minimum a `title` in its frontmatter:

```mdx
---
title: My Page Title
description: One-sentence description shown in search results.
---

Page content here.
```

## Translations are automatic — edit English only

**Never edit files under `content/docs/ja/`, `content/docs/zh/`, `content/docs/ko/`, `content/docs/es/`, or `content/docs/de/`.**

When a PR merges to `main`, a GitHub Action powered by [Lingo.dev](https://lingo.dev) auto-translates the English source into all supported languages and commits the results. Any manual edits to those directories will be overwritten on the next merge.

All contributions must target `content/docs/en/`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for style guidelines, nav setup, and PR expectations.
