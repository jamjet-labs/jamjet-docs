import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>
            JamJet
          </span>
        ),
        url: '/',
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
