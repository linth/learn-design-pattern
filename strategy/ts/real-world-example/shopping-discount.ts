/**
 * 策略模式 (Strategy Design Pattern) - 購物折扣範例
 *
 * 核心概念：
 * 1. 定義一系列演算法（如：不同折扣邏輯），並將每一種演算法封裝起來。
 * 2. 使這些演算法可以互換，且演算法的變化不會影響到使用它的客戶端。
 * 3. 解決大量的 if-else 或 switch-case 問題，讓程式碼符合開閉原則 (OCP)。
 *
 * 結構：
 *   - Order: 訂單資料物件
 *   - DiscountStrategy: 折扣策略介面
 *   - NoDiscount / PercentageDiscount / VoucherDiscount / TieredDiscount: 具體策略
 *   - PriceCalculator: 環境類別，負責使用策略計算價格
 */

{
  /** [資料物件] 訂單資訊 */
  interface Order {
    readonly id: string;
    readonly amount: number;
  }

  /** [策略介面] 折扣演算法的統一規範 */
  interface DiscountStrategy {
    calculate(order: Order): number;
  }

  // --- 具體策略實作 ---

  /** 策略 1：無折扣（原價） */
  class NoDiscount implements DiscountStrategy {
    calculate(order: Order): number {
      return order.amount;
    }
  }

  /** 策略 2：固定比例折扣（例如 rate=0.8 代表八折） */
  class PercentageDiscount implements DiscountStrategy {
    constructor(private readonly rate: number) {}

    calculate(order: Order): number {
      return order.amount * this.rate;
    }
  }

  /** 策略 3：滿減優惠券（滿 threshold 折 discountAmount） */
  class VoucherDiscount implements DiscountStrategy {
    constructor(
      private readonly threshold: number,
      private readonly discountAmount: number,
    ) {}

    calculate(order: Order): number {
      if (order.amount >= this.threshold) {
        return Math.max(0, order.amount - this.discountAmount);
      }
      return order.amount;
    }
  }

  /** 策略 4：階梯式折扣（新增此策略不需修改任何既有類別） */
  class TieredDiscount implements DiscountStrategy {
    calculate(order: Order): number {
      if (order.amount > 2000) return order.amount * 0.7;
      if (order.amount > 1000) return order.amount * 0.8;
      return order.amount * 0.9;
    }
  }

  /** [環境類別 Context] 價格計算器，可在執行時期動態切換折扣策略 */
  class PriceCalculator {
    private strategy: DiscountStrategy;

    constructor(initialStrategy: DiscountStrategy = new NoDiscount()) {
      this.strategy = initialStrategy;
    }

    /** 動態切換折扣策略 */
    setStrategy(strategy: DiscountStrategy): void {
      this.strategy = strategy;
    }

    /** 執行計算 */
    calculatePrice(order: Order): number {
      console.log(`[Calculator] 目前使用的折扣策略: ${this.strategy.constructor.name}`);
      return Math.round(this.strategy.calculate(order) * 100) / 100;
    }
  }

  // --- 展示 ---

  const myOrder: Order = { id: 'ORD-001', amount: 1200 };
  const calculator = new PriceCalculator();

  console.log(`訂單原始金額: $${myOrder.amount}\n`);

  // 1. 使用固定比例折扣
  calculator.setStrategy(new PercentageDiscount(0.75));
  console.log(`應付金額: $${calculator.calculatePrice(myOrder)}\n`);

  // 2. 切換為滿減優惠券
  calculator.setStrategy(new VoucherDiscount(1000, 300));
  console.log(`應付金額: $${calculator.calculatePrice(myOrder)}\n`);

  // 3. 切換為階梯折扣
  calculator.setStrategy(new TieredDiscount());
  const bigOrder: Order = { id: 'ORD-999', amount: 2500 };
  console.log(`大訂單金額: $${bigOrder.amount}`);
  console.log(`應付金額: $${calculator.calculatePrice(bigOrder)}`);
}

/**
 * 總結：
 * 1. 業務邏輯被拆分到獨立的 Strategy 類別中，不再混亂的 if-else。
 * 2. 新增折扣規則時，只需新增類別並實作介面，符合 OCP。
 * 3. 可在執行時期動態切換策略。
 */
