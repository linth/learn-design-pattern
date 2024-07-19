/**
 * shopping & order 
 * 
 * 
 * 
 */


{

	class UserService {
		getUser(userId: string) {
			return { 
				id: userId, 
				name: 'John Doe' 
			};
		}
	}


	class OrderService {
		getOrder(orderId: string) {
			return {
				id: orderId,
				userId: '1',
				productIds: ['101', '102']
			};
		}
	}


	class ProductService {
		getProduct(productId: string) {
			return {
				id: productId,
				name: 'Product A'
			};
		}
	}


	class AggregatorService {
		private userService: UserService = new UserService();
		private orderService: OrderService = new OrderService();
		private productService: ProductService = new ProductService(); 

		// constructor(u: UserService, o: OrderService, p: ProductService) {
		// 	this.userService = u;
		// 	this.orderService = o;
		// 	this.productService = p;
		// }

		getOrderDetails(orderId: string) {
			const order = this.orderService.getOrder(orderId);
			const user = this.userService.getUser(order.userId);
			const products = order.productIds.map(id => this.productService.getProduct(id));

			return {
				order,
				user,
				products
			};
		}
	}

	const aggregator = new AggregatorService();
  const orderDetails = aggregator.getOrderDetails('order1');
  console.log(orderDetails);


	/**
	 * {
				order: { id: 'order1', userId: '1', productIds: [ '101', '102' ] },
				user: { id: '1', name: 'John Doe' },
				products: [
					{ id: '101', name: 'Product A' },
					{ id: '102', name: 'Product A' }
				]
			}
	 */
}