import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { orders } from "../data/orders.js";
import formatCurrency from './utils/money.js';
import { getProduct, loadProductsFetch } from '../data/products.js';

// ===== Function to load the orders page =====
async function loadOrdersPage(){
  await loadProductsFetch();

  //===== Generate HTML for Orders page - Begin =====
  let ordersHTML = '';

  orders.forEach(order => {
    const orderTimeString = dayjs(order.orderTime).format('MMMM D');
    const orderTotal = formatCurrency(order.totalCostCents);

    ordersHTML += `
      <div class="order-container">   
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${orderTotal}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsListHTML(order.products)}
        </div>
      </div>`
    //===== Generate HTML for Orders page - End =====
  });

  // ===== Function to Generate HTML for ordered products details =====
  function productsListHTML(orderedProducts){
    let productsListHTML = '';

    orderedProducts.forEach(productDetails => {
      const matchingProduct = getProduct(productDetails.productId);
      const estimatedDeliveryTimeString = dayjs(productDetails.estimatedDeliveryTime).format('MMMM D');

      productsListHTML += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${estimatedDeliveryTimeString}
          </div>
          <div class="product-quantity">
            Quantity: ${productDetails.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>`;
    });

    return productsListHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
}

loadOrdersPage();