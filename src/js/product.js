import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let cart = JSON.parse(localStorage.getItem("so-cart"));
  if (cart == null) {
    cart = []; }
    let len = cart.length;
    if (len > 0) {
      cart.push(product);
      setLocalStorage("so-cart", cart);
      } else {
        cart.push(product);
        setLocalStorage("so-cart", cart);
    }
    // setLocalStorage("so-cart", product);
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
