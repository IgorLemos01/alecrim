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


// ══════════════════════════════════════════════
// ══════════════════════════════════════════════
// CARROSSEL HERO — Troca automática de banners com Loop Infinito Contínuo
// ══════════════════════════════════════════════
(function initHeroCarousel() {
  var track   = document.getElementById('hero-carousel-track');
  var wrap    = document.getElementById('hero-carousel');
  if (!track || !wrap) return;

  var realSlides = Array.from(track.querySelectorAll('.hero__carousel-slide'));
  var dots       = Array.from(wrap.querySelectorAll('.hero__carousel-dot'));
  var btnPrev    = document.getElementById('carousel-prev');
  var btnNext    = document.getElementById('carousel-next');

  if (realSlides.length < 2) return;

  var total = realSlides.length;

  // Clones para permitir transição contínua para frente (3 -> 1) e para trás (1 -> 3)
  var cloneFirst = realSlides[0].cloneNode(true);
  cloneFirst.setAttribute('aria-hidden', 'true');
  cloneFirst.classList.add('hero__carousel-slide--clone');

  var cloneLast = realSlides[total - 1].cloneNode(true);
  cloneLast.setAttribute('aria-hidden', 'true');
  cloneLast.classList.add('hero__carousel-slide--clone');

  track.appendChild(cloneFirst);
  track.insertBefore(cloneLast, realSlides[0]);

  var currentReal = 0; // Índice da imagem real (0, 1, 2)
  var trackIndex  = 1; // Posição na track (0: Clone de 3, 1: Slide 1, 2: Slide 2, 3: Slide 3, 4: Clone de 1)
  var isAnimating = false;
  var interval    = null;
  var DELAY       = 5000; // 5 segundos
  var transitionTimer = null;

  // Posiciona a track no Slide 1 sem transição inicial
  track.style.transition = 'none';
  track.style.transform  = 'translateX(-' + (trackIndex * 100) + '%)';
  track.offsetHeight; // Força reflow

  function updateDots(realIdx) {
    dots.forEach(function(d, i) {
      var active = (i === realIdx);
      d.classList.toggle('active', active);
      d.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function setTrackPosition(targetTrackIdx, animated) {
    if (transitionTimer) {
      clearTimeout(transitionTimer);
      transitionTimer = null;
    }

    if (animated) {
      track.style.transition = '';
      transitionTimer = setTimeout(handleLoopJump, 750);
    } else {
      track.style.transition = 'none';
    }

    trackIndex = targetTrackIdx;
    track.style.transform = 'translateX(-' + (trackIndex * 100) + '%)';
  }

  function handleLoopJump() {
    if (transitionTimer) {
      clearTimeout(transitionTimer);
      transitionTimer = null;
    }

    if (trackIndex === 0) {
      // Chegou no Clone da última imagem (movimento pra trás a partir da 1ª)
      // Salta silenciosamente para a 3ª imagem real
      trackIndex = total;
      setTrackPosition(trackIndex, false);
    } else if (trackIndex === total + 1) {
      // Chegou no Clone da primeira imagem (movimento pra frente a partir da 3ª)
      // Salta silenciosamente para a 1ª imagem real
      trackIndex = 1;
      setTrackPosition(trackIndex, false);
    }
    isAnimating = false;
  }

  track.addEventListener('transitionend', handleLoopJump);

  function goToReal(targetReal, direction) {
    if (isAnimating) return;

    var newReal = (targetReal + total) % total;

    // Se estiver no último slide (3º) e ir para o próximo (1º): avança para o clone do 1º
    if (currentReal === total - 1 && newReal === 0 && direction !== 'prev') {
      isAnimating = true;
      currentReal = 0;
      updateDots(currentReal);
      setTrackPosition(total + 1, true);
      return;
    }

    // Se estiver no primeiro slide (1º) e ir para o anterior (3º): recua para o clone do 3º
    if (currentReal === 0 && newReal === total - 1 && direction === 'prev') {
      isAnimating = true;
      currentReal = total - 1;
      updateDots(currentReal);
      setTrackPosition(0, true);
      return;
    }

    // Movimento direto entre slides adjacentes ou pelos dots
    isAnimating = true;
    currentReal = newReal;
    updateDots(currentReal);
    setTrackPosition(currentReal + 1, true);
  }

  function next() { goToReal(currentReal + 1, 'next'); }
  function prev() { goToReal(currentReal - 1, 'prev'); }

  function startAuto() {
    stopAuto();
    interval = setInterval(next, DELAY);
  }

  function stopAuto() {
    if (interval) { clearInterval(interval); interval = null; }
  }

  // Eventos dos Dots
  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() {
      if (i === currentReal) return;
      var dir = (i > currentReal || (currentReal === total - 1 && i === 0)) ? 'next' : 'prev';
      goToReal(i, dir);
      startAuto();
    });
  });

  // Eventos das Setas
  btnPrev && btnPrev.addEventListener('click', function() { prev(); startAuto(); });
  btnNext && btnNext.addEventListener('click', function() { next(); startAuto(); });

  // Pausa ao passar o mouse
  wrap.addEventListener('mouseenter', stopAuto);
  wrap.addEventListener('mouseleave', startAuto);

  // Touch swipe (mobile)
  var touchStartX = 0;
  wrap.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    stopAuto();
  }, { passive: true });

  wrap.addEventListener('touchend', function(e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }
    startAuto();
  }, { passive: true });

  updateDots(0);
  startAuto();
})();
