import '../global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import Script from 'next/script';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { locales, defaultLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: {
    template: '%s — JamJet Docs',
    default: 'JamJet Docs — The Agent-Native Runtime',
  },
  description:
    'Documentation for JamJet: durable execution, native MCP + A2A, eval harness, and polyglot SDKs for production AI agents.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    siteName: 'JamJet Docs',
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
    site: '@jamjetdev',
    images: ['https://docs.jamjet.dev/og.png'],
  },
};

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1VK3ZE2VHJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1VK3ZE2VHJ');
          `}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'JamJet',
                url: 'https://jamjet.dev',
                logo: 'https://jamjet.dev/favicon.svg',
                sameAs: [
                  'https://github.com/jamjet-labs/jamjet',
                  'https://twitter.com/jamjetdev',
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'JamJet Documentation',
                url: 'https://docs.jamjet.dev',
              },
            ]),
          }}
        />
      </head>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((l) => ({ lang: l.locale }));
}
