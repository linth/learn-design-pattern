import { AggregatorService } from "./AggregatorService";



{
	async function main() {
		const aggregator = new AggregatorService();
		const orderDetails = await aggregator.getOrderDetails('order1');
		console.log(orderDetails);
	}
	
	main();


	/**
	 * 
	 * {
				order: {
					id: 'order1',
					userId: '1',
					productIds: [ '101', '102' ],
					total: 200
				},
				user: { id: '1', name: 'John Doe', email: 'john@example.com' },
				products: [
					{ id: '101', name: 'Product A', price: 100 },
					{ id: '102', name: 'Product A', price: 100 }
				]
			}			
	 */
}
