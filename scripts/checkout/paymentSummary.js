import { calculateCartQuantity, cart, resetCart } from "../../data/cart.js"
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";



export function renderPaymentSummary() {
  // ===== Generate HTML for order summary - Begin =====
  const cartQuantity = calculateCartQuantity();

  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach(cartItem => {
    const productId = cartItem.productId;
    const product = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    productPriceCents += product.priceCents * cartItem.quantity
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 10 / 100;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-payment-summary-shipping-price">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-total-price">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  // ===== Generate HTML for order summary - End =====

  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try{
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });
      const order = await response.json();
      addOrder(order);
      resetCart();
      window.location.href = 'orders.html';
    } catch (error) {
      console.log(`Unexpected error: ${error}. Please try again later.`);
    }
  });
}
