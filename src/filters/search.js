import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupSearch = (store) => {
  const form = getElement(".input-form");
  const nameInput = getElement(".search-input");

  form.addEventListener("keyup", function () {
    const value = nameInput.value;
    if (value) {
      const newStore = store.filter((product) => {
        let name = product.name;
        name = name.toLowerCase();
        if (name.startsWith(value)) {
          return product;
        }
      });
      display(newStore, getElement(".products-container"), true);
      if (newStore.length < 1) {
        const product = getElement(".products-container");
        product.innerHTML = `<h3 class="filter-error"> Sorry no match for "${value}" </h3>`;
      }
    } else {
      display(store, getElement(".products-container"), true);
    }
  });
};

export default setupSearch;
