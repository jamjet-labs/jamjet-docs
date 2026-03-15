import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',

  // i18n locales — Fumadocs handles routing via file-based locales
  // Cloudflare Pages serves these as static paths: /ja/docs/..., /zh/docs/...
};

export default withMDX(config);
