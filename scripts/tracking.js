import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { calculateCartQuantity } from '../data/cart.js';

// ===== Function to load the tracking page =====
async function loadTrackingPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId')
  const trackingOrder = getOrder(orderId);
  const trackingProduct = getProduct(productId);

  let orderedProduct;
  trackingOrder.products.forEach(product => {
    if (product.productId === productId) {
      orderedProduct = product;
    }
  });

  const estimatedDeliveryTimeString = dayjs(orderedProduct.estimatedDeliveryTime).format('dddd, MMMM D');

  const today = dayjs();
  const orderTime = dayjs(trackingOrder.orderTime);
  const deliveryTime = dayjs(orderedProduct.estimatedDeliveryTime);
  const deliveryProgressPercent = ((today-orderTime)/(deliveryTime-orderTime))*100;
  
  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>
  
    <div class="delivery-date">
      Arriving on ${estimatedDeliveryTimeString}
    </div>
  
    <div class="product-info">
      ${trackingProduct.name}
    </div>
  
    <div class="product-info">
      Quantity: ${orderedProduct.quantity}
    </div>
  
    <img class="product-image" src="${trackingProduct.image}">
  
    <div class="progress-labels-container">
      <div class="progress-label ${deliveryProgressPercent < 50 ? 'current-status' : ''}">
        Preparing
      </div>
      <div class="progress-label ${(deliveryProgressPercent >= 50 && deliveryProgressPercent < 100) ? 'current-status' : ''}">
        Shipped
      </div>
      <div class="progress-label ${deliveryProgressPercent >= 100 ? 'current-status' : ''}">
        Delivered
      </div>
    </div>
  
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${deliveryProgressPercent}%"></div>
    </div>`;
  
  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

// ===== Function to display total Cart quantity =====
function updateCartQuantity() {
  document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
}

updateCartQuantity();

loadTrackingPage();
