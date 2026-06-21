/**
 * navbar.js — Lógica da barra de navegação
 * - Navbar sticky: transparente → sólida ao scroll
 * - Menu hambúrguer (abrir/fechar) para mobile
 * - Fechar menu ao clicar em link âncora
 * - Smooth scroll para âncoras
 */

export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('navbar-hamburger');
  const mobileMenu = document.getElementById('navbar-mobile-menu');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-links a');

  if (!navbar) return;

  // ── Scroll: alterna entre transparente e sólida ──
  function updateNavbar() {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle('solid', scrolled);
    navbar.classList.toggle('transparent', !scrolled);
  }

  updateNavbar(); // estado inicial
  window.addEventListener('scroll', updateNavbar, { passive: true });

  // ── Hambúrguer: abrir/fechar menu mobile ──
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      toggleMenu(!isOpen);
    });
  }

  function toggleMenu(open) {
    if (!hamburger || !mobileMenu) return;

    if (open) {
      mobileMenu.classList.add('open');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
    } else {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  }

  // ── Fechar menu ao clicar em link ──
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // ── Fechar menu ao pressionar Escape ──
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });

  // ── Smooth scroll para todos os links âncora ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navbarH = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarH - 8;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
