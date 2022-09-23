// global imports - for all the page
import "./src/toggleSidebar.js";
import "./src/cart/toggleCart.js";
import "./src/cart/setupCart.js";
// specific imports
import fetchProducts from "./src/fetchProducts.js";
import { setupStore, store } from "./src/store.js";
import display from "./src/displayProducts.js";
import { getElement } from "./src/utils.js";

const init = async () => {
  const products = await fetchProducts();
  if (products) {
    //add all the products to the store
    setupStore(products);
    const featured = store.filter((product) => product.featured == true);
    display(featured, getElement(".featured-center"));
  }
};
window.addEventListener("DOMContentLoaded", init);

// navbar functionality

const navbar = getElement(".navbar");
const heroDiv = getElement(".hero");
const navLogo = getElement(".nav-logo");
window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const HerodivHeight = heroDiv.getBoundingClientRect().height;
  if (scrollHeight > HerodivHeight / 10) {
    navbar.classList.add("page");
    navLogo.src = "./images/logo-black.svg";
  } else {
    navbar.classList.remove("page");
    navLogo.src = "./images/logo-white.svg";
  }
});
