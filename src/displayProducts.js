import { formatPrice } from "./utils.js";
import { addToCart } from "./cart/setupCart.js";

const display = (products, element, filters) => {
  //display products:
  //price in cent need to convert to dollar. i could just divide by 100 but this is another way:
  element.innerHTML = products
    .map((product) => {
      const { name, id, image, price } = product;
      return ` <article class="product">
          <div class="product-container">
            <img src="${image}" class="product-img img" alt="${name}" />
           
            <div class="product-icons">
              <a href="product.html?id=${id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              <button class="product-cart-btn product-icon" data-id="${id}">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">${formatPrice(price)}</h4>
          </footer>
        </article> `;
    })
    .join("");

  //it fix a bug that i had extra event listeners  "if (filters) return", added true  to display in search.js , price.js and companies.js
  if (filters) return;
  element.addEventListener("click", function (e) {
    const parent = e.target.parentElement;
    if (parent.classList.contains("product-cart-btn")) {
      addToCart(parent.dataset.id);
    }
  });
};

export default display;
