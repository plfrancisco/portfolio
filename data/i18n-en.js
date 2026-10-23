export const en = {
  nav: {
    hero: 'Home',
    syntegra: 'Síntegra Twin',
    projects: 'Projects',
    skills: 'Skills',
    timeline: 'Timeline',
    contact: 'Contact',
    menu: 'Navigation'
  },
  hero: {
    greeting: "Hi, I'm",
    title: 'Pedro Lucas Francisco',
    nameFirst: 'Pedro',
    nameLast: 'Lucas',
    subtitle: 'Software Developer · AI & Data',
    bio: 'Intelligent Systems Technology student at FATEC Pompeia. Intern at the Soil Laboratory of Fundação Shunji Nishimura and Inova Skill 2026 participant, where I worked as a developer on Síntegra Twin with Síntegra, a Grupo Jacto company.',
    ctaSyntegra: 'See Síntegra Twin →',
    ctaResume: 'Resume ↓',
    badgeLabel: 'Síntegra Twin · Inova Skill 2026',
    imageAlt: '3D illustration of Pedro Lucas waving, lit by a warm golden glow'
  },
  syntegra: {
    badge: 'Featured · #00',
    title: 'Síntegra Twin',
    description: 'A multi-agent pipeline for demand forecasting. Scout organizes public market data and Keeper consolidates sales, inventory, and production. The GBM model generates forecasts and Director explains the results to support planning.',
    roleTag: 'my role: development and system architecture',
    context: 'Developed during the Inova Skill 2026 program, working with Síntegra, a Grupo Jacto company, in partnership with CITAP, Mentto, and Bluesfield Aceleradora.',
    captions: [
      'A forecast request enters the pipeline.',
      'Scout organizes time series of hospital procedures from Brazil’s SUS.',
      'Keeper consolidates sales, inventory, and production history.',
      'Director explains the calculated forecasts without changing the numbers.'
    ],
    scenarioCaption: 'Scenario: {name} — watch the forecast react.',
    exploring: 'exploring: {name}',
    resumeNarration: '▶ back to narration',
    hud: { events: 'events', context: 'context' },
    speedLabel: 'speed',
    playLabel: 'play',
    pauseLabel: 'pause',
    panelIdleTitle: "What's happening right now",
    panelIdleBody: 'A forecast request crosses Scout → Keeper → Director on its own, and about every 9s a real scenario is injected so you can see the forecast react.',
    liveTag: 'pipeline · 3 agents · narrating live',
    scenarioPrompt: 'or inject a scenario yourself',
    scenarioLabels: {
      feriado: 'holiday',
      campanha: 'campaign',
      'chuva-forte': 'heavy rain',
      'fim-de-mes': 'month-end'
    },
    agentPanel: {
      input: 'input',
      processing: 'processing',
      output: 'output',
      stack: 'stack',
      back: '← back to the flow'
    },
    agents: {
      Scout: {
        role: 'Market data',
        input: 'Public hospital procedure data from Brazil’s SUS',
        processing: 'Organizes data into time series using deterministic rules',
        output: 'Market time series for the predictive model'
      },
      Keeper: {
        role: 'Operational history',
        input: 'Internal sales, inventory, and production data',
        processing: 'Consolidates monthly history and trends using deterministic rules',
        output: 'Internal time series for the predictive model'
      },
      Director: {
        role: 'Explaining results',
        input: 'Forecasts already calculated from the model and historical average',
        processing: 'Uses generative AI to explain results without recalculating numbers',
        output: 'Natural-language analysis to support human decisions'
      }
    },
    modelLabel: 'Machine learning model',
    modelAccuracy: 'Half-year planning accuracy',
    evaluationContext: 'Retrospective practical validation across 8 products using 2025 data. Result reported by the developer.',
    baselineContext: 'In the same year, the previous planning process recorded 35% quarterly accuracy. The results use different aggregation periods and are not a direct comparison.',
    illustrativeNote: 'Illustrative flow and curve. The 80% refers to the half-year practical validation reported by the developer, not the complement of the report’s quarterly error.'
  },
  projects: {
    title: 'Projects',
    subtitle: 'Selected work and experiments in data, IoT, and computer vision',
    items: {
      '01': {
        category: 'Data',
        title: 'Hospital Data Analytics',
        visualCaption: 'Hospital data · exploratory analysis',
        description: 'Exploratory hospital data analysis that generates indicators to support decisions.'
      },
      '02': {
        category: 'IoT',
        title: 'IoT Fish Farming Simulator',
        visualCaption: 'Fish farming · sensor simulation',
        description: 'Sensor simulator for fish-farming monitoring, applying IoT concepts.'
      },
      trapinsight: {
        category: 'Computer vision',
        title: 'TrapInsight',
        description: 'Computer vision project in development.',
        status: 'In development',
        visualCaption: 'Visual concept · computer vision'
      }
    }
  },
  skills: {
    title: 'Skills',
    subtitle: 'Technologies I use to build my projects',
    fallbackLabel: 'Connected technologies',
    clearFilter: 'Clear filter',
    canvasLabel: 'Skills network star field',
    layerLabels: {
      languages: 'languages',
      frameworks: 'frameworks and libs',
      tools: 'tools',
      output: 'output'
    },
    outputNode: 'what I build'
  },
  timeline: {
    title: 'Timeline',
    subtitle: 'Academic background and professional journey',
    kicker: 'Timeline — the turning point',
    tabs: { experience: 'Experience', education: 'Education' },
    experience: {
      shunji: { role: 'Soil Laboratory Intern', summary: 'Technical process documentation, flowcharts, and SOPs. Systems thinking applied to real processes.' },
      abase: { role: 'N1/N2 Technical Support', summary: 'Router and ONU configuration, fiber and radio network diagnosis. Diagnosing under pressure.' },
      jacto: { role: 'Machine Operator · Metrology', summary: 'Laser cutting, CNC machining, metrology, and quality control. Where precision became a habit.' }
    },
    education: {
      fatec: { role: 'Intelligent Systems Technology', summary: 'Expected graduation in 2028.' },
      senai: { role: 'Machining Technician', summary: 'Completed.' },
      viacerta: { role: 'IT Technician', summary: 'Completed.' }
    },
    threadLabel: 'the throughline',
    thread: 'precision · diagnosis · systems thinking'
  },
  contact: {
    kicker: 'Contact',
    headline: 'Let’s talk about technology.',
    location: 'Oriente, SP — Brazil',
    title: "Let's connect",
    whatsapp: 'Chat on WhatsApp',
    linkedin: 'LinkedIn ↗',
    github: 'GitHub ↗',
    imageAlt: 'Pedro Lucas giving a thumbs-up'
  },
  footer: {
    copy: '© 2026 Pedro Lucas Francisco',
    stack: 'HTML · CSS · Vanilla JavaScript'
  }
};
