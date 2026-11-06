# Portfólio · Felipe Maximiano

Portfólio pessoal de **Flavio Felipe Maximiano da Silva**, desenvolvedor full stack e analista de sistemas.

A página abre como uma tela de editor de design: as partes do site são montadas, e logo depois um cursor
com meu nome arruma o que ficou fora do lugar, troca uma cor, digita o texto de apresentação e publica as
alterações. Conforme você rola, outros ajustes acontecem nas seções.

**Stack:** React 18 · TypeScript (strict) · Vite · CSS puro com tokens · ESLint · Prettier · GitHub Actions

## Como rodar

Requisitos: Node.js 18.18 ou superior.

```bash
npm install       # instala as dependências e gera o package-lock.json
npm run dev       # servidor local em http://localhost:5173
npm run build     # checa os tipos e gera a versão final em dist/
npm run preview   # serve o build localmente para conferir
```

Outros scripts: `npm run lint`, `npm run typecheck`, `npm run format`.

## Estrutura

```
.
├── .github/workflows/deploy.yml   # CI: lint + tipos + build + deploy no GitHub Pages
├── public/
│   ├── favicon.svg
│   └── images/                    # fotos (servidas como estão)
├── src/
│   ├── main.tsx                   # ponto de entrada
│   ├── App.tsx                    # composição da página e da sessão de edição
│   ├── content/                   # TODO o texto do site, tipado e em PT/EN
│   │   ├── types.ts
│   │   ├── profile.ts
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   ├── skills.ts
│   │   └── ui.ts                  # textos fixos da interface
│   ├── i18n/                      # contexto de idioma (PT/EN) com persistência
│   ├── hooks/                     # useReveal, useCountUp, useTypewriterLoop...
│   ├── lib/                       # lógica sem dependência de React
│   │   ├── editor-session/        # motor da animação "editor de design"
│   │   │   ├── session.ts         # roteiro: quais ajustes, em que ordem
│   │   │   ├── overlay.ts         # cursor, seleção, guias e painel de cor
│   │   │   ├── timing.ts          # tween, espera e cancelamento
│   │   │   ├── geometry.ts        # posições e deslocamentos
│   │   │   ├── state.ts           # estado compartilhado com o React
│   │   │   └── store.ts           # store mínima (useSyncExternalStore)
│   │   └── effects/               # meio-tom da foto e rastro do cursor (canvas)
│   ├── components/
│   │   ├── layout/                # Navbar, Footer
│   │   ├── intro/                 # abertura: caixas que pousam nos elementos reais
│   │   ├── editor/                # barra de ferramentas, texto digitável, rastro
│   │   ├── hero/                  # topo: título, foto, inspetor, números
│   │   ├── sections/              # Sobre, Projetos, Stack, Contato
│   │   └── ui/                    # peças reutilizáveis (títulos, ícones, revelar)
│   └── styles/                    # tokens, base e camada do editor
├── index.html
├── vite.config.ts
├── tsconfig*.json
└── eslint.config.js
```

Cada componente fica ao lado do seu CSS (`Hero.tsx` + `Hero.css`).

## Decisões

- **Conteúdo separado da interface.** Projetos, experiência e habilidades ficam em `src/content/` como dados
  tipados. Para adicionar um projeto basta incluir um objeto em `projects.ts`; o card, a contagem de
  "projetos no ar" e a tradução vêm daí.
- **Tradução garantida pelo tipo.** `ui.ts` define os textos em português e o inglês é obrigado a ter as
  mesmas chaves. Faltou uma tradução, o TypeScript acusa.
- **Animação desacoplada do React.** O motor em `lib/editor-session/` só lê o DOM por atributos
  (`data-edit`, `data-offset`, `data-edit-section`) e conversa com os componentes por uma store compatível
  com `useSyncExternalStore`. Os componentes continuam simples e a animação pode ser trocada sem mexer neles.
- **Abertura sem cortina.** Cada peça do topo é marcada com `data-intro`. A abertura mede a posição real
  de cada uma (inclusive rotação e escala de quando está fora do lugar), faz a caixa de seleção pousar em
  cima dela e só então revela a peça dentro da caixa. Nada aparece pronto e depois pisca.
- **Sem pulo de layout.** O texto "digitado" já ocupa seu espaço desde o início; os deslocamentos usam as
  propriedades CSS `translate`, `rotate` e `scale`, que não brigam com outras transições.
- **Acessibilidade.** Respeita `prefers-reduced-motion` (sem abertura, sem cursor, tudo no lugar), foco
  visível, texto completo para leitores de tela durante a digitação, contraste alto.
- **Sem dependências de animação.** Tween, molas e canvas escritos à mão; o bundle carrega só React.

## Deploy

O workflow em `.github/workflows/deploy.yml` publica no GitHub Pages a cada push na `main`:

1. Rode `npm install` uma vez e faça commit do `package-lock.json` (o CI usa `npm ci`).
2. No repositório: **Settings → Pages → Source: GitHub Actions**.

Como o build usa caminhos relativos (`base: './'`), a pasta `dist/` também funciona na Vercel, no
Cloudflare Pages ou em qualquer hospedagem estática.

## Contato

- E-mail: flaviofelipemaximiano@gmail.com
- LinkedIn: [linkedin.com/in/felps-maximiano](https://www.linkedin.com/in/felps-maximiano/)
- GitHub: [github.com/felpsmaximiano](https://github.com/felpsmaximiano)
