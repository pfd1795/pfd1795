import NavbarController from "./controllers/navbar/navbar.controller.js";
import SidebarController from "./controllers/sidebar/sidebar.controller.js";

import HomeController from "./controllers/home/home.controller.js";

function main() {
  if (document.getElementById("HomePage")) {
    NavbarController();
    
    SidebarController();
    
    HomeController();
  }
}

document.addEventListener("DOMContentLoaded", main);