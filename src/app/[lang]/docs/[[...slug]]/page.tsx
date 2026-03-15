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
}) {
  const params = await props.params;
  const localSource = getSource(params.lang);
  const page = localSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
