namespace AdapterExamples
{
    // ============================================================
    // 第三部分：支付閘道整合範例
    // ============================================================

    #region 第三方支付 API (不可修改的外部服務)

    /// <summary>
    /// Line Pay API - 第三方支付系統
    /// </summary>
    public class LinePayApi
    {
        /// <summary>
        /// Line Pay 原始 API
        /// </summary>
        public LinePayResponse SendPaymentRequest(string productName, int amount,
            string orderId, string userId)
        {
            // 模擬 API 呼叫
            return new LinePayResponse
            {
                ReturnCode = "0000",
                ReturnMessage = "Success",
                OrderId = orderId,
                Amount = amount,
                CurrencyCode = "TWD",
                ProductName = productName,
                PaymentUrl = $"https://linepay.example.com/pay/{orderId}"
            };
        }
    }

    public record LinePayResponse(
        string ReturnCode,
        string ReturnMessage,
        string OrderId,
        int Amount,
        string CurrencyCode,
        string ProductName,
        string PaymentUrl
    );

    /// <summary>
    /// 街口支付 API - 第三方支付系統
    /// </summary>
    public class SkuPayApi
    {
        /// <summary>
        /// 街口支付原始 API
        /// </summary>
        public SkuPayResponse CreateTransaction(int orderNo, decimal totalAmount,
            string itemDesc, string callbackUrl)
        {
            // 模擬 API 呼叫
            return new SkuPayResponse
            {
                Code = 1,
                Message = "OK",
                TransactionId = $"SKU{Random.Shared.Next(100000, 999999)}",
                OrderNo = orderNo,
                TotalAmount = totalAmount,
                ItemDesc = itemDesc,
                PayTokenUrl = $"https://skupay.example.com/pay?token={Random.Shared.Next(1000, 9999)}"
            };
        }
    }

    public record SkuPayResponse(
        int Code,
        string Message,
        string TransactionId,
        int OrderNo,
        decimal TotalAmount,
        string ItemDesc,
        string PayTokenUrl
    );

    /// <summary>
    /// 信用卡支付 API - 第三方支付系統
    /// </summary>
    public class CreditCardApi
    {
        /// <summary>
        /// 信用卡原始 API
        /// </summary>
        public CreditCardResponse Charge(string cardNumber, string cvv, int expMonth,
            int expYear, decimal amount, string description)
        {
            // 模擬 API 呼叫
            return new CreditCardResponse
            {
                Status = "authorized",
                AuthCode = $"AUTH{Random.Shared.Next(1000, 9999)}",
                TransactionKey = $"TXN{Random.Shared.Next(100000, 999999)}",
                Amount = amount,
                Currency = "TWD",
                Description = description,
                Timestamp = DateTime.UtcNow.ToString("o")
            };
        }
    }

    public record CreditCardResponse(
        string Status,
        string AuthCode,
        string TransactionKey,
        decimal Amount,
        string Currency,
        string Description,
        string Timestamp
    );

    #endregion

    #region 標準支付介面

    /// <summary>
    /// 標準支付介面 - 所有支付方式都必須實作這個介面
    /// </summary>
    public interface IPaymentGateway
    {
        /// <summary>
        /// 統一的支付方法
        /// </summary>
        PaymentResult Pay(string orderId, decimal amount, string description,
            Dictionary<string, string>? metadata = null);

        /// <summary>
        /// 統一的退款方法
        /// </summary>
        RefundResult Refund(string transactionId, decimal amount, string reason = "");
    }

    /// <summary>
    /// 支付結果
    /// </summary>
    public record PaymentResult(
        bool Success,
        string TransactionId,
        decimal Amount,
        string Message,
        string? PaymentUrl
    );

    /// <summary>
    /// 退款結果
    /// </summary>
    public record RefundResult(
        bool Success,
        string TransactionId,
        decimal Amount,
        string Message
    );

    #endregion

    #region 轉接器實作

    /// <summary>
    /// Line Pay 轉接器
    /// </summary>
    public class LinePayAdapter : IPaymentGateway
    {
        private readonly LinePayApi _api;

        public LinePayAdapter(LinePayApi api)
        {
            _api = api;
        }

        public PaymentResult Pay(string orderId, decimal amount, string description,
            Dictionary<string, string>? metadata = null)
        {
            // 轉接邏輯：浮點數 → 整數
            int intAmount = (int)Math.Round(amount);

            string userId = metadata?.GetValueOrDefault("user_id") ?? "unknown";
            string productName = description.Length > 50 ? description[..50] : description;

            // 呼叫 Line Pay API
            var result = _api.SendPaymentRequest(productName, intAmount, orderId, userId);

            // 轉換為標準格式
            if (result.ReturnCode == "0000")
            {
                return new PaymentResult(
                    Success: true,
                    TransactionId: result.OrderId,
                    Amount: result.Amount,
                    Message: "請使用 Line App 完成付款",
                    PaymentUrl: result.PaymentUrl
                );
            }
            else
            {
                return new PaymentResult(
                    Success: false,
                    TransactionId: "",
                    Amount: amount,
                    Message: result.ReturnMessage,
                    PaymentUrl: null
                );
            }
        }

        public RefundResult Refund(string transactionId, decimal amount, string reason = "")
        {
            // 實際應用會呼叫 Line Pay 的退款 API
            return new RefundResult(
                Success: true,
                TransactionId: $"REF{transactionId}",
                Amount: amount,
                Message: $"已退款，原因: {reason}"
            );
        }
    }

