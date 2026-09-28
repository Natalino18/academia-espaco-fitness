# Segurança da publicação — Cloudflare Pages / Netlify

## Publicação estática

- Build: `npm ci` seguido de `npm run build`, usando uma versão Node LTS atualizada compatível com `engines`.
- Diretório público: **somente `dist/`**. Não publicar a raiz do repositório, masters, relatórios Playwright, `node_modules`, configurações ou arquivos `.env`.
- `npm run dev` e `npm run preview` são ferramentas locais, não servidores de produção.
- Configure `VITE_SITE_URL` com a URL HTTPS pública definitiva, sem credenciais, query ou fragmento. Essa variável é pública e aparece nos metadados. Nunca utilizar `VITE_*` para segredos.

## Headers

A fonte única é `config/security-headers.json`. O plugin em `vite.config.ts` gera `dist/_headers` a cada build, no formato aceito por Cloudflare Pages e Netlify para arquivos estáticos. O preview também envia a política para permitir testes; o servidor de desenvolvimento mantém HMR sem essas restrições.

A CSP permite scripts, estilos, fontes e conexões somente da própria origem. Imagens também permitem `data:` para a textura SVG existente. Scripts inline, `eval`, atributos de eventos, objetos, frames, workers, bases alternativas e submissões de formulário ficam bloqueados. Estilos são modificados pelas animações usando propriedades CSS via JavaScript; essa operação continua funcionando com `style-src-attr 'none'`.

`frame-ancestors 'none'` e `X-Frame-Options: DENY` bloqueiam incorporação do site. O projeto não tem integração que dependa de iframe. Caso uma plataforma futura exija incorporar a página, reavaliar explicitamente essa política.

Também são enviados `nosniff`, `strict-origin-when-cross-origin` e restrições de câmera, microfone, localização, pagamentos e USB. Nenhum recurso atual depende dessas permissões.

Não existe CSP por meta tag: `frame-ancestors` exige header HTTP. Se futuramente forem adicionadas Functions, Edge Functions ou SSR, configurar os headers também nas respostas dessas funções; `_headers` não cobre automaticamente todas essas modalidades.

## HTTPS e HSTS

Confirmar certificado válido e redirecionamento HTTP → HTTPS no domínio final. HSTS não foi adicionado automaticamente: o domínio e o HTTPS de produção ainda não foram verificados. Depois dessa confirmação, configurar inicialmente `Strict-Transport-Security: max-age=300` no host e validar. Aumentar o prazo após confirmação operacional. Não usar `includeSubDomains` ou `preload` sem verificar todos os subdomínios e as consequências de persistência.

## Verificação após deploy

1. Conferir headers de `/`, de um JS em `/assets/` e de uma imagem; verificar a resposta final após redirects. Por exemplo, `curl -I https://SEU-DOMINIO/`.
2. Confirmar CSP, `nosniff`, Permissions-Policy, Referrer-Policy e proteção de framing. Conferir ausência de headers duplicados ou políticas conflitantes do painel/CDN.
3. Confirmar que `/.env`, `/package.json`, `/src/main.tsx` e `/.git/config` nunca entregam arquivos internos. Um fallback HTML de SPA não equivale a exposição de arquivo.
4. Conferir MIME correto de JS/CSS/fontes/imagens e ausência de directory listing.
5. No navegador, conferir console sem violações CSP, imagens, menu mobile, animação, botão Ver modalidades, reduced motion e links externos.
6. Verificar se o host acrescentou analytics, challenge, widgets ou scripts. Esses recursos não estavam no projeto auditado e podem exigir nova análise de CSP e privacidade.
7. Restringir acesso de escrita ao projeto da hospedagem, usar MFA no provedor e definir retenção de logs de acesso. Isso pertence à infraestrutura, não exige login no site.

Referências: [Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/headers/), [Netlify](https://docs.netlify.com/manage/routing/headers/), [Vite — publicação estática](https://vite.dev/guide/static-deploy), [MDN — estilos inline/CSSOM](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr), [MDN — HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security).
