namespace FactoryExamples
{
    // ============================================================
    // 第一部分：基本工廠模式
    // ============================================================

    /// <summary>
    /// 產品介面 (Product) - 所有產品的共同介面
    /// </summary>
    public interface IProduct
    {
        string GetName();
        decimal GetPrice();
        string GetDescription();
    }

    /// <summary>
    /// 具體產品 A - 具體產品實作
    /// </summary>
    public class ConcreteProductA : IProduct
    {
        public string GetName() => "產品 A";

        public decimal GetPrice() => 100m;

        public string GetDescription() => "這是產品 A 的描述";
    }

    /// <summary>
    /// 具體產品 B - 具體產品實作
    /// </summary>
    public class ConcreteProductB : IProduct
    {
        public string GetName() => "產品 B";

        public decimal GetPrice() => 200m;

        public string GetDescription() => "這是產品 B 的描述";
    }

    /// <summary>
    /// 具體產品 C - 具體產品實作
    /// </summary>
    public class ConcreteProductC : IProduct
    {
        public string GetName() => "產品 C";

        public decimal GetPrice() => 300m;

        public string GetDescription() => "這是產品 C 的描述";
    }

    /// <summary>
    /// 工廠 (Factory) - 負責建立產品物件
    /// </summary>
    public class ProductFactory
    {
        /// <summary>
        /// 建立產品的方法
        /// </summary>
        /// <param name="productType">產品類型</param>
        /// <returns>產品實例</returns>
        public static IProduct CreateProduct(string productType)
        {
            return productType.ToUpper() switch
            {
                "A" => new ConcreteProductA(),
                "B" => new ConcreteProductB(),
                "C" => new ConcreteProductC(),
                _ => throw new ArgumentException($"不支援的產品類型: {productType}")
            };
        }

        /// <summary>
        /// 使用字典建立產品的工廠方法
        /// </summary>
        public static IProduct CreateProductWithMap(string productType)
        {
            var productMap = new Dictionary<string, Func<IProduct>>
            {
                { "A", () => new ConcreteProductA() },
                { "B", () => new ConcreteProductB() },
                { "C", () => new ConcreteProductC() }
            };

            if (productMap.TryGetValue(productType.ToUpper(), out var createFunc))
            {
                return createFunc();
            }

            throw new ArgumentException($"不支援的產品類型: {productType}");
        }
    }

    /// <summary>
    /// 基本工廠模式範例執行
    /// </summary>
    public static class BasicFactory
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("1. 基本工廠模式");
            Console.WriteLine("=".PadRight(60, '='));

            // 使用靜態工廠方法建立產品
            var productA = ProductFactory.CreateProduct("A");
            var productB = ProductFactory.CreateProduct("B");
            var productC = ProductFactory.CreateProduct("C");

            Console.WriteLine($"\n📦 建立產品 A:");
            Console.WriteLine($"   名稱: {productA.GetName()}");
            Console.WriteLine($"   價格: {productA.GetPrice()}");
            Console.WriteLine($"   描述: {productA.GetDescription()}");

            Console.WriteLine($"\n📦 建立產品 B:");
            Console.WriteLine($"   名稱: {productB.GetName()}");
            Console.WriteLine($"   價格: {productB.GetPrice()}");
            Console.WriteLine($"   描述: {productB.GetDescription()}");

            Console.WriteLine($"\n📦 建立產品 C:");
            Console.WriteLine($"   名稱: {productC.GetName()}");
            Console.WriteLine($"   價格: {productC.GetPrice()}");
            Console.WriteLine($"   描述: {productC.GetDescription()}");

            // 使用字典方式建立產品
            Console.WriteLine($"\n📦 使用字典方式建立產品:");
            var productFromMap = ProductFactory.CreateProductWithMap("B");
            Console.WriteLine($"   產品 B: {productFromMap.GetName()}, 價格: {productFromMap.GetPrice()}");

            Console.WriteLine("\n🎯 重點說明：");
            Console.WriteLine("   1. 客戶端不需要知道具體產品類別");
            Console.WriteLine("   2. 建立邏輯集中在工廠類別中");
            Console.WriteLine("   3. 新增產品時只需修改工廠，不需要修改客戶端");
            Console.WriteLine("   4. 適用於需要大量建立相似物件的場景");
        }
    }
}