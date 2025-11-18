import navbarController from "./utils/navbar.js";

import homeView from "./views/home.view.js";
import resumeView from "./views/resume.view.js";

function main() {
    navbarController();

    if (document.getElementById("pageHome")) {
        homeView();
    }

    if (document.getElementById("pageResume")) {
        resumeView();
    }
}

document.addEventListener("DOMContentLoaded", main);