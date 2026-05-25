namespace SOLIDExamples
{
    // ============================================================
    // 依賴反轉原則 (Dependency Inversion Principle, DIP)
    // 1. 高層模組不應依賴低層模組，兩者都應依賴抽象。
    // 2. 抽象不應依賴細節，細節應依賴抽象。
    // ============================================================

    /// <summary>
    /// 違反 DIP 的範例：Programmer 直接依賴具體的 Computer 類別
    /// </summary>
    public class DIPViolation
    {
        /// <summary>
        /// Programmer 直接依賴具體實作，難以替換或測試
        /// </summary>
        public class Programmer
        {
            private readonly Computer _computer = new();

            public void Code()
            {
                _computer.Program();
            }
        }

        public class Computer
        {
            public void Program() => Console.WriteLine("   使用電腦寫程式...");
        }
    }

    // ---------- 遵循 DIP ----------

    /// <summary>
    /// 抽象化程式設計裝置的介面，高層與低層都依賴此抽象
    /// </summary>
    public interface IProgrammable
    {
        void Program();
    }

    /// <summary>
    /// 低層模組：桌上型電腦，實作 IProgrammable
    /// </summary>
    public class DesktopComputer : IProgrammable
    {
        public void Program() => Console.WriteLine("   使用桌上型電腦寫程式...");
    }

    /// <summary>
    /// 低層模組：筆記型電腦，實作 IProgrammable
    /// </summary>
    public class Laptop : IProgrammable
    {
        public void Program() => Console.WriteLine("   使用筆記型電腦寫程式...");
    }

    /// <summary>
    /// 高層模組：程式設計師，依賴抽象 IProgrammable 而非具體類別
    /// 透過建構子注入（Constructor Injection）取得依賴
    /// </summary>
    public class Programmer
    {
        private readonly IProgrammable _device;

        // 依賴注入：由外部提供具體實作，而非內部自行建立
        public Programmer(IProgrammable device)
        {
            _device = device;
        }

        public void Code()
        {
            _device.Program();
        }
    }

    public static class DIPDemo
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("DIP - 依賴反轉原則");
            Console.WriteLine("=".PadRight(60, '='));

            // 違反 DIP
            Console.WriteLine("\n  [違反 DIP] Programmer 直接 new Computer():");
            var badProgrammer = new DIPViolation.Programmer();
            badProgrammer.Code();

            // 遵循 DIP：可靈活切換不同裝置，且易於單元測試
            Console.WriteLine("\n  [遵循 DIP] 透過建構子注入依賴:");

            var desktopDev = new DesktopComputer();
            var programmer1 = new Programmer(desktopDev);
            programmer1.Code();

            var laptopDev = new Laptop();
            var programmer2 = new Programmer(laptopDev);
            programmer2.Code();

            // 單元測試時可傳入 Mock 物件，不需真實硬體
            Console.WriteLine("\n  [DIP 優勢] 搭配 Mock 進行測試:");
            var mockDevice = new MockProgrammable();
            var tester = new Programmer(mockDevice);
            tester.Code();
        }
    }

    /// <summary>
    /// Mock 物件：用於單元測試，驗證 Programmer 是否正確呼叫 Program()
    /// </summary>
    public class MockProgrammable : IProgrammable
    {
        public bool WasProgramCalled { get; private set; }

        public void Program()
        {
            WasProgramCalled = true;
            Console.WriteLine("   [Mock] Program() 被呼叫（測試通過）");
        }
    }
}
