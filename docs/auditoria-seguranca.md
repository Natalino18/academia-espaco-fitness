# Auditoria de segurança — Academia Espaço Fitness

Data: 28/09/2026. Escopo: arquivos locais, código, lockfile, dependências instaladas, build estático e Chrome automatizado. Hospedagem pretendida: Cloudflare Pages ou Netlify. Nenhum domínio de produção foi fornecido ou testado. Não é uma garantia de ausência de vulnerabilidades nem uma auditoria da conta do provedor. Não houve commit, push, envio de mensagens, alteração visual ou alteração de dados comerciais.

## 1. Resumo e classificação

Contagem de achados de configuração/manutenção, não de CVEs:

| Severidade | Achados | Situação |
| --- | ---: | --- |
| CRITICAL | 0 | Nenhum identificado |
| HIGH | 0 | Nenhum identificado |
| MEDIUM / MODERATE | 0 | Nenhum identificado |
| LOW | 3 | 2 corrigidos localmente; 1 pendência de manutenção |
| INFORMATIONAL | 2 | Publicação a validar e instalação local a reproduzir |

**npm audit: zero vulnerabilidades** em todas as severidades, tanto completo quanto `--omit=dev`. Não foi identificado caminho explorável de XSS ou segredo real exposto. Os achados LOW não indicam comprometimento existente.

## 2. Inventário e superfície de ataque

React/React DOM 19.3.0; TypeScript 5.8.3; Vite 6.4.3; plugin React 4.7.0. Aplicação inteiramente estática, sem SSR, React Server Components, backend, rotas de API, autenticação, pagamentos ou banco de dados. `src/App.tsx` compõe as seções; navegação interna por IDs e rolagem nativa. Nenhum roteador customizado ou servidor de produção no projeto.

| Dependência direta instalada | Versão | Uso |
| --- | --- | --- |
| react / react-dom | 19.3.0 / 19.3.0 | Renderização client-side |
| @fontsource/barlow-condensed / @fontsource/dm-sans | 5.3.0 / 5.3.0 | Fontes locais |
| @axe-core/playwright | 4.13.0 | Testes de acessibilidade |
| @playwright/test | 1.63.0 | Testes de navegador |
| @eslint/js / eslint | 9.39.5 / 9.39.5 | Lint, somente desenvolvimento |
| @types/node | 22.20.4 | Tipos |
| @types/react / @types/react-dom | 19.3.0 / 19.3.0 | Tipos |
| @vitejs/plugin-react | 4.7.0 | Build e desenvolvimento |
| eslint-plugin-react-hooks | 5.2.0 | Lint |
| eslint-plugin-react-refresh | 0.4.26 | Lint |
| globals | 16.5.0 | Lint |
| sharp | 0.35.5 | Geração local de imagens |
| typescript | 5.8.3 | Compilação/verificação |
| typescript-eslint | 8.70.1 | Lint |
| vite | 6.4.3 | Bundler/servidores locais |

As demais dependências são de desenvolvimento. Todas as dependências diretas têm uso identificado. Inventário de **todas as entradas transitivas do lockfile** em `docs/inventario-dependencias.json`; faixas declaradas em `package.json`, resoluções exatas em `package-lock.json`. Nenhuma alteração de dependência foi necessária.

Configurações revisadas: `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `playwright.config.ts`, `.gitignore`, `.env.example`, `index.html`, scripts de imagens e README. Único arquivo de ambiente encontrado: `.env.example`, com `VITE_SITE_URL` vazio. Nenhum arquivo `.env.local` ou `.env.production` presente.

## 3. Achados

### SEC-01 — LOW — Ausência de configuração reproduzível de security headers

- **Arquivos/componentes:** configuração de publicação e `vite.config.ts`.
- **Risco anterior:** não havia CSP, proteção de framing, MIME sniffing ou política de permissões configurada pelo projeto. Um host poderia adicionar headers próprios, mas isso não era verificável localmente.
- **Exploração real:** sem login, ações sensíveis ou ponto de injeção conhecido, o impacto de clickjacking é limitado. Ausência de CSP não é, isoladamente, prova de XSS; faltava uma defesa adicional.
- **Correção:** `config/security-headers.json`, aplicado no preview e emitido como `dist/_headers` para Cloudflare Pages/Netlify. CSP sem `unsafe-inline`/`unsafe-eval`, `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy e Permissions-Policy. Nenhuma alteração do frontend.
- **Status:** corrigido e testado localmente; confirmar headers efetivos depois do deploy (SEC-04).

