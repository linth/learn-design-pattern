namespace SingletonRealWorldExamples;

/// <summary>
/// 設定管理 — 應用程式設定應全域一致，集中管理
/// </summary>
public sealed class ConfigManager
{
    private static readonly Lazy<ConfigManager> _lazy = new(() => new ConfigManager());
    private readonly Dictionary<string, object> _config = new();

    private ConfigManager()
    {
        _config["appVersion"] = "1.0.0";
        _config["server"] = new Dictionary<string, object>
        {
            ["host"] = "0.0.0.0",
            ["port"] = 3000
        };
        _config["database"] = new Dictionary<string, object>
        {
            ["host"] = "localhost",
            ["port"] = 5432,
            ["user"] = "admin",
            ["password"] = "secret",
            ["name"] = "mydb"
        };
    }

    public static ConfigManager GetInstance() => _lazy.Value;

    public void Set(string key, object value) => _config[key] = value;
    public object? Get(string key) => _config.TryGetValue(key, out var v) ? v : null;
    public T? Get<T>(string key) where T : class => Get(key) as T;
}
