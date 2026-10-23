import { personalData } from '../data/content.js';

export function initContact() {
  const links = {
    'contact-whatsapp': personalData.identity.whatsapp,
    'rail-whatsapp': personalData.identity.whatsapp,
    'contact-linkedin': personalData.identity.linkedin,
    'contact-github': personalData.identity.github
  };
  Object.entries(links).forEach(([id, url]) => {
    const link = document.getElementById(id);
    if (link) link.href = url;
  });
}
