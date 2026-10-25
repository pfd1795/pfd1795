import SidebarController from './controllers/sidebar/sidebar.controller.js';
import HomeController from './controllers/home/home.controller.js';
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
}

document.addEventListener('DOMContentLoaded', main);