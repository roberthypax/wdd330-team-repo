import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get current cart array
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  // Check if product already in cart
  let existingItem = cart.find(item => {
    return item.Id === product.Id; 
  });

  if (existingItem) {
    // Increment quantity of existing item
    existingItem.quantity++;
  } else {
    // Add new product to cart 
    product.quantity = 1;
    cart.push(product);
  }
  // Save updated cart array
  //localStorage.setItem("so-cart", JSON.stringify(cart));
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
