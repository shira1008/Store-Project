import { getElement } from "../utils.js";

const cartBtnToggle = getElement(".toggle-cart");
const closeCartBtn = getElement(".cart-close");
const cartOverlay = getElement(".cart-overlay");

cartBtnToggle.addEventListener("click", () => {
  cartOverlay.classList.add("show");
});
closeCartBtn.addEventListener("click", () => {
  cartOverlay.classList.remove("show");
});

export const openCart = () => {
  cartOverlay.classList.add("show");
};
