import { OrderState } from './order-state.interface';
import { Order } from './order';

/**
 * 定義清楚每個狀態可以做什麼、不能做什麼、以及可以轉換到什麼狀態
 */


/**
 * 抽象狀態來實作部分功能, i.e., payOrder, shipOrder, deliverOrder, cancelOrder
 */
// --- Abstract State (Optional, but helpful for default behaviors) ---
abstract class BaseOrderState implements OrderState {
  protected order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  public payOrder(): void {
    console.log('❌ Payment failed: This action is not allowed in current state.');
  }

  public shipOrder(): void {
    console.log('❌ Shipping failed: This action is not allowed in current state.');
  }

  public deliverOrder(): void {
    console.log('❌ Delivery failed: This action is not allowed in current state.');
  }

  public cancelOrder(): void {
    console.log('❌ Cancellation failed: This action is not allowed in current state.');
  }
}


// --- Concrete States ---
export class NewState extends BaseOrderState {
  public payOrder(): void {
    console.log('✅ Payment successful.');
    this.order.setState(new PaidState(this.order));
  }

  public cancelOrder(): void {
    console.log('✅ Order cancelled.');
    this.order.setState(new CancelledState(this.order));
  }
}

export class PaidState extends BaseOrderState {
  public shipOrder(): void {
    console.log('✅ Order shipped.');
    this.order.setState(new ShippedState(this.order));
  }

  public cancelOrder(): void {
    console.log('✅ Order cancelled. Refunding payment...');
    this.order.setState(new CancelledState(this.order));
  }
}

export class ShippedState extends BaseOrderState {
  public deliverOrder(): void {
    console.log('✅ Order delivered.');
    this.order.setState(new DeliveredState(this.order));
  }
}

export class DeliveredState extends BaseOrderState {
  // Final state, no further transitions allowed by default
  public constructor(order: Order) {
    super(order);
    console.log('ℹ️ Order is now in Delivered state.');
  }
}

export class CancelledState extends BaseOrderState {
  // Final state, no further transitions allowed by default
  public constructor(order: Order) {
    super(order);
    console.log('ℹ️ Order is now in Cancelled state.');
  }
}
