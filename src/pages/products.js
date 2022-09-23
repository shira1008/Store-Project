// global imports
import "../toggleSidebar.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";

//  filter imports
import setupSearch from "../filters/search.js";
import setupCompanies from "../filters/companies.js";
import setupPrice from "../filters/price.js";

// specific imports
import { store, setupStore } from "../store.js";
import display from "../displayProducts.js";
import { getElement, setStorageItem } from "../utils.js";

//import fetch
import fetchProducts from "../fetchProducts.js";

const init = async () => {
  const loading = getElement(".page-loading");
  //if the user go directly to products page - cant display from local storage, therefore(array is 0 length):
  if (store.length < 1) {
    const products = await fetchProducts();
    setupStore(products);
  }
  //display from the local storage
  display(store, getElement(".products-container"));

  //from search.js - display depend on keyup
  setupSearch(store);
  setupCompanies(store);
  setupPrice(store);
  //once we get the data above ^ :
  loading.style.display = "none";
};

init();
