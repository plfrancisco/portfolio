# pedro-dev

Portfólio pessoal interativo de Pedro Lucas — site de página única para
apresentar quem ele é, suas competências e seus projetos. Projeto contínuo,
para evoluir ao longo do tempo.

Organizado com abordagem *spec-driven development*: a documentação de
especificação vive em [`.context/`](.context/) e orienta o que será implementado.

## Estrutura

    .context/
    ├── plan/                          ← especificações e planejamento
    │   ├── README.md                  ← índice com ordem de leitura
    │   └── foundation/                ← visão geral, identidade visual e diretrizes
    │       └── project_overview.md
    ├── rules/
    │   └── ai_development_rules.md    ← regras de desenvolvimento com IA
    └── task/
        ├── README.md                  ← índice de tasks (ativas e históricas)
        └── completed/                 ← tasks concluídas

O código-fonte (React + Vite + Tailwind CSS + Framer Motion) será adicionado
posteriormente, guiado pelo conteúdo dessas especificações.

## Referência

`https://ariane-dev.vercel.app` — usado apenas como referência de estrutura e
estilo, não como especificação.
