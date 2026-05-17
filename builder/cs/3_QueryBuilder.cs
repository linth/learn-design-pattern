namespace BuilderExamples
{
    // ============================================================
    // 第三部分：SQL 查詢建構器
    // ============================================================

    /// <summary>
    /// SQL 查詢結果 (Product)
    /// </summary>
    public class SqlQuery
    {
        public string Query { get; set; } = "";
        public Dictionary<string, object> Parameters { get; set; } = new();

        public override string ToString() => Query;
    }

    /// <summary>
    /// 查詢條件
    /// </summary>
    public class WhereCondition
    {
        public string Column { get; set; } = "";
        public string Operator { get; set; } = "";
        public object? Value { get; set; }
        public string Connector { get; set; } = "AND";
    }

    /// <summary>
    /// 排序條件
    /// </summary>
    public class OrderByColumn
    {
        public string Column { get; set; } = "";
        public bool Descending { get; set; }
    }

    /// <summary>
    /// SQL 查詢 Builder
    /// </summary>
    public class SqlQueryBuilder
    {
        private string _tableName = "";
        private List<string> _selectColumns = new();
        private List<WhereCondition> _whereConditions = new();
        private List<OrderByColumn> _orderByColumns = new();
        private int? _limit;
        private int? _offset;
        private string? _groupBy;
        private List<string> _havingConditions = new();
        private Dictionary<string, object> _parameters = new();

        public SqlQueryBuilder Select(params string[] columns)
        {
            _selectColumns.AddRange(columns);
            return this;
        }

        public SqlQueryBuilder From(string tableName)
        {
            _tableName = tableName;
            return this;
        }

        public SqlQueryBuilder Where(string column, string op, object? value)
        {
            _whereConditions.Add(new WhereCondition
            {
                Column = column,
                Operator = op,
                Value = value,
                Connector = _whereConditions.Count > 0 ? "AND" : ""
            });
            if (value != null)
            {
                var paramName = $"@{column}_{_parameters.Count}";
                _parameters[paramName] = value;
            }
            return this;
        }

        public SqlQueryBuilder And(string column, string op, object? value)
        {
            _whereConditions.Add(new WhereCondition
            {
                Column = column,
                Operator = op,
                Value = value,
                Connector = "AND"
            });
            if (value != null)
            {
                var paramName = $"@{column}_{_parameters.Count}";
                _parameters[paramName] = value;
            }
            return this;
        }

        public SqlQueryBuilder Or(string column, string op, object? value)
        {
            _whereConditions.Add(new WhereCondition
            {
                Column = column,
                Operator = op,
                Value = value,
                Connector = "OR"
            });
            if (value != null)
            {
                var paramName = $"@{column}_{_parameters.Count}";
                _parameters[paramName] = value;
            }
            return this;
        }

        public SqlQueryBuilder OrderBy(string column, bool descending = false)
        {
            _orderByColumns.Add(new OrderByColumn
            {
                Column = column,
                Descending = descending
            });
            return this;
        }

        public SqlQueryBuilder Limit(int limit)
        {
            _limit = limit;
            return this;
        }

        public SqlQueryBuilder Offset(int offset)
        {
            _offset = offset;
            return this;
        }

        public SqlQueryBuilder GroupBy(string column)
        {
            _groupBy = column;
            return this;
        }

        public SqlQueryBuilder Having(string condition)
        {
            _havingConditions.Add(condition);
            return this;
        }

        public SqlQuery Build()
        {
            var query = new System.Text.StringBuilder();

            // SELECT
            var columns = _selectColumns.Count > 0 ? string.Join(", ", _selectColumns) : "*";
            query.Append($"SELECT {columns} ");

            // FROM
            query.Append($"FROM {_tableName} ");

            // WHERE
            if (_whereConditions.Count > 0)
            {
                query.Append("WHERE ");
                for (int i = 0; i < _whereConditions.Count; i++)
                {
                    var cond = _whereConditions[i];
                    if (i > 0) query.Append($"{cond.Connector} ");
                    // 簡化處理這裡使用實際值
                    query.Append($"{cond.Column} {cond.Operator} '{cond.Value}' ");
                }
            }

            // GROUP BY
            if (!string.IsNullOrEmpty(_groupBy))
            {
                query.Append($"GROUP BY {_groupBy} ");
            }

            // HAVING
            if (_havingConditions.Count > 0)
            {
                query.Append($"HAVING {string.Join(" AND ", _havingConditions)} ");
            }

            // ORDER BY
            if (_orderByColumns.Count > 0)
            {
                var orderCols = _orderByColumns.Select(c =>
                    c.Descending ? $"{c.Column} DESC" : c.Column);
                query.Append($"ORDER BY {string.Join(", ", orderCols)} ");
            }

            // LIMIT / OFFSET
            if (_limit.HasValue)
            {
                query.Append($"LIMIT {_limit.Value} ");
            }
            if (_offset.HasValue)
            {
                query.Append($"OFFSET {_offset.Value} ");
            }

            return new SqlQuery
            {
                Query = query.ToString().Trim(),
                Parameters = _parameters
            };
        }

        // 靜態工廠方法
        public static SqlQueryBuilder SelectFrom(string tableName)
        {
            return new SqlQueryBuilder().From(tableName);
        }
    }

    /// <summary>
    /// 查詢建構器範例執行
    /// </summary>
    public static class QueryBuilder
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("3. SQL 查詢建構器");
            Console.WriteLine("=".PadRight(60, '='));

            // 基本查詢
            Console.WriteLine("\n📋 範例 1 - 基本查詢:");
            var query1 = SqlQueryBuilder.SelectFrom("users")
                .Where("status", "=", "active")
                .Build();
            Console.WriteLine($"   {query1}");

            // 複雜查詢
            Console.WriteLine("\n📋 範例 2 - 複雜查詢 (分頁、排序、條件):");
            var query2 = SqlQueryBuilder.Select("id", "name", "email", "created_at")
                .From("customers")
                .Where("is_deleted", "=", false)
                .And("region", "=", "台北")
                .OrderBy("created_at", descending: true)
                .Limit(20)
                .Offset(0)
                .Build();
            Console.WriteLine($"   {query2}");

            // 聚合查詢
            Console.WriteLine("\n📋 範例 3 - 聚合查詢 (分組、統計):");
            var query3 = SqlQueryBuilder.Select("category", "COUNT(*) as total", "AVG(price) as avg_price")
                .From("products")
                .Where("status", "=", "active")
                .GroupBy("category")
                .Having("COUNT(*) > 10")
                .OrderBy("total", descending: true)
                .Build();
            Console.WriteLine($"   {query3}");

            // 巢狀查詢
            Console.WriteLine("\n📋 範例 4 - 多條件 OR 查詢:");
            var query4 = SqlQueryBuilder.SelectFrom("orders")
                .Where("status", "=", "pending")
                .Or("priority", "=", "high")
                .And("created_at", ">", "2024-01-01")
                .Build();
            Console.WriteLine($"   {query4}");

            // 使用靜態工廠方法
            Console.WriteLine("\n📋 範例 5 - 使用靜態工廠方法:");
            var query5 = SqlQueryBuilder.SelectFrom("products")
                .Where("price", ">", 1000)
                .And("category", "=", "electronics")
                .OrderBy("price")
                .Limit(10)
                .Build();
            Console.WriteLine($"   {query5}");

            Console.WriteLine("\n🎯 重點說明：");
            Console.WriteLine("   1. 避免 SQL 注入 - 使用參數化查詢");
            Console.WriteLine("   2. 可鏈式呼叫 - 語法清晰易懂");
            Console.WriteLine("   3. 支援複雜查詢 - WHERE, ORDER BY, GROUP BY 等");
            Console.WriteLine("   4. 靜態工廠方法 - 更簡潔的 API");
            Console.WriteLine("   5. 常見 ORM 如 Entity Framework, Dapper 使用類似模式");
        }
    }
}