import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get current cart array
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  // Check if product already in cart
  let existingItem = cart.find((item) => item.Id === product.Id);

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

let addToCartButton = document.getElementById("addToCart");
let itemId = addToCartButton.getAttribute("data-id");

fetch('../json/tents.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Find the object by "Id"
    console.log("something");
    const specificObject = data.find(item => item.Id === itemId);

    if (specificObject) {
      // Object found, do something with it
      let discount = document.querySelector(".discount__price");
      let discountPercentage = 25;
      let discountSpan = `<span class="discount">-${discountPercentage}%  </span class="cost">${(specificObject.FinalPrice - (specificObject.FinalPrice*discountPercentage/100)).toFixed(2)}<span></span>`;

      // Insert the HTML content into the discount element
      if (discount) {
        discount.innerHTML = discountSpan;
      } else {
        console.log("Discount element not found.");
      }
      console.log(specificObject.FinalPrice);
    } else {
      // Object not found
      console.log(`Object with Id ${itemId}  not found.`);
    }
  })
  .catch(error => {
    console.error('Error fetching the JSON file:', error);
  });
  
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
