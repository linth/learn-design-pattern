namespace TemplateMethodExamples
{
    // ============================================================
    // 樣板方法模式 (Template Method Pattern)
    //
    // 核心概念：
    // 1. 在一個方法中定義演算法的骨架（SOP），將部分步驟延遲到子類別實作。
    // 2. 子類別可在不改變演算法結構的前提下，重新定義特定步驟。
    // 3. 透過「掛鉤」(Hook) 機制，讓子類別能有選擇性地影響演算法流程。
    // ============================================================

    /// <summary>
    /// [抽象超類別] 飲料基底，定義製作飲料的標準作業流程
    /// </summary>
    abstract class Beverage
    {
        /// <summary>
        /// 樣板方法 (Template Method)
        /// 定義了製作飲料的 SOP 流程，宣告為 virtual 但通常不應被覆寫。
        /// C# 中可使用 sealed 防止子類別修改流程結構。
        /// </summary>
        public void PrepareRecipe()
        {
            BoilWater();          // 步驟 1：煮開水（共用）
            Brew();               // 步驟 2：沖泡（由子類別實作）
            PourInCup();          // 步驟 3：倒入杯子（共用）

            // 透過掛鉤控制步驟 4
            if (CustomerWantsCondiments())
            {
                AddCondiments();  // 步驟 4：加配料（由子類別實作）
            }
        }

        /// <summary>
        /// 抽象方法：具體如何沖泡，由子類別決定
        /// </summary>
        protected abstract void Brew();

        /// <summary>
        /// 抽象方法：具體加什麼配料，由子類別決定
        /// </summary>
        protected abstract void AddCondiments();

        /// <summary>
        /// 共用邏輯：煮水
        /// </summary>
        private void BoilWater()
        {
            Console.WriteLine("[Beverage] 正在煮沸開水...");
        }

        /// <summary>
        /// 共用邏輯：倒入杯子
        /// </summary>
        private void PourInCup()
        {
            Console.WriteLine("[Beverage] 將飲料倒入杯中...");
        }

        /// <summary>
        /// 掛鉤 (Hook)
        /// 提供預設行為（預設要加配料），子類別可視需求覆寫。
        /// </summary>
        protected virtual bool CustomerWantsCondiments()
        {
            return true;
        }
    }

    // ---------- 具體實作類別 ----------

    /// <summary>
    /// [具體類別] 咖啡
    /// </summary>
    class Coffee : Beverage
    {
        protected override void Brew()
        {
            Console.WriteLine("[Coffee] 透過濾網滴濾咖啡豆萃取液");
        }

        protected override void AddCondiments()
        {
            Console.WriteLine("[Coffee] 加入有機糖與鮮奶油");
        }
    }

    /// <summary>
    /// [具體類別] 茶（展示 Hook 的彈性）
    /// </summary>
    class Tea : Beverage
    {
        private readonly bool _wantsCondiments;

        public Tea(bool wantsCondiments = true)
        {
            _wantsCondiments = wantsCondiments;
        }

        protected override void Brew()
        {
            Console.WriteLine("[Tea] 浸泡高山烏龍茶包");
        }

        protected override void AddCondiments()
        {
            Console.WriteLine("[Tea] 加入新鮮萊姆片");
        }

        /// <summary>
        /// 覆寫掛鉤：根據建構參數決定是否要加料
        /// </summary>
        protected override bool CustomerWantsCondiments()
        {
            return _wantsCondiments;
        }
    }

    /// <summary>
    /// [具體類別] 珍珠奶茶（展示易擴充性）
    /// </summary>
    class MilkTea : Beverage
    {
        protected override void Brew()
        {
            Console.WriteLine("[MilkTea] 沖泡錫蘭紅茶並混合香醇牛奶");
        }

        protected override void AddCondiments()
        {
            Console.WriteLine("[MilkTea] 加入 Q 彈黑糖珍珠");
        }
    }

    /// <summary>
    /// [具體類別] 熱可可（新增品項不需修改既有程式碼，符合 OCP）
    /// </summary>
    class HotChocolate : Beverage
    {
        protected override void Brew()
        {
            Console.WriteLine("[HotChocolate] 攪拌可可粉與熱牛奶");
        }

        protected override void AddCondiments()
        {
            Console.WriteLine("[HotChocolate] 加上棉花糖與巧克力醬");
        }
    }

    // ---------- 範例執行 ----------

    public static class TemplateMethodDemo
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("樣板方法模式 (Template Method Pattern) 範例");
            Console.WriteLine("=".PadRight(60, '='));

            Console.WriteLine("\n--- 1. 製作經典咖啡 ---");
            Beverage coffee = new Coffee();
            coffee.PrepareRecipe();

            Console.WriteLine("\n--- 2. 製作檸檬紅茶 (預設加料) ---");
            Beverage lemonTea = new Tea();
            lemonTea.PrepareRecipe();

            Console.WriteLine("\n--- 3. 製作純紅茶 (透過 Hook 拒絕加料) ---");
            Beverage plainTea = new Tea(false);
            plainTea.PrepareRecipe();

            Console.WriteLine("\n--- 4. 製作珍珠奶茶 ---");
            Beverage milkTea = new MilkTea();
            milkTea.PrepareRecipe();

            Console.WriteLine("\n--- 5. 製作熱可可 (新擴充品項) ---");
            Beverage hotChoco = new HotChocolate();
            hotChoco.PrepareRecipe();
        }
    }
}
