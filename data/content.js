export const personalData = {
  identity: {
    name: 'Pedro Lucas Francisco',
    displayName: 'Pedro Lucas',
    title: 'Desenvolvedor de software · IA & dados',
    location: 'Oriente, SP — Brasil',
    whatsapp: 'https://wa.me/5514991132420',
    phone: '(14) 99113-2420',
    linkedin: 'https://linkedin.com/in/pedro-lucas-francisco',
    github: 'https://github.com/plfrancisco',
    resumeUrl: 'public/curriculo.pdf' // a definir
  },
  bio: {
    text: 'Estudante de Tecnologia em Sistemas Inteligentes na FATEC Pompeia. Estagiário no Laboratório de Solos da Fundação Shunji Nishimura e participante do Inova Skill 2026, onde atuei como desenvolvedor do Síntegra Twin pela Síntegra, empresa do Grupo Jacto.'
  },
  syntegraTwin: {
    title: 'Síntegra Twin',
    subtitle: 'Previsão de demanda com pipeline multiagente e modelo GBM',
    model: {
      name: 'GBM',
      planningAccuracyPercent: 80,
      evaluationYear: 2025,
      productCount: 8,
      aggregationPeriod: 'half-year',
      source: 'developer-reported retrospective practical validation'
    },
    role: 'Desenvolvimento e arquitetura do sistema.',
    context: 'Desenvolvido no programa Inova Skill 2026, com atuação pela Síntegra, empresa do Grupo Jacto, em parceria com CITAP, Mentto e Bluesfield Aceleradora.',
    company: 'Síntegra — Grupo Jacto',
    program: 'Inova Skill 2026',
    partners: ['CITAP', 'Mentto', 'Bluesfield Aceleradora'],
    // Nome, stack e imagem não mudam por idioma; papel/entrada/processamento/saída
    // de cada agente ficam em data/i18n-pt.js e data/i18n-en.js (syntegra.agents).
    agents: [
      { name: 'Scout', stack: ['Python', 'Pydantic', 'LangGraph'], image: 'public/character/scout.jpg' },
      { name: 'Keeper', stack: ['Python', 'Pandas', 'PostgreSQL'] },
      { name: 'Director', stack: ['FastAPI', 'LangGraph', 'LightGBM', 'Docker'] }
    ],
    // Estágios que um pacote assume ao cruzar cada agente na pipeline.
    stages: ['sinal', 'evento', 'contexto', 'previsão'],
    // Cenários que o palco injeta sozinho (chave + efeito no sparkline); o rótulo exibido vem do dicionário de idioma.
    scenarios: [
      { key: 'feriado', delta: 15 },
      { key: 'campanha', delta: 11 },
      { key: 'chuva-forte', delta: -13 },
      { key: 'fim-de-mes', delta: 8 }
    ]
  },
  projects: [
    {
      id: '01',
      category: 'Dados',
      title: 'Hospital Data Analytics',
      description: 'Análise exploratória de dados hospitalares, gerando indicadores para apoiar decisões.',
      stack: ['Python', 'Pandas', 'Matplotlib'],
      visual: 'bars',
      links: {}
    },
    {
      id: '02',
      category: 'IoT',
      title: 'IoT Fish Farming Simulator',
      description: 'Simulador de sensores para monitoramento de piscicultura, aplicando conceitos de IoT.',
      stack: ['Python', 'IoT'],
      visual: 'sonar',
      links: {}
    },
    {
      id: 'trapinsight',
      number: '03',
      category: 'Visão computacional',
      title: 'TrapInsight',
      description: 'Projeto de visão computacional em desenvolvimento.',
      status: 'in-progress',
      featured: true,
      stack: [],
      visual: 'vision',
      links: {}
    }
  ],
  timeline: {
    experience: [
      { id: 'shunji', period: '2026 — atual', organization: 'Fundação Shunji Nishimura' },
      { id: 'abase', period: '2023 — 2024', organization: 'Abase Telecom' },
      { id: 'jacto', period: '2019 — 2022', organization: 'Jacto Agrícola' }
    ],
    education: [
      { id: 'fatec', period: '2025 — 2028', organization: 'FATEC Pompeia' },
      { id: 'senai', period: '2019 — 2020', organization: 'SENAI Shunji Nishimura' },
      { id: 'viacerta', period: '2018', organization: 'Via Certa' }
    ]
  },
  skillsLayers: {
    languages: ['Python', 'SQL', 'JavaScript', 'TypeScript'],
    frameworks: ['FastAPI', 'React', 'Node.js', 'Pandas', 'NumPy', 'LangChain', 'LangGraph'],
    tools: ['Git', 'GitHub', 'Claude Code', 'VS Code', 'Docker', 'PostgreSQL', 'Google Colab']
  }
};
