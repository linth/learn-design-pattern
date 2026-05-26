namespace SingletonExamples
{
    // ============================================================
    // 獨體模式 (Singleton Pattern)
    //
    // 核心概念：
    // 確保一個類別只有一個實例，並提供一個全域存取點。
    //
    // 實作方式（由簡單到嚴謹）：
    // 1. 基本版 (Lazy Initialization) — 單執行緒適用
    // 2. 雙重檢查鎖定 (Double-Checked Locking) — 多執行緒安全
    // 3. Lazy<T> (.NET 4+) — 最簡潔且執行緒安全
    // ============================================================

    // ============================================================
    // 實作 1：基本版（Lazy Initialization）
    // 優點：簡單直觀
    // 缺點：不支援多執行緒（多執行緒下可能產生多個實例）
    // ============================================================
    public sealed class SingletonBasic
    {
        private static SingletonBasic? _instance;
        private static int _instanceCount;

        private SingletonBasic()
        {
            _instanceCount++;
            Console.WriteLine($"[SingletonBasic] 實例已建立 (#{_instanceCount})");
        }

        public static SingletonBasic GetInstance()
        {
            if (_instance == null)
            {
                _instance = new SingletonBasic();
            }
            return _instance;
        }

        public void DoSomething()
        {
            Console.WriteLine("[SingletonBasic] 執行業務方法");
        }
    }

    // ============================================================
    // 實作 2：雙重檢查鎖定（Double-Checked Locking）
    // 優點：多執行緒安全，且只在第一次需要時才建立實例
    // ============================================================
    public sealed class SingletonThreadSafe
    {
        // volatile 確保多執行緒下變數的一致性
        private static volatile SingletonThreadSafe? _instance;
        private static readonly object _lock = new();
        private static int _instanceCount;

        private SingletonThreadSafe()
        {
            _instanceCount++;
            Console.WriteLine($"[SingletonThreadSafe] 實例已建立 (#{_instanceCount})");
        }

        public static SingletonThreadSafe GetInstance()
        {
            // 第一次檢查：避免每次呼叫都進入同步區塊
            if (_instance == null)
            {
                lock (_lock)
                {
                    // 第二次檢查：確保只有第一個執行緒建立實例
                    if (_instance == null)
                    {
                        _instance = new SingletonThreadSafe();
                    }
                }
            }
            return _instance;
        }

        public void DoSomething()
        {
            Console.WriteLine("[SingletonThreadSafe] 執行業務方法");
        }
    }

    // ============================================================
    // 實作 3：使用 Lazy<T>（.NET 4+ 的建議方式）
    // 優點：最簡潔、執行緒安全、延遲載入
    // ============================================================
    public sealed class SingletonLazy
    {
        // Lazy<T> 保證延遲初始化且執行緒安全
        private static readonly Lazy<SingletonLazy> _lazy = new(() =>
        {
            Console.WriteLine("[SingletonLazy] 實例已建立");
            return new SingletonLazy();
        });

        private SingletonLazy() { }

        public static SingletonLazy GetInstance() => _lazy.Value;

        public void DoSomething()
        {
            Console.WriteLine("[SingletonLazy] 執行業務方法");
        }
    }

    // ============================================================
    // 實作 4：日誌記錄器（Singleton 真實應用）
    // ============================================================
    public sealed class Logger
    {
        private static readonly Logger _instance = new();
        private readonly string _logFilePath;

        private Logger()
        {
            _logFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "app.log");
            Console.WriteLine($"[Logger] 日誌檔案: {_logFilePath}");
        }

        public static Logger GetInstance() => _instance;

        public void Log(string level, string message)
        {
            var line = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] [{level}] {message}";
            Console.WriteLine(line);
            // 實際應用可寫入檔案
            // File.AppendAllText(_logFilePath, line + Environment.NewLine);
        }

        public void Info(string message) => Log("INFO", message);
        public void Warn(string message) => Log("WARN", message);
        public void Error(string message) => Log("ERROR", message);
    }

    // ---------- 範例執行 ----------

    public static class SingletonDemo
    {
        public static void Run()
        {
            Console.WriteLine("=".PadRight(60, '='));
            Console.WriteLine("獨體模式 (Singleton Pattern) 範例");
            Console.WriteLine("=".PadRight(60, '='));

            // 情境一：基本 Singleton
            Console.WriteLine("\n--- 情境一：基本 Singleton ---");
            var s1 = SingletonBasic.GetInstance();
            var s2 = SingletonBasic.GetInstance();
            Console.WriteLine($"s1 == s2 ? {ReferenceEquals(s1, s2)}");

            // 情境二：執行緒安全的 Singleton
            Console.WriteLine("\n--- 情境二：執行緒安全的 Singleton ---");
            Parallel.For(0, 5, _ =>
            {
                var instance = SingletonThreadSafe.GetInstance();
                Console.WriteLine($"  執行緒 {Task.CurrentId} 取得實例: {instance.GetHashCode()}");
            });

            // 情境三：Lazy<T> Singleton
            Console.WriteLine("\n--- 情境三：Lazy<T> Singleton ---");
            Console.WriteLine("尚未呼叫 GetInstance()...");
            var lazyInstance = SingletonLazy.GetInstance();
            lazyInstance.DoSomething();

            // 情境四：日誌記錄器
            Console.WriteLine("\n--- 情境四：日誌記錄器應用 ---");
            var logger = Logger.GetInstance();
            logger.Info("應用程式啟動");
            logger.Warn("記憶體使用量偏高");
            logger.Error("資料庫連線失敗");
        }
    }
}
