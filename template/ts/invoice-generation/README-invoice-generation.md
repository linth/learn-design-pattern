2️⃣ ERP 發票產生流程 (Invoice Generation)

ERP 發票流程：
取得訂單 → 計算稅 → 建立發票 → 儲存 → 發送

不同國家稅制不同：
- Taiwan
- EU VAT

## Template
```typescript
abstract class InvoiceGenerator {

  public generateInvoice(orderId: string): void {

    const order = this.fetchOrder(orderId);

    const tax = this.calculateTax(order);

    const invoice = this.createInvoice(order, tax);

    this.saveInvoice(invoice);

    this.sendInvoice(invoice);

    console.log("Invoice generated successfully");
  }

  protected fetchOrder(orderId: string): any {
    console.log(`Fetching order ${orderId}`);
    return { orderId, amount: 1000 };
  }

  protected abstract calculateTax(order: any): number;

  protected createInvoice(order: any, tax: number): any {
    console.log("Creating invoice...");
    return {
      orderId: order.orderId,
      amount: order.amount,
      tax
    };
  }

  protected saveInvoice(invoice: any): void {
    console.log("Saving invoice to database");
  }

  protected abstract sendInvoice(invoice: any): void;
}
```

## Taiwan 稅制
```typescript
class TaiwanInvoiceGenerator extends InvoiceGenerator {

  protected calculateTax(order: any): number {
    console.log("Calculating Taiwan VAT 5%");
    return order.amount * 0.05;
  }

  protected sendInvoice(invoice: any): void {
    console.log("Sending Taiwan electronic invoice");
  }

}
```

## EU VAT
```typescript
class EUInvoiceGenerator extends InvoiceGenerator {

  protected calculateTax(order: any): number {
    console.log("Calculating EU VAT 20%");
    return order.amount * 0.2;
  }

  protected sendInvoice(invoice: any): void {
    console.log("Sending EU VAT invoice");
  }

}
```
