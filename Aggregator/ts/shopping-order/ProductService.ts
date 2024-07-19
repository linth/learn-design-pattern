import { OService } from "./OService";

export interface Product {
  id: string;
  name: string;
  price: number;
}

export class ProductService implements OService<Product> {
  async getData(productId: string): Promise<Product> {
    // 模擬非同步獲取資料
    return new Promise((resolve) =>
      setTimeout(() => resolve({ 
				id: productId, 
				name: 'Product A', 
				price: 100 
			}), 100)
    );
  }
}
