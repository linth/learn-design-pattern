namespace SingletonRealWorldExamples;

/// <summary>
/// 資料庫連線池 — 統一管理資料庫連線，避免重複建立連線
/// </summary>
public sealed class DatabaseConnectionPool
{
    private static readonly Lazy<DatabaseConnectionPool> _lazy = new(() => new DatabaseConnectionPool());
    private readonly string _connectionString;
    private int _activeConnections;

    private DatabaseConnectionPool()
    {
        _connectionString = "Server=localhost;Database=mydb;User=admin;Password=secret;";
        Console.WriteLine($"[DatabaseConnectionPool] 連線字串: {_connectionString}");
    }

    public static DatabaseConnectionPool GetInstance() => _lazy.Value;

    public void ExecuteQuery(string sql)
    {
        _activeConnections++;
        Console.WriteLine($"[DB] 執行查詢: {sql} (使用中連線: {_activeConnections})");
        Thread.Sleep(100);
        _activeConnections--;
    }

    public int ActiveConnections => _activeConnections;
}
