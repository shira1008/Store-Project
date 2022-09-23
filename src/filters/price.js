import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupPrice = (store) => {
  const priceInput = getElement(".price-filter");
  const priceValue = getElement(".price-value");

  // setup filter
  let maxPrice = store.map((product) => product.price);
  maxPrice = Math.max(...maxPrice);
  console.log(maxPrice);
  maxPrice = Math.ceil(maxPrice / 100);
  //change the html of price
  priceInput.value = maxPrice;
  priceInput.max = maxPrice;
  priceInput.min = 0;
  priceValue.textContent = `Value: $${maxPrice}`;

  priceInput.addEventListener("input", () => {
    //getting a srt so need to convert:
    const value = parseInt(priceInput.value);
    priceValue.textContent = `Value: $${value}`;
    //filter
    let newStore = store.filter((product) => product.price / 100 <= value);
    display(newStore, getElement(".products-container"), true);
    if (newStore.length < 1) {
      const products = getElement(".products-container");
      products.innerHTML = `<h3 class="filter-error">Sorry no items match this price: $${value}</h3>`;
    }
  });
};

export default setupPrice;
