namespace BuilderExamples
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=".PadRight(80, '='));
            Console.WriteLine("Builder Pattern - C# 範例集");
            Console.WriteLine("=".PadRight(80, '='));

            // 執行所有範例
            ComputerBuilder.Run();
            NotificationBuilder.Run();
            QueryBuilder.Run();
            PizzaBuilder.Run();
            DocumentBuilder.Run();

            Console.WriteLine("\n所有範例執行完成！");
        }
    }
}