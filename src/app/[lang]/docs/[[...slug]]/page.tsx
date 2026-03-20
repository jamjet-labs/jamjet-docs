import defaultMdxComponents from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getSource } from '@/lib/source';
import type { ComponentType } from 'react';
import type { Metadata } from 'next';
import { locales } from '@/lib/i18n';

interface MdxPageData {
  title?: string;
  description?: string;
  body: ComponentType<{ components?: Record<string, ComponentType> }>;
  toc: { title: string; url: string; depth: number }[];
  full?: boolean;
}

export default async function Page(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const localSource = getSource(params.lang);
  const page = localSource.getPage(params.slug);
  if (!page) notFound();

  const data = page.data as unknown as MdxPageData;

  return (
    <DocsPage toc={data.toc} full={data.full}>
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription>{data.description}</DocsDescription>
      <DocsBody>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <data.body components={defaultMdxComponents as any} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  // Generate params from English source for all locales
  const enSource = getSource('en');
  const enParams = enSource.generateParams();
  return locales.flatMap((l) =>
    enParams.map((p) => ({
      ...p,
      lang: l.locale,
    })),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const localSource = getSource(lang);
  const page = localSource.getPage(slug);
  if (!page) return {};

  const url = slug
    ? `https://docs.jamjet.dev/${lang}/docs/${slug.join('/')}`
    : `https://docs.jamjet.dev/${lang}/docs`;

  // Build hreflang alternates
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    const altPath = slug
      ? `/${locale.locale}/docs/${slug.join('/')}`
      : `/${locale.locale}/docs`;
    languages[locale.locale] = `https://docs.jamjet.dev${altPath}`;
  }
  languages['x-default'] = slug
    ? `https://docs.jamjet.dev/en/docs/${slug.join('/')}`
    : `https://docs.jamjet.dev/en/docs`;

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: page.data.title as string | undefined,
      description: page.data.description as string | undefined,
      url,
      siteName: 'JamJet Docs',
      type: 'article',
      images: [
        {
          url: 'https://docs.jamjet.dev/og.png',
          width: 1200,
          height: 630,
          alt: 'JamJet — The Agent-Native Runtime',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title as string | undefined,
      description: page.data.description as string | undefined,
      images: ['https://docs.jamjet.dev/og.png'],
    },
  };
}
