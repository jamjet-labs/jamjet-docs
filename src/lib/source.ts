import { docs } from '../../.source/server';
import { loader } from 'fumadocs-core/source';

// No i18n in the loader — locale routing is handled by the [lang] app segment.
// Content files in content/docs/ serve all locales (English source).
// When Crowdin adds content/docs/ja/*.mdx, we can add i18n here.
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});
