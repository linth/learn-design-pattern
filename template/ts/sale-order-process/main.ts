import { VIPOrderProcessor } from "./VIPOrderProcessor";
import { B2BOrderProcessor } from "./B2BOrderProcessor";

console.log('------case 1--------');
const order = { amount: 1000 };
const processor = new VIPOrderProcessor();
processor.processOrder(order);

console.log('------case 2--------');
const order2 = { amount: 2000 };
const processor2 = new B2BOrderProcessor();
processor2.processOrder(order2);

