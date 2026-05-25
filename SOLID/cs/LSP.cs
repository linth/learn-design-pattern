namespace SOLIDExamples
{
    // ============================================================
    // 里氏替換原則 (Liskov Substitution Principle, LSP)
    // 子型別必須能完全取代父型別，且不改變程式的正確性。
    // 換句話說，任何使用父類別的地方都能用子類別替代而不出錯。
    // ============================================================

    /// <summary>
    /// 違反 LSP 的範例：Square 繼承 Rectangle 但改變了行為
    /// </summary>
    public class LSPViolation
    {
        public class Rectangle
        {
            public virtual int Width { get; set; }
            public virtual int Height { get; set; }
            public int Area => Width * Height;
        }

        /// <summary>
        /// Square 繼承 Rectangle，但設定高度時會同時改變寬度，
        /// 違反了父類別的預期行為
        /// </summary>
        public class Square : Rectangle
        {
            private int _side;

            public override int Width
            {
                get => _side;
                set { _side = value; }
            }

            public override int Height
            {
                get => _side;
                set { _side = value; }
            }
        }

        public static void Demonstrate()
        {
            // 以下程式對 Rectangle 正常，但對 Square 會得到非預期結果
            Rectangle rect = new Square();
            rect.Width = 3;
            rect.Height = 2;
            // 預期 area = 6，但實際 area = 4（因為設定 Height 時 Width 也變了）
            Console.WriteLine($"  [違反 LSP] Rectangle(3,2) 面積: {rect.Area} (預期 6)");
        }
    }

    // ---------- 遵循 LSP ----------

    /// <summary>
    /// 抽象形狀，不包含互相矛盾的 setter
    /// </summary>
    public abstract class Shape
    {
        public abstract int Area { get; }
    }

    /// <summary>
    /// 長方形，獨立實作，不受 Square 影響
    /// </summary>
    public class RectangleShape : Shape
    {
        public int Width { get; set; }
        public int Height { get; set; }
        public override int Area => Width * Height;
    }

    /// <summary>
    /// 正方形，獨立實作，不受 Rectangle 影響
    /// </summary>
    public class SquareShape : Shape
    {
        public int Side { get; set; }
        public override int Area => Side * Side;
    }

    public static class LSPDemo
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("LSP - 里氏替換原則");
            Console.WriteLine("=".PadRight(60, '='));

            // 違反 LSP 的範例
            LSPViolation.Demonstrate();

            // 遵循 LSP 的範例：各自獨立計算面積
            Console.WriteLine("\n  [遵循 LSP] 使用獨立類別:");
            var rect = new RectangleShape { Width = 3, Height = 2 };
            var square = new SquareShape { Side = 3 };

            Console.WriteLine($"  長方形(3,2) 面積: {rect.Area}");
            Console.WriteLine($"  正方形(3)   面積: {square.Area}");

            // LSP 核心：可統一使用父型別處理
            Shape[] shapes = { rect, square };
            foreach (var s in shapes)
                Console.WriteLine($"  {s.GetType().Name} 面積: {s.Area}");
        }
    }
}
