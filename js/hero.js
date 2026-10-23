import { personalData } from '../data/content.js';

/** Liga o link de currículo ao PDF real definido em data/content.js. */
export function initHero() {
  const resumeLink = document.getElementById('hero-resume-link');
  if (resumeLink && personalData.identity.resumeUrl) {
    resumeLink.href = personalData.identity.resumeUrl;
  }
}
