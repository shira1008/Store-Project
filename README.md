## index.html
### index.js
responsible of index.html functionality:


 - fetchProducts.js - fetching all the products from the API

 - store.js - add and get products to and from the local storage
    checking if the products is in the local storage if not return an empty list.

 - displayProducts.js - in index.html , display the products that have featured = true(index.js)
        - setupCart.js - add the items to cart
        - save the items in the storage
        
####   Utils.js - contain: api url for all the products, url for single product , get element function, formattedPrice

## products.html
### products.js
- use display to display all the products from local storage, once the products loads hide the page loading.

    - search.js - invoke displayProducts(store, getElement(".class")) with different data, filter depend on the search (keyup) , saving the data in the storage (store.js).

    - companies.js - btns that depend of the company's name and filter by click (if clicked == company's name).

    price.js - filter by price using input event

## product.html
### product.js
- display 1 product (depend on the id) on different page - using fetch req

## cart - in all pages
- toggleCart.js - open and close the cart
- setupCart.js - checking if the item in the local storage using store.js. function addToCart using in all pages, add the item or update it in the cart if already exist.
event listeners to remove increase or decrease the amount of the item.
- addToCartDOM.js - grab product info and add to the DOM - display the items in the cart
