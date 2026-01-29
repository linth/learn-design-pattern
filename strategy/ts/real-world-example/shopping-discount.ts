/**
 * 策略模式 (Strategy Design Pattern)
 * 
 * 核心概念：
 * 1. 定義一系列演算法（如：不同折扣邏輯），並將每一種演算法封裝起來。
 * 2. 使這些演算法可以互換，且演算法的變化不會影響到使用它的客戶端。
 * 3. 解決大量的 if-else 或 switch-case 問題，讓代碼符合「開閉原則」(OCP)。
 * 
 * 
 * interface 
 *  - Order
 *  - DiscountStrategy
 * 
 * 具體策略實作 (Concrete Strategies) from DiscountStrategy
 *    - NoDiscount (策略 1)
 *    - PercentageDiscount (策略 2)
 *    - VoucherDiscount (策略 3)
 *    - TieredDiscount (策略 4)
 * 
 * PriceCalculator - 環境類別 Context, 價格計算器
 * 
 */

{
  /**
   * [資料物件]：訂單資訊
   */
  interface Order {
    readonly id: string;
    readonly amount: number;
  }

  /**
   * [策略介面]：折扣演算法的統一規範
   * 任何新的折扣方式只要實作這個介面，就能被系統無縫使用。
   */
  interface DiscountStrategy {
    calculate(order: Order): number;
  }

  // --- 具體策略實作 (Concrete Strategies) ---

  /** 
   * 策略 1：無折扣 (原價) 
   */
  class NoDiscount implements DiscountStrategy {
    calculate(order: Order): number {
      return order.amount;
    }
  }

  /** 
   * 策略 2：固定比例折扣 (例如：八折)
   */
  class PercentageDiscount implements DiscountStrategy {
    constructor(private readonly rate: number) { } // rate: 0.8 代表八折

    calculate(order: Order): number {
      return order.amount * this.rate;
    }
  }

  /** 
   * 策略 3：滿減優惠卷 (例如：滿 1000 折 200)
   */
  class VoucherDiscount implements DiscountStrategy {
    constructor(
      private readonly threshold: number,
      private readonly discountAmount: number
    ) { }

    calculate(order: Order): number {
      if (order.amount >= this.threshold) {
        return Math.max(0, order.amount - this.discountAmount);
      }
      return order.amount;
    }
  }

  /**
   * 策略 4：易擴充性演示 - 階梯式折扣
   * 這是新增加的功能，完全不需要修改原本的類別，只需新增一個實體即可。
   */
  class TieredDiscount implements DiscountStrategy {
    calculate(order: Order): number {
      if (order.amount > 2000) return order.amount * 0.7; // 超過 2000 打七折
      if (order.amount > 1000) return order.amount * 0.8; // 超過 1000 打八折
      return order.amount * 0.9;                         // 基本九折
    }
  }

  /**
   * [環境類別 Context]：價格計算器
   * 負責使用特定的策略來計算價格。它不需要知道折扣的具體算式，
   * 只需要呼叫 `calculate` 即可。
   */
  class PriceCalculator {
    private strategy: DiscountStrategy;

    constructor(initialStrategy: DiscountStrategy = new NoDiscount()) {
      this.strategy = initialStrategy;
    }

    /** 隨時切換折扣策略 (動態變換) */
    setStrategy(strategy: DiscountStrategy) {
      this.strategy = strategy;
    }

    /** 執行計算 */
    calculatePrice(order: Order): number {
      console.log(`[Calculator] 目前使用的折扣策略: ${this.strategy.constructor.name}`);
      const finalPrice = this.strategy.calculate(order);
      return Math.round(finalPrice * 100) / 100; // 四捨五入到兩位
    }
  }

  // --- 實作展示 ---

  const myOrder: Order = { id: "ORD-001", amount: 1200 };
  const calculator = new PriceCalculator(); // 預設無折扣

  console.log(`訂單原始金額: $${myOrder.amount}\n`);

  // 1. 使用固定比例折扣 (0.75 折)
  calculator.setStrategy(new PercentageDiscount(0.75));
  console.log(`應付金額: $${calculator.calculatePrice(myOrder)}\n`);

  // 2. 切換為優惠卷折扣 (滿 1000 折 300)
  calculator.setStrategy(new VoucherDiscount(1000, 300));
  console.log(`應付金額: $${calculator.calculatePrice(myOrder)}\n`);

  // 3. 切換為全新的階梯折扣 (不需修改 Calculator 原始碼)
  calculator.setStrategy(new TieredDiscount());
  const bigOrder: Order = { id: "ORD-999", amount: 2500 };
  console.log(`大訂單金額: $${bigOrder.amount}`);
  console.log(`應付金額: $${calculator.calculatePrice(bigOrder)}`);
}

/**
 * 總結：
 * 1. 易懂：業務邏輯被拆分到獨立的 Strategy 類別中，不再是混亂的 if-else。
 * 2. 易擴充：新增折扣規則時，只需新增一個類別並實作介面，完全符合開放封閉原則。
 * 3. 靈活性：可以在運行時 (Runtime) 根據使用者等級、節日等因素動態切換計算邏輯。
 */