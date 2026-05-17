namespace FactoryExamples
{
    // ============================================================
    // 第二部分：經典範例 - 披薩店
    // ============================================================

    /// <summary>
    /// 披薩基底類別
    /// </summary>
    public abstract class Pizza
    {
        public string Name { get; protected set; } = "";
        public string Dough { get; protected set; } = "";
        public string Sauce { get; protected set; } = "";
        public List<string> Toppings { get; protected set; } = new();

        public virtual void Prepare()
        {
            Console.WriteLine($"準備 {Name}...");
            Console.WriteLine($"  - 麵糰: {Dough}");
            Console.WriteLine($"  - 醬料: {Sauce}");
            Console.WriteLine($"  - 配料: {string.Join(", ", Toppings)}");
        }

        public virtual void Bake()
        {
            Console.WriteLine($"  - 烘烤 25 分鐘");
        }

        public virtual void Cut()
        {
            Console.WriteLine($"  - 切成 8 片");
        }

        public virtual void Box()
        {
            Console.WriteLine($"  - 裝入紙盒");
        }

        public virtual string GetDescription()
        {
            return $"{Name} (${GetPrice():N0})";
        }

        public virtual decimal GetPrice()
        {
            return 100m;
        }
    }

    /// <summary>
    /// 具體披薩 - 紐約起司披薩
    /// </summary>
    public class NYCheesePizza : Pizza
    {
        public NYCheesePizza()
        {
            Name = "紐約起司披薩";
            Dough = "薄皮";
            Sauce = "番茄醬";
            Toppings = new List<string> { "起司", "Mozzarella" };
        }

        public override decimal GetPrice() => 150m;
    }

    /// <summary>
    /// 具體披薩 - 紐約義式臘腸披薩
    /// </summary>
    public class NYPepperoniPizza : Pizza
    {
        public NYPepperoniPizza()
        {
            Name = "紐約義式臘腸披薩";
            Dough = "薄皮";
            Sauce = "番茄醬";
            Toppings = new List<string> { "義式臘腸", "起司", "Mozzarella" };
        }

        public override decimal GetPrice() => 180m;
    }

    /// <summary>
    /// 具體披薩 - 芝加哥起司披薩
    /// </summary>
    public class ChicagoCheesePizza : Pizza
    {
        public ChicagoCheesePizza()
        {
            Name = "芝加哥起司披薩";
            Dough = "厚皮";
            Sauce = "番茄醬";
            Toppings = new List<string> { "起司", "Extra Mozzarella" };
        }

        public override void Cut()
        {
            Console.WriteLine($"  - 切成正方形");
        }

        public override decimal GetPrice() => 170m;
    }

    /// <summary>
    /// 具體披薩 - 芝加哥海鮮披薩
    /// </summary>
    public class ChicagoSeafoodPizza : Pizza
    {
        public ChicagoSeafoodPizza()
        {
            Name = "芝加哥海鮮披薩";
            Dough = "厚皮";
            Sauce = "白醬";
            Toppings = new List<string> { "蝦子", "花枝", "魷魚", "起司" };
        }

        public override void Cut()
        {
            Console.WriteLine($"  - 切成正方形");
        }

        public override decimal GetPrice() => 220m;
    }

    /// <summary>
    /// 具體披薩 - 加州素食披薩
    /// </summary>
    public class CaliforniaVeggiePizza : Pizza
    {
        public CaliforniaVeggiePizza()
        {
            Name = "加州素食披薩";
            Dough = "全麥皮";
            Sauce = "羅勒醬";
            Toppings = new List<string> { "茄子", "櫛瓜", "甜椒", "洋菇" };
        }

        public override decimal GetPrice() => 160m;
    }

    /// <summary>
    /// 披薩店抽象類別 - 定義工廠方法
    /// </summary>
    public abstract class PizzaStore
    {
        /// <summary>
        /// 工廠方法 - 子類別實作具體的建立邏輯
        /// </summary>
        protected abstract Pizza CreatePizza(string type);

        /// <summary>
        /// 訂單披薩的服務方法
        /// </summary>
        public Pizza OrderPizza(string type)
        {
            Pizza pizza = CreatePizza(type);

            Console.WriteLine("--- 建立披薩訂單 ---");
            pizza.Prepare();
            pizza.Bake();
            pizza.Cut();
            pizza.Box();

            return pizza;
        }
    }

    /// <summary>
    /// 紐約披薩店 - 實作工廠方法
    /// </summary>
    public class NYPizzaStore : PizzaStore
    {
        protected override Pizza CreatePizza(string type)
        {
            return type.ToLower() switch
            {
                "cheese" => new NYCheesePizza(),
                "pepperoni" => new NYPepperoniPizza(),
                _ => throw new ArgumentException($"不支援的披薩類型: {type}")
            };
        }
    }

    /// <summary>
    /// 芝加哥披薩店 - 實作工廠方法
    /// </summary>
    public class ChicagoPizzaStore : PizzaStore
    {
        protected override Pizza CreatePizza(string type)
        {
            return type.ToLower() switch
            {
                "cheese" => new ChicagoCheesePizza(),
                "seafood" => new ChicagoSeafoodPizza(),
                _ => throw new ArgumentException($"不支援的披薩類型: {type}")
            };
        }
    }

    /// <summary>
    /// 加州披薩店 - 實作工廠方法
    /// </summary>
    public class CaliforniaPizzaStore : PizzaStore
    {
        protected override Pizza CreatePizza(string type)
        {
            return type.ToLower() switch
            {
                "veggie" => new CaliforniaVeggiePizza(),
                "cheese" => new NYCheesePizza(), // 使用紐約配方
                _ => throw new ArgumentException($"不支援的披薩類型: {type}")
            };
        }
    }

    /// <summary>
    /// 披薩店範例執行
    /// </summary>
    public static class PizzaStore
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("2. 經典範例 - 披薩店 (Factory Method)");
            Console.WriteLine("=".PadRight(60, '='));

            // 建立不同地區的披薩店
            var nyStore = new NYPizzaStore();
            var chicagoStore = new ChicagoPizzaStore();
            var californiaStore = new CaliforniaPizzaStore();

            Console.WriteLine("\n🍕 客戶在紐約披薩店訂購:");
            var nyPizza = nyStore.OrderPizza("cheese");
            Console.WriteLine($"   訂單: {nyPizza.GetDescription()}");

            Console.WriteLine("\n🍕 客戶在芝加哥披薩店訂購:");
            var chicagoPizza = chicagoStore.OrderPizza("cheese");
            Console.WriteLine($"   訂單: {chicagoPizza.GetDescription()}");

            Console.WriteLine("\n🍕 客戶在加州披薩店訂購:");
            var californiaPizza = californiaStore.OrderPizza("veggie");
            Console.WriteLine($"   訂單: {californiaPizza.GetDescription()}");

            Console.WriteLine("\n🎯 重點說明：");
            Console.WriteLine("   1. PizzaStore 是創建者類別，定義工廠方法");
            Console.WriteLine("   2. CreatePizza 是抽象工廠方法，由子類別實作");
            Console.WriteLine("   3. 每個地區的披薩店建立不同風味的披薩");
            Console.WriteLine("   4. 開放封閉原則：新增披薩店不需要修改現有程式碼");
            Console.WriteLine("   5. 依賴倒轉原則：依賴抽象 (Pizza) 而非具體 (NYPizza)");
        }
    }
}