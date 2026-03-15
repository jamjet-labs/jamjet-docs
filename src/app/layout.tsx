import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s — JamJet Docs',
    default: 'JamJet Docs — The Agent-Native Runtime',
  },
  description:
    'Documentation for JamJet: durable execution, native MCP + A2A, eval harness, and polyglot SDKs for production AI agents.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
