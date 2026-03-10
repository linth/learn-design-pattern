import { SaleOrderProcess } from "./SaleOrderProcess";


export class B2BOrderProcessor extends SaleOrderProcess {
  protected calculatePrice(order: any): number {
    console.log("Calculating B2B price with bulk discount");
    return order.amount * 0.9;
  }

  protected sendNotification(order: any): this {
    console.log("Sending order confirmation email to company");
    return this;
  }
}