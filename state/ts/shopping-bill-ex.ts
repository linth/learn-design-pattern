/**
 * 狀態模式 (State Pattern) - 訂單生命週期管理
 *
 * 電子商務訂單狀態流程：新訂單 → 付款待處理 → 發貨中 → 已完成
 * 每個狀態下的行為不同，使用狀態模式避免大量 if-else。
 *
 * Reference:
 *  - https://refactoring.guru/design-patterns/state
 */

/** [狀態介面] 訂單狀態 */
interface OrderState {
  cancelOrder(): void;
  verifyPayment(): void;
  shipOrder(): void;
}

/** [具體狀態] 新訂單 */
class NewOrderState implements OrderState {
  cancelOrder(): void {
    console.log('新訂單 - 取消訂單');
  }

  verifyPayment(): void {
    console.log('新訂單 - 驗證付款');
  }

  shipOrder(): void {
    console.log('新訂單 - 發貨');
  }
}

/** [具體狀態] 付款待處理 */
class PaymentPendingState implements OrderState {
  cancelOrder(): void {
    console.log('付款待處理 - 取消訂單');
  }

  verifyPayment(): void {
    console.log('付款待處理 - 驗證付款');
  }

  shipOrder(): void {
    console.log('付款待處理 - 發貨');
  }
}

/** [具體狀態] 發貨中 */
class ShippingState implements OrderState {
  cancelOrder(): void {
    console.log('發貨中 - 取消訂單');
  }

  verifyPayment(): void {
    console.log('發貨中 - 驗證付款');
  }

  shipOrder(): void {
    console.log('發貨中 - 發貨');
  }
}

/** [具體狀態] 已完成 */
class CompletedState implements OrderState {
  cancelOrder(): void {
    console.log('已完成 - 取消訂單');
  }

  verifyPayment(): void {
    console.log('已完成 - 驗證付款');
  }

  shipOrder(): void {
    console.log('已完成 - 發貨');
  }
}

/** [環境類別] 訂單，可動態切換狀態 */
class Order {
  private state: OrderState;

  constructor() {
    this.state = new NewOrderState();
  }

  setState(state: OrderState): void {
    this.state = state;
  }

  cancelOrder(): void {
    this.state.cancelOrder();
  }

  verifyPayment(): void {
    this.state.verifyPayment();
  }

  shipOrder(): void {
    this.state.shipOrder();
  }
}

{
  const order = new Order();

  console.log('=== 新訂單 ===');
  order.verifyPayment();
  order.shipOrder();

  console.log('\n=== 付款待處理 ===');
  order.setState(new PaymentPendingState());
  order.verifyPayment();
  order.shipOrder();

  console.log('\n=== 發貨中 ===');
  order.setState(new ShippingState());
  order.verifyPayment();
  order.shipOrder();

  console.log('\n=== 已完成 ===');
  order.setState(new CompletedState());
  order.verifyPayment();
  order.shipOrder();
}