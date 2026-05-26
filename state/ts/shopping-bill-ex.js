"use strict";
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
class NewOrderState {
    cancelOrder() {
        console.log('新訂單 - 取消訂單');
    }
    verifyPayment() {
        console.log('新訂單 - 驗證付款');
    }
    shipOrder() {
        console.log('新訂單 - 發貨');
    }
}
class PaymentPendingState {
    cancelOrder() {
        console.log('付款待處理 - 取消訂單');
    }
    verifyPayment() {
        console.log('付款待處理 - 驗證付款');
    }
    shipOrder() {
        console.log('付款待處理 - 發貨');
    }
}
class ShippingState {
    cancelOrder() {
        console.log('發貨中 - 取消訂單');
    }
    verifyPayment() {
        console.log('發貨中 - 驗證付款');
    }
    shipOrder() {
        console.log('發貨中 - 發貨');
    }
}
class CompletedState {
    cancelOrder() {
        console.log('已完成 - 取消訂單');
    }
    verifyPayment() {
        console.log('已完成 - 驗證付款');
    }
    shipOrder() {
        console.log('已完成 - 發貨');
    }
}
class Order {
    constructor() {
        this.state = new NewOrderState();
    }
    setState(state) {
        this.state = state;
    }
    cancelOrder() {
        this.state.cancelOrder();
    }
    verifyPayment() {
        this.state.verifyPayment();
    }
    shipOrder() {
        this.state.shipOrder();
    }
}
{
    const order = new Order();
    order.verifyPayment(); // 新訂單 - 驗證付款
    order.shipOrder(); // 新訂單 - 發貨
    order.setState(new PaymentPendingState());
    order.verifyPayment(); // 付款待處理 - 驗證付款
    order.shipOrder(); // 付款待處理 - 發貨
    order.setState(new ShippingState());
    order.verifyPayment(); // 發貨中 - 驗證付款
    order.shipOrder(); // 發貨中 - 發貨
    order.setState(new CompletedState());
    order.verifyPayment(); // 已完成 - 驗證付款
    order.shipOrder(); // 已完成 - 發貨
}
