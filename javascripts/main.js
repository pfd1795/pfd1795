import SidebarController from './controllers/sidebar/sidebar.controller.js';
import HomeController from './controllers/home/home.controller.js';
import JuegosController from './controllers/juegos/juegos.controller.js';
import { InitModalDialog } from './utils/dialog.js';

function main() {
  InitModalDialog();

  if (document.getElementById('HomePage')) {
    SidebarController();
  }

  /* Las grillas de contenido solo existen en la portada; las subpáginas
     (mis-estudios/) reutilizan el sidebar y el modal pero no montan home. */
  if (document.querySelector('.main-layout')) {
    HomeController();
  }

  /* La grilla de juegos solo se monta en juegos/index.html. */
  if (document.querySelector('.juegos-grid')) {
    JuegosController();
  }
}

document.addEventListener('DOMContentLoaded', main);

/* Registro del Service Worker (PWA). La URL se resuelve relativa al módulo
   para funcionar tanto en desarrollo (raíz) como en GitHub Pages (subruta). */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = new URL('../../service-worker.js', import.meta.url);
    navigator.serviceWorker.register(swUrl).catch((err) => {
      console.warn('Service Worker registration failed:', err);
    });
  });
}