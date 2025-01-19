import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('add to cart', () => {
  const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });
  
  it('adds an existing product to the cart', () => {
    document.querySelector('.js-test-container').innerHTML = `
      <select class="js-quantity-selector-${productId}">
        <option selected value="1">1</option>
      </select>
    `;
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([{
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1',
    }]));
    loadFromStorage();
    addToCart(productId);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('1');
  });

  it('adds a new product to the cart', () => {
    document.querySelector('.js-test-container').innerHTML = `
      <select class="js-quantity-selector-${productId}">
        <option selected value="1">1</option>
      </select>
    `;
    // ===== spyOn creates mock objects for testing purpose =====
    spyOn(localStorage, 'setItem');
    // ===== the original getItem is overwritten by the function written in callFake =====
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));
    loadFromStorage(); // This uses the mock method of getItem
    addToCart(productId);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');
  });
});

