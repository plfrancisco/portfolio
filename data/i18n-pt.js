export const pt = {
  nav: {
    hero: 'Início',
    syntegra: 'Síntegra Twin',
    projects: 'Projetos',
    skills: 'Competências',
    timeline: 'Trajetória',
    contact: 'Contato',
    menu: 'Navegação'
  },
  hero: {
    greeting: 'Olá, eu sou',
    title: 'Pedro Lucas Francisco',
    nameFirst: 'Pedro',
    nameLast: 'Lucas',
    subtitle: 'Desenvolvedor de software · IA & dados',
    bio: 'Estudante de Tecnologia em Sistemas Inteligentes na FATEC Pompeia. Estagiário no Laboratório de Solos da Fundação Shunji Nishimura e participante do Inova Skill 2026, onde atuei como desenvolvedor do Síntegra Twin pela Síntegra, empresa do Grupo Jacto.',
    ctaSyntegra: 'Ver o Síntegra Twin →',
    ctaResume: 'Currículo ↓',
    badgeLabel: 'Síntegra Twin · Inova Skill 2026',
    imageAlt: 'Ilustração 3D de Pedro Lucas acenando, iluminada por um brilho dourado'
  },
  syntegra: {
    badge: 'Destaque · nº 00',
    title: 'Síntegra Twin',
    description: 'Uma pipeline multiagente para previsão de demanda. Scout organiza dados públicos de mercado e Keeper consolida vendas, estoque e produção. O modelo GBM gera as previsões e Director explica os resultados para apoiar o planejamento.',
    roleTag: 'meu papel: desenvolvimento e arquitetura do sistema',
    context: 'Desenvolvido no programa Inova Skill 2026, com atuação pela Síntegra, empresa do Grupo Jacto, em parceria com CITAP, Mentto e Bluesfield Aceleradora.',
    captions: [
      'Um pedido de previsão entra na pipeline.',
      'Scout organiza séries de procedimentos hospitalares do SUS.',
      'Keeper consolida o histórico de vendas, estoque e produção.',
      'Director explica as previsões já calculadas, sem alterar os números.'
    ],
    scenarioCaption: 'Cenário: {name} — acompanhe a previsão reagir.',
    exploring: 'explorando: {name}',
    resumeNarration: '▶ voltar à narração',
    hud: { events: 'eventos', context: 'contexto' },
    speedLabel: 'veloc.',
    playLabel: 'tocar',
    pauseLabel: 'pausar',
    panelIdleTitle: 'O que está acontecendo agora',
    panelIdleBody: 'Um pedido de previsão atravessa Scout → Keeper → Director sozinho, e a cada ~9s um cenário real é injetado pra você ver a previsão reagir.',
    liveTag: 'pipeline · 3 agentes · narrando ao vivo',
    scenarioPrompt: 'ou injete um cenário você mesmo',
    scenarioLabels: {
      feriado: 'feriado',
      campanha: 'campanha',
      'chuva-forte': 'chuva forte',
      'fim-de-mes': 'fim de mês'
    },
    agentPanel: {
      input: 'entrada',
      processing: 'processamento',
      output: 'saída',
      stack: 'stack',
      back: '← voltar ao fluxo'
    },
    agents: {
      Scout: {
        role: 'Dados de mercado',
        input: 'Dados públicos de procedimentos hospitalares do SUS',
        processing: 'Organiza os dados em séries temporais com regras determinísticas',
        output: 'Séries de mercado para o modelo preditivo'
      },
      Keeper: {
        role: 'Histórico operacional',
        input: 'Dados internos de vendas, estoque e produção',
        processing: 'Consolida o histórico mensal e as tendências com regras determinísticas',
        output: 'Séries internas para o modelo preditivo'
      },
      Director: {
        role: 'Explicação dos resultados',
        input: 'Previsões já calculadas a partir do modelo e da média histórica',
        processing: 'Usa IA generativa para explicar os resultados, sem recalcular os números',
        output: 'Análise em linguagem natural para apoiar a decisão humana'
      }
    },
    modelLabel: 'Modelo de machine learning',
    modelAccuracy: 'Acerto no planejamento semestral',
    evaluationContext: 'Validação prática retrospectiva de 8 produtos, com dados de 2025. Resultado informado pelo desenvolvedor.',
    baselineContext: 'No mesmo ano, o planejamento anterior registrou 35% de acerto trimestral. Os resultados usam períodos de agregação diferentes e não constituem uma comparação direta.',
    illustrativeNote: 'Fluxo e curva ilustrativos. Os 80% se referem à validação prática semestral informada pelo desenvolvedor, não ao complemento do erro trimestral do relatório.'
  },
  projects: {
    title: 'Projetos',
    subtitle: 'Trabalhos e experimentos em dados, IoT e visão computacional',
    items: {
      '01': {
        category: 'Dados',
        title: 'Hospital Data Analytics',
        visualCaption: 'Dados hospitalares · análise exploratória',
        description: 'Análise exploratória de dados hospitalares, gerando indicadores para apoiar decisões.'
      },
      '02': {
        category: 'IoT',
        title: 'IoT Fish Farming Simulator',
        visualCaption: 'Piscicultura · simulação de sensores',
        description: 'Simulador de sensores para monitoramento de piscicultura, aplicando conceitos de IoT.'
      },
      trapinsight: {
        category: 'Visão computacional',
        title: 'TrapInsight',
        description: 'Projeto de visão computacional em desenvolvimento.',
        status: 'Em desenvolvimento',
        visualCaption: 'Conceito visual · visão computacional'
      }
    }
  },
  skills: {
    title: 'Competências',
    subtitle: 'Tecnologias que uso para construir meus projetos',
    fallbackLabel: 'Tecnologias conectadas',
    clearFilter: 'Limpar filtro',
    canvasLabel: 'Céu de nós da rede de competências',
    layerLabels: {
      languages: 'linguagens',
      frameworks: 'frameworks e libs',
      tools: 'ferramentas',
      output: 'saída'
    },
    outputNode: 'o que eu construo'
  },
  timeline: {
    title: 'Trajetória',
    subtitle: 'Formação acadêmica e histórico profissional',
    kicker: 'Trajetória — a virada de chave',
    tabs: { experience: 'Experiência', education: 'Formação' },
    experience: {
      shunji: { role: 'Estagiário — Laboratório de Solos', summary: 'Documentação técnica de processos, fluxogramas e POPs. Pensamento sistêmico aplicado a processos reais.' },
      abase: { role: 'Suporte técnico N1/N2', summary: 'Configuração de roteadores e ONUs, diagnóstico de redes de fibra óptica e rádio. Diagnóstico sob pressão.' },
      jacto: { role: 'Operador de máquinas · metrologia', summary: 'Corte a laser e usinagem CNC, metrologia e controle de qualidade. Onde a precisão virou hábito.' }
    },
    education: {
      fatec: { role: 'Tecnologia em Sistemas Inteligentes', summary: 'Conclusão prevista para 2028.' },
      senai: { role: 'Mecânico de Usinagem', summary: 'Concluído.' },
      viacerta: { role: 'Técnico em TI', summary: 'Concluído.' }
    },
    threadLabel: 'o fio condutor',
    thread: 'precisão · diagnóstico · pensamento sistêmico'
  },
  contact: {
    kicker: 'Contato',
    headline: 'Vamos conversar sobre tecnologia?',
    location: 'Oriente, SP — Brasil',
    title: 'Vamos conversar?',
    whatsapp: 'Conversar no WhatsApp',
    linkedin: 'LinkedIn ↗',
    github: 'GitHub ↗',
    imageAlt: 'Pedro Lucas fazendo sinal de joinha'
  },
  footer: {
    copy: '© 2026 Pedro Lucas Francisco',
    stack: 'HTML · CSS · JavaScript Vanilla'
  }
};
