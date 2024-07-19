

export interface OService<T> {
	getData(id: string): Promise<T>;
}