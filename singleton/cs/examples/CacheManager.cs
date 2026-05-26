namespace SingletonRealWorldExamples;

/// <summary>
/// 全域快取 — 整個應用共享同一個快取實例
/// </summary>
public sealed class CacheManager
{
    private static readonly Lazy<CacheManager> _lazy = new(() => new CacheManager());
    private readonly Dictionary<string, object?> _cache = new();

    private CacheManager() { }
    public static CacheManager GetInstance() => _lazy.Value;

    public void Set(string key, object? value) => _cache[key] = value;
    public object? Get(string key) => _cache.TryGetValue(key, out var v) ? v : null;
    public bool Contains(string key) => _cache.ContainsKey(key);
    public void Remove(string key) => _cache.Remove(key);
    public void Clear() => _cache.Clear();
    public int Count => _cache.Count;
}
