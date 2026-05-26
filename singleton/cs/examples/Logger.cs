namespace SingletonRealWorldExamples;

/// <summary>
/// 日誌記錄器 — 整個應用共用一個日誌實例，確保輸出格式一致
/// </summary>
public sealed class Logger
{
    private static readonly Logger _instance = new();
    private readonly List<string> _logs = new();

    private Logger() { }

    public static Logger GetInstance() => _instance;

    public void Log(string level, string message)
    {
        var line = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] [{level}] {message}";
        _logs.Add(line);
        Console.WriteLine(line);
    }

    public void Info(string message) => Log("INFO", message);
    public void Warn(string message) => Log("WARN", message);
    public void Error(string message) => Log("ERROR", message);
    public void Debug(string message) => Log("DEBUG", message);

    public IReadOnlyList<string> GetLogs() => _logs.AsReadOnly();
}
