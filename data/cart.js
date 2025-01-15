/*
Items added to the card will be captured using this js data structure
*/

export let cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
}];

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
      quantity: 1
    });
  }
}

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
  // ===== Method 2 of removing the item from cart - Begin =====

  const newCart = [];
  
  cart.forEach(cartItem => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
}