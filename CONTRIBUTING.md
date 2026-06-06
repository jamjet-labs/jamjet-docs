# Contributing to jamjet-docs

Thanks for helping improve the JamJet documentation. This guide covers everything you need to get started.

## Quick start

1. Fork the repo (or create a branch if you have write access).
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev` (http://localhost:3000)
4. Make your changes under `content/docs/en/`.
5. Verify the build: `npm run build`
6. Open a PR targeting `main`.

## The most important rule: English only

**Only edit files under `content/docs/en/`.**

The other locale directories (`ja/`, `zh/`, `ko/`, `es/`, `de/`) are generated automatically. When a PR merges to `main`, a Lingo.dev GitHub Action translates the English source into all supported languages and commits the results. Any edits you make to those directories will be overwritten.

If you notice a translation error, open an issue describing the problem. Do not edit the generated locale files directly.

## Style guide

### Frontmatter

Every page must have at least a `title`. A `description` is strongly recommended as it appears in search results.

```mdx
---
title: Page Title
description: One-sentence summary.
---
```

### Headings

Use a single `## H2` as the first heading. Break sections with `### H3`. Avoid H1 inside page content (the `title` frontmatter provides it). Do not skip levels.

### Code blocks

Always include a language tag:

````mdx
```typescript
const result = await agent.run(input);
```
````

Supported tags include `typescript`, `python`, `java`, `yaml`, `bash`, `json`.

### Callouts

Use blockquotes with a bold label for notes and tips:

```mdx
> **Note:** This feature requires JamJet Cloud.

> **Tip:** You can also pass a config object here.
```

### Prose

Keep it plain and direct. Short sentences. No em dashes. Avoid filler phrases ("simply", "easily", "just", "it's worth noting that"). If something has a prerequisite, state it up front.

## Nav and meta.json

Each section under `content/docs/en/` has a `meta.json` that controls sidebar order:

```json
{
  "title": "Section Name",
  "pages": [
    "index",
    "---Category Heading---",
    "some-page",
    "another-page"
  ]
}
```

Rules:
- Pages are listed by filename without the `.mdx` extension.
- Strings wrapped in `---dashes---` become sidebar dividers/headings.
- The order in `pages` is the order in the sidebar.
- Pages not listed in `meta.json` still exist but won't appear in the sidebar.

When you add a new page, add it to `meta.json` in the right position.

## Where to put a new page

Put the file in the section that best fits the content:

| Section | For |
|---------|-----|
| `cloud/` | JamJet Cloud features, dashboard, policies |
| `open-source/` | Runtime, SDKs, YAML workflows, protocols |
| `integrations/` | Third-party integrations (Spring, LangChain4j, etc.) |
| `reference/` | API reference, glossary, migration guides |

If you are unsure, open an issue first and describe the page you want to add.

## PR expectations

- The build passes locally (`npm run build` exits cleanly).
- Only `content/docs/en/` files and any related `meta.json` changes are included. Do not commit generated locale files.
- One topic per PR. Mixing unrelated changes makes review harder.
- Link any related issue in the PR description.
- PR titles should be short and descriptive, e.g. "docs: add LangChain4j streaming guide".
