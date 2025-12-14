import { renderEducation, renderWorkExperience } from "./fnResume.js";

import { copyEmail } from "../../../scripts/utils/copyEmail.js";

export default function main() {
  renderWorkExperience();

  renderEducation();

  document.querySelector(".email-link")?.addEventListener("click", copyEmail);
}

document.addEventListener("DOMContentLoaded", main);