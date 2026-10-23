import { projectIcon } from './project-icons.js';
import { personalData } from '../data/content.js';
import { en } from '../data/i18n-en.js';
import { pt } from '../data/i18n-pt.js';
import { getCurrentLang, onLangChange } from './i18n.js';

const DICTIONARIES = { pt, en };

/** Renderiza os cards de projeto e inicia as mini-visualizações procedurais. */
export function initProjects() {
  const list = document.getElementById('project-list');
  const spotlight = document.getElementById('project-spotlight');
  if (!list || !spotlight) return;

  personalData.projects.forEach((project) => {
    const card = createProjectCard(project);
    (project.featured ? spotlight : list).appendChild(card);
    // Os visuais usam SVG, com movimento controlado pelo botão de cada projeto.
  });

  applyProjectTranslations();
  onLangChange(() => applyProjectTranslations());
}

/** Esmaece os projetos que não usam nenhuma das tecnologias recebidas. */
export function filterProjects(techNames = []) {
  const normalizedTechs = new Set(techNames.map((name) => name.toLowerCase()));

  document.querySelectorAll('.project-card').forEach((card) => {
    const cardTechs = card.dataset.tech.split(',').map((name) => name.trim().toLowerCase());
    const matches = normalizedTechs.size === 0 || cardTechs.some((tech) => normalizedTechs.has(tech));
    card.classList.toggle('is-dimmed', !matches);
  });
}

function createProjectCard(project) {
  const card = document.createElement('article');
  const classNames = ['project-card'];
  if (project.featured) classNames.push('project-card--featured');
  if (project.status) classNames.push(`project-card--${project.status}`);
  card.className = classNames.join(' ');
  card.dataset.projectId = project.id;
  card.dataset.tech = (project.stack || []).join(',');
  card.dataset.visual = project.visual;

  const content = document.createElement('div');
  content.className = 'project-card__content';

  const top = document.createElement('div');
  top.className = 'project-card__top';

  const number = document.createElement('span');
  number.className = 'project-card__number';
  number.setAttribute('aria-hidden', 'true');
  number.textContent = project.number || project.id;

  const category = document.createElement('span');
  category.className = 'project-card__category';
  category.textContent = project.category;

  const metadata = document.createElement('div');
  metadata.className = 'project-card__metadata';
  metadata.appendChild(category);

  if (project.status) {
    const status = document.createElement('span');
    status.className = 'project-card__status';
    status.dataset.projectStatus = '';
    status.textContent = DICTIONARIES[getCurrentLang()].projects.items[project.id]?.status || '';
    metadata.appendChild(status);
  }

  const title = document.createElement('h3');
  title.className = 'project-card__title';
  title.textContent = project.title;

  const description = document.createElement('p');
  description.className = 'project-card__description';
  description.textContent = project.description;

  const stack = document.createElement('p');
  stack.className = 'project-card__stack';
  stack.textContent = (project.stack || []).join(' · ');

  const visualFrame = document.createElement('div');
  visualFrame.className = 'project-viz-frame';
  visualFrame.setAttribute('aria-hidden', 'true');
  const kind = { vision: 'vision', bars: 'analytics', sonar: 'iot' }[project.visual];
  visualFrame.innerHTML = '<div class="semantic-art is-running">' + projectIcon(kind) + '</div>';
  const caption = document.createElement('span');
  caption.className = 'project-viz-caption';
  caption.dataset.projectVisualCaption = '';
  visualFrame.appendChild(caption);
  const motionToggle = document.createElement('button');
  motionToggle.type = 'button';
  motionToggle.className = 'vision-toggle';
  motionToggle.dataset.visionToggle = '';
  motionToggle.setAttribute('aria-pressed', 'false');
  motionToggle.addEventListener('click', () => {
    const running = visualFrame.querySelector('.semantic-art').classList.toggle('is-running');
    motionToggle.setAttribute('aria-pressed', String(!running));
    applyProjectTranslations();
  });
  content.appendChild(motionToggle);

  title.id = 'project-' + project.id + '-title';
  card.setAttribute('aria-labelledby', title.id);
  top.append(number, metadata);
  content.append(top, title, description);
  if (stack.textContent) content.appendChild(stack);
  const toggle = content.querySelector('.vision-toggle');
  if (toggle) content.appendChild(toggle);
  card.append(content, visualFrame);
  return card;
}

function applyProjectTranslations() {
  const translations = DICTIONARIES[getCurrentLang()].projects.items;
  document.querySelectorAll('.project-card').forEach((card) => {
    const translated = translations[card.dataset.projectId];
    if (!translated) return;
    card.querySelector('.project-card__category').textContent = translated.category;
    card.querySelector('.project-card__title').textContent = translated.title;
    card.querySelector('.project-card__description').textContent = translated.description;
    const status = card.querySelector('[data-project-status]');
    if (status && translated.status) status.textContent = translated.status;
    const visualCaption = card.querySelector('[data-project-visual-caption]');
    if (visualCaption && translated.visualCaption) visualCaption.textContent = translated.visualCaption;
    const toggle = card.querySelector('[data-vision-toggle]');
    if (toggle) toggle.textContent = getCurrentLang() === 'en' ? (toggle.getAttribute('aria-pressed') === 'true' ? 'Play visual' : 'Pause visual') : (toggle.getAttribute('aria-pressed') === 'true' ? 'Reproduzir visual' : 'Pausar visual');
  });
}
