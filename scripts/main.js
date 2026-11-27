import SidebarController from './controllers/sidebar/sidebar.controller.js';
import HomeController from './controllers/home/home.controller.js';
import JuegosController from './controllers/juegos/juegos.controller.js';
import MisEstudiosController from './controllers/mis-estudios/mis-estudios.controller.js';
import ProgramasController from './controllers/programas/programas.controller.js';
import { InitModalDialog } from './utils/dialog.js';

function main() {
  InitModalDialog();

  if (document.getElementById('HomePage')) {
    SidebarController();
  }

  /* Las grillas de contenido solo existen en la portada; las subpáginas
     (pages/my-studies/) reutilizan el sidebar y el modal pero no montan home. */
  if (document.querySelector('.main-layout')) {
    HomeController();
  }

  /* Cada grilla de sección se monta solo si existe su contenedor. */
  if (document.querySelector('.juegos-grid')) {
    JuegosController();
  }

  if (document.querySelector('.estudios-grid')) {
    MisEstudiosController();
  }

  if (document.querySelector('.programas-grid')) {
    ProgramasController();
  }
}

document.addEventListener('DOMContentLoaded', main);

/* Registro del Service Worker (PWA). La URL se resuelve relativa al módulo
   para funcionar tanto en desarrollo (raíz) como en GitHub Pages (subruta). */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = new URL('../service-worker.js', import.meta.url);
    navigator.serviceWorker.register(swUrl).catch((err) => {
      console.warn('Service Worker registration failed:', err);
    });
  });
}