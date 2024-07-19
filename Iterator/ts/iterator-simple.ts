/**
 * Iterator design pattern.
 * 
 * 
 * Reference:
 * 	- https://blog.stackademic.com/10-of-the-most-used-design-patterns-in-typescript-0dd52a16db99
 */

{

	// 疊代器
	interface Iterator<T> {
		next(): T;
		hasNext(): boolean;
	}

	// 聚合器
	interface Aggregator {
		createIterator(): Iterator<string>;
	}



	class ConcreteIterator implements Iterator<string> {
		private collection: string[];
		private postition: number = 0;

		constructor(collection: string[]) {
			this.collection = collection;
		}

		next(): string {
			const result = this.collection[this.postition];
			this.postition += 1;
			return result;
		}

		hasNext(): boolean {
			return this.postition < this.collection.length;
		}
	}


	class ConcreteAggregator implements Aggregator {
		private collection: string[] = [];

		constructor(collection: string[]) {
			this.collection = collection;
		}

		createIterator(): Iterator<string> {
			return new ConcreteIterator(this.collection);
		}
	}

	const cities = [
		"Taipei", 
		"New York", 
		"Tokyo", 
		"Paris", 
		"London"
	];
  const aggregator = new ConcreteAggregator(cities);
  const iterator = aggregator.createIterator();

	while (iterator.hasNext()) {
		console.log(iterator.next());
	}
}

