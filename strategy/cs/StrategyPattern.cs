namespace StrategyExamples
{
    // ============================================================
    // 策略模式 (Strategy Design Pattern)
    //
    // 核心概念：
    // 1. 定義一系列演算法，將每一種演算法封裝成獨立類別。
    // 2. 使這些演算法可以互換，且演算法的變化不會影響客戶端。
    // 3. 解決大量的 if-else / switch-case，符合開閉原則 (OCP)。
    // ============================================================

    // [資料物件] 訂單資訊
    public class Order
    {
        public string Id { get; }
        public double Amount { get; }

        public Order(string id, double amount)
        {
            Id = id;
            Amount = amount;
        }
    }

    // [策略介面] 折扣演算法的統一規範
    public interface IDiscountStrategy
    {
        double Calculate(Order order);
    }

    // --- 具體策略實作 ---

    /// <summary>
    /// 策略 1：無折扣（原價）
    /// </summary>
    public class NoDiscount : IDiscountStrategy
    {
        public double Calculate(Order order) => order.Amount;
    }

    /// <summary>
    /// 策略 2：固定比例折扣（例如 rate=0.8 代表八折）
    /// </summary>
    public class PercentageDiscount : IDiscountStrategy
    {
        private readonly double _rate;

        public PercentageDiscount(double rate)
        {
            _rate = rate;
        }

        public double Calculate(Order order) => order.Amount * _rate;
    }

    /// <summary>
    /// 策略 3：滿減優惠券（滿 threshold 折 discountAmount）
    /// </summary>
    public class VoucherDiscount : IDiscountStrategy
    {
        private readonly double _threshold;
        private readonly double _discountAmount;

        public VoucherDiscount(double threshold, double discountAmount)
        {
            _threshold = threshold;
            _discountAmount = discountAmount;
        }

        public double Calculate(Order order)
        {
            return order.Amount >= _threshold
                ? Math.Max(0, order.Amount - _discountAmount)
                : order.Amount;
        }
    }

    /// <summary>
    /// 策略 4：階梯式折扣（易擴充性展示）
    /// 新增策略不需修改任何既有程式碼，符合 OCP。
    /// </summary>
    public class TieredDiscount : IDiscountStrategy
    {
        public double Calculate(Order order)
        {
            if (order.Amount > 2000) return order.Amount * 0.7;  // 超過 2000 打七折
            if (order.Amount > 1000) return order.Amount * 0.8;  // 超過 1000 打八折
            return order.Amount * 0.9;                            // 基本九折
        }
    }

    /// <summary>
    /// [環境類別 Context] 價格計算器
    /// 負責使用特定的折扣策略來計算價格，可在執行時期動態切換策略。
    /// </summary>
    public class PriceCalculator
    {
        private IDiscountStrategy _strategy;

        public PriceCalculator()
        {
            _strategy = new NoDiscount();
        }

        /// <summary>
        /// 動態切換折扣策略
        /// </summary>
        public void SetStrategy(IDiscountStrategy strategy)
        {
            _strategy = strategy;
        }

        /// <summary>
        /// 執行計算，四捨五入到小數後兩位
        /// </summary>
        public double CalculatePrice(Order order)
        {
            Console.WriteLine($"[Calculator] 目前使用的折扣策略: {_strategy.GetType().Name}");
            return Math.Round(_strategy.Calculate(order), 2);
        }
    }

    // ---------- 範例執行 ----------

    public static class StrategyDemo
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("策略模式 (Strategy Pattern) 範例");
            Console.WriteLine("=".PadRight(60, '='));

            var myOrder = new Order("ORD-001", 1200);
            var calculator = new PriceCalculator();

            Console.WriteLine($"\n訂單原始金額: ${myOrder.Amount:F2}");

            // 1. 使用固定比例折扣
            calculator.SetStrategy(new PercentageDiscount(0.75));
            Console.WriteLine($"應付金額: ${calculator.CalculatePrice(myOrder):F2}");

            // 2. 切換為滿減優惠券
            calculator.SetStrategy(new VoucherDiscount(1000, 300));
            Console.WriteLine($"應付金額: ${calculator.CalculatePrice(myOrder):F2}");

            // 3. 切換為階梯折扣（不需修改 PriceCalculator 原始碼）
            calculator.SetStrategy(new TieredDiscount());
            var bigOrder = new Order("ORD-999", 2500);
            Console.WriteLine($"\n大訂單金額: ${bigOrder.Amount:F2}");
            Console.WriteLine($"應付金額: ${calculator.CalculatePrice(bigOrder):F2}");
        }
    }
}
