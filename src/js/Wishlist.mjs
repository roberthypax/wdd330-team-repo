import { renderListWithTemplate } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";

function CardTemplate(item) {
    return `<li class="cart-card divider">
    <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="../product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class WishList {
    constructor() {
        this.cartItems = getLocalStorage("so-wishlist");
        if (!this.cartItems) {
            this.cartItems = [];
        }
        this.element = document.querySelector(".product-list");
        this.render();
    }

    async init() {
        this.render();
    }

    render() {
        renderListWithTemplate(CardTemplate, this.element, this.cartItems, "afterBegin", true);
    }

}
