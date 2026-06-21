/**
 * app.js — Script principal do Centro Médico Alecrim
 * Lógica: Navbar scroll, Sidebar drawer, Fade-in, Contadores, WhatsApp, Ano
 */


// ══════════════════════════════════════════════
// NAVBAR — Sombra no scroll
// ══════════════════════════════════════════════
(function initNavbar() {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();


// ══════════════════════════════════════════════
// SIDEBAR DRAWER — Menu lateral mobile
// ══════════════════════════════════════════════
(function initSidebar() {
  var hamburger = document.getElementById('navbar-hamburger');
  var sidebar   = document.getElementById('sidebar');
  var overlay   = document.getElementById('sidebar-overlay');
  var closeBtn  = document.getElementById('sidebar-close');

  if (!sidebar) return;

  function openSidebar() {
    sidebar.classList.add('open');
    overlay && overlay.classList.add('open');
    hamburger && hamburger.classList.add('active');
    hamburger && hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('sidebar-open');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay && overlay.classList.remove('open');
    hamburger && hamburger.classList.remove('active');
    hamburger && hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('sidebar-open');
  }

  hamburger && hamburger.addEventListener('click', function() {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  overlay  && overlay.addEventListener('click', closeSidebar);
  closeBtn && closeBtn.addEventListener('click', closeSidebar);

  // Fechar ao clicar em qualquer link do sidebar
  document.querySelectorAll('.sidebar__links a').forEach(function(link) {
    link.addEventListener('click', closeSidebar);
  });

  // Fechar com Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeSidebar();
  });
})();


// ══════════════════════════════════════════════
// ACTIVE NAV LINK — Marca o link da página atual
// ══════════════════════════════════════════════
(function setActiveLink() {
  var path     = window.location.pathname;
  var filename = path.split('/').pop() || 'index.html';
  if (filename === '') filename = 'index.html';

  var allLinks = document.querySelectorAll('.navbar__links a, .sidebar__links a');

  allLinks.forEach(function(link) {
    var href = (link.getAttribute('href') || '').split('/').pop();
    if (href === filename) {
      link.classList.add('active');
    }
  });
})();


// ══════════════════════════════════════════════
// SMOOTH SCROLL — Para âncoras internas (#id)
// ══════════════════════════════════════════════
(function initSmoothScroll() {
  var navbar = document.getElementById('navbar');

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href   = anchor.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var offset = navbar ? navbar.offsetHeight + 8 : 80;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();


// ══════════════════════════════════════════════
// ANIMAÇÕES — Fade-in sections com IntersectionObserver
// ══════════════════════════════════════════════
(function initAnimations() {
  var elements = document.querySelectorAll('.fade-in-section');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    elements.forEach(function(el) { observer.observe(el); });
  } else {
    elements.forEach(function(el) { el.classList.add('visible'); });
  }
})();


// ══════════════════════════════════════════════
// CONTADORES — Animação numérica ao scroll
// ══════════════════════════════════════════════
(function initCounters() {
  var counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  if (!('IntersectionObserver' in window)) {
    counters.forEach(function(el) {
      el.textContent = (el.getAttribute('data-end') || '0') + (el.getAttribute('data-suffix') || '');
    });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(el) { observer.observe(el); });

  function animateCounter(el) {
    var end      = parseInt(el.getAttribute('data-end') || '0', 10);
    var start    = parseInt(el.getAttribute('data-start') || '0', 10);
    var suffix   = el.getAttribute('data-suffix') || '';
    var duration = 1200;
    var startTime = null;

    function tick(now) {
      if (!startTime) startTime = now;
      var elapsed  = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(start + (end - start) * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
})();


// ══════════════════════════════════════════════
// WHATSAPP BUTTON — Link dinâmico
// ══════════════════════════════════════════════
(function initWhatsApp() {
  var btn = document.getElementById('whatsapp-btn');
  if (!btn) return;
  var num = '5579999204776';
  var msg = encodeURIComponent('Olá! Gostaria de agendar uma consulta no Centro Médico Alecrim.');
  btn.href   = 'https://wa.me/' + num + '?text=' + msg;
  btn.target = '_blank';
  btn.rel    = 'noopener noreferrer';
})();


// ══════════════════════════════════════════════
// ANO NO FOOTER
// ══════════════════════════════════════════════
(function setYear() {
  var el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();
