import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

//===== Function to get the delivery option =====
export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  deliveryOptions.forEach(option => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOptions[0];
}

//===== Function to check weekend =====
const isWeekend = (date) => date.format('dddd') === 'Saturday' || date.format('dddd') === 'Sunday';

//===== Function to calculate delivery date excluding weekend =====
export function calculateDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while (remainingDays > 0){
    deliveryDate = deliveryDate.add(1, 'day');
    if(!isWeekend(deliveryDate)) {
      remainingDays--
    }
  }

  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}