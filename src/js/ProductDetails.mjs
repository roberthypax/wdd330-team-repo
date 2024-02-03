import { doc } from "prettier";
import { setLocalStorage } from "./utils.mjs";

function productTemplate(product) {
    return `
    <section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      <button id="wishlist" data-id="${product.Id}">Add to Wishlist</button>
    </div></section>`;
  }
export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productID = productId;
        this.dataSource = dataSource;
        this.product ={};
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productID);
        console.log(this.product);
        this.render("main");
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
        document.getElementById("wishlist").addEventListener("click", this.addToWishlist.bind(this));
    }

    addProductToCart() {
        let product = this.product; //Get product
        let previousCart = JSON.parse(localStorage.getItem("so-cart")); //Get cart from local storage
        let cartTotal = parseFloat(localStorage.getItem("so-cart-total")); //Get cart total from local storage
        if (!cartTotal) {
          cartTotal = 0;
        }
        if (!previousCart) {
          //If cart is empty
          previousCart = [];
        }
        let len = previousCart.length; //Get length of cart
        let cartItems = []; //Initialize cart items array
        product.quantity = 1; //Set quantity to 1
        if (len > 0) {
          //If cart is not empty
          for (let i = 0; i < len; i++) {
            //Loop through cart
            if (previousCart[i].Name === product.Name) {
              //If product is already in cart
              previousCart[i].quantity++; //Increment quantity
              previousCart[i].FinalPrice =
                (previousCart[i].quantity * previousCart[i].ListPrice).toFixed(2); //Update price
              //Set cart items to previous cart
              cartTotal = cartTotal + previousCart[i].ListPrice; //Update cart total
              setLocalStorage("so-cart-total", cartTotal); //Set local storage to cart total
              setLocalStorage("so-cart", previousCart); //Set local storage to cart items
              let cartCount  = parseInt(document.querySelector(".cart-count").innerHTML); //Get cart count
              cartCount = cartCount + 1; //Update cart count
              document.querySelector(".cart-count").innerHTML = parseInt(cartCount); //Set cart count
              return; //Exit function
            }
          }
          cartItems = previousCart; //Set cart items to previous cart
          cartItems.push(product); //Push product to cart items
          cartTotal = cartTotal + product.ListPrice; //Update cart total
          setLocalStorage("so-cart-total", cartTotal); //Set local storage to cart total
          setLocalStorage("so-cart", cartItems); //Set local storage to cart items
        } else {
          cartItems.push(product); //Push product to cart items
          cartTotal = cartTotal + product.ListPrice; //Update cart total
          setLocalStorage("so-cart-total", cartTotal); //Set local storage to cart total
          setLocalStorage("so-cart", cartItems); //Set local storage to cart items
        }
       //Set cart count
        let cartCount  = parseInt(document.querySelector(".cart-count").innerHTML); //Get cart count
        cartCount = cartCount + 1; //Update cart count
        document.querySelector(".cart-count").innerHTML = parseInt(cartCount); //Set cart count
      }
      // add to cart button event handler

      addToWishlist() {
        let product = this.product; //Get product
        let previousWishlist = JSON.parse(localStorage.getItem("so-wishlist")); //Get wishlist from local storage
        if (!previousWishlist) {
          //If wishlist is empty
          previousWishlist = [];
        }
        let len = previousWishlist.length; //Get length of wishlist
        if (len > 0) {
          //If wishlist is not empty
          for (let i = 0; i < len; i++) {
            //Loop through wishlist
            if (previousWishlist[i].Name === product.Name) {
              //If product is already in wishlist
              return; //Exit function
            }
          }
        }
        previousWishlist.push(product); //Push product to wishlist
        setLocalStorage("so-wishlist", previousWishlist); //Set local storage to wishlist
      }

    render(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML("afterBegin", productTemplate(this.product));
    }

}

