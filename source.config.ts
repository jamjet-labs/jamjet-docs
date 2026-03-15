import { defineDocs } from 'fumadocs-mdx/config';

// Define a docs collection for each locale.
// Fumadocs indexes all MDX files at build time.

export const docs = defineDocs({
  dir: 'content/docs/en',
});

export const docs_ja = defineDocs({
  dir: 'content/docs/ja',
});

export const docs_zh = defineDocs({
  dir: 'content/docs/zh',
});

export const docs_ko = defineDocs({
  dir: 'content/docs/ko',
});

export const docs_es = defineDocs({
  dir: 'content/docs/es',
});

export const docs_de = defineDocs({
  dir: 'content/docs/de',
});
