namespace AdapterExamples
{
    // ============================================================
    // 第一部分：基本概念示範
    // ============================================================

    /// <summary>
    /// 目標介面 (Target Interface) - 客戶端期望的介面
    /// </summary>
    public interface ITarget
    {
        string Request();
    }

    /// <summary>
    /// 被轉接者 (Adaptee) - 現有系統，介面不相容
    /// </summary>
    public class Adaptee
    {
        public string SpecificRequest()
        {
            // 反轉字串作為範例
            return "特邀列車已就緒";
        }
    }

    /// <summary>
    /// 轉接器 (Adapter) - 將 Adaptee 轉換成 Target 介面
    /// </summary>
    public class Adapter : ITarget
    {
        private readonly Adaptee _adaptee;

        public Adapter(Adaptee adaptee)
        {
            _adaptee = adaptee;
        }

        public string Request()
        {
            // 轉接邏輯：呼叫 Adaptee 的方法並轉換結果
            string result = _adaptee.SpecificRequest();
            // 將結果反轉並加上前綴
            char[] charArray = result.ToCharArray();
            Array.Reverse(charArray);
            return $"Adapter: (翻譯) {new string(charArray)}";
        }
    }

    /// <summary>
    /// 基本概念範例執行
    /// </summary>
    public static class BasicConcept
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("1. 基本概念示範");
            Console.WriteLine("=".PadRight(60, '='));

            // 建立被轉接者
            Adaptee adaptee = new();

            // 建立轉接器
            ITarget target = new Adapter(adaptee);

            // 客戶端呼叫 (只知道 Target 介面)
            Console.WriteLine($"\n客戶端呼叫: {target.Request()}");

            Console.WriteLine("\n📌 重點說明：");
            Console.WriteLine("   - Adaptee.SpecificRequest() 回傳: '特邀列車已就緒'");
            Console.WriteLine("   - Adapter.Request() 翻譯後: '緒了就列車邀特'");
            Console.WriteLine("   - 客戶端只需要知道 ITarget 介面");
        }
    }
}