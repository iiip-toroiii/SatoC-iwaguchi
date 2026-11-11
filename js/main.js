/* 佐藤医院：スマートフォン用メニュー（フレームワーク不要） */
(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const heroTitle = document.querySelector('#hero-title');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-navigation');

  if (header && heroTitle) {
    function updateHeaderBackground() {
      const titleTop = heroTitle.getBoundingClientRect().top;
      header.classList.toggle('is-past-hero', titleTop <= header.offsetHeight);
    }

    window.addEventListener('scroll', updateHeaderBackground, { passive: true });
    window.addEventListener('resize', updateHeaderBackground);
    updateHeaderBackground();
  }

  if (!toggle || !nav) return;

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'メニューを開く');
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    nav.classList.toggle('is-open', !isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!toggle.contains(event.target) && !nav.contains(event.target)) {
      closeMenu();
    }
  });

  window.matchMedia('(min-width: 1241px)').addEventListener('change', closeMenu);
})();
