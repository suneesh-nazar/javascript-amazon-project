import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

describe('test suite: add to cart', () => {
  const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  beforeEach(() => {
    document.querySelector('.js-test-container').innerHTML = `
      <select class="js-quantity-selector-${productId}">
        <option selected value="1">1</option>
      </select>
    `;
    // ===== spyOn creates mock objects for testing purpose =====
    spyOn(localStorage, 'setItem');
  });
  
  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });
  
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([{
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1',
    }]));
    loadFromStorage();
    addToCart(productId);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: productId,
      quantity: 2,
      deliveryOptionId: '1',
    }]));
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('1');
  });

  it('adds a new product to the cart', () => {
    // ===== the original getItem is called using callFake to put values to the cart =====
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));
    loadFromStorage(); // This uses the mock method of getItem
    addToCart(productId);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1',
    }]));
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');
  });
});

describe('test suite: remove from cart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach (() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1',
    }, {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2',
    }]));

    loadFromStorage();
  });

  it('deletes an existing item from cart', () => {
    removeFromCart(productId2);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1',
    }]));
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('1');
  });

  it('does nothing if product is not in the cart',() => {
    removeFromCart('notExistingProductId');
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1',
    }, {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2',
    }]));
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(cart[1].productId).toEqual(productId2);
    expect(cart[1].quantity).toEqual(1);
    expect(cart[1].deliveryOptionId).toEqual('2');
  });
});

describe('test suite: update delivery option', () => {
  const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  beforeEach (() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([{
      productId: productId,
      quantity: 2,
      deliveryOptionId: '1',
    }]));

    loadFromStorage();
  });

  it('updates delivery option of a product in cart', () => {
    updateDeliveryOption(productId, '3');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: productId,
      quantity: 2,
      deliveryOptionId: '3',
    }]));
  });

  it('does nothing if product is not in the cart', () => {
    updateDeliveryOption('notExistingProduct', '2');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('does nothing if delivery option is invalid', () => {
    updateDeliveryOption(productId, 'invalidDeliveryOption');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});