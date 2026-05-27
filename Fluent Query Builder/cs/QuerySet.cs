namespace FluentQueryBuilderExamples
{
    public class PaginatedResult<T>
    {
        public List<T> Items { get; }
        public int Total { get; }
        public int Page { get; }
        public int PageSize { get; }
        public int TotalPages { get; }
        public bool HasPrev => Page > 1;
        public bool HasNext => Page < TotalPages;

        public PaginatedResult(List<T> items, int total, int page, int pageSize, int totalPages)
        {
            Items = items;
            Total = total;
            Page = page;
            PageSize = pageSize;
            TotalPages = totalPages;
        }
    }

    public class AggregateResult
    {
        public double Sum { get; set; }
        public double? Avg { get; set; }
        public double? Max { get; set; }
        public double? Min { get; set; }
    }

    public class QuerySet<T>
    {
        private readonly List<T> _data;

        public QuerySet(IEnumerable<T> data)
        {
            _data = new List<T>(data);
        }

        public QuerySet<T> Filter(Func<T, bool> predicate)
        {
            return new QuerySet<T>(_data.Where(predicate));
        }

        public QuerySet<T> Exclude(Func<T, bool> predicate)
        {
            return new QuerySet<T>(_data.Where(item => !predicate(item)));
        }

        public QuerySet<T> Search(string searchField, string keyword)
        {
            return new QuerySet<T>(_data.Where(item =>
            {
                var value = typeof(T).GetProperty(searchField)?.GetValue(item)?.ToString();
                return value != null && value.Contains(keyword, StringComparison.OrdinalIgnoreCase);
            }));
        }

        public List<T> ToList() => new(_data);

        public T? First() => _data.Count > 0 ? _data[0] : default;

        public int Count() => _data.Count;

        public AggregateResult Aggregate(string field)
        {
            var prop = typeof(T).GetProperty(field);
            if (prop == null)
                throw new ArgumentException($"型別 {typeof(T).Name} 沒有 '{field}' 屬性");

            var values = _data
                .Select(item => Convert.ToDouble(prop.GetValue(item) ?? 0))
                .ToList();

            if (values.Count == 0)
                return new AggregateResult { Sum = 0, Avg = null, Max = null, Min = null };

            return new AggregateResult
            {
                Sum = values.Sum(),
                Avg = values.Average(),
                Max = values.Max(),
                Min = values.Min(),
            };
        }

        public PaginatedResult<T> Paginate(int page = 1, int pageSize = 20)
        {
            var total = _data.Count;
            var totalPages = Math.Max(1, (total + pageSize - 1) / pageSize);
            var items = _data.Skip((page - 1) * pageSize).Take(pageSize).ToList();
            return new PaginatedResult<T>(items, total, page, pageSize, totalPages);
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Category { get; set; } = "";
        public double Price { get; set; }
        public bool InStock { get; set; }
    }

    public static class QuerySetDemo
    {
        public static void Run()
        {
            var products = new List<Product>
            {
                new() { Id = 1, Name = "iPhone 15", Category = "手機", Price = 36000, InStock = true },
                new() { Id = 2, Name = "Galaxy S24", Category = "手機", Price = 28000, InStock = true },
                new() { Id = 3, Name = "MacBook Air", Category = "筆電", Price = 32000, InStock = false },
                new() { Id = 4, Name = "Android 平板", Category = "平板", Price = 12000, InStock = true },
                new() { Id = 5, Name = "iPad Pro", Category = "平板", Price = 35000, InStock = true },
                new() { Id = 6, Name = "AirPods", Category = "配件", Price = 6000, InStock = true },
                new() { Id = 7, Name = "機械鍵盤", Category = "配件", Price = 4500, InStock = false },
                new() { Id = 8, Name = "Galaxy Tab", Category = "平板", Price = 15000, InStock = true },
            };

            var qs = new QuerySet<Product>(products);

            Console.WriteLine("=== �情境一：過濾 + 統計 ===");
            var result = qs
                .Filter(p => p.InStock)
                .Filter(p => p.Price >= 10000)
                .Search("Name", "Galaxy");
            Console.WriteLine($"符合條件的商品: {string.Join(", ", result.ToList().Select(p => p.Name))}");
            Console.WriteLine($"筆數: {result.Count()}");
            var agg = result.Aggregate("Price");
            Console.WriteLine($"價格統計 - 總和: {agg.Sum}, 平均: {agg.Avg:F2}, 最大: {agg.Max}, 最小: {agg.Min}");

            Console.WriteLine("\n=== 情境二：分頁 ===");
            var page = qs.Paginate(page: 1, pageSize: 3);
            Console.WriteLine($"第 {page.Page}/{page.TotalPages} 頁（共 {page.Total} 筆）:");
            foreach (var p in page.Items)
                Console.WriteLine($"  - {p.Name} (${p.Price})");

            Console.WriteLine("\n=== 情境三：排除 + 搜尋 ===");
            var result2 = qs
                .Exclude(p => !p.InStock)
                .Search("Category", "平板");
            Console.WriteLine($"有庫存的平板: {string.Join(", ", result2.ToList().Select(p => p.Name))}");

            Console.WriteLine("\n=== 情境四：first() ===");
            var first = qs.Filter(p => p.Price > 30000).First();
            Console.WriteLine($"價格超過 30000 的第一筆: {first?.Name ?? "無"}");
        }
    }
}
