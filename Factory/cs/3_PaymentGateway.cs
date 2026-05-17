namespace FactoryExamples
{
    // ============================================================
    // 第三部分：支付閘道工廠
    // ============================================================

    #region 支付相關介面與類別

    /// <summary>
    /// 支付請求
    /// </summary>
    public record PaymentRequest(
        string OrderId,
        decimal Amount,
        string Currency,
        string Description,
        Dictionary<string, string>? Metadata = null
    );

    /// <summary>
    /// 支付結果
    /// </summary>
    public record PaymentResponse(
        bool Success,
        string TransactionId,
        string Message,
        DateTime ProcessedAt
    );

    /// <summary>
    /// 退款請求
    /// </summary>
    public record RefundRequest(
        string TransactionId,
        decimal Amount,
        string Reason
    );

    /// <summary>
    /// 退款結果
    /// </summary>
    public record RefundResponse(
        bool Success,
        string RefundId,
        string Message
    );

    #endregion

    #region 支付閘道介面 (Product)

    /// <summary>
    /// 支付閘道介面 - 所有支付方式的共同介面
    /// </summary>
    public interface IPaymentGateway
    {
        string GatewayName { get; }
        PaymentResponse ProcessPayment(PaymentRequest request);
        RefundResponse ProcessRefund(RefundRequest request);
        bool ValidateRequest(PaymentRequest request);
    }

    #endregion

    #region 具體支付閘道 (Concrete Products)

    /// <summary>
    /// Line Pay 閘道
    /// </summary>
    public class LinePayGateway : IPaymentGateway
    {
        public string GatewayName => "LinePay";

        public PaymentResponse ProcessPayment(PaymentRequest request)
        {
            Console.WriteLine($"   [LinePay] 處理付款: {request.OrderId}");
            return new PaymentResponse(
                Success: true,
                TransactionId: $"LINE{Random.Shared.Next(100000, 999999)}",
                Message: "LinePay 付款成功",
                ProcessedAt: DateTime.UtcNow
            );
        }

        public RefundResponse ProcessRefund(RefundRequest request)
        {
            Console.WriteLine($"   [LinePay] 處理退款: {request.TransactionId}");
            return new RefundResponse(
                Success: true,
                RefundId: $"REF{Random.Shared.Next(100000, 999999)}",
                Message: "LinePay 退款成功"
            );
        }

        public bool ValidateRequest(PaymentRequest request)
        {
            return request.Amount > 0 && !string.IsNullOrEmpty(request.OrderId);
        }
    }

    /// <summary>
    /// 街口支付閘道
    /// </summary>
    public class SkuPayGateway : IPaymentGateway
    {
        public string GatewayName => "SkuPay";

        public PaymentResponse ProcessPayment(PaymentRequest request)
        {
            Console.WriteLine($"   [SkuPay] 處理付款: {request.OrderId}");
            return new PaymentResponse(
                Success: true,
                TransactionId: $"SKU{Random.Shared.Next(100000, 999999)}",
                Message: "街口支付付款成功",
                ProcessedAt: DateTime.UtcNow
            );
        }

        public RefundResponse ProcessRefund(RefundRequest request)
        {
            Console.WriteLine($"   [SkuPay] 處理退款: {request.TransactionId}");
            return new RefundResponse(
                Success: true,
                RefundId: $"SKUREF{Random.Shared.Next(100000, 999999)}",
                Message: "街口支付退款成功"
            );
        }

        public bool ValidateRequest(PaymentRequest request)
        {
            return request.Amount >= 10 && !string.IsNullOrEmpty(request.OrderId);
        }
    }

    /// <summary>
    /// 信用卡閘道
    /// </summary>
    public class CreditCardGateway : IPaymentGateway
    {
        public string GatewayName => "CreditCard";

        public PaymentResponse ProcessPayment(PaymentRequest request)
        {
            Console.WriteLine($"   [CreditCard] 處理付款: {request.OrderId}");
            return new PaymentResponse(
                Success: true,
                TransactionId: $"CC{Random.Shared.Next(100000, 999999)}",
                Message: "信用卡扣款成功",
                ProcessedAt: DateTime.UtcNow
            );
        }

        public RefundResponse ProcessRefund(RefundRequest request)
        {
            Console.WriteLine($"   [CreditCard] 處理退款: {request.TransactionId}");
            return new RefundResponse(
                Success: true,
                RefundId: $"CCREF{Random.Shared.Next(100000, 999999)}",
                Message: "信用卡退款成功"
            );
        }

        public bool ValidateRequest(PaymentRequest request)
        {
            return request.Amount > 0 && request.Currency == "TWD";
        }
    }

    /// <summary>
    /// PayPal 閘道
    /// </summary>
    public class PayPalGateway : IPaymentGateway
    {
        public string GatewayName => "PayPal";

        public PaymentResponse ProcessPayment(PaymentRequest request)
        {
            Console.WriteLine($"   [PayPal] 處理付款: {request.OrderId}");
            return new PaymentResponse(
                Success: true,
                TransactionId: $"PP{Random.Shared.Next(100000, 999999)}",
                Message: "PayPal 付款成功",
                ProcessedAt: DateTime.UtcNow
            );
        }

        public RefundResponse ProcessRefund(RefundRequest request)
        {
            Console.WriteLine($"   [PayPal] 處理退款: {request.TransactionId}");
            return new RefundResponse(
                Success: true,
                RefundId: $"PPREF{Random.Shared.Next(100000, 999999)}",
                Message: "PayPal 退款成功"
            );
        }

        public bool ValidateRequest(PaymentRequest request)
        {
            return request.Amount > 0;
        }
    }

    #endregion

    #region 工廠 (Factory)

    /// <summary>
    /// 支付閘道工廠 - 使用靜態方法建立閘道
    /// </summary>
    public static class PaymentGatewayFactory
    {
        private static readonly Dictionary<string, Func<IPaymentGateway>> _gateways = new()
        {
            { "linepay", () => new LinePayGateway() },
            { "skupay", () => new SkuPayGateway() },
            { "creditcard", () => new CreditCardGateway() },
            { "paypal", () => new PayPalGateway() }
        };

        /// <summary>
        /// 建立支付閘道
        /// </summary>
        public static IPaymentGateway CreateGateway(string gatewayType)
        {
            var key = gatewayType.ToLower();
            if (_gateways.TryGetValue(key, out var createFunc))
            {
                return createFunc();
            }
            throw new ArgumentException($"不支援的支付閘道: {gatewayType}");
        }

        /// <summary>
        /// 取得所有可用的閘道
        /// </summary>
        public static IEnumerable<string> GetAvailableGateways()
        {
            return _gateways.Keys;
        }

        /// <summary>
        /// 檢查是否支援某個閘道
        /// </summary>
        public static bool IsGatewaySupported(string gatewayType)
        {
            return _gateways.ContainsKey(gatewayType.ToLower());
        }
    }

    /// <summary>
    /// 支付服務 - 使用工廠建立閘道
    /// </summary>
    public class PaymentService
    {
        private IPaymentGateway? _currentGateway;

        public void SetGateway(string gatewayType)
        {
            _currentGateway = PaymentGatewayFactory.CreateGateway(gatewayType);
        }

        public PaymentResponse Pay(PaymentRequest request)
        {
            if (_currentGateway == null)
                throw new InvalidOperationException("請先設定支付閘道");

            if (!_currentGateway.ValidateRequest(request))
                return new PaymentResponse(false, "", "驗證失敗", DateTime.UtcNow);

            return _currentGateway.ProcessPayment(request);
        }

        public RefundResponse Refund(RefundRequest request)
        {
            if (_currentGateway == null)
                throw new InvalidOperationException("請先設定支付閘道");

            return _currentGateway.ProcessRefund(request);
        }
    }

    #endregion

    /// <summary>
    /// 支付閘道工廠範例執行
    /// </summary>
    public static class PaymentGateway
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("3. 支付閘道工廠 (Abstract Factory 概念)");
            Console.WriteLine("=".PadRight(60, '='));

            Console.WriteLine($"\n📋 可用的支付閘道:");
            foreach (var gateway in PaymentGatewayFactory.GetAvailableGateways())
            {
                Console.WriteLine($"   - {gateway}");
            }

            // 使用工廠建立閘道
            var linePay = PaymentGatewayFactory.CreateGateway("linepay");
            var creditCard = PaymentGatewayFactory.CreateGateway("creditcard");

            Console.WriteLine($"\n💳 使用 LinePay:");
            Console.WriteLine($"   閘道名稱: {linePay.GatewayName}");

            Console.WriteLine($"\n💳 使用 CreditCard:");
            Console.WriteLine($"   閘道名稱: {creditCard.GatewayName}");

            // 使用支付服務
            var paymentService = new PaymentService();

            var request = new PaymentRequest(
                OrderId: "ORD-2024-001",
                Amount: 1599.90m,
                Currency: "TWD",
                Description: "iPhone 15 手機殼"
            );

            Console.WriteLine($"\n📱 處理訂單: {request.OrderId}");
            Console.WriteLine($"   金額: {request.Amount} {request.Currency}");

            paymentService.SetGateway("linepay");
            var result = paymentService.Pay(request);

            Console.WriteLine($"\n✅ 付款結果:");
            Console.WriteLine($"   成功: {result.Success}");
            Console.WriteLine($"   交易編號: {result.TransactionId}");
            Console.WriteLine($"   訊息: {result.Message}");

            Console.WriteLine("\n🎯 重點說明：");
            Console.WriteLine("   1. IPaymentGateway 是產品介面");
            Console.WriteLine("   2. 具體閘道 (LinePay, CreditCard) 是具體產品");
            Console.WriteLine("   3. PaymentGatewayFactory 是工廠，負責建立產品");
            Console.WriteLine("   4. 客戶端不需要知道具體的閘道實作");
            Console.WriteLine("   5. 新增支付方式只需在工廠中註冊");
        }
    }
}