// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";
// set items

//DOM:

const cartItemCountDOM = getElement(".cart-item-count");
const cartItemsDOM = getElement(".cart-items");
const cartTotalDOM = getElement(".cart-total");

//first gonna be empty [] cause nothing is there yet:
let cart = getStorageItem("cart");

export const addToCart = (id) => {
  //if the item not there, gonna add the item, if the item is there update the data and update the DOM. regardless, open the cart

  let item = cart.find((cartItem) => cartItem.id == id);
  if (!item) {
    let product = findProduct(id);
    //add item to cart
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    //add item to the DOM:
    addToCartDOM(product);
  } else {
    //update values
    const amount = increaseAmount(id);
    //update text
    const items = [...cartItemsDOM.querySelectorAll(".cart-item-amount")];
    const newAmount = items.find((value) => value.dataset.id === id);
    newAmount.textContent = amount;
  }

  //add one to the item count
  displayCartItemCount();
  //calc total - display cart totals
  displayCartTotal();
  //set cart in storage
  setStorageItem("cart", cart);

  //more stuff
  openCart();
};

//item count
function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}

//total price
function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  cartTotalDOM.textContent = `Total : ${formatPrice(total)}`;
}

//function remove item - only the items that dont have the id that selected gonna stay:
function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}

function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

//saving the amount of items in cart in all pages:
function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}

//delete items , increase decrease
function setUpCartFunctionality() {
  cartItemsDOM.addEventListener("click", function (e) {
    //the element i clicked on
    const element = e.target;
    //the parent - div

    const parent = e.target.parentElement;

    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;

    //remove
    if (element.classList.contains("cart-item-remove-btn")) {
      removeItem(id);
      //i  need to remove the parent of the div , the article
      parent.parentElement.remove();
    }

    //increase
    if (parent.classList.contains("cart-item-increase-btn")) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }
    //decrease
    if (parent.classList.contains("cart-item-decrease-btn")) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        removeItem(parentID);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }

    //invoke this functions
    displayCartItemCount();
    displayCartTotal();
    setStorageItem("cart", cart);
  });
}

const init = () => {
  // display amount of cart items
  displayCartItemCount();
  // display total
  displayCartTotal();
  //add all cart items to the DOM
  displayCartItemsDOM();
  //setup cart functionallity
  setUpCartFunctionality();
};

init();
