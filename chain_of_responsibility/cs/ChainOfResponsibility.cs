namespace ChainOfResponsibilityExamples
{
    // ============================================================
    // Chain of Responsibility（責任鏈模式）
    // 將請求沿著一條處理器鏈傳遞，每個處理器可決定是否處理請求
    // 或將請求傳遞給下一個處理器。
    // ============================================================

    // [抽象處理器] 責任鏈的基底類別
    public abstract class AbstractHandler
    {
        protected AbstractHandler? _nextHandler;

        public AbstractHandler SetNext(AbstractHandler handler)
        {
            _nextHandler = handler;
            return handler;
        }

        public virtual void Handle(object request)
        {
            _nextHandler?.Handle(request);
        }
    }

    // ============================================================
    // 情境一：請假審批流程
    // ============================================================

    public class LeaveRequest
    {
        public int Days { get; }

        public LeaveRequest(int days)
        {
            Days = days;
        }
    }

    public class TeamLeadHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is LeaveRequest leave && leave.Days <= 3)
                Console.WriteLine($"[組長] 核准 {leave.Days} 天請假");
            else
                base.Handle(request);
        }
    }

    public class ManagerLeaveHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is LeaveRequest leave && leave.Days <= 7)
                Console.WriteLine($"[經理] 核准 {leave.Days} 天請假");
            else
                base.Handle(request);
        }
    }

    public class DirectorLeaveHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is LeaveRequest leave && leave.Days <= 15)
                Console.WriteLine($"[總監] 核准 {leave.Days} 天請假");
            else
                base.Handle(request);
        }
    }

    public class CEOLeaveHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is LeaveRequest leave)
                Console.WriteLine($"[CEO] 核准 {leave.Days} 天請假（特批）");
        }
    }

    // ============================================================
    // 情境二：轉帳風控驗證
    // ============================================================

    public class TransferRequest
    {
        public double Money { get; }

        public TransferRequest(double money)
        {
            Money = money;
        }
    }

    public class FirstRiskControlHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is TransferRequest tr && tr.Money <= 1000)
                Console.WriteLine($"[初級風控] 簡單轉帳 ${tr.Money} 完成");
            else
                base.Handle(request);
        }
    }

    public class SecondRiskControlHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is TransferRequest tr && tr.Money <= 10000)
                Console.WriteLine($"[中級風控] 簡訊驗證轉帳 ${tr.Money} 完成");
            else
                base.Handle(request);
        }
    }

    public class ThirdRiskControlHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is TransferRequest tr)
                Console.WriteLine($"[高級風控] 人臉辨識轉帳 ${tr.Money} 完成");
            else
                base.Handle(request);
        }
    }

    // ============================================================
    // 情境三：優惠券處理系統
    // ============================================================

    public class CouponRequest
    {
        public string Code { get; }
        public double Amount { get; }

        public CouponRequest(string code, double amount)
        {
            Code = code;
            Amount = amount;
        }
    }

    public class DiscountCouponHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is CouponRequest cr && cr.Code.StartsWith("DISCOUNT"))
                Console.WriteLine($"[折扣券] 套用折扣券 {cr.Code}");
            else
                base.Handle(request);
        }
    }

    public class ThresholdCouponHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is CouponRequest cr && cr.Code.StartsWith("THRESHOLD"))
                Console.WriteLine($"[滿減券] 套用滿減券 {cr.Code}");
            else
                base.Handle(request);
        }
    }

    public class FreeShippingCouponHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is CouponRequest cr && cr.Code.StartsWith("FREESHIP"))
                Console.WriteLine($"[免運券] 套用免運券 {cr.Code}");
            else
                base.Handle(request);
        }
    }

    // ============================================================
    // 情境四：日誌層級處理
    // ============================================================

    public class LogEntry
    {
        public string Level { get; }
        public string Message { get; }

        public LogEntry(string level, string message)
        {
            Level = level;
            Message = message;
        }
    }

    public class DebugLogHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is LogEntry log && log.Level == "DEBUG")
                Console.WriteLine($"[DEBUG] 寫入詳細日誌: {log.Message}");
            else
                base.Handle(request);
        }
    }

    public class InfoLogHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is LogEntry log && log.Level == "INFO")
                Console.WriteLine($"[INFO] 寫入一般日誌: {log.Message}");
            else
                base.Handle(request);
        }
    }

    public class WarnLogHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is LogEntry log && log.Level == "WARN")
                Console.WriteLine($"[WARN] 發送警報: {log.Message}");
            else
                base.Handle(request);
        }
    }

    public class ErrorLogHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is LogEntry log && log.Level == "ERROR")
                Console.WriteLine($"[ERROR] 發送郵件通知: {log.Message}");
            else
                base.Handle(request);
        }
    }

    // ============================================================
    // 情境五：HTTP 中介軟體管線
    // ============================================================

    public class HttpRequest
    {
        public string Path { get; }
        public string Token { get; }
        public string Role { get; }

        public HttpRequest(string path, string token, string role)
        {
            Path = path;
            Token = token;
            Role = role;
        }
    }

    public class AuthMiddleware : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is HttpRequest http && string.IsNullOrEmpty(http.Token))
                Console.WriteLine("[驗證] 拒絕：未提供 Token");
            else
                base.Handle(request);
        }
    }

    public class RoleMiddleware : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is HttpRequest http && http.Role != "admin")
                Console.WriteLine($"[授權] 拒絕：角色 '{http.Role}' 無權限");
            else
                base.Handle(request);
        }
    }

    public class LoggingMiddleware : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is HttpRequest http)
                Console.WriteLine($"[記錄] {http.Role} 請求 {http.Path}");
            base.Handle(request);
        }
    }

    public class HandlerMiddleware : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is HttpRequest http)
                Console.WriteLine($"[處理] 執行 {http.Path} 處理器");
        }
    }

    // ============================================================
    // 情境六：技術支援客服分層
    // ============================================================

    public class SupportTicket
    {
        public string Category { get; }
        public string Description { get; }

        public SupportTicket(string category, string description)
        {
            Category = category;
            Description = description;
        }
    }

    public class FAQBotHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is SupportTicket ticket && ticket.Category == "faq")
                Console.WriteLine($"[FAQ機器人] 自動回覆: {ticket.Description}");
            else
                base.Handle(request);
        }
    }

    public class Level1SupportHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is SupportTicket ticket &&
                (ticket.Category == "billing" || ticket.Category == "account"))
                Console.WriteLine($"[一線客服] 處理: {ticket.Description}");
            else
                base.Handle(request);
        }
    }

    public class Level2SupportHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is SupportTicket ticket && ticket.Category == "technical")
                Console.WriteLine($"[二線客服] 處理: {ticket.Description}");
            else
                base.Handle(request);
        }
    }

    public class SupportManagerHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is SupportTicket ticket)
                Console.WriteLine($"[主管] 處理客訴: {ticket.Description}");
        }
    }

    // ============================================================
    // 情境七：動物食物處理（概念範例）
    // ============================================================

    public class MonkeyHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is string food && food == "Banana")
                Console.WriteLine($"Monkey: I'll eat the {food}");
            else
                base.Handle(request);
        }
    }

    public class SquirrelHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is string food && food == "Nut")
                Console.WriteLine($"Squirrel: I'll eat the {food}");
            else
                base.Handle(request);
        }
    }

    public class DogFoodHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is string food && food == "MeatBall")
                Console.WriteLine($"Dog: I'll eat the {food}");
            else
                base.Handle(request);
        }
    }

    // ============================================================
    // 情境八：設備輪詢處理（SNMP / IoT）
    // ============================================================

    public interface IDevice
    {
        void Poll();
    }

    public class SNMPDevice : IDevice
    {
        public void Poll() => Console.WriteLine("Polling SNMP device...");
    }

    public class IoTDevice : IDevice
    {
        public void Poll() => Console.WriteLine("Polling IoT device...");
    }

    public class SNMPHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is IDevice device && device is SNMPDevice)
                device.Poll();
            else
                base.Handle(request);
        }
    }

    public class IoTHandler : AbstractHandler
    {
        public override void Handle(object request)
        {
            if (request is IDevice device && device is IoTDevice)
                device.Poll();
            else
                base.Handle(request);
        }
    }

    // ============================================================
    // 執行入口
    // ============================================================

    public static class ChainOfResponsibilityDemo
    {
        public static void Run()
        {
            Console.WriteLine("============================================================");
            Console.WriteLine("Chain of Responsibility 責任鏈模式 範例");
            Console.WriteLine("============================================================");

            // 情境一：請假審批
            Console.WriteLine("\n情境一：請假審批流程");
            var leaveChain = new TeamLeadHandler();
            leaveChain.SetNext(new ManagerLeaveHandler())
                      .SetNext(new DirectorLeaveHandler())
                      .SetNext(new CEOLeaveHandler());
            leaveChain.Handle(new LeaveRequest(2));
            leaveChain.Handle(new LeaveRequest(10));
            leaveChain.Handle(new LeaveRequest(20));

            // 情境二：轉帳風控
            Console.WriteLine("\n情境二：轉帳風控驗證");
            var riskChain = new FirstRiskControlHandler();
            riskChain.SetNext(new SecondRiskControlHandler())
                     .SetNext(new ThirdRiskControlHandler());
            riskChain.Handle(new TransferRequest(500));
            riskChain.Handle(new TransferRequest(5000));
            riskChain.Handle(new TransferRequest(50000));

            // 情境三：優惠券處理
            Console.WriteLine("\n情境三：優惠券處理系統");
            var couponChain = new DiscountCouponHandler();
            couponChain.SetNext(new ThresholdCouponHandler())
                       .SetNext(new FreeShippingCouponHandler());
            couponChain.Handle(new CouponRequest("DISCOUNT123", 100));
            couponChain.Handle(new CouponRequest("THRESHOLD456", 200));
            couponChain.Handle(new CouponRequest("FREESHIP789", 0));

            // 情境四：日誌層級
            Console.WriteLine("\n情境四：日誌層級處理");
            var logChain = new DebugLogHandler();
            logChain.SetNext(new InfoLogHandler())
                    .SetNext(new WarnLogHandler())
                    .SetNext(new ErrorLogHandler());
            logChain.Handle(new LogEntry("DEBUG", "系統啟動中"));
            logChain.Handle(new LogEntry("WARN", "磁碟空間不足"));
            logChain.Handle(new LogEntry("ERROR", "資料庫連線失敗"));

            // 情境五：中介軟體
            Console.WriteLine("\n情境五：HTTP 中介軟體管線");
            var middlewareChain = new AuthMiddleware();
            middlewareChain.SetNext(new RoleMiddleware())
                           .SetNext(new LoggingMiddleware())
                           .SetNext(new HandlerMiddleware());
            middlewareChain.Handle(new HttpRequest("/admin", "valid", "admin"));
            middlewareChain.Handle(new HttpRequest("/admin", "valid", "guest"));
            middlewareChain.Handle(new HttpRequest("/admin", "", "guest"));

            // 情境六：客服分層
            Console.WriteLine("\n情境六：技術支援客服分層");
            var supportChain = new FAQBotHandler();
            supportChain.SetNext(new Level1SupportHandler())
                        .SetNext(new Level2SupportHandler())
                        .SetNext(new SupportManagerHandler());
            supportChain.Handle(new SupportTicket("faq", "如何重設密碼"));
            supportChain.Handle(new SupportTicket("billing", "帳單有誤"));
            supportChain.Handle(new SupportTicket("technical", "系統當機"));
            supportChain.Handle(new SupportTicket("complaint", "我要投訴"));

            // 情境七：動物食物
            Console.WriteLine("\n情境七：動物食物處理（概念範例）");
            var animalChain = new MonkeyHandler();
            animalChain.SetNext(new SquirrelHandler())
                       .SetNext(new DogFoodHandler());
            foreach (var food in new[] { "Nut", "Banana", "Cup of coffee" })
            {
                Console.WriteLine($"\nClient: Who wants a {food}?");
                animalChain.Handle(food);
            }

            // 情境八：設備輪詢
            Console.WriteLine("\n情境八：設備輪詢處理（SNMP / IoT）");
            var deviceChain = new SNMPHandler();
            deviceChain.SetNext(new IoTHandler());
            deviceChain.Handle(new SNMPDevice());
            deviceChain.Handle(new IoTDevice());
        }
    }
}
