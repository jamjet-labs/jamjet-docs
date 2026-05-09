import Link from 'next/link';
import type { Metadata } from 'next';
import { locales } from '@/lib/i18n';

export default async function LangHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <main className="home-root">
      <div className="home-grain" />
      <div className="home-container">
        {/* Hero */}
        <header className="home-header">
          <span className="home-badge">Documentation</span>
          <h1 className="home-title">Production-safe AI agents.</h1>
          <p className="home-subtitle">
            Drop-in governance, telemetry, and approval flows for any AI app.
            Free tier. No code changes.
          </p>
          <div className="home-actions">
            <a href="https://app.jamjet.dev" className="home-btn-primary">
              Get started free
            </a>
            <Link
              href={`/${lang}/docs/cloud/get-started/quickstart`}
              className="home-btn-secondary"
            >
              Read the Cloud quickstart
            </Link>
          </div>
          <div className="home-install">
            <span className="home-install-prompt">$</span>
            <span>pnpm add @jamjet/cloud @jamjet/cloud-vercel</span>
          </div>
          <p className="home-install-note">
            Python: <code className="home-install-code">pip install jamjet</code>
          </p>
        </header>

        {/* Three product cards */}
        <section className="home-cards">
          {/* Card 1 — JamJet Cloud (featured, spans 2 cols on md) */}
          <Link
            href={`/${lang}/docs/cloud`}
            className="home-card home-card-featured"
          >
            <div className="home-card-inner">
              <span className="home-card-eyebrow">Hosted</span>
              <h2 className="home-card-title-lg">JamJet Cloud</h2>
              <p className="home-card-tagline">Governance for AI agents</p>
              <p className="home-card-desc">
                Policy, budget, approvals, audit trail. Hosted.
              </p>
            </div>
            <span className="home-card-cta">Cloud quickstart &rarr;</span>
          </Link>

          {/* Card 2 — Open Source Runtime */}
          <Link
            href={`/${lang}/docs/open-source/quickstart`}
            className="home-card"
          >
            <div className="home-card-inner">
              <span className="home-card-eyebrow">Open source</span>
              <h2 className="home-card-title-md">Open Source Runtime</h2>
              <p className="home-card-tagline">Durable agent workflows</p>
              <p className="home-card-desc">
                Rust core. Python + Java SDKs. Checkpoint replay. MCP + A2A native.
              </p>
            </div>
            <span className="home-card-cta">OSS quickstart &rarr;</span>
          </Link>

          {/* Card 3 — Integrations */}
          <Link
            href={`/${lang}/docs/integrations`}
            className="home-card"
          >
            <div className="home-card-inner">
              <span className="home-card-eyebrow">Ecosystem</span>
              <h2 className="home-card-title-md">Integrations</h2>
              <p className="home-card-tagline">Drop into your stack</p>
              <p className="home-card-desc">
                Vercel AI SDK, LangChain4j, Spring Boot.
              </p>
            </div>
            <span className="home-card-cta">All integrations &rarr;</span>
          </Link>
        </section>

        <footer className="home-footer">
          <div className="home-footer-links">
            <a href="https://jamjet.dev">jamjet.dev</a>
            <a href="https://jamjet.dev/research">Research</a>
            <a href="https://github.com/jamjet-labs/jamjet">GitHub</a>
            <a href="https://jamjet.dev/blog">Blog</a>
          </div>
          <p className="home-footer-copy">Apache 2.0 &middot; JamJet 2026</p>
        </footer>
      </div>

      <style>{`
        .home-root{min-height:100vh;background:rgb(var(--fd-background));position:relative;overflow:hidden}
        .home-grain{position:fixed;inset:0;pointer-events:none;opacity:0.025;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-repeat:repeat;background-size:180px;z-index:0}
        .home-container{position:relative;z-index:1;max-width:960px;margin:0 auto;padding:0 28px}

        /* Hero */
        .home-header{padding:100px 0 80px;text-align:center;animation:homeReveal 0.6s ease-out}
        .home-badge{display:inline-block;font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:var(--j-amber);border:1px solid rgb(var(--fd-border));padding:4px 14px;border-radius:100px;margin-bottom:24px}
        .home-title{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:clamp(2.8rem,7vw,4.5rem);font-weight:800;letter-spacing:-0.045em;line-height:1.05;color:rgb(var(--fd-foreground));margin:0 0 20px}
        .home-subtitle{font-family:'Source Serif 4',Georgia,serif;font-size:clamp(1.05rem,2vw,1.2rem);color:rgb(var(--fd-muted-foreground));line-height:1.7;max-width:560px;margin:0 auto 36px}
        .home-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:24px}
        .home-btn-primary{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:0.88rem;font-weight:600;padding:10px 28px;border-radius:8px;background:var(--j-amber);color:#fff;text-decoration:none;transition:opacity 0.2s,transform 0.15s}
        .home-btn-primary:hover{opacity:0.9;transform:translateY(-1px)}
        .home-btn-secondary{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:0.88rem;font-weight:600;padding:10px 28px;border-radius:8px;background:transparent;color:rgb(var(--fd-foreground));border:1px solid rgb(var(--fd-border));text-decoration:none;transition:background 0.2s,border-color 0.2s}
        .home-btn-secondary:hover{background:rgb(var(--fd-muted)/0.1);border-color:rgb(var(--fd-muted))}
        .home-install{display:inline-flex;align-items:center;gap:10px;background:rgb(var(--j-code-bg));padding:10px 20px;border-radius:8px;border:1px solid rgb(var(--j-code-border));font-family:'IBM Plex Mono',monospace;font-size:0.84rem;color:rgb(var(--j-code-fg));margin-bottom:10px}
        .home-install-prompt{color:var(--j-amber);user-select:none}
        .home-install-note{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:0.75rem;color:rgb(var(--fd-muted-foreground));margin:0}
        .home-install-code{font-family:'IBM Plex Mono',monospace;font-size:0.78rem}

        /* Product cards grid */
        .home-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-bottom:80px;animation:homeReveal 0.5s ease-out 0.15s both}
        .home-card{display:flex;flex-direction:column;justify-content:space-between;padding:28px;border:1px solid rgb(var(--fd-border));border-radius:12px;text-decoration:none;background:rgb(var(--fd-card)/0.5);transition:border-color 0.2s,background 0.2s,transform 0.15s;position:relative}
        .home-card:hover{border-color:rgb(var(--fd-primary)/0.5);background:rgb(var(--fd-card));transform:translateY(-2px)}
        .home-card-featured{grid-column:span 2}
        .home-card-inner{flex:1}
        .home-card-eyebrow{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--j-amber);display:block;margin-bottom:10px}
        .home-card-title-lg{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:1.7rem;font-weight:800;letter-spacing:-0.03em;color:rgb(var(--fd-foreground));margin:0 0 6px}
        .home-card-title-md{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:1.2rem;font-weight:700;letter-spacing:-0.02em;color:rgb(var(--fd-foreground));margin:0 0 6px}
        .home-card-tagline{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:0.88rem;font-weight:600;color:rgb(var(--fd-foreground));margin:0 0 10px;opacity:0.7}
        .home-card-desc{font-family:'Source Serif 4',Georgia,serif;font-size:0.88rem;color:rgb(var(--fd-muted-foreground));line-height:1.6;margin:0 0 20px}
        .home-card-cta{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:0.82rem;font-weight:600;color:var(--j-amber);transition:color 0.2s,transform 0.2s;display:inline-block}
        .home-card:hover .home-card-cta{transform:translateX(3px)}

        /* Footer */
        .home-footer{padding:40px 0;border-top:1px solid rgb(var(--fd-border));text-align:center}
        .home-footer-links{display:flex;justify-content:center;gap:24px;flex-wrap:wrap;margin-bottom:12px}
        .home-footer-links a{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:0.82rem;color:rgb(var(--fd-muted-foreground));text-decoration:none;transition:color 0.15s}
        .home-footer-links a:hover{color:var(--j-amber)}
        .home-footer-copy{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:0.72rem;color:rgb(var(--fd-muted));margin:0}

        @keyframes homeReveal{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

        @media(max-width:768px){
          .home-cards{grid-template-columns:1fr}
          .home-card-featured{grid-column:span 1}
        }
        @media(max-width:640px){
          .home-header{padding:60px 0 48px}
        }
      `}</style>
    </main>
  );
}

export function generateStaticParams() {
  return locales.map((l) => ({ lang: l.locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const url = `https://docs.jamjet.dev/${lang}`;

  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale.locale] = `https://docs.jamjet.dev/${locale.locale}`;
  }
  languages['x-default'] = 'https://docs.jamjet.dev/en';

  return {
    title: 'JamJet — Production-safe AI agents',
    description:
      'Drop-in governance, telemetry, and approval flows for any AI app. Free tier. No code changes.',
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: 'JamJet — Production-safe AI agents',
      description:
        'Drop-in governance, telemetry, and approval flows for any AI app. Free tier. No code changes.',
      url,
      siteName: 'JamJet Docs',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'JamJet — Production-safe AI agents',
      description:
        'Drop-in governance, telemetry, and approval flows for any AI app. Free tier. No code changes.',
    },
  };
}
