import Link from 'next/link';
import type { Metadata } from 'next';
import { locales } from '@/lib/i18n';

const sections = [
  {
    label: 'Start here',
    items: [
      { title: 'Quickstart', slug: 'quickstart', desc: 'First agent in 5 minutes' },
      { title: 'Concepts', slug: 'concepts', desc: 'Architecture and mental model' },
      { title: 'CLI Reference', slug: 'cli', desc: 'jamjet init, dev, run, validate' },
    ],
  },
  {
    label: 'SDKs',
    items: [
      { title: 'Python SDK', slug: 'python-sdk', desc: '@task, Agent, Workflow' },
      { title: 'Java SDK', slug: 'java-sdk', desc: 'JDK 21, virtual threads, records' },
      { title: 'YAML Workflows', slug: 'yaml-workflows', desc: 'Declarative workflow definitions' },
    ],
  },
  {
    label: 'Protocols',
    items: [
      { title: 'MCP Guide', slug: 'mcp', desc: 'Connect to any tool server' },
      { title: 'A2A Guide', slug: 'a2a', desc: 'Agent-to-agent communication' },
    ],
  },
  {
    label: 'Research & Eval',
    items: [
      { title: 'Research Guide', slug: 'research-guide', desc: 'Experiments, grids, publication export' },
      { title: 'Eval Harness', slug: 'eval', desc: 'Scorers, judges, CI gates' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { title: 'Observability', slug: 'observability', desc: 'OTel traces, cost attribution' },
      { title: 'Deployment', slug: 'deployment', desc: 'Docker, Kubernetes, Fly.io' },
      { title: 'Enterprise', slug: 'enterprise', desc: 'Policy, PII, multi-tenant, mTLS' },
    ],
  },
];

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
        <header className="home-header">
          <span className="home-badge">Documentation</span>
          <h1 className="home-title">JamJet</h1>
          <p className="home-subtitle">
            The agent-native runtime. Durable execution, native MCP&nbsp;+&nbsp;A2A,
            built-in eval. Authored in Python. Powered by Rust.
          </p>
          <div className="home-actions">
            <Link href={`/${lang}/docs/quickstart`} className="home-btn-primary">
              Get started
            </Link>
            <Link href={`/${lang}/docs`} className="home-btn-secondary">
              Browse docs
            </Link>
          </div>
          <div className="home-install">
            <span className="home-install-prompt">$</span>
            <span>pip install jamjet</span>
          </div>
        </header>

        <div className="home-sections">
          {sections.map((section) => (
            <div key={section.label} className="home-section">
              <h2 className="home-section-label">{section.label}</h2>
              <div className="home-section-items">
                {section.items.map((item) => (
                  <Link key={item.slug} href={`/${lang}/docs/${item.slug}`} className="home-card">
                    <h3 className="home-card-title">{item.title}</h3>
                    <p className="home-card-desc">{item.desc}</p>
                    <span className="home-card-arrow">&rarr;</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

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
        .home-header{padding:100px 0 80px;text-align:center}
        .home-badge{display:inline-block;font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:var(--j-amber);border:1px solid rgb(var(--fd-border));padding:4px 14px;border-radius:100px;margin-bottom:24px}
        .home-title{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:clamp(2.8rem,7vw,4.5rem);font-weight:800;letter-spacing:-0.045em;line-height:1.05;color:rgb(var(--fd-foreground));margin:0 0 20px}
        .home-subtitle{font-family:'Source Serif 4',Georgia,serif;font-size:clamp(1.05rem,2vw,1.2rem);color:rgb(var(--fd-muted-foreground));line-height:1.7;max-width:560px;margin:0 auto 36px}
        .home-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:28px}
        .home-btn-primary{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:0.88rem;font-weight:600;padding:10px 28px;border-radius:8px;background:var(--j-amber);color:#fff;text-decoration:none;transition:opacity 0.2s,transform 0.15s}
        .home-btn-primary:hover{opacity:0.9;transform:translateY(-1px)}
        .home-btn-secondary{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:0.88rem;font-weight:600;padding:10px 28px;border-radius:8px;background:transparent;color:rgb(var(--fd-foreground));border:1px solid rgb(var(--fd-border));text-decoration:none;transition:background 0.2s,border-color 0.2s}
        .home-btn-secondary:hover{background:rgb(var(--fd-muted)/0.1);border-color:rgb(var(--fd-muted))}
        .home-install{display:inline-flex;align-items:center;gap:10px;background:rgb(var(--j-code-bg));padding:10px 20px;border-radius:8px;border:1px solid rgb(var(--j-code-border));font-family:'IBM Plex Mono',monospace;font-size:0.84rem;color:rgb(var(--j-code-fg))}
        .home-install-prompt{color:var(--j-amber);user-select:none}
        .home-sections{padding-bottom:80px}
        .home-section{margin-bottom:48px}
        .home-section-label{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--j-amber);margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid rgb(var(--fd-border))}
        .home-section-items{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
        .home-card{display:block;padding:20px 22px;border:1px solid rgb(var(--fd-border));border-radius:10px;text-decoration:none;transition:border-color 0.2s,background 0.2s,transform 0.15s;position:relative;background:rgb(var(--fd-card)/0.5)}
        .home-card:hover{border-color:rgb(var(--fd-primary)/0.4);background:rgb(var(--fd-card));transform:translateY(-2px)}
        .home-card-title{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:0.95rem;font-weight:600;color:rgb(var(--fd-foreground));margin:0 0 4px}
        .home-card-desc{font-family:'Source Serif 4',Georgia,serif;font-size:0.85rem;color:rgb(var(--fd-muted-foreground));margin:0;line-height:1.5}
        .home-card-arrow{position:absolute;top:20px;right:18px;font-size:1rem;color:rgb(var(--fd-muted));transition:color 0.2s,transform 0.2s}
        .home-card:hover .home-card-arrow{color:var(--j-amber);transform:translateX(3px)}
        .home-footer{padding:40px 0;border-top:1px solid rgb(var(--fd-border));text-align:center}
        .home-footer-links{display:flex;justify-content:center;gap:24px;flex-wrap:wrap;margin-bottom:12px}
        .home-footer-links a{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:0.82rem;color:rgb(var(--fd-muted-foreground));text-decoration:none;transition:color 0.15s}
        .home-footer-links a:hover{color:var(--j-amber)}
        .home-footer-copy{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:0.72rem;color:rgb(var(--fd-muted));margin:0}
        .home-header{animation:homeReveal 0.6s ease-out}
        .home-section:nth-child(1){animation:homeReveal 0.5s ease-out 0.1s both}
        .home-section:nth-child(2){animation:homeReveal 0.5s ease-out 0.15s both}
        .home-section:nth-child(3){animation:homeReveal 0.5s ease-out 0.2s both}
        .home-section:nth-child(4){animation:homeReveal 0.5s ease-out 0.25s both}
        .home-section:nth-child(5){animation:homeReveal 0.5s ease-out 0.3s both}
        @keyframes homeReveal{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:640px){.home-header{padding:60px 0 48px}.home-section-items{grid-template-columns:1fr}}
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
    title: 'JamJet Documentation',
    description:
      'The agent-native runtime. Durable execution, native MCP + A2A, built-in eval. Authored in Python. Powered by Rust.',
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: 'JamJet Documentation',
      description:
        'The agent-native runtime. Durable execution, native MCP + A2A, built-in eval. Authored in Python. Powered by Rust.',
      url,
      siteName: 'JamJet Docs',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'JamJet Documentation',
      description:
        'The agent-native runtime. Durable execution, native MCP + A2A, built-in eval. Authored in Python. Powered by Rust.',
    },
  };
}
