import { projectIcon } from './project-icons.js';
import { personalData } from '../data/content.js';
import { pt } from '../data/i18n-pt.js';
import { en } from '../data/i18n-en.js';
import { getCurrentLang, onLangChange } from './i18n.js';
import { highlightSkills } from './skills-network.js';

export function initSyntegraTwin() {
  const host = document.querySelector('#syntegra .twin');
  if (!host) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let step = 0, playing = !reduced.matches, visible = false, elapsed = 0;
  const copy = () => getCurrentLang() === 'en' ? en : pt;
  const words = () => getCurrentLang() === 'en'
    ? ['Market data + operational history → GBM → explanation', 'Market time series', 'Operational history', 'Explained forecast', 'Pause', 'Play', 'Replay', 'Illustrative journey']
    : ['Mercado + histórico operacional → GBM → explicação', 'Séries de mercado', 'Histórico operacional', 'Previsão explicada', 'Pausar', 'Reproduzir', 'Repetir', 'Percurso ilustrativo'];
  host.className = 'agent-story';
  function render() {
    const w = words();
    host.innerHTML = `<div class="story-intro"><span>${w[7]}</span><span>01 / 03</span></div>
      <div class="agent-route">${personalData.syntegraTwin.agents.map((agent, i) => `<button type="button" class="agent-station" data-agent="${i}" aria-pressed="false"><span class="agent-object object-${i}" aria-hidden="true">${projectIcon(['scout', 'keeper', 'director'][i])}</span><strong>${agent.name}</strong><span>${copy().syntegra.agents[agent.name].role}</span><span class="agent-packet">${w[i + 1]}</span></button>`).join('')}</div>
      <div class="story-output"><div class="model-result"><div class="model-icon">${projectIcon('gbm')}</div><div><span>${copy().syntegra.modelLabel}</span><strong>${personalData.syntegraTwin.model.name}</strong></div><div><span>${copy().syntegra.modelAccuracy}</span><strong>${personalData.syntegraTwin.model.planningAccuracyPercent}%</strong></div></div><svg viewBox="0 0 500 75" aria-hidden="true"><path class="forecast-base" d="M0 60 Q60 20 120 47 T240 30 T360 38 T500 12"/><path class="forecast-line" d="M0 60 Q60 20 120 47 T240 30 T360 38 T500 12"/></svg><p class="story-caption"></p></div>
      <div class="story-controls"><button type="button" data-play></button><button type="button" data-replay>${w[6]}</button><span>${w[0]}</span></div>
      <div class="agent-detail"></div>`;
    host.querySelectorAll('[data-agent]').forEach(button => button.addEventListener('click', () => { step = Number(button.dataset.agent); playing = false; elapsed = 0; update(); }));
    host.querySelector('[data-play]').addEventListener('click', () => { playing = !playing; update(); });
    host.querySelector('[data-replay]').addEventListener('click', () => { step = 0; elapsed = 0; playing = !reduced.matches; update(); });
    update();
  }
  function update() {
    const w = words(), agent = personalData.syntegraTwin.agents[step], detail = copy().syntegra.agents[agent.name];
    host.dataset.step = step;
    host.classList.toggle('is-playing', playing && visible);
    host.querySelector('.story-intro span:last-child').textContent = '0' + (step + 1) + ' / 03';
    host.querySelectorAll('[data-agent]').forEach((button, i) => { button.classList.toggle('is-active', i === step); button.classList.toggle('is-done', i < step); button.setAttribute('aria-pressed', String(i === step)); });
    host.querySelector('.story-caption').textContent = copy().syntegra.captions[step + 1];
    host.querySelector('[data-play]').textContent = playing ? w[4] : w[5];
    host.querySelector('.agent-detail').innerHTML = `<div><span>${copy().syntegra.agentPanel.input}</span><p>${detail.input}</p></div><div><span>${copy().syntegra.agentPanel.processing}</span><p>${detail.processing}</p></div><div><span>${copy().syntegra.agentPanel.output}</span><p>${detail.output}</p></div>`;
    if (visible) highlightSkills(agent.stack);
  }
  render();
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); }, { threshold: 0.15 }).observe(host);
  setInterval(() => { if (!playing || !visible || document.hidden) return; elapsed += 250; if (elapsed >= 4200) { elapsed = 0; step = (step + 1) % 3; update(); } }, 250);
  reduced.addEventListener('change', () => { if (reduced.matches) playing = false; update(); });
  onLangChange(render);
}
