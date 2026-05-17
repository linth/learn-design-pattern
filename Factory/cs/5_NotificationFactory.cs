namespace FactoryExamples
{
    // ============================================================
    // 第五部分：通知服務工廠
    // ============================================================

    #region 通知相關類別

    /// <summary>
    /// 通知請求
    /// </summary>
    public record NotificationRequest(
        string To,
        string Subject,
        string Body,
        NotificationPriority Priority = NotificationPriority.Normal
    );

    /// <summary>
    /// 通知優先級
    /// </summary>
    public enum NotificationPriority
    {
        Low,
        Normal,
        High,
        Urgent
    }

    /// <summary>
    /// 通知結果
    /// </summary>
    public record NotificationResult(
        bool Success,
        string MessageId,
        string Message,
        DateTime SentAt
    );

    #endregion

    #region 通知介面 (Product)

    /// <summary>
    /// 通知通道介面
    /// </summary>
    public interface INotificationChannel
    {
        string ChannelName { get; }
        NotificationResult Send(NotificationRequest request);
        bool IsAvailable();
    }

    #endregion

    #region 具體通知通道 (Concrete Products)

    /// <summary>
    /// 電子郵件通知
    /// </summary>
    public class EmailNotification : INotificationChannel
    {
        public string ChannelName => "Email";

        public NotificationResult Send(NotificationRequest request)
        {
            Console.WriteLine($"   [Email] 發送郵件至: {request.To}");
            Console.WriteLine($"   [Email] 主旨: {request.Subject}");
            return new NotificationResult(
                Success: true,
                MessageId: $"EMAIL-{Guid.NewGuid():N}".Substring(0, 20),
                Message: "郵件已發送",
                SentAt: DateTime.UtcNow
            );
        }

        public bool IsAvailable() => true;
    }

    /// <summary>
    /// 簡訊通知
    /// </summary>
    public class SmsNotification : INotificationChannel
    {
        public string ChannelName => "SMS";

        public NotificationResult Send(NotificationRequest request)
        {
            // 簡訊通常有字數限制
            var body = request.Body.Length > 70
                ? request.Body.Substring(0, 67) + "..."
                : request.Body;

            Console.WriteLine($"   [SMS] 發送簡訊至: {request.To}");
            Console.WriteLine($"   [SMS] 內容: {body}");
            return new NotificationResult(
                Success: true,
                MessageId: $"SMS-{Random.Shared.Next(100000, 999999)}",
                Message: "簡訊已發送",
                SentAt: DateTime.UtcNow
            );
        }

        public bool IsAvailable() => true;
    }

    /// <summary>
    /// LINE 通知
    /// </summary>
    public class LineNotification : INotificationChannel
    {
        public string ChannelName => "LINE";

        public NotificationResult Send(NotificationRequest request)
        {
            Console.WriteLine($"   [LINE] 發送訊息至: {request.To}");
            Console.WriteLine($"   [LINE] 內容: {request.Body}");
            return new NotificationResult(
                Success: true,
                MessageId: $"LINE-{Guid.NewGuid():N}".Substring(0, 20),
                Message: "LINE 訊息已發送",
                SentAt: DateTime.UtcNow
            );
        }

        public bool IsAvailable() => true;
    }

    /// <summary>
    /// 推播通知 (Push Notification)
    /// </summary>
    public class PushNotification : INotificationChannel
    {
        public string ChannelName => "Push";

        public NotificationResult Send(NotificationRequest request)
        {
            Console.WriteLine($"   [Push] 發送推播");
            Console.WriteLine($"   [Push] 標題: {request.Subject}");
            Console.WriteLine($"   [Push] 內容: {request.Body}");
            return new NotificationResult(
                Success: true,
                MessageId: $"PUSH-{Random.Shared.Next(100000, 999999)}",
                Message: "推播已發送",
                SentAt: DateTime.UtcNow
            );
        }

        public bool IsAvailable() => true;
    }

    /// <summary>
    /// Webhook 通知
    /// </summary>
    public class WebhookNotification : INotificationChannel
    {
        private readonly string _webhookUrl;

        public WebhookNotification(string webhookUrl)
        {
            _webhookUrl = webhookUrl;
        }

        public string ChannelName => "Webhook";

        public NotificationResult Send(NotificationRequest request)
        {
            Console.WriteLine($"   [Webhook] 發送至: {_webhookUrl}");
            Console.WriteLine($"   [Webhook] 資料: {request.Subject}");
            return new NotificationResult(
                Success: true,
                MessageId: $"WEB-{Random.Shared.Next(100000, 999999)}",
                Message: "Webhook 已觸發",
                SentAt: DateTime.UtcNow
            );
        }

        public bool IsAvailable() => true;
    }

    #endregion

    #region 工廠與服務

    /// <summary>
    /// 通知通道工廠
    /// </summary>
    public static class NotificationChannelFactory
    {
        /// <summary>
        /// 建立通知通道
        /// </summary>
        public static INotificationChannel CreateChannel(string channelType)
        {
            return channelType.ToLower() switch
            {
                "email" => new EmailNotification(),
                "sms" => new SmsNotification(),
                "line" => new LineNotification(),
                "push" => new PushNotification(),
                "webhook" => new WebhookNotification("https://example.com/webhook"),
                _ => throw new ArgumentException($"不支援的通知通道: {channelType}")
            };
        }

        /// <summary>
        /// 根據優先級選擇最佳通道
        /// </summary>
        public static INotificationChannel GetChannelByPriority(NotificationPriority priority)
        {
            return priority switch
            {
                NotificationPriority.Urgent => new SmsNotification(),  // 緊急用簡訊
                NotificationPriority.High => new LineNotification(),   // 高優先級用 LINE
                NotificationPriority.Normal => new EmailNotification(), // 一般用 Email
                NotificationPriority.Low => new PushNotification()     // 低優先級用推播
            };
        }
    }

    /// <summary>
    /// 通知服務 - 發送各類通知
    /// </summary>
    public class NotificationService
    {
        private readonly Dictionary<string, INotificationChannel> _channels = new();

        public void RegisterChannel(string name, INotificationChannel channel)
        {
            _channels[name.ToLower()] = channel;
        }

        public void Send(string channelName, NotificationRequest request)
        {
            if (_channels.TryGetValue(channelName.ToLower(), out var channel))
            {
                var result = channel.Send(request);
                Console.WriteLine($"   ✅ 發送成功: {result.MessageId}");
            }
            else
            {
                Console.WriteLine($"   ❌ 未找到通道: {channelName}");
            }
        }

        public void SendToAll(NotificationRequest request)
        {
            Console.WriteLine($"\n🌐 發送通知至所有通道...");
            foreach (var channel in _channels.Values)
            {
                try
                {
                    channel.Send(request);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"   ⚠️ {channel.ChannelName} 失敗: {ex.Message}");
                }
            }
        }
    }

    #endregion

    /// <summary>
    /// 通知工廠範例執行
    /// </summary>
    public static class NotificationFactory
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("5. 通知服務工廠");
            Console.WriteLine("=".PadRight(60, '='));

            // 註冊通知通道
            var service = new NotificationService();
            service.RegisterChannel("email", new EmailNotification());
            service.RegisterChannel("sms", new SmsNotification());
            service.RegisterChannel("line", new LineNotification());
            service.RegisterChannel("push", new PushNotification());

            // 建立通知請求
            var orderNotification = new NotificationRequest(
                To: "customer@example.com",
                Subject: "訂單確認",
                Body: "您的訂單已確認，將於 3 天內送達",
                Priority: NotificationPriority.Normal
            );

            var urgentNotification = new NotificationRequest(
                To: "admin@example.com",
                Subject: "系統警告",
                Body: "伺服器 CPU 使用率超過 90%",
                Priority: NotificationPriority.Urgent
            );

            Console.WriteLine("\n📧 使用 Email 通道:");
            service.Send("email", orderNotification);

            Console.WriteLine("\n💬 使用 LINE 通道:");
            service.Send("line", orderNotification);

            Console.WriteLine("\n📱 使用 Push 通道:");
            service.Send("push", orderNotification);

            Console.WriteLine("\n⚡ 使用優先級自動選擇通道:");
            var urgentChannel = NotificationChannelFactory.GetChannelByPriority(NotificationPriority.Urgent);
            var urgentResult = urgentChannel.Send(urgentNotification);
            Console.WriteLine($"   選擇通道: {urgentChannel.ChannelName}");

            Console.WriteLine("\n🌐 發送至所有通道:");
            service.SendToAll(orderNotification);

            Console.WriteLine("\n🎯 重點說明：");
            Console.WriteLine("   1. INotificationChannel 是產品介面");
            Console.WriteLine("   2. 各通道 (Email, SMS, LINE) 是具體產品");
            Console.WriteLine("   3. NotificationChannelFactory 是工廠");
            Console.WriteLine("   4. 可根據優先級自動選擇適合的通道");
            Console.WriteLine("   5. 常見應用場景：");
            Console.WriteLine("      - 系統通知 (Email, Push)");
            Console.WriteLine("      - 驗證碼 (SMS)");
            Console.WriteLine("      - 行銷訊息 (LINE, Email)");
            Console.WriteLine("      - 警示通知 (Webhook)");
        }
    }
}