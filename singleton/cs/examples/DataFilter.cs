namespace SingletonRealWorldExamples;

/// <summary>
/// 通用資料過濾器 — 提供篩選、排序、分頁、去重等功能
/// </summary>
public sealed class DataFilter
{
    private static readonly Lazy<DataFilter> _lazy = new(() => new DataFilter());
    private DataFilter() { }
    public static DataFilter GetInstance() => _lazy.Value;

    public List<T> Filter<T>(List<T> data, Func<T, bool> predicate) =>
        data.Where(predicate).ToList();

    public List<T> Sort<T>(List<T> data, Comparison<T> comparison)
    {
        var result = new List<T>(data);
        result.Sort(comparison);
        return result;
    }

    public List<T> Paginate<T>(List<T> data, int page, int pageSize) =>
        data.Skip((page - 1) * pageSize).Take(pageSize).ToList();

    public int Count<T>(List<T> data) => data.Count;

    public List<T> Unique<T>(List<T> data)
    {
        if (typeof(T).IsValueType || typeof(T) == typeof(string))
            return data.Distinct().ToList();

        var seen = new HashSet<string>();
        var result = new List<T>();
        foreach (var item in data)
        {
            var key = System.Text.Json.JsonSerializer.Serialize(item);
            if (seen.Add(key))
                result.Add(item);
        }
        return result;
    }
}
