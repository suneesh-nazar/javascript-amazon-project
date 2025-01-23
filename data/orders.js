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