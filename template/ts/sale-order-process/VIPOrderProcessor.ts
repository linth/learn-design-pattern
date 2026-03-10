import { SaleOrderProcess } from "./SaleOrderProcess";


export class VIPOrderProcessor extends SaleOrderProcess {
  protected calculatePrice(order: any): number {
    console.log("Calculating VIP price with premium discount");
    return order.amount * 0.8;
  }

  protected sendNotification(order: any): this {
    console.log("Sending VIP priority notification");
    return this;
  }
}