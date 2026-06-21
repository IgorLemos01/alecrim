/**
 * animations.js — Animações de scroll via Intersection Observer
 * - Fade-in de seções ao entrar na viewport
 * - Animação de contadores (números)
 */

export function initAnimations() {
  // ── Fade-in de seções ──
  const fadeElements = document.querySelectorAll('.fade-in-section');

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Stagger: pequeno delay baseado na posição do elemento
          const delay = idx * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    // Fallback: mostrar tudo sem animação
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // ── Animação de contadores ──
  const counters = document.querySelectorAll('[data-counter]');

  if (!counters.length) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));
}

/**
 * Anima um número do data-start ao data-end.
 * @param {HTMLElement} el - Elemento com atributos data-counter, data-end, data-suffix
 */
function animateCounter(el) {
  const end    = parseInt(el.getAttribute('data-end')    || el.textContent, 10);
  const start  = parseInt(el.getAttribute('data-start')  || '0', 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1200; // ms
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(start + (end - start) * eased);

    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
