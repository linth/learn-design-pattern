namespace BuilderExamples
{
    // ============================================================
    // 第四部分：披薩建構器
    // ============================================================

    /// <summary>
    /// 披薩產品 (Product)
    /// </summary>
    public class Pizza
    {
        public string Size { get; set; } = "";
        public string Dough { get; set; } = "";
        public string Sauce { get; set; } = "";
        public List<string> Toppings { get; set; } = new();
        public bool ExtraCheese { get; set; }
        public bool StuffedCrust { get; set; }

        public string GetDescription()
        {
            var desc = new System.Text.StringBuilder();
            desc.AppendLine($"🍕 {Size} 披薩");
            desc.AppendLine($"   麵糰: {Dough}");
            desc.AppendLine($"   醬料: {Sauce}");
            desc.AppendLine($"   配料: {string.Join(", ", Toppings)}");
            if (ExtraCheese) desc.AppendLine($"   額外起司: ✓");
            if (StuffedCrust) desc.AppendLine($"   餡料餅皮: ✓");
            return desc.ToString();
        }

        public decimal GetPrice()
        {
            decimal price = 0;

            // Size pricing
            price += Size switch
            {
                "大" => 500m,
                "中" => 350m,
                "小" => 200m,
                _ => 300m
            };

            // Toppings pricing
            price += Toppings.Count * 30m;
            if (ExtraCheese) price += 50m;
            if (StuffedCrust) price += 80m;

            return price;
        }
    }

    /// <summary>
    /// 披薩 Builder 介面
    /// </summary>
    public interface IPizzaBuilder
    {
        IPizzaBuilder SetSize(string size);
        IPizzaBuilder SetDough(string dough);
        IPizzaBuilder SetSauce(string sauce);
        IPizzaBuilder AddTopping(string topping);
        IPizzaBuilder AddToppings(params string[] toppings);
        IPizzaBuilder SetExtraCheese(bool extra);
        IPizzaBuilder SetStuffedCrust(bool stuffed);
        Pizza Build();
    }

    /// <summary>
    /// 具體 Builder - 經典義式披薩
    /// </summary>
    public class ItalianPizzaBuilder : IPizzaBuilder
    {
        private Pizza _pizza = new();

        public IPizzaBuilder SetSize(string size)
        {
            _pizza.Size = size;
            return this;
        }

        public IPizzaBuilder SetDough(string dough)
        {
            _pizza.Dough = dough;
            return this;
        }

        public IPizzaBuilder SetSauce(string sauce)
        {
            _pizza.Sauce = sauce;
            return this;
        }

        public IPizzaBuilder AddTopping(string topping)
        {
            _pizza.Toppings.Add(topping);
            return this;
        }

        public IPizzaBuilder AddToppings(params string[] toppings)
        {
            _pizza.Toppings.AddRange(toppings);
            return this;
        }

        public IPizzaBuilder SetExtraCheese(bool extra)
        {
            _pizza.ExtraCheese = extra;
            return this;
        }

        public IPizzaBuilder SetStuffedCrust(bool stuffed)
        {
            _pizza.StuffedCrust = stuffed;
            return this;
        }

        public Pizza Build()
        {
            // 義式披薩預設
            if (string.IsNullOrEmpty(_pizza.Dough))
                _pizza.Dough = "薄皮";
            if (string.IsNullOrEmpty(_pizza.Sauce))
                _pizza.Sauce = "番茄醬";
            if (_pizza.Toppings.Count == 0)
                _pizza.Toppings.AddRange(new[] { "新鮮羅勒", "Mozzarella", "聖女番茄" });

            return _pizza;
        }
    }

    /// <summary>
    /// 具體 Builder - 美式披薩
    /// </summary>
    public class AmericanPizzaBuilder : IPizzaBuilder
    {
        private Pizza _pizza = new();

        public IPizzaBuilder SetSize(string size)
        {
            _pizza.Size = size;
            return this;
        }

        public IPizzaBuilder SetDough(string dough)
        {
            _pizza.Dough = dough;
            return this;
        }

        public IPizzaBuilder SetSauce(string sauce)
        {
            _pizza.Sauce = sauce;
            return this;
        }

        public IPizzaBuilder AddTopping(string topping)
        {
            _pizza.Toppings.Add(topping);
            return this;
        }

        public IPizzaBuilder AddToppings(params string[] toppings)
        {
            _pizza.Toppings.AddRange(toppings);
            return this;
        }

        public IPizzaBuilder SetExtraCheese(bool extra)
        {
            _pizza.ExtraCheese = extra;
            return this;
        }

        public IPizzaBuilder SetStuffedCrust(bool stuffed)
        {
            _pizza.StuffedCrust = stuffed;
            return this;
        }

        public Pizza Build()
        {
            // 美式披薩預設
            if (string.IsNullOrEmpty(_pizza.Dough))
                _pizza.Dough = "厚皮";
            if (string.IsNullOrEmpty(_pizza.Sauce))
                _pizza.Sauce = "BBQ 醬";
            if (_pizza.Toppings.Count == 0)
                _pizza.Toppings.AddRange(new[] { "義式臘腸", "培根", "蘑菇", "青椒" });

            return _pizza;
        }
    }

    /// <summary>
    /// 披薩店 Director - 管理建構流程
    /// </summary>
    public class PizzaDirector
    {
        public Pizza BuildMargherita(IPizzaBuilder builder)
        {
            return builder
                .SetSize("大")
                .SetDough("薄皮")
                .SetSauce("番茄醬")
                .AddToppings("Mozzarella", "新鮮羅勒", "聖女番茄", "橄欖油")
                .Build();
        }

        public Pizza BuildMeatLovers(IPizzaBuilder builder)
        {
            return builder
                .SetSize("大")
                .SetDough("厚皮")
                .SetSauce("番茄醬")
                .AddToppings("義式臘腸", "培根", "火腿", "牛肉")
                .SetExtraCheese(true)
                .Build();
        }

        public Pizza BuildVeggieSupreme(IPizzaBuilder builder)
        {
            return builder
                .SetSize("中")
                .SetDough("全麥皮")
                .SetSauce("羅勒醬")
                .AddToppings("茄子", "櫛瓜", "甜椒", "洋菇", "黑橄欖", "鳳梨")
                .Build();
        }
    }

    /// <summary>
    /// 披薩建構器範例執行
    /// </summary>
    public static class PizzaBuilder
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("4. 披薩建構器");
            Console.WriteLine("=".PadRight(60, '='));

            var director = new PizzaDirector();

            // 使用 Director 建立經典披薩
            Console.WriteLine("\n🍕 範例 1 - 使用 Director 建立瑪格麗特披薩:");
            var margheritaBuilder = new ItalianPizzaBuilder();
            var margherita = director.BuildMargherita(margheritaBuilder);
            Console.WriteLine(margherita.GetDescription());
            Console.WriteLine($"   💰 價格: {margherita.GetPrice()} 元");

            // 使用 Director 建立肉食者披薩
            Console.WriteLine("\n🍕 範例 2 - 建立肉食者披薩:");
            var meatLoversBuilder = new AmericanPizzaBuilder();
            var meatLovers = director.BuildMeatLovers(meatLoversBuilder);
            Console.WriteLine(meatLovers.GetDescription());
            Console.WriteLine($"   💰 價格: {meatLovers.GetPrice()} 元");

            // 直接使用 Builder 自訂披薩
            Console.WriteLine("\n🍕 範例 3 - 自訂披薩:");
            var customPizza = new ItalianPizzaBuilder()
                .SetSize("小")
                .SetDough("薄皮")
                .SetSauce("白醬")
                .AddToppings("鮭魚", "菠菜", "洋蔥")
                .SetExtraCheese(true)
                .Build();
            Console.WriteLine(customPizza.GetDescription());
            Console.WriteLine($"   💰 價格: {customPizza.GetPrice()} 元");

            // 使用美式 Builder
            Console.WriteLine("\n🍕 範例 4 - 美式披薩:");
            var americanPizza = new AmericanPizzaBuilder()
                .SetSize("大")
                .AddTopping("夏威夷火腿")
                .AddTopping("鳳梨")
                .SetStuffedCrust(true)
                .Build();
            Console.WriteLine(americanPizza.GetDescription());
            Console.WriteLine($"   💰 價格: {americanPizza.GetPrice()} 元");

            Console.WriteLine("\n🎯 重點說明：");
            Console.WriteLine("   1. IPizzaBuilder 定義建立步驟");
            Console.WriteLine("   2. ItalianPizzaBuilder, AmericanPizzaBuilder 是具體 Builder");
            Console.WriteLine("   3. PizzaDirector 封裝建立流程");
            Console.WriteLine("   4. 可選擇不同 Builder 來建立不同風味的披薩");
            Console.WriteLine("   5. 客戶端可以自行組合或使用 Director 的預設流程");
        }
    }
}