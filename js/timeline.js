import { personalData } from '../data/content.js';
import { en } from '../data/i18n-en.js';
import { pt } from '../data/i18n-pt.js';
import { getCurrentLang, onLangChange } from './i18n.js';

const DICTIONARIES = { pt, en };

/** Inicializa as abas acessíveis de experiência e formação. */
export function initTimeline() {
  const panel = document.getElementById('timeline-panel');
  const tabs = document.querySelectorAll('[data-timeline-tab]');
  if (!panel || !tabs.length) return;

  new Timeline(panel, tabs).start();
}

class Timeline {
  constructor(panel, tabs) {
    this.panel = panel;
    this.tabs = [...tabs];
    this.activeTab = 'experience';
  }

  start() {
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.selectTab(tab.dataset.timelineTab));
      tab.addEventListener('keydown', (event) => this.handleKeydown(event, index));
    });
    this.selectTab(this.activeTab);
    onLangChange(() => this.render());
  }

  handleKeydown(event, index) {
    const keyToIndex = {
      ArrowRight: (index + 1) % this.tabs.length,
      ArrowDown: (index + 1) % this.tabs.length,
      ArrowLeft: (index - 1 + this.tabs.length) % this.tabs.length,
      ArrowUp: (index - 1 + this.tabs.length) % this.tabs.length,
      Home: 0,
      End: this.tabs.length - 1
    };
    if (!(event.key in keyToIndex)) return;
    event.preventDefault();
    const nextIndex = keyToIndex[event.key];
    this.selectTab(this.tabs[nextIndex].dataset.timelineTab);
    this.tabs[nextIndex].focus();
  }

  selectTab(tabName) {
    if (!personalData.timeline[tabName]) return;
    this.activeTab = tabName;
    this.tabs.forEach((tab) => {
      const isActive = tab.dataset.timelineTab === tabName;
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
    this.panel.setAttribute('aria-labelledby', `timeline-tab-${tabName}`);
    this.render();
  }

  render() {
    const dict = DICTIONARIES[getCurrentLang()].timeline;
    const entries = personalData.timeline[this.activeTab];
    this.panel.replaceChildren();

    entries.forEach((entry) => {
      const translated = dict[this.activeTab][entry.id];
      const article = document.createElement('article');
      article.className = 'timeline-entry';

      const period = document.createElement('span');
      period.className = 'timeline-period';
      period.textContent = entry.period;

      const content = document.createElement('div');
      const organization = document.createElement('h3');
      organization.textContent = entry.organization;

      const role = document.createElement('p');
      role.className = 'timeline-organization';
      role.textContent = translated.role;

      const summary = document.createElement('p');
      summary.className = 'timeline-summary';
      summary.textContent = translated.summary;

      content.append(organization, role, summary);
      article.append(period, content);
      this.panel.appendChild(article);
    });
  }
}
