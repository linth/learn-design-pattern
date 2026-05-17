namespace AdapterExamples
{
    // ============================================================
    // 第四部分：舊系統資料遷移範例
    // ============================================================

    #region 舊系統 (XML) - 不可修改

    /// <summary>
    /// 舊系統的 XML 資料讀取器 (不可修改)
    /// </summary>
    public class LegacyXmlReader
    {
        /// <summary>
        /// 模擬從資料庫讀取的 XML 資料
        /// </summary>
        public List<Dictionary<string, object>> GetOrdersAsDictionary()
        {
            // 模擬解析後的資料 (實際會用 XML 解析器)
            return new List<Dictionary<string, object>>
            {
                new Dictionary<string, object>
                {
                    ["order_no"] = "ORD-2024-001",
                    ["order_date"] = "2024-01-15",
                    ["customer"] = new Dictionary<string, string>
                    {
                        ["cust_id"] = "C001",
                        ["name"] = "王小明",
                        ["email"] = "wang@example.com",
                        ["phone"] = "0912-345-678"
                    },
                    ["items"] = new List<Dictionary<string, object>>
                    {
                        new Dictionary<string, object>
                        {
                            ["product_code"] = "P001",
                            ["product_name"] = "iPhone 15",
                            ["quantity"] = 1,
                            ["unit_price"] = 35000
                        },
                        new Dictionary<string, object>
                        {
                            ["product_code"] = "P002",
                            ["product_name"] = "AirPods Pro",
                            ["quantity"] = 2,
                            ["unit_price"] = 7500
                        }
                    },
                    ["total_amount"] = 50000,
                    ["status"] = "completed"
                },
                new Dictionary<string, object>
                {
                    ["order_no"] = "ORD-2024-002",
                    ["order_date"] = "2024-01-16",
                    ["customer"] = new Dictionary<string, string>
                    {
                        ["cust_id"] = "C002",
                        ["name"] = "李小華",
                        ["email"] = "lee@example.com",
                        ["phone"] = "0988-888-888"
                    },
                    ["items"] = new List<Dictionary<string, object>>
                    {
                        new Dictionary<string, object>
                        {
                            ["product_code"] = "P003",
                            ["product_name"] = "MacBook Pro",
                            ["quantity"] = 1,
                            ["unit_price"] = 65000
                        }
                    },
                    ["total_amount"] = 65000,
                    ["status"] = "pending"
                }
            };
        }
    }

    #endregion

    #region 新系統介面 (Target Interface)

    /// <summary>
    /// 資料轉換介面 - 新系統期望的格式
    /// </summary>
    public interface IDataConverter
    {
        /// <summary>
        /// 轉換訂單資料
        /// </summary>
        List<OrderDto> ConvertOrders();

        /// <summary>
        /// 匯出為 JSON 檔案
        /// </summary>
        bool ExportToJson(string filepath);
    }

    /// <summary>
    /// 新系統訂單資料結構
    /// </summary>
    public record OrderDto(
        string OrderId,
        string CreatedAt,
        CustomerDto Customer,
        List<LineItemDto> LineItems,
        decimal TotalPrice,
        string OrderStatus
    );

    public record CustomerDto(
        string CustomerId,
        string Name,
        ContactDto Contact
    );

    public record ContactDto(
        string Email,
        string Phone
    );

    public record LineItemDto(
        string ProductId,
        string Name,
        int Quantity,
        decimal Price
    );

    #endregion

    #region 轉接器實作

    /// <summary>
    /// 舊系統 XML 轉新系統 JSON 的轉接器
    /// </summary>
    public class LegacyToJsonAdapter : IDataConverter
    {
        private readonly LegacyXmlReader _legacyReader;
        private List<OrderDto> _convertedData = new();

        // 狀態映射表
        private static readonly Dictionary<string, string> StatusMap = new()
        {
            { "completed", "completed" },
            { "pending", "pending" },
            { "cancelled", "cancelled" },
            { "processing", "processing" },
            { "shipped", "processing" }
        };

        public LegacyToJsonAdapter(LegacyXmlReader legacyReader)
        {
            _legacyReader = legacyReader;
        }

        public List<OrderDto> ConvertOrders()
        {
            // 1. 讀取舊系統資料
            var rawOrders = _legacyReader.GetOrdersAsDictionary();

            // 2. 轉換為新系統格式
            _convertedData = rawOrders.Select(ConvertSingleOrder).ToList();

            return _convertedData;
        }

        private OrderDto ConvertSingleOrder(Dictionary<string, object> oldOrder)
        {
            // 轉換訂單編號格式
            string orderId = FormatOrderId(oldOrder["order_no"].ToString()!);

            // 轉換日期格式
            string createdAt = FormatDateTime(oldOrder["order_date"].ToString()!);

            // 轉換客戶資料結構
            var oldCustomer = (Dictionary<string, string>)oldOrder["customer"];
            var customer = new CustomerDto(
                CustomerId: oldCustomer["cust_id"],
                Name: oldCustomer["name"],
                Contact: new ContactDto(
                    Email: oldCustomer["email"],
                    Phone: oldCustomer["phone"]
                )
            );

            // 轉換商品資料結構
            var oldItems = (List<Dictionary<string, object>>)oldOrder["items"];
            var lineItems = oldItems.Select(item => new LineItemDto(
                ProductId: item["product_code"].ToString()!,
                Name: item["product_name"].ToString()!,
                Quantity: Convert.ToInt32(item["quantity"]),
                Price: Convert.ToDecimal(item["unit_price"])
            )).ToList();

            // 轉換訂單狀態
            string oldStatus = oldOrder["status"].ToString()!.ToLower();
            string orderStatus = StatusMap.GetValueOrDefault(oldStatus, "pending");

            return new OrderDto(
                OrderId: orderId,
                CreatedAt: createdAt,
                Customer: customer,
                LineItems: lineItems,
                TotalPrice: Convert.ToDecimal(oldOrder["total_amount"]),
                OrderStatus: orderStatus
            );
        }

        private string FormatOrderId(string oldId)
        {
            // ORD-2024-001 → ORD-2024-0001
            var parts = oldId.Split('-');
            if (parts.Length == 3 && int.TryParse(parts[2], out int num))
            {
                return $"{parts[0]}-{parts[1]}-{num:D4}";
            }
            return oldId;
        }

        private string FormatDateTime(string dateStr)
        {
            // 2024-01-15 → 2024-01-15T00:00:00Z
            return $"{dateStr}T00:00:00Z";
        }

        public bool ExportToJson(string filepath)
        {
            try
            {
                if (_convertedData.Count == 0)
                {
                    ConvertOrders();
                }

                var json = System.Text.Json.JsonSerializer.Serialize(
                    _convertedData,
                    new System.Text.Json.JsonSerializerOptions
                    {
                        WriteIndented = true,
                        Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
                    }
                );

                File.WriteAllText(filepath, json);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"匯出失敗: {ex.Message}");
                return false;
            }
        }
    }

    #endregion

    /// <summary>
    /// 舊系統遷移範例執行
    /// </summary>
    public static class LegacySystem
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("4. 舊系統資料遷移範例");
            Console.WriteLine("=".PadRight(60, '='));

            // 建立舊系統讀取器
            var legacyReader = new LegacyXmlReader();

            // 建立轉接器
            var adapter = new LegacyToJsonAdapter(legacyReader);

            // 執行轉換
            var newData = adapter.ConvertOrders();

            // 顯示第一筆資料的轉換結果
            var first = newData[0];

            Console.WriteLine("\n【舊系統格式】");
            Console.WriteLine($"  訂單編號: ORD-2024-001");
            Console.WriteLine($"  日期: 2024-01-15");
            Console.WriteLine($"  客戶: 王小明");
            Console.WriteLine($"  商品: {first.LineItems.Count} 項");
            Console.WriteLine($"  總金額: {first.TotalPrice:N0}");
            Console.WriteLine($"  狀態: completed");

            Console.WriteLine("\n【新系統格式 (JSON)】");
            Console.WriteLine($"  orderId: {first.OrderId}");
            Console.WriteLine($"  createdAt: {first.CreatedAt}");
            Console.WriteLine($"  customer: {first.Customer.Name}");
            Console.WriteLine($"  lineItems: {first.LineItems.Count} 項");
            Console.WriteLine($"  totalPrice: {first.TotalPrice}");
            Console.WriteLine($"  orderStatus: {first.OrderStatus}");

            Console.WriteLine("\n【JSON 範例輸出】");
            Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(first,
                new System.Text.Json.JsonSerializerOptions { WriteIndented = true }));

            // 匯出 JSON
            bool success = adapter.ExportToJson("converted_orders.json");
            if (success)
            {
                Console.WriteLine("\n✅ 已成功匯出至 converted_orders.json");
            }

            Console.WriteLine("\n🎯 重點說明：");
            Console.WriteLine("   1. 舊系統完全不需要修改");
            Console.WriteLine("   2. Adapter 負責處理格式轉換");
            Console.WriteLine("   3. 新系統只需要知道 IDataConverter 介面");
            Console.WriteLine("   4. 未來如有其他舊格式，只需新增對應的 Adapter");
        }
    }
}