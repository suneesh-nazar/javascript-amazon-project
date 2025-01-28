export const orders = JSON.parse(localStorage.getItem('orders')) || [];

// ===== Function to add order to orders array =====
export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

// ===== Function to save orders to localStorage =====
function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

// ===== Function to get order details of an orderId =====
export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach(order => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}
