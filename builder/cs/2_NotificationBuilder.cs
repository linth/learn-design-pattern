namespace BuilderExamples
{
    // ============================================================
    // 第二部分：通知訊息建構器
    // ============================================================

    /// <summary>
    /// 通知訊息產品 (Product)
    /// </summary>
    public class Notification
    {
        public string Title { get; set; } = "";
        public string Body { get; set; } = "";
        public NotificationType Type { get; set; }
        public NotificationPriority Priority { get; set; }
        public string? ImageUrl { get; set; }
        public string? ActionUrl { get; set; }
        public List<string> Tags { get; set; } = new();
        public Dictionary<string, string> Metadata { get; set; } = new();
        public DateTime? ScheduledAt { get; set; }
        public string? SenderId { get; set; }
        public bool IsSilent { get; set; }

        public void Print()
        {
            Console.WriteLine($"""
               📧 通知訊息
               ─────────────────────────────────────────
               標題: {Title}
               內容: {Body}
               類型: {Type}
               優先級: {Priority}
               圖片: {(string.IsNullOrEmpty(ImageUrl) ? "無" : ImageUrl)}
               動作連結: {(string.IsNullOrEmpty(ActionUrl) ? "無" : ActionUrl)}
               標籤: {(Tags.Count > 0 ? string.Join(", ", Tags) : "無")}
               排程時間: {(ScheduledAt.HasValue ? ScheduledAt.Value.ToString("yyyy-MM-dd HH:mm") : "立即")}
               發送者: {(string.IsNullOrEmpty(SenderId) ? "系統" : SenderId)}
               靜音: {(IsSilent ? "是" : "否")}
               """);
        }
    }

    public enum NotificationType
    {
        Info,
        Success,
        Warning,
        Error,
        Promo,
        System
    }

    public enum NotificationPriority
    {
        Low,
        Normal,
        High,
        Urgent
    }

    /// <summary>
    /// 通知 Builder (使用 Fluent Interface)
    /// </summary>
    public class NotificationBuilder
    {
        private Notification _notification = new();

        public NotificationBuilder SetTitle(string title)
        {
            _notification.Title = title;
            return this;
        }

        public NotificationBuilder SetBody(string body)
        {
            _notification.Body = body;
            return this;
        }

        public NotificationBuilder SetType(NotificationType type)
        {
            _notification.Type = type;
            return this;
        }

        public NotificationBuilder SetPriority(NotificationPriority priority)
        {
            _notification.Priority = priority;
            return this;
        }

        public NotificationBuilder SetImage(string url)
        {
            _notification.ImageUrl = url;
            return this;
        }

        public NotificationBuilder SetActionUrl(string url)
        {
            _notification.ActionUrl = url;
            return this;
        }

        public NotificationBuilder AddTag(string tag)
        {
            _notification.Tags.Add(tag);
            return this;
        }

        public NotificationBuilder AddTags(params string[] tags)
        {
            _notification.Tags.AddRange(tags);
            return this;
        }

        public NotificationBuilder AddMetadata(string key, string value)
        {
            _notification.Metadata[key] = value;
            return this;
        }

        public NotificationBuilder Schedule(DateTime dateTime)
        {
            _notification.ScheduledAt = dateTime;
            return this;
        }

        public NotificationBuilder SetSender(string senderId)
        {
            _notification.SenderId = senderId;
            return this;
        }

        public NotificationBuilder SetSilent(bool silent = true)
        {
            _notification.IsSilent = silent;
            return this;
        }

        public Notification Build()
        {
            // 驗證必要欄位
            if (string.IsNullOrEmpty(_notification.Title))
                _notification.Title = "通知";
            if (string.IsNullOrEmpty(_notification.Body))
                _notification.Body = "";

            return _notification;
        }

        // 靜態工廠方法 - 更容易使用
        public static NotificationBuilder Create() => new();
    }

    /// <summary>
    /// 通知服務範例執行
    /// </summary>
    public static class NotificationBuilder
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("2. 通知訊息建構器 (Fluent Interface)");
            Console.WriteLine("=".PadRight(60, '='));

            // 建立簡單的通知
            Console.WriteLine("\n📧 範例 1 - 簡單通知:");
            var simpleNotification = NotificationBuilder.Create()
                .SetTitle("訂單已確認")
                .SetBody("您的訂單將於 3 天內送達")
                .Build();
            simpleNotification.Print();

            // 建立促銷通知
            Console.WriteLine("\n🏷️ 範例 2 - 促銷通知:");
            var promoNotification = NotificationBuilder.Create()
                .SetTitle("雙11優惠來襲！")
                .SetBody("全館 5 折起，錯過等一年！")
                .SetType(NotificationType.Promo)
                .SetPriority(NotificationPriority.High)
                .SetImage("https://example.com/promo.jpg")
                .SetActionUrl("https://shop.com/promo")
                .AddTags("promo", "sale", "limited")
                .Build();
            promoNotification.Print();

            // 建立系統警告通知
            Console.WriteLine("\n⚠️ 範例 3 - 系統警告:");
            var warningNotification = NotificationBuilder.Create()
                .SetTitle("帳單逾期提醒")
                .SetBody("您的帳單已逾期 7 天，請盡速繳納")
                .SetType(NotificationType.Warning)
                .SetPriority(NotificationPriority.Urgent)
                .AddMetadata("bill_id", "BILL-2024-001")
                .AddMetadata("amount", "3500")
                .SetSender("billing-system")
                .Build();
            warningNotification.Print();

            // 建立排程通知
            Console.WriteLine("\n⏰ 範例 4 - 排程通知:");
            var scheduledNotification = NotificationBuilder.Create()
                .SetTitle("每週報告")
                .SetBody("本週營收成長 15%")
                .SetType(NotificationType.Info)
                .Schedule(DateTime.Now.AddHours(2))
                .Build();
            scheduledNotification.Print();

            Console.WriteLine("\n🎯 重點說明：");
            Console.WriteLine("   1. Fluent Interface - 方法可鏈式呼叫");
            Console.WriteLine("   2. 每個 Set 方法回傳 this");
            Console.WriteLine("   3. Build() 方法負責驗證和建立最終產品");
            Console.WriteLine("   4. 靜態工廠方法 Create() 使語法更簡潔");
            Console.WriteLine("   5. 可選參數可以逐步設定，彈性很高");
        }
    }
}