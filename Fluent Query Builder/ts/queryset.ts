interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

interface AggregateResult {
  sum: number;
  avg: number | null;
  max: number | null;
  min: number | null;
}

class QuerySet<T> {
  constructor(private data: T[]) {}

  filter(predicate: (item: T) => boolean): QuerySet<T> {
    return new QuerySet(this.data.filter(predicate));
  }

  exclude(predicate: (item: T) => boolean): QuerySet<T> {
    return new QuerySet(this.data.filter((item) => !predicate(item)));
  }

  search(fields: Record<string, string>): QuerySet<T> {
    return new QuerySet(
      this.data.filter((item) => {
        for (const [field, keyword] of Object.entries(fields)) {
          const value = (item as Record<string, unknown>)[field];
          if (value == null || !String(value).toLowerCase().includes(keyword.toLowerCase())) {
            return false;
          }
        }
        return true;
      }),
    );
  }

  toList(): T[] {
    return [...this.data];
  }

  first(): T | undefined {
    return this.data[0];
  }

  count(): number {
    return this.data.length;
  }

  aggregate(field: keyof T & string): AggregateResult {
    const values = this.data
      .map((item) => Number((item as Record<string, unknown>)[field] ?? 0))
      .filter((v) => !isNaN(v));

    if (values.length === 0) {
      return { sum: 0, avg: null, max: null, min: null };
    }

    return {
      sum: values.reduce((a, b) => a + b, 0),
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      max: Math.max(...values),
      min: Math.min(...values),
    };
  }

  paginate(page: number = 1, pageSize: number = 20): PaginatedResult<T> {
    const total = this.data.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    const items = this.data.slice(start, start + pageSize);
    return {
      items,
      total,
      page,
      pageSize,
      totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages,
    };
  }
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: 1, name: 'iPhone 15', category: '手機', price: 36000, inStock: true },
  { id: 2, name: 'Galaxy S24', category: '手機', price: 28000, inStock: true },
  { id: 3, name: 'MacBook Air', category: '筆電', price: 32000, inStock: false },
  { id: 4, name: 'Android 平板', category: '平板', price: 12000, inStock: true },
  { id: 5, name: 'iPad Pro', category: '平板', price: 35000, inStock: true },
  { id: 6, name: 'AirPods', category: '配件', price: 6000, inStock: true },
  { id: 7, name: '機械鍵盤', category: '配件', price: 4500, inStock: false },
  { id: 8, name: 'Galaxy Tab', category: '平板', price: 15000, inStock: true },
];

const qs = new QuerySet(products);

console.log('=== 情境一：過濾 + 統計 ===');
const result = qs
  .filter((p) => p.inStock)
  .filter((p) => p.price >= 10000)
  .search({ name: 'Galaxy' });
console.log('符合條件的商品:', result.toList().map((p) => p.name));
console.log('筆數:', result.count());
console.log('價格統計:', result.aggregate('price'));

console.log('\n=== 情境二：分頁 ===');
const page1 = qs.paginate(1, 3);
console.log(`第 ${page1.page}/${page1.totalPages} 頁（共 ${page1.total} 筆）:`);
page1.items.forEach((p) => console.log(`  - ${p.name} ($${p.price})`));

console.log('\n=== 情境三：排除 + 搜尋 ===');
const result2 = qs
  .exclude((p) => !p.inStock)
  .search({ category: '平板' });
console.log('有庫存的平板:', result2.toList().map((p) => p.name));

console.log('\n=== 情境四：first() ===');
const first = qs.filter((p) => p.price > 30000).first();
console.log(`價格超過 30000 的第一筆: ${first?.name ?? '無'}`);

export {};
