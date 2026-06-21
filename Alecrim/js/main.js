/**
 * main.js — Entry point principal
 * Importa e inicializa todos os módulos.
 */

import { initNavbar }     from './navbar.js';
import { initAnimations } from './animations.js';
import { initWhatsApp }   from './whatsapp.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAnimations();
  initWhatsApp();
});
