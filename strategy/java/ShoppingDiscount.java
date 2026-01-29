/**
 * 策略模式 (Strategy Design Pattern)
 * 
 * 核心概念：
 * 1. 定義一系列演算法（如：不同折扣邏輯），並將每一種演算法封裝起來。
 * 2. 使這些演算法可以互換，且演算法的變化不會影響到使用它的客戶端。
 * 3. 解決大量的 if-else 或 switch-case 問題，讓代碼符合「開閉原則」(OCP)。
 */

// 實作展示 (主類別放在最前面，以支援 java 直接執行 .java 檔案)
public class ShoppingDiscount {
  public static void main(String[] args) {
    Order myOrder = new Order("ORD-001", 1200);
    PriceCalculator calculator = new PriceCalculator(); // 預設無折扣

    System.out.printf("訂單原始金額: $%.2f%n%n", myOrder.getAmount());

    // 1. 使用固定比例折扣 (0.75 折)
    calculator.setStrategy(new PercentageDiscount(0.75));
    System.out.printf("應付金額: $%.2f%n%n", calculator.calculatePrice(myOrder));

    // 2. 切換為優惠卷折扣 (滿 1000 折 300)
    calculator.setStrategy(new VoucherDiscount(1000, 300));
    System.out.printf("應付金額: $%.2f%n%n", calculator.calculatePrice(myOrder));

    // 3. 切換為全新的階梯折扣 (不需修改 Calculator 原始碼)
    calculator.setStrategy(new TieredDiscount());
    Order bigOrder = new Order("ORD-999", 2500);
    System.out.printf("大訂單金額: $%.2f%n", bigOrder.getAmount());
    System.out.printf("應付金額: $%.2f%n", calculator.calculatePrice(bigOrder));
  }
}

// [資料物件]：訂單資訊
class Order {
  private final String id;
  private final double amount;

  public Order(String id, double amount) {
    this.id = id;
    this.amount = amount;
  }

  public String getId() {
    return id;
  }

  public double getAmount() {
    return amount;
  }
}

// [策略介面]：折扣演算法的統一規範
interface DiscountStrategy {
  double calculate(Order order);
}

// --- 具體策略實作 (Concrete Strategies) ---

// 策略 1：無折扣 (原價)
class NoDiscount implements DiscountStrategy {
  @Override
  public double calculate(Order order) {
    return order.getAmount();
  }
}

// 策略 2：固定比例折扣 (例如：八折)
class PercentageDiscount implements DiscountStrategy {
  private final double rate;

  public PercentageDiscount(double rate) {
    this.rate = rate; // rate: 0.8 代表八折
  }

  @Override
  public double calculate(Order order) {
    return order.getAmount() * this.rate;
  }
}

// 策略 3：滿減優惠卷 (例如：滿 1000 折 200)
class VoucherDiscount implements DiscountStrategy {
  private final double threshold;
  private final double discountAmount;

  public VoucherDiscount(double threshold, double discountAmount) {
    this.threshold = threshold;
    this.discountAmount = discountAmount;
  }

  @Override
  public double calculate(Order order) {
    if (order.getAmount() >= this.threshold) {
      return Math.max(0, order.getAmount() - this.discountAmount);
    }
    return order.getAmount();
  }
}

// 策略 4：易擴充性演示 - 階梯式折扣
class TieredDiscount implements DiscountStrategy {
  @Override
  public double calculate(Order order) {
    double amount = order.getAmount();
    if (amount > 2000)
      return amount * 0.7; // 超過 2000 打七折
    if (amount > 1000)
      return amount * 0.8; // 超過 1000 打八折
    return amount * 0.9; // 基本九折
  }
}

// [環境類別 Context]：價格計算器
class PriceCalculator {
  private DiscountStrategy strategy;

  public PriceCalculator() {
    this.strategy = new NoDiscount();
  }

  public void setStrategy(DiscountStrategy strategy) {
    this.strategy = strategy;
  }

  public double calculatePrice(Order order) {
    System.out.println("[Calculator] 目前使用的折扣策略: " + this.strategy.getClass().getSimpleName());
    double finalPrice = this.strategy.calculate(order);
    return Math.round(finalPrice * 100.0) / 100.0; // 四捨五入到兩位
  }
}

/**
 * 總結：
 * 1. 易懂：業務邏輯被拆分到獨立的 Strategy 類別中，不再是混亂的 if-else。
 * 2. 易擴充：新增折扣規則時，只需新增一個類別並實作介面，完全符合開放封閉原則。
 * 3. 靈活性：可以在運行時 (Runtime) 根據使用者等級、節日等因素動態切換計算邏輯。
 */
