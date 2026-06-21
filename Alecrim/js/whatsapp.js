/**
 * whatsapp.js — Botão flutuante de WhatsApp
 * Injeta o botão no DOM e configura o link.
 */

const WHATSAPP_NUMBER = '5579999204776'; // Número sem formatação
const WHATSAPP_MSG    = encodeURIComponent('Olá! Gostaria de agendar uma consulta no Centro Médico Alecrim.');

export function initWhatsApp() {
  const btn = document.getElementById('whatsapp-btn');
  if (!btn) return;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;
  btn.setAttribute('href', url);
  btn.setAttribute('target', '_blank');
  btn.setAttribute('rel', 'noopener noreferrer');
  btn.setAttribute('aria-label', 'Agendar via WhatsApp');
}
