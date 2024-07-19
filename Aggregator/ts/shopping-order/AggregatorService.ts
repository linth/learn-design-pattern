import { UserService, User } from './UserService';
import { OrderService, Order } from './OrderService';
import { ProductService, Product } from './ProductService';

export class AggregatorService {
  private userService = new UserService();
  private orderService = new OrderService();
  private productService = new ProductService();

  async getOrderDetails(orderId: string) {
    const order = await this.orderService.getData(orderId);
    const user = await this.userService.getData(order.userId);
    const products = await Promise.all(order.productIds.map(id => this.productService.getData(id)));

    return {
      order,
      user,
      products
    };
  }
}