    /// <summary>
    /// 街口支付轉接器
    /// </summary>
    public class SkuPayAdapter : IPaymentGateway
    {
        private readonly SkuPayApi _api;

        public SkuPayAdapter(SkuPayApi api)
        {
            _api = api;
        }

        public PaymentResult Pay(string orderId, decimal amount, string description,
            Dictionary<string, string>? metadata = null)
        {
            // 轉接邏輯：訂單編號字串 → 數字
            int orderNo = int.TryParse(orderId.Replace("ORD", ""), out var num) ? num : 0;

            var result = _api.CreateTransaction(orderNo, amount, description,
                "https://myshop.com/callback/skupay");

            if (result.Code == 1)
            {
                return new PaymentResult(
                    Success: true,
                    TransactionId: result.TransactionId,
                    Amount: result.TotalAmount,
                    Message: "請使用街口支付 App 完成付款",
                    PaymentUrl: result.PayTokenUrl
                );
            }
            else
            {
                return new PaymentResult(
                    Success: false,
                    TransactionId: "",
                    Amount: amount,
                    Message: result.Message,
                    PaymentUrl: null
                );
            }
        }

        public RefundResult Refund(string transactionId, decimal amount, string reason = "")
        {
            return new RefundResult(
                Success: true,
                TransactionId: $"REF{transactionId}",
                Amount: amount,
                Message: $"已退款至街口帳戶，原因: {reason}"
            );
        }
    }

    /// <summary>
    /// 信用卡支付轉接器
    /// </summary>
    public class CreditCardAdapter : IPaymentGateway
    {
        private readonly CreditCardApi _api;

        // 測試用的信用卡資訊
        private const string TestCardNumber = "4111111111111111";
        private const string TestCvv = "123";
        private const int TestExpMonth = 12;
        private const int TestExpYear = 2025;

        public CreditCardAdapter(CreditCardApi api)
        {
            _api = api;
        }

        public PaymentResult Pay(string orderId, decimal amount, string description,
            Dictionary<string, string>? metadata = null)
        {
            // 信用卡直接扣款
            var result = _api.Charge(TestCardNumber, TestCvv, TestExpMonth,
                TestExpYear, amount, description);

            if (result.Status == "authorized")
            {
                return new PaymentResult(
                    Success: true,
                    TransactionId: result.TransactionKey,
                    Amount: result.Amount,
                    Message: "信用卡扣款成功",
                    PaymentUrl: null
                );
            }
            else
            {
                return new PaymentResult(
                    Success: false,
                    TransactionId: "",
                    Amount: amount,
                    Message: "信用卡扣款失敗",
                    PaymentUrl: null
                );
            }
        }

        public RefundResult Refund(string transactionId, decimal amount, string reason = "")
        {
            return new RefundResult(
                Success: true,
                TransactionId: $"REF{transactionId}",
                Amount: amount,
                Message: $"已退回信用卡，原因: {reason}"
            );
        }
    }

    #endregion

    #region 支付工廠

    /// <summary>
    /// 支付工廠 - 根據選擇建立不同的支付轉接器
    /// </summary>
    public static class PaymentFactory
    {
        public static IPaymentGateway CreateGateway(string paymentType)
        {
            return paymentType.ToLower() switch
            {
                "linepay" => new LinePayAdapter(new LinePayApi()),
                "skupay" => new SkuPayAdapter(new SkuPayApi()),
                "creditcard" => new CreditCardAdapter(new CreditCardApi()),
                _ => throw new ArgumentException($"不支援的支付方式: {paymentType}")
            };
        }
    }

    #endregion

    /// <summary>
    /// 支付閘道範例執行
    /// </summary>
    public static class PaymentGateway
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("3. 支付閘道整合範例");
            Console.WriteLine("=".PadRight(60, '='));

            // 測試不同支付方式
            string[] paymentTypes = { "linepay", "skupay", "creditcard" };

            foreach (var ptype in paymentTypes)
            {
                Console.WriteLine($"\n🔄 測試支付方式: {ptype}");

                // 使用工廠建立轉接器
                var gateway = PaymentFactory.CreateGateway(ptype);

                // 模擬訂單
                var result = gateway.Pay(
                    orderId: "ORD1001",
                    amount: 1599.90m,
                    description: "iPhone 15 手機殼",
                    metadata: new Dictionary<string, string> { { "user_id", "USER123" } }
                );

                if (result.Success)
                {
                    Console.WriteLine($"   ✅ 付款成功！");
                    Console.WriteLine($"      交易編號: {result.TransactionId}");
                    Console.WriteLine($"      金額: {result.Amount:N2} TWD");
                    if (!string.IsNullOrEmpty(result.PaymentUrl))
                    {
                        Console.WriteLine($"      付款連結: {result.PaymentUrl}");
                    }
                }
                else
                {
                    Console.WriteLine($"   ❌ 付款失敗: {result.Message}");
                }
            }

            Console.WriteLine("\n🎯 重點說明：");
            Console.WriteLine("   1. 訂單系統只需要知道 IPaymentGateway 介面");
            Console.WriteLine("   2. 新增支付方式只需實作對應的 Adapter");
            Console.WriteLine("   3. 不需要修改訂單系統的程式碼");
        }
    }
}