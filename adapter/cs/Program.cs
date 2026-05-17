// ============================================================
// C# Adapter Pattern 範例 - 入口程式
// ============================================================

// 執行方式：
// dotnet run --project adapter/cs/adapter.csproj
// 或
// cd adapter/cs && dotnet run

namespace AdapterExamples
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=".PadRight(80, '='));
            Console.WriteLine("Adapter Pattern - C# 範例集");
            Console.WriteLine("=".PadRight(80, '='));

            // 執行所有範例
            BasicConcept.Run();
            CurrencyConverter.Run();
            PaymentGateway.Run();
            LegacySystem.Run();
            SensorAdapter.Run();

            Console.WriteLine("\n所有範例執行完成！");
        }
    }
}