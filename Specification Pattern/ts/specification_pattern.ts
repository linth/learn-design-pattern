/**
 * Specification Pattern（規格模式）
 * 透過組合多個商務規則（Specification），以 AND、OR、NOT
 * 等邏輯運算靈活組裝篩選條件。
 * 核心概念是將每個判斷邏輯封裝成獨立的類別，並可任意組合。
 */

// ---------- 領域模型 ----------

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  inStock: boolean;
  rating: number;
}

// ---------- 抽象規格 ----------

/**
 * 抽象規格基底類別，所有具體規格與組合規格都繼承此類
 */
abstract class Specification {
  /** 判斷給定的商品是否滿足此規格 */
  abstract isSatisfiedBy(item: Product): boolean;

  /** 使用 and() 組合 AND 條件 */
  and(other: Specification): Specification {
    return new AndSpecification(this, other);
  }

  /** 使用 or() 組合 OR 條件 */
  or(other: Specification): Specification {
    return new OrSpecification(this, other);
  }

  /** 使用 not() 反轉條件 */
  not(): Specification {
    return new NotSpecification(this);
  }
}

// ---------- 組合規格 ----------

/**
 * AND 組合規格：兩個規格都必須滿足
 */
class AndSpecification extends Specification {
  constructor(
    private readonly left: Specification,
    private readonly right: Specification,
  ) {
    super();
  }

  isSatisfiedBy(item: Product): boolean {
    return this.left.isSatisfiedBy(item) && this.right.isSatisfiedBy(item);
  }
}

/**
 * OR 組合規格：滿足其中一個規格即可
 */
class OrSpecification extends Specification {
  constructor(
    private readonly left: Specification,
    private readonly right: Specification,
  ) {
    super();
  }

  isSatisfiedBy(item: Product): boolean {
    return this.left.isSatisfiedBy(item) || this.right.isSatisfiedBy(item);
  }
}

/**
 * NOT 組合規格：反轉規格結果
 */
class NotSpecification extends Specification {
  constructor(private readonly spec: Specification) {
    super();
  }

  isSatisfiedBy(item: Product): boolean {
    return !this.spec.isSatisfiedBy(item);
  }
}

// ---------- 具體規格 ----------

/**
 * 價格規格：篩選價格在指定範圍內的商品
 */
class PriceSpecification extends Specification {
  constructor(
    private readonly min?: number,
    private readonly max?: number,
  ) {
    super();
  }

  isSatisfiedBy(item: Product): boolean {
    if (this.min !== undefined && item.price < this.min) return false;
    if (this.max !== undefined && item.price > this.max) return false;
    return true;
  }
}

/**
 * 分類規格：篩選指定分類的商品
 */
class CategorySpecification extends Specification {
  constructor(private readonly category: string) {
    super();
  }

  isSatisfiedBy(item: Product): boolean {
    return item.category === this.category;
  }
}

/**
 * 庫存規格：僅篩選有庫存的商品
 */
class InStockSpecification extends Specification {
  isSatisfiedBy(item: Product): boolean {
    return item.inStock;
  }
}

/**
 * 評分規格：篩選評分不低於門檻值的商品
 */
class RatingSpecification extends Specification {
  constructor(private readonly minRating: number) {
    super();
  }

  isSatisfiedBy(item: Product): boolean {
    return item.rating >= this.minRating;
  }
}

// ---------- 過濾器 ----------

/**
 * 使用 Specification 對商品清單進行過濾
 */
class ProductFilter {
  static filterBySpec(products: Product[], spec: Specification): Product[] {
    return products.filter((p) => spec.isSatisfiedBy(p));
  }
}

// ============================================================
// 使用範例
// ============================================================

const products: Product[] = [
  { id: 1, title: 'iPhone 15', price: 36000, category: '手機', inStock: true, rating: 4.8 },
  { id: 2, title: 'Galaxy S24', price: 28000, category: '手機', inStock: true, rating: 4.5 },
  { id: 3, title: 'MacBook Air', price: 32000, category: '筆電', inStock: false, rating: 4.7 },
  { id: 4, title: 'Android 平板', price: 12000, category: '平板', inStock: true, rating: 4.0 },
  { id: 5, title: 'iPad Pro', price: 35000, category: '平板', inStock: true, rating: 4.9 },
  { id: 6, title: '低價耳機', price: 500, category: '配件', inStock: true, rating: 3.2 },
];

// 情境一：篩選手機分類且價格在 25000~40000 之間的商品
const spec1 = new CategorySpecification('手機').and(new PriceSpecification(25000, 40000));
const result1 = ProductFilter.filterBySpec(products, spec1);
console.log('情境一 (手機 + 價格區間):');
result1.forEach((p) => console.log(`  - ${p.title} ($${p.price})`));
console.log();

// 情境二：篩選有庫存且評分 >= 4.5 的高評價商品
const spec2 = new InStockSpecification().and(new RatingSpecification(4.5));
const result2 = ProductFilter.filterBySpec(products, spec2);
console.log('情境二 (有庫存 + 高評分):');
result2.forEach((p) =>
  console.log(`  - ${p.title} (庫存: ${p.inStock}, 評分: ${p.rating})`),
);
console.log();

// 情境三：不屬於配件分類且價格 >= 10000 的商品
const spec3 = new CategorySpecification('配件').not().and(new PriceSpecification(10000));
const result3 = ProductFilter.filterBySpec(products, spec3);
console.log('情境三 (非配件 + 價格 >= 10000):');
result3.forEach((p) => console.log(`  - ${p.title} (${p.category}, $${p.price})`));
