import { OService } from "./OService";


export interface User {
	id: string;
	name: string;
	email: string;
}


export class UserService implements OService<User> {
	async getData(userId: string): Promise<User> {
		return new Promise((resolve) => {
			setTimeout(() => resolve({
				id: userId, 
				name: 'John Doe', 
				email: 'john@example.com'
			}), 100);
		})
	}
}