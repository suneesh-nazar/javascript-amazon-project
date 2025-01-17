/*
Items added to the card will be captured using this js data structure
*/

export let cart = JSON.parse(localStorage.getItem('cart')) || 
  [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1',
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2',
  }];

// ===== Save the cart into localStorage =====
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// ===== Function to add items to cart =====
export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1',
    });
  }

  saveToStorage();
}

// ===== Function to remove items from cart =====
export function removeFromCart(productId) {
  // ===== Method 1 of removing the item from cart - Begin =====
  // let deleteIndex;
  // cart.forEach((cartItem, index) => {
  //   if (productId === cartItem.productId) {
  //     deleteIndex = index;
  //   }
  // });
  // cart.splice(deleteIndex,1);
  // ===== Method 1 of removing the item from cart - End =====

  // ===== Method 2 of removing the item from cart - Begin =====
  // const newCart = cart.filter(cartItem => productId !== cartItem.productId);
  // cart = newCart;
  // ===== Method 2 of removing the item from cart - End =====

  const newCart = [];

  cart.forEach(cartItem => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

// ===== Function to update the quantity with new quantity in the cart =====
export function updateQuantity(productId, newQuantity){
  let matchingItem;

  cart.forEach(cartItem => {
    if (cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;
  
  saveToStorage();
}

// ===== Function to calculate total items in cart and return it =====
export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach(cartItem => cartQuantity += cartItem.quantity );
  return cartQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach(cartItem => {
    if (cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  
  saveToStorage();

}