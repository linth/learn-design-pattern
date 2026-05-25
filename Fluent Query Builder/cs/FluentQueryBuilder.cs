namespace FluentQueryBuilderExamples
{
    // ============================================================
    // Fluent Query Builder 設計模式
    // 透過方法鏈（Method Chaining）以流暢的介面逐步建立查詢，
    // 每個方法都回傳 this，讓開發者可以串接多個操作。
    // ============================================================

    /// <summary>
    /// 查詢結果類別，封裝產生的 SQL 字串與參數
    /// </summary>
    public class QueryResult
    {
        public string Sql { get; set; } = "";
        public Dictionary<string, object> Parameters { get; set; } = new();

        public override string ToString() => Sql;
    }

    /// <summary>
    /// WHERE 條件模型
    /// </summary>
    internal class WhereClause
    {
        public string Column { get; set; } = "";
        public string Operator { get; set; } = "";
        public object? Value { get; set; }
        public string Connector { get; set; } = ""; // AND, OR, 或首個條件為空
    }

    /// <summary>
    /// ORDER BY 排序模型
    /// </summary>
    internal class OrderByClause
    {
        public string Column { get; set; } = "";
        public bool Descending { get; set; }
    }

    /// <summary>
    /// Fluent SQL 查詢建構器，支援鏈式呼叫逐步組裝 SQL 查詢。
    /// 每個設定方法皆回傳 this 以實現流暢介面。
    /// </summary>
    public class FluentQueryBuilder
    {
        // 選取欄位清單
        private readonly List<string> _columns = new();
        // 資料表名稱
        private string _table = "";
        // WHERE 條件清單
        private readonly List<WhereClause> _whereClauses = new();
        // ORDER BY 排序清單
        private readonly List<OrderByClause> _orderByClauses = new();
        // 參數字典（用於防止 SQL 注入）
        private readonly Dictionary<string, object> _parameters = new();
        // LIMIT 筆數
        private int? _limit;
        // OFFSET 跳過筆數
        private int? _offset;

        /// <summary>
        /// 指定查詢欄位，例如 .Select("id", "name", "email")
        /// </summary>
        public FluentQueryBuilder Select(params string[] columns)
        {
            _columns.AddRange(columns);
            return this;
        }

        /// <summary>
        /// 指定查詢的資料表
        /// </summary>
        public FluentQueryBuilder From(string table)
        {
            _table = table;
            return this;
        }

        /// <summary>
        /// 加入 WHERE 條件（第一個條件無連接詞，後續預設 AND）
        /// </summary>
        public FluentQueryBuilder Where(string column, string op, object? value)
        {
            _whereClauses.Add(new WhereClause
            {
                Column = column,
                Operator = op,
                Value = value,
                Connector = _whereClauses.Count > 0 ? "AND" : ""
            });
            AddParameter(column, value);
            return this;
        }

        /// <summary>
        /// 加入 AND 連接的 WHERE 條件
        /// </summary>
        public FluentQueryBuilder AndWhere(string column, string op, object? value)
        {
            _whereClauses.Add(new WhereClause
            {
                Column = column,
                Operator = op,
                Value = value,
                Connector = "AND"
            });
            AddParameter(column, value);
            return this;
        }

        /// <summary>
        /// 加入 OR 連接的 WHERE 條件
        /// </summary>
        public FluentQueryBuilder OrWhere(string column, string op, object? value)
        {
            _whereClauses.Add(new WhereClause
            {
                Column = column,
                Operator = op,
                Value = value,
                Connector = "OR"
            });
            AddParameter(column, value);
            return this;
        }

        /// <summary>
        /// 加入排序條件，descending = true 表示降冪排序
        /// </summary>
        public FluentQueryBuilder OrderBy(string column, bool descending = false)
        {
            _orderByClauses.Add(new OrderByClause
            {
                Column = column,
                Descending = descending
            });
            return this;
        }

        /// <summary>
        /// 限制回傳筆數
        /// </summary>
        public FluentQueryBuilder Limit(int limit)
        {
            _limit = limit;
            return this;
        }

        /// <summary>
        /// 跳過指定筆數（用於分頁）
        /// </summary>
        public FluentQueryBuilder Offset(int offset)
        {
            _offset = offset;
            return this;
        }

        /// <summary>
        /// 建構最終的 SQL 查詢字串與參數
        /// </summary>
        public QueryResult Build()
        {
            var sql = new System.Text.StringBuilder();

            // SELECT 子句
            var columns = _columns.Count > 0 ? string.Join(", ", _columns) : "*";
            sql.Append($"SELECT {columns} ");

            // FROM 子句
            if (string.IsNullOrEmpty(_table))
                throw new InvalidOperationException("必須指定資料表名稱（From）");
            sql.Append($"FROM {_table} ");

            // WHERE 子句
            if (_whereClauses.Count > 0)
            {
                sql.Append("WHERE ");
                for (int i = 0; i < _whereClauses.Count; i++)
                {
                    var wc = _whereClauses[i];
                    if (i > 0)
                        sql.Append($"{wc.Connector} ");
                    sql.Append($"{wc.Column} {wc.Operator} @{wc.Column}_{i} ");
                }
            }

            // ORDER BY 子句
            if (_orderByClauses.Count > 0)
            {
                var orderParts = _orderByClauses.Select(ob =>
                    ob.Descending ? $"{ob.Column} DESC" : ob.Column);
                sql.Append($"ORDER BY {string.Join(", ", orderParts)} ");
            }

            // LIMIT 子句
            if (_limit.HasValue)
                sql.Append($"LIMIT {_limit.Value} ");

            // OFFSET 子句
            if (_offset.HasValue)
                sql.Append($"OFFSET {_offset.Value} ");

            return new QueryResult
            {
                Sql = sql.ToString().Trim(),
                Parameters = _parameters
            };
        }

        /// <summary>
        /// 將參數值加入參數字典，便後續做參數化查詢
        /// </summary>
        private void AddParameter(string column, object? value)
        {
            if (value != null)
            {
                var paramName = $"@{column}_{_parameters.Count}";
                _parameters[paramName] = value;
            }
        }

        /// <summary>
        /// 靜態工廠方法：快速建立從指定資料表查詢的 Builder
        /// </summary>
        public static FluentQueryBuilder SelectFrom(string table)
        {
            return new FluentQueryBuilder().From(table);
        }
    }

    /// <summary>
    /// 範例執行類別
    /// </summary>
    public static class FluentQueryBuilderDemo
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("Fluent Query Builder 設計模式 範例");
            Console.WriteLine("=".PadRight(60, '='));

            // 情境一：基本查詢 + 條件過濾
            Console.WriteLine("\n📋 情境一 (基本查詢 + 條件過濾):");
            var q1 = FluentQueryBuilder.SelectFrom("users")
                .Select("id", "name", "email")
                .Where("status", "=", "active")
                .Build();
            Console.WriteLine($"   {q1}");

            // 情境二：複雜查詢 + 排序 + 分頁
            Console.WriteLine("\n📋 情境二 (排序 + 分頁):");
            var q2 = FluentQueryBuilder.SelectFrom("products")
                .Select("id", "title", "price")
                .Where("price", ">", 100)
                .AndWhere("category", "=", "electronics")
                .OrderBy("price", descending: true)
                .Limit(20)
                .Offset(0)
                .Build();
            Console.WriteLine($"   {q2}");

            // 情境三：多條件 OR + AND 混合查詢
            Console.WriteLine("\n📋 情境三 (混合 OR / AND 條件):");
            var q3 = FluentQueryBuilder.SelectFrom("orders")
                .Select("order_id", "amount", "status")
                .Where("status", "=", "pending")
                .OrWhere("priority", "=", "high")
                .AndWhere("amount", ">=", 5000)
                .OrderBy("amount", descending: true)
                .Build();
            Console.WriteLine($"   {q3}");
        }
    }
}
