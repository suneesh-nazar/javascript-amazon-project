import { isValidDeliveryOption } from "./deliveryOptions.js";

class Cart {
  cartItems;
  localStorageKey;

  constructor (localStorageKey) {
    this.localStorageKey = localStorageKey;
    
    this.loadFromStorage();
  }
  
  // ===== Load the cart from localStorage or assign default values if undefined =====
  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || 
      [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2',
      }];
  }

  // ===== Save the cart into localStorage =====
  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  // ===== Function to add items to cart =====
  addToCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = (quantitySelector) ? Number(quantitySelector.value) : 1;
    
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({productId, quantity, deliveryOptionId:'1'})
    }

    this.saveToStorage();
  }

  // ===== Function to remove items from cart =====
  removeFromCart(productId) {
    // const newCartItems = this.cartItems.filter(cartItem => productId !== cartItem.productId);
    // this.cartItems = newCartItems;

    // ===== Method 3 of removing the item from cart - Begin =====
    const newCartItems = [];

    this.cartItems.forEach(cartItem => {
      if (cartItem.productId !== productId) {
        newCartItems.push(cartItem);
      }
    });

    this.cartItems = newCartItems;
    // ===== Method 3 of removing the item from cart - End =====

    this.saveToStorage();
  }

  // ===== Function to update the quantity with new quantity in the cart =====
  updateQuantity(productId, newQuantity) {
    let matchingItem;

    this.cartItems.forEach(cartItem => {
      if (cartItem.productId === productId){
        matchingItem = cartItem;
      }
    });

    matchingItem.quantity = newQuantity;
    
    this.saveToStorage();
  }

  // ===== Function to calculate total items in cart and return it =====
  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach(cartItem => cartQuantity += cartItem.quantity );
    return cartQuantity;
  }

  // ===== Function to update delivery option =====
  updateDeliveryOption(productId, deliveryOptionId) {
    if(!isValidDeliveryOption(deliveryOptionId)){
      return;
    }
    
    let matchingItem;
    
    this.cartItems.forEach(cartItem => {
      if (cartItem.productId === productId){
        matchingItem = cartItem;
      }
    });

    if(!matchingItem) {
      return;
    } 
    
    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);

// Each object created using a class is called an instance.
// The following code checks whether businessCart is generated from Cart class
console.log(businessCart instanceof Cart);