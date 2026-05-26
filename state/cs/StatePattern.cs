namespace StateExamples
{
    // ============================================================
    // 狀態模式 (State Design Pattern)
    //
    // 核心概念：
    // 1. 允許物件在內部狀態改變時改變其行為，彷彿換了一個類別。
    // 2. 將每個狀態的邏輯封裝到獨立的狀態類別中，避免大量 if-else。
    // 3. 狀態之間的轉換由狀態類別自行管理，或由 Context 統一管理。
    // ============================================================

    // [狀態介面] 訂單狀態的統一規範
    public interface IOrderState
    {
        void PayOrder();
        void ShipOrder();
        void DeliverOrder();
        void CancelOrder();
    }

    // [環境類別 Context] 訂單，持有當前狀態
    public class Order
    {
        private IOrderState _state;

        public Order()
        {
            _state = new NewState(this);
        }

        public void SetState(IOrderState state)
        {
            _state = state;
        }

        public IOrderState GetState() => _state;

        public void PayOrder() => _state.PayOrder();
        public void ShipOrder() => _state.ShipOrder();
        public void DeliverOrder() => _state.DeliverOrder();
        public void CancelOrder() => _state.CancelOrder();
    }

    // --- 抽象基底狀態（提供預設不允許操作的行為）---

    /// <summary>
    /// 抽象狀態：實作各操作的預設行為（拋出不允許操作的訊息）。
    /// 子類別只覆寫自己允許的操作。
    /// </summary>
    public abstract class BaseOrderState : IOrderState
    {
        protected Order Order;

        protected BaseOrderState(Order order)
        {
            Order = order;
        }

        public virtual void PayOrder()
        {
            Console.WriteLine("❌ 付款失敗：目前狀態不允許此操作。");
        }

        public virtual void ShipOrder()
        {
            Console.WriteLine("❌ 出貨失敗：目前狀態不允許此操作。");
        }

        public virtual void DeliverOrder()
        {
            Console.WriteLine("❌ 送達失敗：目前狀態不允許此操作。");
        }

        public virtual void CancelOrder()
        {
            Console.WriteLine("❌ 取消失敗：目前狀態不允許此操作。");
        }
    }

    // --- 具體狀態 ---

    /// <summary>
    /// 新訂單狀態：可付款或取消
    /// </summary>
    public class NewState : BaseOrderState
    {
        public NewState(Order order) : base(order) { }

        public override void PayOrder()
        {
            Console.WriteLine("✅ 付款成功。");
            Order.SetState(new PaidState(Order));
        }

        public override void CancelOrder()
        {
            Console.WriteLine("✅ 訂單已取消。");
            Order.SetState(new CancelledState(Order));
        }
    }

    /// <summary>
    /// 已付款狀態：可出貨或取消（需退款）
    /// </summary>
    public class PaidState : BaseOrderState
    {
        public PaidState(Order order) : base(order) { }

        public override void ShipOrder()
        {
            Console.WriteLine("✅ 已出貨。");
            Order.SetState(new ShippedState(Order));
        }

        public override void CancelOrder()
        {
            Console.WriteLine("✅ 訂單已取消，正在退款...");
            Order.SetState(new CancelledState(Order));
        }
    }

    /// <summary>
    /// 已出貨狀態：只能送達
    /// </summary>
    public class ShippedState : BaseOrderState
    {
        public ShippedState(Order order) : base(order) { }

        public override void DeliverOrder()
        {
            Console.WriteLine("✅ 訂單已送達。");
            Order.SetState(new DeliveredState(Order));
        }
    }

    /// <summary>
    /// 已送達狀態：最終狀態（不允許任何操作）
    /// </summary>
    public class DeliveredState : BaseOrderState
    {
        public DeliveredState(Order order) : base(order)
        {
            Console.WriteLine("ℹ️ 訂單已送達（最終狀態）。");
        }
    }

    /// <summary>
    /// 已取消狀態：最終狀態（不允許任何操作）
    /// </summary>
    public class CancelledState : BaseOrderState
    {
        public CancelledState(Order order) : base(order)
        {
            Console.WriteLine("ℹ️ 訂單已取消（最終狀態）。");
        }
    }

    // --- 範例二：紅綠燈 ---

    /// <summary>
    /// 紅綠燈狀態介面
    /// </summary>
    public interface ITrafficLightState
    {
        void Change(TrafficLight light);
    }

    /// <summary>
    /// [環境類別] 紅綠燈
    /// </summary>
    public class TrafficLight
    {
        public ITrafficLightState State { get; set; }

        public TrafficLight()
        {
            State = new RedLightState();
        }

        public void Change() => State.Change(this);
    }

    public class RedLightState : ITrafficLightState
    {
        public void Change(TrafficLight light)
        {
            Console.WriteLine("🔴 紅燈：停止");
            light.State = new GreenLightState();
        }
    }

    public class GreenLightState : ITrafficLightState
    {
        public void Change(TrafficLight light)
        {
            Console.WriteLine("🟢 綠燈：前進");
            light.State = new YellowLightState();
        }
    }

    public class YellowLightState : ITrafficLightState
    {
        public void Change(TrafficLight light)
        {
            Console.WriteLine("🟡 黃燈：準備停止");
            light.State = new RedLightState();
        }
    }

    // ---------- 範例執行 ----------

    public static class StateDemo
    {
        public static void Run()
        {
            Console.WriteLine("=".PadRight(60, '='));
            Console.WriteLine("狀態模式 (State Pattern) 範例");
            Console.WriteLine("=".PadRight(60, '='));

            // --- 訂單系統 ---
            Console.WriteLine("\n--- 情境一：訂單標準流程 ---");
            var order1 = new Order();
            order1.PayOrder();
            order1.ShipOrder();
            order1.DeliverOrder();

            Console.WriteLine("\n嘗試送達後再次付款：");
            order1.PayOrder(); // 應失敗

            // --- 取消流程 ---
            Console.WriteLine("\n--- 情境二：取消流程 ---");
            var order2 = new Order();
            order2.PayOrder();
            Console.WriteLine("決定取消訂單...");
            order2.CancelOrder();

            Console.WriteLine("\n嘗試在取消後出貨：");
            order2.ShipOrder(); // 應失敗

            // --- 不允許的轉換 ---
            Console.WriteLine("\n--- 情境三：不允許的操作 ---");
            var order3 = new Order();
            Console.WriteLine("嘗試直接出貨（未付款）：");
            order3.ShipOrder(); // 應失敗

            // --- 紅綠燈 ---
            Console.WriteLine("\n--- 情境四：紅綠燈 ---");
            var light = new TrafficLight();
            for (int i = 0; i < 3; i++)
            {
                light.Change();
            }
        }
    }
}
