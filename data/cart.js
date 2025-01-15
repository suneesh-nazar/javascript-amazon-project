/*
Items added to the card will be captured using this js data structure
*/

export const cart = [];

// ====== Function to add items to cart ======
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