import { writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://docs.jamjet.dev';
const locales = ['en', 'ja', 'zh', 'ko', 'es', 'de'];
const contentRoot = 'content/docs';

// Recursively collect doc slugs that actually exist in a given locale's content
// directory. Untranslated locales only have the pages Lingo has translated, so
// walking each locale (not just English) is what keeps noindex pages out of the
// sitemap: a page is indexable in locale X iff its content file exists under X.
function collectSlugs(dir, prefix) {
  const slugs = [];
  if (!existsSync(dir)) return slugs;
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isFile() && (entry.endsWith('.mdx') || entry.endsWith('.md'))) {
      let slug = (prefix ? prefix + '/' : '') + entry.replace(/\.(mdx|md)$/, '');
      // A nested `foo/index.mdx` is served at `/docs/foo`, not `/docs/foo/index`
      // (which 301-redirects). Emit the canonical parent path so the sitemap
      // never lists a redirecting URL.
      slug = slug.replace(/\/index$/, '');
      if (slug === 'index' || slug === '') continue;
      slugs.push(slug);
    } else if (stat.isDirectory()) {
      slugs.push(...collectSlugs(fullPath, prefix ? prefix + '/' + entry : entry));
    }
  }
  return slugs;
}

// slug -> Set of locales that have the page translated (and therefore indexable)
const localesForSlug = new Map();
for (const lang of locales) {
  for (const slug of new Set(collectSlugs(join(contentRoot, lang), ''))) {
    if (!localesForSlug.has(slug)) localesForSlug.set(slug, new Set());
    localesForSlug.get(slug).add(lang);
  }
}

const slugs = [...localesForSlug.keys()].sort();
const today = new Date().toISOString().split('T')[0];

let urls = '';
let urlCount = 0;

// Language homepages — every locale has an indexable, self-canonical homepage.
for (const lang of locales) {
  const alternates = locales
    .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}"/>`)
    .join('\n');
  urls += `  <url>
    <loc>${BASE_URL}/${lang}</loc>
    <lastmod>${today}</lastmod>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en"/>
  </url>\n`;
  urlCount++;
}

// Doc pages — emit a (locale, slug) URL only when that locale actually has the
// page. hreflang alternates point only at locales where the page exists, so we
// never advertise a noindex fallback as a translation.
for (const slug of slugs) {
  const langs = locales.filter((l) => localesForSlug.get(slug).has(l));
  for (const lang of langs) {
    const alternates = langs
      .map(
        (l) =>
          `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}/docs/${slug}"/>`,
      )
      .join('\n');
    urls += `  <url>
    <loc>${BASE_URL}/${lang}/docs/${slug}</loc>
    <lastmod>${today}</lastmod>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en/docs/${slug}"/>
  </url>\n`;
    urlCount++;
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}</urlset>`;

writeFileSync('public/sitemap.xml', sitemap);
console.log(
  `Sitemap generated: ${urlCount} indexable URLs (${locales.length} homepages + ${urlCount - locales.length} doc pages across ${slugs.length} slugs)`,
);
