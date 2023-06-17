/**
 * state design - 訂單生命週期管理
 * 
 * 假設我們正在開發一個電子商務平台，需要管理訂單的不同狀態，例如
 *  1. 新訂單
 *  2. 付款待處理
 *  3. 發貨中
 *  4. 已完成等。
 * 
 * 每個狀態下，訂單的行為和處理方式可能會有所不同。
 * 
 * Reference:
 *  - https://refactoring.guru/design-patterns/state
 */

interface OrderState {
  cancelOrder(): void;
  verifyPayment(): void;
  shipOrder(): void;
}

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

  order.verifyPayment(); // 新訂單 - 驗證付款
  order.shipOrder();     // 新訂單 - 發貨

  order.setState(new PaymentPendingState());

  order.verifyPayment(); // 付款待處理 - 驗證付款
  order.shipOrder();     // 付款待處理 - 發貨

  order.setState(new ShippingState());

  order.verifyPayment(); // 發貨中 - 驗證付款
  order.shipOrder();     // 發貨中 - 發貨

  order.setState(new CompletedState());

  order.verifyPayment(); // 已完成 - 驗證付款
  order.shipOrder();     // 已完成 - 發貨
}