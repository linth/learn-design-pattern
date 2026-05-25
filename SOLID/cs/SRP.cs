namespace SOLIDExamples
{
    // ============================================================
    // 單一職責原則 (Single Responsibility Principle, SRP)
    // 一個類別應該只有一個理由被修改，即只負責一項職責。
    // ============================================================

    /// <summary>
    /// 違反 SRP 的範例：User class 同時管理使用者資料和日誌記錄
    /// </summary>
    public class UserViolation
    {
        public string Name { get; set; }
        public int Age { get; set; }
        private readonly List<string> _logs = new();

        public void SetName(string name)
        {
            Name = name;
            _logs.Add($"修改使用者名稱為: {name}");
        }

        public void SetAge(int age)
        {
            Age = age;
            _logs.Add($"修改使用者年齡為: {age}");
        }

        public IReadOnlyList<string> GetLogs() => _logs.AsReadOnly();
    }

    // ---------- 遵循 SRP ----------

    /// <summary>
    /// 使用者資料類別，僅負責管理使用者基本資訊
    /// </summary>
    public class User
    {
        public string Name { get; set; }
        public int Age { get; set; }
    }

    /// <summary>
    /// 使用者日誌類別，僅負責記錄使用者相關操作
    /// </summary>
    public class UserLogger
    {
        private readonly List<string> _logs = new();

        public void Log(string message)
        {
            _logs.Add($"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] {message}");
        }

        public IReadOnlyList<string> GetLogs() => _logs.AsReadOnly();
    }

    /// <summary>
    /// 使用者服務類別，負責協調使用者操作與日誌記錄
    /// </summary>
    public class UserService
    {
        private readonly User _user;
        private readonly UserLogger _logger;

        public UserService(User user, UserLogger logger)
        {
            _user = user;
            _logger = logger;
        }

        public void ChangeName(string newName)
        {
            var oldName = _user.Name;
            _user.Name = newName;
            _logger.Log($"使用者名稱從 {oldName} 變更為 {newName}");
        }

        public void ChangeAge(int newAge)
        {
            var oldAge = _user.Age;
            _user.Age = newAge;
            _logger.Log($"使用者年齡從 {oldAge} 變更為 {newAge}");
        }
    }

    public static class SRPDemo
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("SRP - 單一職責原則");
            Console.WriteLine("=".PadRight(60, '='));

            var user = new User { Name = "Alice", Age = 30 };
            var logger = new UserLogger();
            var service = new UserService(user, logger);

            service.ChangeName("Bob");
            service.ChangeAge(25);

            Console.WriteLine($"使用者: {user.Name}, {user.Age} 歲");
            Console.WriteLine("操作紀錄:");
            foreach (var log in logger.GetLogs())
                Console.WriteLine($"  {log}");
        }
    }
}
