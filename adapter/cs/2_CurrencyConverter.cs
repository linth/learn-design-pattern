namespace AdapterExamples
{
    // ============================================================
    // 第二部分：電子商務幣別轉換範例
    // ============================================================

    /// <summary>
    /// 現有的 TWD 金額計算系統 (無法修改)
    /// </summary>
    public class TWDCalculator
    {
        /// <summary>
        /// 計算最終金額 (僅支援 TWD)
        /// </summary>
        /// <param name="amount">金額</param>
        /// <param name="productType">商品類型: normal, electronic, imported</param>
        /// <returns>計算後的金額</returns>
        public decimal Calculate(decimal amount, string productType = "normal")
        {
            decimal rate = productType switch
            {
                "electronic" => 1.05m,  // 電子產品加 5% 稅
                "imported" => 1.10m,    // 進口商品加 10% 關稅
                _ => 1.0m
            };
            return Math.Round(amount * rate, 2);
        }
    }

    /// <summary>
    /// 目標介面 - 客戶端期望的多幣別計算介面
    /// </summary>
    public interface ICurrencyCalculator
    {
        /// <summary>
        /// 計算多幣別金額
        /// </summary>
        CurrencyResult Calculate(decimal amount, string currency, string productType = "normal");
    }

    /// <summary>
    /// 計算結果
    /// </summary>
    public record CurrencyResult(
        decimal OriginalAmount,
        string OriginalCurrency,
        decimal TWDAmount,
        string ProductType,
        bool TaxIncluded,
        decimal FinalAmount,
        string FinalCurrency,
        decimal ExchangeRate
    );

    /// <summary>
    /// 幣別轉接器 - 將 TWD 計算機轉換成多幣別支援
    /// </summary>
    public class CurrencyAdapter : ICurrencyCalculator
    {
        private readonly TWDCalculator _twdCalculator;

        // 匯率表 (實際應用會從 API 獲取)
        private static readonly Dictionary<string, decimal> ExchangeRates = new()
        {
            { "USD", 31.5m },
            { "EUR", 34.2m },
            { "JPY", 0.21m },
            { "CNY", 4.35m },
            { "GBP", 39.8m },
            { "TWD", 1.0m }
        };

        public CurrencyAdapter(TWDCalculator twdCalculator)
        {
            _twdCalculator = twdCalculator;
        }

        public CurrencyResult Calculate(decimal amount, string currency, string productType = "normal")
        {
            // 1. 將輸入金額轉換為 TWD
            decimal twdAmount = ConvertToTWD(amount, currency);

            // 2. 使用原有的 TWD 計算系統
            decimal twdResult = _twdCalculator.Calculate(twdAmount, productType);

            // 3. 將結果轉換回目標幣別
            decimal finalAmount = ConvertFromTWD(twdResult, currency);

            // 4. 回傳結果
            return new CurrencyResult(
                OriginalAmount: amount,
                OriginalCurrency: currency,
                TWDAmount: twdAmount,
                ProductType: productType,
                TaxIncluded: true,
                FinalAmount: finalAmount,
                FinalCurrency: currency,
                ExchangeRate: ExchangeRates.GetValueOrDefault(currency, 1.0m)
            );
        }

        private decimal ConvertToTWD(decimal amount, string currency)
        {
            decimal rate = ExchangeRates.GetValueOrDefault(currency, 1.0m);
            return amount * rate;
        }

        private decimal ConvertFromTWD(decimal twdAmount, string currency)
        {
            if (currency == "TWD") return twdAmount;
            decimal rate = ExchangeRates.GetValueOrDefault(currency, 1.0m);
            return Math.Round(twdAmount / rate, 2);
        }
    }

    /// <summary>
    /// 幣別轉換範例執行
    /// </summary>
    public static class CurrencyConverter
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("2. 電子商務幣別轉換範例");
            Console.WriteLine("=".PadRight(60, '='));

            // 建立原有的 TWD 計算系統
            var twdCalculator = new TWDCalculator();

            // 建立轉接器
            var currencyAdapter = new CurrencyAdapter(twdCalculator);

            // 展示不同幣別的轉換結果
            decimal basePrice = 10000m; // TWD 10000
            string[] currencies = { "TWD", "USD", "EUR", "JPY", "CNY", "GBP" };

            Console.WriteLine($"\n📊 基礎金額: TWD {basePrice:N0} 元 (電子產品)");
            Console.WriteLine("-".PadRight(50, '-'));

            foreach (var curr in currencies)
            {
                var result = currencyAdapter.Calculate(basePrice, curr, "electronic");
                Console.WriteLine($"  {curr,-4} {result.FinalAmount,10:N2} {curr,-3}  (匯率: {result.ExchangeRate})");
            }

            // 展示訂單摘要
            Console.WriteLine("\n📦 訂單範例:");
            Console.WriteLine("-".PadRight(50, '-'));

            var items = new[]
            {
                new { Name = "iPhone 15", Price = 999.00m, Type = "electronic", Currency = "USD" },
                new { Name = "Nike 運動鞋", Price = 150.00m, Type = "normal", Currency = "EUR" },
                new { Name = "Sony 耳機", Price = 25000m, Type = "electronic", Currency = "JPY" },
                new { Name = "台灣鳳梨酥", Price = 580m, Type = "normal", Currency = "TWD" }
            };

            decimal total = 0;
            foreach (var item in items)
            {
                var result = currencyAdapter.Calculate(item.Price, item.Currency, item.Type);
                Console.WriteLine($"  {item.Name,-15} {item.Price,8:N2} {item.Currency,-3} → {result.FinalAmount,8:N2} {item.Currency}");
                total += result.FinalAmount;
            }

            Console.WriteLine($"  {'總計',-15} {total,17:N2} TWD");

            Console.WriteLine("\n🎯 重點說明：");
            Console.WriteLine("   1. 原有 TWDCalculator 完全不需要修改");
            Console.WriteLine("   2. CurrencyAdapter 處理多幣別轉換");
            Console.WriteLine("   3. 客戶端只需要知道 ICurrencyCalculator 介面");
        }
    }
}