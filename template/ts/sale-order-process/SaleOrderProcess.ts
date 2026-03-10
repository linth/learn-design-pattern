
export abstract class SaleOrderProcess {

  // 訂單處理流程
  processOrder(order: any): void {
    const price = this.calculatePrice(order);
    this.validateOrder(order)
      .checkInventory(order)
      .createOrder(order, price)
      .sendNotification(order);

    console.log("Order processing completed");
  }

  // 驗證訂單
  protected validateOrder(order: any): this {
    console.log("Validating order...");
    return this;
  }

  // 計算價格
  protected abstract calculatePrice(order: any): number;

  // 檢查庫存
  protected checkInventory(order: any): this {
    console.log("Checking inventory...");
    return this;
  }

  // 建立訂單
  protected createOrder(order: any, price: number): this {
    console.log(`Creating order with price ${price}`);
    return this;
  }

  // 發送通知
  protected abstract sendNotification(order: any): this;
}

