import { pt } from '../data/i18n-pt.js';
import { en } from '../data/i18n-en.js';

const dictionaries = { pt, en };
let currentLang = 'pt';
const changeListeners = [];

/** Lê um valor aninhado do dicionário a partir de um caminho "hero.title". */
function resolve(dict, path) {
  return path.split('.').reduce((value, key) => value?.[key], dict);
}

/** Aplica o dicionário ativo a todo elemento marcado com data-i18n / data-i18n-alt. */
function applyTranslations() {
  const dict = dictionaries[currentLang];

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = resolve(dict, el.dataset.i18n);
    if (value != null) el.textContent = value;
  });

  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    const value = resolve(dict, el.dataset.i18nAlt);
    if (value != null) el.setAttribute('alt', value);
  });
}

function syncToggleLabel() {
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) toggleBtn.textContent = currentLang.toUpperCase();
}

/** Define o idioma inicial a partir de <html lang>, aplica o dicionário e liga o toggle. */
export function initI18n() {
  const htmlLang = document.documentElement.lang || 'pt';
  currentLang = dictionaries[htmlLang] ? htmlLang : 'pt';

  applyTranslations();
  syncToggleLabel();

  const toggleBtn = document.getElementById('lang-toggle');
  toggleBtn?.addEventListener('click', () => setLang(currentLang === 'pt' ? 'en' : 'pt'));
}

/** @returns {'pt'|'en'} Código do idioma ativo no documento. */
export function getCurrentLang() {
  return currentLang;
}

/** Troca o idioma ativo, reaplica as traduções e avisa quem assinou onLangChange. */
export function setLang(lang) {
  if (!dictionaries[lang]) return;

  currentLang = lang;
  document.documentElement.lang = lang;
  applyTranslations();
  syncToggleLabel();

  changeListeners.forEach((callback) => callback(lang));
}

/** Registra um callback disparado toda vez que o idioma ativo muda. */
export function onLangChange(callback) {
  changeListeners.push(callback);
}
