# Refinamento visual — Academia Espaço Fitness

## Marca oficial

O header e o componente compartilhado de marca usam `public/images/brand/logo-oficial-192.png`, com variantes originais de 64 e 128 px em `srcset`. O favicon utiliza a versão de 64 px. Os três PNGs foram copiados sem modificação do projeto anterior, cujo caminho relativo era:

`img/optimized/espcfit-{64,128,192}.png`

Foi reaproveitado somente o asset visual, sem código do projeto anterior. Não foi encontrado SVG oficial nem master maior. A versão de 192 px cobre a apresentação de 46–52 CSS px, inclusive em telas 3×. Não foi ampliada para servir como marca de fundo.

## Fotografias externas e licenças

Masters baixados em 27/09/2026 e preservados em `assets/masters/`, fora do build público. Os arquivos de produção ficam hospedados junto ao site; não há hotlink nem fotografia gerada. Os recortes e a conversão são reproduzíveis com `node scripts/refine-images.mjs`.

| Uso | Fotografia / autoria / página de origem | Licença | Master |
| --- | --- | --- | --- |
| Hero | [Scott Webb — 5IsdIqwwNP4](https://unsplash.com/photos/woman-wearing-black-sports-bra-facing-front-selective-focus-photography-5IsdIqwwNP4) | [Unsplash License](https://unsplash.com/license) | `hero-athlete.jpg`, 3908 × 2595 |
| Musculação | [Andrea Piacquadio — 3931370](https://www.pexels.com/photo/slim-young-female-athlete-exercising-with-dumbbell-in-modern-gym-3931370/) | [Pexels License](https://www.pexels.com/license/) | `musculacao.jpg`, 5760 × 3840 |
| Step | [Gustavo Fring — 6285206](https://www.pexels.com/photo/a-person-doing-exercise-6285206/) | [Pexels License](https://www.pexels.com/license/) | `step.jpg`, 3840 × 5760 |
| Jump | [Memento Media — scc_usjFFNE](https://unsplash.com/photos/people-sitting-on-black-metal-chairs-on-brown-rocky-mountain-during-daytime-scc_usjFFNE) | [Unsplash License](https://unsplash.com/license) | `jump.jpg`, 4946 × 2801 |
| RitBox | [KoolShooters — 9945074](https://www.pexels.com/photo/woman-training-with-a-punching-bag-9945074/) | [Pexels License](https://www.pexels.com/license/) | `ritbox.jpg`, 6720 × 4480 |
| Funcional | [Anastasia Shuraeva — 4944008](https://www.pexels.com/photo/woman-exercising-with-battle-ropes-4944008/) | [Pexels License](https://www.pexels.com/license/) | `funcional.jpg`, 3968 × 5952 |
| Dança | [MART PRODUCTION — 7894448](https://www.pexels.com/photo/women-in-black-sports-bra-and-black-leggings-7894448/) | [Pexels License](https://www.pexels.com/license/) | `danca.jpg`, 5856 × 3904 |

As duas licenças permitem uso comercial e adaptação das fotografias, observadas suas condições. As imagens são apresentadas como ilustrativas, sem afirmar que os modelos, fotógrafos ou ambientes pertencem à academia ou a endossam. Os créditos permanecem documentados mesmo sem exigência de atribuição nessas licenças.

O master da atleta da referência não foi localizado nos assets dos dois projetos. O Hero utiliza provisoriamente um novo asset licenciado com mulher de costas, roupa preta, fundo de academia e espaço negativo à esquerda. Não é a mesma pessoa da referência e não foi extraída da screenshot.

Conferência das modalidades: Musculação mostra halteres em exercício; Step mostra aluna sobre plataforma; Jump mostra uma aula ao ar livre com mini trampolins e salto; RitBox usa treino individual de boxe fitness, sem competição; Funcional mostra cordas navais; Dança mostra grupo em movimento sincronizado no estúdio. O título automático da página Unsplash de Jump menciona “chairs”, mas a fotografia foi inspecionada visualmente e mostra mini trampolins fitness.

### Arquivos novos de produção

Em `public/images/modalidades/`:

- `musculacao.webp` e `musculacao-480.webp`
- `step.webp` e `step-480.webp`
- `jump.webp` e `jump-480.webp`
- `ritbox.webp` e `ritbox-480.webp`
- `funcional.webp` e `funcional-480.webp`
- `danca.webp` e `danca-480.webp`

As versões principais têm 960 × 1440 px; as menores, 480 × 720 px. WebP com qualidade 86, sem upscale. As versões menores pesam aproximadamente 18–119 KiB; as maiores, 64–408 KiB. Jump preserva mais detalhes do piso e é o arquivo maior.

Em `public/images/hero/`: `hero-athlete.webp` (2400 px), `hero-athlete-1600.webp`, `hero-athlete-960.webp`, `hero-athlete-mobile-1080.webp` e `hero-athlete-mobile-540.webp`. O maior pesa aproximadamente 198 KiB, e os recortes mobile pesam 110/26 KiB. `picture`, `srcset`, `sizes`, dimensões intrínsecas e preload condicionado à viewport evitam carregar os dois enquadramentos iniciais. As modalidades usam lazy loading. Nenhuma biblioteca de animação foi acrescentada.

## As seis fotografias reais continuam no site

| Foto | Uso após o refinamento |
| --- | --- |
| 01 — `academia-01.webp` | Imagem principal da galeria |
| 02 — `academia-02.webp` | Esteiras / cardio na galeria |
| 03 — `academia-03.webp` | Painel real na transição do Hero; imagem de compartilhamento derivada existente |
| 04 — `academia-04.webp` | Detalhe da estrutura na galeria |
| 05 — `academia-05.webp` | Nossa Academia e CTA final |
| 06 — `academia-06.webp` | Painel superior da galeria e fundo dos horários |

Os originais institucionais permanecem na pasta `imagens `, sem alterações. Essas fotografias não representam mais aulas nos cards.

## Composição e movimento

O Hero mantém a headline, os CTAs e as informações comerciais. No desktop, conteúdo à esquerda e atleta à direita; no mobile, a fotografia ocupa a parte superior e o texto aparece abaixo, sem cobrir rosto/corpo com a headline.

O painel sticky usa o mesmo progresso de scroll. Interpolações `smoothstep` controlam a saída do texto, redução/deslocamento do painel, bordas, crossfade da atleta para a foto real 03 e entrada do título institucional. A foto real aparece dentro do mesmo painel, sem corte seco. O movimento usa um único agendamento `requestAnimationFrame` e variáveis CSS, sem estado React por pixel.

O amarelo principal continua `#FFE000`. Fotografias reais ampliadas fornecem equipamentos, sombras e perspectiva ao fundo: foto 04 na transição, foto 06 em Nossa Academia e foto 02 no manifesto da galeria. Grayscale, contraste, brilho e mistura multiply convertem a fotografia em amarelo/preto; máscaras graduais protegem a tipografia. Ruído SVG muito fino e marcações editoriais completam a composição. Os arcos decorativos foram removidos. O fundo da transição acompanha o progresso existente com deslocamento máximo de 12 px, sem novo listener. O painel tem sombra discreta. A imagem institucional aparece antes do texto no mobile.

Os cards mantêm número, nome, descrição, seta e link WhatsApp. Receberam recortes individuais, tratamento comum de contraste/saturação/temperatura e gradiente inferior. O carrossel mantém touch nativo, scroll snap, botões, foco visível e suporta setas, Home e End. `prefers-reduced-motion` remove a sequência longa, o zoom e o parallax.

## Escopo preservado

Planos, preços, horários, endereço, contatos e nomes/descrições das modalidades foram preservados. O footer recebeu a remoção do letreiro gigante e o crédito de autoria solicitado, mantendo os contatos, horários e navegação. SEO e configuração de publicação permanecem iguais, exceto a troca necessária do favicon e do preload da fotografia inicial em `index.html`.

Não foram executados comandos Git, commit ou push. Não foram adicionadas credenciais.

## Validação

Resultados finais registrados após a revisão de desktop/mobile e testes automatizados. O teste de performance é uma medição local, sem simulação de rede móvel ou auditoria Lighthouse de produção.

- `npm run build`: aprovado; JavaScript de produção ~77,3 kB gzip e CSS ~9,0 kB gzip.
- `npm run lint`: aprovado.
- Suíte existente: 17 testes aprovados, incluindo axe-core em desktop/mobile, dez larguras de 320 a 1920 px, dados, menu, links, imagens, overflow, console e reduced-motion.
- Testes adicionais: 3 aprovados, cobrindo crossfade intermediário/final, seis imagens locais, setas/Home/End, swipe real por eventos de toque, ordem da seção institucional e carregamento responsivo.
- Revisão visual das capturas: Hero, transição, Nossa Academia e modalidades em desktop/mobile; conferência dos seis cards.
- Medição local em 390 × 844: CLS 0,0031; LCP 240 ms. Um único arquivo de Hero solicitado, recorte mobile de 540 px (~26 KiB), sem requisições a origens externas. Estes números não representam desempenho em rede móvel de produção.
- Comparação SHA-256: dados de planos/horários/contato, componentes comerciais, footer e configuração SEO inalterados. Os três PNGs oficiais são idênticos aos arquivos de origem.

Não há pendência funcional identificada. Limitações dos assets: logo disponível em PNG de até 192 px (adequado ao tamanho utilizado); fotografia original da atleta da referência não localizada, substituída pelo novo asset licenciado descrito acima. A imagem ilustrativa de Jump mostra uma aula externa, não as instalações da Espaço Fitness.

## Ajuste das superfícies amarelas

Tratamento fotográfico aplicado somente aos backgrounds editoriais via `src/styles/refinement.css`. Fotos principais, estrutura, textos e dados preservados. Comparação lado a lado com o quadro 02 da referência e revisão desktop/mobile concluídas. Build e lint aprovados; cinco testes selecionados aprovados (acessibilidade desktop/mobile, transição/carrossel, reduced-motion e capturas de revisão).

## Painéis pretos, transição curta e autoria

A distância útil de scroll foi reduzida de 80 para 42 svh no desktop (47,5%) e de 65 para 36 svh no mobile (44,6%). Em uma viewport desktop de 1000 px são 420 px de percurso, em vez de 800 px. A interpolação do painel começa em progresso zero e usa ease-out quadrático, sem atraso inicial. O crossfade acontece entre 12% e 52%; o painel textual aparece entre 26% e 66%; descrição/CTA entram entre 48% e 83%. O CTA oculto permanece `inert` até completar sua entrada. O modo reduced-motion mantém o Hero estático e o painel institucional final acessível na seção seguinte.

A transição e Nossa Academia agora usam painéis #080A09, título branco/amarelo, descrição off-white e CTA amarelo. A fotografia real continua à esquerda no desktop e acima do painel no mobile. O background fotográfico amarelo teve intensidade reduzida para valorizar os painéis. Hero, logo e imagens das modalidades foram preservados.

`src/components/Footer.tsx`: removido o elemento `.footer-word`, inclusive suas regras CSS exclusivas. Inserido o crédito “Desenvolvido por Natalino Varela Correia” com link para https://github.com/Natalino18, `target="_blank"` e `rel="noopener noreferrer"`. Conteúdo útil preservado; colunas empilhadas e links com área de toque ampliada no mobile.

A atleta permanece uma alternativa provisória licenciada, conforme o pedido mais recente, até que o master exato da referência seja disponibilizado. Não há master exato nos assets anteriormente inspecionados.

Validação deste ajuste: build e lint aprovados; 21 testes da suíte passaram antes do último ajuste de contraste do Hero em tablet. Depois dele, passaram as verificações de acessibilidade em 768 px, integridade/overflow em 768 px e transição/autoria. Capturas desktop, tablet e mobile revisadas, incluindo painel preto e footer. O perfil GitHub respondeu HTTP 200 em consulta pública; a ativação do crédito também foi testada em nova aba. Não foram executados comandos Git, commit ou push.

## Fundo da seção Planos

- Fotografia: **Gym equipment inside room**, Risen Wang / Unsplash.
- Página: https://unsplash.com/photos/gym-equipment-inside-room-20jX9b35r_M
- Licença: https://unsplash.com/license (uso comercial e edição permitidos; consultada em 28/09/2026).
- Download em resolução nativa: https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=100&fm=jpg
- Original local: `assets/masters/planos-academia.jpg`, **3836 × 2874 px**.
- WebP locais: `public/images/planos/academia-{1920,2560,3836}.webp`; Sharp, qualidade 90, effort 6, sem ampliação e sem blur.
- Desktop: `srcset` até 3836 px para alta densidade. Mobile: original WebP completo para manter resolução vertical no fundo da seção mais alta.
- Uso decorativo; overlay preto de 72% a 82%, sem alterar cards ou conteúdo.

## Fotografia final dos Planos — comparação e substituição

Escolhida: Max Vakhtbovych, Pexels 7031705.
Fonte: https://www.pexels.com/photo/interior-of-modern-fitness-club-with-various-machines-and-equipment-7031705/
Licença: https://www.pexels.com/license/ (uso gratuito e edição permitidos).
Original JPEG: `assets/masters/planos-premium.jpg`, 7342 × 4900 px, baixado sem parâmetros de redução de https://images.pexels.com/photos/7031705/pexels-photo-7031705.jpeg.

Comparação: fotos reais locais (900–914 px de largura) insuficientes para fundo Retina; masters de modalidades têm foco em pessoas/aulas; fundo anterior de Risen Wang (3836 × 2874) tem menor resolução e sombras mais fechadas. Pexels 29149073 (7008 × 4672) tem parede vazia e composição estreita; 28978375 (3024 × 4032) é vertical, com escada e detalhes vermelhos dominantes. A escolhida oferece maior resolução, equipamentos definidos, profundidade, luz natural e tons quentes/neutros. Detalhes inspecionados em recorte nativo, sem upscale.

Finais WebP qualidade 92, effort 6, sem ampliação/blur: `public/images/planos/premium-{1920,3840,5120,6400}.webp`. Maior: 6400 × 4271 px. Mobile usa 5120 px para preservar definição vertical. `object-fit: cover`, posição 42% 58% desktop e 22% 50% mobile. Overlay, conteúdo e botões preservados.

## Correção de destino da fotografia premium

A fotografia Pexels 7031705, Max Vakhtbovych (JPEG nativo 7342 × 4900), pertence exclusivamente ao CTA **DISCIPLINA HOJE. RESULTADOS SEMPRE.**. A comparação registrada acima permanece válida; a aplicação em Planos foi corrigida.

- Original movido para `assets/masters/cta-academia-premium.jpg`.
- WebP movidos para `public/images/cta/academia-premium-{1920,3840,5120,6400}.webp`, qualidade 92, sem upscale.
- CTA: `object-fit: cover`, posição 50% 60% desktop / 18% 50% mobile; picture responsivo, overlay e parallax existentes preservados.
- Planos restaurado aos arquivos `public/images/planos/academia-{1920,2560,3836}.webp` de Risen Wang e `object-position: center`, com source mobile 3836 px e dimensões originais 3836 × 2874.
- Fonte da imagem do CTA: https://www.pexels.com/photo/interior-of-modern-fitness-club-with-various-machines-and-equipment-7031705/
- Licença: https://www.pexels.com/license/

## Autorização de publicação

O responsável pelo projeto confirmou autorização para utilização e publicação de todas as imagens, fotografias da academia e identidade visual presentes no site. Os derivados necessários em `public/` podem integrar o repositório público. Masters, referências e originais separados permanecem locais e ignorados pelo Git. As fontes e licenças documentadas acima são preservadas.
