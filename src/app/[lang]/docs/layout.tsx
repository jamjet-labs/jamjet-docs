import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: '1.15rem',
              letterSpacing: '-0.03em',
            }}
          >
            JamJet
          </span>
        ),
        url: `/${lang}`,
      }}
      links={[
        { text: 'Website', url: 'https://jamjet.dev' },
        { text: 'Research', url: 'https://jamjet.dev/research' },
        {
          text: 'GitHub',
          url: 'https://github.com/jamjet-labs/jamjet',
          external: true,
        },
      ]}
      sidebar={{
        defaultOpenLevel: 1,
      }}
    >
      {children}
    </DocsLayout>
  );
}
