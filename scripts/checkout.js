import { loadCart, loadCartFetch } from "../data/cart.js";
import { loadProductsFetch } from "../data/products.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';

/* // ===== Function to load the checkout page =====
async function loadPage() {
  try {
    // throw 'error1'; // throws an error, skips rest of the code and goes to catch. 'error1' is captured into the error in catch
    await loadProductsFetch();
  
    const value = await new Promise((resolve, reject) => {
      // throw 'error2'; // throws an error, skips rest of the code and goes to catch. 'error2' is captured into the error in catch
      loadCart(() => {
        // reject('error3'); // creates an error for the future
        resolve('value3');
      });
    });

  } catch (error) {
    console.log('Unexpected error. Please try again later');
    console.log(error);
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
*/

/* // ===== Function to load the checkout page - fetch to loadCart =====
async function loadPage() {
  try {
    await loadProductsFetch();
    await loadCartFetch();
  } catch (error) {
    console.log('Unexpected error. Please try again later');
    console.log(error);
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
*/

// ===== Function to load the checkout page - fetch to loadCart & PromiseAll =====
async function loadPage() {
  try {
    Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);
  } catch (error) {
    console.log('Unexpected error. Please try again later');
    console.log(error);
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/* async--await example
async function loadPage() {
  console.log('load page');

  await loadProductsFetch();
  
  return 'value2'
}

loadPage().then((value) => {
  console.log('next step');
  console.log(value);
});
*/

/* Promise practice example
new Promise((resolve) => {
  console.log('start promise');
  loadProducts(() => {
    console.log('finished loading');
    resolve();
  });
}).then(() => {
  console.log('next step');
});
*/

/* loadProducts using Promise
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/* loadProducts and loadCart using Promise
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/* loadProducts and loadCart using PromiseAll
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1');
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/* loadProductsFetch and loadCart using PromiseAll
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/* loadProducts using CallBack
loadProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/* loadProducts and loadCart using CallBack
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
