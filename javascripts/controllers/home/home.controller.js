import { GridProjects, GridEducation, GridWorkExperience } from "./fnHome.js";
import { copyEmail } from "../../utils/copyEmail.js";

export default function HomeController() {
  document.querySelector(".email-link")?.addEventListener("click", copyEmail);

  GridProjects();
  GridWorkExperience();
  GridEducation();
}