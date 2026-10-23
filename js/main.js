import { initShell } from './shell.js';
import { initI18n } from './i18n.js';
import { initNetwork } from './network.js';
import { initHero } from './hero.js';
import { initSyntegraTwin } from './syntegra-twin.js';
import { initSkillsNetwork } from './skills-network.js';
import { initProjects } from './projects.js';
import { initTimeline } from './timeline.js';
import { initContact } from './contact.js';

function initApp() {
  initShell();
  initI18n();
  initNetwork();
  initHero();
  initSyntegraTwin();
  initSkillsNetwork();
  initProjects();
  initTimeline();
  initContact();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
