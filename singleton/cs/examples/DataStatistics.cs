namespace SingletonRealWorldExamples;

/// <summary>
/// 資料統計 — 提供總和、平均、最大、最小、中位數等統計功能
/// </summary>
public sealed class DataStatistics
{
    private static readonly Lazy<DataStatistics> _lazy = new(() => new DataStatistics());
    private DataStatistics() { }
    public static DataStatistics GetInstance() => _lazy.Value;

    public double Sum(List<double> values) => values.Sum();
    public double Average(List<double> values) => values.Count == 0 ? 0 : values.Average();
    public double Max(List<double> values) => values.Count == 0 ? 0 : values.Max();
    public double Min(List<double> values) => values.Count == 0 ? 0 : values.Min();

    public double Median(List<double> values)
    {
        if (values.Count == 0) return 0;
        var sorted = values.OrderBy(v => v).ToList();
        var mid = sorted.Count / 2;
        return sorted.Count % 2 == 0
            ? (sorted[mid - 1] + sorted[mid]) / 2.0
            : sorted[mid];
    }
}
