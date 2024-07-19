import { OService } from "./OService";


export interface Order {
  id: string;
  userId: string;
  productIds: string[];
  total: number;
}

export class OrderService implements OService<Order> {
  async getData(orderId: string): Promise<Order> {
    // 模擬非同步獲取資料
    return new Promise((resolve) =>
      setTimeout(() => resolve({ 
				id: orderId, 
				userId: '1', 
				productIds: ['101', '102'], 
				total: 200 
			}), 100)
    );
  }
}
