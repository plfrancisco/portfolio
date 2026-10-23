# Pedro Lucas Francisco — Portfólio

Portfólio pessoal interativo, pensado como uma navegação por uma rede neural:
o fundo é um céu de nós em movimento e cada seção é parte dessa rede.

## O que tem no site

- **Síntegra Twin** — gêmeo digital de previsão de demanda que se narra
  sozinho: três agentes (Scout, Keeper e Director) processam eventos em
  tempo real e a previsão reage a cenários injetados.
- **Projetos** — soluções em dados, IoT e visão computacional.
- **Rede de competências** — grafo interativo com as tecnologias que uso;
  passar o mouse acende as conexões e clicar filtra os projetos relacionados.
- **Trajetória** — experiência e formação, alternáveis por abas.
- **Contato** — links e cópia rápida do e-mail.
- **PT/EN** — troca de idioma sem recarregar a página.

## Stack

HTML, CSS e JavaScript puros (ES modules), sem framework e sem etapa de
build. Todas as animações são feitas em `<canvas>` à mão, e o site respeita
`prefers-reduced-motion`.

## Como rodar

Qualquer servidor estático serve. Por exemplo:

```bash
python -m http.server 8000
```

Depois é só abrir `http://localhost:8000`.

## Estrutura

```
index.html
css/      estilos por seção
js/       módulos (rede, Síntegra Twin, competências, i18n, ...)
data/     conteúdo e dicionários PT/EN
public/   imagens e logos das tecnologias
```

## Créditos

Logos das tecnologias do [Simple Icons](https://simpleicons.org/); as marcas
pertencem aos respectivos donos.
