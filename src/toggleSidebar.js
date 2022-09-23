import { getElement } from "./utils.js";
const toggleNav = getElement(".toggle-nav");
const sideBarOverlay = getElement(".sidebar-overlay");
const closeBtn = getElement(".sidebar-close");

toggleNav.addEventListener("click", () => {
  sideBarOverlay.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  sideBarOverlay.classList.remove("show");
});
