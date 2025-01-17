import { cart, removeFromCart, updateDeliveryOption, updateQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from '../utils/money.js';
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

renderOrderSummary();

export function renderOrderSummary() {
  // ===== Generate HTML for order summary - Begin =====
  let cartSummaryHTML = '';

  cart.forEach ((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input 
                type="number" 
                class="quantity-input js-quantity-input js-quantity-input-${matchingProduct.id}" 
                value="${cartItem.quantity}" 
                min="0" 
                max="999" 
                data-product-id="${matchingProduct.id}"
              />
              <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
                Save
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // ===== Generate HTML for order summary - End =====

  // ===== Delete the item from cart when clicking delete link - Begin =====
  document.querySelectorAll('.js-delete-link').forEach ((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
  // ===== Delete the item from cart when clicking delete link - End =====

  // ===== Hide the update link and show input box and save link when clicking update link - Begin =====
  document.querySelectorAll('.js-update-link').forEach ((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  });
  // ===== Hide the update link and show input box and save link when clicking update link - End =====

  // ===== Update the cart quantity with new quantity in the input box - Begin =====
    // ===== When clicking Save - Begin =====
  document.querySelectorAll('.js-save-link').forEach ((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);

      updateCartSummary(productId, newQuantity);
    });
  });
    // ===== When clicking Save - End =====

    // ===== When pressing enter key in input box - Begin =====
  document.querySelectorAll('.js-quantity-input').forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if(event.key === 'Enter'){
        const productId = input.dataset.productId;
        const newQuantity = Number(input.value);

        updateCartSummary(productId, newQuantity);
      }
    });
  });
    // ===== When pressing enter key in input box - Begin =====
  // ===== Update the cart quantity with new quantity in the input box - End =====

  // ===== Update the delivery option according to the radio button - Begin =====
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () =>{
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
  // ===== Update the delivery option according to the radio button - End =====
}

// ===== Function to generate HTML for delivery options =====
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach(deliveryOption => {
    const dateString = calculateDeliveryDate(deliveryOption);

    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} - `;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : '';

    html += `
    <div class="delivery-option js-delivery-option" 
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
      <input type="radio"
        ${isChecked}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>
    `;
  });

  return html;
}

// ===== Function to update the item quantity with the new quantity in the input box =====
function updateCartSummary(productId, newQuantity){
  if(newQuantity < 0 || newQuantity >= 1000){
    alert('Quantity must be at least 0 and less than 1000');
    return;
  }

  updateQuantity(productId, newQuantity);

  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.classList.remove('is-editing-quantity');
  
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
