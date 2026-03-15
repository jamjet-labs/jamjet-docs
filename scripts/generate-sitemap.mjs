import { writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://docs.jamjet.dev';
const locales = ['en', 'ja', 'zh', 'ko', 'es', 'de'];
const docsDir = 'content/docs/en';

// Get all doc slugs from English content
function getDocSlugs() {
  const slugs = [];
  const entries = readdirSync(docsDir);
  for (const entry of entries) {
    const path = join(docsDir, entry);
    const stat = statSync(path);
    if (stat.isFile() && (entry.endsWith('.mdx') || entry.endsWith('.md'))) {
      const slug = entry.replace(/\.(mdx|md)$/, '');
      if (slug !== 'index') slugs.push(slug);
    }
    if (stat.isDirectory()) {
      // Handle subdirectories like migrate/
      const subEntries = readdirSync(path);
      for (const sub of subEntries) {
        if (sub.endsWith('.mdx') || sub.endsWith('.md')) {
          const subSlug = sub.replace(/\.(mdx|md)$/, '');
          slugs.push(`${entry}/${subSlug}`);
        }
      }
    }
  }
  return slugs;
}

const slugs = getDocSlugs();
const today = new Date().toISOString().split('T')[0];

let urls = '';

// Language homepages
for (const lang of locales) {
  const alternates = locales.map(l =>
    `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}"/>`
  ).join('\n');
  urls += `  <url>
    <loc>${BASE_URL}/${lang}</loc>
    <lastmod>${today}</lastmod>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en"/>
  </url>\n`;
}

// Doc pages
for (const slug of slugs) {
  for (const lang of locales) {
    const alternates = locales.map(l =>
      `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}/docs/${slug}"/>`
    ).join('\n');
    urls += `  <url>
    <loc>${BASE_URL}/${lang}/docs/${slug}</loc>
    <lastmod>${today}</lastmod>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en/docs/${slug}"/>
  </url>\n`;
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}</urlset>`;

writeFileSync('public/sitemap.xml', sitemap);
console.log(`Sitemap generated: ${slugs.length} docs × ${locales.length} locales + ${locales.length} homepages = ${slugs.length * locales.length + locales.length} URLs`);
