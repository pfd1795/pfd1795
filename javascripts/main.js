import SidebarController from './controllers/sidebar/sidebar.controller.js';
import HomeController from './controllers/home/home.controller.js';
import { InitModalDialog } from './utils/dialog.js';

function main() {
  InitModalDialog();

  if (document.getElementById('HomePage')) {
    SidebarController();
    HomeController();
  }
}

document.addEventListener('DOMContentLoaded', main);