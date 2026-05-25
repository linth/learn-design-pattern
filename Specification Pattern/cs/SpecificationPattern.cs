namespace SpecificationPatternExamples
{
    // ============================================================
    // Specification Pattern（規格模式）
    // 透過組合多個商務規則（Specification），以 AND、OR、NOT 
    // 等邏輯運算靈活組裝篩選條件。
    // ============================================================

    // ---------- 領域模型 ----------

    /// <summary>
    /// 商品領域模型
    /// </summary>
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public decimal Price { get; set; }
        public string Category { get; set; } = "";
        public bool InStock { get; set; }
        public double Rating { get; set; }

        public override string ToString() =>
            $"{Title} (分類: {Category}, 價格: {Price:C}, 庫存: {InStock}, 評分: {Rating})";
    }

    // ---------- 抽象規格 ----------

    /// <summary>
    /// 抽象規格基底類別，所有具體規格與組合規格都繼承此類
    /// </summary>
    public abstract class Specification
    {
        /// <summary>
        /// 判斷給定的商品是否滿足此規格
        /// </summary>
        public abstract bool IsSatisfiedBy(Product item);

        /// <summary>
        /// 使用 & 運算子組合 AND 條件
        /// </summary>
        public static Specification operator &(Specification left, Specification right) =>
            new AndSpecification(left, right);

        /// <summary>
        /// 使用 | 運算子組合 OR 條件
        /// </summary>
        public static Specification operator |(Specification left, Specification right) =>
            new OrSpecification(left, right);

        /// <summary>
        /// 使用 ! 運算子反轉條件
        /// </summary>
        public static Specification operator !(Specification spec) =>
            new NotSpecification(spec);
    }

    // ---------- 組合規格 ----------

    /// <summary>
    /// AND 組合規格：兩個規格都必須滿足
    /// </summary>
    public class AndSpecification : Specification
    {
        private readonly Specification _left;
        private readonly Specification _right;

        public AndSpecification(Specification left, Specification right)
        {
            _left = left;
            _right = right;
        }

        public override bool IsSatisfiedBy(Product item) =>
            _left.IsSatisfiedBy(item) && _right.IsSatisfiedBy(item);
    }

    /// <summary>
    /// OR 組合規格：滿足其中一個規格即可
    /// </summary>
    public class OrSpecification : Specification
    {
        private readonly Specification _left;
        private readonly Specification _right;

        public OrSpecification(Specification left, Specification right)
        {
            _left = left;
            _right = right;
        }

        public override bool IsSatisfiedBy(Product item) =>
            _left.IsSatisfiedBy(item) || _right.IsSatisfiedBy(item);
    }

    /// <summary>
    /// NOT 組合規格：反轉規格結果
    /// </summary>
    public class NotSpecification : Specification
    {
        private readonly Specification _spec;

        public NotSpecification(Specification spec)
        {
            _spec = spec;
        }

        public override bool IsSatisfiedBy(Product item) =>
            !_spec.IsSatisfiedBy(item);
    }

    // ---------- 具體規格 ----------

    /// <summary>
    /// 價格規格：篩選價格在指定範圍內的商品
    /// </summary>
    public class PriceSpecification : Specification
    {
        private readonly decimal? _min;
        private readonly decimal? _max;

        public PriceSpecification(decimal? min = null, decimal? max = null)
        {
            _min = min;
            _max = max;
        }

        public override bool IsSatisfiedBy(Product item)
        {
            if (_min.HasValue && item.Price < _min.Value) return false;
            if (_max.HasValue && item.Price > _max.Value) return false;
            return true;
        }
    }

    /// <summary>
    /// 分類規格：篩選指定分類的商品
    /// </summary>
    public class CategorySpecification : Specification
    {
        private readonly string _category;

        public CategorySpecification(string category)
        {
            _category = category;
        }

        public override bool IsSatisfiedBy(Product item) =>
            item.Category == _category;
    }

    /// <summary>
    /// 庫存規格：僅篩選有庫存的商品
    /// </summary>
    public class InStockSpecification : Specification
    {
        public override bool IsSatisfiedBy(Product item) =>
            item.InStock;
    }

    /// <summary>
    /// 評分規格：篩選評分不低於門檻值的商品
    /// </summary>
    public class RatingSpecification : Specification
    {
        private readonly double _minRating;

        public RatingSpecification(double minRating)
        {
            _minRating = minRating;
        }

        public override bool IsSatisfiedBy(Product item) =>
            item.Rating >= _minRating;
    }

    // ---------- 過濾器 ----------

    /// <summary>
    /// 使用 Specification 對商品清單進行過濾
    /// </summary>
    public static class ProductFilter
    {
        public static List<Product> FilterBySpec(IEnumerable<Product> products, Specification spec) =>
            products.Where(p => spec.IsSatisfiedBy(p)).ToList();
    }

    // ---------- 範例執行 ----------

    public static class SpecificationPatternDemo
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("Specification Pattern 設計模式 範例");
            Console.WriteLine("=".PadRight(60, '='));

            // 準備測試商品資料
            var products = new List<Product>
            {
                new() { Id = 1, Title = "iPhone 15", Price = 36000, Category = "手機", InStock = true, Rating = 4.8 },
                new() { Id = 2, Title = "Galaxy S24", Price = 28000, Category = "手機", InStock = true, Rating = 4.5 },
                new() { Id = 3, Title = "MacBook Air", Price = 32000, Category = "筆電", InStock = false, Rating = 4.7 },
                new() { Id = 4, Title = "Android 平板", Price = 12000, Category = "平板", InStock = true, Rating = 4.0 },
                new() { Id = 5, Title = "iPad Pro", Price = 35000, Category = "平板", InStock = true, Rating = 4.9 },
                new() { Id = 6, Title = "低價耳機", Price = 500, Category = "配件", InStock = true, Rating = 3.2 },
            };

            // 情境一：篩選手機分類且價格在 25000~40000 之間的商品
            var spec1 = new CategorySpecification("手機") & new PriceSpecification(25000, 40000);
            var result1 = ProductFilter.FilterBySpec(products, spec1);
            Console.WriteLine("\n📋 情境一 (手機 + 價格區間):");
            foreach (var p in result1)
                Console.WriteLine($"   - {p.Title} ({p.Price:C})");

            // 情境二：篩選有庫存且評分 >= 4.5 的高評價商品
            var spec2 = new InStockSpecification() & new RatingSpecification(4.5);
            var result2 = ProductFilter.FilterBySpec(products, spec2);
            Console.WriteLine("\n📋 情境二 (有庫存 + 高評分):");
            foreach (var p in result2)
                Console.WriteLine($"   - {p.Title} (庫存: {p.InStock}, 評分: {p.Rating})");

            // 情境三：不屬於配件分類且價格 >= 10000 的商品
            var spec3 = !new CategorySpecification("配件") & new PriceSpecification(10000, null);
            var result3 = ProductFilter.FilterBySpec(products, spec3);
            Console.WriteLine("\n📋 情境三 (非配件 + 價格 >= 10000):");
            foreach (var p in result3)
                Console.WriteLine($"   - {p.Title} ({p.Category}, {p.Price:C})");
        }
    }
}
