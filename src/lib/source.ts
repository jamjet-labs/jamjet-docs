import {
  docs,
  docs_ja,
  docs_zh,
  docs_ko,
  docs_es,
  docs_de,
} from '../../.source/server';
import { loader } from 'fumadocs-core/source';
import type { Locale } from './i18n';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createSource(collection: any, locale: string) {
  return loader({
    baseUrl: `/${locale}/docs`,
    source: collection.toFumadocsSource(),
  });
}

const sources = {
  en: createSource(docs, 'en'),
  ja: createSource(docs_ja, 'ja'),
  zh: createSource(docs_zh, 'zh'),
  ko: createSource(docs_ko, 'ko'),
  es: createSource(docs_es, 'es'),
  de: createSource(docs_de, 'de'),
} as const;

/** Get the source loader for a given locale, falling back to English. */
export function getSource(locale: string) {
  return sources[locale as Locale] ?? sources.en;
}

/** Default English source (used for page tree in sidebar). */
export const source = sources.en;
