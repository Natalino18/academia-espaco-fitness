# Academia Espaço Fitness

Website institucional desenvolvido para a **Academia Espaço Fitness**, localizada no BTN 2, em Paulo Afonso/BA.

O projeto apresenta a academia por meio de uma experiência visual moderna e responsiva, utilizando a identidade em preto e amarelo da marca para destacar estrutura, modalidades, planos, horários e canais de contato.

## Sobre o projeto

O objetivo foi criar uma presença digital moderna para a Academia Espaço Fitness, permitindo que visitantes encontrem rapidamente as principais informações da academia e entrem em contato diretamente pelo WhatsApp.

O site foi desenvolvido como uma aplicação totalmente estática, sem necessidade de login, cadastro, banco de dados ou backend.

### Principais recursos

- Design responsivo para desktop, tablet e mobile
- Identidade visual baseada na marca da academia
- Hero com composição fotográfica e animações
- Transições e efeitos durante o scroll
- Apresentação da estrutura da academia
- Galeria com fotografias reais
- Seção de modalidades
- Planos e valores
- Horários de funcionamento
- Localização integrada ao Google Maps
- Contato direto pelo WhatsApp
- Instagram e redes sociais
- Navegação suave entre seções
- Menu mobile acessível
- Suporte a `prefers-reduced-motion`
- Imagens responsivas e otimizadas
- SEO e Open Graph
- Headers de segurança para produção

## Tecnologias

O projeto foi desenvolvido utilizando:

- React 19
- TypeScript
- Vite
- CSS moderno
- Playwright
- Axe Core
- Sharp

As animações utilizam recursos nativos do navegador, incluindo:

- `requestAnimationFrame`
- `IntersectionObserver`
- CSS Transforms
- CSS Custom Properties

As fontes **Barlow Condensed** e **DM Sans** são hospedadas localmente.

## Estrutura

```text
src/
├── components/      # Componentes compartilhados
├── sections/        # Seções principais do site
├── hooks/           # Scroll, animações e parallax
├── data/            # Informações da academia
├── styles/          # Estilos e responsividade
└── utils/           # Utilitários e links

public/
└── images/
    ├── academia/    # Fotografias da academia
    ├── brand/       # Identidade visual
    ├── hero/        # Imagens do Hero
    └── modalidades/ # Imagens das modalidades

scripts/             # Processamento de imagens
tests/               # Testes automatizados
docs/                # Documentação
```

## Executando localmente

### Requisitos

- Node.js 22+
- npm

Clone o projeto:

```bash
git clone URL_DO_REPOSITORIO
cd NOME_DO_REPOSITORIO
```

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

## Build

Para gerar a versão de produção:

```bash
npm run build
```

O resultado será criado em:

```text
dist/
```

Para visualizar o build localmente:

```bash
npm run preview
```

## Testes

Verificação estática:

```bash
npm run lint
```

Testes automatizados:

```bash
npm run build
npm test
```

A suíte verifica, entre outros pontos:

- responsividade
- navegação
- links
- dados comerciais
- menu mobile
- acessibilidade
- animações
- smooth scroll
- ausência de overflow
- erros JavaScript
- comportamento com movimento reduzido

## Responsividade

A interface foi desenvolvida para diferentes tamanhos de tela, incluindo smartphones, tablets, notebooks e monitores desktop.

Entre as resoluções verificadas estão:

`320px`, `360px`, `375px`, `390px`, `430px`, `768px`, `1024px`, `1280px`, `1440px` e `1920px`.

## Acessibilidade

O projeto utiliza:

- HTML semântico
- hierarquia adequada de títulos
- textos alternativos
- navegação por teclado
- foco visível
- skip link
- controles nativos
- nomes acessíveis
- suporte a `prefers-reduced-motion`

Também são realizadas verificações automatizadas com **axe-core**.

## Performance

As imagens são processadas e servidas em tamanhos apropriados para diferentes dispositivos.

O projeto utiliza:

- carregamento tardio de imagens
- `srcset`
- dimensões intrínsecas
- fontes locais
- assets otimizados
- animações baseadas em transformações
- controle de frames com `requestAnimationFrame`

O objetivo é manter a experiência visual sem comprometer a fluidez da navegação.

## Segurança

O site é institucional e não possui:

- login
- cadastro
- pagamentos
- banco de dados
- área administrativa pública
- armazenamento de credenciais

A configuração de produção inclui medidas como:

- Content Security Policy (CSP)
- proteção contra clickjacking
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- HTTPS na hospedagem
- proteção de links externos
- ausência de secrets no frontend

A publicação deve utilizar somente o conteúdo gerado em `dist/`.

## SEO

O projeto possui suporte para:

- `title`
- meta description
- canonical
- Open Graph
- Twitter Cards
- favicon
- idioma `pt-BR`
- imagem de compartilhamento

A URL pública pode ser configurada através de:

```env
VITE_SITE_URL=
```

Nenhuma credencial deve ser armazenada nessa variável.

## Dados da academia

As informações são centralizadas em arquivos específicos:

```text
src/data/store.ts
src/data/plans.ts
src/data/modalities.ts
src/data/schedule.ts
```

Isso permite atualizar planos, horários, modalidades e informações institucionais sem alterar os componentes visuais.

## Publicação

O projeto gera uma aplicação estática e pode ser publicado em serviços como **Cloudflare Pages**.

```bash
npm run build
```

Publique somente:

```text
dist/
```

## Autor

**Natalino Varela Correia**

Desenvolvimento e implementação do website da Academia Espaço Fitness.

## Aviso

Este projeto foi desenvolvido para a **Academia Espaço Fitness**.

Fotografias, logotipos, identidade visual e demais materiais pertencem aos seus respectivos proprietários e são utilizados de acordo com suas respectivas autorizações ou licenças.