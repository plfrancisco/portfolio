# Logos das tecnologias — rede de competências

SVGs baixados do [Simple Icons](https://simpleicons.org/) (formas dos ícones
são CC0; as marcas em si pertencem a cada empresa — uso comum e aceito em
portfólio pessoal pra listar stack, mesmo padrão que `ariane-dev.vercel.app`
usa). Baixados via CDN (`cdn.simpleicons.org` e, quando o slug não existia
lá, `cdn.jsdelivr.net/npm/simple-icons`).

## Mapa arquivo → tech (usar em `data/content.js` → `skillsLayers`)

| Arquivo | Tech | Camada |
|---|---|---|
| `python.svg` | Python | linguagens |
| `javascript.svg` | JavaScript | linguagens |
| `typescript.svg` | TypeScript | linguagens |
| — (sem logo) | SQL | linguagens — não existe marca genérica de "SQL"; manter como nó de texto |
| `fastapi.svg` | FastAPI | frameworks e libs |
| `react.svg` | React | frameworks e libs |
| `nodedotjs.svg` | Node.js | frameworks e libs |
| `pandas.svg` | Pandas | frameworks e libs |
| `numpy.svg` | NumPy | frameworks e libs |
| `langchain.svg` | LangChain | frameworks e libs |
| `langgraph.svg` | LangGraph | frameworks e libs |
| `git.svg` | Git | ferramentas |
| `github.svg` | GitHub | ferramentas |
| `anthropic.svg` | Claude Code | ferramentas — **não existe logo oficial "Claude Code"** no Simple Icons; usando o logo da Anthropic como aproximação. Se ficar estranho, manter como nó de texto (já era a decisão original em `content_source.md`). |
| `vscode.svg` | VS Code | ferramentas |
| `docker.svg` | Docker | ferramentas |
| `postgresql.svg` | PostgreSQL | ferramentas |
| `googlecolab.svg` | Google Colab | ferramentas |

## Observação técnica

- Alguns SVGs (`vscode.svg`) não têm `fill` fixo — dá pra recolorir via CSS
  (`fill: currentColor` no `<svg>`/`<path>` se inlined no DOM). Os outros
  vêm com a cor de marca original no atributo `fill` — se quiser todos no
  mesmo tom (dourado/monocromático, combinando com a paleta do site), inline
  o SVG no DOM e sobrescreva `fill` via CSS, ou baixe de novo removendo o
  atributo `fill` de cada arquivo.
- Se preferir todos com a cor de marca original (mais "realista", como o
  grafo de referência que o Pedro mandou print), pode deixar como está.
