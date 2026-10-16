# Benefícios corporativos

A seção `#beneficios` fica entre Planos e Horários. Os dados e os dois destinos estão em `src/data/benefits.ts`.

- `TOTALPASS_URL`: https://totalpass.com/br/academias/ba/ — catálogo oficial da Bahia, temporário. Nenhuma página individual da unidade de Paulo Afonso foi presumida. Quando confirmada pelo proprietário, alterar apenas esta constante.
- `WELLHUB_URL`: https://wellhub.com/pt-br/search/partners/espaco-fitness-tancredo-neves-ii-paulo-afonso/ — página fornecida pelo proprietário; conferida com título “Espaço Fitness - Tancredo Neves II” e localização Paulo Afonso.

## Origem dos assets

Os SVGs são locais, sem scripts ou carregamentos de terceiros, preservando os desenhos e as cores oficiais:

- `public/images/benefits/totalpass.svg`: https://totalpass.com/_next/static/media/totalpass-desktop-white.2k_25de0stjnx.svg — asset referenciado no catálogo oficial da Bahia.
- `public/images/benefits/wellhub.svg`: SVG original do cabeçalho da página oficial Wellhub acima, extraído sem alterações.

Nenhum asset foi obtido de outro projeto. Tamanho combinado: 10.929 bytes.

## Verificação

`tests/benefits.spec.ts` verifica as sete larguras solicitadas (320, 375, 390, 430, 768, 1024 e 1440), igualdade dos cards, empilhamento, ausência de overflow, carregamento dos logos, abertura dos CTAs em nova aba com destinos interceptados, isolamento de opener, console, teclado e redução de movimento. A interceptação evita depender dos sites externos durante os testes; o conteúdo do destino Wellhub foi conferido separadamente no site oficial.

Resultado local: ESLint sem erros; TypeScript + Vite build aprovados; Playwright com 35 testes aprovados (incluindo 8 novos). As verificações foram executadas diretamente pelos CLIs existentes em `node_modules`, com Node 22.22 disponível em `/private/tmp`, pois `npm` não está disponível no PATH deste ambiente. Revisão visual da seção em 390, 768 e 1440px e capturas da página inteira geradas pela suíte existente. Nenhum commit, push ou deploy realizado.

## Evolução visual

A direção de arte da seção foi refinada em `src/sections/Benefits.tsx` e `src/styles/benefits.css`. O fundo reutiliza a fotografia real `public/images/academia/academia-04.webp` (origem registrada em `src/data/images.json`: `imagens /imagen 4.jpeg`), com a variante responsiva de 640px já existente e carregamento lazy pelo componente `Photo`. Não foram adicionadas imagens, dependências ou fontes externas. No celular, a fotografia fica mais discreta sob os gradientes; desktop e tablet deixam os equipamentos visíveis à direita.

Cards com superfícies em gradiente, sombra, detalhes verdes/rosa e raios discretos de 4px; CTAs e destinos preservados. A faixa inferior usa quatro SVGs decorativos locais, acompanhados de texto real, em quatro colunas no desktop/tablet e 2×2 no celular. As animações continuam usando `data-reveal` e o observador existente. Hover e deslocamentos são desativados com redução de movimento. Os testes existentes não foram alterados.

Validação após o refinamento visual: 35/35 testes existentes aprovados (2,4 minutos), lint e build aprovados, sem alterações em `tests/benefits.spec.ts`. Capturas revisadas em 320, 390, 768 e 1440px; suíte verificou todas as sete larguras solicitadas. Nenhum commit, push ou deploy realizado.
