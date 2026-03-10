# 1️⃣ ERP 訂單處理流程 (Sales Order Processing)

ERP 裡訂單流程通常固定：
驗證訂單 → 計算價格 → 檢查庫存 → 建立訂單 → 發送通知

不同客戶類型：
- B2B
- VIP


## B2B 訂單
```typescript
class B2BOrderProcessor extends OrderProcessor {

  protected calculatePrice(order: any): number {
    console.log("Calculating B2B price with bulk discount");
    return order.amount * 0.9;
  }

  protected sendNotification(order: any): void {
    console.log("Sending order confirmation email to company");
  }

}
```


## VIP 訂單
```typescript
class VIPOrderProcessor extends OrderProcessor {

  protected calculatePrice(order: any): number {
    console.log("Calculating VIP price with premium discount");
    return order.amount * 0.8;
  }

  protected sendNotification(order: any): void {
    console.log("Sending VIP priority notification");
  }

}
```

使用方式

```typescript
const order = { amount: 1000 };

const processor = new VIPOrderProcessor();
processor.processOrder(order);
```

