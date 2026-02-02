import { Order } from './order';
import { NewState, PaidState, ShippedState, DeliveredState, CancelledState } from './concrete-states';

console.log('--- Order System State Pattern Demo ---');

// Scenario 1: Successful Flow
console.log('\n--- Scenario 1: Standard Success Flow ---');
const order1 = new Order();
console.log('Order created.');

order1.payOrder();
order1.shipOrder();
order1.deliverOrder();

// Try to pay again after delivery
console.log('\nTrying to pay after delivery:');
order1.payOrder(); // Should fail


// Scenario 2: Cancellation Flow
console.log('\n--- Scenario 2: Cancellation Flow ---');
const order2 = new Order();
console.log('Order created.');

order2.payOrder();
console.log('Decided to cancel order...');
order2.cancelOrder();

console.log('\nTrying to ship after cancellation:');
order2.shipOrder(); // Should fail


// Scenario 3: Invalid Transitions
console.log('\n--- Scenario 3: Invalid Transitions ---');
const order3 = new Order();
console.log('Order created.');
console.log('Trying to ship immediately:');
order3.shipOrder(); // Should fail because it's not paid yet
