import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get the current cart from local storage
  let cart = getLocalStorage("so-cart");

  // If the cart does not exist or is not an array, create a new array
  if (!cart || !Array.isArray(cart)) {
    cart = [];
  }

  // Add new product to cart
  cart.push(product);

  // Saves the updated cart to local storage
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
