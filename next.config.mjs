import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',

  // i18n locales — Fumadocs handles routing via file-based locales
  // Cloudflare Pages serves these as static paths: /ja/docs/..., /zh/docs/...

  async redirects() {
    return [
      // Cloud quickstart — highest-traffic legacy URL
      { source: '/quickstart', destination: '/cloud/get-started/quickstart', permanent: true },
      { source: '/cloud-quickstart', destination: '/cloud/get-started/quickstart', permanent: true },

      // Open Source moves
      { source: '/python-sdk', destination: '/open-source/python-runtime', permanent: true },
      { source: '/java-sdk', destination: '/open-source/java-runtime', permanent: true },
      { source: '/java-quickstart', destination: '/open-source/quickstart', permanent: true },
      { source: '/concepts', destination: '/open-source/concepts', permanent: true },
      { source: '/yaml-workflows', destination: '/open-source/yaml-workflows', permanent: true },
      { source: '/cli', destination: '/open-source/cli', permanent: true },
      { source: '/mcp', destination: '/open-source/protocols/mcp', permanent: true },
      { source: '/a2a', destination: '/open-source/protocols/a2a', permanent: true },
      { source: '/coordinator', destination: '/open-source/research/coordinator', permanent: true },
      { source: '/agent-as-tool', destination: '/open-source/research/agent-as-tool', permanent: true },
      { source: '/eval', destination: '/open-source/research/eval', permanent: true },
      { source: '/research-guide', destination: '/open-source/research/research-guide', permanent: true },
      { source: '/observability', destination: '/open-source/observability', permanent: true },
      { source: '/deployment', destination: '/open-source/deployment', permanent: true },
      { source: '/enterprise', destination: '/open-source/enterprise', permanent: true },

      // Integrations moves
      { source: '/spring-boot-starter', destination: '/integrations/spring-boot', permanent: true },
      { source: '/langchain4j-integration', destination: '/integrations/langchain4j', permanent: true },

      // Reference moves
      { source: '/api-reference', destination: '/reference/rest-api', permanent: true },
      { source: '/compare', destination: '/reference/compare', permanent: true },
      { source: '/migrate/langgraph', destination: '/reference/migrate/langgraph', permanent: true },
      { source: '/migrate/crewai', destination: '/reference/migrate/crewai', permanent: true },
      { source: '/migrate/google-adk', destination: '/reference/migrate/google-adk', permanent: true },
      { source: '/migrate/openai-direct', destination: '/reference/migrate/openai-direct', permanent: true },
    ]
  },
};

export default withMDX(config);