### SEC-02 — LOW — URL de metadados aceitava credenciais e HTTP em produção

- **Arquivo/componente:** `vite.config.ts`, plugin `site-metadata`.
- **Risco anterior:** uma configuração operacional incorreta de `VITE_SITE_URL` poderia incorporar userinfo, query/fragmento ou URL HTTP nos metadados públicos. Não havia segredo desse tipo no projeto.
- **Exploração real:** depende de quem configura o ambiente de build; visitantes não controlam essa variável. O valor já era processado por `new URL` e aspas eram escapadas; não foi demonstrado XSS remoto.
- **Correção:** rejeitar userinfo, query, fragmento e HTTP no modo production; manter ambiente vazio e URLs HTTP de desenvolvimento permitidos. Erros não imprimem o valor rejeitado nos casos validados.
- **Status:** corrigido. Metadados de URLs HTTPS válidas mantêm o comportamento anterior.

### SEC-03 — LOW — ESLint 9 fora de suporte

- **Arquivos:** `package.json` / `package-lock.json`; `eslint@9.39.5`, somente dev.
- **Risco:** ausência de manutenção futura dessa major. Zero CVEs reportados pelo audit nesta execução; não entra no bundle de produção.
- **Exploração real:** nenhuma demonstrada neste projeto. Risco de manutenção da cadeia de desenvolvimento, não uma falha de runtime do site.
- **Ação:** planejar migração para major suportada com revisão de plugins, configuração e versão de Node. Não foi aplicado upgrade major automático.
- **Status:** pendência de manutenção, não bloqueia por si só a publicação estática. [Suporte oficial ESLint](https://eslint.org/version-support/) informa EOL em 06/08/2026.

### SEC-04 — INFORMATIONAL — Infraestrutura de produção ainda não verificada

- **Componente:** domínio, TLS, painel/CDN e raiz de publicação.
- **Risco:** o código local não comprova HTTPS, headers efetivos, ausência de exposição da raiz do repositório, logs ou scripts injetados pelo host.
- **Ação:** roteiro em `docs/seguranca-producao.md`; publicar apenas `dist/`, validar HTTPS/redirect, MIME, headers e paths internos. HSTS somente após confirmar HTTPS do domínio final.
- **Status:** pendente antes da publicação pública. Não é uma vulnerabilidade comprovada da hospedagem.

### SEC-05 — INFORMATIONAL — Pacotes extras na instalação local

- **Componente:** `node_modules`; `npm ls --depth=0` marcou `@emnapi/runtime`, `@img/sharp-wasm32` e `tslib` como extraneous.
- **Risco:** divergência entre instalação local e lockfile. São componentes conhecidos relacionados ao ecossistema de processamento de imagem; nenhuma evidência de pacote malicioso. Não são importados pela aplicação e não entram no bundle.
- **Ação:** usar `npm ci` no ambiente limpo de build/CI. Nada foi apagado da instalação local, evitando afetar o processamento de imagens existente.
- **Status:** informativo; confirmar instalação reproduzível no CI.

## 4. Dependências e supply chain

Executados `npm audit --json`, `npm audit --omit=dev --json` e `npm ls --depth=0`. Ambos os audits retornaram exit code 0 e CRITICAL 0 / HIGH 0 / MODERATE 0 / LOW 0 / INFO 0. O npm contabilizou 264 dependências no inventário de audit, com 6 prod e 259 dev; categorias opcionais se sobrepõem e não devem ser somadas como pacotes exclusivos.

Todos os pacotes resolvidos do lockfile usam HTTPS no registry npm e possuem campo integrity. Os scripts de instalação declarados encontrados são de esbuild e fsevents. Não há dependência direta Git, URL arbitrária ou pacote direto sem uso identificado. Duplicações transitivas de versões não são automaticamente vulnerabilidades; nenhuma remoção/dedupe foi feita. Nenhuma suspeita concreta de supply-chain compromise foi encontrada, mas isso não equivale a revisar cada linha de todos os pacotes nem a certificar o registro.

Pacotes atualizados: **nenhum**. Análise manual futura: ESLint e plugins para migração compatível. Usar Node LTS com patches de segurança atuais na infraestrutura; o Node local usado nos testes foi 22.16.0 e a segurança do sistema operacional/instalação global não foi auditada.

## 5. Segredos, injeção e código

Busca textual recursiva por padrões de chaves privadas, tokens de provedores, JWTs, URLs com credenciais e atribuições de passwords/secrets, excluindo `node_modules` e `.git`, com inspeção do código/configurações e do build. Nenhum candidato detectado nos arquivos de aplicação, configuração e saída. Valores potencialmente sensíveis não foram impressos. Não houve investigação de histórico Git ou credenciais da conta da hospedagem.

`.gitignore` já cobre `.env`, `.env.*`, preservando `.env.example`, além de builds, logs, dependências e relatórios. Não precisou ser modificado. `VITE_*` é público por definição; não serve para esconder segredos.

Não há `dangerouslySetInnerHTML`, `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval`, `new Function` ou timers com string no código de aplicação. React mantém escaping de texto. Não há fluxo de query/hash para HTML ou construção arbitrária de URL externa. IDs de navegação são fixos. Uso de APIs equivalentes dentro do código do React não prova uma vulnerabilidade da aplicação; não há entrada não confiável encaminhada a elas.

WhatsApp usa `https://wa.me/5575991874944` e `encodeURIComponent` sobre a mensagem inteira; número comercial preservado. Dados de mensagem são constantes internas, sem parâmetros arbitrários vindos da URL. Maps também codifica a busca. Links externos `target="_blank"` incluem `noopener noreferrer` e HTTPS; links internos permanecem âncoras. Nenhuma submissão ou mensagem foi enviada aos serviços externos durante os testes.

## 6. Privacidade e recursos externos

Inspeção de código e rede em desktop/mobile: recursos carregados automaticamente são da própria origem (JS, CSS, imagens e fontes locais). Textura SVG `data:` não gera requisição externa. Não há fetch/API, analytics, pixels, CDN de scripts/fontes, vídeos externos, iframe, widgets ou mapas incorporados.

Não há formulário, cookies de aplicação, localStorage, sessionStorage, IndexedDB ou service worker no código. Testes confirmaram cookies e storage vazios após navegação normal. IP, User-Agent e outros metadados podem ser processados pela hospedagem/CDN; a retenção depende da configuração do provedor e não foi verificada.

Depois de um clique externo, o navegador passa a acessar WhatsApp/Meta (`wa.me` e eventuais redirects), Instagram, Google Maps ou GitHub. Esses serviços têm políticas próprias e podem usar cookies. O endereço Linktree permanece como dado constante sem link renderizado; não houve requisição automática a ele. Não afirmar que o site e sua infraestrutura “não coletam dados” de forma absoluta.

## 7. Publicação, arquivos e headers

`public/` contém somente fotografias/derivados, logos/favicon e licenças das fontes. Nenhum backup, ZIP, dump, arquivo de ambiente, symlink, relatório de desenvolvimento ou documento interno encontrado nessa pasta. `favicon.svg` legado não utilizado permanece por ser um asset legítimo, sem risco identificado.

`dist/` contém 57 arquivos: HTML, bundle JS/CSS, fontes, imagens, licenças e `_headers`. Nenhum master, fonte TS/TSX, configuração privada, backup ou sourcemap. `build.sourcemap: false` foi explicitado; o padrão anterior já não publicava maps. Não se encontrou localhost, 127.0.0.1, caminho pessoal absoluto, console.log/debug, debugger ou sourceMappingURL nos textos finais auditados. URLs HTTP restantes em SVG são namespaces; nas licenças são referências textuais, não recursos carregados. Não houve mixed content observado.

A CSP completa está em `config/security-headers.json`; a política não usa wildcard, scripts inline ou unsafe-eval. `connect-src 'self'` permite o preload local do Vite. Os headers foram testados no preview com o conteúdo real, inclusive o scroll. A regra de framing precisa ser entregue por HTTP e foi incluída no arquivo do host. Nenhum servidor Node será exposto em produção.

HSTS não ativado automaticamente, por não haver domínio HTTPS de produção verificado. Isso permanece uma etapa do deploy. Nenhum header de produção foi aplicado ao servidor HMR.

## 8. Revisão OWASP aplicável

Referência: [OWASP Top 10:2025](https://top10.owasp.org/2025/). “Verificado” significa revisão no escopo local, não certificação.

| Risco | Aplicabilidade / status | Evidência |
| --- | --- | --- |
| A01 Controle de acesso | Não aplicável a contas; aplicável à publicação, verificado local / pendente host | Sem contas ou dados privados; servir somente dist; probes de arquivos internos |
| A02 Configuração insegura | Aplicável; corrigido local / pendente deploy | Headers, CSP, validação da URL, HTTPS |
| A03 Supply chain | Aplicável; verificado, pendência LOW | Audit zero, lock com integrity; ESLint EOL |
| A04 Criptografia | Aplicável ao transporte; pendente host | Sem credenciais/armazenamento privado; TLS final ainda não testado |
| A05 Injeção | Aplicável; verificado | React escapando texto; sem sinks inseguros; teste de CSP bloqueando script inline |
| A06 Design inseguro | Aplicável; verificado no escopo | Sem ações privilegiadas, checkout ou backend; nenhum fluxo abusável identificado |
| A07 Autenticação | Não aplicável | Não existe autenticação |
| A08 Integridade de software/dados | Aplicável; verificado local / pendente CI | Dependências travadas, recursos locais, publicação confiável a configurar |
| A09 Logging/alertas | Aplicável ao host; pendente | Sem backend de aplicação; logs/alertas/retenção dependem do provedor |
| A10 Condições excepcionais | Aplicável; verificado local | Build/lint, validação fail-fast da configuração, sem API expondo stack; erros de infraestrutura pendentes |

## 9. Verificações e resultado

Build de produção e lint executados com sucesso. **27 testes passaram (2,2 minutos)** com os headers ativos. Seis cenários de configuração da URL pública também passaram (vazia/HTTPS válidas; HTTP, userinfo, query e fragmento rejeitados). A suíte funcional e de segurança inclui acessibilidade, desktop/mobile, movimento reduzido, Header, Hero, Nossa Academia, Estrutura, Modalidades, Planos, Horários, Contato, Footer, imagens, links oficiais, carrossel, swipe, smooth scroll e preservação da URL no botão Ver modalidades. Testes de segurança validam headers, ausência de requisições externas automáticas, storage/cookies, proteção de links e bloqueio de script inline injetado pelo próprio teste. Um erro inicial de importação JSON do teste foi corrigido para Node 22 antes da execução final.

O JS e o CSS gerados mantiveram os mesmos nomes/hash do build anterior (`index-Du4zXkOu.js`, `index-ChpZSpPI.css`), evidenciando que código de interface e estilos aprovados não foram alterados por esta auditoria. Configurações, documentação e testes são as mudanças desta tarefa.

Antes da publicação: confirmar as etapas SEC-04 na hospedagem escolhida e instalação limpa/Node atualizado no CI. Não há achado CRITICAL/HIGH/MEDIUM conhecido impedindo o build estático; há uma pendência LOW de manutenção de ESLint, sem exploração demonstrada, e validações de infraestrutura ainda obrigatórias. Não declarar segurança absoluta.
