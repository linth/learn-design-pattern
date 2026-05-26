namespace SingletonRealWorldExamples;

/// <summary>
/// 執行所有 Singleton 真實世界範例
/// </summary>
public static class Demo
{
    public static void Run()
    {
        Console.WriteLine("=".PadRight(60, '='));
        Console.WriteLine("Singleton 真實世界應用範例");
        Console.WriteLine("=".PadRight(60, '='));

        // 1. Logger
        Console.WriteLine("\n--- 1. Logger 日誌記錄器 ---");
        var logger = Logger.GetInstance();
        logger.Info("應用程式啟動");
        logger.Warn("記憶體使用量偏高");
        logger.Error("資料庫連線逾時");

        // 2. ConfigManager
        Console.WriteLine("\n--- 2. ConfigManager 設定管理 ---");
        var config = ConfigManager.GetInstance();
        Console.WriteLine($"版本: {config.Get("appVersion")}");

        // 3. DataFilter
        Console.WriteLine("\n--- 3. DataFilter 資料過濾器 ---");
        var filter = DataFilter.GetInstance();
        var people = new List<Person>
        {
            new(1, "Alice", 30),
            new(2, "Bob", 25),
            new(3, "Charlie", 35),
            new(3, "Charlie", 35),
            new(4, "David", 40),
        };
        var filtered = filter.Filter(people, p => p.Age >= 30);
        Console.WriteLine($"篩選年齡 >= 30: {filtered.Count} 筆");
        var sorted = filter.Sort(people, (a, b) => a.Age.CompareTo(b.Age));
        Console.WriteLine($"排序後第一筆: {sorted[0].Name}");
        var page = filter.Paginate(people, 1, 2);
        Console.WriteLine($"第一頁: {page.Count} 筆");
        var unique = filter.Unique(people);
        Console.WriteLine($"去重後: {unique.Count} 筆 (原 {people.Count} 筆)");

        // 4. DataStatistics
        Console.WriteLine("\n--- 4. DataStatistics 資料統計 ---");
        var stats = DataStatistics.GetInstance();
        var nums = new List<double> { 10, 20, 30, 40, 50 };
        Console.WriteLine($"總和: {stats.Sum(nums)}");
        Console.WriteLine($"平均: {stats.Average(nums)}");
        Console.WriteLine($"中位數: {stats.Median(nums)}");

        // 5. CacheManager
        Console.WriteLine("\n--- 5. CacheManager 全域快取 ---");
        var cache = CacheManager.GetInstance();
        cache.Set("user:1", new { Id = 1, Name = "Alice" });
        cache.Set("config:theme", "dark");
        Console.WriteLine($"快取筆數: {cache.Count}");
        Console.WriteLine($"主題設定: {cache.Get("config:theme")}");

        // 6. DatabaseConnectionPool
        Console.WriteLine("\n--- 6. DatabaseConnectionPool 連線池 ---");
        var pool = DatabaseConnectionPool.GetInstance();
        pool.ExecuteQuery("SELECT * FROM users");
        pool.ExecuteQuery("INSERT INTO logs VALUES (...)");

        Console.WriteLine("\n--- 驗證 Singleton ---");
        Console.WriteLine($"Logger 相同實例: {ReferenceEquals(Logger.GetInstance(), logger)}");
        Console.WriteLine($"Config 相同實例: {ReferenceEquals(ConfigManager.GetInstance(), config)}");
        Console.WriteLine($"Cache 相同實例: {ReferenceEquals(CacheManager.GetInstance(), cache)}");
    }
}

public record Person(int Id, string Name, int Age);
