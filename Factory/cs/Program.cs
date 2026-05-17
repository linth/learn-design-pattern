namespace FactoryExamples
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=".PadRight(80, '='));
            Console.WriteLine("Factory Pattern - C# 範例集");
            Console.WriteLine("=".PadRight(80, '='));

            // 執行所有範例
            BasicFactory.Run();
            PizzaStore.Run();
            PaymentGateway.Run();
            DocumentFactory.Run();
            NotificationFactory.Run();

            Console.WriteLine("\n所有範例執行完成！");
        }
    }
}