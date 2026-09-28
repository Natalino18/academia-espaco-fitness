import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import securityHeaders from './config/security-headers.json';

export default defineConfig(({ mode }) => {
  const { VITE_SITE_URL = '' } = loadEnv(mode, process.cwd(), 'VITE_');
  let siteUrl = '';
  if (VITE_SITE_URL) {
    const url = new URL(VITE_SITE_URL);
    if (!['https:', 'http:'].includes(url.protocol)) throw new Error('VITE_SITE_URL deve ser uma URL HTTP(S).');
    if (url.username || url.password || url.search || url.hash) throw new Error('VITE_SITE_URL deve conter somente a URL pública, sem credenciais, query ou fragmento.');
    if (mode === 'production' && url.protocol !== 'https:') throw new Error('VITE_SITE_URL de produção deve utilizar HTTPS.');
    siteUrl = url.href.replace(/\/$/, '').replace(/"/g, '&quot;');
  }
  return {
    build: { sourcemap: false },
    // Preview exercises production headers without restricting Vite HMR.
    preview: { headers: securityHeaders },
    plugins: [react(), {
      name: 'site-metadata',
      transformIndexHtml: (html) => html.replace('<!-- site-metadata -->', siteUrl
        ? `<link rel="canonical" href="${siteUrl}/" /><meta property="og:url" content="${siteUrl}/" /><meta property="og:image" content="${siteUrl}/images/academia/social.jpg" /><meta name="twitter:image" content="${siteUrl}/images/academia/social.jpg" />`
        : ''),
    }, {
      name: 'production-security-headers',
      apply: 'build',
      generateBundle() {
        // Recognized by Netlify / Cloudflare Pages; other hosts need equivalent rules.
        this.emitFile({ type: 'asset', fileName: '_headers', source: `/*\n${Object.entries(securityHeaders).map(([name, value]) => `  ${name}: ${value}`).join('\n')}\n` });
      },
    }],
  };
});
