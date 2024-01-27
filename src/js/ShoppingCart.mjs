import { renderListWithTemplate } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";

function CardTemplate(item) {
    // Find the "quantity" property in each object
    const quantity = item.quantity;
    // Declare a variable named "icons"
    let icons = "";
    // Check the value of the "quantity" property
    if (quantity >= 1) {
      // If quantity is equal to 1, add specific icons to the "icons" variable
      icons += '<li><button class="cart__reduce">✖</button></li><li><button class="cart__add">🞦</button></li>';
    } else {
      // If quantity is equal to 0, remove the object from cartItems
      cartItems.splice(i, 1);//THIS MIGHT NOT WORK
      i--; // Adjust the loop counter after removing an element
    }
    return `<li class="cart-card divider">
    <ul class="cart-card__icons">${icons}</ul>
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <p class="cart-card__total">Something</p>
  </li>`;
}

export default class ShoppingCart {
    constructor() {
        this.cartItems = getLocalStorage("so-cart");
        this.cartTotal = getLocalStorage("so-cart-total");
        this.element = document.querySelector(".product-list");
        this.render();
    }

    async init() {
        this.render();
    }

    render() {
        renderListWithTemplate(CardTemplate, this.element, this.cartItems, "afterBegin", true);
        document.querySelector(".cart-total").innerHTML = "Total $" + this.cartTotal;
        console.log(this.cartItems);
    }
}