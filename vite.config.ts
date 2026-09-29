import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import securityHeaders from './config/security-headers.json';

export default defineConfig(({ mode }) => {
  const { VITE_SITE_URL = '' } = loadEnv(mode, process.cwd(), 'VITE_');
  const publicUrl = VITE_SITE_URL || (mode === 'production' ? 'https://academia-espaco-fitness.pages.dev/' : '');
  let siteUrl = '';
  if (publicUrl) {
    const url = new URL(publicUrl);
    if (!['https:', 'http:'].includes(url.protocol)) throw new Error('VITE_SITE_URL deve ser uma URL HTTP(S).');
    if (url.username || url.password || url.search || url.hash) throw new Error('VITE_SITE_URL deve conter somente a URL pública, sem credenciais, query ou fragmento.');
    if (mode === 'production' && url.protocol !== 'https:') throw new Error('VITE_SITE_URL de produção deve utilizar HTTPS.');
    siteUrl = url.href.replace(/\/$/, '').replace(/"/g, '&quot;');
  }
  return {
    build: { sourcemap: false },
    plugins: [react(), {
      name: 'site-metadata',
      transformIndexHtml: (html) => html.replace('<!-- site-metadata -->', siteUrl
        ? `<link rel="canonical" href="${siteUrl}/" /><meta property="og:url" content="${siteUrl}/" /><meta property="og:image" content="${siteUrl}/images/academia/social.jpg" /><meta name="twitter:image" content="${siteUrl}/images/academia/social.jpg" />`
        : ''),
    }, {
      name: 'production-security-headers',
      configurePreviewServer(server) {
        // Mirror the path-specific production policy without changing Vite HMR.
        server.middlewares.use((req, res, next) => {
          const isSitemap = req.url?.split('?')[0] === '/sitemap.xml';
          for (const [name, value] of Object.entries(securityHeaders)) {
            if (isSitemap && name === 'Content-Security-Policy') continue;
            res.setHeader(name, value);
          }
          next();
        });
      },
      generateBundle() {
        // Recognized by Netlify / Cloudflare Pages; other hosts need equivalent rules.
        // Cloudflare: remove the inherited CSP only for the browser's XML viewer.
        this.emitFile({ type: 'asset', fileName: '_headers', source: `/*\n${Object.entries(securityHeaders).map(([name, value]) => `  ${name}: ${value}`).join('\n')}\n\n/sitemap.xml\n  ! Content-Security-Policy\n` });
      },
    }],
  };
});
