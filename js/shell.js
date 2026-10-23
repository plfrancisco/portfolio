/** Gerencia o menu móvel, drawer de navegação acessível e sincronização de âncoras. */
export function initShell() {
  setupMobileMenu();
}

function setupMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('mobile-close-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileNav) return;

  function openMenu() {
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Direciona o foco para o primeiro item interativo dentro do drawer
    const firstLink = mobileNav.querySelector('.mobile-nav-link');
    firstLink?.focus();
  }

  function closeMenu() {
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Fechamento com tecla Escape e contenção de foco acessível
  document.addEventListener('keydown', (e) => {
    if (!mobileNav.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeMenu();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = mobileNav.querySelectorAll('button, a');
      if (!focusables.length) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  });
}
