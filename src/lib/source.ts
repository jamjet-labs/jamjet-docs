import { docs } from '../../.source/server';
import { loader } from 'fumadocs-core/source';
import { defaultLocale } from './i18n';

// baseUrl includes the default locale since all routes are under /[lang]/docs/
export const source = loader({
  baseUrl: `/${defaultLocale}/docs`,
  source: docs.toFumadocsSource(),
});
