import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";


function CardTemplate(item) {
    
    let icons = "";
    return `<li class="cart-card divider">
    <ul class="cart-card__icons">${icons}</ul>
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">Item Price: $${item.FinalPrice}</p>
    <p class="cart-card__total">Total Price: $${(item.FinalPrice*item.quantity).toFixed(2)}</p>
    <p class="item__id" hidden>${item.Id}</p>
  </li>`;
}
export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.cart = document.querySelector(".product-list");
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      renderListWithTemplate(CardTemplate, this.cart, this.list, "afterBegin", true);
      this.calculateItemSummary();
      this.calculateOrdertotal();
    }
  
    calculateItemSummary() {
        
      // calculate and display the total amount of the items in the cart, and the number of items.
        let totalQuantity = this.list.reduce(function(total, currentItem) {
          return total + currentItem.quantity;
        }, 0);
        const itemCount = document.querySelector(".item__count")
        itemCount.innerHTML = `${totalQuantity} <span>Items</span>`;
    }
    
  
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.list.forEach(item => {
            const itemShipment = 10+ ((parseInt(item.quantity)-1)*2)
            const itemTotal = parseFloat(item.quantity)*parseFloat(item.FinalPrice);
            const itemTax = (itemTotal + itemShipment) * 6 / 100;
            const itemOrder = itemTotal + itemTax + itemShipment;

            this.itemTotal += itemTotal;
            this.shipping += itemShipment;
            this.tax += itemTax;
            this.orderTotal += itemOrder;
        });
      // display the totals.
      this.displayOrderTotals(this.itemTotal, this.shipping, this.tax, this.orderTotal);
    }
  
    displayOrderTotals(total, ship, tax, grossTotal) {
      // once the totals are all calculated display them in the order summary page
      const subtotal = document.querySelector(".sub__total");
      const shipping = document.querySelector(".shipping");
      const taxation = document.querySelector(".tax");
      const orderTotal = document.querySelector(".order__total");

      subtotal.innerHTML = `<span>subtotal</span> (Cart Total)<span>:</span> $ ${total}`;
      shipping.innerHTML = `<span>Shipping Cost:</span> $${ship}`;
      taxation.innerHTML = `<span>Tax:</span> $${tax}`;
      orderTotal.innerHTML = `<span>Order Total:</span> $${grossTotal}`;
      console.log(this.itemTotal);
      console.log(this.shipping);
      console.log(this.tax);
      console.log(this.orderTotal);
    }
  }
